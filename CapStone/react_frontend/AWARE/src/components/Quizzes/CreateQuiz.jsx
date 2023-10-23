import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';
import { Question, AddQButton } from './Quiz';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateQuiz({back}) {

    const [quizName, setQuizName] = useState("");
    const [questions, setQuestions] = useState([]);
    const [res, setRes] = useState("");
    const [dueDate, setDueDate] = useState(""); // <------- sending this to api 
    var qDate = "";

    const handleAddQuestion = () => {
        // Create a new form object based on the selected type
        const newQ = { type: 'null', question: "", answers: {"1": "", "2": ""}, correct: "1" };
        
        console.log("Adding Question");

        // Add the form to the selectedForms array
        setQuestions([...questions, newQ]);
    };

    function emptyQuestion(l) {
        for (let i = 0; i < l.length; i++) {
            console.log(l[i].answers)
            if (l[i].type == 'null' || l[i].question == "") {
                return true;
            }
            if (l[i].type == 'MC') {
                for (const [key, value] of Object.entries(l[i].answers)) {
                    if (value == "") {
                        return true
                    }
                }
            }
            if (l[i].type == 'TF') {
                if (l[i].correct == "1") {
                    return true
                }
            }
            
        }
        return false
    }

    function saveButton() {
        if (quizName == "") {
            toast.error("Quiz must be given a name.")
        } else if (questions.length == 0) {
            toast.error("Cannot create empty quiz.")
        } else if (emptyQuestion(questions)) {
            toast.error("You must fill in all question parameters.")
        } else if (dueDate == "" || dueDate == null) {
            toast.error("Quiz must have a due date.")
        } else {
            console.log("here")
            const user = JSON.parse(localStorage.getItem('user'));
            var api_url = '/api/classes/create_quiz' + 
                          '?title=' + quizName + 
                          '&questions=' + JSON.stringify(questions) + 
                          '&email=' + user["email"] + 
                          '&due_date=' + dueDate;
            console.log(api_url)
            fetch(api_url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error: ${response.status}`
                        );
                    }
                    return response.json()
                })
                .then((response) => {
                    setRes(response)
                })
            back()
            window.location.reload();
        }
    }


    // time data '2023-10-22T21:31' does not match format '%m-%d-%Y %H:%M:%S'
    function cleanInputDate(d) {
        d = d.split('T')
        d = d[0][5] + d[0][6] + '-' + d[0][8] + d[0][9] + '-' + d[0][0] + d[0][1] + d[0][2] + d[0][3] + ' ' + d[1] + ':00'
        setDueDate(d)

    }

    return (
        <div className="flex flex-col w-[100%] h-[100%] bg-navy rounded-xl"> 
            <div className='flex flex-col justify-center items-center w-[100%] h-[25%]'>
                <div className='flex flex-row justify-center items-center w-[100%] h-[30%] md:h-[50%]'>
                    <div className='flex w-[20%] md:w-[30%]'>
                        < BiArrowBack className='MockButtons absolute fill-white top-2 md:top-3 left-4 md:left-10' onClick={back}/>
                    </div>
                    <div className='flex w-[60%] md:w-[40%] text-lg md:text-3xl text-white items-center justify-center'>
                            Create Quiz
                    </div>
                    <div className='flex w-[20%] md:w-[30%] h-[80%] justify-end pr-2 md:pr-10'>
                        <button className='text-xl bg-white rounded-xl w-[90%] md:w-[30%]' onClick={saveButton}>
                            Save
                        </button>
                    </div>
                </div>
                <div className='flex flex-row justify-center items-center h-[40%] pt-2 w-full'>
                    <label className='text-lg md:text-3xl w-[30%] md:w-[15%] text-white md:font-bold'>
                        Quiz Title: 
                    </label>
                    <input
                        className="w-[60%] md:w-[75%] ml-2 pl-2 h-[70%] md:h-full rounded-lg justify-center text-lg md:text-2xl text-navy"
                        type='text'
                        name='position'
                        onChange={(q) =>{
                            setQuizName(q.target.value)
                        }}
                    />
                </div>
                <div className="flex items-center justify-center h-[30%] pt-2 w-full">
                    <label className='text-lg md:text-3xl w-[30%] md:w-[15%] text-white md:font-bold'>
                        Due Date:
                    </label>
                    <input
                        className='my-4 rounded-xl h-[100%] w-[40%] md:w-[20%] border-black text-navy border-2 pl-2 border-navy transition hover:scale-105'
                        type='datetime-local'
                        id='startTime'
                        name='startTime'
                        min='7:00'
                        max='21:00'
                        onChange={(t) => {
                        cleanInputDate(t.target.value);
                        }}
                    />
                </div>
            </div>
            <div className='flex flex-col w-[100%] h-[75%] items-center justify-center'>
                <div className='flex flex-col w-[95%] h-[100%] items-center m-2 overflow-auto'>
                    <div className='flex flex-col w-[100%] md:w-[90%] items-center rounded-xl'>
                        {questions.map((form, index) => (
                            <div key={index} className='flex relative justify-center w-[80%] md:w-[80%] h-[100%] my-2'>
                                <form className='w-full h-full items-center'>
                                    <Question index={index} form={form}/>
                                </form>
                            </div>
                        ))}
                        </div>
                    <div className='flex flex-row w-[100%] my-2 justify-center'>
                        <AddQButton onClick={() => handleAddQuestion()}/>
                    </div>
                </div>
            </div>
            <ToastContainer  
                position="top-center"
            />
        </div>
    )

}

export default CreateQuiz;