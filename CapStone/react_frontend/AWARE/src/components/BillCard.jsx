
export const BillCard = ({ onClass, bill }) => {

    const handleClick = () => {
        onClass(bill);
    };


    return (
        <div onClick={handleClick} className="flex flex-col cursor-pointer transition hover:scale-95 items-center justify-center text-center rounded-xl h-[30%] w-[98%] bg-slate-300">
            {bill.title}
        </div>
    )
}