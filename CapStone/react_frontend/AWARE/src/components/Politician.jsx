import { Fragment, useEffect, useState, useRef} from "react";
import { Wrapper } from "../components/widgets";
import { FcCollapse } from "react-icons/fc";
import { IoLogoFacebook, IoLogoTwitter, IoLogoYoutube, IoIosGlobe } from "react-icons/io";
import { Link } from 'react-router-dom';

function borderColor(party) {
    if (party == 'D'){
        return 'border-blue-800'
    }
    else if (party == 'R'){
        return 'border-red-500'
    }
    else { return('border-yellow-300') }
}


// Truncates a given string up to a given length
function truncateName(name, length) {
    if (name.length > length){
        console.log(name.substring(0,length));
        return name.substring(0, length) + '\u2026';
    }
    return (name);
}

function PoliticianBlock({ pol, image_url, isExpanded, toggleCollapse}) {

    const blockRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          console.log('Window was resized!');
          
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return() => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    useEffect(() => {
        if (isExpanded && blockRef.current) {
            blockRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
            });


        }
    }, [isExpanded]);

    const reDirect = (url) => {
        window.location.href = url;
    };

    const name = pol.first_name + ' ' + pol.last_name;

    let facebook = null;
    let twitter = null;
    let youtube = null;
    let website = null;
    let image = null;
    {pol.facebook !== null ? facebook = `https://www.facebook.com/${pol.facebook}` : facebook = " "}
    {pol.twitter !== null ? twitter = `https://www.twitter.com/${pol.twitter}` : twitter = `empty`}
    {pol.youtube !== null ? youtube = `https://www.youtube.com/${pol.youtube}` : youtube = `empty`}
    {pol.wesbite !== null ? website = pol.website : ""}

    const cardClassCollapsed = `relative flex flex-col justify-center items-center bg-white gap-2 py-2 cursor-pointer 
                                rounded-xl w-[45%] h-[2%] md:w-[30%] md:h-[3%] lg:w-[15%] lg:h-[7%]`

    const cardClassExpanded = `relative flex flex-row justify-center items-center bg-white gap-2 py-2 
                                rounded-xl w-[92%] h-[2%] md:w-[62%] md:h-[3%] lg:w-[48%] lg:h-[7%] xl:w-[48%] 2xl:w-[31%] scroll-mt-4`

    const imageClassCollapsed = `${borderColor(pol.party)} transition hover:scale-110 border-4 rounded-full overflow-hidden w-20 h-20 
                                md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-36 xl:w-36`

    const imageClassExpanded = `${borderColor(pol.party)} top-[15%] left-[10%] border-4 rounded-full 
                                overflow-hidden w-28 h-28 
                                md:h-32 md:w-32
                                lg:h-40 lg:w-40 lg: left-[6%]
                                xl:h-46 xl:w-46`

                                

                                // 17

    return (
        // make where you can click on the card and go to a dynamically
        // generated link about the individual senator
            <div
                ref={blockRef} 
                className={!isExpanded ? cardClassCollapsed : cardClassExpanded} 
                onClick={!isExpanded ? toggleCollapse : ""}
            >
                {isExpanded ? < FcCollapse size={30}  className="absolute top-2 right-2 cursor-pointer" onClick={toggleCollapse} /> : ""}
                <div className={isExpanded ? "flex flex-row flex-shrink-0 w-[35%] pl-2 justify-center" : "flex flex-shrink-0"}>
                    <div className={isExpanded ? imageClassExpanded : imageClassCollapsed}>
                        <img src={image_url === null ? "../assets/Photo-unavailable.png" : image_url} className="object-cover h-full w-full" alt="Image Unavailable" />
                    </div>
                </div>
                {!isExpanded ?
             
                <div className="flex flex-col items-center break-words">
                        <h5 className="card-title text-center">{windowWidth > 510 ? truncateName(name, 30) : truncateName(name, 14)}</h5>
                        <p className="card-text">{pol.state}</p>
                </div>
                : 
                <div className="flex flex-col h-[100%] w-[50%] justify-center items-center ">
                    <div className="w-[100%]">
                        
                        <h1 className="font-bold text-xl lg:text-3xl break-keep">{pol.first_name + " " + pol.last_name}</h1>
                        <div className="flex flex-row gap-3">
                        {facebook !== " " ? 
                            <a href={facebook} target="_blank">
                                < IoLogoFacebook className="SocialIcon"/>
                            </a>
                                :
                            <a>< IoLogoFacebook className="SocialIcon"/></a>}
                        {twitter !== " " ?
                            <a href={twitter} target="_blank">
                                < IoLogoTwitter className="SocialIcon"/>
                            </a> :
                            <a>< IoLogoTwitter className="SocialIcon"/></a>}
                        {console.log("Youtube = " + youtube)}
                        {youtube !== "empty" ?
                            <a href={youtube} target="_blank">
                                < IoLogoYoutube className="SocialIcon"/>
                            </a> :
                            <a className="hover:cursor-default">< IoLogoYoutube className="SocialIcon"/></a>}
                        {website !== " " ?
                        <a href={pol.website} target="_blank">
                            < IoIosGlobe className="SocialIcon"/>
                        </a> :
                        <a>< IoIosGlobe className="SocialIcon"/></a>}
                        </div>
                    </div>
                </div>
                }
            </div>
    );
}

export { PoliticianBlock }

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