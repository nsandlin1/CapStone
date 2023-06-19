import os
import sys
from webapp import create_web_app

correct_num_args = len(sys.argv) == 2
if not correct_num_args:
	raise Exception("Incorrect number of terminal args")

# call the factory
envs = ["prod", "dev", "test"]
if sys.argv[1] in envs:
	env = sys.argv[1]
else:
	raise Exception("Invalid environment given")

app = create_web_app(env)

if __name__ == '__main__':
	app.run()
