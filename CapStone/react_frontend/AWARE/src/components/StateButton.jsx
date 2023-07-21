export const StateButton = ({ selected, onClick }) => {
    
    const className = `flex items-center justify-center rounded-xl border border-gray-300 w-[30%] h-[85%] mt-auto lg:w-[9%] lg:h-[75%] md:w-[15%]
                        ${selected ? 'hover:bgdarkerblue bgblue text-white' : 'hover:bg-zinc-500 bg-zinc-300'}`
    
    return (
        <button 
            className={className}
            onClick={onClick}
        >
            State
        </button>
    )
}