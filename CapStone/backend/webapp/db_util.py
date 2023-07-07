from .extensions import db
from flask import current_app

# must be called from within app context
def init_db():
    db.drop_all()
    db.create_all()