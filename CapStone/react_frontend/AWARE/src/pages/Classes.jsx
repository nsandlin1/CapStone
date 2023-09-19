import React from 'react';
import { FcCollapse } from "react-icons/fc";

function Classes() {

    return (
        <div className='flex flex-col h-[91vh] w-[100%] bg-slate-400 justify-center items-center'>
            <div className='flex flex-col h-[100%] w-[90%] rounded-xl items-center'>
                <div className='flex flex-row h-[15%] w-[95%]'>
                    <div className='flex justify-center w-[15%]  items-center'>
                        <h1 className='text-5xl text-white'>
                            Classes
                        </h1>
                    </div>
                    <div className='w-[75%]'>
                    </div>
                    <div className='flex w-[10%] justify-center items-center'>
                        <button className='rounded-xl w-[100%] h-[60%] bg-white' >Add Class</button>
                    </div>
                </div>
                <div className='flex flex-col h-[85%] w-[95%] rounded-xl items-center justify-center py-2 bg-white mb-4 overflow-auto'>
                    <div className='flex flex-row h-[10%] w-[95%] items-center'>
                        <div className='flex w-[20%] justify-center'>
                            <h1 className='text-3xl text-navy font-bold whitespace-nowrap '>
                                Class Title
                            </h1> 
                        </div>
                        <div className='flex w-[60%] justify-center items-center'>
                            <h1 className='text-3xl text-navy font-bold whitespace-nowrap '>
                                Class Time
                            </h1> 
                        </div>
                    </div>
                    <div className='flex h-[20%] w-[95%] rounded-xl bg-navy'>
                        <div className='flex w-[20%] justify-center items-center'>
                            <h1 className='text-3xl text-white whitespace-nowrap'>
                                Intro to Civics
                            </h1>
                        </div>
                        <div className='flex w-[60%] justify-center items-center'>
                            <h1 className='text-3xl text-white whitespace-nowrap'>
                                9:30 - 10:45
                            </h1>
                        </div>
                        <div className='flex w-[15%] items-center justify-end'>
                            < FcCollapse className='ClassesCollapseIcon' />
                        </div>
                    </div>
                    <div className='flex h-[70%]'>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default Classes;