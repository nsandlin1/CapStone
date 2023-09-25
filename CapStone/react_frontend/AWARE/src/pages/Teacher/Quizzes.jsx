import { React, useState }from 'react';
import QuizCard from '../../components/Quizzes/QuizCard';
import { IoMdAdd } from 'react-icons/io';
import { useTransition, animated } from '@react-spring/web';
import CreateQuiz from '../../components/Quizzes/CreateQuiz';

function Quizzes() {

    const [isVisible, setVisibile] = useState(false);

    const transitionElection = useTransition(!isVisible, {
        from: {  opacity: 0},
        enter: {  opacity: 1},
        leave: {  opacity: 0}
    })
    
    const handleBack = () => {
        setVisibile(v => !v);
    }

    return (
        <div className="flex flex-col justify-center items-center h-[91vh] w-[100%] pb-4 bg-slate-400">
            <div className='flex items-center justify-center h-[90%] w-[100%] bg-slate-400'>
                <div className='flex relative flex-col h-[95%] w-[80%] shadow-2xl justify-center items-center pt-4 bg-navy rounded-xl'>
                    { transitionElection((style, item) =>
                        item &&
                            <animated.div style={style} className='absolute flex flex-col h-[100%] w-[100%]'>
                                <div className='flex relative h-[10%] w-[100%] items-center justify-center'>
                                    < IoMdAdd className='AddButtonMock absolute fill-white top-3 md:top-1 right-4 md:right-10' onClick= {() => {setVisibile( v => !v);}}/>
                                    <h1 className='text-3xl text-white'>
                                        Quizzes
                                    </h1>
                                </div> 
                                <div className='flex flex-row h-[90%] w-[100%] justify-center'>
                                    <QuizCard text='Quiz 1' />
                                    <QuizCard text='Quiz 2' />
                                </div>
                            </animated.div>
                    )}
                    { transitionElection((style, item) =>
                        !item &&
                    <animated.div style={style} className='flex relative h-[100%] w-[100%] bg-navy rounded-xl'>
                        < CreateQuiz back={handleBack}/>
                    </animated.div> )}
                </div>
            </div>
        </div>
    )
}

export default Quizzes;