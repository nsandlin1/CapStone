from .extensions import ma
from .models import *

# marshmallow allows serialization for returning objects through RESTful-required json

class CongressmanSchema(ma.Schema):
    class Meta:
        model = Congressman
        fields = ('id', 'branch', 'first_name', 'last_name', 'state', 'dob', 'party', 'middle_name', 'contact_form', 'phone', 'facebook', 'twitter', 'youtube', 'website')
    
congressman_schema = CongressmanSchema()
congressmen_schema = CongressmanSchema(many=True)

class JpegUrlSchema(ma.Schema):
    class Meta:
        model = JpegUrl
        fields = ('id', 'image_url')

jpeg_url_schema = JpegUrlSchema()
jpeg_urls_schema = JpegUrlSchema(many=True)

class BillSchema(ma.Schema):
    class Meta:
        model = Bill
        fields = ("title",  "number", "content_url", "summary_short", "summary_med", "summary_long", "originChamber", "updateDate")

bill_schema = BillSchema()
bills_schema = BillSchema(many=True)

class StateCongressmanSchema(ma.Schema):
    class Meta:
        model = StateCongressman
        fields = ("id", "name", "party", "branch", "district", "state", "image_url", "openstates_url")

state_congressman_schema = StateCongressmanSchema()
state_congressmen_schema = StateCongressmanSchema(many=True)

class StateSenateMajority(ma.Schema):
    class Meta:
        model = StateSenateMajority
        fields = ("state", "majority")

state_senate_majority_schema = StateSenateMajority()
state_senate_majority_schema = StateSenateMajority(many=True)