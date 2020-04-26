from datetime import datetime
import json

from models import Profile
from slackbot import *


def init_profiles():
    profiles_dict = {}
    all_users = get_users()
    profiles_data = {}
    with open('data.json', 'r') as f:
        profiles_data = json.load(f)
    for user in all_users:
        user_id = user['id']
        if user_id in profiles_data:
            profile_json = profiles_data[user_id]
            profile = Profile(
                user['id'],
                user['profile']['real_name'],
                profile_json['title'],
                profile_json['team'],
                profile_json['department'],
                user['profile']['image_512'],
                profile_json['blurb'],
                profile_json['interests'],
                profile_json['manager'],
                profile_json['email'],
                profile_json['birthday'],
                profile_json['pronouns'],
                profile_json['join_date'],
                profile_json['twitter'],
                profile_json['linkedin'],
                profile_json['facebook'],
                profile_json['instagram'],
                profile_json['personal_site'],
                profile_json['featured_posts'],
                profile_json['office'],
                get_team_icon(),
                get_team_id(),
                user['name'],
            )
            profiles_dict[user['id']] = profile
    return profiles_dict
