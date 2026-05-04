import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';
import styles from './Header.module.css';
import { useAuth } from '../../hooks/useAuth';
import { acceptInvitation, declineInvitation } from '../../services/invitationService';
import { type Notification } from '../../types/Notification';
import type { MatchData } from '../../types/MatchData';
import { getMatch } from '../../services/matchService';
import { useMatch } from '../../hooks/useMatch';
interface HeaderProps {
  activeLink?: 'arena' | 'leaderboard' | 'challenges' | 'profile';
  notificationCount?: number;
  onNotificationOpened?: () => void;
  notifications?: Notification[]
}

function Header({
  activeLink = 'arena',
  notificationCount = 0,
  onNotificationOpened,
  notifications
}: HeaderProps) {
  const navigate = useNavigate();
  const { session, userData } = useAuth();
  const { setMatchData} = useMatch();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const displayUsername =
    userData?.username ??
    userData?.email?.split('@')[0] ??
    'Player';

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setIsProfileModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);


  const handleNotificationClick = () => {
    const nextOpenState = !isNotificationModalOpen;
    setIsNotificationModalOpen(nextOpenState);

    if (nextOpenState && notificationCount > 0) {
      onNotificationOpened?.();
    }
  };

  const handleAcceptNotification = async (matchId: string) => {
    setIsNotificationModalOpen(false);
    acceptInvitation(matchId);
    const data: MatchData = await getMatch(matchId);
    setMatchData(data);
    navigate(`/getReady/${matchId}`);
  };

  const handleDeclineNotification = (matchId: string) => {
    setIsNotificationModalOpen(false);
    declineInvitation(matchId);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSettingsClick = () => {
    setIsProfileModalOpen(false);
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
                {notificationCount > 0 && <span className={styles['notification-badge']}>{notifications?.length}</span>}
              </button>
              {isNotificationModalOpen && (
                <div className={styles['notification-modal']}>
                  { notifications?.length === 0 ? 
                  <div className={styles['notification-message']}>
                      <div className={styles['notification-title']}>No Notifications</div>
                  </div>
                  : notifications?.map((notification) => {
                    return (
                      <div className={styles['notification-message']}>
                      <div className={styles['notification-title']}>New Match Invitation</div>
                      <div className={styles['notification-body']}>{notification.body}</div>
                      <div className={styles['notification-actions']}>
                        <button className={styles['notification-accept-btn']} onClick={()=>handleAcceptNotification(notification.matchId)}>
                          Accept
                        </button>
                        <button className={styles['notification-decline-btn']} onClick={()=>handleDeclineNotification(notification.matchId)}>
                          Decline
                        </button>
                    </div>
                  </div>
                    )
                  })}
                </div>
              )}
            </div>
            <div className={styles['profile-wrapper']} ref={profileMenuRef}>
              <button
                className={styles['profile-trigger']}
                onClick={() => setIsProfileModalOpen((prev) => !prev)}
                title="Profile menu"
              >
                <span className={styles['username']}>{displayUsername}</span>
                <div className={styles['user-avatar']}>
                  <img
                    alt="Cyberpunk female player avatar with neon highlights"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL8aMK3OzFo7PkzF72qgEEZmkBXunrRdqoPfzsPOOWAA2KdUaCswjzTej_BhhTPKVKqTO-GVcwYOVMadRGVogZYiB0p33yvEit163VmW04lOGDJ-wzKqvjb-cTKExcpB0fzy-psRQVnPcxDTk5n8pSBjIhqtGdj_sycNWUnUbDa-M6Dl5euX9kPoECe1IKG47SqwBpOhOGwG11CfYVWDcDi2M-ilReVqB_s0AKD_DZxWSxHEcUuhXoc023jhaOHpCYa2HStNCBwGg"
                  />
                </div>
              </button>

              {isProfileModalOpen && (
                <div className={styles['profile-modal']}>
                  <button className={styles['profile-modal-btn']} onClick={handleSettingsClick}>
                    <span className="material-symbols-outlined">settings</span>
                    Settings
                  </button>
                  {session && (
                    <button
                      className={styles['profile-modal-btn']}
                      onClick={handleLogout}
                      title="Logout"
                    >
                      <span className="material-symbols-outlined">logout</span>
                      Logout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
