import os
import sys
from webapp import create_web_app

correct_num_args = (len(sys.argv) <= 2)
if not correct_num_args:
	raise Exception("Incorrect number of terminal args")

# Get env if specified and call the factory
envs = ["prod", "dev", "test"]
if len(sys.argv) == 1:
	app = create_web_app()
else:
	if sys.argv[1] in envs:
		env = sys.argv[1]
		app = create_web_app(env)
	else:
		raise Exception("Invalid environment given")

if __name__ == '__main__':
	app.run(host='0.0.0.0')