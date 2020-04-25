import os
import json
from urllib.parse import urlparse

import requests
from flask import Flask, request

from slackbot import *
from slackeventsapi import SlackEventAdapter

app = Flask(__name__)
app.debug = True
slack_events_adapter = SlackEventAdapter(
    'abfc6945359193db5006ee441bffefdd', "/slack/events", app)

user_list = get_users()
profiles_dict = {}

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
    user_name = request.json['name']
    message = request.json['message']

    slackbot.send_dm_to_user(user_name, message, user_list)
    return 'yo'


@slack_events_adapter.on("reaction_added")
def update_emoji(payload):
    """Update the onboarding welcome message after receiving a "reaction_added"
    event from Slack. Update timestamp for welcome message as well.
    """
    event = payload.get("event", {})
    print(event)


if __name__ == "__main__":
    app.run(debug=True)
