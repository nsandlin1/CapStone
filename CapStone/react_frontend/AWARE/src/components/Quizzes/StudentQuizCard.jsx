import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const Option = ({index, text, choose, selected}) => {

    const selectedOption = `${selected == index ? 'bg-lightblue' : 'bg-slate-400 hover:bg-slate-800 '} flex w-[5%] text-white justify-center 
                            items-center rounded-xl hover:cursor-pointer`

    return (
        <div className='flex flex-row w-full text-white text-2xl justify-center p-2 gap-2'>
            <div className={selectedOption}
                 onClick={() => choose(index)}>
                {index}
            </div>
            <div className='w-[95%]'>
                {text}
            </div>
        </div>
    )
}


// True/False option on a quiz
export const MC = ({CustomKey, question, options, onSelect, selection}) => {


    const [selected, setSelected] = useState(selection)

    const handleSelection = (choice) => {
        onSelect(CustomKey, choice);
        setSelected(choice);

    }

    return (
        <div className='flex flex-col h-full w-[90%] bg-navy rounded-xl p-2'>
            <div className='flex w-full text-white font-bold justify-center text-2xl'>
                {question}
            </div>
            <div className="flex flex-col w-full justify-center pb-2">
                { Object.keys(options).map((key) =>
                    <div key={key} className='flex justify-center w-full'>
                        <Option index={key} text={options[key]} choose={handleSelection} selected={selected}/>
                    </div>
                )

                }
            </div>
        </div>
    )

}

// Multiple choice option on a quiz
export const TF = ({CustomKey, question, onSelect}) => {

    return (
        <div className='flex flex-col h-full w-[90%] bg-navy rounded-xl p-2 gap-2'>
            <div className='flex w-full text-white font-bold justify-center text-2xl'>
                {question}
            </div>
            <div className="flex flex-row w-full justify-center pb-2">
                <div className='flex flex-col w-[30%] md:w-[10%] items-center justify-center'>
                    <label className='text-white text-base sm:text-xl'>
                        True
                    </label>
                    <input
                        type='radio'
                        name='radAnswer'
                        onClick={() => {
                            onSelect(CustomKey, 'T')
                        }}
                    >
                    </input>
                </div>
                <div className='flex flex-col w-[30%] md:w-[10%] items-center justify-center'>
                    <label className='text-white text-base sm:text-xl'>
                        False
                    </label>
                    <input
                        type='radio'
                        name='radAnswer'
                        onClick={() => {
                            onSelect(CustomKey, 'F')
                        }}
                    >
                    </input>
                </div>
            </div>
        </div>
    )

}

// What the studnet see when they are taking a quiz
export const TakeQuiz = ({quizTitle}) => {

    const [questions, setQuestion] = useState([
        {
            questionId: 0,
            type: 'MC',
            question: 'Which of the folling is true',
            options: {
                A: 'Bush did 9/11',
                B: 'Obama is not American',
                C: 'Ted Cruz is the Zodiac Killer'
            },
            selected: null
        },
        {
            questionId: 1,
            type: 'TF',
            question: 'This is a true/false question',
            selected: null
        },
        {
            questionId: 2,
            type: 'MC',
            question: 'Which of the folling is true',
            options: {
                A: 'Bush did 9/11',
                B: 'Obama is not American',
                C: 'Ted Cruz is the Zodiac Killer'
            },
            selected: null
        },
        {
            questionId: 3,
            type: 'TF',
            question: 'This is a true/false question',
            selected: null
        },
        {
            questionId: 4,
            type: 'MC',
            question: 'Which of the folling is true',
            options: {
                A: 'Bush did 9/11',
                B: 'Obama is not American',
                C: 'Ted Cruz is the Zodiac Killer'
            },
            selected: null
        },
        {
            questionId: 5,
            type: 'TF',
            question: 'This is a true/false question',
            selected: null
        }
    ]);

    // When user selects an answer for each question
    const handleQuestionAnswer = (idx, selection) => {

        questions[idx].selected = selection;
        console.log(questions[idx])
    }

    // Called when student clicks submit
    // Displays error message if student has not answered all questions
    // Submits selections if all questions have been answered
    const handleSubmit = () => {

        let unansweredQuestionFound = false;

        questions.forEach((question) => {
            if (question.selected == null) {
                unansweredQuestionFound = true;
            }
        });

        if (unansweredQuestionFound) {
            toast.error("You have left at least one question unanswered.");
            return;
        }
        else {
            toast.success('All questions have been answered.');
        }
    }

    // Call backend using {quizTitle} to get all questions for the quiz


    return (
        <div className='flex flex-col h-[100%] w-full rounded-xl items-center '>
            <div className='flex flex-col h-[92%] pt-2 w-full items-center overflow-auto '>
                {questions.map((question, idx) => (
                    <div className='flex w-[95%] h-full m-1 justify-center'>
                        {question.type == 'MC' ?
                            < MC CustomKey={idx} 
                                question={question.question} 
                                options={question.options} 
                                onSelect={handleQuestionAnswer}
                                selection={question.selected}
                            />
                            :
                            < TF CustomKey={idx}
                                 question={question.question} 
                                 onSelect={handleQuestionAnswer}
                            />
                        }
                    </div>
                ))}
            </div>
            <div className='flex justify-center items-center h-[8%] w-full'>
                <button className='bg-navy text-white rounded-xl h-[75%] w-[15%] hover:bg-slate-500'
                        onClick={() => handleSubmit()}
                >
                    Submit Quiz
                </button>
            </div>
            <ToastContainer  
                position="top-center"
            />
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