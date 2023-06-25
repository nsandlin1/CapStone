import { Fragment } from "react";

// I don't think im even using this
class Politician {
    constructor(website, contact_form, date_of_birth, facebook, first_name, id, last_name, middle_name, party, phone, state, twitter, image_url) {
        this.website = website
        this.contact_form = contact_form
        this.date_of_birth = date_of_birth
        this.facebook = facebook
        this.first_name = first_name
        this.id = id
        this.last_name = last_name
        this.middle_name = middle_name
        this.party = party
        this.phone = phone
        this.state = state
        this.twitter = twitter
        this.image_url = image_url
    }
}

function PoliticianBlock({ pol }) {
    return (
        <div className="card">
            <img src={pol.image_url} className="card-img-top" alt="Image Unavailable" />
            <div className="card-body">
                    <h5 className="card-title">{pol.first_name} {pol.last_name}</h5>
                    <p className="card-text">{pol.state} {pol.party}</p>
            </div>
        </div>
    );
}

export { Politician, PoliticianBlock }

// "Website": "https://www.barrasso.senate.gov",
// "contact_form": "https://www.barrasso.senate.gov/public/index.cfm/contact-form",
// "date_of_birth": "1952-07-21",
// "facebook": "johnbarrasso",
// "first_name": "John",
// "id": "B001261",
// "last_name": "Barrasso",
// "middle_name": null,
// "party": "R",
// "phone": "202-224-6441",
// "state": "WY",
// "twitter": "SenJohnBarrasso"