// client/src/components/BecomeInvolved/InnovationLab.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const InnovationLab = () => {
  const { submitInnovation, user } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    developmentStage: '',
    description: '',
    supportRequired: [],
    isStudentApplication: false,
    institution: '',
    course: ''
  });

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const { data } = await axios.get(`${API_URL}/auth/opportunities`);
      if (data.success) setOpportunities(data.opportunities);
    } catch (error) {
      console.error('Failed to fetch opportunities');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'supportRequired') {
        const updated = checked 
          ? [...formData.supportRequired, value]
          : formData.supportRequired.filter(item => item !== value);
        setFormData({ ...formData, supportRequired: updated });
      } else {
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await submitInnovation(formData);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Proposal submitted successfully!' });
      setFormData({
        title: '', category: '', developmentStage: '', description: '',
        supportRequired: [], isStudentApplication: false, institution: '', course: ''
      });
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="innovation-section">
      {/* Proposal Form */}
      <div className="form-card">
        <div className="card-header">
          <h2>Innovation Proposal</h2>
          <span className="grant-badge">Grants Available</span>
        </div>
        <p className="card-subtitle">Submit environmental solutions for funding consideration</p>

        {message && (
          <div className={`alert ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Biodegradable Oil Absorbent from Agricultural Waste"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleInputChange} required>
              <option value="">Select category</option>
              <option value="water_treatment">Water Treatment</option>
              <option value="waste_management">Waste Management</option>
              <option value="monitoring_tech">Monitoring Technology</option>
              <option value="ecosystem_restoration">Ecosystem Restoration</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Development Stage</label>
            <select name="developmentStage" value={formData.developmentStage} onChange={handleInputChange} required>
              <option value="">Select stage</option>
              <option value="concept">Concept/Idea</option>
              <option value="prototype">Prototype</option>
              <option value="pilot">Pilot Testing</option>
              <option value="scaling">Ready to Scale</option>
            </select>
          </div>

          <div className="form-group">
            <label>Detailed Description</label>
            <textarea
              name="description"
              rows="5"
              placeholder="Describe your solution, the problem it addresses, technical approach, and expected impact..."
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Support Required</label>
            <div className="checkbox-grid">
              {['Funding', 'Mentorship', 'Lab Access', 'Pilot Site'].map(item => (
                <label key={item} className="checkbox-card">
                  <input
                    type="checkbox"
                    name="supportRequired"
                    value={item.toLowerCase().replace(' ', '_')}
                    checked={formData.supportRequired.includes(item.toLowerCase().replace(' ', '_'))}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Student Scholarship */}
          <div className="scholarship-box">
            <div className="scholarship-header">
              <span className="scholarship-icon">🎓</span>
              <div>
                <h4>Seasonal Scholarship</h4>
                <p>Students may apply for research grants up to $5,000 and internship placement.</p>
              </div>
            </div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isStudentApplication"
                checked={formData.isStudentApplication}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              Apply for student scholarship
            </label>
            {formData.isStudentApplication && (
              <div className="student-fields">
                <input
                  type="text"
                  name="institution"
                  placeholder="Institution Name"
                  value={formData.institution}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="course"
                  placeholder="Course of Study"
                  value={formData.course}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : '🚀 Submit Proposal'}
          </button>
        </form>
      </div>

      {/* My Submissions */}
      <div className="info-card submissions-card">
        <h3>My Submissions</h3>
        {user?.innovations?.length > 0 ? (
          <div className="submissions-list">
            {user.innovations.map((innov, idx) => (
              <div key={idx} className="submission-item">
                <span className="submission-title">{innov.title}</span>
                <span className={`submission-status ${innov.status}`}>{innov.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No submissions yet</p>
        )}
      </div>

      {/* Current Opportunities */}
      <div className="info-card opportunities-card">
        <h3>Current Opportunities</h3>
        <div className="opportunities-list">
          {opportunities.map(opp => (
            <div key={opp.id} className={`opportunity-item ${opp.color}`}>
              <div className="opportunity-header">
                <span className="opportunity-tag">{opp.tag}</span>
                <span className="opportunity-deadline">{opp.deadline || opp.status}</span>
              </div>
              <h4 className="opportunity-title">{opp.title}</h4>
              <p className="opportunity-desc">{opp.description}</p>
              <div className="opportunity-meta">
                {opp.applications && <span>{opp.applications} applications</span>}
                {opp.range && <span>{opp.range}</span>}
                {opp.type && <span>{opp.type}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Story */}
      <div className="info-card success-story">
        <h3>Success Story</h3>
        <div className="story-content">
          <div className="story-author">
            <div className="author-avatar">SK</div>
            <div>
              <span className="author-name">Sarah Kimani</span>
              <span className="author-location">Nairobi, Kenya</span>
            </div>
          </div>
          <p className="story-text">
            Received $8,000 to develop low-cost water purification using moringa seeds. 
            Now serving 5,000+ households across East Africa.
          </p>
          <span className="story-tag">Funded Spring 2025</span>
        </div>
      </div>
    </div>
  );
};

export default InnovationLab;