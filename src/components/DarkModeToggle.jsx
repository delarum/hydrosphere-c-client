// client/src/components/DarkModeToggle.jsx
import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import './DarkModeToggle.css';

export default function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      className={"dark-toggle" + (isDark ? " dark-toggle--dark" : "")}
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className="dark-toggle__track">
        <span className="dark-toggle__thumb">
          {isDark ? "🌙" : "☀️"}
        </span>
      </span>
    </button>
  );
}