import React from 'react'
import Home from './pages/Home'
import Contact from './pages/Contact';
import About from './pages/About';
import PartnerWithUs from './pages/PartnerWithUs';
import Projects from './pages/Projects';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About />} />
    <Route path="/PartnerWithUs" element={<PartnerWithUs />} />
    <Route path="/Projects" element={<Projects />} />

    </Routes>
  );
}

export default App