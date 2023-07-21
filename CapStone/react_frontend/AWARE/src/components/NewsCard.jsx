function NewsCard( props ) {
    return (
        <div className="flex flex-col justify-center w-[45%] h-72 border border-black rounded-xl bg-white">
            <div className="flex items-center pl-2 w-[100%] h-[20%] border border-black rounded-xl bg-sky-100">
                <div className="flex items-center w-[60%]">
                    {props.title}
                </div>
                <div className="flex items-center justify-end w-[40%] pr-10">
                    <a href={props.link} target="_blank">{props.source}</a>
                </div>
            </div>
            <div className="flex w-[100%] h-[80%] p-2 rounded-xl overflow-y-auto bg-sky-50">
                {props.text}
            </div>
        </div>
    )
}

export default NewsCard;