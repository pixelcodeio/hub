import random
import re
from datetime import datetime

under_pat = re.compile(r'_([a-z])')
def underscore_to_camel(name):
    return under_pat.sub(lambda x: x.group(1).upper(), name)

def convert(d):
    new_d = {}
    for k, v in d.items():
        new_d[underscore_to_camel(k)] = convert(v) if isinstance(v,dict) else v
    return new_d

class Anniversary:
    def __init__(self, profile):
        self.profile = profile
        self.years = random.randint(1, 5)

    def serialize(self):
        return convert({
            'name': self.profile.name,
            'title': self.profile.title,
            'team': self.profile.team,
            'imageURL': self.profile.image_url,
            'years': self.years
        })


class Announcement:
    def __init__(self, title, date):
        self.title = title
        self.date = date

    def serialize(self):
        return convert({
            'title': self.title,
            'date': self.date.strftime("%B %-d, %Y")
        })

class Birthday:
    def __init__(self, profile):
        self.profile = profile

    def serialize(self):
        return convert({
            'name': self.profile.name,
            'title': self.profile.title,
            'team': self.profile.team,
            'imageURL': self.profile.image_url
        })

class NewHire:
    def __init__(self, profile):
        self.profile = profile

    def serialize(self):
        return convert({
            'name': self.profile.name,
            'title': self.profile.title,
            'team': self.profile.team,
            'imageURL': self.profile.image_url,
            'blurb': self.profile.blurb
        })

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
        return convert({
            'id': self.id,
            'sender': self.sender.serialize(),
            'text': self.text,
            'options': self.options,
            'votes': self.voters
        })

class Profile:
    def __init__(
        self,
        id,
        name,
        title,
        team,
        image_url,
        blurb,
        interests,
        manager,
        email,
        birthday,
        pronouns,
        join_date,
        twitter,
        linkedin,
        facebook,
        instagram,
        personal_site,
        featured_posts,
        office,
        slack_internal_name
    ):
        self.id = id

        # Public fields
        self.name = name
        self.title = title
        self.team = team
        self.image_url = image_url
        self.blurb = blurb
        self.interests = interests
        self.manager = manager
        self.email = email
        self.birthday = birthday
        self.pronouns = pronouns
        self.join_date = join_date
        self.twitter = twitter
        self.linkedin = linkedin
        self.facebook = facebook
        self.instagram = instagram
        self.personal_site = personal_site
        self.featured_posts = featured_posts
        self.office = office

        # Private fields
        self.slack_internal_name = slack_internal_name

    def serialize(self):
        return convert({
            'id': self.id,
            'name': self.name,
            'title': self.title,
            'team': self.team,
            'imageURL': self.image_url,
            'blurb': self.blurb,
            'interests': self.interests,
            'manager': self.manager,
            'email': self.email,
            'birthday': self.birthday.strftime("%B %-d"),
            'pronouns': self.pronouns,
            'join_date': self.join_date.strftime("%B %-d, %Y"),
            'twitter': self.twitter,
            'linkedin': self.linkedin,
            'facebook': self.facebook,
            'instagram': self.instagram,
            'personal_site': self.personal_site,
            'featured_posts': self.featured_posts,
            'office': self.office
        })


class Thank:
    def __init__(self, sender, to, message):
        self.sender = sender
        self.to = to
        self.message = message
        self.date = datetime.now()

    def serialize(self):
        return convert({
            'from': self.sender.serialize(),
            'to': self.to.serialize(),
            'message': self.message,
            'date': self.date.strftime("%B %-d, %Y")
        })
