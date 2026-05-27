import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styles from './LosePage.module.css';
import loseSound from '../../assets/sounds/lose_sound.mp3';

const loseSoundEffect = new Audio(loseSound);

const LosePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    loseSoundEffect.play();
  }, []);

  return (
    <div className={styles.loseContainer}>
      {/* Cyberpunk Grid Background */}
      <div className={styles.cyberGrid}></div>
      <div className={styles.gradientOverlay}></div>

      {/* Main Content */}
      <main className={styles.mainContent}>
        
        {/* Defeat Title */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>DEFEAT</h1>
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

      {/* Decorative Corners and Flares */}
      <div className={styles.cornerTopLeft}></div>
      <div className={styles.cornerBottomRight}></div>
      <div className={styles.flareLeft}></div>
      <div className={styles.flareRight}></div>
    </div>
  );
};

export { LosePage };
