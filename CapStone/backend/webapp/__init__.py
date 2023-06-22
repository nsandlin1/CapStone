import os
from config import configs
from flask import Flask, g
from loguru import logger
from flask_sqlalchemy import SQLAlchemy
from .extensions import db, ma
from .schemas import *
from .db_util import reset_db

def create_web_app(env="dev"):
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
	from .Blueprints.senate import api
	app.register_blueprint(api, url_prefix='/api')

	# initialize database with relative instance_path
	db.init_app(app)
	restart = True
	if restart == True:
		with app.app_context():
			reset_db()

	# initialize marshmallow
	ma.init_app(app)

	# make sure instance folder exists
	try:
		os.makedirs(app.instance_path)
	except OSError:
		pass

	return app

