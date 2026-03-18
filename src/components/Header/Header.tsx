import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';
import styles from './Header.module.css';
import { useAuth } from '../../services/authService';
import { type MatchData } from '../../types/MatchData';

interface HeaderProps {
  activeLink?: 'arena' | 'leaderboard' | 'challenges' | 'profile';
  notificationCount?: number;
  onNotificationOpened?: () => void;
  notification?: MatchData
}

function Header({
  activeLink = 'arena',
  notificationCount = 0,
  onNotificationOpened,
  notification
}: HeaderProps) {
  const navigate = useNavigate();
  const authContext = useAuth();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const handleNotificationClick = () => {
    const nextOpenState = !isNotificationModalOpen;
    setIsNotificationModalOpen(nextOpenState);

    if (nextOpenState && notificationCount > 0) {
      onNotificationOpened?.();
    }
  };

  const handleAcceptNotification = () => {
    setIsNotificationModalOpen(false);
  };

  const handleDeclineNotification = () => {
    setIsNotificationModalOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  return (
    <header>
      <div className={styles['header-content']}>
        <div className={styles['header-left']}>
          <div className={styles['logo-container']}>
            <div className={styles['logo-icon']}>
              <span className="material-symbols-outlined">terminal</span>
            </div>
            <h1 className={styles['logo-text']}>
              FEEK<span className={styles['highlight']}>NAFAS</span>
            </h1>
          </div>
          <nav>
            <a className={activeLink === 'arena' ? styles['active'] : ''} href="#">
              Arena
            </a>
            <a className={activeLink === 'leaderboard' ? styles['active'] : ''} href="#">
              Leaderboard
            </a>
            <a className={activeLink === 'challenges' ? styles['active'] : ''} href="#">
              Challenges
            </a>
            <a className={activeLink === 'profile' ? styles['active'] : ''} href="#">
              Profile
            </a>
          </nav>
        </div>
        <div className={styles['header-right']}>
          <div className={styles['system-status']}>
            <div className={styles['status-item']}>
              <span className={styles['status-label']}>SYSTEM_STATUS</span>
              <span className={styles['status-value']}>OPTIMAL // 24MS</span>
            </div>
            <div className={styles['status-item']}>
              <span className={styles['status-label']}>PLAYERS_ONLINE</span>
              <span className={styles['status-value']}>14,204</span>
            </div>
          </div>
          <div className={styles['header-actions']}>
            <div className={styles['notification-wrapper']}>
              <button className={styles['icon-btn']} onClick={handleNotificationClick}>
                <span className="material-symbols-outlined">notifications</span>
                {notificationCount > 0 && <span className={styles['notification-badge']}>1</span>}
              </button>
              {isNotificationModalOpen && (
                <div className={styles['notification-modal']}>
                  <div className={styles['notification-title']}>New Notification</div>
                  <div className={styles['notification-body']}>You have a new match invitation from {notification?.player1_id}</div>
                  <div className={styles['notification-actions']}>
                    <button className={styles['notification-accept-btn']} onClick={handleAcceptNotification}>
                      Accept
                    </button>
                    <button className={styles['notification-decline-btn']} onClick={handleDeclineNotification}>
                      Decline
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button className={styles['icon-btn']}>
              <span className="material-symbols-outlined">settings</span>
            </button>
            {authContext?.session && (
              <button className={styles['icon-btn']} onClick={handleLogout} title="Logout">
                <span className="material-symbols-outlined">logout</span>
              </button>
            )}
            <div className={styles['user-avatar']}>
              <img
                alt="Cyberpunk female player avatar with neon highlights"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL8aMK3OzFo7PkzF72qgEEZmkBXunrRdqoPfzsPOOWAA2KdUaCswjzTej_BhhTPKVKqTO-GVcwYOVMadRGVogZYiB0p33yvEit163VmW04lOGDJ-wzKqvjb-cTKExcpB0fzy-psRQVnPcxDTk5n8pSBjIhqtGdj_sycNWUnUbDa-M6Dl5euX9kPoECe1IKG47SqwBpOhOGwG11CfYVWDcDi2M-ilReVqB_s0AKD_DZxWSxHEcUuhXoc023jhaOHpCYa2HStNCBwGg"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
