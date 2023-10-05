import {useState} from 'react';


// True/False option on a quiz
export const TF = () => {

}

// Multiple choice option on a quiz
export const MC = () => {

    return (
        <div className='flex flex-col h-full w-[90%] bg-navy rounded-xl'>
            
        </div>
    )

}

// What the studnet see when they are taking a quiz
export const TakeQuiz = ({quizTitle}) => {

    const [questions, setQuestion] = useState([
        {},
        {},
        {},
        {},
        {},
        {}
    ]);

    // Call backend using {quizTitle} to get all questions for the quiz


    return (
        <div className='flex flex-col h-[96%] w-full rounded-xl items-center '>
            {quizTitle}
            <div className='flex flex-col h-[95%] w-full items-center overflow-auto '>
                {questions.map((question, idx) => (
                    <div className='flex w-[95%] h-full m-1 justify-center'>
                    < MC />
                    </div>
                )
                )}
            </div>
        </div>
    )

}

// Card that gives the student a quick glance at what quizzes they have coming up
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