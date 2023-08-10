import { CgHello } from "react-icons/cg";
import { Politician, PoliticianBlock } from "../components/Politician"
import React, { useEffect, useState } from "react"
import { FederalButton } from "../components/FederalButton";
import { StateButton } from "../components/StateButton";
import { SenateReps } from "../components/FedSenateReps";
import { HouseReps } from "../components/FedHouseReps";
import { StatePoliticians } from "../components/StatePoliticians";
import Map from "./PoliticianLanding";
import  StateCard  from "../components/SmallStateCards";

function Politicians() {

    const [selectedButton, setSelectedButton] = useState('federal');
    const [expandedId, setExpandedId] = useState(null);
    const [branch, setBranch] = useState('senate');
    const [state, setState] = useState(null);
    let size = window.innerWidth;

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

    const mapClass = ""

    const handleBranchChange = (brnch) => {
        setBranch(brnch);
    };

    const handleButtonClick = (level) => {
        setState(null)
        setSelectedButton(level);
    };

    const handleToggleCollapse = (id) => {
        setExpandedId((prevId) => (prevId === id ? null : id))
    };

    function stateCallback (stateData) {
        setState(stateData)
    };

    const customize = {
        "AL": {
            fill: "red"
        },
        "AK": {
            fill: "red"
        },
        "AZ": {
            fill: "red"
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
            fill: ""
        },
        "NV": {
            fill: ""
        },
        "NH": {
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

    useEffect(() => {
        const handleResize = () => {
          console.log('Window was resized!');
          
          size = window.innerWidth;
          console.log(size);
        };
    
        window.addEventListener('resize', handleResize);
    
        return() => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);    

    return (
        <div className="flex flex-col justify-center items-center h-[89vh] w-[100%] pb-4 gap-1">
            <div className="flex flex-row items-center justify-center h-[10%] w-[90%]">
                <div className="flex flex-row h-[100%] rounded-xl gap-2 p-2 w-[90%]">
                    <FederalButton 
                        selected={selectedButton === 'federal'}
                        onClick={() => handleButtonClick('federal')}
                    />
                    <StateButton
                        selected={selectedButton === 'state'}
                        onClick={() => handleButtonClick('state')}
                    />
                        
                </div>
                    {selectedButton === "federal" ?  
                    <select id="branches" onChange={(event) => handleBranchChange(event.target.value)} 
                        className="bgblue border border-gray-300 text-gray-900 mt-auto m-2 text-xs rounded-lg 
                                   focus:ring-blue-500 focus:border-blue-500 block w-[30%] h-[70%] p-2.5 dark:bgblue dark:bgblue
                                   dark:bgblue dark:text-white dark:focus:bgblue dark:focus:bgblue lg:w-[10%] lg:h-[60%]">
                        <option selected value={"senate"} >Senate</option>
                        <option value="house" >House</option>
                    </select>
                    :
                    <select id="branches" onChange={(event) => handleBranchChange(event.target.value)} 
                        className="bgblue border border-gray-300 text-gray-900 mt-auto m-2 text-xs rounded-lg 
                                   focus:ring-blue-500 focus:border-blue-500 block w-[30%] h-[70%] p-2.5 dark:bgblue dark:bgblue
                                   dark:bgblue dark:text-white dark:focus:bgblue dark:focus:bgblue lg:w-[10%] lg:h-[60%]">
                        <option selected value={"senate"} >Politicians</option>
                        <option value="house" >Elections</option>
                    </select>
                    }   
            </div>
            {selectedButton === "federal" ?
                <div className="flex flex-col items-center w-[90%] h-[90%]  bgnavy rounded-xl overflow-y-auto p-2">
                    {branch === "senate" ? < SenateReps /> : < HouseReps />} 
                </div> :
                <div className="flex flex-col items-center justify-center w-[90%] h-[89%] bgnavy rounded-xl p-2">
                    <div className="hidden items-center justify-center md:flex w-[100%]">
                        {state !== null ?  ( < StatePoliticians state={state} setState={setState} states={states}/> ) :
                            <div>
                                <div className="hidden 2xl:flex">
                                    < Map width="900px" height="700px" customize={customize} parentCallback={stateCallback}/> 
                                </div>
                                <div className="hidden lg:flex 2xl:hidden">
                                    < Map width="800px" height="600px" customize={customize} parentCallback={stateCallback}/> 
                                </div>
                                <div className="flex lg:hidden">
                                    < Map width="650px" height="500px"  parentCallback={stateCallback}/> 
                                </div>
                            </div>
                        }
                    </div>
                    <div className="flex flex-col md:hidden w-[100%] h-[100%] rounded-xl overflow-auto">
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
            }
        </div>
    );
}


export default Politicians;
