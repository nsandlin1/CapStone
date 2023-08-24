import Map from "../pages/PoliticianLanding";
import React, { useEffect, useState } from "react";
import { StatePoliticians } from "../components/StatePoliticians";
import StateCard from "./SmallStateCards";
import { StateMajLegend } from "./Legends";

function StateMajMap() {

    const api = "http://127.0.0.1:5000//api/congress/majority?branch=";
    const [majHouse, setMajHouse] = useState([]);
    const [majSenate, setMajSenate] = useState([]);
    const [state, setState] = useState(null);
    const [branch, setBranch] = useState('senate');

    function stateCallback (stateData) {
        setState(stateData)
    };

    function branchCange(branch) {
        setBranch(branch);
    }

    function getHouseMaj() {
        /*
        make api request to get politicians return to pols variable
        */
        fetch(api+"House")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }
                return response.json()
            })
            .then((data) => {
                setMajHouse(data);
                setError(null);
                console.log(pols)
            })
            .catch((err) => {
                setError(err);
                console.log(err)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function getSenateMaj() {
        /*
        make api request to get politicians return to pols variable
        */
        fetch(api+"Senate")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }
                return response.json()
            })
            .then((data) => {
                setMajSenate(data);
                setError(null);
                console.log(pols)
            })
            .catch((err) => {
                setError(err);
                console.log(err)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        getHouseMaj();
        getSenateMaj();
    }, [])

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

    const customizeHouse = {
        "AL": {
            fill: ""
        },
        "AK": {
            fill: ""
        },
        "AZ": {
            fill: ""
        },
        "AR": {
            fill: ""
        },
        "CA": {
            fill: ""
        },
        "CO": {
            fill: ""
        },
        "CT": {
            fill: ""
        },
        "DE": {
            fill: ""
        },
        "FL": {
            fill: ""
        },
        "GA": {
            fill: ""
        },
        "HI": {
            fill: ""
        },
        "ID": {
            fill: ""
        },
        "IL": {
            fill: ""
        },
        "IN": {
            fill: ""
        },
        "IA": {
            fill: ""
        },
        "KS": {
            fill: ""
        },
        "KY": {
            fill: ""
        },
        "LA": {
            fill: ""
        },
        "ME": {
            fill: ""
        },
        "MD": {
            fill: ""
        },
        "MA": {
            fill: ""
        },
        "MI": {
            fill: ""
        },
        "MN": {
            fill: ""
        },
        "MS": {
            fill: ""
        },
        "MO": {
            fill: ""
        },
        "MT": {
            fill: ""
        },
        "NE": {
            fill: "#E64141"
        },
        "NV": {
            fill: ""
        },
        "NH": {
            fill: ""
        },
        "NJ": {
            fill: ""
        },
        "NM": {
            fill: ""
        },
        "NY": {
            fill: ""
        },
        "NC": {
            fill: ""
        },
        "ND": {
            fill: ""
        },
        "OH": {
            fill: ""
        },
        "OK": {
            fill: ""
        },
        "OR": {
            fill: ""
        },
        "PA": {
            fill: ""
        },
        "RI": {
            fill: ""
        },
        "SC": {
            fill: ""
        },
        "SD": {
            fill: ""
        },
        "TN": {
            fill: ""
        },
        "TX": {
            fill: ""
        },
        "UT": {
            fill: ""
        },
        "VT": {
            fill: ""
        },
        "VA": {
            fill: ""
        },
        "WA": {
            fill: ""
        },
        "WV": {
            fill: ""
        },
        "WI": {
            fill: ""
        },
        "WY": {
            fill: ""
        }
    };   
    
    const customizeSenate = {
        "AL": {
            fill: ""
        },
        "AK": {
            fill: ""
        },
        "AZ": {
            fill: ""
        },
        "AR": {
            fill: ""
        },
        "CA": {
            fill: ""
        },
        "CO": {
            fill: ""
        },
        "CT": {
            fill: ""
        },
        "DE": {
            fill: ""
        },
        "FL": {
            fill: ""
        },
        "GA": {
            fill: ""
        },
        "HI": {
            fill: ""
        },
        "ID": {
            fill: ""
        },
        "IL": {
            fill: ""
        },
        "IN": {
            fill: ""
        },
        "IA": {
            fill: ""
        },
        "KS": {
            fill: ""
        },
        "KY": {
            fill: ""
        },
        "LA": {
            fill: ""
        },
        "ME": {
            fill: ""
        },
        "MD": {
            fill: ""
        },
        "MA": {
            fill: ""
        },
        "MI": {
            fill: ""
        },
        "MN": {
            fill: ""
        },
        "MS": {
            fill: ""
        },
        "MO": {
            fill: ""
        },
        "MT": {
            fill: ""
        },
        "NE": {
            fill: "#E64141"
        },
        "NV": {
            fill: ""
        },
        "NH": {
            fill: ""
        },
        "NJ": {
            fill: ""
        },
        "NM": {
            fill: ""
        },
        "NY": {
            fill: ""
        },
        "NC": {
            fill: ""
        },
        "ND": {
            fill: ""
        },
        "OH": {
            fill: ""
        },
        "OK": {
            fill: ""
        },
        "OR": {
            fill: ""
        },
        "PA": {
            fill: ""
        },
        "RI": {
            fill: ""
        },
        "SC": {
            fill: ""
        },
        "SD": {
            fill: ""
        },
        "TN": {
            fill: ""
        },
        "TX": {
            fill: ""
        },
        "UT": {
            fill: ""
        },
        "VT": {
            fill: ""
        },
        "VA": {
            fill: ""
        },
        "WA": {
            fill: ""
        },
        "WV": {
            fill: ""
        },
        "WI": {
            fill: ""
        },
        "WY": {
            fill: ""
        }
    };  

    function determineStateColor(maj) {
        if (maj === "D"){
            return ("#4149e6");
        } else { return ("#E64141"); }
    }

    majHouse.forEach(({ majority, state }) => {
        if(customizeHouse[state]){
            customizeHouse[state].fill = determineStateColor(majority);
        }
    });

    majSenate.forEach(({ majority, state }) => {
        if(customizeSenate[state]){
            customizeSenate[state].fill = determineStateColor(majority);
        }
    });

    const branchSelected = "text-3xl hover:cursor-pointer text-black"
    const branchNotSelected = "text-3xl hover:cursor-pointer hover:text-zinc-700 text-zinc-400"

    return (
        <div className="flex h-[100%]">
            <div className="hidden w-[100%] items-center justify-center md:flex">
            {state !== null ?  ( < StatePoliticians state={state} setState={setState} states={states}/> ) :
                <div>
                    <StateMajLegend/>
                    <div className="flex flex-row items-center justify-center gap-4 absolute top-8 left-[45%] w-[10%] h-[8%]">
                        <div onClick={() => branchCange("senate")} className={branch === "senate" ? branchSelected : branchNotSelected}>Senate</div>
                        <div onClick={() => branchCange("house")} className={branch === "house" ? branchSelected : branchNotSelected} >House</div>
                    </div>
                    <div className="hidden items-center justify-center md:flex w-[100%]">
                        {branch === "house" ?
                            <div>
                                <div className="hidden 2xl:flex">
                                    < Map width="900px" height="700px" customize={customizeHouse} parentCallback={stateCallback}/> 
                                </div>
                                <div className="hidden lg:flex 2xl:hidden">
                                    < Map width="800px" height="600px" customize={customizeHouse} parentCallback={stateCallback}/> 
                                </div>
                                <div className="flex lg:hidden">
                                    < Map width="650px" height="500px" customize={customizeHouse} parentCallback={stateCallback}/> 
                                </div>
                            </div>
                            :
                            <div>
                                <div className="hidden 2xl:flex">
                                    < Map width="900px" height="700px" customize={customizeSenate} parentCallback={stateCallback}/> 
                                </div>
                                <div className="hidden lg:flex 2xl:hidden">
                                    < Map width="800px" height="600px" customize={customizeSenate} parentCallback={stateCallback}/> 
                                </div>
                                <div className="flex lg:hidden">
                                    < Map width="650px" height="500px" customize={customizeSenate} parentCallback={stateCallback}/> 
                                </div>
                            </div>
                        }
                    </div>
                </div>
            
            }
            </div>
            <div className="flex flex-col md:hidden w-[100%] h-[100%] bg-navy rounded-xl overflow-auto">
                {console.log(state)}
                {state !== null ?  ( < StatePoliticians state={state} setState={setState} states={states}/> ) :
                    <div className="gap-2 p-1">
                        {Object.entries(states).map(([key, value]) => 
                            <div className="h-[5%] py-1">
                                <StateCard abbreviation={key} state={value} parentCallback={stateCallback} /> 
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );

}

export default StateMajMap;