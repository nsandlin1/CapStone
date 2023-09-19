import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { LuMinus } from 'react-icons/lu';
import { MdOutlineCancel } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Candidate = () => {
    return (
        <div className="flex flex-col md:flex-row mt-2 justify-center">
            <label className="text-xl text-white pl-2">Name: </label>
                <input
                    className="w-[100%] md:w-[60%] h-[100%] ml-1 pl-2 rounded-lg justify-center text-2xl"
                    type='text'
                    name='position'
                />
            <label className="text-xl text-white pl-2">Party: </label>
                <select
                    className="w-[80%] md:w-[40%] h-[100%] ml-1 rounded-lg justify-center text-2xl"
                    type='option'
                    name='position'>
                    <option value="republican">Republican</option>
                    <option value="democrat">Democrat</option>
                    <option value="independent">Independent</option>
                </select>
        </div>
    )
}


export const CandidateFrom = ({index, onDelete}) => {

    const [candidates, setCandidates] = useState([{}, {}]);

    const showToast = () => {
        toast.success('This is a success notification');
      };

    const handleAddCandidate = () => {
        // Create a new form object based on the selected type
        const newCandidate = {};
        
        // Add the form to the selectedForms array
        setCandidates([...candidates, newCandidate]);
    };

    const removeRecentCandidate = () => {

        // Cannot have less than two candidates running for a position
        if (candidates.length > 2){

            // Remove the component at the specified index
            const updatedCandidates = [...candidates];
            console.log(candidates.length);
            updatedCandidates.splice(candidates.length - 1, 1);
            setCandidates(updatedCandidates);
        }
        else {
            toast.error("Must have at least two candidates running for a position.");
        }
      };

    const removeSection = () => {

        
    }

    return (
        <form className="flex relative justify-center bg-zinc-400 my-2 w-[100%] h-[100%] items-center rounded-xl">
           < MdOutlineCancel className='MockButtons absolute top-0 right-0' onClick={() => {onDelete()}}/> 
           <div className='flex flex-col'>
            <div className="flex relative flex-col w-[100%] h-[90%]"> 
                    <div className="flex flex-col md:flex-row mb-2 justify-center">
                        <label className="text-xl text-white">Position: </label>
                        <input
                            className="w-[75%] h-[100%] ml-2 pl-2 rounded-lg justify-center text-2xl"
                            type='text'
                            name='position'
                        />
                    </div>
                    <div className='flex flex-col w-[100%]'>
                        {candidates.map((form, index) => (
                            <div className='flex justify-center w-[100%] h-[100%]'>
                                { <Candidate/> }
                            </div> ))}
                    </div>
                </div>
                <div className='flex flex-row relative h-[10%] justify-end'>
                    < LuMinus className='MockButtons static' onClick={() => removeRecentCandidate()}/>
                    < IoMdAdd className='MockButtons static' onClick={() => handleAddCandidate()}/>
                    <ToastContainer  
                        position="top-center"
                    />
                </div>
            </div>
        </form>
    )
}

export const PolicyForm = ({onDelete}) => {

    return (
        <form className="flex justify-center bg-zinc-400 my-2 w-[100%] h-[100%] items-center rounded-xl">
            <div className="flex flex-col w-[100%]">
                <div className="flex justify-center">
                    <label className="text-xl text-white">Policy: </label>
                    <input
                        className="w-[75%] h-[100%] ml-2 pl-2 rounded-lg justify-center text-2xl"
                        type='text'
                        name='position'
                    />
                </div>
            </div>
        </form>
    )
}

export const PolicyButton = ({onClick}) => {

    return (
        <button onClick={onClick} className='flex h-[100%] w-[50%] md:w-[30%] text-lg bg-white m-2 md:m-4 shadow-xl rounded-xl items-center justify-center'>
            Add contests option for a policy
        </button>
    )
}

export const CandidateButton = ({onClick}) => {

    return (
        <button onClick={onClick} className='flex h-[100%] w-[50%] md:w-[30%] text-lg bg-white m-2 md:m-4 shadow-xl rounded-xl items-center justify-center'>
            Add contests option for an office seat
        </button>
    )
}
