import React from 'react';
import { useState } from 'react';
import Home from './pages/index.jsx';
import Navbar from './components/Navbar.jsx';
import Homepage from './pages/Homepage.jsx';
import Senators from './pages/Senators.jsx';
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        <Route path="/Home" element={<Homepage />} />
        <Route path="/Senators" element={<Senators />} />
      </Routes>
    </React.Fragment>
  );
}

export default App
