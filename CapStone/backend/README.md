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
                    {
                        "Website": "https://www.barrasso.senate.gov",
                        "contact_form": "https://www.barrasso.senate.gov/public/index.cfm/contact-form",
                        "date_of_birth": "1952-07-21",
                        "facebook": "johnbarrasso",
                        "first_name": "John",
                        "id": "B001261",
                        "last_name": "Barrasso",
                        "middle_name": null,
                        "party": "R",
                        "phone": "202-224-6441",
                        "state": "WY",
                        "twitter": "SenJohnBarrasso"
                    }
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