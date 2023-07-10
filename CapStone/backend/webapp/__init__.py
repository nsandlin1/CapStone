import os
from config import configs
from flask import Flask, g
from loguru import logger
from flask_sqlalchemy import SQLAlchemy
from .extensions import db, ma, crs
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

	# initialize CORS (using this allows api request from react ig)
	crs.init_app(app)

	# make sure instance folder exists
	try:
		os.makedirs(app.instance_path)
	except OSError:
		pass

	return app

