function NewsCard( props ) {
    return (
        <div className="flex flex-col justify-center w-[45%] h-72 rounded-xl bg-white">
            <div className="flex items-center pl-2 w-[100%] h-[20%] rounded-xl bg-yellow-300">
                Hello
            </div>
            <div className="flex w-[100%] h-[80%] p-2 rounded-xl overflow-y-auto bg-purple-400">
                {props.text}
            </div>
        </div>
    )
}

export default NewsCard;