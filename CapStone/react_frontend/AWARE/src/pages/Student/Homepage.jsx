import { useNavigate } from "react-router-dom";

export const Widget = ({ page, pageLink }) =>{
    
    let navigate = useNavigate();
    const navigateTo = (link) => {
        navigate('/' + link);
    }
    return (
        <div 
            className="flex w-[30%] h-[45%] bgnavy rounded-xl justify-center items-center text-white 
                       text-4xl hover:cursor-pointer transition hover:scale-105 hover:shadow-2xl" 
            onClick={() => navigateTo(pageLink)}>
            {page}
        </div>
    )
}

function Homepage() {

    return (
        <div className="flex flex-col justify-center items-center h-[91vh]">
            <div className='flex h-[15%] w-[80%]'>
                <h1 className='text-6xl font-bold text-navy'>Welcome to AWARE</h1>
            </div>
            <div className="flex flex-wrap justify-center items-center w-[80%] h-[65%] overflow-auto gap-6">
                <Widget page={'Bills'} pageLink={'Bills'}/>
                <Widget page={'Quizzes'} pageLink={'Quiz'}/>
                <Widget page={'News'} pageLink={'News'}/>
                <Widget page={'Calendar'} pageLink={'Calendar'}/>
                <Widget page={'Elections'} pageLink={'Elections'}/>
                <Widget page={'Politicians'} pageLink={'Politicians'}/>
            </div>
        </div>  
    )
}

export default Homepage;