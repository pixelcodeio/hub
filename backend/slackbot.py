from slack import WebClient
from slack.errors import SlackApiError

client = WebClient(
    token="xoxb-1085915442018-1079191858262-06rCGTOw6DM8BOoMkcuc8yUB")


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


def send_dm_to_user(user_name, message, user_list):
    user_id = get_user_id_for_name(user_name, user_list)
    try:
        response = client.chat_postMessage(
            channel=user_id,
            text=message
        )
    except SlackApiError as e:
        assert e.response["error"]


# TODO: we need to add support for commands


if __name__ == "__main__":
    user_list = get_users()
    print(get_user_id_for_name("Omar", user_list))
    print(send_dm_to_user("Omar", "young hates poke", user_list))
