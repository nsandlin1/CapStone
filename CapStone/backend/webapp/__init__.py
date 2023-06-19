import os
import sys
from config import configs
from flask import Flask
from loguru import logger

def create_web_app(env="dev"):
	# create and configure app
	app = Flask(__name__, instance_relative_config=True)
	app.debug = True

	# configure application from root/config
	app.config.from_object(configs[env])
	
	# configure application secrets from instance/config
	app.config.from_pyfile('config.py')

	# make sure instance folder exists
	try:
		os.makedirs(app.instance_path)
	except OSError:
		pass

	return app
