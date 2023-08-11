export const FederalButton = ({ selected, onClick }) => {
    
    const className = `flex items-center shadow-md justify-center border border-gray-300 rounded-xl w-[30%] h-[85%] mt-auto lg:w-[9%] lg:h-[75%] md:w-[15%]
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