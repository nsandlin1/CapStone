export const StateButton = ({ selected, onClick }) => {
    
    const className = `flex items-center shadow-md justify-center rounded-xl w-[30%] h-[85%] mt-auto lg:w-[9%] lg:h-[100%] md:w-[15%]
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

export const FederalButton = ({ selected, onClick }) => {
    
    const className = `flex items-center shadow-md justify-center rounded-xl w-[30%] h-[85%] mt-auto lg:w-[9%] lg:h-[100%] md:w-[15%]
                        ${selected ? 'hover:bgdarkerblue bgblue text-white' : 'hover:bg-zinc-500 bg-zinc-300'}`
    
    return (
        <button 
            className={className}
            onClick={onClick}
        >
            Federal
        </button>
    )
}