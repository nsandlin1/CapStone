import { Link } from 'react-router-dom';

function StatePolitician( props ) {
    return (
        <div className="flex flex-row items-center p-2 h-42 w-[98%] rounded-xl text-white bg-lightblue">
            <div className="flex items-center h-20 p-2 text-3xl w-[30%]">
                {props.name}
            </div>
            <div className="w-[50%]">

            </div>
            <div className="flex items-center w-[20%] text-2xl justify-end pr-6">
                <a href={props.website} target="_blank">Learn More</a>
            </div>
        </div>
    )
}

export default StatePolitician;