import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Profile from './Components/Profile';
import React, { useState } from 'react'


function App() {

  console.log(process.env.REACT_APP_API_URL);

  
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/profile" element={<Profile />}/>
            
          
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
