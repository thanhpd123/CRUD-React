import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Home from './component/Home';
import Guest from './component/Guest';
import Register from './component/Register';
import Chart from './component/Chart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/register" element={<Register />} />
        <Route path="/charts" element={<Chart />} />
      </Routes>
    </Router>
  );
}

export default App;
