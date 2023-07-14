import React from 'react';
import { useState } from 'react';
import Home from './pages/index.jsx';
import Navbar from './components/Navbar.jsx';
import Homepage from './pages/Homepage.jsx';
import Calendar from './pages/Calendar.jsx';
import Politicians from './pages/Politicians.jsx';
import News from './pages/News.jsx';
import Bills from './pages/Bills.jsx';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Map from './pages/PoliticianLanding.jsx';
import Elections from './pages/Elections.jsx';
import PolyLanding from './pages/PolyLanding.jsx'


function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/Bills" element={<Bills />} />
        <Route path="/Elections" element={<Elections />} />
        <Route path="/Politicians" element={<Politicians />} />
        <Route path="/Bills" element={<Bills />}></Route>
        <Route path="/Map" element={<Map />}/>
        <Route path="/News" element={<News />} />
        <Route path="/Overview" element={<PolyLanding />} />
      </Routes>
    </React.Fragment>
  );
}

export default App
