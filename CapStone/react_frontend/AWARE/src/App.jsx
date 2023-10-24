import React from 'react';
import { useState, useEffect } from 'react';
import { StuNavbar, TeachNavbar } from './components/Navbar.jsx';
import Homepage from './pages/Student/Homepage.jsx';
import Calendar from './pages/Student/Calendar.jsx';
import Politicians from './pages/Student/Politicians.jsx';
import News from './pages/Student/News.jsx';
import Bills from './pages/Student/Bills.jsx';
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ProtectedRoutes, TeacherRoutes, StudentRoutes } from './utils/ProtectedRoutes.jsx';
import Elections from './pages/Student/Elections.jsx';
import Login from './pages/Login/Login.jsx'
import MockElections from './pages/Teacher/MockElections.jsx';
import Classes from './pages/Teacher/Classes.jsx';
import Quizzes from './pages/Teacher/Quizzes.jsx';
import StudentQuiz from './pages/Student/Quiz.jsx';
import { ToastContainer, toast } from 'react-toastify';



function App() {

  const [role, setRole] = useState();

  const [user, setUser] = useState(() => {
    var user_in_storage = JSON.parse(localStorage.getItem('user'))
    console.log('userinstorage', user_in_storage)
    return user_in_storage
  });
  
  const navigate = useNavigate();

  // doit is a boolean, signifying if the user is logged in or not. I know its a bad name
  function logEmIn(the_user) {

    console.log('user', the_user)
    console.log('jsonuser', JSON.stringify(the_user))

    localStorage.setItem('user', JSON.stringify(the_user))
    setUser(the_user)

    console.log('afteruser')

    if (the_user.role === 'Teacher') {
        console.log("nevigating to clesses")
        navigate('/Classes');
    }
    else if (the_user.role === 'Student') {
        navigate('/Home');
    }
    console.log("TempRole: " + the_user.role);
}

  return (
    <React.Fragment>
      {console.log('head', user)}
      {user ?
        user.role == 'Student' ?
          <StuNavbar />
          :
          <TeachNavbar />
        :
        ''
      }
      {/* send user to each route */}
      <Routes>
        <Route element={<ProtectedRoutes login={user ? false : true}/>}>  
          {console.log('pre-teacher', user)}
          <Route element={<TeacherRoutes user={user} />}>
            <Route path="/Mock" element={<MockElections/> } exact/>
            <Route path="/Classes" element={<Classes /> } exact/>
            <Route path="/Quizzes" element={<Quizzes /> } exact/>
          </Route>
          <Route element={<StudentRoutes user={user} />}>
            <Route path="/Home" element={<Homepage />} exact/>
            <Route path="/"  element={<Homepage />} exact/>
            <Route path="/Calendar" element={<Calendar />} exact/>
            <Route path="/Bills" element={<Bills />} exact/>
            <Route path="/Elections" element={<Elections />} exact/>
            <Route path="/Politicians" element={<Politicians />} exact/>
            <Route path="/Map" element={<Map />} exact/>
            <Route path="/News" element={<News />} exact/>
            <Route path="/Quiz" element={<StudentQuiz />} exact/>
          </Route>
        </Route>
        <Route element={<ProtectedRoutes login={user ? false : true}/>}>
          <Route path="/Login" element={<Login setRole={setRole} loginFun={logEmIn}/>} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App
