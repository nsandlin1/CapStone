import {React, useState } from 'react';
import { FcCollapse } from "react-icons/fc";
import { ClassCard } from '../components/Classes/ClassCard';

function Classes() {

    const [expandedId, setExpandedId] = useState(null);
    const [classes, setClasses] = useState([
        {
            classId: 'lj6okjsg',
            className: 'Intro to Civics',
            classTime: '9:30 - 10:45',
            teacher: 'Ronald Regan'
        },
        {
            classId: 'lj6ikjsg',
            className: 'AP Civics',
            classTime: '11:00 - 12:15',
            teacher: 'Ronald Regan'
        },
        {
            classId: 'lj4okjsg',
            className: 'Help',
            classTime: '9:30 - 10:45',
            teacher: 'Ronald Regan'
        },
        {
            classId: 'pj6okjsg',
            className: 'AP Civics',
            classTime: '11:00 - 12:15',
            teacher: 'Ronald Regan'
        },
        {
            classId: 'lj6okjsf',
            className: 'Intro to Civics',
            classTime: '9:30 - 10:45',
            teacher: 'Ronald Regan'
        },
        {
            classId: 'lj3okjsg',
            className: 'AP Civics',
            classTime: '11:00 - 12:15',
            teacher: 'Ronald Regan'
        },
        {
            classId: 'lj6ok09sg',
            className: 'Intro to Civics',
            classTime: '9:30 - 10:45',
            teacher: 'Ronald Regan'
        },
        {
            classId: 'lj6othsg',
            className: 'AP Civics',
            classTime: '11:00 - 12:15',
            teacher: 'Ronald Regan'
        },
        {
            classId: 'lj6ok045g',
            className: 'Intro to Civics',
            classTime: '9:30 - 10:45',
            teacher: 'Ronald Regan'
        },
        {
            classId: 'lj6o453isg',
            className: 'AP Civics',
            classTime: '11:00 - 12:15',
            teacher: 'Ronald Regan'
        }
    ])

    const handleToggleCollapse = (id) => {
        setExpandedId((prevId) => (prevId === id ? null : id))
        console.log(id);
    };


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
                        <button className='rounded-xl w-[100%] h-[60%] bg-white shadow-lg' >Add Class</button>
                    </div>
                </div>
                <div className='flex flex-col h-[85%] w-[95%] rounded-xl items-center justify-center py-2 bg-white mb-4 shadow-lg'>
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
                            classes.map((clas) => (
                                // <div className='flex relative justify-center h-[100%] w-[98%] m-1 '>
                                < ClassCard 
                                    key = {clas.classId}
                                    classId = {clas.classId}
                                    className={clas.className} 
                                    classTime={clas.classTime}
                                    teacher={clas.teacher}
                                    isExpanded={expandedId === clas.classId}
                                    toggleCollapse={() => handleToggleCollapse(clas.classId)}
                                />
                                // </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Classes;