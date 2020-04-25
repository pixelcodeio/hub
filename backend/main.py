from flask import Flask

app = Flask(__name__)
app.debug = True

############################################### HELLO WORLD

@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello, World!'

############################################### OTHER ROUTES

# Get user's profile
@app.route('/profile', methods=['GET'])
def profile():
    return 'yo'

# Get list of all users?
@app.route('/users', methods=['GET'])
def get_users():
    return 'yo'

# Send slack message to a specific user?
@app.route('/slack/message', methods=['POST'])
def send_message():
    return 'yo'

############################################### ENTRYPOINT

if __name__ == "__main__":
    app.run(debug=True)
