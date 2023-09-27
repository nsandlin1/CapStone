import { BiArrowBack } from "react-icons/bi"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { yearsToQuarters } from "date-fns/esm";


export const LoginView = ({click, response, setEmail, setPassword, submit, setLoggedIn, login}) => {

    useEffect(() => {
        console.log(3)
        if (Object.keys(response).length === 0) {
            console.log("no response")
        } else {
            if (response.login === false) {
                // display "incorrect email or password"
                console.log("response:", response)
                console.log("incorrect login")
                login(false)
            } else {
                // redirect to wherever
                console.log("response:", response)
                console.log("logged in")
                login(true)
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
                        <input className="rounded-lg pl-4 text-3xl text-navy bg-white  w-[50%] "
                                type='text'
                                name='password'
                                onChange={(p) => setPassword(p.target.value)}
                        />
                    </div>
                    <button className="flex rounded-lg text-lg font-bold bg-white text-navy transition hover:scale-105  w-[10%] h-[15%] justify-center items-center "
                            onClick={submit}>
                        Login
                    </button>
                    
                </form>
            </div>
            <ToastContainer  
                        position="top-center"
                    />
        </div>
    )

}

export const RegisterView = ({click, response, email, setEmail, password, setPassword, submit, setLoggedIn, login, setRole}) => {

    const [roles, setRoles] = useState(["Select Option", "Teacher", "Student"]);
    const role = roles.map(role => role)
    const handleRoleChange = (e) => {
        console.log(("Hello" + roles[e.target.value]))
        setSelectedRole(roles[e.target.value])
        console.log("The selected role is: " + selectedRole)
    };
    const [selectedRole, setSelectedRole] = useState();

    const [passValid, setPassValid] = useState();


    useEffect(() => {
        console.log(3)
        if (Object.keys(response).length === 0) {
            console.log("no response")
        } else {
            if (response.login === false) {
                // display "incorrect email or password"
                console.log("response:", response)
                console.log("failed to register")
            } else {
                // redirect to wherever
                console.log("response:", response)
                console.log("logged in")
            }
        }
    }, [response])

    // const handleRoleChange = (event) => {
    //     const newRole = event.target.value;
    //     console.log("New Role is: "  +  newRole)
    //     setSelectedRole(newRole);
    // };

    function validateForm(e) {
        e.preventDefault();
        if (email.length === 0){
            toast.error('Email is required for registration');
        }
        else if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
        }
        else if (password !== passValid) {
            toast.error('Passwords do not match');
        }
        else if (selectedRole === 'student' && selectedRole.length === 0) {
            toast.error('Class code is invalid.');
        }
        else if (selectedRole === 'null'){
            toast.error('Must select a role.');
        }
        else {
            setRole(selectedRole);
            submit(selectedRole);
        }
    }

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
                        <input className="rounded-lg pl-4 text-3xl text-navy bg-white  w-[50%] "
                                type='text'
                                name='password'
                                onChange={(p) => setPassword(p.target.value)}
                                
                        />
                    </div>
                    <div className='flex flex-row w-full h-[20%] items-center justify-center'>
                        <label className='flex text-3xl w-[20%] whitespace-nowrap justify-end pr-2'>
                            Re-type Password:
                        </label>
                        <input className="rounded-lg pl-4 text-3xl text-navy bg-white  w-[50%] "
                                type='text'
                                name='password'
                                onChange={(p) => setPassValid(p.target.value)}
                                
                        />
                    </div>
                    <div className='flex flex-row w-full h-[20%] items-center justify-center'>
                            <div className='flex flex-row w-[50%] h-[100%] items-center justify-center'>
                                <label className='flex text-4xl w-[20%] justify-end pr-2'>
                                    Role:
                                </label>
                                <select onChange={handleRoleChange}
                                        className="rounded-lg pl-4 text-3xl text-navy bg-white w-[80%] "
                                        type='option'
                                        name='password'
                                >
                                    {
                                        role.map((rol, key) => <option value={key}>{rol}</option>)
                                    }
                                </select>
                            </div>
                        { selectedRole === 'Student' ?
                            <div className='flex flex-row w-[50%] h-[100%] items-center justify-center'>
                                <label className='flex text-4xl whitespace-nowrap w-[45%] justify-end pr-2'>
                                    Class Code:
                                </label>
                                <input className="rounded-lg pl-4 text-3xl text-navy bg-white  w-[50%] "
                                        type='text'
                                        name='code'
                                />
                            </div>
                            :
                            ''
                        }
                    </div>
                    
                    <button className="flex rounded-lg transition hover:scale-105 text-lg font-bold bg-white text-navy w-[20%] h-[15%] justify-center items-center"
                            onClick={validateForm}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export const Button = ({text, click}) => {

    return (
        <div className="flex bg-white border-1 shadow-2xl  hover:cursor-pointer justify-center transition hover:scale-105 
                        items-center text-2xl font-bold rounded-xl h-[30%] w-[45%] md:w-[25%]" 
             onClick={click}>
            {text}
        </div>
    )

}