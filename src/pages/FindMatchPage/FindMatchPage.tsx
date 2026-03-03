import './FindMatchPage.css';

export function FindMatchPage() {
    return (
        <div className="find-match-page">
            {/* ── Header ── */}
            <header className="header">
                <div className="header-logo">
                    <div className="header-logo-icon">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor" />
                            <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="header-logo-text">Feek Nafas</h2>
                </div>

                <nav className="header-nav">
                    <a className="header-nav-link active" href="#">Lobby</a>
                    <a className="header-nav-link" href="#">Leaderboards</a>
                    <a className="header-nav-link" href="#">Rewards</a>
                    <a className="header-nav-link" href="#">Armory</a>
                </nav>

                <div className="header-actions">
                    <div className="header-currency">
                        <span className="material-symbols-outlined header-currency-icon">monetization_on</span>
                        <span className="header-currency-value">1,240</span>
                    </div>
                    <div className="header-user">
                        <div className="header-user-info">
                            <p className="header-user-role">Operator</p>
                            <p className="header-username">RAVEN_04</p>
                        </div>
                        <div className="header-avatar">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7nlUXnhWWan9M7MCOpNDmdoigIq8umIf7nQqL1J5TqJ8yt9HoNT4qjGVXaISZMr4O0DqqIwcKwG0shYrSvRDG3rK52QHGxYquKbK2iz2xwD1w8gGMSqETngEU4zToRbMhWNJRqMdIYoatGixvIKBYx4NekHZgS8iaUD11KTeOC6guWdlV_b7LqePzjjjz14UCpFqqwH1McuEjcoInHzuTVYxVFgNQLdYi2DMGl74HI5rqrpNYn9kkcQrXMo8breQRCQNoS40hAmQ"
                                alt="Cyberpunk soldier portrait with orange glowing eyes"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* ── Main Layout ── */}
            <main className="main-layout">

                {/* ── Left Sidebar: Recent Matches ── */}
                <div className="sidebar-left">
                    <div className="sidebar-header">
                        <h3 className="sidebar-title">Recent Encounters</h3>
                        <span className="sidebar-version">HISTORY_V2.4</span>
                    </div>

                    <div className="match-list">
                        {/* Victory */}
                        <div className="match-card victory">
                            <div className="match-card-content">
                                <span className="match-card-result victory">Victory</span>
                                <span className="match-card-username">Z3RO_PULSE</span>
                                <span className="match-card-map">Map: Neo Tokyo</span>
                            </div>
                            <div className="match-card-meta">
                                <p className="match-card-rp victory">+24 RP</p>
                                <p className="match-card-time">2m ago</p>
                            </div>
                        </div>

                        {/* Defeat */}
                        <div className="match-card defeat">
                            <div className="match-card-content">
                                <span className="match-card-result defeat">Defeat</span>
                                <span className="match-card-username">GHOST_SHELL</span>
                                <span className="match-card-map">Map: Sector 7</span>
                            </div>
                            <div className="match-card-meta">
                                <p className="match-card-rp defeat">-18 RP</p>
                                <p className="match-card-time">15m ago</p>
                            </div>
                        </div>

                        {/* Victory */}
                        <div className="match-card victory">
                            <div className="match-card-content">
                                <span className="match-card-result victory">Victory</span>
                                <span className="match-card-username">K1LL_SWITCH</span>
                                <span className="match-card-map">Map: The Void</span>
                            </div>
                            <div className="match-card-meta">
                                <p className="match-card-rp victory">+21 RP</p>
                                <p className="match-card-time">42m ago</p>
                            </div>
                        </div>

                        {/* Victory (dim) */}
                        <div className="match-card victory dim">
                            <div className="match-card-content">
                                <span className="match-card-result victory">Victory</span>
                                <span className="match-card-username">VOID_WALKER</span>
                                <span className="match-card-map">Map: Neon Grid</span>
                            </div>
                            <div className="match-card-meta">
                                <p className="match-card-rp victory">+26 RP</p>
                                <p className="match-card-time">1h ago</p>
                            </div>
                        </div>
                    </div>

                    {/* Rank Card */}
                    <div className="rank-card">
                        <div className="rank-card-header">
                            <div className="rank-badge">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo7qQ56kLtpoY3QVByb-UBVb3XDsQnOmfw4qoUiyFMqr825RvdSpgidKcFPQlqRMeR_OYhUNLa4oyTfAyNZVjdcpWpgFv0lHRDI0WmsBbnPE1hAcaBoXziFS3ujhfstCZP-ocPBDdK6ZOr2oXAWwSawiWl0-VWgHwxcewBo_RB5hOjlZiYtbNqOz4kBZuil17Uy7nGMAoypdYq42NMxTp7q2yVsSE06VnRy57AwkeGsbNy3AfxQVMovPdC-VfMXs49cfJ9T7SaEz0"
                                    alt="Shiny diamond rank badge with neon orange outline"
                                />
                            </div>
                            <div>
                                <h4 className="rank-name">DIAMOND III</h4>
                                <p className="rank-elo">ELO: 2,450</p>
                            </div>
                        </div>
                        <div className="rank-progress">
                            <div className="rank-progress-header">
                                <span className="rank-progress-label">Tier Progress</span>
                                <span className="rank-progress-value">75%</span>
                            </div>
                            <div className="rank-progress-bar-bg">
                                <div className="rank-progress-bar-fill" />
                            </div>
                            <p className="rank-progress-note">150 RP remaining to Master Tier</p>
                        </div>
                    </div>
                </div>

                {/* ── Center: Matchmaking Hub ── */}
                <div className="matchmaking-center">
                    {/* Faded background status log */}
                    <div className="bg-status-log">
                        <p>SEARCHING_FOR_OPPONENTS...</p>
                        <p>PING: 24MS | REGION: EU_WEST_1</p>
                        <p>PROTOCOL_LOBBY_V4.2.0_LOADED</p>
                        <p>WAITING_FOR_HANDSHAKE...</p>
                        <p>QUERYING_MATCHMAKING_SERVER_14.22.1...</p>
                        <p>STABILIZING_NETWORK_LAYER...</p>
                        <p>THREAT_LEVEL_CRITICAL_DETECTED</p>
                        <p>SYTEM_CORE_ONLINE</p>
                        <p>SEARCHING_FOR_OPPONENTS...</p>
                        <p>LATENCY_CHECK_PASSED</p>
                    </div>

                    {/* Find Match Button */}
                    <div className="find-match-btn-wrapper">
                        <div className="btn-outer-ring" />
                        <div className="btn-inner-ring" />
                        <button className="find-match-btn find-match-glow">
                            <div className="find-match-btn-gradient" />
                            <div className="scanline" />
                            <span className="material-symbols-outlined find-match-btn-icon">radar</span>
                            <h2 className="find-match-btn-title glitch-text">Find Match</h2>
                            <p className="find-match-btn-subtitle">Ranked 1v1</p>
                            <div className="btn-corner-tl" />
                            <div className="btn-corner-br" />
                        </button>
                    </div>

                    {/* Status below button */}
                    <div className="match-status">
                        <p className="match-status-text">Ready for engagement</p>
                        <div className="match-status-badges">
                            <div className="match-status-badge">
                                <div className="badge-dot" />
                                <span className="badge-text">Search Active</span>
                            </div>
                            <div className="match-status-badge">
                                <span className="material-symbols-outlined badge-globe-icon">public</span>
                                <span className="badge-text">Global Queue</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right Sidebar: Stats & Info ── */}
                <div className="sidebar-right">
                    <div className="sidebar-header">
                        <h3 className="sidebar-title">Performance Core</h3>
                        <span className="sidebar-version">SEASON_04</span>
                    </div>

                    {/* Stats Grid */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-label">Win Rate</span>
                            <span className="stat-value-xl neon">68%</span>
                            <span className="stat-sub neon">+2.4%</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">K/D Ratio</span>
                            <span className="stat-value-xl">1.42</span>
                            <span className="stat-sub muted">LIFETIME</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Peak Rank</span>
                            <span className="stat-value-lg">Diamond I</span>
                            <span className="stat-sub muted">SEASON_03</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Matches</span>
                            <span className="stat-value-xl">428</span>
                            <span className="stat-sub muted">PLAYED</span>
                        </div>
                    </div>

                    {/* Season Card */}
                    <div className="season-card">
                        <div className="season-card-decoration" />
                        <div className="season-card-header">
                            <span className="material-symbols-outlined season-card-icon">event_upcoming</span>
                            <h4 className="season-card-title">Season End</h4>
                        </div>
                        <div className="season-card-body">
                            <div className="season-countdown">
                                <span className="season-countdown-value">12d 04h</span>
                                <span className="season-countdown-label">Time Remaining</span>
                            </div>
                            <button className="season-rewards-btn">View Rewards</button>
                        </div>
                    </div>

                    {/* Private Duel */}
                    <div className="private-duel">
                        <div className="private-duel-header">
                            <h3 className="private-duel-title">Private Duel</h3>
                            <span className="material-symbols-outlined private-duel-icon">swords</span>
                        </div>
                        <div className="search-wrapper">
                            <input
                                className="search-input"
                                placeholder="SEARCH USERNAME..."
                                type="text"
                            />
                            <span className="material-symbols-outlined search-icon">search</span>
                        </div>
                        <div className="rivals-section">
                            <p className="rivals-label">Recent Rivals</p>
                            <div className="rivals-list">
                                {/* Online rival */}
                                <div className="rival-item">
                                    <div className="rival-left">
                                        <div className="rival-status-dot online" />
                                        <span className="rival-name">SYNTH_STRIKER</span>
                                    </div>
                                    <button className="rival-invite-btn">Invite</button>
                                </div>
                                {/* Offline rival */}
                                <div className="rival-item">
                                    <div className="rival-left">
                                        <div className="rival-status-dot offline" />
                                        <span className="rival-name offline">NEON_GHOST</span>
                                    </div>
                                    <button className="rival-offline-btn" disabled>Offline</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Log */}
                    <div className="system-log">
                        <div className="system-log-header">
                            <span className="system-log-title">System Log</span>
                            <div className="system-log-dot" />
                        </div>
                        <div className="system-log-entries">
                            <p className="log-entry-success">
                                <span className="log-timestamp">[12:44:02]</span> AUTH_SUCCESS_TOKEN_GRANTED
                            </p>
                            <p>
                                <span className="log-timestamp">[12:44:05]</span> CONNECTING_TO_EU_W1...
                            </p>
                            <p>
                                <span className="log-timestamp">[12:44:08]</span> LATENCY: 22MS (STABLE)
                            </p>
                            <p className="log-entry-error">
                                <span className="log-timestamp">[12:45:12]</span> MATCH_FOUND_HANDSHAKE_ERR
                            </p>
                            <p>
                                <span className="log-timestamp">[12:45:15]</span> RETRYING_MATCHMAKING...
                            </p>
                            <p>
                                <span className="log-timestamp">[12:46:01]</span> QUEUE_POSITION: 04/1024
                            </p>
                            <p className="log-entry-active">
                                <span className="log-timestamp">[12:47:33]</span> SCANNING_FOR_RIVALS_
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer className="footer">
                <div className="footer-actions">
                    <button className="footer-btn">
                        <span className="material-symbols-outlined footer-btn-icon">settings</span>
                        <span className="footer-btn-text">Settings</span>
                    </button>
                    <button className="footer-btn">
                        <span className="material-symbols-outlined footer-btn-icon">forum</span>
                        <span className="footer-btn-text">Comms</span>
                    </button>
                    <button className="footer-btn">
                        <span className="material-symbols-outlined footer-btn-icon">help</span>
                        <span className="footer-btn-text">Support</span>
                    </button>
                </div>
                <div className="footer-right">
                    <span className="footer-version">V.1.24.4_BUILD_STABLE</span>
                    <div className="footer-dots">
                        <div className="footer-dot primary" />
                        <div className="footer-dot mid" />
                        <div className="footer-dot faint" />
                    </div>
                </div>
            </footer>

            {/* Vignette overlay */}
            <div className="vignette-overlay" />
        </div>
    );
}
