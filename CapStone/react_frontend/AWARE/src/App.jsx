import React from 'react';
import { useState, useEffect } from 'react';
import { StuNavbar, TeachNavbar } from './components/Navbar.jsx';
import Homepage from './pages/Homepage.jsx';
import Calendar from './pages/Student/Calendar.jsx';
import Politicians from './pages/Student/Politicians.jsx';
import News from './pages/News.jsx';
import Bills from './pages/Student/Bills.jsx';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoutes, TeacherRoutes, StudentRoutes } from './utils/ProtectedRoutes.jsx';
import Elections from './pages/Student/Elections.jsx';
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Profile from './pages/Profile.jsx'
import MockElections from './pages/Teacher/MockElections.jsx';
import Classes from './pages/Teacher/Classes.jsx';
import Quizzes from './pages/Teacher/Quizzes.jsx';


function App() {

  const [loggedIn, isLoggedIn] = useState(true);
  const [role, setRole] = useState('student');

  return (
    <React.Fragment>
      {loggedIn ?
        role == 'student' ?
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
            <Route path="/" element={<Homepage />} exact/>
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
        <Route path="/Login" element={<Login/>} />
        <Route path="/SignUp" element={<SignUp/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App
