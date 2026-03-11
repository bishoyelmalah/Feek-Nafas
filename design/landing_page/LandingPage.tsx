import React from 'react';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page grid-overlay">
            {/* Navigation */}
            <header className="header">
                <div className="max-w-7xl header-content">
                    <div className="header-left">
                        <div className="logo">
                            <span className="material-symbols-outlined logo-icon">terminal</span>
                            <h2 className="logo-text">Feek Nafas</h2>
                        </div>
                        <nav className="nav">
                            <a className="nav-link" href="#arena">Arena</a>
                            <a className="nav-link" href="#leaderboard">Leaderboard</a>
                            <a className="nav-link" href="#training">Training</a>
                            <a className="nav-link" href="#nodes">Nodes</a>
                        </nav>
                    </div>
                    <div className="header-right">
                        <div className="search-box">
                            <span className="material-symbols-outlined search-icon">search</span>
                            <input className="search-input" placeholder="Search Matrix..." type="text" />
                        </div>
                        <button className="btn-primary neon-border">
                            Enter Arena
                        </button>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="hero-section">
                    <div 
                        className="hero-bg" 
                        style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAECOzcNfS4cUGBMt1SRbV9xcEw-BuOGnWCA_fruxTfWegS-neXuR36XQbBzEOzgcpvJSBuqV8YGIt6qyS4CerU8h5bH6_C3tlPWuEXNOsQL7saNUtCJsPV57dGdN6Szvjo9E9FIzpiMticw2pl_L2RMfwi2BTmIu_vx1WbA6qjZC-32VU7fbRYMn4OKQxrG09PnaMtBuVe5nzhRB85CTEPDnyeNwcg6aqEUas-vQ2XG84ZLaNu2XKquvbSIfHERCfq4NjZ_g_hfcI')"}}
                    />
                    <div className="max-w-7xl hero-content">
                        <div className="hero-badge">
                            <span className="hero-badge-text neon-text-blue">System Online: Season 04</span>
                        </div>
                        <h1 className="hero-title">
                            DOMINATE <span className="hero-title-accent">THE CODE</span>
                        </h1>
                        <p className="hero-description">
                            The ultimate cyberpunk e-sports competitive programming platform. Outpace, outcode, and outlive the competition in the high-stakes digital arena.
                        </p>
                        <div className="hero-actions">
                            <button className="btn-hero">
                                <span>Initialize Combat</span>
                                <span className="material-symbols-outlined icon">bolt</span>
                            </button>
                            <button className="btn-secondary">
                                View Rankings
                            </button>
                        </div>
                    </div>
                </section>

                {/* AI Instructor */}
                <section className="section section-dark">
                    <div className="max-w-7xl">
                        <div className="section-header">
                            <span className="material-symbols-outlined section-icon">psychology</span>
                            <h2 className="section-title">AI Instructor: <span className="section-title-accent">System Core</span></h2>
                        </div>
                        <div className="card-grid">
                            <div className="card">
                                <div className="card-icon-bg">
                                    <span className="material-symbols-outlined">troubleshoot</span>
                                </div>
                                <h3 className="card-title">
                                    <span className="material-symbols-outlined" style={{color: 'var(--primary)'}}>data_object</span>
                                    Problem Clarification
                                </h3>
                                <p className="card-description">
                                    Real-time neural analysis of complex constraints. Our AI breaks down cryptic problem statements into actionable algorithmic paths.
                                </p>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{width: '66%'}}></div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon-bg" style={{color: 'var(--accent-blue)'}}>
                                    <span className="material-symbols-outlined">hub</span>
                                </div>
                                <h3 className="card-title">
                                    <span className="material-symbols-outlined" style={{color: 'var(--accent-blue)'}}>neurology</span>
                                    Technique Deep-Dive
                                </h3>
                                <p className="card-description">
                                    Master advanced algorithms with synthetic intelligence. Interactive walkthroughs for segment trees, heavy-light decomposition, and more.
                                </p>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{width: '50%', backgroundColor: 'var(--accent-blue)'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Arena */}
                <section className="section" id="arena">
                    <div className="max-w-7xl">
                        <div style={{marginBottom: '3rem'}}>
                            <h2 className="section-title">The Arena <span style={{color: 'var(--slate-600)'}}>Modes</span></h2>
                            <p style={{color: 'var(--slate-500)', fontWeight: 500}}>Select your battleground and prove your worth.</p>
                        </div>
                        <div className="card-grid card-grid-4">
                            {/* 1v1 Duals */}
                            <div className="arena-card">
                                <div className="arena-icon-box" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)'}}>
                                    <span className="material-symbols-outlined" style={{color: '#ef4444'}}>swords</span>
                                </div>
                                <h4 className="arena-card-title">1v1 Duals</h4>
                                <p className="arena-card-description">Solo or Team-based tactical duels. Instant matchmaking.</p>
                                <span className="arena-card-badge" style={{color: 'rgba(239, 68, 68, 0.7)'}}>High Stakes</span>
                            </div>
                            {/* Champions League */}
                            <div className="arena-card">
                                <div className="arena-icon-box" style={{backgroundColor: 'rgba(236, 91, 19, 0.1)', border: '1px solid rgba(236, 91, 19, 0.3)'}}>
                                    <span className="material-symbols-outlined" style={{color: 'var(--primary)'}}>trophy</span>
                                </div>
                                <h4 className="arena-card-title">Champions</h4>
                                <p className="arena-card-description">Scheduled seasonal tournaments with massive point pools.</p>
                                <span className="arena-card-badge" style={{color: 'rgba(236, 91, 19, 0.7)'}}>Tournament Mode</span>
                            </div>
                            {/* Tactical Games */}
                            <div className="arena-card">
                                <div className="arena-icon-box" style={{backgroundColor: 'rgba(0, 242, 255, 0.1)', border: '1px solid rgba(0, 242, 255, 0.3)'}}>
                                    <span className="material-symbols-outlined" style={{color: 'var(--accent-blue)'}}>shield_with_heart</span>
                                </div>
                                <h4 className="arena-card-title">Tactical X/O</h4>
                                <p className="arena-card-description">Use shields and powers to sabotage opponents' logic.</p>
                                <span className="arena-card-badge" style={{color: 'rgba(0, 242, 255, 0.7)'}}>Strategic</span>
                            </div>
                            {/* Polygon Integration */}
                            <div className="arena-card">
                                <div className="arena-icon-box" style={{backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)'}}>
                                    <span className="material-symbols-outlined" style={{color: '#a855f7'}}>grid_view</span>
                                </div>
                                <h4 className="arena-card-title">Polygon Hub</h4>
                                <p className="arena-card-description">Full CD Ladder integration and problem development suite.</p>
                                <span className="arena-card-badge" style={{color: 'rgba(168, 85, 247, 0.7)'}}>Integration</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                {/* Core Team Section */}
                <div className="max-w-7xl contributors-section">
                    <div className="contributors-header">
                        <h3 className="contributors-title">System <span className="section-title-accent">Architects</span></h3>
                        <p className="contributors-subtitle">Core Development Team</p>
                    </div>
                    <div className="contributors-grid">
                        {/* Bishoy */}
                        <div className="contributor-card">
                            <div className="contributor-content">
                                <div className="contributor-avatar">
                                    <div className="contributor-avatar-placeholder">
                                        <span className="material-symbols-outlined" style={{fontSize: '3rem', color: 'var(--slate-500)'}}>person</span>
                                    </div>
                                </div>
                                <div className="contributor-info">
                                    <h4 className="contributor-name">Bishoy Mina</h4>
                                    <p className="contributor-role">Developer</p>
                                </div>
                                <div className="contributor-socials">
                                    <a className="social-link" href="https://www.linkedin.com/in/bishoyelmalah/" target="_blank" rel="noopener noreferrer">
                                        <svg className="social-icon" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                        </svg>
                                    </a>
                                    <a className="social-link" href="https://github.com/bishoyelmalah" target="_blank" rel="noopener noreferrer">
                                        <svg className="social-icon" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Bavly */}
                        <div className="contributor-card">
                            <div className="contributor-content">
                                <div className="contributor-avatar">
                                    <div className="contributor-avatar-placeholder">
                                        <span className="material-symbols-outlined" style={{fontSize: '3rem', color: 'var(--slate-500)'}}>person</span>
                                    </div>
                                </div>
                                <div className="contributor-info">
                                    <h4 className="contributor-name">Bavly Peter</h4>
                                    <p className="contributor-role">Developer</p>
                                </div>
                                <div className="contributor-socials">
                                    <a className="social-link" href="https://www.linkedin.com/in/bavly-peter-barsoum/" target="_blank" rel="noopener noreferrer">
                                        <svg className="social-icon" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                        </svg>
                                    </a>
                                    <a className="social-link" href="https://github.com/BavlyPeter" target="_blank" rel="noopener noreferrer">
                                        <svg className="social-icon" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Paula */}
                        <div className="contributor-card">
                            <div className="contributor-content">
                                <div className="contributor-avatar">
                                    <div className="contributor-avatar-placeholder">
                                        <span className="material-symbols-outlined" style={{fontSize: '3rem', color: 'var(--slate-500)'}}>person</span>
                                    </div>
                                </div>
                                <div className="contributor-info">
                                    <h4 className="contributor-name">Paula Sameh</h4>
                                    <p className="contributor-role">Developer</p>
                                </div>
                                <div className="contributor-socials">
                                    <a className="social-link" href="https://www.linkedin.com/in/paula-sameh-53277420b/" target="_blank" rel="noopener noreferrer">
                                        <svg className="social-icon" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                        </svg>
                                    </a>
                                    <a className="social-link" href="https://github.com/Paula387" target="_blank" rel="noopener noreferrer">
                                        <svg className="social-icon" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Farah */}
                        <div className="contributor-card">
                            <div className="contributor-content">
                                <div className="contributor-avatar">
                                    <div className="contributor-avatar-placeholder">
                                        <span className="material-symbols-outlined" style={{fontSize: '3rem', color: 'var(--slate-500)'}}>person</span>
                                    </div>
                                </div>
                                <div className="contributor-info">
                                    <h4 className="contributor-name">Farah Ahmed Magdy</h4>
                                    <p className="contributor-role">Developer</p>
                                </div>
                                <div className="contributor-socials">
                                    <a className="social-link" href="https://www.linkedin.com/in/farah-ahmed-magdy/" target="_blank" rel="noopener noreferrer">
                                        <svg className="social-icon" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                        </svg>
                                    </a>
                                    <a className="social-link" href="https://github.com/farah-ah" target="_blank" rel="noopener noreferrer">
                                        <svg className="social-icon" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Shahd */}
                        <div className="contributor-card">
                            <div className="contributor-content">
                                <div className="contributor-avatar">
                                    <div className="contributor-avatar-placeholder">
                                        <span className="material-symbols-outlined" style={{fontSize: '3rem', color: 'var(--slate-500)'}}>person</span>
                                    </div>
                                </div>
                                <div className="contributor-info">
                                    <h4 className="contributor-name">Shahd Madeeh</h4>
                                    <p className="contributor-role">Developer</p>
                                </div>
                                <div className="contributor-socials">
                                    <a className="social-link" href="https://www.linkedin.com/in/shahd-madeeh/" target="_blank" rel="noopener noreferrer">
                                        <svg className="social-icon" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                        </svg>
                                    </a>
                                    <a className="social-link" href="https://github.com/shahd-madeeh" target="_blank" rel="noopener noreferrer">
                                        <svg className="social-icon" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl footer-main">
                    <div className="logo">
                        <span className="material-symbols-outlined" style={{fontSize: '1.875rem'}}>terminal</span>
                        <h2 className="logo-text" style={{fontSize: '1.25rem'}}>Feek Nafas</h2>
                    </div>
                    <div className="footer-links">
                        <a className="footer-link" href="/privacy">Privacy Policy</a>
                        <a className="footer-link" href="/terms">Terms of Service</a>
                        <a className="footer-link" href="/contact">Neural Sync</a>
                    </div>
                    <div className="footer-socials">
                        <a className="footer-social-link" href="#share" aria-label="Share this page">
                            <span className="material-symbols-outlined">share</span>
                        </a>
                    </div>
                </div>
                <p className="footer-tagline">Designed for the next generation of digital warriors.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
