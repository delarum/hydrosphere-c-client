import React from 'react'
import Home from './pages/Home'
import Contact from './pages/Contact';
import About from './pages/About';
import PartnerWithUs from './pages/PartnerWithUs';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Register from './pages/Register';
import BecomeInvolved from './pages/BecomeInvolved';
import Shop from './pages/Shop';
import WeatherSection from './pages/Weathersection';
import Trackers from './pages/Trackers';

import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthCallback from './pages/AuthCallback';
import './styles/darkmode.css';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id';
function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About />} />
    <Route path="/PartnerWithUs" element={<PartnerWithUs />} />
    <Route path="/Projects" element={<Projects />} />
    <Route path="/weather" element={<WeatherSection />} />
    <Route path="/trackers" element={<Trackers />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/auth/google/callback" element={<AuthCallback />} />
    <Route path="/become-involved" element={
      <ProtectedRoute>
        <BecomeInvolved />
      </ProtectedRoute>
    } />

    </Routes>
    </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App