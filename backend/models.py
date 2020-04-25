import random
from datetime import datetime


class Anniversary:
    def __init__(self, profile):
        self.profile = profile
        self.years = random.randint(1, 5)

    def serialize(self):
        return {
            'profile': self.profile.serialize(),
            'years': self.years
        }


class Announcement:
    def __init__(self, text, profile, sent_at):
        self.text = text
        self.profile = profile
        self.sent_at = sent_at

    def serialize(self):
        return {
            'text': self.text,
            'profile': self.profile.serialize(),
            'sent_at': self.sent_at
        }


class DailyUpdate:
    def __init__(self, message):
        self.message = message
        self.sent_at = datetime.now()

    def serialize(self):
        return {
            'message': self.message,
            'sent_at': self.sent_at
        }

class Poll:
    def __init__(self, id, sender, text, options):
        self.id = id
        self.sender = sender
        self.text = text
        self.options = options
        self.voters = {}
    
    def add_vote(self, option, voter_id):
        if option in self.voters:
            self.voters[option].append(voter_id)
        else:
            self.voters[option] = [voter_id]

    def serialize(self):
        return {
            'id': self.id,
            'sender': self.sender.serialize(),
            'text': self.text,
            'options': self.options,
            'votes': self.voters
        }

class Profile:
    def __init__(self, id, birthday, company_email, position, team, start_date, name, slack_internal_name, photo_url, timezone, status, interests, intro):
        self.id = id
        self.birthday = birthday
        self.company_email = company_email
        self.position = position
        self.team = team
        self.start_date = start_date
        self.name = name
        self.slack_internal_name = slack_internal_name
        self.photo_url = photo_url
        self.timezone = timezone
        self.status = status
        self.interests = interests
        self.intro = intro
        self.daily_updates = []

    def serialize(self):
        return {
            'id': self.id,
            'birthday': self.birthday,
            'company_email': self.company_email,
            'position': self.position,
            'team': self.team,
            'start_date': self.start_date,
            'name': self.name,
            'slack_internal_name': self.slack_internal_name,
            'photo_url': self.photo_url,
            'timezone': self.timezone,
            'status': self.status,
            'interests': self.interests,
            'intro': self.intro,
            'daily_updates': [update.serialize() for update in self.daily_updates]
        }


class Thank:
    def __init__(self, sender, recipient, message):
        self.sender = sender
        self.recipient = recipient
        self.message = message
        self.sent_at = datetime.now()

    def serialize(self):
        return {
            'sender': self.sender.serialize(),
            'recipient': self.recipient.serialize(),
            'message': self.message,
            'sent_at': self.sent_at
        }
