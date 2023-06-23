import Widget from "../components/widgets";

function Homepage() {
    return (
        <div className="flex justify-center items-center h-[89vh] bg-slate-400">
            <div className="flex justify-center w-[100%] h-[80vh]">
                <div className="flex flex-col w-[60%] h-[80vh] ">
                    <div className="toptwo flex flex-row p-2 gap-2 w-[100%] h-[55%]">
                        <Widget width='w-[50%]' height="h-[100%]"/>
                        <Widget width='w-[50%]' height="h-[100%]"/>
                    </div>
                    <div className="leftone flex justify-center p-2 h-[45%]">
                        <Widget width='w-[100%]' height='h-[100%]'/>
                    </div>
                </div>
                <div className="rightone w-[30%] h-[80vh] p-2">
                    <Widget width='w-[95%] md:w-[95%]' height='h-[100%]'/>
                </div>
            </div>
        </div>  
    )
}

export default Homepage;