// client/src/components/BecomeInvolved/ReportIncident.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ReportIncident = () => {
  const { submitReport, user } = useAuth();
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [files, setFiles] = useState([]);
  const [knowsResponsible, setKnowsResponsible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    incidentType: '',
    waterBody: '',
    specificLocation: '',
    description: '',
    responsibleParty: ''
  });

  const incidentTypes = [
    { value: 'toxic_spillage', label: 'Toxic Spillage', reward: '$300 - $500' },
    { value: 'industrial_dumping', label: 'Industrial Dumping', reward: '$200 - $400' },
    { value: 'oil_hydrocarbon', label: 'Oil/Hydrocarbon', reward: '$250 - $450' },
    { value: 'garbage_plastic', label: 'Garbage/Plastic', reward: '$50 - $150' },
    { value: 'other', label: 'Other', reward: 'Varies' }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await submitReport({
      ...formData,
      isAnonymous,
      knowsResponsible,
      files: files.map(f => f.name)
    });
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Report submitted successfully!' });
      setFormData({ incidentType: '', waterBody: '', specificLocation: '', description: '', responsibleParty: '' });
      setFiles([]);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="report-section">
      <div className="form-card">
        <div className="card-header">
          <h2>Submit Incident Report</h2>
          <span className="reward-badge">💰 Reward up to $500</span>
        </div>
        <p className="card-subtitle">Help identify toxic waste and illegal dumping activities</p>

        {message && (
          <div className={`alert ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Anonymous Toggle */}
          <div className="anonymous-toggle">
            <div className="toggle-header">
              <span className="toggle-label">Submit Anonymously</span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <p className="toggle-description">
              Your identity is encrypted and protected under our Whistleblower Protection Policy. 
              Anonymous reporters receive rewards via secure payment channels.
            </p>
          </div>

          {/* Incident Type */}
          <div className="form-group">
            <label>Incident Type</label>
            <select name="incidentType" value={formData.incidentType} onChange={handleInputChange} required>
              <option value="">Select type</option>
              {incidentTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            {formData.incidentType && (
              <span className="reward-hint">
                Potential reward: {incidentTypes.find(t => t.value === formData.incidentType)?.reward}
              </span>
            )}
          </div>

          {/* Water Body */}
          <div className="form-group">
            <label>Water Body</label>
            <select name="waterBody" value={formData.waterBody} onChange={handleInputChange} required>
              <option value="">Select location</option>
              <option value="nairobi_river">Nairobi River</option>
              <option value="lake_victoria">Lake Victoria</option>
              <option value="lake_naivasha">Lake Naivasha</option>
              <option value="athi_river">Athi River</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Specific Location */}
          <div className="form-group">
            <label>Specific Location</label>
            <div className="location-input">
              <span className="location-icon">📍</span>
              <input
                type="text"
                name="specificLocation"
                placeholder="Enter address or GPS coordinates"
                value={formData.specificLocation}
                onChange={handleInputChange}
                required
              />
              <button type="button" className="gps-btn">Use GPS</button>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Incident Description</label>
            <textarea
              name="description"
              rows="5"
              placeholder="Describe what you observed, including approximate time, responsible parties if known, and extent of pollution..."
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* File Upload */}
          <div className="form-group">
            <label>Evidence (Optional)</label>
            <div 
              className="file-dropzone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
            >
              <div className="upload-icon">☁️</div>
              <p className="drop-text">Drop files or click to upload</p>
              <p className="file-types">JPG, PNG, MP4 up to 50MB</p>
              <input 
                type="file" 
                multiple 
                accept="image/*,video/*"
                onChange={(e) => setFiles([...files, ...e.target.files])}
                hidden
                id="file-input"
              />
              <label htmlFor="file-input" className="file-btn">Select Files</label>
            </div>
            {files.length > 0 && (
              <div className="file-list">
                {files.map((file, idx) => (
                  <span key={idx} className="file-tag">{file.name}</span>
                ))}
              </div>
            )}
          </div>

          {/* Responsible Party */}
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={knowsResponsible}
                onChange={(e) => setKnowsResponsible(e.target.checked)}
              />
              <span className="checkmark"></span>
              I know the responsible company/individual
            </label>
            {knowsResponsible && (
              <input
                type="text"
                name="responsibleParty"
                placeholder="Enter company or individual name"
                value={formData.responsibleParty}
                onChange={handleInputChange}
                className="conditional-input"
              />
            )}
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : '⚡ Submit Secure Report'}
            </button>
            <button type="button" className="btn btn-secondary">Save Draft</button>
          </div>

          {/* Security Badges */}
          <div className="security-badges">
            <span>🔒 256-bit Encrypted</span>
            <span>🛡️ Whistleblower Protected</span>
            <span>✓ Verified in 24-48hrs</span>
          </div>
        </form>
      </div>

      {/* Reward Structure */}
      <div className="info-card reward-structure">
        <h3>🎁 Reward Structure</h3>
        <div className="reward-list">
          {incidentTypes.map(type => (
            <div key={type.value} className="reward-item">
              <span className="reward-type">{type.label}</span>
              <span className="reward-value">{type.reward}</span>
            </div>
          ))}
        </div>
        <p className="reward-note">
          Rewards are released upon verification. Anonymous reporters may receive payment via mobile money, 
          bank transfer, or cryptocurrency.
        </p>
      </div>

      {/* Recent Reports */}
      <div className="info-card recent-reports">
        <h3>Recent Verified Reports</h3>
        <div className="report-list">
          <div className="report-item verified">
            <div>
              <span className="report-type">Toxic Spillage</span>
              <span className="report-location">Nairobi River • 2h ago</span>
            </div>
            <span className="report-reward">+$350</span>
          </div>
          <div className="report-item pending">
            <div>
              <span className="report-type">Industrial Waste</span>
              <span className="report-location">Lake Victoria • 5h ago</span>
            </div>
            <span className="report-status">🟡 Pending</span>
          </div>
        </div>
      </div>

      {/* Legal Protection */}
      <div className="info-card legal-protection">
        <h3>⚖️ Legal Protection</h3>
        <p>
          All whistleblowers are protected under the HYDROS-C Environmental Protection Act. 
          We provide legal support against retaliation.
        </p>
      </div>
    </div>
  );
};

export default ReportIncident;