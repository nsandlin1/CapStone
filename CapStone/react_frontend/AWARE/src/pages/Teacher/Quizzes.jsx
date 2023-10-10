import { React, useState, useEffect }from 'react';
import QuizCard from '../../components/Quizzes/QuizCard';
import { IoMdAdd } from 'react-icons/io';
import { useTransition, animated } from '@react-spring/web';
import CreateQuiz from '../../components/Quizzes/CreateQuiz';

function Quizzes() {

    const [isVisible, setVisibile] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const [expandedQuiz, setExpandedQuiz] = useState();
    const [expanded, setExpanded] = useState(false);
    const [classes, setClasses] = useState([]);

    function getQuizzes() {
        console.log("fetching quizzes")
        var api_url = "api/classes/get_quiz"
        fetch(api_url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }
                return response.json()
            })
            .then((data) => {
                setQuizzes(data)
                
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    function getClasses() {
        const user = JSON.parse(localStorage.getItem('user'));
        // Define the API endpoint URL
        const apiUrl = `/api/classes/get_assigned_quizzes?email=${user['email']}`;
        // Fetch data from the API
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
            // Update the state with the fetched data
            setClasses(data);
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        if (quizzes.length == 0) {
            getQuizzes();
            getClasses();
        }
    }, [])
    
    console.log('classes');
    console.log(classes);
    console.log(quizzes);
    
    const transitionElection = useTransition(!isVisible, {
        from: {  opacity: 0},
        enter: {  opacity: 1},
        leave: {  opacity: 0}
    })
    
    const handleBack = () => {
        setVisibile(v => !v);
    }

    const handleToggleCollapse = (id) => {
        setExpandedQuiz((prevId) => (prevId === id ? null : id))
        console.log(id);
    };

    console.log(expanded)

    return (
        <div className="flex flex-col justify-center items-center h-[91vh] w-[100%] pb-4 bg-slate-400">
            <div className='flex items-center justify-center h-[90%] w-[100%] bg-slate-400'>
                <div className='flex relative flex-col h-[95%] w-[80%] shadow-2xl justify-center items-center pt-4 bg-navy rounded-xl'>
                    { transitionElection((style, item) =>
                        item &&
                            <animated.div style={style} className='absolute flex flex-col justify-start h-[100%] w-[100%]'>
                                <div className='flex relative h-[10%] w-[100%] items-center justify-center'>
                                    < IoMdAdd className='AddButtonMock absolute fill-white top-3 md:top-1 right-4 md:right-10' onClick= {() => {setVisibile( v => !v);}}/>
                                    <h1 className='text-3xl text-white'>
                                        Quizzes
                                    </h1>
                                </div> 
                                <div className='flex  flex-wrap flex-start content-start h-[85%] w-[100%] justify-center items-start overflow-auto'>
                                        {classes.map((quiz, index) => {
                                            return <QuizCard 
                                                        id={quiz.quizId} 
                                                        text={quiz.title} 
                                                        isExpanded={expandedQuiz} 
                                                        handleClick={handleToggleCollapse}
                                                        classes={quiz.listOfClasses}
                                            />
                                        })}
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