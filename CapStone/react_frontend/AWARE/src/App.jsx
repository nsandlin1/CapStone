import React from 'react';
import { useState, useEffect } from 'react';
import { StuNavbar, TeachNavbar } from './components/Navbar.jsx';
import Homepage from './pages/Homepage.jsx';
import Calendar from './pages/Student/Calendar.jsx';
import Politicians from './pages/Student/Politicians.jsx';
import News from './pages/News.jsx';
import Bills from './pages/Student/Bills.jsx';
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ProtectedRoutes, TeacherRoutes, StudentRoutes } from './utils/ProtectedRoutes.jsx';
import Elections from './pages/Student/Elections.jsx';
import Login from './pages/Login/Login.jsx'
import Profile from './pages/Profile.jsx'
import MockElections from './pages/Teacher/MockElections.jsx';
import Classes from './pages/Teacher/Classes.jsx';
import Quizzes from './pages/Teacher/Quizzes.jsx';
import { ToastContainer, toast } from 'react-toastify';



function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState();
  
  const navigate = useNavigate();

  // doit is a boolean, signifying if the user is logged in or not. I know its a bad name
  function logEmIn(role) {
    setLoggedIn(true);
    setRole(role)
    console.log("The role in app.jsx is:" + role);
    console.log("role:", role)
    if (role === 'Teacher') {
        console.log("nevigating to clesses")
        navigate('/Classes');
    }
    else if (role === 'Student') {
        navigate('/Home');
    }
    console.log("TempRole: " + role);
}

  return (
    <React.Fragment>
      {loggedIn ?
        role == 'Student' ?
          <StuNavbar />
          :
          <TeachNavbar />
        :
        ''
      }
      <Routes>
        <Route element={<ProtectedRoutes login={loggedIn}/>}>  
          <Route element={<TeacherRoutes role={role} />}>
            <Route path="/Mock" element={<MockElections/> } exact/>
            <Route path="/Classes" element={<Classes /> } exact/>
            <Route path="/Quizzes" element={<Quizzes /> } exact/>
          </Route>
          <Route element={<StudentRoutes role={role} />}>
            <Route path="/Home" element={<Homepage />} exact/>
            <Route path="/"  element={<Homepage />} exact/>
            <Route path="/Calendar" element={<Calendar />} exact/>
            <Route path="/Bills" element={<Bills />} exact/>
            <Route path="/Elections" element={<Elections />} exact/>
            <Route path="/Politicians" element={<Politicians />} exact/>
            <Route path="/Bills" element={<Bills />} exact/>
            <Route path="/Map" element={<Map />} exact/>
            <Route path="/News" element={<News />} exact/>
            <Route path="/Profile" element={<Profile/>} exact/>
          </Route>
        </Route>
        <Route element={<ProtectedRoutes login={!loggedIn}/>}>
          <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} setRole={setRole} loginFun={logEmIn}/>} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App
