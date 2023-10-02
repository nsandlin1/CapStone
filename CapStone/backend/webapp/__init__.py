import os
from config import configs
from flask import Flask
from loguru import logger
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from datetime import datetime, timedelta, timezone
import json
from .extensions import db, ma, crs, jwt, prae
from .schemas import *
from .db_util import init_db

def create_web_app(env, initdb):
	# create and configure app
	app = Flask(__name__, instance_relative_config=True)
	app.debug = True

	# logger.debug(app.instance_path)
	# configure application from root/config
	app.config.from_object(configs[env])
	# logger.debug(app.config)

	# configure application secrets from instance/config
	app.config.from_pyfile('config.py')

	# register blueprints
	from .Blueprints.congress import congress
	app.register_blueprint(congress, url_prefix='/api/congress')
	from .Blueprints.user import user
	app.register_blueprint(user, url_prefix='/api/user')
	from .Blueprints.news_and_elections import news_and_elections
	app.register_blueprint(news_and_elections, url_prefix='/api/news_and_elections')
	from .Blueprints.classes import classes
	app.register_blueprint(classes, url_prefix='/api/classes')

	# initialize database with relative instance_path
	db.init_app(app)
	print(initdb)
	if initdb == True:
		with app.app_context():
			init_db()
		# so that db only initialized on initial startup
		initdb = False

	# initialize marshmallow
	ma.init_app(app)

	# initialize praetorian
	# prae.init_app(app, User)

	# initialize CORS (using this allows api request from react ig)
	crs.init_app(app, origins='*')

	# initialize JSON Web Token
	jwt.init_app(app)

	# make sure instance folder exists
	try:
		os.makedirs(app.instance_path)
	except OSError:
		pass

	@app.after_request
	def refresh_expiring_jwts(response):
		try:
			exp_timestamp = get_jwt()["exp"]
			now = datetime.now(timezone.utc)
			target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
			if target_timestamp > exp_timestamp:
				access_token = create_access_token(identity=get_jwt_identity())
				data = response.get_json()
				if type(data) is dict:
					data["access_token"] = access_token 
					response.data = json.dumps(data)
			return response
		except (RuntimeError, KeyError):
			# Case where there is not a valid JWT. Just return the original respone
			return response

	return app