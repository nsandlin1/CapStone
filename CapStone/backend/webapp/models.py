from sqlalchemy import Column, Integer,  String, ForeignKey, DateTime, Boolean, Date, UniqueConstraint
from .extensions import db


class Congressman(db.Model):
    __tablename__ = 'congressmen'
    __table_args__ = (
        UniqueConstraint('first_name', 'last_name', name='_fn_ln_uc'),
    )

    id = Column(String(7), primary_key=True)
    branch = Column(String(6))
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    state = Column(String(2), nullable=False)
    dob = Column(Date, nullable=False)
    party = Column(String(1), nullable=False)
    middle_name = Column(String(50))
    contact_form = Column(String(255))
    phone = Column(String(13))
    facebook = Column(String(255))
    twitter = Column(String(255))
    youtube = Column(String(255))
    website = Column(String(255))

    def __init__(self, id, branch, first_name, last_name, state, dob, party, middle_name=None, contact_form=None, phone=None, facebook=None, twitter=None, youtube=None, website=None):
        self.id = id
        self.branch = branch
        self.first_name = first_name
        self.last_name = last_name
        self.state = state
        self.dob = dob
        self.party = party
        self.middle_name = middle_name
        self.contact_form = contact_form
        self.phone = phone
        self.facebook = facebook
        self.twitter = twitter
        self.youtube = youtube
        self.website = website

    def __repr__(self):
        return f'<Congressman "{self.id} {self.first_name} {self.last_name}">'

class JpegUrl(db.Model):
    __tablename__ = 'congressmen_images'

    id = Column(String(7), primary_key=True)
    image_url = Column(String(255), nullable=False)

    def __init__(self, id, image_url):
        self.id = id
        self.image_url = image_url

    def __repr__(self):
        return f'<JpegUrl "{self.id} {self.image_url}">'
    
# class Bill(db.Model):
#     __tablename__ = 'bills'

#     ...