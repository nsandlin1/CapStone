export const StateButton = ({ selected, onClick }) => {
    
    const className = `flex items-center justify-center rounded-xl w-[30%] h-[70%] mt-auto lg:w-[9%] md:w-[15%]
                        ${selected ? 'hover:bg-zinc-900 bg-zinc-800 text-white' : 'hover:bg-zinc-500 bg-zinc-300'}`
    
    return (
        <button 
            className={className}
            onClick={onClick}
        >
            State
        </button>
    )
}