import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';
import styles from './Header.module.css';
import { useAuth } from '../../hooks/useAuth';
import { acceptInvitation, declineInvitation, createInbox, removeInbox, checkMatchInvitations } from '../../services/invitationService';
import { type Notification } from '../../types/Notification';
import type { MatchData } from '../../types/MatchData';
import { getMatch } from '../../services/matchService';
import { useMatch } from '../../hooks/useMatch';
import { getOpponentDetails } from '../../utils/getOpponentDetails';
import type { User } from '../../types/UserData';
import { useLocation } from 'react-router-dom';

import { Notification as Toast } from '../Notification/Notification';

interface HeaderProps {
  activeLink?: 'arena' | 'leaderboard' | 'challenges' | 'profile';
}

function Header({
  activeLink = 'arena'
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, userData, userId } = useAuth();
  const { setMatchData } = useMatch();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(false);
  const [toast, setToast] = useState<{isOpen: boolean, message: string, color: string, id: number}>({
    isOpen: false, 
    message: '', 
    color: '#ec5b13',
    id: 0
  });
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const toastIdRef = useRef(0);

  useEffect(() => {
    if (location.state?.notification) {
      setToast({
        isOpen: true,
        message: location.state.notification,
        color: location.state.notificationColor || '#ec5b13',
        id: ++toastIdRef.current
      });
      // Clear state to prevent showing again on refresh
      navigate(location.pathname, { replace: true, state: { ...location.state, notification: undefined } });
    }
  }, [location.state, location.pathname, navigate]);

  const displayUsername =
    userData?.username ??
    userData?.email?.split('@')[0] ??
    'Player';

  const avatarValue = userData?.avatar_url;
  const isAvatarUrl = avatarValue?.startsWith('http');

  useEffect(() => {
    // console.log(displayUsername);
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

  useEffect(() => {
    if (!userId) {
      return;
    }
    
    const inboxChannel = createInbox(userId, async (invitation: MatchData) => {
      setHasUnreadNotification(true);
      const opponent: User | undefined = await getOpponentDetails(invitation.player1_id);
      const username = opponent?.username || 'someone';
      
      setNotifications((prev) => {
        // Avoid duplicates
        if (prev.some(n => n.matchId === invitation.id)) return prev;
        
        return [
          {
            body: `You have a new match invitation from ${username}`,
            matchId: invitation.id,
            createdAt: invitation.created_at || new Date().toISOString(),
          },
          ...prev,
        ];
      });
    });

    checkMatchInvitations(userId, async (matches: MatchData[] | null) => {
      if (!matches || matches.length === 0) {
        return;
      }

      const invitations = await Promise.all(
        matches.map(async (match: MatchData) => {
          const opponent = await getOpponentDetails(match.player1_id);
          return {
            body: `You have a new match invitation from ${opponent?.username || 'someone'}`,
            matchId: match.id,
            createdAt: match.created_at || new Date().toISOString(),
          };
        })
      );

      setHasUnreadNotification(true);
      setNotifications((prev) => {
        const newOnes = invitations.filter(inv => !prev.some(p => p.matchId === inv.matchId));
        return [...prev, ...newOnes];
      });
    });

    return () => {
      removeInbox(inboxChannel);
    };
  }, [userId]);

  const handleNotificationClick = () => {
    const nextOpenState = !isNotificationModalOpen;
    setIsNotificationModalOpen(nextOpenState);

    if (nextOpenState) {
      setHasUnreadNotification(false);
    }
  };

  const handleAcceptNotification = async (matchId: string) => {
    setIsNotificationModalOpen(false);
    const result = await acceptInvitation(matchId);
    
    if (!result.success) {
      let message = "This match is no longer available.";
      if (result.status === 'canceled') message = "The match is canceled";
      if (result.status === 'declined') message = "The invitation was declined";
      if (result.status === 'finished') message = "The match is already finished";
      
      setToast({ isOpen: true, message, color: '#ef4444', id: ++toastIdRef.current });
      setNotifications((prev) => prev.filter((n) => n.matchId !== matchId));
      return;
    }

    const data: MatchData = await getMatch(matchId);
    setMatchData(data);
    navigate(`/getReady/${matchId}`);
  };

  const handleDeclineNotification = (matchId: string) => {
    setIsNotificationModalOpen(false);
    declineInvitation(matchId);
    setNotifications((prev) => prev.filter((n) => n.matchId !== matchId));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <header>
      <div className={styles['header-content']}>
        <div className={styles['header-left']}>
          <div className={styles['logo-container']}>
            <div className={styles['logo-icon']}>
              <span className="material-symbols-outlined">terminal</span>
            </div>
            <h1 className={styles['logo-text']} onClick={()=>navigate('/home')}>
              FEEK<span className={styles['highlight']}>NAFAS</span>
            </h1>
          </div>
          <nav>
            {session && (<div style={{display:'flex'}}>
                  <button 
                      onClick={() => navigate('/')} 
                      className={`${styles.cyberBtn} ${activeLink === 'arena' ? styles.active : ''}`}
                  >
                      <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                          sports_esports
                      </span>
                      Arena
                  </button>

                  <button 
                      onClick={() => navigate('/leaderboard/10')} 
                      className={`${styles.cyberBtn} ${activeLink === 'leaderboard' ? styles.active : ''}`}
                  >
                      <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                          leaderboard
                      </span>
                      Rankings
                  </button>

                  <button 
                      onClick={() => navigate('/practice')} 
                      className={`${styles.cyberBtn} ${activeLink === 'challenges' ? styles.active : ''}`}
                  >
                      <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                          code
                      </span>
                      Practice
                  </button>
                </div>
            )}
          </nav>
        </div>
        <div className={styles['header-right']}>
          {session && (
            <div className={styles['system-status']}>
              <div className={styles['status-item']}>
                <span className={styles['status-label']}>SYSTEM_STATUS</span>
                <span className={styles['status-value']}>OPTIMAL // 24MS</span>
              </div>
            </div>
          )}
          <div className={styles['header-actions']}>
            {session ? (
              <>
                {/* Notification Center */}
                <div className={styles['notification-wrapper']}>
                  <button className={styles['icon-btn']} onClick={handleNotificationClick}>
                    <span className="material-symbols-outlined">notifications</span>
                    {hasUnreadNotification && <span className={styles['notification-badge']}>{notifications.length}</span>}
                  </button>
                  {isNotificationModalOpen && (
                    <div className={styles['notification-modal']}>
                      { notifications.length === 0 ? 
                      <div className={styles['notification-message']}>
                          <div className={styles['notification-title']}>No Notifications</div>
                      </div>
                      : sortedNotifications.map((notification, index) => {
                        return (
                          <div key={index} className={styles['notification-message']}>
                            <div className={styles['notification-title']}>New Match Invitation</div>
                            <div className={styles['notification-body']}>{notification.body}</div>
                            <div className={styles['notification-time']}>
                              {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
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

                {/* Profile Menu */}
                <div className={styles['profile-wrapper']} ref={profileMenuRef}>
                  <button
                    className={styles['profile-trigger']}
                    onClick={() => setIsProfileModalOpen((prev) => !prev)}
                    title="Profile menu"
                  >
                    <span 
                      className={styles['username']} 
                      onClick={() => navigate('/profile')} 
                      style={{ cursor: 'pointer' }}
                    >
                      {displayUsername}
                    </span>
                    <div 
                      className={styles['user-avatar']} 
                      onClick={() => navigate('/profile')} 
                      style={{ cursor: 'pointer' }}
                    >
                      {isAvatarUrl ? (
                        <img src={avatarValue} alt="avatar" />
                      ) : (
                        <div className={styles['avatar-placeholder']}>
                          {avatarValue || displayUsername?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </button>

                  {isProfileModalOpen && (
                    <div className={styles['profile-modal']}>
                      <button
                        className={styles['profile-modal-btn']}
                        onClick={handleLogout}
                        title="Logout"
                      >
                        <span className="material-symbols-outlined">logout</span>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (<div className={styles['register-btns']}>
              <button className={styles['btn-login']} onClick={handleLoginClick}>
                Login
              </button>
              <button className={styles['btn-login']} onClick={()=>{navigate('/register')}}>
                Sign up
              </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {toast.isOpen && (
        <Toast 
          key={toast.id}
          message={toast.message} 
          color={toast.color} 
          onClose={() => setToast(prev => ({ ...prev, isOpen: false }))} 
        />
      )}
    </header>
  );
}

export default Header;