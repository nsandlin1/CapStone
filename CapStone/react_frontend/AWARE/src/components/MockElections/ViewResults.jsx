import { useEffect, useState } from "react"


export const PolicyContest = ({ policyName, votesFor, votesAgainst }) => {


    console.log(Math.round(votesFor))

    const yayBar = `w-[${Math.round(votesFor)}%] flex h-full bg-lightblue rounded-l-xl text-lg justify-center items-center`
    const yayText = `w-[${Math.round(votesFor)}%] flex h-full justify-center text-2xl font-bold`
    const nayBar = `w-[${Math.round(votesAgainst)}%] flex h-full bg-lightred rounded-r-xl text-lg justify-center items-center`
    const nayText = `w-[${Math.round(votesAgainst)}%] flex h-full justify-center text-2xl font-bold`

    console.log(yayBar)

    return (
        <div className='flex flex-col w-full h-full text-white rounded-xl items-center justify-center'>
            <div className='flex w-full h-[40%] justify-center items-center m-2 text-4xl'>
                {policyName}
            </div>
            <div className='flex flex-col w-full h-[70%] justify-center items-center'>
                <div className='flex flex-row w-[90%] h-[50%] rounded-xl justify-center items-center'>
                    <div className={yayBar}>
                        {votesFor + '%'}
                    </div>
                    <div className={nayBar}>
                        {votesAgainst + '%'}
                    </div>
                </div>
                <div className='flex flex-row w-[90%] h-[50%] rounded-xl justify-center items-center'>
                    <div className={yayText}>
                        Yay
                    </div>
                    <div className={nayText}>
                        Nay 
                    </div>
                </div>
            </div>
        </div>
    )

}

export const CandidateContest = () => {

}


export const ViewResults = ({ ballotNum }) => {

    const [results, setResults] = useState([]);


    useEffect(() => {
        const api = `/api/classes/get_election_results?ballotNum=${ballotNum}`

        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                setResults(data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
              });
    }, [])

    console.log(results)

    return (
        <div className="flex flex-col w-full h-full rounded-xl justify-center items-center overflow-auto my-4">
            <div className="flex flex-wrap w-full h-full rounded-xl justify-center items-center over gap-x-6 gap-y-2">
            {
                results.map((result, idx) => (
                    <div className="flex bg-navy h-[47%] w-[45%] rounded-xl transition hover:scale-105 hover:shadow-xl">
                        <PolicyContest policyName={result.policy} votesFor={result.votesFor} votesAgainst={result.votesAgainst}/>
                    </div>
                )) 
            }
            </div>
        </div>
    )
}