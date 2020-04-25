import atexit
import json
import operator
import os
import random
from functools import reduce
from urllib.parse import urlparse

from flask import Flask, request

import requests
from apscheduler.scheduler import Scheduler
from init_profiles import init_profiles
from models import Anniversary, DailyUpdate, Thank
from slackbot import *
from slackeventsapi import SlackEventAdapter

app = Flask(__name__)
app.debug = True
cron = Scheduler(daemon=True)
cron.start()
slack_events_adapter = SlackEventAdapter(
    'abfc6945359193db5006ee441bffefdd', "/slack/events", app)

daily_update_question = "What will you be working on today?"
onboarding_questions = [
    "Give us an intro about yourself.",
    "What are some of your hobbies? (comma-separated)"
]
thanks = []
profiles_dict = init_profiles()
user_list = list(profiles_dict.keys())

############################################### HELPERS

def make_response(r):
    return {'success': True, 'data': r}

def make_boolean_response():
    return {'success': True}

############################################### HELLO WORLD

@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello, World!'

############################################### OAUTH

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
    CLIENT_ID = "1085915442018.1079182647094"
    CLIENT_SECRET = "e52cf377e47cf40ee0e70f5f30505cd8"

    response = requests.get(base_url.format(
        CLIENT_ID,
        CLIENT_SECRET,
        code,
        redirect_uri
    ))
    response_json = json.loads(response.text)

    if "user_id" in response_json:
        profiles_dict[response_json["user_id"]] = response_json

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

############################################### OTHER ROUTES
@app.route('/homepage', methods=['GET'])
def homepage():
    half_list_index = len(user_list) // 2
    new_hires_pool = [profiles_dict[user_id] for user_id in user_list[:half_list_index]]
    anniversaries_pool = [profiles_dict[user_id] for user_id in user_list[half_list_index:]]

    daily_updates = reduce(lambda x, y: x+y, [profile.daily_updates for profile in list(profiles_dict.values())])
    daily_updates.sort(key=lambda x: x.sent_at, reverse=True)

    return make_response({
        'anniversaries': [Anniversary(prof).serialize() for prof in random.sample(anniversaries_pool, len(anniversaries_pool) // 2)],
        'announcements': [ann.serialize() for ann in get_announcements(profiles_dict)],
        'birthdays': [prof.serialize() for prof in random.sample(list(profiles_dict.values()), 4)],
        'daily_updates': [update.serialize() for update in daily_updates],
        'new_hires': [prof.serialize() for prof in random.sample(new_hires_pool, len(new_hires_pool) // 2)],
        'thanks': [thank.serialize() for thank in thanks],
    })


@app.route('/slack/thank', methods=['POST'])
def thank():
    sender_id = request.form.get('user_id')
    message = request.form.get('text')
    space_bar_index = message.find(' ')
    recipient_name = message[1:space_bar_index]
    message = message[space_bar_index + 1:]

    # TODO: Handle case for @hub
    recipient_profile = next(prof for prof in list(profiles_dict.values()) if prof.slack_internal_name == recipient_name)

    thanks.append(Thank(profiles_dict[sender_id], recipient_profile.id, message))

    send_dm_to_user(
        recipient_profile.id,
        "<@{}> just thanked you for {}!".format(profiles_dict[sender_id].id, message)
    )
    return make_boolean_response()

# Get user's profile
@app.route('/profile', methods=['GET'])
def profile():
    profile_id = request.args.get('profile_id')
    return make_response(profiles_dict[profile_id].serialize() if profile_id in profiles_dict else None)

# Get list of all users?
@app.route('/profiles', methods=['GET'])
def get_users():
    return make_response([profile.serialize() for profile in profiles_dict.values()])

# Send slack message to a specific user?
@app.route('/slack/message', methods=['POST'])
def send_message():
    user_id = request.json['user_id']
    message = request.json['message']
    send_dm_to_user(user_id, message)

    return make_boolean_response()

# Send new hire message
# Using reaction_added j cuz its easy to trigger
@slack_events_adapter.on('reaction_added')
def reaction_added(payload):
    event = payload.get("event", {})
    user_id = event.get("user")

    send_dm_to_user(user_id, "Welcome!")
    send_dm_to_user(user_id, onboarding_questions[0])

# TODO: this whole thing is kinda jank. idk if we care enough to fix tho
@slack_events_adapter.on('message')
def message(payload):
    event = payload.get("event", {})
    channel_id = event.get("channel")
    user_id = event.get("user")

    if user_id not in profiles_dict:
        return

    last_two_messages = messages_in_channel(channel_id, 2)
    last_question = last_two_messages[1]['text']

    if last_question == onboarding_questions[0]:
        profiles_dict[user_id].intro = last_two_messages[0]['text']
        send_dm_to_user(user_id, onboarding_questions[1])
    elif last_question == onboarding_questions[1]:
        interests = last_two_messages[0]['text'].split(',')
        profiles_dict[user_id].interests = [interest.strip() for interest in interests]
    elif last_question == daily_update_question:
        profiles_dict[user_id].daily_updates.append(DailyUpdate(last_two_messages[0]['text']))

############################################### CRON JOBS

@cron.interval_schedule(days=1)
def daily_update():
    for user_id in user_list:
        send_dm_to_user(user_id, daily_update_question)

atexit.register(lambda: cron.shutdown(wait=False))

if __name__ == "__main__":
    app.run(debug=True)
