
function StatePolitician( props ) {
    return (
        <div className="flex flex-row items-center p-2 h-42 w-[98%] rounded-xl text-white bg-lightblue">
            <div className="flex items-center h-20 p-2 text-3xl">
                {props.name}
            </div>
        </div>
    )
}

export default StatePolitician;