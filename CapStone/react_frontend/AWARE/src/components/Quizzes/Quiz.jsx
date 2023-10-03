import { useState } from 'react';

const Choice = ({index}) => {

    return (
        <div className='flex w-full h-full'>
            <div className='flex w-[40%] md:w-[30%] lg:w-[25%]'>
               <label className='text-base lg:text-xl text-navy '>
                    Option {index +1}:
                </label> 
            </div>
            <div className='flex w-[60%] md:w-[70%] lg:w-[75%]'> 
                <input className='border-2 border-navy rounded-md w-full pl-2 text-base lg:text-xl text-navy'>
                
                </input>
            </div>
        </div>
    )

}


const MultipleChoice = () => {

    const [answers, setAnswers] = useState([{}, {}]);

    const handleAddAnswer = () => {

        const newAnswer = {}

        setAnswers([...answers, newAnswer])
    }


    return (
        <div className='flex flex-col space-y-3'>
            <div className='flex flex-col space-y-2'>
                {answers.map((answer, index) => (
                    <div className='flex flex-row'>
                        < Choice index={index}/>
                    </div>
                ))}
            </div>
            <div className='flex flex-row justify-start'>
                <div className='flex w-[75%] lg:w-[25%]'>
                    <label className='text-base lg:text-xl font-bold text-navy'>
                        Correct Option:
                    </label>
                </div>
                <div className='flex w-[30%] lg:w-[75%] justify-end'>
                    <select
                        className='rounded-md bg-white sm:w-full lg:w-[30%] border-2 border-navy text-center'
                        type='option'
                    >
                        {answers.map((answer, index) => (
                            <option>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='flex w-full  justify-end'>
                <div className='flex justify-center text-sm sm:text-base lg:text-lg bg-white hover:cursor-pointer text-navy border-2 border-navy rounded-xl w-[90%] sm:w-[70%] lg:w-[30%]' onClick={() => handleAddAnswer()}>
                    Add Additional Answer
                </div>
            </div>
            
        </div>
    )

}

const TF = () => {

    return (
        <div className="flex flex-row w-full justify-center">
            
            <div className='flex flex-col w-[30%] md:w-[20%] items-center justify-center'>
                <label className='text-navy font-bold text-base sm:text-2xl'>
                    True
                </label>
                <input
                    type='radio'
                    name='radAnswer'
                >
                </input>
            </div>
            <div className='flex flex-col w-[30%] md:w-[20%] items-center justify-center'>
                <label className='text-navy font-bold text-base sm:text-2xl'>
                    False
                </label>
                <input
                    type='radio'
                    name='radAnswer'
                >
                </input>
            </div>
        </div>
    )

}

export const Question = ({index}) => {

    const [qType, setQType] = useState('null');

    const handleSelectChange = (event) => {
        const newValue = event.target.value;
        setQType(newValue);
    };

    return (
        <div className='flex flex-col bg-white w-full h-[100%] p-4 space-y-4 rounded-xl'>
            <div className='flex flex-row text-navy '>
                <div className="flex w-[45%] md:w-[30%] lg:w-[25%] font-bold">
                    <label className="text-sm sm:text-base lg:text-2xl w-full"> Question {index + 1}: </label>
                </div>
                <div className='flex w-[55%] md:w-[70%] lg:w-[75%] justify-start'>
                    <input className="text-sm sm:text-base lg:text-2xl rounded-md pl-2 bg-white w-full border-2 border-navy">
                    </input>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="flex whitespace-nowrap w-[60%] sm:w-[50%] md:w-[30%] lg:w-[25%]">
                    <label className="text-sm sm:text-base lg:text-xl lg:font-bold text-navy pr-2 w-full]">
                        Question Type:
                    </label>
                </div>
                <div className='flex w-[40%] sm:w-[50%] md:w-[70%] lg:w-[75%] justify-start'>
                    <select
                        className='rounded-md bg-white w-full lg:w-[30%] text-sm lg:text-base border-2 text-center border-navy'
                        type='option'
                        onChange={handleSelectChange}
                    >
                        <option value='null'>Select an Option</option>
                        <option value='MC'>Multiple Choice</option>
                        <option value='TF'>True/False</option>
                    </select>
                </div>
                
            </div>
            <div>
                {qType == 'null' ?
                    <></>
                    :
                    qType == 'MC' ?
                        <MultipleChoice />
                        :
                        < TF />
                }
            </div>
        </div>
    )

}

export const AddQButton = ({onClick}) => {

    return (
        <button onClick={onClick} className='flex h-[100%] w-[50%] md:w-[30%] text-lg bg-white md:m-4 shadow-xl rounded-xl items-center justify-center'>
            Add Question
        </button>
    )

}

