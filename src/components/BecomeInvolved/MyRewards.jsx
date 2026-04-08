// client/src/components/BecomeInvolved/MyRewards.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const MyRewards = () => {
  const { user } = useAuth();

  const stats = [
    { 
      icon: '💰', 
      value: `$${user?.totalEarnings || 0}`, 
      label: 'Total Earnings',
      color: 'orange'
    },
    { 
      icon: '✅', 
      value: user?.verifiedReports || 0, 
      label: 'Verified Reports',
      color: 'blue'
    },
    { 
      icon: '⭐', 
      value: user?.impactScore || 0, 
      label: 'Impact Score',
      color: 'purple'
    }
  ];

  return (
    <div className="rewards-section">
      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Rewards History */}
      <div className="info-card rewards-history">
        <h3>Rewards History</h3>
        {user?.rewardsHistory?.length > 0 ? (
          <div className="history-list">
            {user.rewardsHistory.map((reward, idx) => (
              <div key={idx} className="history-item">
                <div className="history-info">
                  <span className="history-type">{reward.type}</span>
                  <span className="history-desc">{reward.description}</span>
                  <span className="history-date">{new Date(reward.date).toLocaleDateString()}</span>
                </div>
                <span className={`history-amount ${reward.status}`}>
                  +${reward.amount}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-rewards">
            <div className="gift-icon">🎁</div>
            <p>Start reporting incidents to earn rewards</p>
            <Link to="#" onClick={() => window.location.hash = 'report'} className="link-primary">
              Submit your first report →
            </Link>
          </div>
        )}
      </div>

      {/* Level Progress */}
      <div className="info-card level-card">
        <div className="level-header">
          <span className="level-badge">Level {user?.level || 1}</span>
          <span className="points-display">{user?.points || 0} points</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((user?.points % 1000) / 1000) * 100}%` }}
          ></div>
        </div>
        <p className="level-next">{1000 - ((user?.points || 0) % 1000)} points to next level</p>
      </div>

      {/* Badges */}
      <div className="info-card badges-card">
        <h3>Earned Badges</h3>
        <div className="badges-grid">
          {user?.badges?.length > 0 ? (
            user.badges.map((badge, idx) => (
              <div key={idx} className="badge-item">
                <span className="badge-icon">🏅</span>
                <span className="badge-name">{badge.replace('_', ' ')}</span>
              </div>
            ))
          ) : (
            <p className="empty-badges">Complete reports to earn badges</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRewards;