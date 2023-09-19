import { FcCollapse } from "react-icons/fc";

export const ClassCard = () => {

    return (
        <div className='flex h-[20%] w-[95%] rounded-xl bg-navy'>
            <div className='flex w-[20%] justify-center items-center'>
                <h1 className='text-3xl text-white whitespace-nowrap'>
                    Intro to Civics
                </h1>
            </div>
            <div className='flex w-[60%] justify-center items-center'>
                <h1 className='text-3xl text-white whitespace-nowrap'>
                    9:30 - 10:45
                </h1>
            </div>
            <div className='flex w-[15%] items-center justify-end'>
                < FcCollapse className='ClassesCollapseIcon' />
            </div>
        </div>
    )
}