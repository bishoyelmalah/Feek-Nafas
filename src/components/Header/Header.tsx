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
import { getAvatarUrl } from '../../services/avatarService';
import { supabase } from '../../lib/supabase';

interface HeaderProps {
  activeLink?: 'arena' | 'leaderboard' | 'challenges' | 'profile';
  notificationCount?: number;
  onNotificationOpened?: () => void;
  notifications?: Notification[]
}

function Header({
  activeLink = 'arena' ,
  notificationCount = 0,
  onNotificationOpened,
  notifications
}: HeaderProps) {
  const navigate = useNavigate();
  const { session, userData } = useAuth();
  const { setMatchData} = useMatch();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const displayUsername =
    userData?.username ??
    userData?.email?.split('@')[0] ??
    'Player';

  const getHeaderUserAvatar = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("No user found");
      return null;
    }

    const { data, error } = await supabase
      .from("users")
      .select("avatar_url")
      .eq("id", user.id)
      .single();

    if (error || !data?.avatar_url) {
      console.error("No avatar found");
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(data.avatar_url);

    return publicUrlData.publicUrl;
  };

  useEffect(() => {
    const loadAvatar = async () => {
      const url = await getHeaderUserAvatar();
      if (url) {
        setAvatarUrl(url);
      }
    };
    loadAvatar();
  }, [session]);

  useEffect(() => {
    const handleAvatarUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.userId === session?.user?.id) {
        setTimeout(() => {
          getHeaderUserAvatar().then(url => {
            if (url) setAvatarUrl(url);
          });
        }, 500);
      }
    };
    window.addEventListener('avatarUpdated', handleAvatarUpdate);
    return () => window.removeEventListener('avatarUpdated', handleAvatarUpdate);
  }, [session]);

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
    navigate('/settings');
    setIsProfileModalOpen(false);
  };

  const handleLoginClick = () => {
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
                    {notificationCount > 0 && <span className={styles['notification-badge']}>{notifications?.length}</span>}
                  </button>
                  {isNotificationModalOpen && (
                    <div className={styles['notification-modal']}>
                      { notifications?.length === 0 ? 
                      <div className={styles['notification-message']}>
                          <div className={styles['notification-title']}>No Notifications</div>
                      </div>
                      : notifications?.map((notification, index) => {
                        return (
                          <div key={index} className={styles['notification-message']}>
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

                {/* Settings Button */}
                <button className={styles['icon-btn']} onClick={handleSettingsClick} title="Settings">
                  <span className="material-symbols-outlined">settings</span>
                </button>

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
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="avatar" />
                      ) : (
                        <div className={styles['avatar-placeholder']}>
                          {displayUsername?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </button>

                  {isProfileModalOpen && (
                    <div className={styles['profile-modal']}>
                      <button className={styles['profile-modal-btn']} onClick={handleSettingsClick}>
                        <span className="material-symbols-outlined">settings</span>
                        Settings
                      </button>
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
    </header>
  );
}

export default Header;