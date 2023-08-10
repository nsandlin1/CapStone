import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
	CURRENT_CONGRESS = 118
	SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or\
		  'sqlite:///' + os.path.join(basedir, 'instance', 'database.db')
	SQLALCHEMY_TRACK_MODIFICATIONS = False
	# JWT_TOKEN_LOCATION = ['headers', 'query_string']
class ProductionConfig(Config):
	DEBUG = False
	TESTING = False
	ENV = "production"
	DATABASE = "prod.db"

class DevelopmentConfig(Config):
	DEBUG = True
	TESTING = False
	ENV = "development"
	DATABASE = "dev.db"

class TestingConfig(Config):
	DEBUG = False
	TESTING = True
	ENV = "testing"
	DATABASE = "test.db"

configs = {
	"prod": ProductionConfig,
	"dev": DevelopmentConfig,
	"test": TestingConfig
}
