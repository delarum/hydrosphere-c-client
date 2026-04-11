// client/src/components/ShopCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/shop-card.css';

const ShopCard = () => {
  return (
    <Link to="/shop" className="shop-card-link">
      <div className="shop-card">
        <div className="shop-card-glow"></div>
        
        <div className="shop-card-content">
          <div className="shop-card-icon">
            <div className="recycle-symbol">♻️</div>
            <div className="floating-items">
              <span className="item-float">🧴</span>
              <span className="item-float">👕</span>
              <span className="item-float">🪑</span>
            </div>
          </div>
          
          <div className="shop-card-text">
            <span className="shop-badge">New Collection</span>
            <h3>EcoShop</h3>
            <p>Turn trash into treasure. Every purchase removes plastic from our oceans.</p>
            
            <div className="shop-stats-preview">
              <div className="preview-stat">
                <span className="preview-number">2.4K</span>
                <span className="preview-label">kg plastic removed</span>
              </div>
              <div className="preview-stat">
                <span className="preview-number">150+</span>
                <span className="preview-label">products</span>
              </div>
            </div>
            
            <span className="shop-cta">
              Explore Shop
              <span className="arrow">→</span>
            </span>
          </div>
        </div>
        
        <div className="shop-card-particles">
          {[...Array(6)].map((_, i) => (
            <span key={i} className={`particle p${i}`}></span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;