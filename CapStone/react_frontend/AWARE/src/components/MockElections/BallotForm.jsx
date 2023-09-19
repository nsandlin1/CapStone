import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { LuMinus } from 'react-icons/lu';

const Candidate = () => {
    return (
        <div className="flex flex-row mt-2 justify-center">
            <label className="text-xl text-white pl-2">Name: </label>
                <input
                    className="w-[60%] h-[100%] ml-1 pl-2 rounded-lg justify-center text-2xl"
                    type='text'
                    name='position'
                />
            <label className="text-xl text-white pl-2">Party: </label>
                <select
                    className="w-[40%] h-[100%] ml-1 rounded-lg justify-center text-2xl"
                    type='option'
                    name='position'>
                    <option value="republican">Republican</option>
                    <option value="democrat">Democrat</option>
                    <option value="independent">Independent</option>
                </select>
        </div>
    )
}


export const CandidateFrom = ({input}) => {

    const [candidates, setCandidates] = useState([{}, {}]);

    const handleAddCandidate = () => {
        // Create a new form object based on the selected type
        const newCandidate = {};
        
        // Add the form to the selectedForms array
        setCandidates([...candidates, newCandidate]);
    };

    const removeRecentCandidate = () => {
        // Remove the component at the specified index
        const updatedCandidates = [...candidates];
        console.log(candidates.length);
        updatedCandidates.splice(candidates.length - 1, 1);
        setCandidates(updatedCandidates);
      };

    return (
        <form className="flex relative justify-center bg-zinc-400 my-4 w-[100%] h-[100%] items-center rounded-xl">
            <div className="flex relative flex-col w-[100%]">
                <div className="flex mb-2 justify-center">
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
                < IoMdAdd className='absolute bottom-3 right-12' size={36} onClick={() => handleAddCandidate()}/>
                < LuMinus className='absolute bottom-3 right-20' size={36} onClick={() => removeRecentCandidate()}/>
        </form>
    )
}

export const PolicyForm = () => {

    return (
        <form className="flex justify-center bg-zinc-400 my-4 w-[100%] h-[100%] items-center rounded-xl">
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
        <button onClick={onClick} className='flex h-[100%] w-[30%] text-lg bg-white m-4 shadow-xl rounded-xl items-center justify-center'>
            Add contests option for a policy
        </button>
    )
}

export const CandidateButton = ({onClick}) => {

    return (
        <button onClick={onClick} className='flex h-[100%] w-[30%] text-lg bg-white m-4 shadow-xl rounded-xl items-center justify-center'>
            Add contests option for an office seat
        </button>
    )
}
