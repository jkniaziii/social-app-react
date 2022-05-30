import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Parent/Components/Dashboard/Navbar';




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
