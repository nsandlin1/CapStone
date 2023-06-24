import { Wrapper} from "../components/widgets";

function Homepage() {
    return (
        <div className="flex justify-center items-center h-[89vh] bg-slate-400">
            <div className="flex justify-center w-[90%] h-[calc(100vh - var(--navbar-height))]">
                <div className="left flex flex-col w-[50%] md:w-[70%] h-[80vh] ">
                    <div className="toptwo flex flex-col md:flex-row p-2 gap-2 w-[100%] h-[55%]">
                        <Wrapper width='w-[100%] md:w-[50%]' height="h-[100%]" color='bg-black'/>
                        <Wrapper width='w-[100%] md:w-[50%]' height="h-[100%]" color='bg-black'/>
                    </div>
                    <div className="leftone flex justify-center p-2 h-[45%]">
                        <Wrapper width='w-[100%]' height='h-[100%]' color='bg-black'/>
                    </div>
                </div>
                <div className="right w-[50%] md:w-[30%] h-[80vh] p-2">
                    <Wrapper width='w-[95%] md:w-[95%]' height='h-[100%]' color='bg-black'/>
                </div>
            </div>
        </div>  
    )
}

export default Homepage;