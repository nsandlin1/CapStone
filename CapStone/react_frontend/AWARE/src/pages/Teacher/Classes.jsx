import {React, useState, useEffect } from 'react';
import { FcCollapse } from "react-icons/fc";
import { ClassCard } from '../../components/Classes/ClassCard';
import { CreateClass } from '../../components/Classes/CreateClass';

function Classes() {

    const [expandedId, setExpandedId] = useState(null);
    const [creating, setCreating] = useState(false);
    const [classesList, setClassesList] = useState([])
    const teacherEmail = JSON.parse(localStorage.getItem('user')).email
    console.log(teacherEmail)

    function getClassesList() {
        console.log("fetching class list")
        var api_url = 'http://localhost:5000/api/classes/get_class?teacher=' + teacherEmail
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
    const creatingOverlay = `${creating ? 'bg-yellow-400' : ''}`;

    return (
        <div className='flex flex-col h-[91vh] w-[100%] bg-slate-400 justify-center items-center'>
            <div className='flex flex-col h-[100%] w-[90%] rounded-xl items-center '>
                <div className='flex flex-row h-[15%] w-[100%] rounded-xl'>
                    <div className='flex justify-start w-[70%] md:w-[80%] items-center'>
                        <h1 className='text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg'>
                            Classes
                        </h1>
                    </div>
                    <div className='flex w-[30%] md:w-[20%] justify-center items-center'>
                       <button className={buttonClass} onClick={() => handleCreateClass()}>
                            Add Class
                        </button>
                    </div>
                </div>
                    <div className='flex flex-col relative h-[85%] w-[100%] rounded-xl items-center justify-center bg-white mb-4 shadow-lg'>
                        <div className='flex flex-row h-[10%] w-[100%] items-center justify-between'>
                            <div className='flex w-[33%] justify-start pl-3'>
                                <h1 className='text-lg md:text-2xl lg:text-4xl text-navy font-bold whitespace-nowrap '>
                                    Class Title
                                </h1> 
                            </div>
                            <div className='flex w-[34%] justify-center pl-4 items-center'>
                                <h1 className='text-lg md:text-2xl lg:text-4xl text-navy font-bold whitespace-nowrap '>
                                    Class Time
                                </h1> 
                            </div>
                            <div className='flex w-[33%]'>

                            </div>
                        </div>
                        <div className='flex flex-wrap w-[100%] h-[90%] justify-center  overflow-auto'>
                            {
                                classesList.map((clas) => (
                                    // <div className='flex relative justify-center h-[100%] w-[98%] m-1 '>
                                    < ClassCard 
                                        key = {clas.id}
                                        classId = {clas.id}
                                        className={clas.name} 
                                        startTime={clas.start_time}
                                        endTime={clas.end_time}
                                        teacher={clas.teacher}
                                        creating={creating}
                                        isExpanded={expandedId === clas.id}
                                        toggleCollapse={() => handleToggleCollapse(clas.id)}
                                    />
                                    // </div>
                                ))
                            }
                        </div>
                    { creating ? < CreateClass back={() => setCreating(v => !v)} tEmail={teacherEmail}/> : ''}
                </div>
            </div>
        </div>
    )

}

export default Classes;