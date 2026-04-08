// client/src/components/BecomeInvolved/HeroSection.jsx
import React from 'react';

const HeroSection = ({ user }) => {
  return (
    <section className="involved-hero">
      <div className="hero-badge">
        <span className="shield-icon">🛡️</span>
        Secure & Anonymous Reporting
      </div>
      
      <h1 className="hero-title">
        Be a <span className="highlight">Water Guardian</span>
      </h1>
      
      <p className="hero-description">
        Join thousands of citizens protecting Africa's water bodies. Report pollution 
        incidents securely, earn verified rewards, and contribute to environmental innovation.
      </p>
    </section>
  );
};

export default HeroSection;