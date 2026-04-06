import React from 'react';
import { Link } from 'react-router-dom';
import waveLogo from '../assets/waveLogo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Partnership', path: '/partnership' },
    { name: 'Projects', path: '/projects' },
    { name: 'Devices', path: '/devices' },
    { name: 'Contact', path: '/contact' },
  ];

  const expertise = [
    'Ocean Waste Removal',
    'Lake Restoration',
    'Oil Spill Cleanup',
    'Industrial Water Treatment',
    'Marine Ecosystem Protection',
  ];

  const officeLocations = [
    'Nairobi, Kenya',
    'Kigali, Rwanda',
    'Dakar, Senegal',
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Column 1: Brand & Description */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
               <img src={waveLogo} alt="HYDROS-C Logo" className="footer-logo-icon" />
              <span className="footer-logo-text">HYDROS-C</span>
            </Link>
            <p className="footer-description">
              Leading large-scale water body cleaning and environmental restoration solutions. Protecting oceans, lakes, and rivers for a sustainable future.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Expertise */}
          <div className="footer-section">
            <h3 className="footer-heading">Our Expertise</h3>
            <ul className="footer-links">
              {expertise.map((item) => (
                <li key={item}>
                  <span className="footer-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact</h3>
            <div className="footer-contact">
              <p className="footer-text">
                <span className="footer-label">Email:</span>{' '}
                <a href="mailto:info@hydrosc.com" className="footer-link">
                  info@hydrosc.com
                </a>
              </p>
              <p className="footer-text">
                <span className="footer-label">Phone:</span>{' '}
                <a href="tel:+254700000000" className="footer-link">
                  +254 700 000 000
                </a>
              </p>
            </div>
            
            <h3 className="footer-heading footer-heading-secondary">Office Locations</h3>
            <ul className="footer-locations">
              {officeLocations.map((location) => (
                <li key={location} className="footer-text">
                  {location}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} HYDROS-C. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;