import { Fragment } from "react";
import { Wrapper } from "../components/widgets";

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

    setImageURL(image_url){
        this.image_url = image_url
    }

}

function PoliticianBlock({ pol, image_url}) {

    const cardClass = `flex flex-col justify-center items-center bg-white gap-2 py-2 
                        rounded-xl w-[45%] h-[2%] md:w-[30%] md:h-[4%] lg:w-[15.5%] lg:h-[7%]`

    const imageClass = `${pol.party === 'D' ? 'border-blue-800' : 'border-red-500'} border-4 rounded-full overflow-hidden w-24 h-24 md:h-36 md:w-36 `

    return (
        // make where you can click on the card and go to a dynamically
        // generated link about the individual senator
            <div className={cardClass}>
                <div className="flex flex-shrink-0">
                    <div className={imageClass}>
                        <img src={image_url} className="object-cover h-full w-full" alt="Image Unavailable" />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                        <h5 className="card-title">{pol.first_name} {pol.last_name}</h5>
                        <p className="card-text">{pol.state}</p>
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