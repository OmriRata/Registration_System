from flask import Flask, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
import requests
import pymongo
import os
from flask_cors import CORS


app = Flask(__name__)
app.secret_key = "supersecretkey"  # Change this in production
CORS(app, supports_credentials=True)  # Allow frontend requests with credentials

# connect to the DB 
# DB_URL = os.getenv('DB_URL')
DB_URL = "mongodb+srv://omrata94:OLNlVHcW2ibVjrei@cluster0.qzwlb.mongodb.net/"
# DB_URL = "mongodb://localhost:27017/"
client = pymongo.MongoClient(DB_URL)
db = client.Registration_System
users_collection = db.users


################# Add users to the Database #################
# newUser = {
#         "first_name":"user1",
#         "last_name":"user1",
#         "pwd":generate_password_hash("pass123"),
#         "email":"user1@gmail.com",
#     }
# users_collection.insert_one(newUser);
# newUser2= {
#         "first_name":"user2",
#         "last_name":"user2",
#         "pwd":generate_password_hash("pass456"),
#         "email":"user2@gmail.com",
#     }
# users_collection.insert_one(newUser2);
# newUser3 = {
#         "first_name":"user3",
#         "last_name":"user3",
#         "pwd":generate_password_hash("pass789"),
#         "email":"user3@gmail.com",
#     }
# users_collection.insert_one(newUser3);



@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Username and password are required"}), 400
    
    user = users_collection.find_one({'email':email})

    if not user or not check_password_hash(user["pwd"], password):
        return jsonify({"message": "Invalid username or password"}), 401

    session["user"] = email  # Store user session
    first_name = user["first_name"]
    random_text = getRandomText()
    print(random_text)
    return jsonify({"message": f"Welcome, {first_name}!","username":first_name,"random_text":random_text})

@app.route("/logout", methods=["POST"])
def logout():
    session.pop("user", None)
    return jsonify({"message": "Logged out successfully"})

@app.route("/protected", methods=["GET"])
def protected():
    if "user" not in session:
        return jsonify({"message": "Unauthorized access"}), 401
    return jsonify({"message": f"Hello, {session['user']}! This is a protected route."})


def getRandomText():
    try:
        response = requests.get('http://localhost:4000/chatgpt')
        random_text = response.json()['response']
    except:
        return None
    # random_text = "random_text"
    return random_text

@app.route("/", methods=["GET"])
def home():
    return '<h1> HOME PAGE </h1>'


# if __name__ == "__main__":
#     app.run(debug=True)
#     print("********connect to the server*******")
    # app.run()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Use Azure's port, default to 8000
    app.run(host='0.0.0.0', port=port)