export const StudentElectionCard = ({custKey, ballotNum, electionTitle, voted, onVote, onViewResults}) => {

    const votedOnElection = `${voted === null ? 'text-red-600' : 'text-white'} text-md 
                        md:text-xl lg:text-3xl  whitespace-nowrap hover:cursor-pointer`

    return (
        <div className="flex h-full hover:scale-105 hover:shadow-2xl w-[92%] rounded-xl pl-6 bg-navy m-1 transition ">
            <div className='flex flex-col w-[100%] h-[100%] items-center justify-center'>
                <div className="flex flex-row w-[100%] h-full items-center justify-center">
                    <div className='flex w-[50%] h-[100%] justify-start items-center '>
                        <h1 className='text-md md:text-xl lg:text-3xl text-white whitespace-wrap'>
                            {electionTitle}
                        </h1>
                    </div>
                    <div className='flex w-[50%] items-center justify-end pr-4'>
                        <h1 className={votedOnElection} 
                            onClick={voted == false ? () => onVote(ballotNum, electionTitle) : () => onViewResults(ballotNum, electionTitle)}>
                            {voted === false ? 'Vote' : 'View Results'}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}