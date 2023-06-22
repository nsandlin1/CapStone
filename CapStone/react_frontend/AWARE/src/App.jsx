import React from 'react';
import { useState } from 'react';
import Home from './pages/index.jsx';
import Navbar from './components/Navbar.jsx';
import Widget from './components/widgets.jsx';
import './App.css'

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Widget width='w-[70%]' height='h-[150px]'/>
    </React.Fragment>
  );
}

export default App
