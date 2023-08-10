from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

from flask_marshmallow import Marshmallow
ma = Marshmallow()

from flask_cors import CORS
crs = CORS()

from flask_jwt_extended import JWTManager
jwt = JWTManager()

from flask_praetorian import Praetorian
prae = Praetorian()