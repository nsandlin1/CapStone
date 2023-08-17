import { Fragment, useEffect, useState, useRef} from "react";
import { FcCollapse } from "react-icons/fc";
import { IoLogoFacebook, IoLogoTwitter, IoLogoYoutube, IoIosGlobe } from "react-icons/io";
import { Link } from 'react-router-dom';

function PoliticianCard({ pol, image_url, isOpen}) {

    const [isOpen, setIsOpen] = useState(false);
    const blockRef = useRef(null);

    useEffect(() => {
        if (isExpanded && blockRef.current) {
            blockRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
            });


        }
    }, [isExpanded]);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            
        </div>
    )
}

export default PoliticianCard;