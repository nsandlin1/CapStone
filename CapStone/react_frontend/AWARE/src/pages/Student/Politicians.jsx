import { CgHello } from "react-icons/cg";
import React, { useEffect, useState } from "react"
import { StateButton, FederalButton } from "../../components/Buttons";
import { SenateReps } from "../../components/Politicians/FedSenateReps";
import { HouseReps } from "../../components/Politicians/FedHouseReps";
import { StatePoliticians } from "../../components/StatePoliticians";
import  StateCard  from "../../components/SmallStateCards";
import StateMajMap from "../../components/StateMajMap";
import StateElectionsMap from "../../components/StateElectionsMap";

function Politicians() {
    const [selectedButton, setSelectedButton] = useState('federal');
    const [branch, setBranch] = useState('senate');
    const [map, setMap] = useState('politicians');
    let size = window.innerWidth;

    const handleBranchChange = (brnch) => {
        setBranch(brnch);
    };

    const handleMapChange = (map) => {
        setMap(map);
    };

    const handleButtonClick = (level) => {
        setSelectedButton(level);
    };

    const handleToggleCollapse = (id) => {
        setExpandedId((prevId) => (prevId === id ? null : id))
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
                    <select id="branches" onChange={(event) => handleMapChange(event.target.value)} 
                        className="bgblue shadow-mdborder border-gray-300 text-gray-900 mt-auto m-2 text-xs rounded-xl
                                   focus:ring-blue-500 focus:border-blue-500 block w-[30%] h-[70%] p-2.5 dark:bgblue dark:bgblue
                                   dark:bgblue dark:text-white dark:focus:bgblue dark:focus:bgblue lg:w-[10%] lg:h-[60%]">
                        <option selected value={"politicians"} >Politicians</option>
                        <option value="elections" >Elections</option>
                    </select>
                    }   
            </div>
            {selectedButton === "federal" ?
                <div className="flex flex-col items-center shadow-lg w-[90%] h-[90%]  bgnavy rounded-xl overflow-y-auto p-2">
                    {branch === "senate" ? < SenateReps /> : < HouseReps />} 
                </div> : 
                <div className="relative flex-col shadow-lg items-center justify-center w-[90%] h-[90%] bg-[#ddddeb] rounded-xl p-2"> 
                    {map ==="politicians" ? <StateMajMap /> : <StateElectionsMap /> }
                </div>
            }
        </div>
    );
}


export default Politicians;
