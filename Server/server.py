from flask import Flask, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
import requests
import os
from flask_cors import CORS


app = Flask(__name__)
app.secret_key = "supersecretkey"  # Change this in production
CORS(app, supports_credentials=True)  # Allow frontend requests with credentials

# CORS(app, origins=["https://black-moss-077745b1e.6.azurestaticapps.net/"])
# In-memory JSON database (user credentials)
users_db = {
    "user1": {"password": generate_password_hash("pass123")},
    "user2": {"password": generate_password_hash("pass456")}
}

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    user = users_db.get(username)
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid username or password"}), 401

    session["user"] = username  # Store user session
    return jsonify({"message": f"Welcome, {username}!","username":username})

@app.route("/logout", methods=["POST"])
def logout():
    session.pop("user", None)
    return jsonify({"message": "Logged out successfully"})

@app.route("/protected", methods=["GET"])
def protected():
    if "user" not in session:
        return jsonify({"message": "Unauthorized access"}), 401
    return jsonify({"message": f"Hello, {session['user']}! This is a protected route."})


@app.route("/randomText", methods=["GET"])
def randomText():
    # response = requests.get('http://localhost:4000/chatgpt')
    # random_text = response.json()['response']
    random_text = "random_text"
    print(random_text)
    return jsonify({"message": random_text})

@app.route("/", methods=["GET"])
def home():
    return '<h1> HOME PAGE </h1>'


# if __name__ == "__main__":
#     # app.run(debug=True)
#     # print("********connecte to the server*******")
#     app.run()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Use Azure's port, default to 8000
    app.run(host='0.0.0.0', port=port)