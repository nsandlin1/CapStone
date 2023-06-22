import Widget from "../components/widgets";

function Homepage() {
    return (
        <div className="flex justify-center items-center h-[89vh] bg-slate-400">
            <div className="flex justify-center w-[80%] h-[80vh] bg-orange-500">
                <div className="flex flex-col p-2 gap-2 w-[60%]">
                    <Widget width='w[100%] h-[40%]' />
                    <Widget width='w[100%] h-[40%]' />
                </div>
                <div className="w-[40%] p-2">
                    <Widget width='w-[95%] md:w-[95%]' height='h-[100%]'/>
                </div>
            </div>
        </div>  
    )
}

export default Homepage;