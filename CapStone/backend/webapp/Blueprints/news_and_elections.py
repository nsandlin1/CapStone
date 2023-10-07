from flask import Blueprint, request, current_app
from ..schemas import many_news_schema, elections_schema
from ..models import News, Election
from ..dataCollect.api_for_members import fetchNews, fetchElections
from ..extensions import db
from loguru import logger
from datetime import datetime

news_and_elections = Blueprint('news_and_elections', __name__)

@news_and_elections.route('/news_general')
def news_general():
    update = request.args.get("update")

    if update == "True":
        try:
            logger.debug("fetching")
            news = fetchNews(current_app.config["NEWS_API_KEY"])
            logger.debug("done fetching")
        except Exception as e:
            print("error")
            raise Exception(e)
        
        new_news = []
        for n in news:
            if News.query.get(n["title"]) == None:
                new_news.append(News(
                    n["title"],
                    n["abstract"],
                    n["published_date"],
                    n["url"],
                    n["company"],
                    n["imgURL"]
                ))

        db.session.add_all(new_news)
        db.session.commit()

        return str(len(new_news))

    else:
        return many_news_schema.jsonify(News.query.all())
    
@news_and_elections.route('/elections')
def elections():
    update = request.args.get("update")
    
    if update == "True":
        try:
            elections = fetchElections(current_app.config["ELECTIONS_API_KEY"])
        except Exception as e:
            print("error")
            raise Exception(e)

        new_elections = []
        logger.debug(elections)
        for e in elections:
            if Election.query.get(e["id"]) == None:
                new_elections.append(Election(
                    int(e["id"]),
                    e["name"],
                    datetime.strptime(e["electionDay"], '%Y-%m-%d').date(),
                ))

        db.session.add_all(new_elections)
        db.session.commit()

        return str(len(new_elections))

    else:
        return elections_schema.jsonify(Election.query.all())
