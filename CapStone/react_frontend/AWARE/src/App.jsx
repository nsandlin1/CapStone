import React from 'react';
import { useState } from 'react';
import Home from './pages/index.jsx';
import Navbar from './components/Navbar.jsx';
import Homepage from './pages/Homepage.jsx';
import Politicians from './pages/Politicians.jsx';
import Bills from './pages/Bills.jsx';
import './App.css'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Politicians" element={<Politicians />} />
        <Route path="/Bills" element={<Bills />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App
