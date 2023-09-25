import { useState } from 'react';
import { useSpring, useTransition, animated } from '@react-spring/web';
import { Button, LoginView } from '../../components/Login/Buttons';

function Login() {

    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);

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

    const handleLogin = () => {
        setLogin(!login);
        console.log(login);
    }

    return (
        <div className="flex relative flex-col h-[100vh] w-[100vw] bg-slate-400  font-bold font-serif justify-center items-center">
            <animated.div style={welcome} className='flex flex-col justify-center items-center w-full h-[40%] md:h-[60%]'>
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
                    <Button text={'Sign Up'}/>
            </animated.div>
            <div className='absolute mx-auto'>
            { loginTransition((style, item) => 
                item &&
                <animated.div style={style} className='bg-navy border-2 border-white rounded-xl shadow-2xl'>
                    <LoginView click={handleLogin}/>
                </animated.div>
            )}
            </div>
        </div>
    )

}

export default Login;