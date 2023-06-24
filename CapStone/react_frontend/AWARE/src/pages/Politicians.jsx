import { CgHello } from "react-icons/cg";
import { Politician, PoliticianBlock } from "../components/Politician"
import Widget from "../components/widgets";

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
    return (
        <div className="flex justify-center items-center h-[89vh] bg-slate-400">
            <Widget width='w-[90%] md:w-[95%]' height="h-[95%]" color='bg-white'>
            </Widget>
        </div>  
    );
}

export default Politicians;

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