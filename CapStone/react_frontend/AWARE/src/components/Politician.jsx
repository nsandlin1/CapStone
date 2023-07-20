import { Fragment, useEffect, useState, useRef} from "react";
import { Wrapper } from "../components/widgets";
import { FcCollapse } from "react-icons/fc";
import { IoLogoFacebook, IoLogoTwitter, IoLogoYoutube, IoIosGlobe } from "react-icons/io";
import { Link } from 'react-router-dom';

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
    else { return('border-yellow-300') }
}




function PoliticianBlock({ pol, image_url, isExpanded, toggleCollapse}) {

    const blockRef = useRef(null);

    useEffect(() => {
        if (isExpanded && blockRef.current) {
            blockRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
            });


        }
    }, [isExpanded]);


    let facebook = null;
    let twitter = null;
    let youtube = null;
    let website = null;
    let image = null;
    {pol.facebook !== null ? facebook = `https://www.facebook.com/${pol.facebook}` : ""}
    {pol.twitter !== null ? twitter = `https://www.twitter.com/${pol.twitter}` : ""}
    {pol.youtube !== null ? youtube = `https://www.youtube.com/${pol.youtube}` : ""}
    {pol.wesbite !== null ? website = pol.website : ""}

    const cardClassCollapsed = `relative flex flex-col justify-center items-center bg-white gap-2 py-2 cursor-pointer 
                                rounded-xl w-[45%] h-[2%] md:w-[30%] md:h-[3%] lg:w-[15%] lg:h-[7%]`

    const cardClassExpanded = `relative flex flex-col justify-center items-center bg-white gap-2 py-2 
                                rounded-xl w-[92%] h-[2%] md:w-[95%] md:h-[3%] lg:w-[48%] lg:h-[7%] xl:w-[31%] scroll-mt-4`

    const imageClassCollapsed = `${borderColor(pol.party)} transition hover:scale-110 border-4 rounded-full overflow-hidden w-20 h-20 
                                md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-36 xl:w-36`

    const imageClassExpanded = `${borderColor(pol.party)}  absolute top-[15%] left-[10%] border-4 rounded-full 
                                overflow-hidden w-28 h-28 
                                md:h-32 md:w-32
                                lg:h-40 lg:w-40 lg: left-[6%]
                                xl:h-46 xl:w-46`


    return (
        // make where you can click on the card and go to a dynamically
        // generated link about the individual senator
            <div
                ref={blockRef} 
                className={!isExpanded ? cardClassCollapsed : cardClassExpanded} 
                onClick={!isExpanded ? toggleCollapse : ""}
            >
                {isExpanded ? < FcCollapse size={30}  className="absolute top-2 right-2 cursor-pointer" onClick={toggleCollapse} /> : ""}
                <div className={isExpanded ? "flex flex-shrink-0 w-[40%]" : "flex flex-shrink-0"}>
                    <div className={isExpanded ? imageClassExpanded : imageClassCollapsed}>
                        <img src={image_url === null ? "../assets/Photo-unavailable.png" : image_url} className="object-cover h-full w-full" alt="Image Unavailable" />
                    </div>
                </div>
                {!isExpanded ?
             
                <div className="flex flex-col justify-center items-center">
                        <h5 className="card-title">{pol.first_name} {pol.last_name}</h5>
                        <p className="card-text">{pol.state}</p>
                </div>
                : 
                <div className="flex flex-col h-[100%] w-[60%] justify-center items-center ">
                    <div className="h-[100%] w-[90%] justify-center items-center">
                        <div className="w-[100%] pl-[40%] pt-6 lg:pt-12 lg:pl-[]">
                            
                            <h1 className="font-bold text-3xl lg:text-xl">{pol.first_name} {pol.last_name}</h1>
                            <div className="flex flex-row gap-3">
                            {facebook !== null ? 
                                <Link to={facebook} target="_blank">
                                    < IoLogoFacebook size={48} />
                                </Link> :
                                < IoLogoFacebook size={48} />}
                            {twitter !== null ?
                                <Link to={twitter} target="_blank">
                                    < IoLogoTwitter size={48} />
                                </Link> :
                                < IoLogoTwitter size={48}/>}      
                            {youtube !== null ?
                                <Link to={youtube} target="_blank">
                                    < IoLogoYoutube size={48} />
                                </Link> :
                                < IoLogoYoutube size={48}/>}
                            {website !== null ?
                            <Link to={pol.website} target="_blank">
                                < IoIosGlobe size={48} />
                            </Link> :
                            < IoIosGlobe size={48} />}
                            </div>
                        </div>
                    </div>
                </div>
                }
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