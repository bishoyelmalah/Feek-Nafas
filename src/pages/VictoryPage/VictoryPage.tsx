import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styles from './VictoryPage.module.css';
import victorySound from '../../assets/sounds/victory_sound.mp3';

const victorySoundEffect = new Audio(victorySound);


const VictoryPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    victorySoundEffect.play()
  }, [])

  return (
    <div className={styles.victoryContainer}>
      {/* Cyberpunk Grid Background */}
      <div className={styles.cyberGrid}></div>
      <div className={styles.gradientOverlay}></div>

      {/* Main Content */}
      <main className={styles.mainContent}>
        
        {/* Victory Title */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>VICTORY</h1>
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

export { VictoryPage };
