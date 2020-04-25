from datetime import datetime

class Profile:
    def __init__(self, id, birthday, company_email, position, team, start_date, name, photo_url, timezone, status, interests, intro):
        self.id = id
        self.birthday = birthday
        self.company_email = company_email
        self.position = position
        self.team = team
        self.start_date = start_date
        self.name = name
        self.photo_url = photo_url
        self.timezone = timezone
        self.status = status
        self.interests = interests
        self.intro = intro
    
    def serialize(self):
        return {
            'id': self.id,
            'birthday': self.birthday,
            'company_email': self.company_email,
            'position': self.position,
            'team': self.team,
            'start_date': self.start_date,
            'name': self.name,
            'photo_url': self.photo_url,
            'timezone': self.timezone,
            'status': self.status,
            'interests': self.interests,
            'intro': self.intro
        }