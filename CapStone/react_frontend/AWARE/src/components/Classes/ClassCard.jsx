import { FcCollapse } from "react-icons/fc";
import { useState } from "react";

export const ClassCard = ({classId, className, startTime, endTime, teacher, classCode, isExpanded, toggleCollapse, creating}) => {


    const cardContainer = `flex ${isExpanded ? 'h-[45%] ' : 'h-[20%]'} ${creating || isExpanded ? '' : 'hover:scale-105 hover:shadow-xl' } w-[95%] rounded-xl bg-navy m-1 transition `;
    const basicInfo = `flex flex-row w-[100%] ${isExpanded ? 'h-[100%]' : 'h-[100%]'} items-center rounded-xl justify-center`;
    const expandedInfo = `ExpandedInfo flex flex-col text-white justify-center gap-3 h-[100%] ${isExpanded ? '' : 'hidden'}`;

    const rotate = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';

    const handleToggleCollapse = (event) => {
        // Prevent the click event from propagating to the parent div
        event.stopPropagation();
        toggleCollapse();
      };

      function cleanTimes(t) {
        t = t.split(':');

        let hours = t[0];
        let minutes = t[1];
        let AMPM = (hours >= 12) ? " P.M." : " A.M.";

        if (hours == 0) {
            hours = 12;
        }
        else if (hours > 12) {
            hours -= 12;
        }
        return `${hours}:${minutes} ${AMPM}`;
      } 
    
    return (
        <div className={cardContainer}>
            <div className='flex flex-col w-[100%] h-[100%] items-center justify-center'>
                <div className={basicInfo} onClick={handleToggleCollapse} >
                    <div className='flex w-[20%] h-[100%] justify-center items-center'>
                        <h1 className='text-3xl text-white whitespace-nowrap'>
                            {className}
                        </h1>
                    </div>
                    <div className='flex w-[60%] justify-center items-center'>
                        <h1 className='text-3xl text-white whitespace-nowrap'>
                            {cleanTimes(startTime)} - {cleanTimes(endTime)}
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
                    <div className="text-4xl">
                        Class code = {classCode}
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-white text-navy text-2xl rounded-xl w-[75%]">
                            View Students
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}