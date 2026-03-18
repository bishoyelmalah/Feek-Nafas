import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';
import styles from './Header.module.css';
import { useAuth } from '../../services/authService';

interface HeaderProps {
  activeLink?: 'arena' | 'leaderboard' | 'challenges' | 'profile';
}

function Header({ activeLink = 'arena' }: HeaderProps) {
  const navigate = useNavigate();
  const authContext = useAuth();

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
            <button className={styles['icon-btn']}>
              <span className="material-symbols-outlined">notifications</span>
            </button>
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
