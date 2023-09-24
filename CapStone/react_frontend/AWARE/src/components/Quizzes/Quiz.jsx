

export const Question = () => {

    return (
        <div className='flex flex-col bg-yellow-400 w-full h-[100%] p-4 rounded-xl'>
            <div className='flex flex-row'>
                <label className="text-2xl w-[20%]"> Question: </label>
                <input className="text-2xl rounded-xl w-[70%]">
                </input>
            </div>
            <div>
                <label className="text-xl pr-2 w-[20%]">
                    Question Type:
                </label>
                <select
                    className='rounded-md w-[70%]'
                    type='option'
                >
                    <option>Pick One</option>
                    <option>Multiple Choice</option>
                    <option>True/False</option>
                </select>
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