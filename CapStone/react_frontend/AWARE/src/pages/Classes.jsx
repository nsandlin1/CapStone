import React from 'react';
import Collapsible from 'react-collapsible';
import { FcCollapse } from "react-icons/fc";
import '../Collapsible.scss';

function Classes() {

    return (
        <div className='flex flex-col h-[91vh] w-[100%] bg-slate-400 justify-center items-center'>
            <div className='flex flex-col h-[90%] w-[90%] bg-navy rounded-xl items-center'>
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
                <div className='flex h-[85%] w-[95%] rounded-xl justify-center py-2 bg-white mb-4 overflow-auto'>
                <Collapsible className='w-[90%] h-[15%] bg-yellow-400 rounded-xl' trigger={["Start here", <FcCollapse/>]}>
                    <p>
                        This is the collapsible content. It can be any element or React
                        component you like.
                    </p>
                    <p>
                        It can even be another Collapsible component. Check out the next
                        section!
                    </p>
                </Collapsible>
                </div>
            </div>
        </div>
    )

}

export default Classes;