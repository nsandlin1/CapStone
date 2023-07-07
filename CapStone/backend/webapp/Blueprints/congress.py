from flask import current_app, Blueprint, request
from ..dataCollect.api_for_members import *
from ..extensions import db
from ..models import JpegUrl, Congressman, Bill
from ..schemas import jpeg_url_schema, congressmen_schema, bills_schema
from loguru import logger
import re
from datetime import datetime


# TODO: make where if data is pulled as a group, insert if not already in database. Right now it only inserts if database is empty, so on initialization

congress = Blueprint('congress', __name__)

@congress.route('/members')
def members():
    # house or senate
    branch_id = request.args.get("branch")

    congressmen = Congressman.query.filter_by(branch=branch_id).all()
    logger.debug(branch_id)
    logger.debug(congressmen)

    if congressmen == []:
        logger.debug("congressmen is none, pulling")
        try:
            congressmen = propublica_get_members(current_app.config["PROPUBLICA_API_KEY"], current_app.config["CURRENT_CONGRESS"], branch_id)["results"][0]["members"]
        except Exception as e:
            str(e), 404

        congressmen = [
            Congressman(
                c["id"],
                branch_id,
                c["first_name"],
                c["last_name"],
                c["state"],
                datetime.strptime(c["date_of_birth"], '%Y-%m-%d').date(),
                c["party"],
                c["middle_name"],
                c["contact_form"],
                c["phone"],
                c["facebook_account"],
                c["twitter_account"],
                c["youtube_account"],
                c["url"]
            ) for c in congressmen
        ]

        db.session.add_all(congressmen)
        db.session.commit()

    return congressmen_schema.jsonify(congressmen)

@congress.route('/member_image')
def member_image():
    id = request.args.get("id")
    logger.debug(f"id: {id}")

    jpgUrl = JpegUrl.query.get(id)
    logger.debug(jpgUrl)

    if jpgUrl == None:
        print("it is none, pulling")
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
    # true or false
    update = request.args.get("update")

    if update == "True":
        num_new = 0
        
        try:
            new_bills = congressgov_get_bills(current_app.config["CONGRESS_GOV_API_KEY"])
        except Exception as e:
            logger.debug(str(e))

        # probably need to thread this it's slow af
        bills = []
        for bill in new_bills:
            bill_in_db = Bill.query.get(bill["title"]) is not None
            if not bill_in_db:
                print(bill["title"])
                print("not in db")
                try:
                    content_url = congressgov_get_bill_contents_url(current_app.config["CONGRESS_GOV_API_KEY"], bill["congress"], bill["type"].lower(), bill["number"])
                    print("content_url" + content_url)
                except:
                    content_url = None
                    print("is none")
                    continue
                
                try:
                    content_json = congressgov_get_bill_contents(current_app.config["CONGRESS_GOV_API_KEY"], content_url)
                    content = content_json["html"]["body"]["pre"]

                    # preprocess
                    content_filtered = content.strip()
                    # content_filtered = content_filtered.replace('\n', ' ')
                    content_filtered = re.sub(' +', ' ', content_filtered)
                    print("content_filtered")

                    # TODO make this reliable, returns errors for most and null for many others
                    summary = summ_model(current_app.config["MOD_AUTH"], content_filtered)

                    # delete everythin after last period
                    # if summary[(len(summary)-1)] != ".":
                        # separator = '.'
                        # summary_filtered = summary.rsplit(separator, 1)[0] + separator

                except Exception as e:
                    print(e)
                    content = None
                    summary = None

                new_bill = Bill(
                    bill["title"],
                    bill["number"],
                    content_url,
                    summary,
                    bill["originChamber"],
                    datetime.strptime(bill["updateDate"], '%Y-%m-%d').date()
                )

                num_new += 1
                bills.append(new_bill)

        # bills could still be [] though unlikely
        # for bill in bills:
        #     if not Bill.query.get(bill.title):
        #         db.session.add(bill)

        db.session.add_all(bills)
        db.session.commit()
        
        return str(num_new)

    else:
        bills = Bill.query.all()

    logger.debug(bills)
    return bills_schema.jsonify(bills)


# GET /bill/{congress}/{billType}/{billNumber}/text for bill contents