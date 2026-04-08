// client/src/components/BecomeInvolved/TabNavigation.jsx
import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'report', label: 'Report Incident', icon: '⚠️' },
    { id: 'innovation', label: 'Innovation Lab', icon: '💡' },
    { id: 'rewards', label: 'My Rewards', icon: '🏆' }
  ];

  return (
    <div className="tab-navigation">
      <div className="tab-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;