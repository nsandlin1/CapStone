from flask import current_app, Blueprint, request
from ..dataCollect.api_for_members import *
from ..extensions import db
from ..models import JpegUrl
from ..schemas import jpeg_url_schema
from loguru import logger
from PyPDF2 import PdfReader

congress = Blueprint('congress', __name__)

@congress.route('/members')
def members():
    # house or senate
    branch = request.args.get("branch")
    members = propublica_get_members(current_app.config["PROPUBLICA_API_KEY"], current_app.config["CURRENT_CONGRESS"], branch)
    members_chopped = []

    for member in members["results"][0]["members"]:
        members_chopped.append({
              "id": member["id"],
              "first_name": member["first_name"],
              "middle_name": member["middle_name"],
              "last_name": member["last_name"],
              "party": member["party"],
              "state": member["state"],
              "date_of_birth": member["date_of_birth"],
              "contact_form": member["contact_form"],
              "phone": member["phone"],
              "facebook": member["facebook_account"],
              "twitter": member["twitter_account"],
              "website": member["url"]
        })

    return members_chopped

@congress.route('/member_image')
def member_image():
    id = request.args.get("id")
    logger.debug(f"id: {id}")
    jpgUrl = db.session.get(JpegUrl, id)

    if jpgUrl == None:
        try:
            image_url = congressgov_get_image(current_app.config["CONGRESS_GOV_API_KEY"], id)
        except Exception as e:
            return str(e), 404

        jpgUrl = JpegUrl(id, image_url)

        db.session.add(jpgUrl)
        db.session.commit()

    return jpeg_url_schema.jsonify(jpgUrl)

@congress.route('/get_bills')
def get_bills():
    bills = congressgov_get_bills(current_app.config["CONGRESS_GOV_API_KEY"])

    # probably need to thread this it's slow af
    refactored = []
    for bill in bills:
        print(bill["title"])
        try:
            content_url = congressgov_get_bill_contents(current_app.config["CONGRESS_GOV_API_KEY"], bill["congress"], bill["type"].lower(), bill["number"])
            print("contents got")
        except:
            content_url = None

        bill["content_url"] = content_url

        refactored.append({
                "title": bill["title"],
                "originChamber": bill["originChamber"],
                "number": bill["number"],
                "updateDate": bill["updateDate"],
                "content_url": bill["content_url"]
        }) 

    return refactored


# GET /bill/{congress}/{billType}/{billNumber}/text for bill contents