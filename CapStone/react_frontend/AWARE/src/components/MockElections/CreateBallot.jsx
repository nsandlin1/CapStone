import { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { PolicyButton, CandidateButton, CandidateFrom, PolicyForm } from './BallotForm';
import { MdOutlineCancel } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { wait } from '../../utils/wait';

function CreateBallot({back, classid}) {

    const [selectedForms, setSelectedForms] = useState([]);
    const [electionName, setElectionName] = useState("")
    const [res, setRes] = useState("")

    const handleAddForm = (formType) => {
        // Create a new form object based on the selected type
        var newForm = {}
        if (formType == 'policy') {
            newForm = { type: 'policy', policy: ""};
        } else {
            newForm = { type: 'candidate', position: "", contestants: [{name: '', party: 'R'},{name: '', party: 'R'}]};
        }

        // Add the form to the selectedForms array
        setSelectedForms([...selectedForms, newForm]);
      };

    
    const handleRemoveForm = (indexToRemove) => {

        setSelectedForms(selectedForms.filter((o, i) => indexToRemove !== i));
    };

    function emptyItem(l) {
        for (let i = 0; i < l.length; i++) {
            if (l[i].type == 'candidate') {
                if (l[i].position == "") {
                    return true
                }
                for (let j = 0; j < l[i].contestants; j++) {
                    if (l[i][j].name == '' || l[i][j].party == '') {
                        return true
                    }
                }
            } else {
                if (l[i].policy == "") {
                    return true
                }
            }
        }

        return false
    }

    async function reload() {
        await wait(2000, {
            autoClose: 2000,
        });  
        window.location.reload();
    }

    function saveButtonClick() {
        // save to database
        // TODO: Need some error checking so can't send blank shit
        console.log("checking")
        console.log(selectedForms)
        if (electionName == "") {
            console.log("name is null");
            toast.error("You must provide an election name.");
        } else if (selectedForms.length == 0) {
            toast.error("Cannot create empty ballot. You've provided no forms.");
        } else if (emptyItem(selectedForms)) {
            toast.error("All items must be filled in.")
        } else {
            var api_url = "/api/classes/create_ballot?" + 
                        "classid=" + classid + 
                        "&electionName=" + electionName + 
                        "&selectedForms=" + JSON.stringify(selectedForms)
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
                    toast.success('Successfully created Mock Election. Refreshing page now.')
                    reload()
                })
        }
    }
    useEffect(() => {
        
    }, [res])

    return (
        <div className="flex flex-col w-[100%] h-[100%] bg-navy rounded-xl"> 
            <div className='flex flex-row w-[100%] h-[20%]'>
                <div className='flex flex-col w-full h-full items-center justify-center gap-2'>
                    <div className='flex flex-row w-full '>
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
                    <div className='flex flex-row w-full h-[80%] items-center justify-center'>
                        {/* for election name */}
                        < label className='text-base md:text-3xl lg:text-4xl w-[20%] md:w-[20%] text-white'>Election Title: </label>
                        <input
                            className="rounded-lg justify-center bg-white text-navy text-base md:text-2xl h-[100%] w-[60%] md:w-[70%] ml-4 pl-4 transition hover:scale-105"
                            type='text'
                            name='position'
                            onChange={(t) => {
                                setElectionName(t.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
            
            <div className='flex flex-col w-[100%] h-[80%] justify-center'>
                <div className='flex flex-col w-[95%] h-[100%] items-center m-2 overflow-auto'>
                    <div className='flex flex-col w-[100%] md:w-[90%] items-center rounded-xl'>
                        {selectedForms.map((form, index) => (
                            <div key={index} className='flex relative justify-center md:w-[80%] h-[100%] my-2'>
                                {form.type === 'candidate' ? (
                                <CandidateFrom key={index} index={index} form={form} onDelete={() => {
                                    handleRemoveForm(index)
                                }}/>
                                ) : (
                                <PolicyForm key={index} index={index} form={form} onDelete={() => {
                                    handleRemoveForm(index)
                                 }}/>
                                )}
                            </div>
                        ))}
                        </div>
                    <div className='flex flex-row w-[100%] my-2 justify-center'>
                        <PolicyButton onClick={() => {
                            handleAddForm('policy')
                        }}></PolicyButton>
                        <CandidateButton onClick={() => {
                            handleAddForm('candidate')
                        }}></CandidateButton>
                    </div>
                </div>
            </div>
            <ToastContainer  
                position="top-center"
                autoClose={1500}
            />
        </div>
    )
}

export default CreateBallot;