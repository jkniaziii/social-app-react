import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Dashboard/Navbar';
import Profile from './Components/Dashboard/Profile/index';
import DetailPage from './Components/Dashboard/Todo/DetailPage';
import Todo from './Components/Dashboard/Todo';
import { Cart } from './store/cartStore';
import Weather from './Components/Dashboard/Weather';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
