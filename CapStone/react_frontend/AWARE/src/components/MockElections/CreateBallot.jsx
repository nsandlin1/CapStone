import { useState, useRef } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { PolicyButton, CandidateButton, CandidateFrom, PolicyForm } from './BallotForm';
import { MdOutlineCancel } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';

function CreateBallot({back}) {

    const [selectedForms, setSelectedForms] = useState([]);
    var count = useRef(0)

    const handleAddForm = (formType) => {
        // Create a new form object based on the selected type
        const newForm = { type: formType, data: {} };
        
        console.log("Adding " + formType);
        console.log(newForm);

        // Add the form to the selectedForms array
        setSelectedForms([...selectedForms, newForm]);
      };

    
    const handleRemoveForm = (indexToRemove) => {

        setSelectedForms(selectedForms.filter((o, i) => indexToRemove !== i));

        // if (indexToRemove == 0 || indexToRemove == selectedForms.length) {
        //     console.log(selectedForms.slice(2,4));
        //     setSelectedForms(selectedForms.slice(2,4));
        // }

        // if (selectedForms.length == 1){
        //     console.log('here');
        //     const updatedForms = [...selectedForms];
        //     updatedForms.splice(1, index);
        //     setSelectedForms(updatedForms);
        // } else { setSelectedForms([])}
    };

    function saveButtonClick() {
        console.log("hello")
    }

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
                    <button className='text-xl bg-white rounded-xl w-[90%] md:w-[30%]' onClick={saveButtonClick}>
                        Save
                    </button>
                </div>
            </div>
            {/* for election name */}
            <input
                className="w-[96%] h-[8%] ml-2 pl-2 rounded-lg justify-center text-2xl"
                type='text'
                name='position'
            />
            <div className='flex flex-col w-[100%] h-[90%] justify-center'>
                <div className='flex flex-col w-[95%] h-[100%] items-center m-2 overflow-auto'>
                    <div className='flex flex-col w-[100%] md:w-[90%] items-center rounded-xl'>
                        {selectedForms.map((form, index) => (
                            <div key={index} className='flex relative justify-center md:w-[80%] h-[100%] my-2'>
                                {form.type === 'candidate' ? (
                                <CandidateFrom index={index} onDelete={() => {
                                    count.current -= 1
                                    handleRemoveForm(index)
                                }}/>
                                ) : (
                                <PolicyForm index={index} onDelete={() => {
                                    count.current -= 1
                                    handleRemoveForm(index)
                                }}/>
                                )}
                            </div>
                        ))}
                        </div>
                    <div className='flex flex-row w-[100%] my-2 justify-center'>
                        <PolicyButton onClick={() => {
                            if (count.current == 0) {
                                count.current += 1
                                handleAddForm('policy')
                            } else {
                                toast.error("you may only create one ballot at a time");
                            }
                        }}></PolicyButton>
                        <CandidateButton onClick={() => {
                            if (count.current == 0) {
                                console.log(count.current)
                                count.current += 1
                                handleAddForm('candidate')
                            } else {
                                toast.error("you may only create one ballot at a time");
                            }
                        }}></CandidateButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBallot;