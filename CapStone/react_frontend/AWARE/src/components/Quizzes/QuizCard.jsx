import { React, useState }from 'react';

function QuizCard({id, text, isExpanded, handleClick}) {


    const cardStyle = `${isExpanded === id ? 'w-[90%] h-[50%]' : 'h-[20%] w-[50%] md:w-[45%]'} 
                                flex text-md bg-white m-2 md:m-4 shadow-xl rounded-xl items-center justify-center`;

    return (
        <div className={cardStyle} onClick={() => handleClick(id)}>
            {text}
        </div>
    )

}

export default QuizCard;