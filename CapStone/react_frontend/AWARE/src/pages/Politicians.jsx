import { CgHello } from "react-icons/cg";
import { Politician, PoliticianBlock } from "../components/Politician"
import { Wrapper } from "../components/widgets";
import React, { useEffect, useState } from "react"

function Politicians() {

    var branch = "senate"
    var api_url = `http://localhost:5000/api/congress/members?branch=${branch}`
    
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

    return (
        <div className="flex justify-center items-center h-[89vh] bg-slate-400">
            <Wrapper width='w-[98%] md:w-[98%]' height='h-[98%]' color='bg-white'>
                {loading && <div>Loading...</div>}
                {error && (
                    <div>{`There has been a problem -- ${error}`}</div>
                )}
                {!loading && (
                    <div>
                        <ul>
                            {
                                pols.map((pol) => {
                                    return <PoliticianBlock key={pol.id} pol={pol} image_url={image_urls[pol.id]}/>
                                })
                            }
                        </ul>
                    </div>
                )}
            </Wrapper>
        </div>
    );
    
}

export default Politicians;

// loop this on list of politicians
// <ul class="list-group list-group-horizontal">
//   <li class="list-group-item">An item</li>
//   <li class="list-group-item">A second item</li>
//   <li class="list-group-item">A third item</li>
// </ul> 

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