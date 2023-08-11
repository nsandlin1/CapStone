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
import StateMajMap from "../components/StateMajMap";

function Politicians() {
    const [selectedButton, setSelectedButton] = useState('federal');
    const [branch, setBranch] = useState('senate');
    const [state, setState] = useState(null);
    const [map, setMap] = useState('politicians');
    let size = window.innerWidth;

    const handleBranchChange = (brnch) => {
        setBranch(brnch);
    };

    const handleMapChange = (map) => {
        setMap(map);
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
                        className="bgblue shadow-mdborder border-gray-300 text-gray-900 mt-auto m-2 text-xs rounded-xl
                                   focus:ring-blue-500 focus:border-blue-500 block w-[30%] h-[70%] p-2.5 dark:bgblue dark:bgblue
                                   dark:bgblue dark:text-white dark:focus:bgblue dark:focus:bgblue lg:w-[10%] lg:h-[60%]">
                        <option selected value={"senate"} >Politicians</option>
                        <option value="house" >Elections</option>
                    </select>
                    }   
            </div>
            {selectedButton === "federal" ?
                <div className="flex flex-col items-center shadow-lg w-[90%] h-[90%]  bgnavy rounded-xl overflow-y-auto p-2">
                    {branch === "senate" ? < SenateReps /> : < HouseReps />} 
                </div> : 
                <div className="relative flex-col shadow-lg items-center justify-center w-[90%] h-[90%] bg-[#ddddeb] rounded-xl p-2"> 
                    <StateMajMap />
                </div>
                // This tag to the HERE tag needs to be placed inside its own component. Make sure to move associated functions
                // <div className="relative flex-col shadow-lg items-center justify-center w-[90%] h-[90%] bg-[#ddddeb] rounded-xl p-2">
                    
                //     {state !== null ?  ( < StatePoliticians state={state} setState={setState} states={states}/> ) :
                //         <div>
                //             <div className="legend flex flex-col absolute top-10 left-10 bg-zinc-50 w-[150px] h-[100px] shadow-lg z-1 rounded-xl border-2 border-black">
                //                 <div className="flex items-center justify-center h-[35%] w-[100%] underline">
                //                     Legend
                //                 </div>
                //                 <div className="flex flex-row items-center justify-center h-[45%]">
                //                     <div className="flex flex-col pl-5 justify-right gap-2 w-[30%]">
                //                         <div className="flex bg-[#4149e6] min-h-[15px] min-w-[15px] h-[100%] w-[50%] rounded-xl">
                //                         </div>
                //                         <div className="flex bg-[#E64141] min-h-[15px] min-w-[15px] h-[100%] w-[50%] rounded-xl">
                //                         </div>
                //                     </div>
                //                     <div className="flex flex-col w-[70%]">
                //                         Democratic
                //                         Republican
                //                     </div>
                //                 </div>
                //             </div>
                //             <div className="hidden items-center justify-center md:flex w-[100%]">
                //                     <div>
                //                         <div className="hidden 2xl:flex">
                //                             < Map width="900px" height="700px" customize={customize} parentCallback={stateCallback}/> 
                //                         </div>
                //                         <div className="hidden lg:flex 2xl:hidden">
                //                             < Map width="800px" height="600px" customize={customize} parentCallback={stateCallback}/> 
                //                         </div>
                //                         <div className="flex lg:hidden">
                //                             < Map width="650px" height="500px"  parentCallback={stateCallback}/> 
                //                         </div>
                //                     </div>
                //             </div>
                //         </div>
                //     }
                //     <div className="flex flex-col md:hidden w-[100%] h-[100%] rounded-xl overflow-auto">
                //         {state !== null ?  ( < StatePoliticians state={state} setState={setState} states={states}/> ) :
                //             <div className="gap-2 p-1">
                //                 {Object.entries(states).map(([key, value]) => 
                //                     <div className="h-[5%] py-1">
                //                         <StateCard abbreviation={key} state={value} parentCallback={stateCallback} /> 
                //                     </div>
                //                 )}
                //             </div>
                //         }
                //     </div>
                // </div>
                // HERE
            }
        </div>
    );
}


export default Politicians;
