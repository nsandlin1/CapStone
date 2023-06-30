import { Fragment, useEffect, useState, useRef} from "react";
import { Wrapper } from "../components/widgets";
import { FcCollapse } from "react-icons/fc";

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

function borderColor(party) {
    if (party == 'D'){
        return 'border-blue-800'
    }
    else if (party == 'R'){
        return 'border-red-500'
    }
    else { return('border-gray-600') }
}




function PoliticianBlock({ pol, image_url, isExpanded, toggleCollapse}) {

    const blockRef = useRef(null);



    useEffect(() => {
        if (isExpanded && blockRef.current) {
        blockRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [isExpanded]);

    const cardClassCollapsed = `relative flex flex-col justify-center items-center bg-white gap-2 py-2 
                                rounded-xl w-[45%] h-[2%] md:w-[30%] md:h-[3%] lg:w-[15%] lg:h-[7%]`

    const cardClassExpanded = `relative flex flex-col justify-center items-center bg-white gap-2 py-2 
                                rounded-xl w-[93%] h-[5%] md:w-[93%] md:h-[8%] lg:w-[94%] lg:h-[10%]`

    const imageClassCollapsed = `${borderColor(pol.party)} border-4 rounded-full overflow-hidden w-20 h-20 
                                md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-36 xl:w-36`

    const imageClassExpanded = `${borderColor(pol.party)}  absolute top-6 left-4 border-4 rounded-full 
                                overflow-hidden w-36 h-36 
                                md:h-40 md:w-40
                                lg:h-44 lg:w-44
                                xl:h-52 xl:w-52`

    return (
        // make where you can click on the card and go to a dynamically
        // generated link about the individual senator
            <div
                ref={blockRef} 
                className={!isExpanded ? cardClassCollapsed : cardClassExpanded} 
                onClick={!isExpanded ? toggleCollapse : ""}
            >
                {isExpanded ? < FcCollapse size={30}  className="absolute top-2 right-2" onClick={toggleCollapse} /> : ""}
                <div className="flex flex-shrink-0">
                    <div className={isExpanded ? imageClassExpanded : imageClassCollapsed}>
                        <img src={image_url} className="object-cover h-full w-full" alt="Image Unavailable" />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                        <h5 className="card-title">{pol.first_name} {pol.last_name}</h5>
                        <p className="card-text">{pol.state}</p>
                        {!isExpanded ? "" : <p>{pol.website} {pol.facebook}</p>}
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