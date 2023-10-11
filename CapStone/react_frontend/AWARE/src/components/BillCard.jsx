
export const BillCard = ({ onClass, bill, len }) => {

    const handleClick = () => {
        onClass(bill, len);
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
        <div onClick={handleClick} className="flex flex-col cursor-pointer transition hover:scale-95 
        items-center justify-center text-xs md:text-lg text-center rounded-xl h-[100%] md:h-[30%] w-[50%] md:w-[98%] text-white bg-lightblue">
            {truncateString(bill.title)}
        </div>
    )
}