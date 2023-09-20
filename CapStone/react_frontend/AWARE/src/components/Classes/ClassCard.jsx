import { FcCollapse } from "react-icons/fc";
import { useState } from "react";

export const ClassCard = ({classId, className, classTime, teacher, isExpanded, toggleCollapse}) => {


    const cardContainer = `flex ${isExpanded ? 'h-[50%]' : 'h-[20%]'} w-[95%] rounded-xl bg-navy m-1`;
    const basicInfo = `flex flex-row w-[100%] ${isExpanded ? 'h-[100%]' : 'h-[100%]'} items-center justify-center`;
    const expandedInfo = `ExpandedInfo flex h-[85%] ${isExpanded ? '' : 'hidden'}`;

    const rotate = isExpanded ? 'rotate(180deg)' : 'rotate(0)';
    
    return (
        <div className={cardContainer}>
            <div className='flex flex-col w-[100%] h-[100%] items-center justify-center'>
                <div className={basicInfo}>
                    <div className='flex w-[20%] h-[100%] justify-center items-center'>
                        <h1 className='text-3xl text-white whitespace-nowrap'>
                            {className}
                        </h1>
                    </div>
                    <div className='flex w-[60%] justify-center items-center'>
                        <h1 className='text-3xl text-white whitespace-nowrap'>
                            {classTime}
                        </h1>
                    </div>
                    <div className='flex w-[15%] items-center justify-end'>
                        < FcCollapse 
                            style={{ transform: rotate, transition: "all 0.2s linear" }} 
                            className='ClassesCollapseIcon'  
                            onClick={toggleCollapse}
                        />
                    </div>
                </div>
                <div className={expandedInfo}>

                </div>
            </div>
        </div>
    )
}