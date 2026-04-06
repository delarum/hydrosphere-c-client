import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PartnerWithUs = () => {
  const [formData, setFormData] = useState({
    orgName: '',
    industry: '',
    orgSize: '',
    website: '',
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    partnershipTypes: [],
    location: '',
    timeline: '',
    objectives: '',
    contribution: '',
    hearAbout: '',
    comments: '',
    agreed: false
  });

  const [isVisible, setIsVisible] = useState({});
  const location = useLocation();

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to section if hash in URL
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'agreed') {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      } else {
        const updatedTypes = checked
          ? [...formData.partnershipTypes, value]
          : formData.partnershipTypes.filter((t) => t !== value);
        setFormData((prev) => ({ ...prev, partnershipTypes: updatedTypes }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const partnershipTypes = [
    { id: 'corporate', label: 'Corporate Sponsorship' },
    { id: 'technology', label: 'Technology Integration' },
    { id: 'research', label: 'Research & Development' },
    { id: 'project', label: 'Project Implementation' },
    { id: 'funding', label: 'Funding & Investment' },
    { id: 'other', label: 'Other' }
  ];

  const stats = [
    { label: 'Active Partners', value: '25+' },
    { label: 'Projects Completed', value: '7' },
    { label: 'Average Liters Treated Daily', value: '2.5M' },
    { label: 'Community Beneficiaries', value: '500K+' }
  ];

  const processSteps = [
    { number: '1', title: 'Inquiry', desc: 'Submit your partnership proposal through our secure form below.' },
    { number: '2', title: 'Assessment', desc: 'Our team evaluates alignment and explores collaboration opportunities.' },
    { number: '3', title: 'Proposal', desc: 'Receive a tailored partnership framework with clear KPIs and timelines.' },
    { number: '4', title: 'Launch', desc: 'Formalize agreement and begin collaborative implementation.' }
  ];

  const expertise = [
    {
      icon: '🏢',
      title: 'Corporate Sponsorship',
      desc: 'Align your brand with impactful water conservation projects. Ideal for CSR initiatives and ESG reporting.',
      features: ['Brand visibility on restoration sites', 'Annual impact reports', 'Employee engagement programs']
    },
    {
      icon: '⚡',
      title: 'Technology Partners',
      desc: 'Integrate your IoT, AI, or data solutions into our monitoring infrastructure. Co-develop innovative solutions.',
      features: ['API integration opportunities', 'Joint R&D projects', 'Pilot program access']
    },
    {
      icon: '🏛️',
      title: 'Government & NGOs',
      desc: 'Scale conservation efforts through public-private partnerships. Access funding and regulatory support.',
      features: ['Policy influence & advocacy', 'Multi-stakeholder projects', 'Grant collaboration']
    }
  ];

  const reasons = [
    { icon: '📊', title: 'Measurable Impact', desc: 'Real-time data dashboards tracking water quality improvements, biodiversity recovery, and pollution reduction.' },
    { icon: '🌱', title: 'ESG Compliance', desc: 'Meet sustainability reporting requirements with verified environmental outcomes and third-party audits.' },
    { icon: '🌐', title: 'Extensive Network', desc: 'Access our partnerships with Nairobi County, WWF, University of Nairobi, and 15+ specialized NGOs.' },
    { icon: '🛡️', title: 'Risk Mitigation', desc: 'Proven track record managing large-scale environmental projects with full regulatory compliance.' }
  ];

  return (
    <div className="partner-page">
      {/* Hero Section */}
      <section id="partner-hero" className="partner-hero">
        <div className="hero-content">
          <span className="hero-tag">STRATEGIC PARTNERSHIPS</span>
          <h1 className="hero-title">Partner With Purpose</h1>
          <p className="hero-subtitle">
            Join forces with Africa's leading water ecosystem restoration company. Together, we create measurable environmental impact while driving sustainable business value.
          </p>
          <div className="hero-buttons">
            <Link to="#partnership-form" className="btn btn-primary">
              Become a Partner <span className="arrow">→</span>
            </Link>
            <Link to="#opportunities" className="btn btn-secondary">
              Explore Benefits
            </Link>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section id="opportunities" className={`opportunities-section animate-on-scroll ${isVisible['opportunities'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Partnership Opportunities</h2>
            <p className="section-subtitle">Flexible collaboration models designed to align with your corporate objectives and sustainability goals.</p>
          </div>
          
          <div className="opportunities-grid">
            {expertise.map((item, index) => (
              <div key={index} className="opportunity-card">
                <div className="opportunity-icon">{item.icon}</div>
                <h3 className="opportunity-title">{item.title}</h3>
                <p className="opportunity-desc">{item.desc}</p>
                <ul className="opportunity-features">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <span className="check">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <Link to="#partnership-form" className="learn-more">
                  Learn more <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why-choose" className={`why-choose-section animate-on-scroll ${isVisible['why-choose'] ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title centered">Why Leading Organizations<br />Choose HYDROS-C</h2>
          <p className="section-subtitle centered">
            We combine cutting-edge technology with deep environmental expertise to deliver measurable results that matter to stakeholders and communities alike.
          </p>
          
          <div className="reasons-grid">
            {reasons.map((reason, index) => (
              <div key={index} className="reason-card">
                <div className="reason-icon">{reason.icon}</div>
                <h4 className="reason-title">{reason.title}</h4>
                <p className="reason-desc">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className={`stats-section animate-on-scroll ${isVisible['stats'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="stats-card">
            <h3 className="stats-title">Partnership Impact Highlights</h3>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                </div>
              ))}
            </div>
            <div className="testimonial">
              <p className="testimonial-text">
                "Our partnership with HYDROS-C has been instrumental in achieving our 2030 sustainability goals."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div className="author-info">
                  <span className="author-name">James Deng</span>
                  <span className="author-title">Sustainability Director, Corp Ltd</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className={`process-section animate-on-scroll ${isVisible['process'] ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title centered">Partnership Process</h2>
          <p className="section-subtitle centered">Four simple steps to begin your journey with us.</p>
          
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.number}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section id="partnership-form" className={`form-section animate-on-scroll ${isVisible['partnership-form'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="form-header">
            <h2 className="section-title centered">Begin Partnership Discussion</h2>
            <p className="section-subtitle centered">Complete the form below and our partnerships team will respond within 48 hours.</p>
          </div>

          <form className="partnership-form" onSubmit={handleSubmit}>
            {/* Section 1: Organization Information */}
            <div className="form-section-block">
              <div className="form-section-header">
                <span className="section-number">1</span>
                <h3>Organization Information</h3>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Organization Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="orgName"
                    placeholder="Company/Organization Ltd"
                    value={formData.orgName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row two-col">
                <div className="form-group">
                  <label>Industry Sector <span className="required">*</span></label>
                  <select name="industry" value={formData.industry} onChange={handleInputChange} required>
                    <option value="">Select Industry</option>
                    <option value="technology">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="energy">Energy</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Organization Size <span className="required">*</span></label>
                  <select name="orgSize" value={formData.orgSize} onChange={handleInputChange} required>
                    <option value="">Select Size</option>
                    <option value="1-50">1-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="url"
                    name="website"
                    placeholder="https://www.company.com"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Primary Contact */}
            <div className="form-section-block">
              <div className="form-section-header">
                <span className="section-number">2</span>
                <h3>Primary Contact</h3>
              </div>
              
              <div className="form-row two-col">
                <div className="form-group">
                  <label>Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Smith"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Job Title <span className="required">*</span></label>
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Sustainability Director"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row two-col">
                <div className="form-group">
                  <label>Email Address <span className="required">*</span></label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john.smith@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number <span className="required">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+254 700 000 000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Partnership Interests */}
            <div className="form-section-block">
              <div className="form-section-header">
                <span className="section-number">3</span>
                <h3>Partnership Interests</h3>
              </div>
              
              <div className="form-group">
                <label>Partnership Type <span className="required">*</span></label>
                <div className="checkbox-group">
                  {partnershipTypes.map((type) => (
                    <label key={type.id} className="checkbox-label">
                      <input
                        type="checkbox"
                        name="partnershipType"
                        value={type.id}
                        checked={formData.partnershipTypes.includes(type.id)}
                        onChange={handleInputChange}
                      />
                      <span className="checkbox-custom"></span>
                      {type.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-row two-col">
                <div className="form-group">
                  <label>Preferred Project Location</label>
                  <select name="location" value={formData.location} onChange={handleInputChange}>
                    <option value="">Select Region</option>
                    <option value="nairobi">Nairobi, Kenya</option>
                    <option value="kigali">Kigali, Rwanda</option>
                    <option value="dakar">Dakar, Senegal</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Proposed Timeline</label>
                  <select name="timeline" value={formData.timeline} onChange={handleInputChange}>
                    <option value="">Select Timeline</option>
                    <option value="immediate">Immediate (0-3 months)</option>
                    <option value="short">Short-term (3-6 months)</option>
                    <option value="medium">Medium-term (6-12 months)</option>
                    <option value="long">Long-term (1+ years)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Partnership Objectives <span className="required">*</span></label>
                <textarea
                  name="objectives"
                  rows="4"
                  placeholder="Please describe your organization's goals for this partnership, specific areas of interest, and expected outcomes..."
                  value={formData.objectives}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Proposed Contribution</label>
                <textarea
                  name="contribution"
                  rows="3"
                  placeholder="Describe the resources, expertise, or funding your organization can bring to the partnership..."
                  value={formData.contribution}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Section 4: Additional Information */}
            <div className="form-section-block">
              <div className="form-section-header">
                <span className="section-number">4</span>
                <h3>Additional Information</h3>
              </div>
              
              <div className="form-group">
                <label>How did you hear about HYDROS-C?</label>
                <select name="hearAbout" value={formData.hearAbout} onChange={handleInputChange}>
                  <option value="">Select Option</option>
                  <option value="search">Search Engine</option>
                  <option value="social">Social Media</option>
                  <option value="referral">Referral</option>
                  <option value="event">Event/Conference</option>
                  <option value="news">News Article</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Additional Comments</label>
                <textarea
                  name="comments"
                  rows="3"
                  placeholder="Any other information you'd like to share..."
                  value={formData.comments}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="checkbox-label agreement">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="checkbox-custom"></span>
                  <span className="agreement-text">
                    I confirm that the information provided is accurate and I am authorized to submit this partnership inquiry on behalf of my organization. I agree to the <Link to="/privacy">privacy policy</Link> and <Link to="/terms">terms of engagement</Link>. <span className="required">*</span>
                  </span>
                </label>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Submit Partnership Inquiry <span className="arrow">→</span>
            </button>
            
            <p className="form-security">
              <span className="lock">🔒</span> Your information is securely encrypted and will never be shared with third parties.
            </p>
          </form>
        </div>
      </section>

      {/* Direct Contact CTA */}
      <section className="direct-contact">
        <div className="container">
          <h2 className="section-title centered light">Prefer to Discuss Directly?</h2>
          <p className="section-subtitle centered light">
            Our partnerships team is available for confidential discussions about strategic opportunities.
          </p>
          
          <div className="contact-buttons">
            <a href="mailto:partnerships@hydrosc.com" className="contact-btn email">
              <span className="icon">✉</span>
              <div className="contact-btn-content">
                <span className="label">EMAIL US</span>
                <span className="value">partnerships@hydrosc.com</span>
              </div>
            </a>
            <a href="tel:+254700000000" className="contact-btn phone">
              <span className="icon">📞</span>
              <div className="contact-btn-content">
                <span className="label">CALL US</span>
                <span className="value">+254 700 000 000</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerWithUs;