import React from 'react';
import { useNavigate } from 'react-router';
import styles from './DrawPage.module.css';

export const DrawPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.drawContainer}>
      {/* Cyberpunk Grid Background */}
      <div className={styles.cyberGrid}></div>
      <div className={styles.gradientOverlay}></div>

      {/* Main Content */}
      <main className={styles.mainContent}>
        
        {/* Draw Title */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>DRAW</h1>
          <div className={styles.titleUnderline}></div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionsContainer}>
          <button 
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => navigate('/home')}
          >
            <span className="material-symbols-outlined">home</span>
            RETURN TO LOBBY
          </button>
        </div>
      </main>

      {/* Decorative Corners */}
      <div className={styles.cornerTopLeft}></div>
      <div className={styles.cornerBottomRight}></div>
    </div>
  );
};
