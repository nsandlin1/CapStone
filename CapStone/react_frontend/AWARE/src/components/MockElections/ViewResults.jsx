import { useEffect, useState } from "react";
import { BiArrowBack } from 'react-icons/bi';
import React, { PureComponent } from 'react';
import { BarChart, Bar, ResponsiveContainer, Rectangle, Tooltip,  XAxis } from 'recharts';


export const PolicyContest = ({ policyName, votesFor, votesAgainst }) => {


    const noVotes = (votesFor === 0 && votesAgainst === 0)
    const roundedVotesFor = Math.round(votesFor)
        const roundedVotesAgainst = (Math.round(votesAgainst) + roundedVotesFor) !== 100 ? 
                                            Math.round(votesAgainst) - 1 : 
                                            Math.round(votesAgainst)
                                                
    const yayStyle = {
        width: `${roundedVotesFor}%`,
      };

    const nayStyle = {
        width: `${roundedVotesAgainst}%`
    }

    const oneSided = `${votesFor === 100 ? 'bg-lightblue' : 'bg-lightred'} flex w-full h-full justify-center bg-lightblue items-center rounded-xl md:text-lg`


    return (
        <div className='flex flex-col w-full h-full text-white rounded-xl items-center justify-center'>
            <div className='flex w-full h-[40%] justify-center items-center m-2 md:text-4xl'>
                {policyName}
            </div>
            {(votesFor === 100 || votesAgainst === 100) ? 
                <div className='flex flex-col w-full h-[70%] justify-center items-center'>
                    <div className='flex flex-row w-[90%] h-[50%] rounded-xl justify-center items-center'>
                        <div className={oneSided}>
                            100%
                        </div>
                    </div>
                    <div className='flex flex-row w-[90%] h-[50%]'>
                        <div className='flex w-full h-full justify-center md:text-2xl font-bold'>
                            {votesFor === 100 ? 'Yae' : 'Nay'}
                        </div>
                    </div>
                </div>
            :
            noVotes ?
                <div className="flex w-[80%] h-[70%] items-center justify-center text-sm md:text-2xl">
                    No Votes Have Been Cast Yet
                </div>
                :
                <div className='flex flex-col w-full h-[70%] justify-center items-center'>
                    <div className='flex flex-row w-[90%] h-[50%] rounded-xl bg-yellow-400 justify-center items-center'>
                        <div className='flex h-full bg-lightblue rounded-l-xl md:text-lg justify-center items-center' style={yayStyle}>
                            {votesFor + '%'}
                        </div>
                        <div className='flex h-full bg-lightred rounded-r-xl md:text-lg justify-center items-center' style={nayStyle}>
                            {votesAgainst + '%'}
                        </div>
                    </div>
                    <div className='flex flex-row w-[90%] h-[50%] rounded-xl justify-center items-center'>
                        <div className='flex h-full justify-center md:text-2xl font-bold' style={yayStyle}>
                            Yae
                        </div>
                        <div className='flex h-full justify-center md:text-2xl font-bold' style={nayStyle}>
                            Nay
                        </div>
                    </div>
                </div>
            }
        </div>
    )

}

export const CandidateContest = ({ position, totalVotes, candidates}) => {

    const alternatingColors = (index) => {
        return index % 2 === 0 ? '#8884d8' : '#82ca9d';
    };

    return (
        <div className='flex flex-col w-full h-full text-white rounded-xl items-center justify-center'>
            <div className='flex w-full h-[30%] justify-center items-center m-2 md:text-4xl'>
                {position}
            </div>
            <div className="flex w-full h-[70%] text-black">
                <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={candidates}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                >
                                <XAxis dataKey="name"/>
                                <Tooltip />
                        <Bar dataKey="votesFor" fill='#E64141' activeBar={<Rectangle fill="black" stroke="white" />} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )

}


export const ViewResults = ({ ballotNum, onBack }) => {

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


    return (
        <div className="flex flex-col w-full h-full rounded-xl justify-center items-center">
            <div className="flex flex-col w-full h-full">
                <div className='flex relative flex-row w-full h-[20%]'>
                    <div className="flex relative flex-row h-full w-full justify-center items-center md:text-xl xl:text-3xl pb-2">
                        < BiArrowBack className="BackArrowResults absolute xl:top-6 left-4 xl:left-8 fill-navy" onClick={() => onBack()}/>
                        <div className="flex flex-col w-full justify-center items-center text-navy">
                            <div className="flex flex-row w-full h-full items-center justify-center">
                                <div className="flex w-[50%] md:w-[25%] justify-start items-start">
                                    Total Votes:
                                </div>
                                <div className="flex w-[5%] justify-end">
                                    {results.length !== 0 ? results['totalVotes'] : ''}
                                </div>
                            </div>
                            <div className="flex flex-row w-full h-full items-center justify-center">
                                <div className="flex w-[50%] md:w-[25%] justify-start">
                                    Votes Left to be Cast:
                                </div>
                                <div className="flex w-[5%] justify-end">
                                    {results.length !== 0 ? (results['totalStudents'] - results['totalVotes']) : ''} 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap w-full h-[85%] rounded-xl justify-center pt-4 over gap-x-2 md:gap-x-6 gap-y-2 md:gap-y-6 overflow-auto mb-2">
                { results.length !== 0 ?
                    results['contests'].map((result, idx) => (
                        result['contestType'] === 'policy' ?
                        <div key={idx} className="flex bg-navy h-[45%] w-[90%] md:w-[45%] rounded-xl transition hover:scale-105 hover:shadow-xl">
                            <PolicyContest policyName={result.policy} votesFor={result.votesFor} votesAgainst={result.votesAgainst}/>
                        </div>
                        :
                        <div key={idx} className="flex bg-navy h-[45%] w-[90%] md:w-[45%] rounded-xl transition hover:scale-105 hover:shadow-xl">
                            <CandidateContest position={result.position} totalVotes={result.totalVotes} candidates={result.candidates}/>
                        </div>
                    ))
                    :
                    ''
                }
                </div>
            </div>
        </div>
    )
}