import { React, useState }from 'react';
import MockElectionCard from '../components/TeacherElectionCard';
import { IoMdAdd } from 'react-icons/io';
import { BiArrowBack } from 'react-icons/bi';
import { useTransition, animated } from '@react-spring/web';

function MockElections(){

    const [selectedClass, setSelectedClass] = useState("Null");
    const [isVisible, setVisibile] = useState(false);
    
    const transitionCreateBallot = useTransition(isVisible, {
        from: { transform: 'translateY(100%)', opacity: 0 },
        enter: { transform: 'translateY(0)', opacity: 1},
        leave: { transform: 'translateY(100%)', opacity: 0}
    })

    const transitionElection = useTransition(!isVisible, {
        from: { transform: 'translateY(100%)', opacity: 0 },
        enter: { transform: 'translateY(0)', opacity: 1},
        leave: { transform: 'translateY(100%)', opacity: 0}
        
        // enter: { x: 0, y: 0, opacity: 1},
        // leave: { x: 0, y: 800, opacity: 0}
    })

    

    const classData = [
        { value: 'Class1', name: 'Class 1' },
        { value: 'Class2', name: 'Class 2' }            
    ];
    
    const handleSelectChange = (event) => {
        const newValue = event.target.value;
        setSelectedClass(newValue);
      };

    return (
        <div className="flex flex-col justify-center items-center h-[91vh] w-[100%] pb-4 bg-slate-400">
            <div className='flex flex-row justify-left items-center h-[10%] w-[80%]'>
                <div className='flex mt-4 w-[20%] h-[80%] rounded-xl'>
                    <select className='rounded-xl w-[100%] h-[90%] text-xl text-center' 
                            name="classes" 
                            id="classes"
                            onChange ={handleSelectChange}
                            value={selectedClass}> 
                        <option value="Null">Select Class</option>
                        {classData.map((e, key) => {
                            return <option key={key} value={e.value}>{e.name}</option>;
                        })}
                    </select>
                </div>
                <div>

                </div>
            </div>
            <div className='flex items-center justify-center h-[85%] w-[100%] bg-slate-400'>
                <div className='flex flex-col h-[95%] w-[80%] justify-center items-center pt-4 bg-navy rounded-xl'>
                    { transitionElection((style, item) =>
                        item &&
                    <animated.div style={style} className='flex flex-col h-[100%] w-[100%]'>
                        <div className='flex relative h-[10%] w-[100%] items-center justify-center'>
                            { selectedClass == 'Null' ? 
                                '' :
                                < IoMdAdd size='48' className='absolute fill-white top-1 right-10' onClick= {() => {setVisibile( v => !v);}}/> 
                            }
                            <h1 className='text-3xl text-white'>
                                { selectedClass == "Null" ? "Please Select a Class to view available Ballots" : "Elections"}
                            </h1>
                        </div>
                        { selectedClass == 'Null' ? <div className='flex flex-row h-[90%] w-[100%] justify-center'></div> : 
                        <div className='flex flex-row h-[90%] w-[100%] justify-center'>
                            <MockElectionCard />
                            <MockElectionCard />
                        </div>
                        }
                    </animated.div>
                    )}
                    { transitionCreateBallot((style, item) =>
                        item &&
                    <animated.div style={style} className='flex relative h-[100%] w-[100%] bg-white rounded-xl'> 
                        < BiArrowBack size='48' className='absolute fill-black top-1 left-10' onClick= {() => {setVisibile( v => !v);}}/> 
                    </animated.div> )}
                </div>
            </div>
        </div>
    )

}

export default MockElections;