
export const MultipleChoic = () => {

}

export const TF = () => {

}

export const Question = () => {

    return (
        <div className='flex flex-col bg-white w-full h-[100%] p-4 space-y-2 rounded-xl'>
            <div className='flex flex-row w-full text-navy '>
                <div className="flex w-[25%] font-bold">
                    <label className="text-2xl w-full"> Question: </label>
                </div>
                <div className='flex w-[65%] justify-start'>
                    <input className="text-2xl rounded-md pl-2 bg-white w-full border-2 border-navy">
                    </input>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="flex whitespace-nowrap w-[25%]">
                    <label className="text-xl text-navy pr-2 w-full]">
                        Question Type:
                    </label>
                </div>
                <div className='flex w-[75%] justify-start'>
                    <select
                        className='rounded-md bg-white border-2 border-navy'
                        type='option'
                    >
                        <option>Pick One</option>
                        <option>Multiple Choice</option>
                        <option>True/False</option>
                    </select>
                </div>
            </div>
        </div>
    )

}

export const AddQButton = ({onClick}) => {

    return (
        <button onClick={onClick} className='flex h-[100%] w-[50%] md:w-[30%] text-lg bg-white md:m-4 shadow-xl rounded-xl items-center justify-center'>
            Add Question
        </button>
    )

}

