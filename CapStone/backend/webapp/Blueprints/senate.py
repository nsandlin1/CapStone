from flask import current_app, Blueprint, request
from ..dataCollect.api_for_members import *
from ..extensions import db
from ..models import JpegUrl
from ..schemas import jpeg_url_schema
from loguru import logger

congress = Blueprint('congress', __name__)

@congress.route('/members')
def memberdata():
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
def memberimage():
    id = request.args.get("id")
    logger.debug(f"id: {id}")
    jpgUrl = db.session.get(JpegUrl, id)

    if jpgUrl == None:
        try:
            image_url = get_image(current_app.config["CONGRESS_GOV_API_KEY"], id)
        except Exception as e:
            return str(e), 404

        jpgUrl = JpegUrl(id, image_url)

        db.session.add(jpgUrl)
        db.session.commit()

    return jpeg_url_schema.jsonify(jpgUrl)
