import { Wrapper} from "../components/widgets";
import { BsCircle } from 'react-icons/Bs';

function Bills() {
    return (
        <div className="flex flex-col items-center h-[89vh] py-4 gap-2">
            <div className="flex items-start p-2 w-[90%] h-[10%] rounded-xl bg-green-200">
                <div className="flex flex-row gap-3 mt-auto mb-2">
                    <div className="flex rounded-xl w[10%] bg-slate-600">
                        Federal
                        <BsCircle className="fill-green-400"/>
                    </div>
                    <div className="flex  rounded-xl w[10%] bg-slate-600">
                        Federal
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 w-[90%] h-[90%] rounded-xl">
                <div className="flex flex-col p-2 w-[30%] h-[100%] rounded-xl bg-orange-950">
                </div>
                <div className="flex p-2 w-[70%] h-[100%] rounded-xl bg-green-600">

                </div>
            </div>
        </div>  
    )
}

export default Bills;