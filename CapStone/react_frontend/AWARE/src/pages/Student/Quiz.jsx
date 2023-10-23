import { QuizCard, TakeQuiz } from "../../components/Quizzes/StudentQuizCard";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

function StudentQuiz() {

    const [takingQuiz, setTakingQuiz] = useState(false);
    const [currentQuizTitle, setCurrentQuizTitle] = useState();
    const [currentQuiz, setCurrentQuiz] = useState();

    const [quizzes, setQuizzes] = useState([]);
    

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        // Define the API endpoint URL
        const apiUrl = `/api/classes/get_student_quizzes?email=${user['email']}`;
        // Fetch data from the API
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            // Update the state with the fetched data
            setQuizzes(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
    }, []);


    // Shows the select quiz for the student to take
    function handleTakeQuiz(id, title) {
        console.log('Attempting to take ' + title);
        setTakingQuiz(true);
        setCurrentQuiz(id);
        setCurrentQuizTitle(title);
        console.log("Hello: " + title);
    }

    // Shows the grades the student got on the selected quiz
    function handleViewGrade() {
        return;
    }

    function dateFormatter(date) {
        let newDate = new Date(date);
        const options = { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' };
        return (newDate.toLocaleString('en-US', options))
    }

    const availableQuizzesView = `${takingQuiz ? 'hidden' : 'flex flex-col relative h-[85%] w-[95%] rounded-xl items-center justify-center bg-white mb-4 shadow-lg'}`

    return (
        <div className='flex flex-col h-[91vh] w-[100%] bg-slate-400 justify-center items-center'>
            <div className='flex flex-col h-[100%] w-[90%] rounded-xl items-center'>
                <div className='flex flex-row h-[15%] w-[95%] items-center justify-center'>
                    <div className='text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg'>
                        {takingQuiz ? <h1>{currentQuizTitle}</h1> : 'Quizzes'}
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
                        <div className='flex w-[20%] justify-center items-center'>
                            <h1 className='text-xl md:text-2xl lg:text-3xl text-navy font-bold whitespace-nowrap '>
                                Grade
                            </h1> 
                        </div>
                    </div>
                    <div className='flex flex-col w-[100%] h-[90%] justify-start items-center overflow-auto'>
                        {quizzes['error'] ? 
                            <h1 className="text-navy text-2xl md:text-6xl pt-24 font-bold text-wrap whitespace-normal">You have not registered for any class</h1>
                        :
                        quizzes.map((quiz, idx) => (
                                <QuizCard 
                                    key = {idx}
                                    quizNum = {quiz.quizId}
                                    quizTitle = {quiz.title}
                                    quizDDate = {dateFormatter(quiz.due_date)}
                                    quizGrade = {quiz.grade}
                                    onTakeQuiz = {quiz.grade == null ? handleTakeQuiz : handleViewGrade}
                                />
                            ))}
                    </div>
                </div>
                {takingQuiz ? 
                    <div className="flex flex-col relative h-[85%] w-[95%] rounded-xl items-center justify-center bg-white mb-4 shadow-lg">
                        <TakeQuiz 
                            quizId = {currentQuiz}
                            quizTitle = {currentQuizTitle}
                            takingQuiz = {takingQuiz}
                        /> 
                    </div>
                : 
                    ''
                }
            </div>
            <ToastContainer  
                position="top-center"
                autoClose={1500}
            />
        </div>
    )

}

export default StudentQuiz;