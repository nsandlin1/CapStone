import { CgHello } from "react-icons/cg";
import { Politician, PoliticianBlock } from "../components/Politician"
import { Wrapper } from "../components/widgets";
import React, { useEffect, useState } from "react"

function Politicians() {
    var p = new Politician(
        "https://www.barrasso.senate.gov",
        "https://www.barrasso.senate.gov/public/index.cfm/contact-form",
        "1952-07-21",
        "johnbarrasso",
        "John",
        "B001261",
        "Barrasso",
        null,
        "R",
        "202-224-6441",
        "WY",
        "SenJohnBarrasso",
        "https://www.congress.gov/img/member/b001261_200.jpg"
    )

    var branch = "senate"
    var api_url = `http://localhost:5000/api/congress/members?branch=${branch}`
    
    const [pols, setPols] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image_url, setImageURL] = useState(null);
    

    useEffect(() => {
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
                setError(err)
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    //!! make pols array an arrya of objects, not of dictionaries.
    //!! then pull and insert image urls
    // const politician_arr = [];
    // pols.map((pol) => {
    //     Politician(
    //         pol.website,
    //         pol.contact_form,
    //         pol.date_of_birth,
    //         pol.facebook,
    //         pol.first_name,
    //         pol.id,
    //         pol.last_name,
    //         pol.middle_name,
    //         pol.party,
    //         pol.phone,
    //         pol.state,
    //         pol.twitter,
    //         null
    //     )
    // })
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
    function url_from_id(id) {
        fetch(`http://localhost:5000/api/congress/member_image?id=${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }
                return response.json();
            })
            .then((data) => {
                setImageURL(data)
            })

        return "https://www.congress.gov/img/member/b001230_200.jpg"
    }

    return (
        <div className="flex justify-center items-center h-[89vh] bg-slate-400">
            <Wrapper width='w-[98%] md:w-[98%]' height='h-[98%]' color='bg-white'>
                {loading && <div>Loading...</div>}
                {error && (
                    <div>{`There has been a problem -- ${error}`}</div>
                )}
                {pols && pols.length > 0 && (
                    <div>
                        <ul>
                            {
                                pols.map((pol) => {
                                    return <PoliticianBlock pol={pol}/>
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