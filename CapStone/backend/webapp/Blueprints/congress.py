from flask import current_app, Blueprint, request
from ..dataCollect.api_for_members import *
from ..extensions import db
from ..models import JpegUrl
from ..schemas import jpeg_url_schema
from loguru import logger
import re


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
    for bill in bills[0:4]:
        print(bill["title"])
        try:
            content_url = congressgov_get_bill_contents_url(current_app.config["CONGRESS_GOV_API_KEY"], bill["congress"], bill["type"].lower(), bill["number"])

            if content_url == None:
                print("is none")
                continue
            else:
                print(content_url)
            
            content_json = congressgov_get_bill_contents(current_app.config["CONGRESS_GOV_API_KEY"], content_url)
            content = content_json["html"]["body"]["pre"]

            # preprocess
            content_filtered = content.strip()
            # content_filtered = content_filtered.replace('\n', ' ')
            content_filtered = re.sub(' +', ' ', content_filtered)
            print("content_filtered")

            # TODO make this reliable, returns errors for most and null for many others
            summary = summ_model(current_app.config["MOD_AUTH"], content_filtered)

            # if summary[(len(summary)-1)] != ".":
                # separator = '.'
                # summary_filtered = summary.rsplit(separator, 1)[0] + separator

        except Exception as e:
            print(e)
            content_url = None
            content = None
            summary = None


        refactored.append({
                "title": bill["title"],
                "originChamber": bill["originChamber"],
                "number": bill["number"],
                "updateDate": bill["updateDate"],
                "content_url": content_url,
                "summary": summary,
                # "content_filtered": content_filtered
        }) 

    return refactored


# GET /bill/{congress}/{billType}/{billNumber}/text for bill contents