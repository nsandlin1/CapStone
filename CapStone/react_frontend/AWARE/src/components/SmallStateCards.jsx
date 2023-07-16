
function StateCard ({ state }) {
    return (
        <div className="flex items-center justify-center w-[100%] h-[100%] light-blue rounded-xl">
            <p className="text-white">{ state }</p>
        </div>
    )
}

export default StateCard;