import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { StudentElectionCard } from "../../components/MockElections/StudentElectionCards";


function Elections() {

    const [elections, setElections] = useState([
        {
            id: 1,
            class_election_title: 'Pencil Ban'
        },
        {
            id: 2,
            class_election_title: 'Presidential Election'
        }
    ]);


    const availableQuizzesView = `${false ? 'hidden' : 'flex flex-col relative h-[85%] w-[95%] rounded-xl items-center justify-center bg-white mb-4 shadow-lg'}`

    return (
        <div className='flex flex-col h-[91vh] w-[100%] bg-slate-400 justify-center items-center'>
            <div className='flex flex-col h-[100%] w-[90%] rounded-xl items-center'>
                <div className='flex flex-row h-[15%] w-[95%] items-center justify-center'>
                    <div className='text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg'>
                        {true ? <h1>Ballots</h1> : 'Ballots'}
                    </div>
                </div>
                <div className={availableQuizzesView}>
                    <div className='flex flex-row h-[10%] w-[95%] items-center'>
                        <div className='flex w-[20%] justify-center'>
                            <h1 className='text-xl md:text-2xl lg:text-3xl text-navy font-bold whitespace-nowrap '>
                                Election
                            </h1> 
                        </div>
                        <div className='flex w-[60%] justify-center items-center'>
                            <h1 className='text-xl md:text-2xl lg:text-3xl text-navy font-bold whitespace-nowrap '>
                            </h1> 
                        </div>
                        <div className='flex w-[20%] justify-center items-center'>
                            <h1 className='text-xl md:text-2xl lg:text-3xl text-navy font-bold whitespace-nowrap '>
                                Action
                            </h1> 
                        </div>
                    </div>
                    <div className='flex flex-col w-[100%] h-[90%] justify-start items-center overflow-auto'>
                        {elections['error'] ? 
                            <h1 className="text-navy text-2xl md:text-6xl pt-24 font-bold text-wrap whitespace-normal">You have not registered for any class</h1>
                        :
                        elections.map((election, idx) => (
                                <StudentElectionCard 
                                    key = {idx}
                                    ballotNum = {election.id}
                                    electionTitle = {election.class_election_title}
                                    voted = {false}
                                />
                            ))}
                    </div>
                </div>
                {/* {takingQuiz ? 
                    <div className="flex flex-col relative h-[85%] w-[95%] rounded-xl items-center justify-center bg-white mb-4 shadow-lg">
                        <TakeQuiz 
                            quizId = {currentQuiz}
                            quizTitle = {currentQuizTitle}
                            takingQuiz = {takingQuiz}
                        /> 
                    </div>
                : 
                    ''
                } */}
            </div>
            <ToastContainer  
                position="top-center"
                autoClose={1500}
            />
        </div>
    )
}

export default Elections;