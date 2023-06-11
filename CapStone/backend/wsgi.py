import os
from webapp import create_web_app

# call the factory
# env = prod, dev, test
app = create_web_app(env="prod")

if __name__ == '__main__':
	app.run()
