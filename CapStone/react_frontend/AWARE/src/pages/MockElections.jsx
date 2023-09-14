import { React, useState }from 'react';
import MockElectionCard from '../components/MockElections/ElectionCard';
import { IoMdAdd } from 'react-icons/io';
import { useTransition, animated } from '@react-spring/web';
import CreateBallot from '../components/MockElections/CreateBallot';

function MockElections(){

    const [selectedClass, setSelectedClass] = useState("Null");
    const [isVisible, setVisibile] = useState(false);
    const [isClassSelected, setIsClassSelected] = useState(false);

    const transitionElection = useTransition(!isVisible, {
        from: {  opacity: 0},
        enter: {  opacity: 1},
        leave: {  opacity: 0}
    })

    const transitionClass = useTransition(isClassSelected, {
        from: {  opacity: 0},
        enter: {  opacity: 1},
        leave: {  opacity: 0}
    })

    const classData = [
        { value: 'Class1', name: 'Class 1' },
        { value: 'Class2', name: 'Class 2' }            
    ];
    
    const handleSelectChange = (event) => {
        const newValue = event.target.value;
        setSelectedClass(newValue);
        if (newValue == 'Null') { setIsClassSelected(false); }
        else { setIsClassSelected(true); }
      };

    const handleBack = () => {
        setVisibile(v => !v);
    }

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
                <div className='flex relative flex-col h-[95%] w-[80%] shadow-2xl justify-center items-center pt-4 bg-navy rounded-xl'>
                    { transitionElection((style, item) =>
                        item &&
                    <animated.div style={style} className='absolute flex flex-col h-[100%] w-[100%]'>
                        { transitionClass((style, item) =>
                            item && 
                                <animated.div style={style} className='absolute flex flex-col h-[100%] w-[100%]'>
                                    <div className='flex relative h-[10%] w-[100%] items-center justify-center'>
                                        < IoMdAdd size='48' className='absolute fill-white top-1 right-10' onClick= {() => {setVisibile( v => !v);}}/>
                                        <h1 className='text-3xl text-white'>
                                            Elections
                                        </h1>
                                    </div> 
                                    <div className='flex flex-row h-[90%] w-[100%] justify-center'>
                                        <MockElectionCard />
                                        <MockElectionCard />
                                    </div>
                                </animated.div>
                        )} 
                        { transitionClass((style, item) =>
                            !item && 
                                <animated.div style={style} className='flex relative flex-col h-[100%] w-[100%]'>
                                    <div className='flex relative h-[10%] w-[100%] items-center justify-center'>
                                        <h1 className='text-3xl text-white'>
                                            Please Select a Class to view available Ballots
                                        </h1>
                                    </div> 
                                </animated.div>
                        )} 
                    </animated.div>
                    )}
                    { transitionElection((style, item) =>
                        !item &&
                    <animated.div style={style} className='flex relative h-[100%] w-[100%] bg-navy rounded-xl'>
                        < CreateBallot back={handleBack}/>
                    </animated.div> )}
                </div>
            </div>
        </div>
    )

}

export default MockElections;