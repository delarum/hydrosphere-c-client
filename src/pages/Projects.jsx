import React, { useEffect, useMemo, useState } from "react";
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

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return waterBodies;
    if (activeFilter === "climate") {
      return waterBodies.filter(
        (item) => item.status === "climate" || item.status === "critical"
      );
    }
    return waterBodies.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

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
        <button className="cta-button">Partner With Us</button>
      </section>

      <ImpactStats />
      <Footer />
    </div>
  );
}

export default Projects;