import { React, useState }from 'react';

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
                    <select className='rounded-xl w-[100%] text-xl text-center' 
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
                <div className='flex h-[95%] w-[80%] justify-center pt-4 bg-navy rounded-xl'>
                    <h1 className='text-2xl text-white'>
                        { selectedClass == "Null" ? "Please Select a Class to view available Ballots" : "Ballots"}
                    </h1>
                </div>
            </div>
        </div>
    )

}

export default MockElections;