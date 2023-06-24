
export const Wrapper = (props) => {
    const className = `flex flex-col items-center ${props.color} rounded-xl overflow-auto ${props.width} ${props.height}`;
    return (
        <div className={className}>
            {props.children}
        </div>
    );
}
