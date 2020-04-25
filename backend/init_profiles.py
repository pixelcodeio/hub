from slackbot import *
from datetime import datetime
from models import Profile


def init_profiles():
    profiles_dict = {}
    all_users = get_users()
    for user in all_users:
        profile = Profile(
            user['id'],
            datetime.now(),
            'kc626@pornhub.com',
            'CEO',
            'IDK',
            datetime.now(),
            user['real_name'],
            user['name'],
            user['profile']['image_512'],
            user['tz_offset'],
            user['profile']['status_text'] + user['profile']['status_emoji'],
            [],
            ''
        )
        profiles_dict[user['id']] = profile
    return profiles_dict