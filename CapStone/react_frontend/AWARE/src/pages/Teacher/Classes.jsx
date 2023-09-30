import {React, useState, useEffect } from 'react';
import { FcCollapse } from "react-icons/fc";
import { ClassCard } from '../../components/Classes/ClassCard';
import { CreateClass } from '../../components/Classes/CreateClass';

function Classes() {

    const [expandedId, setExpandedId] = useState(null);
    const [creating, setCreating] = useState(false);
    const [classesList, setClassesList] = useState([])

    function getClassesList() {
        console.log("fetching class list")
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
                setClassesList(data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    useEffect(() => {
        if (classesList.length == 0) {
            getClassesList();
        }
    }, [])

    const handleToggleCollapse = (id) => {
        if (!creating) {
        setExpandedId((prevId) => (prevId === id ? null : id))
        console.log(id);
        }
    };

    const handleCreateClass = () => {
        if (!creating) { setCreating(v => !v) }
    }
    

    const buttonClass = `${creating ? '' : 'hover:scale-105'} rounded-xl transition bg-white w-[100%] h-[60%] shadow-lg`

    return (
        <div className='flex flex-col h-[91vh] w-[100%] bg-slate-400 justify-center items-center'>
            <div className='flex flex-col h-[100%] w-[90%] rounded-xl items-center '>
                <div className='flex flex-row h-[15%] w-[95%]'>
                    <div className='flex justify-center w-[15%]  items-center'>
                        <h1 className='text-5xl text-white drop-shadow-lg'>
                            Classes
                        </h1>
                    </div>
                    <div className='w-[75%]'>
                    </div>
                    <div className='flex w-[10%] justify-center items-center'>
                       <button className={buttonClass} onClick={() => handleCreateClass()}>
                            Add Class
                        </button>
                    </div>
                </div>
                    <div className='flex flex-col relative h-[85%] w-[95%] rounded-xl items-center justify-center bg-white mb-4 shadow-lg'>
                        <div className='flex flex-row h-[10%] w-[95%] items-center'>
                            <div className='flex w-[20%] justify-center'>
                                <h1 className='text-3xl text-navy font-bold whitespace-nowrap '>
                                    Class Title
                                </h1> 
                            </div>
                            <div className='flex w-[60%] justify-center items-center'>
                                <h1 className='text-3xl text-navy font-bold whitespace-nowrap '>
                                    Class Time
                                </h1> 
                            </div>
                        </div>
                        <div className='flex flex-wrap w-[100%] h-[90%] justify-center items-center overflow-auto'>
                            {
                                classesList.map((clas) => (
                                    // <div className='flex relative justify-center h-[100%] w-[98%] m-1 '>
                                    < ClassCard 
                                        key = {clas.id}
                                        classId = {clas.id}
                                        className={clas.name} 
                                        // classTime={clas.classTime}
                                        teacher={clas.teacher}
                                        creating={creating}
                                        isExpanded={expandedId === clas.id}
                                        toggleCollapse={() => handleToggleCollapse(clas.id)}
                                    />
                                    // </div>
                                ))
                            }
                        </div>
                    { creating ? < CreateClass back={() => setCreating(v => !v)}/> : '' }
                </div>
            </div>
        </div>
    )

}

export default Classes;