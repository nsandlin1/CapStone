import { QuizCard, TakeQuiz } from "../../components/Quizzes/StudentQuizCard";
import { useState } from "react";

function StudentQuiz() {

    const [takingQuiz, setTakingQuiz] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState();

    const [quizzes, setQuizzes] = useState([
        {
            quizTitle: "Quiz 1",
            quizDDate: "Oct 25th, 2023",
            grade: null
        },
        {
            quizTitle: "Quiz 2",
            quizDDate: "Oct 27th, 2023",
            grade: null
        }
    ])

    // Shows the select quiz for the student to take
    function handleTakeQuiz(title) {
        console.log('Attempting to take ' + title);
        setTakingQuiz(true);
        setCurrentQuiz(title);
        console.log(quizTitle);
    }

    // Shows the grades the student got on the selected quiz
    function handleViewGrade() {
        return;
    }


    const availableQuizzesView = `${takingQuiz ? 'hidden' : 'flex flex-col relative h-[85%] w-[95%] rounded-xl items-center justify-center bg-white mb-4 shadow-lg'}`

    return (
        <div className='flex flex-col h-[91vh] w-[100%] bg-slate-400 justify-center items-center'>
            <div className='flex flex-col h-[100%] w-[90%] rounded-xl items-center'>
                <div className='flex flex-row h-[15%] w-[95%] items-center justify-center'>
                    <div className='text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg'>
                        {takingQuiz ? <h1>{currentQuiz}</h1> : 'Quizzes'}
                    </div>
                </div>
                <div className={availableQuizzesView}>
                    <div className='flex flex-row h-[10%] w-[95%] items-center'>
                        <div className='flex w-[20%] justify-center'>
                            <h1 className='text-xl md:text-2xl lg:text-3xl text-navy font-bold whitespace-nowrap '>
                                Quiz
                            </h1> 
                        </div>
                        <div className='flex w-[60%] justify-center items-center'>
                            <h1 className='text-xl md:text-2xl lg:text-3xl text-navy font-bold whitespace-nowrap '>
                                Due Date
                            </h1> 
                        </div>
                    </div>
                    <div className='flex flex-col w-[100%] h-[90%] justify-start items-center overflow-auto'>
                        {
                            quizzes.map((quiz, idx) => (
                                <QuizCard 
                                    key = {idx}
                                    quizTitle = {quiz.quizTitle}
                                    quizDDate = {quiz.quizDDate}
                                    onTakeQuiz = {quiz.grade == null ? handleTakeQuiz : handleViewGrade}
                                />
                            ))
                        }
                    </div>
                </div>
                {takingQuiz ? 
                    <div className="flex flex-col relative h-[85%] w-[95%] rounded-xl items-center justify-center bg-white mb-4 shadow-lg">
                        <TakeQuiz 
                            quizTitle = {currentQuiz}
                        /> 
                    </div>
                : 
                    ''
                }
            </div>
            
        </div>
    )

}

export default StudentQuiz;