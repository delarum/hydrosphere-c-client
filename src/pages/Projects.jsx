// Projects.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import Navbar from "../components/navbar";
import HeroBackground from "../components/HeroBackground";
import FilterTabs from "../components/FilterTabs";
import ProjectCard from "../components/ProjectCard";
import ImpactStats from "../components/ImpactStats";
import Footer from "../components/Footer";
import waterBodies from "../data/waterBodies";
import "../styles/projects.css";

function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return waterBodies;
    if (activeFilter === "climate") {
      return waterBodies.filter(
        (item) => item.status === "climate" || item.status === "critical"
      );
    }
    return waterBodies.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  // Particle animation: 200 tiny floating particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Create 200 tiny particles
    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 200; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1, // 1-3px radius (tiny!)
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.4 + 0.2,
          color: `rgba(173, 234, 236, ${Math.random() * 0.5 + 0.2})`,
        });
      }
    };

    const drawParticles = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    const init = () => {
      resizeCanvas();
      createParticles();
      drawParticles();
    };

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });

    init();

    // Cleanup on unmount to prevent memory leaks and bleeding
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener("resize", resizeCanvas);
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredProjects]);

  return (
    <div className="projects-page">
      {/* Canvas for 200 tiny particles */}
      <canvas ref={canvasRef} className="particles-canvas" />

      {/* Waves container */}
      <div className="waves-container">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>

      <HeroBackground />
      <Navbar />

      <header className="projects-hero">
        <p className="hero-subtitle">Africa's Intelligent Water Surveillance</p>
        <h1>
          Seven Critical Water <span>Bodies</span>
        </h1>
        <p className="hero-description">
          Explore vulnerable aquatic ecosystems across Africa monitored through
          AI, machine vision, and ecological risk mapping.
        </p>

        <FilterTabs
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </header>

      <main className="projects-grid-section">
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </main>

      <section className="cta-section">
        <h2>Join the Restoration</h2>
        <p>
          Partner with us to expand intelligent ecological monitoring across
          Africa's vital water systems.
        </p>
        <a
          href="/PartnerWithUs"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          Partner With Us
        </a>
      </section>

      <ImpactStats />
      <Footer />
    </div>
  );
}

export default Projects;