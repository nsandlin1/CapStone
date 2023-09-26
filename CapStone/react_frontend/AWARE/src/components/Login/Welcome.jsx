import { BiArrowBack } from "react-icons/bi"
import { useState, useEffect } from 'react';


export const LoginView = ({click, response, setEmail, setPassword, submit}) => {

    useEffect(() => {
        console.log(3)
        if (Object.keys(response).length === 0) {
            console.log("no response")
        } else {
            if (response.login === false) {
                // display "incorrect email or password"
                console.log("response:", response)
                console.log("incorrect login")
            } else {
                // redirect to wherever
                console.log("response:", response)
                console.log("logged in")
            }
        }
    }, [response])

    return (
        <div className="WhiteHouse flex flex-col relative w-[60vw] h-[50vh] justify-center items-center text-white" >
            <div className="flex flex-row relative w-[100%] h-[10%] items-center">
                < BiArrowBack className='MockButtons absolute fill-white top-2 md:top-8 left-4 md:left-10' onClick={click} />
            </div>
            <div className="flex w-full h-[85%] items-center justify-center">
                <form className="flex flex-col w-full h-full items-center justify-center space-y-6">
                    <div className='flex flex-row w-full h-[20%] items-center justify-center'>
                        <label className="flex text-4xl w-[20%] justify-end pr-2">
                            Email:
                        </label>
                        <input className="text-3xl pl-4 text-navy rounded-lg w-[50%]"
                                type='text'
                                name='email'
                                onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-row w-full h-[20%] items-center justify-center'>
                        <label className='flex text-4xl w-[20%] justify-end pr-2'>
                            Password:
                        </label>
                        <input className="rounded-lg pl-4 text-3xl text-navy bg-white border-2 w-[50%] border-navy"
                                type='text'
                                name='password'
                                onChange={(p) => setPassword(p.target.value)}
                        />
                    </div>
                    <button className="flex rounded-lg text-lg font-bold bg-white text-navy w-[10%] h-[15%] justify-center items-center "
                            onClick={submit}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )

}

export const RegisterView = ({click, response, setEmail, setPassword, submit}) => {

    const [role, setRole] = useState('null');

    useEffect(() => {
        console.log(3)
        if (Object.keys(response).length === 0) {
            console.log("no response")
        } else {
            if (response.login === false) {
                // display "incorrect email or password"
                console.log("response:", response)
                console.log("incorrect login")
            } else {
                // redirect to wherever
                console.log("response:", response)
                console.log("logged in")
            }
        }
    }, [response])

    const handleRoleChange = (event) => {
        const newRole = event.target.value;
        setRole(newRole);
        console.log(role);
    };

    return (
        <div className="CapHill flex flex-col relative w-[60vw] h-[50vh] justify-center items-center text-white" >
            <div className="flex flex-row relative w-[100%] h-[10%] items-center">
                < BiArrowBack className='MockButtons absolute fill-white top-2 md:top-8 left-4 md:left-10' onClick={click} />
            </div>
            <div className="flex w-full h-full text-white items-center justify-center">
                <form className="flex flex-col w-full h-full items-center justify-center">
                    <div className='flex flex-row w-full h-[20%] items-center justify-center'>
                        <label className="flex text-4xl w-[20%] justify-end pr-2">
                            Email:
                        </label>
                        <input className="text-3xl pl-4 text-navy rounded-lg w-[50%]"
                                type='text'
                                name='email'
                                onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-row w-full h-[20%] items-center justify-center'>
                        <label className='flex text-4xl w-[20%] justify-end pr-2'>
                            Password:
                        </label>
                        <input className="rounded-lg pl-4 text-3xl text-navy bg-white border-2 w-[50%] border-navy"
                                type='text'
                                name='password'
                                onChange={(p) => setPassword(p.target.value)}
                                
                        />
                    </div>
                    <div className='flex flex-row w-full h-[20%] items-center justify-center'>
                        <label className='flex text-4xl w-[20%] justify-end pr-2'>
                            Role:
                        </label>
                        <select onChange={handleRoleChange}
                                className="rounded-lg pl-4 text-3xl text-navy bg-white border-2 w-[50%] border-navy"
                                type='option'
                                name='password'
                        >
                            <option valeu='null'>Select one</option>
                            <option value='teacher'>Teacher</option>
                            <option value='student'>Student</option>
                        </select>
                    </div>
                    { role == 'student' ?
                        <div className='flex flex-row w-full h-[20%] items-center justify-center'>
                        <label className='flex text-4xl whitespace-nowrap w-[20%] justify-end pr-2'>
                            Class Code:
                        </label>
                        <input className="rounded-lg pl-4 text-3xl text-navy bg-white border-2 w-[50%] border-navy"
                                type='text'
                                name='code'
                        />
                    </div>
                        :
                        ''
                    }
                    <button className="flex rounded-lg text-lg font-bold bg-white text-navy w-[20%] h-[15%] justify-center items-center"
                            onClick={submit}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export const Button = ({text, click}) => {

    return (
        <div className="flex bg-white border-1 shadow-2xl border-navy hover:cursor-pointer justify-center transition hover:scale-105 
                        items-center text-2xl font-bold rounded-xl h-[30%] w-[45%] md:w-[25%]" 
             onClick={click}>
            {text}
        </div>
    )

}