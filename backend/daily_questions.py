import slackbot
from init_profiles import init_profiles

user_list = list(init_profiles().keys())

daily_questions = [
    'What is your favorite TV Show?',
    'Who is your favorite music artist?',
    'What have you learned during quarantine?',
]

if __name__ == '__main__':
    for user_id in user_list:
        slackbot.send_dm_to_user(user_id, daily_questions[0])
    daily_questions.append(daily_questions.pop(0))