import { BiArrowBack } from "react-icons/bi"


export const LoginView = ({click}) => {

    return (
        <div className="flex relative w-[60vw] h-[50vh] justify-center items-center text-white" onClick={click}>
            < BiArrowBack className='MockButtons absolute fill-white top-2 md:top-6 left-4 md:left-10' />
            Hello
        </div>
    )

}

export const RegisterView = () => {

}

export const Button = ({text, click}) => {

    return (
        <div className="flex bg-white border-1 shadow-2xl border-navy justify-center transition hover:scale-105 
                        items-center rounded-xl h-[30%] w-[45%] md:w-[25%]" 
             onClick={click}>
            {text}
        </div>
    )

}