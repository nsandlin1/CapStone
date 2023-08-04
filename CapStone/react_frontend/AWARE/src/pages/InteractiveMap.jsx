import React from 'react';
import Map from "./PoliticianLanding";

function InteractiveMap() {
    return (
        <div className='flex flex-col h-[89vh] items-center justify-center'>
            <div className='flex items-center justify-center h-[10%] w-[90%] bg-yellow-500'>
                
            </div>
            <div className='flex justify-center items-center h-[80%] w-[90%] bg-purple-500'>
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
    )
}

export default InteractiveMap;