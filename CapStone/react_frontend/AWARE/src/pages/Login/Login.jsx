import { useState, useEffect } from 'react';
import { useSpring, useTransition, animated } from '@react-spring/web';
import { Button, LoginView, RegisterView } from '../../components/Login/Welcome';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Login({setLoggedIn}) {

    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState({});

    const navigate = useNavigate();

    function validate(email, password) {
        if (email.length > 0 && password.length > 0) {
            return true
        }
        return false
    }

    function loggedIn() {
        setLoggedIn(true);
        console.log("here");
        navigate('/Classes');
    }

    function submitLogin() {
        event.preventDefault()
        if (validate(email, password)) {
            var api_url = "http://localhost:5000/api/user/login"
            console.log("The url:", api_url)
            const requestOptions = {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({'email': email, 'password': password})
            };
            fetch(api_url, requestOptions)
                .then(res => {
                    console.log("res:", res)
                    return res.json()
                })
                .then(res => {
                    setResponse(res);
                })
                .catch(err => console.log(err))
        } else {
            toast.error('Please input an Email and Password.')
            console.log("login does not meet requirements")
        }
    }

    function submitRegister() {
        event.preventDefault()
        if (validate(email, password)) {
            var api_url = "http://localhost:5000/api/user/sign-up"
            const requestOptions = {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({'email': email, 'password': password})
            };
            fetch(api_url, requestOptions)
                .then(res => res.json())
                .then(res => {
                    setResponse(res);
                })
                .catch(err => console.log(err))
        } else {
            console.log("signup does not meet requirements")
        }
    }

    const welcome = useSpring({
        config: {
            mass: 1,
            tension: 150,
            friction: 40
        },
        from: { y: -150 },
        to: { y: -0 },
      })

    const aware = useSpring({
        config: {
            duration: 1500
        },
        delay: 1000,
        opacity: 1,
        from: {opacity: 0}
    })

    const buttons = useSpring({
        config: {
            duration: 1000
        },
        delay: 2000,
        opacity: 1,
        from: { opacity: 0}
    })

    const loginTransition = useTransition(login, {
        config: {
            duration: 250
        },
        from: {  opacity: 0},
        enter: {  opacity: 1},
        leave: {  opacity: 0}
    })

    const registerTransition = useTransition(register, {
        config: {
            duration: 250
        },
        from: {  opacity: 0},
        enter: {  opacity: 1},
        leave: {  opacity: 0}
    })

    const handleLogin = () => {
        setLogin(!login);
        console.log(login);
    }

    const handleRegister = () => {
        setRegister(!register);
        console.log(register);
    }

    return (
        <div className="DC flex relative flex-col h-[100vh] w-[100vw] bg-slate-400 justify-center items-center">
            <animated.div style={welcome} className='flex flex-col justify-center font-bold items-center font-serif w-full h-[40%] md:h-[60%]'>
                <div className='flex flex-col justify-center items-center space-y-2'>
                    <div className='flex text-4xl md:text-7xl justify-center text-white drop-shadow-xl'>
                        Welcome
                    </div>
                    <div className='flex text-xl md:text-3xl justify-center text-navy drop-shadow-xl'>
                        to
                    </div>
                    <animated.div style={aware} className='text-8xl md:text-9xl text-red2 justify-center drop-shadow-xl'>
                            AWARE
                    </animated.div>
                </div>
                
            </animated.div>
            <animated.div style={buttons} className='flex flex-row justify-center w-full h-[40%] space-x-4 md:space-x-16'>
                    <Button text={'Login'} click={handleLogin}/>
                    <Button text={'Sign Up'} click={handleRegister}/>
            </animated.div>
            <div className='absolute mx-auto'>
                { loginTransition((style, item) => 
                    item &&
                    <animated.div style={style} className='bg-navy rounded-xl shadow-2xl'>
                        <LoginView 
                            click={handleLogin} 
                            response={response} 
                            setEmail={setEmail} 
                            setPassword={setPassword} 
                            submit={submitLogin}
                            setLoggedIn={setLoggedIn}
                        />
                    </animated.div>
                )}
                { registerTransition((style, item) => 
                    item &&
                    <animated.div style={style} className='bg-navy rounded-xl shadow-2xl'>
                        <RegisterView 
                            click={handleRegister} 
                            response={response} 
                            setEmail={setEmail} 
                            setPassword={setPassword} 
                            submit={submitRegister}
                            setLoggedIn={setLoggedIn}
                        />
                    </animated.div>
                )}
            </div>
            <ToastContainer  
                position="top-center"
            />
        </div>
    )

}

export default Login;