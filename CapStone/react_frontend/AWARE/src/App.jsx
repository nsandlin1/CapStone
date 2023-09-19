import React from 'react';
import { useState, useEffect } from 'react';
import Home from './pages/index.jsx';
import { StuNavbar, TeachNavbar } from './components/Navbar.jsx';
import Homepage from './pages/Homepage.jsx';
import Calendar from './pages/Calendar.jsx';
import Politicians from './pages/Politicians.jsx';
import News from './pages/News.jsx';
import Bills from './pages/Bills.jsx';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Map from './pages/PoliticianLanding.jsx';
import Elections from './pages/Elections.jsx';
import InteractiveMap from './pages/InteractiveMap.jsx';
import PolyLanding from './pages/PolyLanding.jsx';
import MockElections from './pages/MockElections.jsx';

function App() {
  return (
    <React.Fragment>
      <StuNavbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/Bills" element={<Bills />} />
        <Route path="/Elections" element={<Elections />} />
        <Route path="/Politicians" element={<Politicians />} />
        <Route path="/Bills" element={<Bills />}></Route>
        <Route path="/Map" element={<Map />}/>
        <Route path="/News" element={<News />} />
        <Route path="/Int" element={<InteractiveMap />} />
        <Route path="/Overview" element={<PolyLanding/>} />
        <Route path="/Mock" element={<MockElections/> } />
      </Routes>
    </React.Fragment>
  );
}

export default App
