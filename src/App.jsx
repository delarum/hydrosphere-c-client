import React from 'react'
import Home from './pages/Home'
import Contact from './pages/Contact';
import About from './pages/About';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About />} />

    </Routes>
  );
}

export default App