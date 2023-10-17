import { AiOutlineConsoleSql } from "react-icons/ai";
import { useState, useEffect } from "react";




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

    console.log(contests)

    return (
        <div>
            {ballotNum}
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