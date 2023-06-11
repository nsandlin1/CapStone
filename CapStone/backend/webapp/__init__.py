import os
from flask import Flask

def create_web_app(test_config=None):
	# create and configure app
	app = Flask(__name__, instance_relative_config=True)
	app.config.from_mapping(
		SECRET_KEY='dev',
		DATABASE=os.path.join(app.instance_path, 'webapp.sqlite')
	)
	
	if test_config is None:
		# load the instance config when not testing
		app.config.from_pyfile('config.py', silent=True)
	else:
		# load the test config when testing
		app.config.from_mapping(test_config)
	
	# make sure instance folder exists
	try:
		os.makedirs(app.instance_path)
	except OSError:
		pass

	return app
