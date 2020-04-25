import os
import json
from urllib.parse import urlparse

import requests
from flask import Flask, request

from init_profiles import init_profiles
from slackbot import *
from slackeventsapi import SlackEventAdapter

app = Flask(__name__)
app.debug = True
slack_events_adapter = SlackEventAdapter('abfc6945359193db5006ee441bffefdd', "/slack/events", app)

onboarding_questions = [
    "Give us an intro about yourself.",
    "What are some of your hobbies? (comma-separated)"
]
profiles_dict = init_profiles()
user_list = profiles_dict.keys()

def make_response(r):
    return {'success': True, 'data': r}

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

    response = requests.get(base_url.format(CLIENT_ID, CLIENT_SECRET, code, redirect_uri))
    response_json = json.loads(response.text)

    profiles_dict[response_json["user_id"]] = response_json

    return {
        "name": response_json["user"]["name"],
        "user_id": response_json["user_id"],
        "user_image": response_json["user"]["image_1024"],
        "team_image": response_json["team"]["image_230"],
        "team_name": response_json["team"]["name"],
    }


@app.route('/oauth', methods=['GET'])
def oauth():
    code = request.args.get('code')
    redirect_uri = os.environ["SERVER_URL"] + "/oauth"
    base_url = "https://slack.com/api/oauth.access?client_id={}&client_secret={}&code={}&redirect_uri={}"

    return oauth_common(code, redirect_uri, base_url)


@app.route('/oauthv2', methods=['GET'])
def oauthv2():
    code = request.args.get('code')
    redirect_uri = os.environ["SERVER_URL"] + "/oauthv2"

    base_url = "https://slack.com/api/oauth.v2.access?client_id={}&client_secret={}&code={}&redirect_uri={}"

    return oauth_common(code, redirect_uri, base_url)

############################################### OTHER ROUTES

# Get announcemenets
@app.route('/announcements', methods=['GET'])
def announcements():
    return make_response(get_announcements())

# Get user's profile
@app.route('/profile', methods=['GET'])
def profile():
    return 'yo'

# Get list of all users?
@app.route('/users', methods=['GET'])
def get_users():
    return 'yo'

# Send slack message to a specific user?
@app.route('/slack/message', methods=['POST'])
def send_message():
    return 'yo'

# Send new hire message
# Using reaction_added j cuz its easy to trigger
@slack_events_adapter.on('reaction_added')
def reaction_added(payload):
    event = payload.get("event", {})
    user_id = event.get("user")

    send_dm_to_user(user_id, "Welcome!", user_list)
    send_dm_to_user(user_id, onboarding_questions[0], user_list)

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
        send_dm_to_user(user_id, onboarding_questions[1], user_list)
    elif last_question == onboarding_questions[1]:
        interests = last_two_messages[0]['text'].split(',')
        profiles_dict[user_id].interests = [interest.strip() for interest in interests]
    

if __name__ == "__main__":
    app.run(debug=True)
