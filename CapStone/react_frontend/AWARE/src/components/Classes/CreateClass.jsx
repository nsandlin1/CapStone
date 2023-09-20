import { BiArrowBack } from 'react-icons/bi';

export const CreateClass = ({back}) => {

    return (

        <div className='bg-white h-[100%] w-[95%] rounded-xl items-center justify-center bg-white mb-4 shadow-lg'>
            <div className='flex h-[15%] w-[100%]'>
            <div className='flex w-[20%] md:w-[30%] justify-start items-center pl-4'>
                    < BiArrowBack className='MockButtons fill-navy top-2 md:top-1 left-4 md:left-10' onClick={back} />
                </div>
                <div className='flex w-[60%] md:w-[40%] text-lg md:text-3xl text-navy items-center justify-center'>
                    Create New Class
                </div>
                <div className='flex w-[20%] md:w-[30%] h-[100%] justify-end items-center pr-2 md:pr-10'>
                    <button className='text-xl bg-navy text-white rounded-xl w-[90%] h-[60%] md:w-[30%]'>
                        Create
                    </button>
                </div>
            </div>
            <div className='flex h-[85%] w-[100%] rounded-xl'>
                <form className='flex'>

                </form>
            </div>
        </div>

    )

}