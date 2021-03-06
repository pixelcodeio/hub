from datetime import datetime
import os

from init_profiles import *
from models import Announcement
from slack import WebClient
from slack.errors import SlackApiError

client = WebClient(token=os.environ["CLIENT_TOKEN"])


def get_announcements(profiles_dict):
    def is_announcements_channel(c):
        return
    response = client.conversations_list()
    channels = response["channels"]
    announcements_channel = next(c for c in channels if c['name'] == 'announcements')
    response = client.conversations_history(channel=announcements_channel['id'])
    announcements = []
    for data in response['messages']:
        if data['user'] not in profiles_dict:
            continue
        title = data['text']
        date = datetime.fromtimestamp(float(data['ts']))

        announcements.append(Announcement(title, date))

    return announcements


def get_users():
    response = client.users_list()
    users = response["members"]

    return [u for u in users if (not u["is_bot"] and u['profile']["real_name"] != "Slackbot")]


def get_user_id_for_name(name, user_list):
    for u in user_list:
        if name in u["real_name"]:
            return u["id"]

    # No user matches
    raise Exception("bruh this user doesn't exist")

# TODO


def send_dm_to_user(user_id, message):
    try:
        response = client.chat_postMessage(
            channel=user_id,
            text=message
        )
    except SlackApiError as e:
        assert e.response["error"]

def broadcast_poll(poll_id, text, options, user_list):
    options_elements = []
    for option in options:
        options_elements.append({
            "type": "button",
            "text": {
                "type": "plain_text",
                "text": option,
                "emoji": False
            },
        })
    blocks = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*New Poll:* " + text
            },
            "block_id": str(poll_id),
        }
    ]
    if len(options_elements) > 0:
        blocks.append({
            "type": "actions",
            "elements": options_elements
        })

    try:
        for user_id in user_list:
            response = client.chat_postMessage(
                blocks=blocks,
                channel=user_id
            )
    except SlackApiError as e:
        assert e.response["error"]


def messages_in_channel(channel_id, count=100):
    return client.conversations_history(channel=channel_id, count=count)['messages']

def get_team_id():
    return client.team_info()['team']['id']

def get_team_icon():
    return client.team_info()['team']['icon']['image_230']

if __name__ == "__main__":
    print(get_team_icon())
    