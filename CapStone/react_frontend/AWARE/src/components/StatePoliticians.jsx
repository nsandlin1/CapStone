import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export const StatePoliticians = ({ state, setState }) => {

    // don't even expand this...
    const states = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Deleware",
        "FL": "Florida",
        "GA": "Georgia",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    };

    const goBack = () => {
        setState(null);
    }
    console.log(states[state])

    return (
        <div className="flex flex-col h-[76vh] w-[88vw] rounded-xl">
            <div className="flex flex-row items-center gap-2 h-[10%] w-[100%] rounded-xl">
                <div className="w-[20%]">
                    <IoIosArrowRoundBack className="text-white" onClick={goBack} size={70}/>
                </div>
                <div className="w-[60%] flex justify-center">
                <h1 className="text-5xl font-bold text-white">{states[state]}</h1>
                </div>
                <div className="w-[20%]">

                </div>
            </div>
            <div className="flex h-[90%] bg-zinc-400 rounded-xl">
                
            </div>
        </div>
    );
}

