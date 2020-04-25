from slack import WebClient

client = WebClient(token="xoxb-1085915442018-1079191858262-I6obUeeRtsIp1Ud5uZjZRxVE")

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
def send_dm_to_user():
    pass

# TODO: we need to add support for commands

if __name__ == "__main__":
    user_list = get_users()
    print(get_user_id_for_name("Omar", user_list))
