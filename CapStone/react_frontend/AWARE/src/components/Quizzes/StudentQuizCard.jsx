import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { wait } from '../../utils/wait';

export const Option = ({index, text, choose, selected}) => {

    const selectedOption = `${selected == index ? 'bg-lightblue' : 'bg-slate-400 hover:bg-slate-800 '} flex w-[10%] md:w-[5%] text-white justify-center 
                            items-center rounded-xl hover:cursor-pointer`

    return (
        <div className='flex flex-row w-full text-white text-2xl justify-center p-2 gap-2'>
            <div className={selectedOption}
                 onClick={() => choose(index)}>
                {index}
            </div>
            <div className='w-[90%] md:w-[95%]'>
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
                {CustomKey+1 + '. ' + question}
            </div>
            <div className="flex flex-col w-full justify-center pb-2">
                { options.map((option, idx) => (
                    <div key={idx} className='flex justify-center w-full'>
                        {console.log(option)}
                        <Option index={option.letter} text={option.text} choose={handleSelection} selected={selected}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Multiple choice option on a quiz
export const TF = ({CustomKey, question, onSelect}) => {

    return (
        <div className='flex flex-col h-full w-[90%] bg-navy rounded-xl p-2 gap-2'>
            <div className='flex w-full text-white font-bold justify-center text-2xl'>
                {CustomKey+1 + '. ' + question}
            </div>
            <div className="flex flex-row w-full justify-center pb-2">
                <div className='flex flex-col w-[30%] md:w-[10%] items-center justify-center'>
                    <label className='text-white text-base sm:text-xl'>
                        True
                    </label>
                    <input
                        type='radio'
                        name={'radAnswer' + CustomKey}
                        onClick={() => {
                            onSelect(CustomKey, 'True')
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
                        name={'radAnswer' + CustomKey}
                        onClick={() => {
                            onSelect(CustomKey, 'False')
                        }}
                    >
                    </input>
                </div>
            </div>
        </div>
    )

}

// What the studnet see when they are taking a quiz
export const TakeQuiz = ({quizId, quizTitle, takingQuiz}) => {

    const [questions, setQuestions] = useState([]);
    const [submitStatus, setSubmitStatus] = useState();
    const [resp, setResp] = useState();

    useEffect(() => {
        if (takingQuiz) {
            // Define the API endpoint URL
            const apiUrl = `/api/classes/get_quiz_questions?quizId=${quizId}`;
            // Fetch data from the API
            fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Update the state with the fetched data
                setQuestions(data);
                
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        }
    }, [takingQuiz, quizId]);

    for (const question of questions){
        question.answered = '';
        console.log(question);
    }

    async function successfullySubmittedQuiz() {
        toast.success("Successfully Submitted Quiz... Reloading Page");
        await wait(2000, {
            autoClose: 2000,
        });  
        window.location.reload();
    }

    // When user selects an answer for each question
    const handleQuestionAnswer = (idx, selection) => {

        questions[idx].selected = selection;
        console.log(questions);
    }

    // Called when student clicks submit
    // Displays error message if student has not answered all questions
    // Submits selections if all questions have been answered
    const handleSubmit = () => {

        let unansweredQuestionFound = false;
        let answers = []

        questions.forEach((question) => {
            if (question.selected == null) {
                unansweredQuestionFound = true;
            }
            else {
                const newDict = {
                    'selected': question.selected,
                    'question_id': question.question_id
                }
                answers.push(newDict);
            }
        });

        if (unansweredQuestionFound) {
            toast.error("You have left at least one question unanswered.");
            return;
        }
        else {
            // Post, QuizId, Email, and Answers to backend
            const user = JSON.parse(localStorage.getItem('user'));
            // Define the API endpoint URL
            const apiUrl = `/api/classes/submit_quiz?email=${user['email']}&answers=${JSON.stringify(answers)}&quizId=${quizId}`;
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    // Update the state with the fetched data
                    setSubmitStatus(data);
                    setResp(data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
            });
        }
    }

    useEffect(() => {
        if (resp){
            successfullySubmittedQuiz();
        }
    }, [resp])
    // Call backend using {quizId} to get all questions for the quiz


    return (
        <div className='flex flex-col h-[100%] w-full rounded-xl items-center '>
            <div className='flex flex-col h-[92%] pt-2 w-full items-center overflow-auto '>
                {questions.map((question, idx) => (
                    <div key={idx} className='flex w-[95%] h-full m-1 justify-center'>
                        {question.question_type == 'MC' ?
                            < MC 
                                CustomKey={idx} 
                                question={question.text} 
                                options={question.choices} 
                                onSelect={handleQuestionAnswer}
                                selection={question.selected}
                            />
                            :
                            < TF 
                                CustomKey={idx}
                                question={question.text} 
                                onSelect={handleQuestionAnswer}
                            />
                        }
                    </div>
                ))}
            </div>
            <div className='flex justify-center items-center h-[8%] w-full'>
                <button className='bg-navy text-white rounded-xl h-[75%] w-[30%] md:w-[15%] hover:bg-slate-500'
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
export const QuizCard = ({quizNum, quizTitle, quizDDate, quizGrade, onTakeQuiz}) => {

    const takenQuiz = `${quizGrade === null ? 'text-red-600' : 'text-white'} text-base 
                        md:text-xl lg:text-3xl  whitespace-nowrap hover:cursor-pointer`

    return (
        <div className="flex h-[20%] hover:scale-105 hover:shadow-2xl w-[97%] md:w-[92%] rounded-xl pl-2 md:pl-6 bg-navy m-1 transition ">
            <div className='flex flex-col w-[100%] h-[100%] items-center justify-center'>
                <div className="flex flex-row w-[100%] h-full items-center justify-center gap-1">
                    <div className='flex w-[30%] md:w-[20%] h-[100%] justify-start items-center'>
                        <h1 className='text-base md:text-xl lg:text-3xl text-white whitespace-wrap'>
                            {quizTitle}
                        </h1>
                    </div>
                    <div className='flex w-[50%] md:w-[70%] justify-center items-center '>
                        <h1 className='text-base md:text-xl lg:text-3xl text-white whitespace-wrap'>
                            {quizDDate}
                        </h1>
                    </div>
                    <div className='flex w-[20%] md:w-[15%] pr-2 md:pr-4 items-center justify-end'>
                        <h1 className={takenQuiz} 
                            onClick={() => onTakeQuiz(quizNum, quizTitle)}>
                            {quizGrade === null ? 'Take Quiz' : quizGrade + '%'}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )

}