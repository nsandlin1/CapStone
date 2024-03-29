import { AiOutlineConsoleSql } from "react-icons/ai";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { wait } from "../../utils/wait";


export const Policy = ({ custKey, policyNum, policyName, handleChange}) => {

    return (
        <div className="flex flex-col h-full w-[90%] rounded-xl bg-navy p-2">
            <div className="flex flex-row h-[20%] md:h-[30%] w-full justify-center items-center text-white font-bold md:text-3xl pt-2">
                {policyName}
            </div>
            <div className="flex flex-row h-[70%] w-full items-center justify-center md:gap-2 pt-4">
                <div className="flex flex-col h-full w-[30%] gap-2">
                    <label className="flex justify-center text-white md:text-3xl">
                        Yae
                    </label>
                    <input 
                        name={'policy'+policyNum}
                        type='radio'
                        onChange={() => handleChange(custKey, 'yay')} 
                    />
                </div>
                <div className="flex flex-col h-full w-[30%] gap-1 md:gap-2">
                    <label className="flex justify-center text-white md:text-3xl">
                        Nay
                    </label>
                    <input 
                        name={'policy'+policyNum}
                        type='radio'
                        onChange={() => handleChange(custKey, 'nay')}    
                    />
                </div>
            </div> 
        </div>
    )
}


export const CandidateBallot = ({ custKey, ballotNum, position, candidates, handleChange }) => {

    return (
        <div className="flex flex-col h-full w-[90%] rounded-xl bg-navy m-2 p-2">
            <div className="flex flex-row w-full justify-center items-center text-white font-bold md:text-3xl pt-2">
                {position}
            </div>
            <div className="flex flex-col h-[75%] w-full items-center justify-center md:gap-2 pt-4 overflow-auto my-4">
                {candidates.map((candidate, idx) =>
                    <div key={idx} className="flex flex-row w-[50%] items-center justify-end md:text-3xl gap-4">
                        <input
                            className="hover:scale-110 hover:shadow-xl"
                            name={'candidateBallot'+ballotNum}
                            type='radio'
                            onChange={() => handleChange(custKey, candidate.candidate_id)} 
                        />
                        <div className="flex w-[65%] text-white ">
                            {candidate.name + '   (' + candidate.party + ')'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export const VoteOnBallot = ({ballotNum}) => {

    const [contests, setContests] = useState([]);
    const [submitStatus, setSubmitStatus] = useState([]);

    useEffect(() => {
        // Define the API endpoint URL
        const apiUrl = `/api/classes/get_ballot_contests?ballotNum=${ballotNum}`;
        // Fetch data from the API
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            // Update the state with the fetched data
            setContests(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
    }, []);

    const submitBallot = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        // Define the API endpoint URL
        const apiUrl = `/api/classes/submit_ballot_votes?email=${user['email']}&votes=${JSON.stringify(contests)}&ballotNum=${ballotNum}`;
        fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    // Update the state with the fetched data
                    setSubmitStatus(data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
        });
    }

    const handleSelection = (contestNum, vote) => {
        const updatedContests = [...contests];
        updatedContests[contestNum] = { ...updatedContests[contestNum], vote: vote};
        console.log(updatedContests)
        setContests(updatedContests)
    }

    const handleSubmit = () => {

        let unasnweredPoll = false;

        contests.forEach((contest) => {
            if (contest.vote == null){
                unasnweredPoll = true;
            }
        })

        if (!unasnweredPoll){
            submitBallot();
        }
        else {
            toast.error('You have not cast a vote on all contest.');
            return;
        }
    }

    async function reload() {
        await wait(2000, {
            autoClose: 2000,
        });  
        window.location.reload();
    }

    useEffect(() => {
        if (submitStatus.success){
            toast.success("Successfully submitted votes.");
            reload();
        }
    }, [submitStatus])

    return (
        <div className="flex flex-col w-full h-full rounded-xl gap-2 p-2 justify-center items-center overflow-auto my-2">
            <div className="flex flex-col w-full h-[92%] items-center gap-2 overflow-auto">
                {
                    contests.map((contest, index) => (

                        <div key={index} className="flex h-full w-full items-center justify-center">
                            {contest['contestType'] === 'policy' ?
                                    <Policy
                                        custKey={index} 
                                        policyNum={contest.policyNum} 
                                        policyName={contest.policy}
                                        handleChange={handleSelection}
                                    />
                            :
                                    < CandidateBallot 
                                        custKey={index}
                                        ballotNum={contest.contestNum} 
                                        position={contest.position} 
                                        candidates={contest.candidates}
                                        handleChange={handleSelection}
                                    />
                            }
                        </div>
                ))}
            </div>
            <div className="flex w-full h-[8%] justify-center">
                <button 
                    className="flex h-[100%] w-[20%]  bg-navy rounded-xl text-white justify-center items-center"
                    onClick={() => handleSubmit()}>
                    Submit
                </button>
            </div>
        </div>
    )
}