// client/src/components/UserProfileHeader.js
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserProfileHeader = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Calculate progress to next level
  const progressToNextLevel = user ? ((user.points % 1000) / 1000) * 100 : 0;
  const pointsToNextLevel = user ? 1000 - (user.points % 1000) : 1000;

  if (!isAuthenticated || !user) {
    return (
      <div className="auth-buttons">
        <Link to="/login" className="btn btn-ghost">Sign In</Link>
        <Link to="/register" className="btn btn-primary">Sign Up</Link>
      </div>
    );
  }

  return (
    <div className="user-profile-header" ref={dropdownRef}>
      <div className="points-display">
        <span className="points-icon">⭐</span>
        <span className="points-value">{user.points.toLocaleString()} pts</span>
      </div>

      <button 
        className="profile-trigger"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="user-initials" title={user.fullName}>
          {user.initials}
        </div>
        <span className="dropdown-arrow">{isDropdownOpen ? '▲' : '▼'}</span>
      </button>

      {isDropdownOpen && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <div className="user-initials large">{user.initials}</div>
            <div className="user-info">
              <span className="user-name">{user.fullName}</span>
              <span className="user-email">{user.email}</span>
            </div>
          </div>

          <div className="level-progress">
            <div className="level-info">
              <span className="level-badge">Level {user.level}</span>
              <span className="points-to-next">{pointsToNextLevel} pts to next level</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressToNextLevel}%` }}
              ></div>
            </div>
          </div>

          <div className="dropdown-stats">
            <div className="stat">
              <span className="stat-value">{user.reportsSubmitted || 0}</span>
              <span className="stat-label">Reports</span>
            </div>
            <div className="stat">
              <span className="stat-value">{user.reportsVerified || 0}</span>
              <span className="stat-label">Verified</span>
            </div>
            <div className="stat">
              <span className="stat-value">{user.badges?.length || 0}</span>
              <span className="stat-label">Badges</span>
            </div>
          </div>

          <nav className="dropdown-nav">
            <Link to="/dashboard" onClick={() => setIsDropdownOpen(false)}>
              <span>📊</span> Dashboard
            </Link>
            <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
              <span>👤</span> My Profile
            </Link>
            <Link to="/my-reports" onClick={() => setIsDropdownOpen(false)}>
              <span>📋</span> My Reports
            </Link>
            <Link to="/rewards" onClick={() => setIsDropdownOpen(false)}>
              <span>🎁</span> Rewards
            </Link>
            <Link to="/settings" onClick={() => setIsDropdownOpen(false)}>
              <span>⚙️</span> Settings
            </Link>
          </nav>

          <div className="dropdown-footer">
            <button onClick={handleLogout} className="logout-btn">
              <span>🚪</span> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileHeader;