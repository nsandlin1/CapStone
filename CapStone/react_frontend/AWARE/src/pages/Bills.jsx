import React, { useState } from "react";
import { Wrapper} from "../components/widgets";
import { BsCircle } from 'react-icons/Bs';
import { FederalButton } from "../components/FederalButton";
import { StateButton } from "../components/StateButton";

function Bills() {

    const [selectedButton, setSelectedButton] = useState('federal');

    const handleButtonClick = (buttonType) => {
        setSelectedButton(buttonType);
    }

    return (
        <div className="flex flex-col items-center h-[89vh] py-4 gap-1">
            <div className="flex items-start w-[90%] h-[10%] flex-grow rounded-xl gap-2 p-2">
                {/* <div className="flex items-center justify-center bg-zinc-800 rounded-xl w-[7%] h-[55%] mt-auto">
                    <p className="text-white">Federal</p>
                </div> */}
                <FederalButton 
                    selected={selectedButton === 'federal'}
                    onClick={() => handleButtonClick('federal')}
                />
                <StateButton
                    selected={selectedButton === 'state'}
                    onClick={() => handleButtonClick('state')}
                />
            </div>
            <div className="flex items-center gap-3 w-[90%] h-[90%] rounded-xl bg-slate-700 p-2">
                <div className="flex flex-col p-2 gap-2 w-[25%] h-[100%] rounded-xl bg-slate-300">
                    <div className="search flex items-center justify-center rounded-xl bg-orange-400 h-[8%]">
                        Search bar
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-xl h-[92%] bg-zinc-800 overflow-auto">

                    </div>
                </div>
                <div className="flex p-2 w-[75%] h-[100%] rounded-xl bg-slate-300">

                </div>
            </div>
        </div>  
    )
}

export default Bills;