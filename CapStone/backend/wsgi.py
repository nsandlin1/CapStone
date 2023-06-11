import os
from webapp import create_web_app

# call the factory
app = create_web_app()

if __name__ == '__main__':
	app.run(debug=True)
