import React from "react";
import "./Footer.css";

function Footer(){
  return (
    <footer>
      <div className="footer-content">

        <div className="footer-brand">
          <div className="footer-logo">

            <div className="footer-logo-icon">
              <span className="material-symbols-outlined">terminal</span>
            </div>

            <h1 className="footer-logo-text">
              FEEK<span className="highlight">NAFAS</span>
            </h1>

          </div>

          <p className="footer-description">
            The future of competitive software engineering. Built by developers,
            for developers. Enter the arena and claim your spot in history.
          </p>
        </div>

        <div className="footer-links">

          <div className="footer-links-section">
            <h5 className="footer-links-title">Platform</h5>

            <ul className="footer-links-list">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Access</a></li>
              <li><a href="#">Tournaments</a></li>
            </ul>
          </div>

          <div className="footer-links-section">
            <h5 className="footer-links-title">Company</h5>

            <ul className="footer-links-list">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-newsletter">

          <h5 className="footer-newsletter-title">Stay Updated</h5>

          <div className="newsletter-form">

            <input
              className="newsletter-input"
              placeholder="TERMINAL_ID@EMAIL.COM"
              type="text"
            />

            <button className="newsletter-btn">
              <span className="material-symbols-outlined">send</span>
            </button>

          </div>

          <div className="social-links">

            <a className="social-link" href="#">
              <span className="material-symbols-outlined">public</span>
            </a>

            <a className="social-link" href="#">
              <span className="material-symbols-outlined">alternate_email</span>
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2024 FEEK_NAFAS // ALL_RIGHTS_RESERVED // SYSTEM_VERSION_4.0.2</p>
        <p>CONNECTED_FROM: 192.168.1.1 // LOCATION: ENCRYPTED</p>
      </div>
    </footer>
  );
};

export default Footer;