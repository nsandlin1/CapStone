import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { PolicyButton, CandidateButton, CandidateFrom, PolicyForm } from './BallotForm';

function CreateBallot({back}) {

    const [selectedForms, setSelectedForms] = useState([]);

    const handleAddForm = (formType) => {
        // Create a new form object based on the selected type
        const newForm = { type: formType, data: {} };
        
        // Add the form to the selectedForms array
        setSelectedForms([...selectedForms, newForm]);
      };
    

    return (
        <div className="flex flex-col w-[100%] h-[100%] bg-navy rounded-xl"> 
            <div className='flex flex-row w-[100%] h-[10%]'>
                <div className='flex w-[20%] md:w-[30%]'>
                    < BiArrowBack className='MockButtons absolute fill-white top-2 md:top-1 left-4 md:left-10' onClick={back}/>
                </div>
                <div className='flex w-[60%] md:w-[40%] text-lg md:text-3xl text-white items-center justify-center'>
                        Create Mock Election
                </div>
                <div className='flex w-[20%] md:w-[30%] h-[100%] justify-end pr-2 md:pr-10'>
                    <button className='text-xl bg-white rounded-xl w-[80%] md:w-[30%]'>
                        Save
                    </button>
                </div>
            </div>
            <div className='flex flex-col w-[100%] h-[90%] justify-center'>
                <div className='flex flex-col w-[95%] h-[100%] items-center m-2 overflow-auto'>
                    <div className='flex flex-col w-[100%] md:w-[90%] items-center rounded-xl'>
                        {selectedForms.map((form, index) => (
                            <div className='flex justify-center w-[100%] md:w-[80%] h-[100%] my-2'>
                                {form.type === 'candidate' ? (
                                <CandidateFrom input={form.data} />
                                ) : (
                                <PolicyForm data={form.data} />
                                )}
                                {/* <button onClick={() => handleRemoveForm(index)}>Remove Form</button> */}
                            </div>
                        ))}
                        </div>
                    <div className='flex flex-row w-[100%] my-2 justify-center'>
                        <PolicyButton onClick={() => handleAddForm('policy')}></PolicyButton>
                        <CandidateButton onClick={() => handleAddForm('candidate')}></CandidateButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBallot;