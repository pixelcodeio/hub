from flask import Flask

import requests

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

@app.route('/oauth', methods=['POST'])
def oauth():
    CLIENT_ID = "1085915442018.1079182647094"
    CLIENT_SECRET = "e52cf377e47cf40ee0e70f5f30505cd8"

    BASE_URL = "https://slack.com/api/oauth.v2.access?client_id={}&client_secret={}&code={}"

    requests.get(BASE_URL.format(CLIENT_ID, CLIENT_SECRET, CODE))

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
