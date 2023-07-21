
export const BillCard = ({ onClass, bill }) => {

    const handleClick = () => {
        onClass(bill);
    };

    // truncateString function for bill titles (may cause errors bc I can't see bill titles)
    function truncateString(str) {
        const words = str.split(' ');
      
        if (words.length > 15) {
          const truncatedWords = words.slice(0, 15);
          return truncatedWords.join(' ') + '...';
        }
      
        return str;
      }

    return (
        <div onClick={handleClick} className="flex flex-col cursor-pointer transition hover:scale-95 items-center justify-center text-center rounded-xl h-[30%] w-[98%] text-white bg-lightblue">
            {truncateString(bill.title)}
        </div>
    )
}