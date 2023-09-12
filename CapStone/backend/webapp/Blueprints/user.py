# https://flask-jwt-extended.readthedocs.io/en/3.0.0_release/tokens_in_cookies/



from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, set_access_cookies, \
                               set_refresh_cookies, unset_jwt_cookies, jwt_required
from ..models import User
from werkzeug.security import generate_password_hash, check_password_hash
from ..extensions import db
from flask_cors import cross_origin

user = Blueprint('user', __name__)

@user.route('/sign-up')
def sign_up():
    email = request.args.get("email", None)
    password = request.args.get("password", None)

    if User.query.get(email) != None:
        return jsonify({'signed-up': False, 'Error': 'User Account Already Exists'}), 418
    
    db.session.add(User(
        email,
        generate_password_hash(password)
    ))
    db.session.commit()

    return jsonify({'signed-up': True}), 200
    

@user.route('/login')
def login():
    email = request.args.get("email", None)
    password = request.args.get("password", None)

    stored_user = User.query.get(email)
    if stored_user == None or not check_password_hash(stored_user.password, password):
        return jsonify({'login': False, 'Error': 'User Authentication Failed'}), 401
    
    access_token = create_access_token(identity=email)
    # so client can get new access token when expires
    # refresh_token = create_refresh_token(identity=email)

    resp = jsonify({'login': True})
    set_access_cookies(resp, access_token)
    # set_refresh_cookies(resp, refresh_token)

    # resp.headers.add("Access-Control-Allow-Origin", "*")
    
    return resp, 200

@user.route('/logout')
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200

@user.route('/profile')
@jwt_required()
def profile():
    return "user profile shit"