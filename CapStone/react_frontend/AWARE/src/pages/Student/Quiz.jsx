import { QuizCard } from "../../components/Quizzes/StudentQuizCard";
import { useState } from "react";

function StudentQuiz() {

    const [quizzes, setQuizzes] = useState([
        {
            quizTitle: "Quiz 1",
            quizDDate: "Oct 25th, 2023"
        },
        {
            quizTitle: "Quiz 2",
            quizDDate: "Oct 27th, 2023"
        }
    ])


    return (
        <div className='flex flex-col h-[91vh] w-[100%] bg-slate-400 justify-center items-center'>
            <div className='flex flex-col h-[100%] w-[90%] rounded-xl items-center '>
                <div className='flex flex-row h-[15%] w-[95%] items-center justify-center'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg'>
                        Quizzes
                    </h1>
                </div>
                    <div className='flex flex-col relative h-[85%] w-[95%] rounded-xl items-center justify-center bg-white mb-4 shadow-lg'>
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
                                quizzes.map((quiz) => (
                                    <QuizCard 
                                        quizTitle = {quiz.quizTitle}
                                        quizDDate = {quiz.quizDDate}
                                    />
                                ))
                            /* {
                                quizzes.map((quiz) => (
                                    // <div className='flex relative justify-center h-[100%] w-[98%] m-1 '>
                                    < ClassCard 
                                        key = {clas.id}
                                        classId = {clas.id}
                                        className={clas.name} 
                                        // classTime={clas.classTime}
                                        teacher={clas.teacher}
                                        creating={creating}
                                        isExpanded={expandedId === clas.id}
                                        toggleCollapse={() => handleToggleCollapse(clas.id)}
                                    />
                                    // </div>
                                ))
                            } */}
                        </div>
                </div>
            </div>
        </div>
    )

}

export default StudentQuiz;