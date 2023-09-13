import { React, useState }from 'react';
import MockElectionCard from '../components/TeacherElectionCard';
import { AiOutlinePlus } from 'react-icons/ai';

function MockElections(){

    const [selectedClass, setSelectedClass] = useState("Null");

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
            <div className='flex items-center justify-center h-[90%] w-[100%] bg-slate-400'>
                <div className='flex flex-col h-[95%] w-[80%] justify-center items-center pt-4 bg-navy rounded-xl'>
                    <div className='flex relative h-[10%] w-[100%] items-center justify-center'>
                        < AiOutlinePlus size='48' className='absolute text-white top-1 right-10' />
                        <h1 className='text-2xl text-white'>
                            { selectedClass == "Null" ? "Please Select a Class to view available Ballots" : "Elections"}
                        </h1>
                    </div>
                    { selectedClass == 'Null' ? <div className='flex flex-row h-[90%] w-[100%] justify-center'></div> : 
                    <div className='flex flex-row h-[90%] w-[100%] justify-center'>
                        <MockElectionCard />
                        <MockElectionCard />
                    </div>
                    }
                </div>
            </div>
        </div>
    )

}

export default MockElections;