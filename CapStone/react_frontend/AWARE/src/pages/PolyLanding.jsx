import React, { useEffect, useState } from "react"
import { StateButton, FederalButton } from "../components/Buttons";
import Map from "./PoliticianLanding";

function PolyLanding() {

    const [selectedButton, setSelectedButton] = useState('federal');

    const handleButtonClick = (level) => {
        setSelectedButton(level);
    };

    return (
        <div className="flex flex-col h-[88vh] items-center justify-center">
            <div className="flex h-[10%] w-[90%]">
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
            </div>
            <div className="flex flex-col items-center justify-center w-[90%] h-[89%] bgnavy rounded-xl p-2">
                <div>
                    <div className="hidden 2xl:flex">
                        < Map width="900px" height="700px" /> 
                    </div>
                    <div className="hidden lg:flex 2xl:hidden">
                        < Map width="800px" height="600px" /> 
                    </div>
                    <div className="flex lg:hidden">
                        < Map width="650px" height="500px" /> 
                    </div>
                </div>
            </div>
        </div>
    );

}

export default PolyLanding;