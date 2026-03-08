// export function VictoryPage() {
//     return (
//         <div>This is Victory Page</div>
//     )
// }

import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './VictoryPage.module.css';

const VictoryPage: React.FC = () => {
  return (
    <div className={styles.victoryContainer}>
      {/* Cyberpunk Grid Background */}
      <div className={styles.cyberGrid}></div>
      <div className={styles.gradientOverlay}></div>

      {/* Global Header */}
      <Header />

      {/* Main Content */}
      <main className={styles.mainContent}>
        
        {/* Victory Title */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>VICTORY</h1>
          <div className={styles.titleUnderline}></div>
        </div>

        {/* Player Showcase Card */}
        <div className={styles.showcaseContainer}>
          
          {/* Center Stage Avatar */}
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarGlow}></div>
            <div className={styles.avatarContainer}>
              <img
                className={styles.avatarImage}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLVZ2EwgfiNxqrHAWs3c5PVuju2_10KuK-ZS_9tpsZWkjyDQn3ieXAJ4TXSmRkP-LUXMlX0E1oL_OLIpI0EnTBNuqQq1wCZQiIuPbWPiOOnPsFCjUTTUmbRHu8TmWSKzyogjT8IlJ6ReGMCRTm7TX927mrT2VGRT9yZHerEnzN8-_mQEfIoNOa6Zk4S6Cc2yZGNckdpfjm2pZ8tUCl4k1w6QJ4BJVTGMWJMyvFKekiYNGbp54vIklPuMU32VcomuATQwIPIIs_4Fg"
                alt="Player Profile Large"
              />
            </div>
            {/* Rating Increase Badge */}
            <div className={styles.ratingBadge}>+25 RATING</div>
          </div>

          {/* Match Statistics */}
          <div className={styles.glassPanel}>
            <div className={styles.panelHeader}>
              <p className={styles.panelSubtitle}>Match Summary</p>
              <h3 className={styles.panelTitle}>CHALLENGE COMPLETE</h3>
            </div>
            
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Problem Solved</span>
                <span className={`${styles.statValue} ${styles.textNeon}`}>12:45</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Points Earned</span>
                <span className={`${styles.statValue} ${styles.textPrimary}`}>500</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Accuracy</span>
                <span className={styles.statValue}>100%</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Rank Placement</span>
                <span className={styles.statValue}>#1 / 100</span>
              </div>
            </div>
            
            <div className={styles.progressBox}>
              <div className={styles.progressHeader}>
                <span className={styles.textPrimary}>Grandmaster Progress</span>
                <span>750/1000</span>
              </div>
              <div className={styles.progressBarTrack}>
                <div className={styles.progressBarFill} style={{ width: '75%' }}></div>
              </div>
              <p className={styles.progressHint}>250 points to Level Up</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionsContainer}>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>
            <span className="material-symbols-outlined">home</span>
            RETURN TO LOBBY
          </button>
          <button className={`${styles.btn} ${styles.btnSecondary}`}>
            <span className="material-symbols-outlined">videocam</span>
            SAVE REPLAY
          </button>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Decorative Corners */}
      <div className={styles.cornerTopLeft}></div>
      <div className={styles.cornerBottomRight}></div>
    </div>
  );
};

export { VictoryPage };