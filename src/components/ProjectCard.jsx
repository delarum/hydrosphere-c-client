import React, { useState } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";

function ProjectCard({ project, index }) {
  const [mouseStyle, setMouseStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;

    setMouseStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
    });
  };

  const resetCard = () => {
    setMouseStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
    });
  };

  return (
    <article
      className="project-card reveal-card"
      style={{
        animationDelay: `${index * 0.12}s`,
        ...mouseStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetCard}
    >
      <div className="project-image-wrap">
        <img src={project.image} alt={project.title} className="project-image" />
        <span className="project-badge">{project.badge}</span>
        <div className="image-overlay"></div>
      </div>

      <div className="project-content">
        <p className="project-location">
          <MapPin size={14} />
          {project.location}
        </p>

        <div className="project-heading-row">
          <h3>{project.title}</h3>
          <button className="mini-arrow-btn">
            <ArrowUpRight size={16} />
          </button>
        </div>

        <p className="project-description">{project.description}</p>

        <div className="project-stats">
          {project.stats.map((stat, idx) => (
            <div className="stat-item" key={idx}>
              <h4>{stat.value}</h4>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;