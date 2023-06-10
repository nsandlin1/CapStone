from flask import Flask

api = Flask(__name__)

@api.route('/')
def base():
	response = {
		"name": "hello",
		"age": 5
	}

	return response
