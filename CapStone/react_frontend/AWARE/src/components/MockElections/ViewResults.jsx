import { useEffect, useState } from "react";
import { BiArrowBack } from 'react-icons/bi';
import React, { PureComponent } from 'react';
import { BarChart, Bar, ResponsiveContainer, Rectangle, Tooltip,  XAxis } from 'recharts';


export const PolicyContest = ({ policyName, votesFor, votesAgainst }) => {


    const yayBar = `w-[${Math.round(votesFor)}%] flex h-full bg-lightblue rounded-l-xl md:text-lg justify-center items-center`
    const yayText = `w-[${Math.round(votesFor)}%] flex h-full justify-center md:text-2xl font-bold`
    const nayBar = `w-[${Math.round(votesAgainst)}%] flex h-full bg-lightred rounded-r-xl md:text-lg justify-center items-center`
    const nayText = `w-[${Math.round(votesAgainst)}%] flex h-full justify-center md:text-2xl font-bold`
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
                            Yae
                        </div>
                        <div className={nayText}>
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

    console.log(results)

    return (
        <div className="flex flex-col w-full h-full rounded-xl justify-center items-center">
            <div className='flex relative flex-row w-full h-[20%]'>
                <div className="flex relative flex-row h-full w-full justify-center items-center md:text-3xl">
                    < BiArrowBack className="BackArrowResults absolute md:top-6 left-4 md:left-8 fill-navy" onClick={() => onBack()}/>
                    <div className="flex flex-col w-full justify-center items-center text-navy">
                        <div className="flex flex-row w-full h-full items-center justify-center">
                            <div className="flex w-[50%] md:w-[25%] justify-start items-start">
                                Total Votes:
                            </div>
                            <div className="flex w-[5%] justify-end">
                                {results['totalVotes']}
                            </div>
                        </div>
                        <div className="flex flex-row w-full h-full items-center justify-center">
                            <div className="flex w-[50%] md:w-[25%] justify-start">
                                Votes Left to be Cast:
                            </div>
                            <div className="flex w-[5%] justify-end">
                                {(results['totalStudents'] - results['totalVotes'])} 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap w-full h-[85%] rounded-xl justify-center pt-4 over gap-x-2 md:gap-x-6 gap-y-2 md:gap-y-6 overflow-auto mb-2">
            { results.length !== 0 ?
                results['contests'].map((result, idx) => (
                    result['contestType'] === 'policy' ?
                    <div className="flex bg-navy h-[45%] w-[45%] rounded-xl transition hover:scale-105 hover:shadow-xl">
                        <PolicyContest policyName={result.policy} votesFor={result.votesFor} votesAgainst={result.votesAgainst}/>
                    </div>
                    :
                    <div className="flex bg-navy h-[45%] w-[45%] rounded-xl transition hover:scale-105 hover:shadow-xl">
                        <CandidateContest position={result.position} totalVotes={result.totalVotes} candidates={result.candidates}/>
                    </div>
                ))
                :
                ''
            }
            </div>
        </div>
    )
}