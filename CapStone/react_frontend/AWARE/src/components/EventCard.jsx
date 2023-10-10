
export const EventCard = ({ onClass, day, month, year, event, calDate }) => {

    const handleClick = () => {
        onClass(day, month, event);
    };

    if (event != null) {
        const words = event.split(' ');

        if (words[words.length - 1] !== 'Election') {
        // If not, add "Election" to the end of the array
        words.push('Election');
    }

  // Join the words back together into a single string
        const resultString = words.join(' ');

        event = resultString;
    }

    if (year != null && year == calDate.getFullYear()) {

    return (
        <div onClick={handleClick} className="flex flex-col cursor-pointer border transition hover:scale-95 text-3xl p-2 m-2 justify-center text-center rounded-xl h-[20%] w-[100%] text-white bg-slate-400">
            <div> {month + " " + day + ", " + year + ": " + event} </div>
        </div>
    ) }
    else {
        return ("")
    }
}