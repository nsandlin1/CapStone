from .extensions import ma
from .models import *

# marshmallow allows serialization for returning objects through RESTful-required json

class CongressmanSchema(ma.Schema):
    class Meta:
        model = Congressman
        fields = ('id', 'first_name', 'last_name', 'state', 'dob', 'party', 'middle_name', 'contact_form', 'phone', 'facebook', 'twitter', 'website')
    
congressman_schema = CongressmanSchema()
# same but plural, don't know if I need
# congressmen_schema = CongressmanSchema(many=True, strict=True)

class JpegUrlSchema(ma.Schema):
    class Meta:
        model = JpegUrl
        fields = ('id', 'image_url')

jpeg_url_schema = JpegUrlSchema()