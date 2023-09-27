# https://flask-jwt-extended.readthedocs.io/en/3.0.0_release/tokens_in_cookies/

# TODO: Stop user from chain-registering multiple accounts

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, set_access_cookies, \
                               set_refresh_cookies, unset_jwt_cookies, jwt_required
from ..models import User
from werkzeug.security import generate_password_hash, check_password_hash
from ..extensions import db
from flask_cors import cross_origin
import json

user = Blueprint('user', __name__)

@user.route('/sign-up', methods=['POST'])
@cross_origin(supports_credentials=True, origins='*')
def sign_up():
    data = json.loads(request.data.decode('utf-8'))

    email = data["email"]
    password = data["password"]
    username = None
    firstname = None
    lastname = None
    role = None

    if User.query.get(email) != None:
        return jsonify({'signed-up': False, 'Error': 'User Account Already Exists'}), 418
    
    db.session.add(User(
        email,
        generate_password_hash(password),
        username,
        firstname,
        lastname,
        role
    ))
    db.session.commit()

    return jsonify({'signed-up': True})
    

@user.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True, origins='*')
def login():

    data = json.loads(request.data.decode('utf-8'))
    email = data["email"]
    password = data["password"]

    stored_user = User.query.get(email)
    if stored_user != None and check_password_hash(stored_user.password, password):
        print('logged in')

        access_token = create_access_token(identity=email)
        # so client can get new access token when expires
        refresh_token = create_refresh_token(identity=email)
        resp = jsonify({
            'login': True, 
            'user': {
                'email': stored_user.email,
                'username': stored_user.username,
                'firstname': stored_user.first_name,
                'lastname': stored_user.last_name,
                'role': stored_user.role
            }
        })

        set_access_cookies(resp, access_token)
        set_refresh_cookies(resp, refresh_token)

        return resp
    
    print("failed to login")

    return jsonify({'login': False, 'Error': 'User Authentication Failed'})

# TODO: WHy it no delete??? it just registers a new cookie
@user.route('/logout')
@jwt_required()
def logout():
    print("logging out")
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200

@user.route('/profile')
@jwt_required()
def profile():
    return "user profile shit"
