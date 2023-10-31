import { React, useState }from 'react';

function MockElectionCard({title, electionNum, viewResults}) {

    return (
        <div className='flex flex-col text-md h-[20%] w-[90%] md:w-[45%] bg-white m-2 
                        md:m-4 shadow-xl rounded-xl items-center justify-center'>
            <div className='flex w-full h-[50%]  text-base break-all items-center justify-center md:text-2xl text-navy font-bold'>
                {title}
            </div>
            <div className='flex w-full h-[40%] items-center justify-center text-sm md:text-lg'>
                <button 
                    className='flex w-[60%] md:w-[30%] h-[80%] rounded-xl bg-lightblue text-white items-center justify-center'
                    onClick={() => viewResults(title)}>
                    View Results
                </button>
            </div>
        </div>
    )

}

export default MockElectionCard;