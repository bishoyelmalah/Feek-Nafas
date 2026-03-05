import React from 'react';
import './Header.css';

interface HeaderProps {
  activeLink?: 'arena' | 'leaderboard' | 'challenges' | 'profile';
}

const Header = ({ activeLink = 'arena' }: HeaderProps) => {
  return (
    <header>
      <div className="header-content">
        <div className="header-left">
          <div className="logo-container">
            <div className="logo-icon">
              <span className="material-symbols-outlined">terminal</span>
            </div>
            <h1 className="logo-text">
              FEEK<span className="highlight">NAFAS</span>
            </h1>
          </div>
          <nav>
            <a className={activeLink === 'arena' ? 'active' : ''} href="#">
              Arena
            </a>
            <a className={activeLink === 'leaderboard' ? 'active' : ''} href="#">
              Leaderboard
            </a>
            <a className={activeLink === 'challenges' ? 'active' : ''} href="#">
              Challenges
            </a>
            <a className={activeLink === 'profile' ? 'active' : ''} href="#">
              Profile
            </a>
          </nav>
        </div>
        <div className="header-right">
          <div className="system-status">
            <div className="status-item">
              <span className="status-label">SYSTEM_STATUS</span>
              <span className="status-value">OPTIMAL // 24MS</span>
            </div>
            <div className="status-item">
              <span className="status-label">PLAYERS_ONLINE</span>
              <span className="status-value">14,204</span>
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-btn">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="icon-btn">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="user-avatar">
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
