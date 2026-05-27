import React, { useEffect, useRef } from 'react';
import styles from './Notification.module.css';

interface NotificationProps {
  message: string;
  color?: string;
  duration?: number;
  onClose: () => void;
}

export function Notification({ 
  message, 
  color = '#ec5b13', 
  duration = 5000, 
  onClose 
}: NotificationProps) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseRef.current();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, message]);

  return (
    <div 
      className={styles.notification} 
      style={{ borderLeftColor: color }}
    >
      <div className={styles.content}>
        <span className="material-symbols-outlined" style={{ color }}>
          info
        </span>
        <p className={styles.message}>{message}</p>
      </div>
      <button className={styles.closeBtn} onClick={onClose}>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div 
        className={styles.progress} 
        style={{ 
          backgroundColor: color,
          animationDuration: `${duration}ms` 
        }} 
      />
    </div>
  );
}
