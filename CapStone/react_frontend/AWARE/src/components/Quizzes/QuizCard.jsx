import { React, useState, useEffect }from 'react';
import { BiArrowBack } from 'react-icons/bi';

function QuizCard({id, text, isExpanded, handleClick}) {

    const [classes, setClasses] = useState([
        {
            'classId': 1,
            'class': 'AP Civics',
            'checked': true,
        },
        {
            'classId': 2,
            'class': 'Spanish',
            'checked': false,
        },
        {
            'classId': 1,
            'class': 'AP Civics',
            'checked': true,
        },
        {
            'classId': 2,
            'class': 'Spanish',
            'checked': false,
        },
        {
            'classId': 1,
            'class': 'AP Civics',
            'checked': true,
        },
        {
            'classId': 2,
            'class': 'Spanish',
            'checked': false,
        },
        {
            'classId': 1,
            'class': 'AP Civics',
            'checked': true,
        },
        {
            'classId': 2,
            'class': 'Spanish',
            'checked': false,
        }
    ]);

    useEffect(() => {
        
        if (isExpanded === id){
            for (const clas of classes){
                console.log('class'+clas.classId)
                if (clas.checked)
                    document.getElementById("class" + clas.classId).checked = true;
            }
        }
    }, [isExpanded === id]);



    const cardStyle = `${isExpanded === id ? 'w-[90%] h-[50%]' : 'h-[20%] w-[50%] md:w-[45%]'} 
                                flex text-md bg-white m-2 md:m-4 shadow-xl rounded-xl items-center justify-center`;

    return (
        <div className={cardStyle} onClick={isExpanded === id ? '' : () => handleClick(id)}>
            {isExpanded === id ?
                <div className='flex flex-col h-full w-full rounded-xl justify-center'>
                    <div className='flex flex-row relative w-full h-[15%] pt-2 justify-center items-center font-bold text-2xl'>
                        < BiArrowBack className='MockButtons absolute left-6 ' onClick={() => handleClick(id)}/>
                        {'Choose Classes to assign ' + text + ' quiz.'}  
                    </div>
                    <div className='grid grid-cols-3 w-full h-[65%] justify-center items-center text-2xl overflow-auto'>
                        {
                            classes.map((obj, index) => (
                                <div className='flex flex-row w-[95%] justify-center m-2 '>
                                        <input className='hover:cursor-pointer' type="checkbox" id={'class' + obj.classId}></input>
                                        <label className='pl-2' for={obj.classId}>{obj.class}</label>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex flex-row w-full h-[20%] justify-center items-center text-2xl pb-2'>
                        <button className='flex justify-center items-center rounded-xl bg-navy text-white w-[30%] h-[100%]'>
                            Save Changes
                        </button> 
                    </div>
                </div>
            :
                <div className='text-2xl font-bold'>
                    {text}
                </div>
            }
        </div>
    )

}

export default QuizCard;