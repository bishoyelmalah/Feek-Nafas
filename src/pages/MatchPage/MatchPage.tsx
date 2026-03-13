import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import './MatchPage.css'

export function MatchPage() {
    return (
        <div className="match-page">
            <Header activeLink="arena" />
            
            <main className="match-main">
                {/* HUD: Countdown & Players */}
                <div className="match-hud">
                    {/* Player A (User) */}
                    <div className="player-card player-a">
                        <div className="player-info">
                            <div className="player-avatar-container">
                                <div className="player-avatar blue-border">
                                    <img 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcSM1JyCgADutBmUal13KYePGDj08Do90Z2zgAeUp9R2VqFq3wAhR8GsAdZXGZTSuutZx0brGzt9_pSsScFju4iwXzh4EDGZuAoCqFm4cXngbLtTRbTHE-EJVXv2GquZ6WbgQhhNKrKfVEszX_TOxWgY8wU9DJFxWG1ueTI_ObIaJ0IS4SNEZeJP1ibgFZZ0zOzsHkSeRXUvCEi6yHozWr8t8kDH9RKiZGgSvlruDo53Bc5B0C87nqhIdbIIYJXU7m0TSF-uX35Ds" 
                                        alt="Player A avatar"
                                    />
                                </div>
                                <div className="online-indicator"></div>
                            </div>
                            <div className="player-details">
                                <span className="player-name blue-text">Player A (You)</span>
                                <div className="player-stats">
                                    <span className="match-rank-badge blue-badge">Candidate Master</span>
                                    <span className="rating">1840</span>
                                </div>
                            </div>
                            <div className="player-status">
                                <span className="status-text thinking">Thinking</span>
                            </div>
                        </div>
                    </div>

                    {/* Timer HUD */}
                    <div className="timer-container">
                        <div className="timer-display">
                            <span className="timer-value">14:20</span>
                            <p className="timer-label">Time Remaining</p>
                        </div>
                    </div>

                    {/* Player B (Opponent) */}
                    <div className="player-card player-b">
                        <div className="player-info">
                            <div className="player-status">
                                <span className="status-text submitting">Submitting...</span>
                            </div>
                            <div className="player-details right">
                                <span className="player-name orange-text">Player B</span>
                                <div className="player-stats">
                                    <span className="rating">1910</span>
                                    <span className="match-rank-badge orange-badge">Master</span>
                                </div>
                            </div>
                            <div className="player-avatar-container">
                                <div className="player-avatar orange-border">
                                    <img 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnkP0tPBbWUufigD2mPunXbt4EYjBqJJgv7Uq6uYj01D-AH8FVNHK2Df06ZMf9RTOINJzZwneretI5Z6G09nsHGJ7bdxqbLyPhnZHQfKj4OfN_rUHSoReSnYA9JVVesrBi_gKVpHcZ5Lq6VehWiDvoGxh1OI_66BtggFz9zGVGB3jKzw0B4OcFxWiqSv8QX5NiidXC6FQxBspR2Wwbg52l6NTo5ja3Uf3hLQ1svBSBmC8YcN5HAKC6lQFZW8nCuQN_MZaQ1wfDluw" 
                                        alt="Player B avatar"
                                    />
                                </div>
                                <div className="online-indicator"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tug of War Bar */}
                <div className="momentum-section">
                    <div className="momentum-labels">
                        <div className="momentum-player">
                            <span className="momentum-title blue-text">Momentum</span>
                            <span className="momentum-value">50%</span>
                        </div>
                        <div className="momentum-player right">
                            <span className="momentum-title orange-text">Momentum</span>
                            <span className="momentum-value">50%</span>
                        </div>
                    </div>
                    <div className="momentum-bar">
                        <div className="momentum-fill blue-momentum" style={{ width: '50%' }}></div>
                        <div className="momentum-fill orange-momentum" style={{ width: '50%' }}></div>
                        <div className="momentum-marker"></div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="match-content">
                    {/* Left: Challenge Info */}
                    <div className="challenge-section">
                        <div className="challenge-card">
                            <div className="challenge-header">
                                <div>
                                    <h3 className="challenge-label">
                                        <span className="material-symbols-outlined">terminal</span>
                                        Current Challenge
                                    </h3>
                                    <h1 className="challenge-title">158A - Next Round</h1>
                                </div>
                                <div className="challenge-meta">
                                    <span className="meta-badge">DIFF: 800</span>
                                    <span className="meta-badge">POINTS: 500</span>
                                </div>
                            </div>
                            
                            <p className="challenge-description">
                                Contestant who earns a score equal to or greater than the k-th place finisher's score will advance to the next round, as long as the contestant earns a positive score...
                            </p>
                            
                            <div className="challenge-tags">
                                <span className="tag">Implementation</span>
                                <span className="tag">Special Problems</span>
                            </div>
                            
                            <a href="https://codeforces.com/problemset/problem/158/A" target="_blank" rel="noopener noreferrer" className="solve-button">
                                <span className="material-symbols-outlined">launch</span>
                                Solve on Codeforces
                            </a>
                        </div>

                        <div className="action-buttons">
                            <button className="action-btn secondary">
                                <span className="material-symbols-outlined">visibility</span>
                                Spectate Others
                            </button>
                            <button className="action-btn danger">
                                <span className="material-symbols-outlined">logout</span>
                                Return to Lobby
                            </button>
                        </div>
                    </div>

                    {/* Right: Live Feed */}
                    <div className="live-feed">
                        <div className="feed-card">
                            <div className="feed-header">
                                <h4 className="feed-title">
                                    <span className="live-indicator"></span>
                                    Live Match Feed
                                </h4>
                                <span className="session-id">SESSION: #AF92-X</span>
                            </div>
                            <div className="feed-content">
                                <div className="feed-entry">
                                    <span className="feed-time">[14:15:02]</span>
                                    <span className="feed-text">Match protocol initialized.</span>
                                </div>
                                <div className="feed-entry">
                                    <span className="feed-time">[14:15:05]</span>
                                    <span className="feed-player blue-text">Player A</span>
                                    <span className="feed-text-italic">connected to Codeforces API.</span>
                                </div>
                                <div className="feed-entry">
                                    <span className="feed-time">[14:15:08]</span>
                                    <span className="feed-player orange-text">Player B</span>
                                    <span className="feed-text-italic">connected to Codeforces API.</span>
                                </div>
                                <div className="feed-entry">
                                    <span className="feed-time">[14:15:10]</span>
                                    <span className="feed-system">SYSTEM:</span>
                                    <span className="feed-text-white">Match Started! Problem set released.</span>
                                </div>
                                <div className="feed-entry column">
                                    <span className="feed-time">[14:18:22]</span>
                                    <div className="feed-submission">
                                        <span className="feed-player orange-text">Player B</span>
                                        <span className="submission-text">Attempting submission for Test Case 1...</span>
                                    </div>
                                </div>
                                <div className="feed-entry">
                                    <span className="feed-time">[14:19:45]</span>
                                    <span className="feed-player blue-text">Player A</span>
                                    <span className="feed-text-italic">viewing problem description.</span>
                                </div>
                                <div className="feed-entry">
                                    <span className="feed-time">[14:20:00]</span>
                                    <span className="feed-alert">MATCH ALERT:</span>
                                    <span className="feed-text-alert">T-minus 14 minutes remaining.</span>
                                </div>
                                <div className="feed-entry">
                                    <span className="feed-time">[14:20:01]</span>
                                    <span className="feed-cursor"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    )
}