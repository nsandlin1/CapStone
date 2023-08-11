
export const StateMajLegend = () => {
    return (
        <div className="legend flex flex-col absolute top-10 left-10 bg-zinc-50 w-[150px] h-[100px] shadow-lg z-1 rounded-xl border-2 border-black">
            <div className="flex items-center justify-center h-[35%] w-[100%] underline">
                Legend
            </div>
            <div className="flex flex-row items-center justify-center h-[45%]">
                <div className="flex flex-col pl-5 justify-right gap-2 w-[30%]">
                    <div className="flex bg-[#4149e6] min-h-[15px] min-w-[15px] h-[100%] w-[50%] rounded-xl">
                    </div>
                    <div className="flex bg-[#E64141] min-h-[15px] min-w-[15px] h-[100%] w-[50%] rounded-xl">
                    </div>
                </div>
                <div className="flex flex-col w-[70%]">
                    Democratic
                    Republican
                </div>
            </div>
        </div>
    )
};

export const StateElectionsLegens = () => {
    return (
        <div className="legend flex flex-col absolute top-10 left-10 bg-zinc-50 w-[150px] h-[100px] shadow-lg z-1 rounded-xl border-2 border-black">
            <div className="flex items-center justify-center h-[35%] w-[100%] underline">
                Legend
            </div>
        </div>
    )
};