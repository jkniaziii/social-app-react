import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Dashboard/Navbar';
import Profile from './Components/Dashboard/Profile/index';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
    {/* <Routes>
        <Route path="profile" element={<Profile />} />
    </Routes> */}
  </BrowserRouter>
    </div>
  );
}

export default App;
