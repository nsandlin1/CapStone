import { BiArrowBack } from 'react-icons/bi';

function CreateBallot({back}) {
    return (
        <div className="w-[100%] h-[100%] bg-navy"> 
            < BiArrowBack size='48' className='absolute fill-white top-1 left-10' onClick={back}/>
        </div>
    )
}

export default CreateBallot;