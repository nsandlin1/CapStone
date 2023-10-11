import { React, useState, useEffect }from 'react';
import { BiArrowBack } from 'react-icons/bi';

function QuizCard({id, text, isExpanded, handleClick, classes}) {

    const [resp, setResp] = useState([]);

    useEffect(() => {
        if (isExpanded === id){
            for (const clas of classes){
                console.log('class'+clas.classId)
                if (clas.selected)
                    document.getElementById("class" + clas.classId).checked = true;
            }
        }
    }, [isExpanded === id]);

    function handleChange(index) {
        classes[index]['selected'] = !classes[index]['selected']
        console.log(classes[index])
    }

    function handleSave() {
        let returnDict = 
            {
                'quizId': id,
                'classes': classes
            }
        console.log("Saving changes")
        // Send this array to the backend
        console.log(returnDict)

        const user = JSON.parse(localStorage.getItem('user'));
        // Define the API endpoint URL
        const apiUrl = `/api/classes/update_quiz_assignments?data=${JSON.stringify(returnDict)}`;
        // Fetch data from the API
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
            // Update the state with the fetched data
            setClasses(data);
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
        return (0)
    }

    console.log()

    const cardStyle = `${isExpanded === id ? 'w-[90%] h-[50%] ' : 'h-[20%] w-[40%] md:w-[45%] hover:cursor-pointer'} 
                                flex text-md bg-white m-2 md:m-4 shadow-xl rounded-xl items-center justify-center`;

    return (
        <div className={cardStyle} onClick={isExpanded === id ? () => '' : () => handleClick(id)}>
            {isExpanded === id ?
                <div className='flex flex-col h-full w-full rounded-xl justify-center'>
                    <div className='flex flex-row relative w-full h-[15%] pt-2 text-navy justify-center items-center font-bold text-2xl'>
                        < BiArrowBack className='MockButtons absolute left-6 ' onClick={() => handleClick(id)}/>
                        {'Choose Classes to assign ' + text + ' quiz.'}  
                    </div>
                    <div className='grid grid-cols-3 w-full h-[65%] justify-center items-center text-2xl text-navy overflow-auto'>
                        {
                            classes.map((obj, index) => (
                                <div key={index} className='flex flex-row w-[95%] justify-center m-2 '>
                                        <input 
                                            className='hover:cursor-pointer' 
                                            type="checkbox" 
                                            id ={'class'+obj.classId}
                                            onChange={() => handleChange(index)}
                                            >
                                            </input>
                                        <label className='pl-2' htmlFor={obj.classId}>{obj.classTitle}</label>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex flex-row w-full h-[20%] justify-center items-center text-2xl pb-2'>
                        <button className='flex justify-center items-center rounded-xl bg-navy text-white w-[30%] h-[100%]'
                                onClick={() => handleSave()}>
                            Save Changes
                        </button> 
                    </div>
                </div>
            :
                <div className='md:text-2xl font-bold text-navy'>
                    {text}
                </div>
            }
        </div>
    )

}

export default QuizCard;