import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import "../styles/contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted:", formData);

    alert("Your message has been sent successfully!");

    setFormData({
      fullName: "",
      email: "",
      organization: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />

      <div className="contact-page">
        {/* Floating background */}
        <div className="contact-bg-shape shape-one"></div>
        <div className="contact-bg-shape shape-two"></div>
        <div className="contact-bg-shape shape-three"></div>

        {/* Hero */}
        <section className="contact-hero">
          <div className="contact-hero-badge">HYDROS-C CONTACT HUB</div>
          <h1>Let's Build Cleaner Water Systems Together</h1>
         </section>

        {/* Main Contact Section */}
        <section className="contact-main">
          {/* Left Side */}
          <div className="contact-info-panel">
            <h2>Reach Our Team</h2>
            <p>
              Connect with HYDROS-C for project partnerships, environmental
              collaborations, monitoring solutions, or general inquiries.
            </p>

            <div className="contact-info-grid">
              <div className="contact-info-card">
                <div className="icon-circle">📧</div>
                <h3>Email</h3>
                <p>info@hydrosc.com</p>
                <span>For general communication and support</span>
              </div>

              <div className="contact-info-card">
                <div className="icon-circle">📞</div>
                <h3>Phone</h3>
                <p>+254 700 000 000</p>
                <span>Mon - Fri, 8:00 AM - 5:00 PM</span>
              </div>

              <div className="contact-info-card">
                <div className="icon-circle">📍</div>
                <h3>Head Office</h3>
                <p>Nairobi, Kenya</p>
                <span>Regional operations across East & West Africa</span>
              </div>

              <div className="contact-info-card">
                <div className="icon-circle">🌍</div>
                <h3>Partnerships</h3>
                <p>NGOs • Counties • Institutions</p>
                <span>We welcome strategic collaborations</span>
              </div>
            </div>

            <div className="trust-box">
              <h3>Why Reach Out?</h3>
              <ul>
                <li>Project and research partnerships</li>
                <li>Environmental data and monitoring discussions</li>
                <li>Community and restoration initiatives</li>
                <li>Investment and sponsorship opportunities</li>
              </ul>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="contact-form-panel">
            <h2>Send a Message</h2>
            <p>We usually respond within 1-2 business days.</p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Organization</label>
                  <input
                    type="text"
                    name="organization"
                    placeholder="Your company / NGO / institution"
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Message</label>
                <textarea
                  name="message"
                  rows="7"
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="contact-cta">
          <h2>Water restoration needs collaboration.</h2>
          <p>
            HYDROS-C works best when science, communities, and action move
            together.
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Contact;