import { BiArrowBack } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CreateClass = ({back, tEmail}) => {

    var name = "";
    var startTime = "";
    var endTime = ""

    function submit() {
        console.log(name)
        console.log(startTime)
        console.log(endTime)
        if (name == "" || startTime == "" || endTime == "") {
            toast.error("You must fill in all class attributes.")
        } else {
            var api_url = '/api/classes/create_class' +
                        '?name=' + name +
                        '&teacher=' + tEmail +
                        '&start_time=' + startTime +
                        '&end_time=' + endTime
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
                })
                .catch((err) => {
                    console.log(err.message)
                })
            window.location.reload();
            back()
        }
    }

    return (

        <div className='bg-white h-[80%] md:h-[70%] w-[90%] md:w-[60%] absolute rounded-xl items-center justify-center bg-white mb-4 shadow-xl border-navy border-4'>
            <div className='flex h-[20%] w-[100%]'>
            <div className='flex w-[20%] md:w-[30%] justify-start items-center pl-4'>
                    < BiArrowBack className='MockButtons fill-navy top-2 md:top-1 left-4 md:left-10 transition hover:scale-105' onClick={back} />
                </div>
                <div className='flex w-[60%] md:w-[40%] text-lg md:text-xl lg:text-3xl text-navy items-center justify-center'>
                    Create New Class
                </div>
                <div className='flex w-[20%] md:w-[30%] h-[100%] justify-end items-center pr-2 md:pr-6'>
                    <button className='text-base md:text-xl bg-navy text-white rounded-xl w-[100%] h-[60%] md:w-[60%] transition hover:scale-105'
                    onClick={submit}>
                        Create
                    </button>
                </div>
            </div>
            <div className='flex h-[80%] w-[100%] rounded-xl items-center justify-center'>
                <form className='flex flex-col w-[90%] h-[100%] py-10'>
                    <div className='flex w-full h-[20%] w-full items-center justify-center'>
                        < label className='text-base md:text-3xl lg:text-4xl w-[25%] md:w-[40%] text-navy'>Class Name: </label>
                        <input
                            className="rounded-lg justify-center bg-navy text-white text-base md:text-2xl h-[90%] w-[75%] md:w-[60%] ml-4 pl-4 transition hover:scale-105"
                            type='text'
                            name='className'
                            onChange={(t) => {
                                name = t.target.value;
                            }}
                        />
                    </div>
                    <div className='flex flex-row h-[40%] w-full mt-16 items-center justify-between'>
                        <div className='flex flex-col w-[50%] h-full items-center justify-center '>
                            <label className='text-2xl sm:text-4xl text-navy'>Start Time</label>
                            <input
                                className='rounded-xl h-[50%] w-[95%] md:w-[45%] border-black text-navy border-2 pl-2 border-navy transition hover:scale-105'
                                type='time'
                                id='startTime'
                                name='startTime'
                                min='7:00'
                                max='21:00'
                                onChange={(t) => {
                                    startTime = t.target.value;
                                }}
                            />
                        </div>
                        <div className='flex flex-col w-[50%] h-full items-center justify-center'>
                            <label className='text-2xl sm:text-4xl text-navy'>End Time</label>
                            <input 
                                className='rounded-xl h-[50%] w-[95%] md:w-[45%] border-black text-navy border-2 pl-2 border-navy transition hover:scale-105'
                                type='time'
                                id='endTime'
                                name='endTime'
                                min='7:00'
                                max='21:00'
                                onChange={(t) => {
                                    endTime = t.target.value;
                                }}
                            />
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer  
                position="top-center"
            />
        </div>

    )

}