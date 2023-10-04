import {useState} from 'react';


export const TakeQuiz = ({quizTitle}) => {

    return (
        <div className='flex flex-col h-[100%] w-[90%] rounded-xl items-center '>
            Hello
        </div>
    )

}


export const QuizCard = ({quizTitle, quizDDate, onTakeQuiz}) => {

    return (
        <div className="flex h-[20%] hover:scale-105 hover:shadow-2xl w-[92%] rounded-xl bg-navy m-1 transition ">
            <div className='flex flex-col w-[100%] h-[100%] items-center justify-center'>
                <div className="flex flex-row w-[100%] h-full items-center justify-center">
                    <div className='flex w-[20%] h-[100%] justify-center items-center'>
                        <h1 className='text-md md:text-xl lg:text-3xl text-white whitespace-nowrap'>
                            {quizTitle}
                        </h1>
                    </div>
                    <div className='flex w-[60%] justify-center items-center'>
                        <h1 className='text-md md:text-xl lg:text-3xl text-white whitespace-nowrap'>
                            {quizDDate}
                        </h1>
                    </div>
                    <div className='flex w-[15%] items-center justify-end'>
                        <h1 className='text-md md:text-xl lg:text-3xl text-white whitespace-nowrap hover:cursor-pointer' 
                            onClick={() => onTakeQuiz(quizTitle)}>
                            Take Quiz
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )

}