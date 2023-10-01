import { React, useState, useEffect }from 'react';
import MockElectionCard from '../../components/MockElections/ElectionCard';
import { IoMdAdd } from 'react-icons/io';
import { useTransition, animated } from '@react-spring/web';
import CreateBallot from '../../components/MockElections/CreateBallot';

function MockElections(){

    const [selectedClass, setSelectedClass] = useState("Null");
    const [isVisible, setVisibile] = useState(false);
    const [isClassSelected, setIsClassSelected] = useState(false);
    const [classData, setClassData] = useState([]);
    const [elections, setElections] = useState([])

    // TODO: need to make fetch teacher-specific classes
    //       or query elections using the teacher also
    function getClassData() {
        console.log("fetching class data")
        fetch('/api/classes/get_class')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setClassData(data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    useEffect(() => {
        if (classData.length == 0) {
            getClassData()
        }
    }, [])

    function getElections() {
        console.log("fetching elections")
        const api_url = '/api/classes/get_election?classid=' + selectedClass.id
        fetch(api_url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setElections(data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    useEffect(() => {
        getElections()
    }, [selectedClass])

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
    
    const handleSelectChange = (event) => {

        const newValue = JSON.parse(event.target.value);
        setSelectedClass(newValue);

        if (newValue == 'Null') { setIsClassSelected(false); }
        else { 
            setIsClassSelected(true); 
            // uncomment to prevent users from swtiching classes while creating mock ballot
            setVisibile(false);
        }
    };

    const handleBack = () => {
        setVisibile(v => !v);
    }

    return (
        <div className="flex flex-col justify-center items-center h-[91vh] w-[100%] pb-4 bg-slate-400">
            <div className='flex flex-row justify-left items-center h-[10%] w-[80%]'>
                <div className='flex mt-4 w-[60%] md:w-[20%] h-[80%] rounded-xl'>
                    <select className='rounded-xl w-[100%] h-[90%] text-xl text-center' 
                            onChange={handleSelectChange}>
                        <option value='{"id": "Null", "name": "Null", "teacher": "Null"}'>Select Class</option>
                        {classData.map((e, key) => {
                            return <option key={key} value={JSON.stringify(e)}>{e.name}</option>;
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
                                        < IoMdAdd className='AddButtonMock absolute fill-white top-3 md:top-1 right-4 md:right-10' onClick= {() => {setVisibile( v => !v);}}/>
                                        <h1 className='text-3xl text-white'>
                                            Elections
                                        </h1>
                                    </div> 
                                    <div className='flex flex-row h-[90%] w-[100%] justify-center'>
                                        {elections.map((e) => {
                                            return <MockElectionCard title={e.election_title}/>
                                        })}
                                        {console.log(elections)}
                                    </div>
                                </animated.div>
                        )} 
                        { transitionClass((style, item) =>
                            !item && 
                                <animated.div style={style} className='flex relative flex-col h-[100%] w-[100%]'>
                                    <div className='flex md:h-[10%] w-[100%] items-center justify-center'>
                                        <h1 className='md:text-3xl text-white overflow-auto'>
                                            Select a Class to view available Ballots
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