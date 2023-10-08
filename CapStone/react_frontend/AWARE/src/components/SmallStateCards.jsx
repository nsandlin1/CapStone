
function StateCard ({ abbreviation, state, parentCallback }) {

    const clicker = () => {
        console.log(abbreviation)
        parentCallback(abbreviation);
    };

    return (
        <div className="flex items-center justify-center w-[100%] h-[100%] light-blue rounded-xl" onClick={clicker}>
            <p className="text-navy">{ state }</p>
        </div>
    )
}

export default StateCard;