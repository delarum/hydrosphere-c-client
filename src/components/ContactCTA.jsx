import React from "react";

function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="partner-container text-center">
        <h2>Prefer to Discuss Directly?</h2>
        <p>
          Our partnerships team is available for confidential discussions about
          strategic opportunities.
        </p>

        <div className="cta-cards">
          <a href="mailto:partnerships@hydrosc.com" className="cta-card">
            <i className="fas fa-envelope"></i>
            <div>
              <small>Email Us</small>
              <strong>partnerships@hydrosc.com</strong>
            </div>
          </a>

          <a href="tel:+254700000000" className="cta-card">
            <i className="fas fa-phone"></i>
            <div>
              <small>Call Us</small>
              <strong>+254 700 000 000</strong>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;