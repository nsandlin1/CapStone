
function Widget(props) {

    const className = `flex flex-col items-center bg-black rounded-xl overflow-auto ${props.width} ${props.height}`;

    return (
        <div className={className}>
        </div>
    )
}

export default Widget;