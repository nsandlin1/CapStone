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

    var branch = "senator"
    var api_url = `/api/congress/members?${branch}`

    const [pols, setPols] = useState([])

    const fetchPolData = () => {
      fetch(api_url)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setPols(data)
        })
    }

    useEffect(() => {
        fetchPolData()
      }, [])

    return (
        <div className="flex justify-center items-center h-[89vh] bg-slate-400">
             <Wrapper width='w-[98%] md:w-[98%]' height='h-[98%]' color='bg-white'>
               <text>{pols.data}</text>
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