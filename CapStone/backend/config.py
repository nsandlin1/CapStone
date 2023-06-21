import os

class Config:
	CURRENT_CONGRESS = 118

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
