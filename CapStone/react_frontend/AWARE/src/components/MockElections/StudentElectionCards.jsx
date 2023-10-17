import { AiOutlineConsoleSql } from "react-icons/ai";
import { useState, useEffect } from "react";


export const Policy = ({policyNum, policyName}) => {

    return (
        <div className="flex flex-col h-full w-[90%] rounded-xl bg-navy">
            <div className="flex flex-row h-[20%] md:h-[30%] w-full justify-center text-white font-bold md:text-4xl pt-2">
                {policyName}
            </div>
            <div className="flex flex-row h-[70%] w-full items-center justify-center md:gap-2 pt-4">
                <div className="flex flex-col h-full w-[30%] gap-2">
                    <label className="flex justify-center text-white md:text-3xl">
                        Yay
                    </label>
                    <input 
                        name={'policy'+policyNum}
                        type='radio'
                    />
                </div>
                <div className="flex flex-col h-full w-[30%] gap-1 md:gap-2">
                    <label className="flex justify-center text-white md:text-3xl">
                            Nay
                        </label>
                        <input 
                            name={'policy'+policyNum}
                            type='radio'    
                        />
                </div>
            </div>
            
        </div>
    )

}


export const Candidate = ({candidate, canddiateNum}) => {

    return (
        <div>
            {candidate}
        </div>
    )

}

export const CandidateBallot = ({ ballotNum, position, candidates }) => {


    return (
        <div className="flex flex-col h-full w-[90%] rounded-xl bg-navy m-2">
            <div className="flex flex-row h-[20%] md:h-[30%] w-full justify-center text-white font-bold md:text-4xl pt-2">
                {position}
            </div>
            <div className="flex flex-col h-[70%] w-full items-center justify-center md:gap-2 pt-4">
                {candidates.map((candidate, idx) =>
                    <div key={idx} className="flex flex-row w-[70%] bg-yellow-400 items-center justify-center gap-2">
                        <div className="flex w-[80%]">
                            {candidate.name}
                        </div>
                        <input
                            name={'candidateBallot'+ballotNum}
                            type='radio'
                        />
                    </div>
                )}
            </div>
        </div>
    )

}

export const VoteOnBallot = ({ballotNum}) => {

    const [contests, setContests] = useState([]);

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

    return (
        <div className="flex flex-col w-full h-full rounded-xl gap-2 p-2 overflow-auto my-2">
            {
                contests.map((contest, index) => (

                    <div key={index} className="flex h-full w-full items-center justify-center">
                        {console.log(contest)}
                        {contest['contestType'] === 'policy' ?
                                <Policy policyNum={contest.policyNum} policyName={contest.policy} />
                        :
                                < CandidateBallot ballotNum={contest.contestNum} position={contest.position} candidates={contest.candidates}/>
                        }
                    </div>
            ))}
        </div>
    )
}


export const StudentElectionCard = ({custKey, ballotNum, electionTitle='Test', voted, onVote}) => {

    const votedOnElection = `${voted === null ? 'text-red-600' : 'text-white'} text-md 
                        md:text-xl lg:text-3xl  whitespace-nowrap hover:cursor-pointer`

    return (
        <div className="flex h-[20%] hover:scale-105 hover:shadow-2xl w-[92%] rounded-xl pl-6 bg-navy m-1 transition ">
            <div className='flex flex-col w-[100%] h-[100%] items-center justify-center'>
                <div className="flex flex-row w-[100%] h-full items-center justify-center">
                    <div className='flex w-[20%] h-[100%] justify-center items-center'>
                        <h1 className='text-md md:text-xl lg:text-3xl text-white whitespace-nowrap'>
                            {electionTitle}
                        </h1>
                    </div>
                    <div className='flex w-[60%] justify-center items-center'>
                        <h1 className='text-md md:text-xl lg:text-3xl text-white whitespace-nowrap'>
                        </h1>
                    </div>
                    <div className='flex w-[15%] items-center justify-end'>
                        <h1 className={votedOnElection} 
                            onClick={() => onVote(ballotNum, custKey)}>
                            {voted === false ? 'Take Quiz' : 'View Results'}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )

}