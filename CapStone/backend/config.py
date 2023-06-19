import os

class Config:
	pass

class ProductionConfig(Config):
	DEBUG = False
	TESTING = False
	ENV = "production"

class DevelopmentConfig(Config):
	DEBUG = True
	TESTING = False
	ENV = "development"

class TestingConfig(Config):
	DEBUG = False
	TESTING = True
	ENV = "testing"

configs = {
	"prod": ProductionConfig,
	"dev": DevelopmentConfig,
	"test": TestingConfig
}
