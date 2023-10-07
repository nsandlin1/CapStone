import { FcCollapse } from "react-icons/fc";
import { useState } from "react";

export const ClassCard = ({classId, className, startTime, endTime, teacher, isExpanded, toggleCollapse, creating}) => {


    const cardContainer = `flex ${isExpanded ? 'h-[50%] ' : 'h-[20%]'} ${creating || isExpanded ? '' : 'hover:scale-105' } w-[92%] rounded-xl bg-navy m-1 transition `;
    const basicInfo = `flex flex-row w-[100%] ${isExpanded ? 'h-[100%]' : 'h-[100%]'} items-center justify-center`;
    const expandedInfo = `ExpandedInfo flex h-[85%] ${isExpanded ? '' : 'hidden'}`;

    const rotate = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';

    const handleToggleCollapse = (event) => {
        // Prevent the click event from propagating to the parent div
        event.stopPropagation();
        toggleCollapse();
      };

    
    return (
        <div className={cardContainer}>
            <div className='flex flex-col w-[100%] h-[100%] items-center justify-center' onClick={handleToggleCollapse}>
                <div className={basicInfo}>
                    <div className='flex w-[20%] h-[100%] justify-center items-center'>
                        <h1 className='text-3xl text-white whitespace-nowrap'>
                            {className}
                        </h1>
                    </div>
                    <div className='flex w-[60%] justify-center items-center'>
                        <h1 className='text-3xl text-white whitespace-nowrap'>
                            {startTime} - {endTime}
                        </h1>
                    </div>
                    <div className='flex w-[15%] items-center justify-end'>
                        < FcCollapse 
                            style={{ transform: rotate, transition: "all 0.2s linear" }} 
                            className='ClassesCollapseIcon'  
                            onClick={handleToggleCollapse}
                        />
                    </div>
                </div>
                <div className={expandedInfo}>

                </div>
            </div>
        </div>
    )
}