from datetime import datetime

from init_profiles import *
from models import Announcement
from slack import WebClient
from slack.errors import SlackApiError

client = WebClient(
    token="xoxb-1085915442018-1079191858262-06rCGTOw6DM8BOoMkcuc8yUB")


def get_announcements(profiles_dict):
    def is_announcements_channel(c):
        return
    response = client.conversations_list()
    channels = response["channels"]
    announcements_channel = next(
        c for c in channels if c['name'] == 'announcements')
    response = client.conversations_history(
        channel=announcements_channel['id'])
    announcements = []
    for data in response['messages']:
        if data['user'] not in profiles_dict:
            continue
        text = data['text']
        profile = profiles_dict[data['user']]
        sent_at = datetime.fromtimestamp(float(data['ts']))

        announcements.append(Announcement(text, profile, sent_at))

    return announcements


def get_users():
    response = client.users_list()
    users = response["members"]

    # return all non-bot users
    return [u for u in users if (not u["is_bot"] and u["real_name"] != "Slackbot")]


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


def messages_in_channel(channel_id, count=100):
    return client.conversations_history(channel=channel_id, count=count)['messages']

# TODO: we need to add support for commands


if __name__ == "__main__":
    user_list = get_users()
    print(get_user_id_for_name("Omar", user_list))
    get_announcements(init_profiles())