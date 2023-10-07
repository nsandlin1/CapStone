import { React, useState }from 'react';

function QuizCard({text}) {

    return (
        <div className='flex text-md h-[20%] w-[50%] md:w-[45%] bg-white m-2 md:m-4 shadow-xl rounded-xl items-center justify-center'>
            {text}
        </div>
    )

}

export default QuizCard;