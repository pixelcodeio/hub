from flask import Flask, request

import requests

from slackbot import *

app = Flask(__name__)
app.debug = True

############################################### HELLO WORLD

@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello, World!'

############################################### OAUTH

@app.route('/oauth-test', methods=['GET'])
def oauth_test():
    return '<a href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=1085915442018.1079182647094"><img alt=""Sign in with Slack"" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>'

@app.route('/oauth', methods=['GET'])
def oauth():
    code = request.args.get('code')

    BASE_URL = "https://slack.com/api/oauth.v2.access?client_id={}&client_secret={}&code={}"

    response = requests.get(BASE_URL.format(CLIENT_ID, CLIENT_SECRET, code))
    return response.text

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
    return 'yo'

############################################### ENTRYPOINT

if __name__ == "__main__":
    app.run(debug=True)
