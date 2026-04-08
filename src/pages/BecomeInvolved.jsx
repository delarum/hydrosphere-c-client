// client/src/pages/BecomeInvolved.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import HeroSection from '../components/BecomeInvolved/HeroSection';
import TabNavigation from '../components/BecomeInvolved/TabNavigation';
import ReportIncident from '../components/BecomeInvolved/ReportIncident';
import InnovationLab from '../components/BecomeInvolved/InnovationLab';
import MyRewards from '../components/BecomeInvolved/MyRewards';
import '../styles/become-involved.css';

const BecomeInvolved = () => {
  const [activeTab, setActiveTab] = useState('report');
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    refreshUser();
  }, [activeTab]);

  const renderTab = () => {
    switch(activeTab) {
      case 'report': return <ReportIncident />;
      case 'innovation': return <InnovationLab />;
      case 'rewards': return <MyRewards />;
      default: return <ReportIncident />;
    }
  };

  return (
    <div className="become-involved-page">
      <HeroSection user={user} />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tab-content">
        {renderTab()}
      </div>
    </div>
  );
};

export default BecomeInvolved;