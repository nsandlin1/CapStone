import os
import sys
from webapp import create_web_app
import argparse

parser = argparse.ArgumentParser(description='Handle app startup.')
parser.add_argument("-e", "--env", choices={"prod", "dev", "test"}, default="dev", help="Specify the runtime environment.")
parser.add_argument("-i", "--initdb", action="store_true", help="Reset or Initialize the database.")
args = parser.parse_args()

app = create_web_app(args.env, args.initdb)

if __name__ == '__main__':
	app.run(host='0.0.0.0')