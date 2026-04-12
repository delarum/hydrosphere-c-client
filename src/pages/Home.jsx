import React from 'react'
import Navbar from '../components/navbar';
import '../styles/navbar.css';
import Footer from '../components/Footer';
import '../styles/footer.css';
import MapSection from '../components/MapSection';
import '../styles/home.css';
import { Link } from 'react-router-dom';
import Shop from './Shop';

function Home() {
  return (
    <>
      <Navbar />
      <div className="home-page">  {/* CRITICAL: This wrapper scopes all styles */}
      
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-particles"></div>
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-badge">🌊 Protecting Africa's Water</span>
            <h1>HYDROS-C</h1>
            <p className="hero-subtitle">
              Advanced water ecosystem monitoring and restoration platform
            </p>
            <div className="cta-group">
              <button className="cta-btn">Get Started</button>
              <button className="cta-btn cta-btn-secondary">Learn More</button>
            </div>
          </div>
          <div className="scroll-indicator">
            <span>Scroll to explore</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="map-section">
        <div className="map-wrapper">
          <div className="section-header">
            <h2>Live Monitoring Network</h2>
            <p>Real-time water quality data from sensors across East Africa</p>
          </div>
          
          <div className="map-container">
            <div className="map-grid"></div>
            <div className="map-corner top-left"></div>
            <div className="map-corner top-right"></div>
            <div className="map-corner bottom-left"></div>
            <div className="map-corner bottom-right"></div>
            
            <MapSection />
            <div id="map" style={{width: '100%', height: '100%'}}></div>
            
            <div className="map-dashboard">
              <div className="dashboard-header">
                <div className="dashboard-icon">📊</div>
                <div>
                  <h3>Live Dashboard</h3>
                  <span className="live-indicator">
                    <span className="live-dot"></span>
                    Live
                  </span>
                </div>
              </div>
              <div className="stat-list">
                <div className="stat-item">
                  <div className="stat-info">
                    <span className="stat-label">Active Sensors</span>
                    <span className="stat-value">247</span>
                  </div>
                  <span className="stat-change">+12%</span>
                </div>
                {/* More stats... */}
              </div>
              <div className="dashboard-footer">
                <button className="dashboard-btn">Details</button>
                <button className="dashboard-btn">Export</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🛰️</div>
            <h3>Real-time Monitoring</h3>
            <p>Track water quality across multiple parameters 24/7</p>
          </div>
          {/* More cards... */}
        </div>
      </section>

       <section className="garbage-shop-section">
      
            {/* Floating background items */}
            <div className="shop-float-bg">
              <span className="shop-float-item">🧴</span>
              <span className="shop-float-item">👕</span>
              <span className="shop-float-item">🪑</span>
              <span className="shop-float-item">👜</span>
              <span className="shop-float-item">♻️</span>
            </div>
      
            <div className="garbage-shop-container">
      
              {/* ── Content Side ── */}
              <div className="shop-content">
                <span className="shop-badge">
                  <span>🌊</span>
                  Ocean Plastic Recovery
                </span>
      
                <h2>
                  Turn Trash Into <span>Treasure</span>
                </h2>
      
                <p className="shop-description">
                  Shop premium products made from 100% recycled ocean plastic. Every purchase
                  directly funds the removal of plastic waste from Africa's coastlines and
                  supports local recycling communities.
                </p>
      
                {/* Impact Stats */}
                <div className="shop-impact-preview">
                  <div className="impact-stat">
                    <div className="impact-icon">🧴</div>
                    <div className="impact-info">
                      <span className="impact-number">24.7K</span>
                      <span className="impact-label">kg removed</span>
                    </div>
                  </div>
                  <div className="impact-stat">
                    <div className="impact-icon">♻️</div>
                    <div className="impact-info">
                      <span className="impact-number">156K</span>
                      <span className="impact-label">items recycled</span>
                    </div>
                  </div>
                  <div className="impact-stat">
                    <div className="impact-icon">💧</div>
                    <div className="impact-info">
                      <span className="impact-number">2.1M</span>
                      <span className="impact-label">liters saved</span>
                    </div>
                  </div>
                </div>
      
                <Link to="/Shop" className="shop-cta-btn">
                  Explore EcoShop
                  <span className="arrow">→</span>
                </Link>
              </div>
      
              {/* ── Visual Side ── */}
              <div className="shop-visual">
                <div className="shop-card-large">
      
                  {/* Rotating recycle centre with orbiting products */}
                  <div className="recycle-center">
                    <div className="recycle-symbol-large">♻️</div>
                    <div className="orbit-products">
                      <div className="orbit-product">🧴</div>
                      <div className="orbit-product">👕</div>
                      <div className="orbit-product">🪑</div>
                      <div className="orbit-product">👜</div>
                    </div>
                  </div>
      
                  {/* Product category grid */}
                  <div className="product-preview-grid">
                    <div className="preview-item">
                      <span className="icon">👕</span>
                      <span className="label">Apparel</span>
                    </div>
                    <div className="preview-item">
                      <span className="icon">🏠</span>
                      <span className="label">Home</span>
                    </div>
                    <div className="preview-item">
                      <span className="icon">💻</span>
                      <span className="label">Tech</span>
                    </div>
                    <div className="preview-item">
                      <span className="icon">🎨</span>
                      <span className="label">Art</span>
                    </div>
                    <div className="preview-item">
                      <span className="icon">🪴</span>
                      <span className="label">Garden</span>
                    </div>
                    <div className="preview-item">
                      <span className="icon">🎒</span>
                      <span className="label">Bags</span>
                    </div>
                  </div>
      
                  {/* Animated connector dots */}
                  <div className="shop-connector">
                    <div className="connector-dots">
                      <div className="connector-dot" />
                      <div className="connector-dot" />
                      <div className="connector-dot" />
                    </div>
                  </div>
      
                </div>
              </div>
      
            </div>
          </section>
      
    </div>
      <Footer />
    </>
  );
}

export default Home