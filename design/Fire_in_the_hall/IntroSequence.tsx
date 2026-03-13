import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './IntroSequence.css';

/**
 * Feek Nafas: Cinematic Intro Component
 * Features: Cyberpunk grid, Gravity-based bomb drop, Screen-shake blast, Neon reveal.
 */
const IntroSequence: React.FC = () => {
  const [phase, setPhase] = useState<'falling' | 'blast' | 'reveal'>('falling');

  useEffect(() => {
    // Phase 1: The drop (1.2s)
    const blastTimer = setTimeout(() => {
      setPhase('blast');
    }, 1200);

    // Phase 2: The branding reveal (after blast)
    const revealTimer = setTimeout(() => {
      setPhase('reveal');
    }, 1700);

    return () => {
      clearTimeout(blastTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  return (
    <div className="intro-container">
      {/* 1. Global Scanline & Grid Background */}
      <div className="scanline-overlay" />
      <div className="grid-overlay-intro" />
      <div className="gradient-overlay" />

      {/* 2. The Projectile (Fire in the Hall) */}
      <AnimatePresence>
        {phase === 'falling' && (
          <motion.div
            initial={{ scale: 10, y: -1500, opacity: 0, rotate: 45 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.13, 1, 0.4, 1] }}
            className="projectile-container"
          >
            {/* The Core */}
            <div className="projectile-core">
              <div className="projectile-inner">
                <span className="material-symbols-outlined projectile-icon">warning</span>
              </div>
            </div>
            {/* Trailing "Fire" Effect */}
            <div className="projectile-trail" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. The Blast (Impact Explosion) */}
      <AnimatePresence>
        {phase === 'blast' && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 25, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="blast-effect"
          />
        )}
      </AnimatePresence>

      {/* 4. The Branding Reveal */}
      <AnimatePresence>
        {phase === 'reveal' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            className="reveal-container"
          >
            {/* Terminal Logo on the Left Container */}
            <div className="branding-wrapper">
              <div className="terminal-box">
                <span className="material-symbols-outlined terminal-icon">terminal</span>
              </div>
              <div className="title-wrapper">
                <h1 className="main-title">
                  Feek Nafas
                </h1>
                <div className="title-underline" />
              </div>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="breach-text"
            >
              // Breach Successful. System Ready.
            </motion.p>

            <motion.a
              href="/arena"
              whileHover={{ scale: 1.05, letterSpacing: '0.6em', backgroundColor: '#fff', color: '#000' }}
              whileTap={{ scale: 0.95 }}
              className="initialize-button"
            >
              INITIALIZE SYSTEM
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Shake Effect */}
      {phase === 'blast' && <style>{`
        body {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
          transform: translate3d(0, 0, 0);
        }
      `}</style>}
    </div>
  );
};

export default IntroSequence;
