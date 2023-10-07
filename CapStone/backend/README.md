
run "pip install -r requirements.txt" to install requirements
run "python wsgi.py" to start api

wsgi.py: application entrypoint

__init__: application factory

config.py: public application configurations

instance/: flask files not included in git
    database.py: sqlite database
    config.py: hidden configs, e.g.: api keys

webapp/: application
    blueprints/: abstracted URL organization
    dataCollect/: pull data from third-party apis
    extensions: necessary extensions for app e.g.: marshmallow, orm
    schemas: marshmallow schemas
    models: SQLAlchemy models linked to marshmallow schemas
    db_util: random utilities


API doc

/api
    /congress
        /members
            ?branch
                {senate} or {house}
            e.g.
                http://127.0.0.1:5000/api/congress/members?branch=senate

                [
                    {
                        "Website": "https://www.baldwin.senate.gov",
                        "contact_form": "https://www.baldwin.senate.gov/feedback",
                        "date_of_birth": "1962-02-11",
                        "facebook": "senatortammybaldwin",
                        "first_name": "Tammy",
                        "id": "B001230",
                        "last_name": "Baldwin",
                        "middle_name": null,
                        "party": "D",
                        "phone": "202-224-5653",
                        "state": "WI",
                        "twitter": "SenatorBaldwin"
                    },
                    ...
                ]
        /member_image
            ?id
                {id of senator}
            e.g.
                http://127.0.0.1:5000/api/congress/member_image?id=B001230

                {
                "id": "B001230",
                "image_url": "https://www.congress.gov/img/member/b001230_200.jpg"
                }

        /get_bills
            e.g.
                http://127.0.0.1:5000/api/congress/get_bills

                [
                    {
                        "content_url": "https://www.congress.gov/118/bills/hr824/BILLS-118hr824ih.htm",
                        "number": "824",
                        "originChamber": "House",
                        "summary": "Telehealth Benefit Expansion for Workers Act of 2023 This bill amends the Public Health Service Act, the Employee Retirement Income Security Act of 1974, and the Internal Revenue Code to treat benefits for telehealth services offered under a group health plan or group health insurance coverage as excepted benefits. This bill amends the Public Health Service Act, the Employee Retirement Income Security Act of 1974, and the Internal Revenue Code to allow telehealth services under a group health plan or group health insurance coverage to be treated as excepted benefits if the provision of such services by a group health plan or group health insurance coverage is in addition to other benefits that are excepted from the scope of the plan or coverage.",
                        "title": "Telehealth Benefit Expansion for Workers Act of 2023",
                        "updateDate": "2023-07-01"
                    },
                    ...
                ]

        /state_members
            ?state
                {2 letter state abbreviation}
            ?branch
                capital first letter
                {House} or {Senate}
            e.g.
                http://localhost:5000/api/congress/state_members?state=OR&branch=Senate

                [
                    {
                        "branch": "Senate",
                        "district": 13,
                        "id": "ocd-person/b6d52f54-a740-4157-b73c-799e46567691",
                        "image_url": "https://www.oregonlegislature.gov/woods/PublishingImages/member_photo.jpg",
                        "name": "Aaron Woods",
                        "openstates_url": "https://openstates.org/person/aaron-woods-5Z01oXPnnFHBVvMfzH5k5R/",
                        "party": "Democratic",
                        "state": "OR"
                    },
                    ...
                ]