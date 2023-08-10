
export const EventCard = ({ onClass, day, month, event }) => {

    const handleClick = () => {
        onClass(day, month, event);
    };

    return (
        <div onClick={handleClick} className="flex flex-col cursor-pointer border transition hover:scale-95 text-3xl p-2 m-2 justify-center text-center rounded-xl h-[20%] w-[100%] text-white bg-slate-400">
            <div> {month + " " + day + ": " + event} </div>
        </div>
    )
}