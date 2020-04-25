from datetime import datetime

from models import Profile
from slackbot import *


def init_profiles():
    profiles_dict = {}
    all_users = get_users()
    for user in all_users:
        profile = Profile(
            user['id'],
            user['real_name'],
            'CEO',
            'IDK',
            user['profile']['image_512'],
            "Hi! My name is Kevin and I am very excited to join as a Software Engineer on the Growth team. Before Hub, I was a Software Engineer at Facebook. Feel free to grab time on my calendar and can’t wait to chat with y’all!",
            ['nothing', 'league'],
            None,
            'kc626@pornhub.com',
            datetime.now(),
            "he/him",
            datetime.now(),
            "@omar",
            "linkedin.com/in/omar",
            "facebook.com/omar",
            "@omar",
            {
                "url": "omarrasheed.com",
                "description": "I write essays on my personal site every week. Feel free to check it out :)",
            },
            {
                "title": "Summer in Seattle!",
                "body": "Getting dinner with Young Kim and Kevin Chan",
                "imageURL": "https://files.slack.com/files-pri/T012HSXD00J-F012BKJ9JJJ/cd1f8e21-64bc-40ef-bb28-59d5559b328c_1_105_c.jpeg",
            },
            user['name']
        )
        profiles_dict[user['id']] = profile
    return profiles_dict
