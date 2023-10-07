import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';
import { Question, AddQButton } from './Quiz';

function CreateQuiz({back}) {

    const [quizName, setQuizName] = useState("");
    const [questions, setQuestions] = useState([]);
    const [res, setRes] = useState("");

    const handleAddQuestion = () => {
        // Create a new form object based on the selected type
        const newQ = { type: 'null', question: "", answers: {}, correct: "1" };
        
        console.log("Adding Question");

        // Add the form to the selectedForms array
        setQuestions([...questions, newQ]);
    };

    function saveButton() {
        console.log("saved")
        console.log(quizName)
        console.log(questions)

        var api_url = '/api/classes/create_quiz?title=' + quizName + '&questions=' + JSON.stringify(questions)
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
    }

    return (
        <div className="flex flex-col w-[100%] h-[100%] bg-navy rounded-xl"> 
            <div className='flex flex-row justify-center items-center w-[100%] h-[10%]'>
                <div className='flex w-[20%] md:w-[30%]'>
                    < BiArrowBack className='MockButtons absolute fill-white top-2 md:top-3 left-4 md:left-10' onClick={back}/>
                </div>
                <div className='flex w-[60%] md:w-[40%] text-lg md:text-3xl text-white items-center justify-center'>
                        Create Quiz
                </div>
                <div className='flex w-[20%] md:w-[30%] h-[100%] justify-end pr-2 md:pr-10'>
                    <button className='text-xl bg-white rounded-xl w-[90%] md:w-[30%]' onClick={saveButton}>
                        Save
                    </button>
                </div>
            </div>
            <input
                className="w-[96%] h-[8%] ml-2 pl-2 rounded-lg justify-center text-2xl"
                type='text'
                name='position'
                onChange={(q) =>{
                    setQuizName(q.target.value)
                }}
            />
            <div className='flex flex-col w-[100%] h-[90%] items-center justify-center'>
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
        </div>
    )

}

export default CreateQuiz;