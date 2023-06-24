import React from 'react';
import { useState } from 'react';
import Home from './pages/index.jsx';
import Navbar from './components/Navbar.jsx';
import Homepage from './pages/Homepage.jsx';
import './App.css'

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Homepage/>
    </React.Fragment>
  );
}

export default App