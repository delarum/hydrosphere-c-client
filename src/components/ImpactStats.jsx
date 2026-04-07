import React, { useEffect, useState } from "react";
import { Droplets, Globe, Users, Fish } from "lucide-react";

function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const increment = end / 60;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, duration / 60);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

function ImpactStats() {
  const stats = [
    { icon: <Droplets size={22} />, value: 1200000, suffix: "", label: "Machine Vision Anomalies" },
    { icon: <Globe size={22} />, value: 156, suffix: "", label: "Active Water Sites" },
    { icon: <Users size={22} />, value: 45, suffix: "", label: "Urban People Protected" },
    { icon: <Fish size={22} />, value: 8500, suffix: "+", label: "Species Under Protection" },
  ];

  return (
    <section className="impact-section">
      <h2>Collective Impact</h2>
      <p>
        Monitoring Africa’s most critical water and ecological ecosystems.
      </p>

      <div className="impact-grid">
        {stats.map((stat, idx) => (
          <div className="impact-card" key={idx}>
            <div className="impact-icon">{stat.icon}</div>
            <h3>
              <Counter end={stat.value} suffix={stat.suffix} />
            </h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ImpactStats;