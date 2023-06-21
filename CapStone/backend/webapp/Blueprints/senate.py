from flask import current_app, Blueprint, request
from ..dataCollect.api_for_members import *

api = Blueprint('api', __name__)

@api.route('/members')
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
              "Website": member["url"]
        })

    return members_chopped

@api.route('/member_image')
def memberimage():
    id = request.args.get("id")
    imageUrl = get_image(current_app.config["CONGRESS_GOV_API_KEY"], id)

    return imageUrl