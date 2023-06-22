
function widget(props) {

    const size = 'w-1/5';
    const className = `flex items-center justify-center h-screen bg-black ${props.width} ${props.height}`;

    return (
        <div className={className}>
            <h1 className="text-[#FFFFFF]">HELLO</h1>
        </div>
    )
}

export default widget;