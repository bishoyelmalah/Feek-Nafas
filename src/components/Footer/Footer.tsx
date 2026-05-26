import React from "react";
import styles from "./Footer.module.css";

function Footer(){
  return (
    <footer>
      <div className={styles['footer-content']}>

        <div className={styles['footer-brand']}>
          <div className={styles['footer-logo']}>

            <div className={styles['footer-logo-icon']}>
              <span className="material-symbols-outlined">terminal</span>
            </div>

            <h1 className={styles['footer-logo-text']}>
              FEEK<span className={styles['highlight']}>NAFAS</span>
            </h1>

          </div>

          <p className={styles['footer-description']}>
            The future of competitive software engineering. Built by developers,
            for developers. Enter the arena and claim your spot in history.
          </p>
        </div>

        <div className={styles['footer-links']}>

          <div className={styles['footer-links-section']}>
            <h5 className={styles['footer-links-title']}>Platform</h5>

            <ul className={styles['footer-links-list']}>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Access</a></li>
              <li><a href="#">Tournaments</a></li>
            </ul>
          </div>

          <div className={styles['footer-links-section']}>
            <h5 className={styles['footer-links-title']}>Company</h5>

            <ul className={styles['footer-links-list']}>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

        </div>

        <div className={styles['footer-newsletter']}>

          <h5 className={styles['footer-newsletter-title']}>Stay Updated</h5>

          <div className={styles['newsletter-form']}>

            <input
              className={styles['newsletter-input']}
              placeholder="TERMINAL_ID@EMAIL.COM"
              type="text"
            />

            <button className={styles['newsletter-btn']}>
              <span className="material-symbols-outlined">send</span>
            </button>

          </div>

          <div className={styles['social-links']}>

            <a className={styles['social-link']} href="#">
              <span className="material-symbols-outlined">public</span>
            </a>

            <a className={styles['social-link']} href="#">
              <span className="material-symbols-outlined">alternate_email</span>
            </a>

          </div>

        </div>

      </div>

      <div className={styles['footer-bottom']}>
        <p>© 2026 FEEK_NAFAS // ALL_RIGHTS_RESERVED // SYSTEM_VERSION_1.0.0</p>
        <p>CONNECTED_FROM: 192.168.1.1 // LOCATION: ENCRYPTED</p>
      </div>
    </footer>
  );
};

export default Footer;