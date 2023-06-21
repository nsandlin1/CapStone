import os
from config import configs
from flask import Flask
from loguru import logger

def create_web_app(env="dev"):
	# create and configure app
	app = Flask(__name__, instance_relative_config=True)
	app.debug = True

	# logger.debug(app.config)
	# configure application from root/config
	app.config.from_object(configs[env])
	# logger.debug(app.config)

	# configure application secrets from instance/config
	app.config.from_pyfile('config.py')

	# register blueprints
	from .Blueprints.senate import api
	app.register_blueprint(api, url_prefix='/api')

	# register database
	from . import db
	db.init_app(app)

	# make sure instance folder exists
	try:
		os.makedirs(app.instance_path)
	except OSError:
		pass

	return app
