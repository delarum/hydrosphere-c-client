import React from 'react'
import Navbar from '../components/navbar';
import '../styles/navbar.css';
import Footer from '../components/Footer';
import '../styles/footer.css';
import MapSection from '../components/MapSection';
import '../styles/home.css';

function Home() {
  return (
    <>
      <Navbar />
      <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Protecting Our Life</h1>
          <p>
            Intelligent water tracking across Nairobi River Basin
          </p>
          <button className="cta-btn">View Live Tracking</button>
        </div>
      </section>

      {/* MAP */}
      <section className="map-wrapper">
        <h2>The Nairobi River Basin Monitoring Map</h2>
        <MapSection />
        <p className="map-description">
          HYDROS-C monitors pollution and ecosystem health across Nairobi.
        </p>
      </section>

    </div>
      <Footer />
    </>
  );
}

export default Home