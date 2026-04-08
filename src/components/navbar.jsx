import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import waveLogo from '../assets/waveLogo.png';
import '../styles/navbar.css';
import { useAuth } from '../context/AuthContext';
import UserProfileHeader from './UserProfileHeader';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Weather', path: '/weather' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={waveLogo} alt="HYDROS-C Logo" className="logo-image" />
          <span className="logo-text">HYDROS-C</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.name} className="nav-item">
              <Link 
                to={link.path} 
                className={`nav-link ${isActive(link.path) ? 'nav-link-active' : ''}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="nav-item">
            <Link to="/become-involved" className="nav-button">
              Become Involved
            </Link>
          </li>
        </ul>

        {/* Hamburger Button */}
        <button 
          className={`hamburger ${isOpen ? 'hamburger-active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isOpen ? 'mobile-menu-open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.name} className="mobile-nav-item">
              <Link 
                to={link.path} 
                className={`mobile-nav-link ${isActive(link.path) ? 'mobile-nav-link-active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="mobile-nav-item">
            <Link 
              to="/become-involved" 
              className="mobile-nav-button"
              onClick={() => setIsOpen(false)}
            >
              Become Involved
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;