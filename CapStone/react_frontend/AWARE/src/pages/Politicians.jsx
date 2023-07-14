import { CgHello } from "react-icons/cg";
import { Politician, PoliticianBlock } from "../components/Politician"
import React, { useEffect, useState } from "react"
import { FederalButton } from "../components/FederalButton";
import { StateButton } from "../components/StateButton";
import { SenateReps } from "../components/FedSenateReps";
import { HouseReps } from "../components/FedHouseReps";
import { StatePoliticians } from "../components/StatePoliticians";
import Map from "./PoliticianLanding";

function Politicians() {

    const [selectedButton, setSelectedButton] = useState('federal');
    const [expandedId, setExpandedId] = useState(null);
    const [branch, setBranch] = useState('senate');
    const [state, setState] = useState(null);

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
    }

    return (
        <div className="flex flex-col justify-center items-center h-[89vh] w-[100%] pb-4 gap-1 bg-slate-400">
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
                    <select id="branches" onChange={(event) => handleBranchChange(event.target.value)} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 mt-auto m-2 text-xs rounded-lg 
                                   focus:ring-blue-500 focus:border-blue-500 block w-[10%] h-[60%] p-2.5 dark:bg-gray-700 dark:border-gray-600
                                   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected value={"senate"} >Senate</option>
                        <option value="house" >House</option>
                    </select>
            </div>
            {selectedButton === "federal" ?
                <div className="flex flex-col items-center w-[90%] h-[90%]  bg-zinc-800 rounded-xl overflow-scroll p-2">
                    {branch === "senate" ? < SenateReps /> : < HouseReps />} 
                </div> :
                <div className="flex flex-col items-center justify-center w-[90%] h-[90%] bg-zinc-800 rounded-xl p-2">
                    <div className="hidden md:flex">
                        {state === null ?
                        < Map width="800px 2xl:1000px" height="600px 2xl:800px" parentCallback={stateCallback}/> :
                        < StatePoliticians state={state} setState={setState}/> }
                    </div>
                </div>
            }
        </div>
    );
}

export default Politicians;
