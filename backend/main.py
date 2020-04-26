import json
import operator
import os
import random
from functools import reduce
from urllib.parse import urlparse

from flask import Flask, request

import requests	
import slackbot	
from daily_questions import daily_questions	
from flask_cors import CORS
from init_profiles import init_profiles	
from slackeventsapi import SlackEventAdapter

import slackbot
from daily_questions import daily_questions
from init_profiles import init_profiles, init_thanks
from models import Anniversary, Birthday, DailyQuestion, NewHire, Poll, Thank

app = Flask(__name__)
app.debug = True
cors = CORS(app)

slack_events_adapter = SlackEventAdapter(
    'f819aca71451dcbe8e80c99ad3adbb17', "/slack/events", app)

# daily_questions = [
#     'What is your favorite TV Show?',
#     'Who is your favorite music artist?',
#     'What have you learned during quarantine?',
# ]
onboarding_questions = [
    "Give us an intro about yourself.",
    "What are some of your hobbies? (comma-separated)"
]
daily_q_confirmation = "Thanks for your response! Checkout https://thehub.com to see other responses!"
poll_confirmation = "Thanks for voting! Checkout https://thehub.com to see the results!"
all_polls = {}
profiles_dict = init_profiles()
thanks = init_thanks(profiles_dict)
user_list = list(profiles_dict.keys())

# HELPERS


def make_response(r):
    return {'success': True, 'data': r}


def make_boolean_response():
    return {'success': True}

# HELLO WORLD


@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello, World!'

# OAUTH


def generate_oauth_url(redirect_uri):
    return '<a href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=1085915442018.1079182647094&redirect_uri={}"><img alt=""Sign in with Slack"" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>'.format(redirect_uri)


@app.route('/signup', methods=['GET'])
def signup():
    redirect_uri = os.environ["SERVER_URL"] + "/oauthv2"
    return generate_oauth_url(redirect_uri)


@app.route('/signin', methods=['GET'])
def signin():
    redirect_uri = os.environ["SERVER_URL"] + "/oauth"
    return generate_oauth_url(redirect_uri)


def oauth_common(code, redirect_uri, base_url):
    CLIENT_ID = os.environ["CLIENT_ID"]
    CLIENT_SECRET = os.environ["CLIENT_SECRET"]

    response = requests.get(base_url.format(
        CLIENT_ID,
        CLIENT_SECRET,
        code,
        redirect_uri
    ))
    response_json = json.loads(response.text)

    if "user_id" in response_json:

        return {
            "name": response_json["user"]["name"],
            "user_id": response_json["user_id"],
            "user_image": response_json["user"]["image_1024"],
            "team_image": response_json["team"]["image_230"],
            "team_name": response_json["team"]["name"],
        }

    return {}


@app.route('/oauth', methods=['GET'])
def oauth():
    code = request.args.get('code')
    redirect_uri = os.environ["SERVER_URL"] + "/oauth"
    base_url = "https://slack.com/api/oauth.access?client_id={}&client_secret={}&code={}&redirect_uri={}"

    return make_response(oauth_common(code, redirect_uri, base_url))


@app.route('/oauthv2', methods=['GET'])
def oauthv2():
    code = request.args.get('code')
    redirect_uri = os.environ["SERVER_URL"] + "/oauthv2"

    base_url = "https://slack.com/api/oauth.v2.access?client_id={}&client_secret={}&code={}&redirect_uri={}"

    return make_response(oauth_common(code, redirect_uri, base_url))

# OTHER ROUTES
@app.route('/homepage', methods=['GET'])
def homepage():
    user_id = request.args.get('user_id')
    req_user_profile = profiles_dict[user_id]

    def similar_in_interest(p1, p2):
        return p1 != p2 and len(set(p1.interests).intersection(p2.interests)) > 0
    similar_interests = [profile for profile in list(
        profiles_dict.values()) if similar_in_interest(profile, req_user_profile)]

    anniversaries = []
    birthdays = []
    new_hires = []

    for prof in list(profiles_dict.values()):
        if "April 26" in prof.birthday:
            birthdays.append(Birthday(prof).serialize())
        if "April 26" in prof.join_date:
            anniversaries.append(Anniversary(prof).serialize())
        if "2020" in prof.join_date and "April" in prof.join_date:
            new_hires.append(NewHire(prof).serialize())

    return make_response({
        'anniversaries': anniversaries,
        'birthdays': birthdays,
        'newHires': new_hires,
        'polls': [poll.serialize(profiles_dict) for poll in list(all_polls.values())],
        'similarInterests': [prof.serialize(profiles_dict) for prof in similar_interests]
    })


@app.route('/poll', methods=['POST'])
def poll():
    sender = profiles_dict[request.json['user_id']]
    text = request.json['text']
    options = request.json['options']
    poll_id = str(len(all_polls))
    all_polls[poll_id] = Poll(poll_id, sender, text, options)

    slackbot.broadcast_poll(poll_id, text, options, user_list)
    return make_boolean_response()


@app.route('/polls', methods=['GET'])
def polls():
    return make_response([poll.serialize(profiles_dict) for poll in list(all_polls.values())])

# Get user's profile
@app.route('/profile', methods=['GET'])
def profile():
    profile_id = request.args.get('user_id')
    received_thanks = [thank for thank in thanks if thank.to.id == profile_id]
    return make_response(profiles_dict[profile_id].serialize(profiles_dict, received_thanks) if profile_id in profiles_dict else None)

# Get list of all users?
@app.route('/profiles', methods=['GET'])
def get_users():
    ret = []
    thanks_map = {}
    for thank in thanks:
        if thank.to.id in thanks_map:
            thanks_map[thank.to.id].append(thank)
        else:
            thanks_map[thank.to.id] = [thank]
    for profile in profiles_dict.values():
        received_thanks = thanks_map[profile.id] if profile.id in thanks_map else []
        ret.append(profile.serialize(profiles_dict, received_thanks))
    return make_response(ret)

# Send slack message to a specific user?
@app.route('/slack/message', methods=['POST'])
def send_message():
    user_id = request.json['user_id']
    message = request.json['message']
    slackbot.send_dm_to_user(user_id, message)

    return make_boolean_response()


@app.route('/slack/poll', methods=['POST'])
def receive_vote():
    payload = json.loads(dict(request.form)['payload'])
    user_id = payload['user']['id']
    poll_id = str(payload['message']['blocks'][0]['block_id'])
    option = payload['actions'][0]['text']['text']
    all_polls[poll_id].add_vote(option, user_id)
    x = requests.post(payload['response_url'], json={
        "text": poll_confirmation,
        "replace_original": "true"
    })

    return make_boolean_response()


@app.route('/slack/thank', methods=['POST'])
def thank():
    sender_id = request.form.get('user_id')
    message = request.form.get('text')
    space_bar_index = message.find(' ')
    recipient_name = message[1:space_bar_index]
    message = message[space_bar_index + 1:]

    recipient_profile = next(prof for prof in list(
        profiles_dict.values()) if prof.slack_internal_name == recipient_name)

    thanks.append(Thank(profiles_dict[sender_id], recipient_profile, message))

    slackbot.send_dm_to_user(
        recipient_profile.id,
        "<@{}> just thanked you for {}!".format(
            profiles_dict[sender_id].id, message)
    )

    return {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Love the positivity! Checkout https://thehub.com to see who's thanked you!"
                }
            }
        ]
    }

# Send new hire message
# Using reaction_added j cuz its easy to trigger
@slack_events_adapter.on('team_join')
def team_join(payload):
    event = payload.get("event", {})
    user_id = event.get("user")

    slackbot.send_dm_to_user(user_id, "Welcome!")
    slackbot.send_dm_to_user(user_id, onboarding_questions[0])


@slack_events_adapter.on('reaction_added')
def reaction_added(payload):
    event = payload.get("event", {})
    user_id = event.get("user")

    slackbot.send_dm_to_user(user_id, "Welcome!")
    slackbot.send_dm_to_user(user_id, onboarding_questions[0])


@slack_events_adapter.on('message')
def message(payload):
    event = payload.get("event", {})
    if 'bot_id' in event:
        return make_boolean_response()

    channel_id = event.get("channel")
    user_id = event.get("user")

    last_messages = slackbot.messages_in_channel(channel_id, 2)
    last_bot_question = next(msg for msg in last_messages if 'bot_id' in msg)
    answer = event['text']

    if last_bot_question['text'] == onboarding_questions[0]:
        profiles_dict[user_id].blurb = answer
        slackbot.send_dm_to_user(user_id, onboarding_questions[1])
    elif last_bot_question['text'] == onboarding_questions[1]:
        interests = answer.split(',')
        profiles_dict[user_id].interests = [interest.strip()
                                            for interest in interests]
    elif last_bot_question['text'] in daily_questions:
        profiles_dict[user_id].daily_questions.append(
            DailyQuestion(last_bot_question['text'], answer))
        slackbot.send_dm_to_user(user_id, daily_q_confirmation)
    elif last_bot_question['blocks'][0]['block_id'] in all_polls:
        poll = all_polls[last_bot_question['blocks'][0]['block_id']]
        poll.add_vote(answer, user_id)
        slackbot.send_dm_to_user(user_id, poll_confirmation)

# Error events
@slack_events_adapter.on("error")
def error_handler(err):
    print("ERROR: " + str(err))


if __name__ == "__main__":
    app.run(debug=True)
