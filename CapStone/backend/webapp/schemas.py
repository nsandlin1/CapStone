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

# class BillSchema(ma.Schema):
#     class Meta:
#         model = Bill
#         fields = ("content_url", "number", "originChamber", "summary", "title", "updateDate")

# bill_schema = BillSchema()