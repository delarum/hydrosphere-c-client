import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import "../styles/about.css";

import leader1 from "../assets/leader2.jpg";
import leader2 from "../assets/leader3.jpg";
import leader3 from "../assets/man1.jpg";

function About() {
  useEffect(() => {
    const counters = document.querySelectorAll(".counter");

    counters.forEach((counter) => {
      const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText.replace(/,/g, "");
        const increment = Math.ceil(target / 100);

        if (count < target) {
          counter.innerText = (count + increment).toLocaleString();
          setTimeout(updateCounter, 25);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };

      counter.innerText = "0";
      updateCounter();
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="about-page">
        {/* HERO */}
        <section className="about-hero">
          <div className="wave-overlay">
            <svg viewBox="0 0 1200 600" preserveAspectRatio="none">
              <path
                d="M0,300 Q300,200 600,300 T1200,300 L1200,600 L0,600 Z"
                fill="#1e3a5f"
                opacity="0.3"
              >
                <animate
                  attributeName="d"
                  dur="10s"
                  repeatCount="indefinite"
                  values="
                    M0,300 Q300,200 600,300 T1200,300 L1200,600 L0,600 Z;
                    M0,300 Q300,400 600,300 T1200,300 L1200,600 L0,600 Z;
                    M0,300 Q300,200 600,300 T1200,300 L1200,600 L0,600 Z"
                />
              </path>

              <path
                d="M0,400 Q400,300 800,400 T1600,400 L1600,600 L0,600 Z"
                fill="#3b82f6"
                opacity="0.2"
              >
                <animate
                  attributeName="d"
                  dur="15s"
                  repeatCount="indefinite"
                  values="
                    M0,400 Q400,300 800,400 T1600,400 L1600,600 L0,600 Z;
                    M0,400 Q400,500 800,400 T1600,400 L1600,600 L0,600 Z;
                    M0,400 Q400,300 800,400 T1600,400 L1600,600 L0,600 Z"
                />
              </path>
            </svg>
          </div>

          <div className="about-hero-content">
            <div className="hero-badge">Established 2001</div>
            <h1>
              Guardians of <br />
              <span>Water & Life</span>
            </h1>
            <p>
              Pioneering intelligent water ecosystem restoration across Africa's
              most vital lake basins, river basins and the coastal regions.
            </p>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="mission-section">
          <div className="container two-column">
            <div className="mission-text">
              <div className="section-label">🎯 OUR MISSION</div>
              <h2>Restoring Nature's Balance</h2>
              <p>
                HYDROS-C deploys cutting-edge intelligent water tracking systems
                across major river basins and coastal areas to monitor
                pollution, ecosystem health, and biodiversity. We believe that
                protecting water is protecting life itself.
              </p>

              <div className="quote-box">
                <span className="quote-icon">❝</span>
                <p>
                  "Every drop counts, every ecosystem matters. We're not just
                  cleaning water—we're restoring life for the present and future
                  generations."
                </p>
              </div>
            </div>

            <div className="stats-card-wrapper">
              <div className="stats-card">
                <div className="stats-grid">
                  <div className="stat-box">
                    <div className="counter" data-target="10">0</div>
                    <p>Monitoring Stations</p>
                  </div>

                  <div className="stat-box">
                    <div className="counter" data-target="1000000">0</div>
                    <p>Km squared of Restoration Areas</p>
                  </div>

                  <div className="stat-box">
                    <div className="counter" data-target="15">0</div>
                    <p>Partner NGOs</p>
                  </div>

                  <div className="stat-box">
                    <div className="counter" data-target="85">0</div>
                    <p>Tracker Accuracy Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="timeline-section">
          <div className="container">
            <div className="section-center">
              <h2>Our Journey</h2>
              <p>
                From a vision to reality—transforming water conservation in
                Africa.
              </p>
            </div>

            <div className="timeline">
              <div className="timeline-line"></div>

              <div className="timeline-item left">
                <div className="timeline-card">
                  <span className="year">2001</span>
                  <h3>Foundation</h3>
                  <p>
                    HYDROS-C founded in Nairobi with a mission to tackle water
                    pollution through technology, a field that was largely
                    unexplored at the time. The founders raised funds from
                    charitable organizations and launched the first project at
                    the Ngong' River.
                  </p>
                </div>
              </div>

              <div className="timeline-item right">
                <div className="timeline-card">
                  <span className="year">2022</span>
                  <h3>Nairobi River Initiative</h3>
                  <p>
                    Launched comprehensive regeneration project for the Nairobi
                    River Basin in partnership with county government by
                    initiating a thorough garbage collection and treatment
                    program.
                  </p>
                </div>
              </div>

              <div className="timeline-item left">
                <div className="timeline-card">
                  <span className="year">2024</span>
                  <h3>Expansion</h3>
                  <p>
                    Extended operations to the Lake Victoria basin around
                    Southern Nyanza Area.
                  </p>
                </div>
              </div>

              <div className="timeline-item right">
                <div className="timeline-card active-card">
                  <span className="year">2026</span>
                  <h3>Today</h3>
                  <p>
                    Leading water restoration efforts across Africa with 10+
                    monitoring stations and international partnerships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="values-section">
          <div className="container">
            <div className="section-center">
              <h2>Our Core Values</h2>
              <p>The principles that guide every drop of our work.</p>
            </div>

            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🌿</div>
                <h3>Sustainability First</h3>
                <p>
                  Every solution we implement is designed for long-term
                  ecological balance, ensuring future generations inherit clean
                  water systems.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">💻</div>
                <h3>Innovation Driven</h3>
                <p>
                  We leverage IoT sensors, AI analytics, and real-time
                  monitoring to revolutionize water quality management.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h3>Community Centric</h3>
                <p>
                  True change happens together. We partner with local
                  governments, NGOs, and communities for lasting impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FLAGSHIP */}
        <section className="flagship-section">
          <div className="container two-column">
            <div className="flagship-text">
              <div className="flagship-badge">⭐ Flagship Project</div>
              <h2>The Nairobi River Basin Regeneration</h2>
              <p>
                Our current flagship initiative focuses on the comprehensive
                regeneration of the Nairobi River Basin and its tributaries.
                Once a glorious lifeline for the region, the basin suffered
                decades of degradation.
              </p>
              <p>
                In partnership with the Nairobi County Government and several
                dedicated NGOs, we're deploying all our resources to monitor,
                treat, restore, and implement preventive measures.
              </p>

              <div className="flagship-stats">
                <div className="mini-box">
                  <h3>24/7</h3>
                  <p>Real-time Monitoring</p>
                </div>
                <div className="mini-box">
                  <h3>12</h3>
                  <p>Tributaries Covered</p>
                </div>
              </div>
            </div>

            <div className="flagship-grid">
              <div className="info-box float-box">
                <h4>💧 Water Quality</h4>
                <p>Continuous pH, turbidity, and contaminant tracking</p>
              </div>

              <div className="info-box">
                <h4>🏭 Pollution Control</h4>
                <p>Industrial discharge monitoring</p>
              </div>

              <div className="info-box">
                <h4>🐟 Biodiversity</h4>
                <p>Marine life health assessment</p>
              </div>

              <div className="info-box float-box">
                <h4>🌱 Restoration</h4>
                <p>Ecosystem rehabilitation</p>
              </div>
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="team-section">
          <div className="container">
            <div className="section-center">
              <h2>Leadership Team</h2>
              <p>Experts dedicated to preserving our most precious resource.</p>
            </div>

            <div className="team-grid">
              <div className="team-card">
                <img src={leader1} alt="Dr. Eva Atieno" />
                <h3>Dr. Eva Atieno</h3>
                <h4>Founder & CEO</h4>
                <p>
                  Environmental scientist with 15+ years in aquatic ecosystem
                  restoration.
                </p>
              </div>

              <div className="team-card">
                <img src={leader2} alt="James Ali" />
                <h3>James Ali</h3>
                <h4>Head of Operations</h4>
                <p>
                  Expert in large-scale water treatment infrastructure and
                  project management.
                </p>
              </div>

              <div className="team-card">
                <img src={leader3} alt="Dr. Amina Byishimo" />
                <h3>Dr. Amina Byishimo</h3>
                <h4>Chief Scientist</h4>
                <p>
                  Leading our R&D in smart monitoring technologies and data
                  analytics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERS */}
        <section className="partners-section">
          <div className="container">
            <h3 className="partners-title">Trusted Partners</h3>
            <div className="partners-grid">
              <div>Nairobi County</div>
              <div>WWF Kenya</div>
              <div>University of Nairobi</div>
              <div>Water Project</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta-section">
          <div className="container cta-center">
            <h2>Join Us in Protecting Our Waters</h2>
            <p>
              Whether you're a potential partner, investor, or passionate about
              environmental conservation, we'd love to hear from you.
            </p>

            <div className="cta-buttons">
              <a href="../pages/PartnerWithUs" className="primary-btn">
                Partner With Us
              </a>
              <a href="/projects" className="secondary-btn">
                View Our Projects
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default About;