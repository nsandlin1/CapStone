import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export const StatePoliticians = ({ state, setState, states }) => {

    const goBack = () => {
        setState(null);
    }
    console.log(states[state])

    return (
        <div className="flex flex-col h-[76vh] w-[100%] rounded-xl">
            <div className="flex flex-row items-center gap-2 h-[10%] w-[100%] rounded-xl">
                <div className="w-[20%]">
                    <IoIosArrowRoundBack className="text-white" onClick={goBack} size={70}/>
                </div>
                <div className="w-[60%] flex justify-center text-center">
                    <h1 className="text-3xl font-bold text-white md:text-5xl">{states[state]}</h1>
                </div>
                <div className="w-[20%]">

                </div>
            </div>
            <div className="flex h-[90%] bg-zinc-400 rounded-xl">
                
            </div>
        </div>
    );
}

