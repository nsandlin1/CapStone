import { CgHello } from "react-icons/cg";
import { Politician, PoliticianBlock } from "../components/Politician"
import { Wrapper } from "../components/widgets";
import React, { useEffect, useState } from "react"
import { FederalButton } from "../components/FederalButton";
import { StateButton } from "../components/StateButton";

export const SenateReps = () => {

    var branch = "senate"
    var api_url = `http://localhost:5000/api/congress/members?branch=senate`
    
    const [pols, setPols] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image_urls, setImageURLS] = useState({});
    
    function getPoliticiansList() {
        /*
        make api request to get politicians return to pols variable
        */
        console.log("fetching politicians")
        fetch(api_url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }
                return response.json()
            })
            .then((data) => {
                setPols(data);
                console.log(pols)
                setError(null);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function getImageUrls() {
        console.log("fetching image urls")
        for (let i = 0; i < pols.length; i++) {
            // console.log(pols[i].id)
            if (!(pols[i].id in image_urls)) {
                console.log("isnull");
                (async function (index) {
                    fetch(`http://localhost:5000/api/congress/member_image?id=${pols[index].id}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                console.log("throwing error")
                                `HTTP error: ${response.status}`
                            );
                        }
                        return response.json();
                    })
                    .then((data) => {
                        //data good here
                        // console.log("before" + Object.keys(image_urls))
                        setImageURLS(prevState => ({...prevState, [data.id]: data.image_url}));
                        // console.log("after" + Object.keys(image_urls))
                    })
                    .catch((err) => {
                        setError(err)
                        console.log(err.message)
                    });
                })(i);
            }
        }
    }

    useEffect(() => {
        getPoliticiansList()
    }, [])

    useEffect(() => {
        console.log(Object.keys(image_urls).length)
        if (pols) {
            getImageUrls()
            setTimeout(() => console.log(image_urls), 3000)
        }
    }, [pols])

    const [expandedId, setExpandedId] = useState(null);

    const handleButtonClick = (level) => {
        setSelectedButton(level);
    };

    const handleToggleCollapse = (id) => {
        setExpandedId((prevId) => (prevId === id ? null : id))
    };

    return (
        <div className="flex">
            {loading && <div className="text-white">Loading...</div>}
                {/* {error && (
                    <div>{`There has been a problem -- ${error}`}</div>
                )} */}
                {!loading && (
                    <div className="flex flex-wrap items-center justify-center gap-4 h-[90%]">
                        { 
                            pols.map((pol) => {
                                return <PoliticianBlock 
                                    key={pol.id}
                                    pol={pol}
                                    image_url={image_urls[pol.id]}
                                    isExpanded={expandedId === pol.id}
                                    toggleCollapse={() => handleToggleCollapse(pol.id)}
                                    />
                                })
                        }
                    </div>
                )}
        </div>
    )
}  
