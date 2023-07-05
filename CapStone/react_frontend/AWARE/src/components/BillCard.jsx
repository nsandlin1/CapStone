
export const BillCard = ({ onClass, bill }) => {

    const handleClick = () => {
        onClass(bill);
    };


    return (
        <div onClick={handleClick} className="flex flex-col items-center justify-center text-center rounded-xl h-[25%] w-[98%] bg-slate-300">
            {bill.title}
        </div>
    )
}