import atexit
from apscheduler.scheduler import Scheduler

cron = Scheduler(daemon=True)
cron.start()

@cron.interval_schedule(seconds=10)
def job_function():
    for user_id in user_list:
        send_dm_to_user(user_id, daily_questions[0])
    daily_questions.append(daily_questions.pop(0))


# Shutdown your cron thread if the web process is stopped
atexit.register(lambda: cron.shutdown(wait=False))
