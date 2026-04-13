// client/src/pages/Home.jsx
import React from "react";
import Navbar from "../components/navbar";
import "../styles/navbar.css";
import Footer from "../components/Footer";
import "../styles/footer.css";
import MapSection from "../components/MapSection";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/* ── Inline SVG icon components ── */

const IconWave = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s2-4 5-4 5 4 5 4 2-4 5-4 5 4 5 4"/>
    <path d="M2 18s2-4 5-4 5 4 5 4 2-4 5-4 5 4 5 4"/>
  </svg>
);

const IconChartBar = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6"  y1="20" x2="6"  y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);

const IconBottle = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2h6v3l2 3v12a2 2 0 01-2 2H9a2 2 0 01-2-2V8l2-3V2z"/>
    <line x1="7" y1="12" x2="17" y2="12"/>
  </svg>
);

const IconRecycle = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1.5 8.5 1.5 3.5 6.5 3.5"/>
    <path d="M1.5 3.5l4 4a9 9 0 0114.1 1"/>
    <polyline points="22.5 15.5 22.5 20.5 17.5 20.5"/>
    <path d="M22.5 20.5l-4-4a9 9 0 01-14.1-1"/>
  </svg>
);

const IconDroplet = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
  </svg>
);

const IconSatellite = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 7L9.8 3.3a1 1 0 00-1.4-.1L5.1 6.4a1 1 0 00-.1 1.4L8.3 11"/>
    <path d="M11 13l-3.5 3.5a1 1 0 000 1.4l3.5 3.5a1 1 0 001.4 0L16 17.8"/>
    <path d="M14 14l4.5-4.5"/>
    <path d="M17 3l4 4-1.5 1.5-4-4z"/>
    <circle cx="8.5" cy="15.5" r="1.5"/>
    <path d="M3 21l2-2"/>
  </svg>
);

const IconShirt = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
  </svg>
);

const IconHome = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const IconMonitor = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const IconPalette = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/>
    <circle cx="8.5"  cy="7.5" r=".5"/><circle cx="6.5"  cy="12.5" r=".5"/>
    <path d="M12 2C6.5 2 2 6.5 2 12a10 10 0 0010 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);

const IconLeaf = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8C8 10 5.9 16.17 3.82 19.34 3.17 20.13 2.75 21 3.17 22c.42 1 1.58 1 2.5.5 3.17-1.67 6.5-3.5 8.5-8 .5-1.17.58-2.67-.17-3.5"/>
    <path d="M3 22 17 8"/>
  </svg>
);

const IconBag = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const IconArrow = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ── Floating background icons (large, decorative) ── */
const IconBottleLg   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><path d="M9 2h6v3l2 3v12a2 2 0 01-2 2H9a2 2 0 01-2-2V8l2-3V2z"/><line x1="7" y1="12" x2="17" y2="12"/></svg>;
const IconShirtLg    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>;
const IconChairLg    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><path d="M19 9V6a2 2 0 00-2-2H7a2 2 0 00-2 2v3"/><path d="M3 11v5a2 2 0 002 2h14a2 2 0 002-2v-5a1 1 0 00-1-1H4a1 1 0 00-1 1z"/><line x1="5" y1="18" x2="5" y2="22"/><line x1="19" y1="18" x2="19" y2="22"/></svg>;
const IconBagLg      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
const IconRecycleLg  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{width:'100%',height:'100%'}}><polyline points="1.5 8.5 1.5 3.5 6.5 3.5"/><path d="M1.5 3.5l4 4a9 9 0 0114.1 1"/><polyline points="22.5 15.5 22.5 20.5 17.5 20.5"/><path d="M22.5 20.5l-4-4a9 9 0 01-14.1-1"/></svg>;

/* ── Orbit product icons ── */
const IconOrbitBottle = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><path d="M9 2h6v3l2 3v12a2 2 0 01-2 2H9a2 2 0 01-2-2V8l2-3V2z"/><line x1="7" y1="12" x2="17" y2="12"/></svg>;
const IconOrbitShirt  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>;
const IconOrbitChair  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><path d="M19 9V6a2 2 0 00-2-2H7a2 2 0 00-2 2v3"/><path d="M3 11v5a2 2 0 002 2h14a2 2 0 002-2v-5a1 1 0 00-1-1H4a1 1 0 00-1 1z"/><line x1="5" y1="18" x2="5" y2="22"/><line x1="19" y1="18" x2="19" y2="22"/></svg>;
const IconOrbitBag    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;

/* ── Main component ── */
function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="home-page">

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-bg"></div>
          <div className="hero-particles"></div>
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>Protecting Our Source Of Life</h1>
              <p className="hero-subtitle">
                A community-driven company committed to restoring large water
                sources not only in Africa but throughout the world.
              </p>
              <div className="cta-group">
                <button
                  className="cta-btn cta-btn-primary"
                  onClick={() => navigate("/trackers")}
                >
                  VIEW LIVE TRACKING
                </button>
                <button
                  className="cta-btn cta-btn-secondary"
                  onClick={() => navigate("/about")}
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="scroll-indicator">
              <span>Scroll to explore</span>
              <div className="scroll-line"></div>
            </div>
          </div>
        </section>

        {/* ── Map ── */}
        <section className="map-section">
          <div className="map-wrapper">
            <div className="section-header">
              <h2>Nairobi River Basin Restoration</h2>
              <p>
                Our current project is focused on the regeneration of the
                Nairobi River Basin and its tributaries. We are deploying all
                our resources in partnership with the Nairobi County Government
                and several NGOs to monitor, treat, restore and put further
                measures preventing the further degradation of this once
                glorious river basin.
              </p>
            </div>

            <div className="map-container">
              <div className="map-grid"></div>
              <div className="map-corner top-left"></div>
              <div className="map-corner top-right"></div>
              <div className="map-corner bottom-left"></div>
              <div className="map-corner bottom-right"></div>

              <MapSection />
              <div id="map" style={{ width: "100%", height: "100%" }}></div>

              <div className="map-dashboard">
                <div className="dashboard-header">
                  <div className="dashboard-icon">
                    <IconChartBar size={22} />
                  </div>
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
                      <span className="stat-value">5</span>
                    </div>
                    <span className="stat-change">+12%</span>
                  </div>
                </div>
                <div className="dashboard-footer">
                  <button className="dashboard-btn">Details</button>
                  <button className="dashboard-btn">Export</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <IconSatellite size={32} />
              </div>
              <h3>Real-time Monitoring</h3>
              <p>Track water quality across multiple parameters 24/7</p>
            </div>
          </div>
        </section>

        {/* ── Garbage Shop ── */}
        <section className="garbage-shop-section">

          {/* Floating background icons */}
          <div className="shop-float-bg">
            <span className="shop-float-item"><IconBottleLg /></span>
            <span className="shop-float-item"><IconShirtLg /></span>
            <span className="shop-float-item"><IconChairLg /></span>
            <span className="shop-float-item"><IconBagLg /></span>
            <span className="shop-float-item"><IconRecycleLg /></span>
          </div>

          <div className="garbage-shop-container">

            {/* Content side */}
            <div className="shop-content">
              <span className="shop-badge">
                <IconWave size={16} />
                Water Plastic Recovery
              </span>

              <h2>
                Turn Trash Into <span>Treasure</span>
              </h2>

              <p className="shop-description">
                Shop premium products made from 100% recycled large water
                bodies' plastic. Every purchase directly funds the removal of
                plastic waste from Africa's riverbeds and lakesides and supports
                local recycling communities.
              </p>

              {/* Impact stats */}
              <div className="shop-impact-preview">
                <div className="impact-stat">
                  <div className="impact-icon">
                    <IconBottle size={22} />
                  </div>
                  <div className="impact-info">
                    <span className="impact-number">24.7K</span>
                    <span className="impact-label">kg removed</span>
                  </div>
                </div>
                <div className="impact-stat">
                  <div className="impact-icon">
                    <IconRecycle size={22} />
                  </div>
                  <div className="impact-info">
                    <span className="impact-number">156K</span>
                    <span className="impact-label">items recycled</span>
                  </div>
                </div>
                <div className="impact-stat">
                  <div className="impact-icon">
                    <IconDroplet size={22} />
                  </div>
                  <div className="impact-info">
                    <span className="impact-number">2.1M</span>
                    <span className="impact-label">liters saved</span>
                  </div>
                </div>
              </div>

              <Link to="/shop" className="shop-cta-btn">
                Explore EcoShop
                <span className="arrow">
                  <IconArrow size={18} />
                </span>
              </Link>
            </div>

            {/* Visual side */}
            <div className="shop-visual">
              <div className="shop-card-large">

                {/* Rotating recycle centre */}
                <div className="recycle-center">
                  <div className="recycle-symbol-large">
                    <IconRecycle size={96} />
                  </div>
                  <div className="orbit-products">
                    <div className="orbit-product"><IconOrbitBottle /></div>
                    <div className="orbit-product"><IconOrbitShirt /></div>
                    <div className="orbit-product"><IconOrbitChair /></div>
                    <div className="orbit-product"><IconOrbitBag /></div>
                  </div>
                </div>

                {/* Product category grid */}
                <div className="product-preview-grid">
                  <div className="preview-item">
                    <span className="icon"><IconShirt size={28} /></span>
                    <span className="label">Apparel</span>
                  </div>
                  <div className="preview-item">
                    <span className="icon"><IconHome size={28} /></span>
                    <span className="label">Home</span>
                  </div>
                  <div className="preview-item">
                    <span className="icon"><IconMonitor size={28} /></span>
                    <span className="label">Tech</span>
                  </div>
                  <div className="preview-item">
                    <span className="icon"><IconPalette size={28} /></span>
                    <span className="label">Art</span>
                  </div>
                  <div className="preview-item">
                    <span className="icon"><IconLeaf size={28} /></span>
                    <span className="label">Garden</span>
                  </div>
                  <div className="preview-item">
                    <span className="icon"><IconBag size={28} /></span>
                    <span className="label">Bags</span>
                  </div>
                </div>

                {/* Connector dots */}
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

export default Home;