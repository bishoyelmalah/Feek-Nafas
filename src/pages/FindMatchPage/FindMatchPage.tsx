import styles from './FindMatchPage.module.css';
import Header from '../../components/Header/Header';
import { useNavigate, type NavigateFunction } from 'react-router';
import { getProblemByRatingOrTopic } from '../../services/codeforcesAPI';
// import radarImg from '../../assets/radar.png';

const findMatch = async (nav: NavigateFunction) => {
    const problem = await getProblemByRatingOrTopic({rating: 800});
    await nav('/match', { state: {problem} });
}

export function FindMatchPage() {
    const nav = useNavigate();
    return (
        <div className={styles['find-match-page']}>
            <Header />

            {/* ── Main Layout ── */}
            <main className={styles['main-layout']}>

                {/* ── Left Sidebar: Recent Matches ── */}
                <div className={styles['sidebar-left']}>
                    <div className={styles['sidebar-header']}>
                        <h3 className={styles['sidebar-title']}>Recent Encounters</h3>
                        <span className={styles['sidebar-version']}>HISTORY_V2.4</span>
                    </div>

                    <div className={styles['match-list']}>
                        {/* Victory */}
                        <div className={[styles['match-card'], styles['victory']].join(' ')}>
                            <div className={styles['match-card-content']}>
                                <span className={[styles['match-card-result'], styles['victory']].join(' ')}>Victory</span>
                                <span className={styles['match-card-username']}>Z3RO_PULSE</span>
                                <span className={styles['match-card-map']}>Map: Neo Tokyo</span>
                            </div>
                            <div className={styles['match-card-meta']}>
                                <p className={[styles['match-card-rp'], styles['victory']].join(' ')}>+24 RP</p>
                                <p className={styles['match-card-time']}>2m ago</p>
                            </div>
                        </div>

                        {/* Defeat */}
                        <div className={[styles['match-card'], styles['defeat']].join(' ')}>
                            <div className={styles['match-card-content']}>
                                <span className={[styles['match-card-result'], styles['defeat']].join(' ')}>Defeat</span>
                                <span className={styles['match-card-username']}>GHOST_SHELL</span>
                                <span className={styles['match-card-map']}>Map: Sector 7</span>
                            </div>
                            <div className={styles['match-card-meta']}>
                                <p className={[styles['match-card-rp'], styles['defeat']].join(' ')}>-18 RP</p>
                                <p className={styles['match-card-time']}>15m ago</p>
                            </div>
                        </div>

                        {/* Victory */}
                        <div className={[styles['match-card'], styles['victory']].join(' ')}>
                            <div className={styles['match-card-content']}>
                                <span className={[styles['match-card-result'], styles['victory']].join(' ')}>Victory</span>
                                <span className={styles['match-card-username']}>K1LL_SWITCH</span>
                                <span className={styles['match-card-map']}>Map: The Void</span>
                            </div>
                            <div className={styles['match-card-meta']}>
                                <p className={[styles['match-card-rp'], styles['victory']].join(' ')}>+21 RP</p>
                                <p className={styles['match-card-time']}>42m ago</p>
                            </div>
                        </div>

                        {/* Victory (dim) */}
                        <div className={[styles['match-card'], styles['victory'], styles['dim']].join(' ')}>
                            <div className={styles['match-card-content']}>
                                <span className={[styles['match-card-result'], styles['victory']].join(' ')}>Victory</span>
                                <span className={styles['match-card-username']}>VOID_WALKER</span>
                                <span className={styles['match-card-map']}>Map: Neon Grid</span>
                            </div>
                            <div className={styles['match-card-meta']}>
                                <p className={[styles['match-card-rp'], styles['victory']].join(' ')}>+26 RP</p>
                                <p className={styles['match-card-time']}>1h ago</p>
                            </div>
                        </div>
                    </div>

                    {/* Rank Card */}
                    <div className={styles['rank-card']}>
                        <div className={styles['rank-card-header']}>
                            <div className={styles['rank-badge']}>
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo7qQ56kLtpoY3QVByb-UBVb3XDsQnOmfw4qoUiyFMqr825RvdSpgidKcFPQlqRMeR_OYhUNLa4oyTfAyNZVjdcpWpgFv0lHRDI0WmsBbnPE1hAcaBoXziFS3ujhfstCZP-ocPBDdK6ZOr2oXAWwSawiWl0-VWgHwxcewBo_RB5hOjlZiYtbNqOz4kBZuil17Uy7nGMAoypdYq42NMxTp7q2yVsSE06VnRy57AwkeGsbNy3AfxQVMovPdC-VfMXs49cfJ9T7SaEz0"
                                    alt="Shiny diamond rank badge with neon orange outline"
                                />
                            </div>
                            <div>
                                <h4 className={styles['rank-name']}>DIAMOND III</h4>
                                <p className={styles['rank-elo']}>ELO: 2,450</p>
                            </div>
                        </div>
                        <div className={styles['rank-progress']}>
                            <div className={styles['rank-progress-header']}>
                                <span className={styles['rank-progress-label']}>Tier Progress</span>
                                <span className={styles['rank-progress-value']}>75%</span>
                            </div>
                            <div className={styles['rank-progress-bar-bg']}>
                                <div className={styles['rank-progress-bar-fill']} />
                            </div>
                            <p className={styles['rank-progress-note']}>150 RP remaining to Master Tier</p>
                        </div>
                    </div>
                </div>

                {/* ── Center: Matchmaking Hub ── */}
                <div className={styles['matchmaking-center']}>

                     {/* Private Duel */}
                    <div className={styles['private-duel']}>
                        <div className={styles['private-duel-header']}>
                            <h3 className={styles['private-duel-title']}>Private Duel</h3>
                            <span className={"material-symbols-outlined " + styles['private-duel-icon']}>swords</span>
                        </div>
                        <div className={styles['search-wrapper']}>
                            <input
                                className={styles['search-input']}
                                placeholder="SEARCH USERNAME..."
                                type="text"
                            />
                            <span className={"material-symbols-outlined " + styles['search-icon']}>search</span>
                        </div>
                        <div className={styles['rivals-section']}>
                            <p className={styles['rivals-label']}>Recent Rivals</p>
                            <div className={styles['rivals-list']}>
                                {/* Online rival */}
                                <div className={styles['rival-item']}>
                                    <div className={styles['rival-left']}>
                                        <div className={[styles['rival-status-dot'], styles['online']].join(' ')} />
                                        <span className={styles['rival-name']}>SYNTH_STRIKER</span>
                                    </div>
                                    <button className={styles['rival-invite-btn']}>Invite</button>
                                </div>
                                {/* Offline rival */}
                                {/* <div className={styles['rival-item']}>
                                    <div className={styles['rival-left']}>
                                        <div className={[styles['rival-status-dot'], styles['offline']].join(' ')} />
                                        <span className={[styles['rival-name'], styles['offline']].join(' ')}>NEON_GHOST</span>
                                    </div>
                                    <button className={styles['rival-offline-btn']} disabled>Offline</button>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Find Match Button */}
                    <div className={styles['find-match-btn-wrapper']}>
                        <div className={styles['btn-outer-ring']} />
                        <div className={styles['btn-inner-ring']} />
                        <button className={[styles['find-match-btn'], styles['find-match-glow']].join(' ')} onClick={()=>{nav('/getReady')}}>
                            <div className={styles['find-match-btn-gradient']} />
                            <div className={styles['scanline']} />
                            <span className={"material-symbols-outlined " + styles['find-match-btn-icon']}>
                                radar
                                {/* <img src={radarImg} width={72} height={72}/> */}
                            </span>
                            <h2 className={[styles['find-match-btn-title'], styles['glitch-text']].join(' ')}>Start Match</h2>
                            <p className={styles['find-match-btn-subtitle']}>Ranked 1v1</p>
                            <div className={styles['btn-corner-tl']} />
                            <div className={styles['btn-corner-br']} />
                        </button>
                    </div>

                    {/* Status below button */}
                    <div className={styles['match-status']}>
                        <p className={styles['match-status-text']}>Ready for engagement</p>
                        <div className={styles['match-status-badges']}>
                            <div className={styles['match-status-badge']}>
                                <div className={styles['badge-dot']} />
                                <span className={styles['badge-text']}>Search Active</span>
                            </div>
                            <div className={styles['match-status-badge']}>
                                <span className={"material-symbols-outlined " + styles['badge-globe-icon']}>public</span>
                                <span className={styles['badge-text']}>Global Queue</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right Sidebar: Stats & Info ── */}
                <div className={styles['sidebar-right']}>
                    <div className={styles['sidebar-header']}>
                        <h3 className={styles['sidebar-title']}>Performance Core</h3>
                        <span className={styles['sidebar-version']}>SEASON_04</span>
                    </div>

                    {/* Stats Grid */}
                    <div className={styles['stats-grid']}>
                        <div className={styles['stat-card']}>
                            <span className={styles['stat-label']}>Win Rate</span>
                            <span className={[styles['stat-value-xl'], styles['neon']].join(' ')}>68%</span>
                            <span className={[styles['stat-sub'], styles['neon']].join(' ')}>+2.4%</span>
                        </div>
                        <div className={styles['stat-card']}>
                            <span className={styles['stat-label']}>K/D Ratio</span>
                            <span className={styles['stat-value-xl']}>1.42</span>
                            <span className={[styles['stat-sub'], styles['muted']].join(' ')}>LIFETIME</span>
                        </div>
                        <div className={styles['stat-card']}>
                            <span className={styles['stat-label']}>Peak Rank</span>
                            <span className={styles['stat-value-lg']}>Diamond I</span>
                            <span className={[styles['stat-sub'], styles['muted']].join(' ')}>SEASON_03</span>
                        </div>
                        <div className={styles['stat-card']}>
                            <span className={styles['stat-label']}>Matches</span>
                            <span className={styles['stat-value-xl']}>428</span>
                            <span className={[styles['stat-sub'], styles['muted']].join(' ')}>PLAYED</span>
                        </div>
                    </div>

                    {/* Season Card */}

                    {/* System Log */}
                    <div className={styles['system-log']}>
                        <div className={styles['system-log-header']}>
                            <span className={styles['system-log-title']}>System Log</span>
                            <div className={styles['system-log-dot']} />
                        </div>
                        <div className={styles['system-log-entries']}>
                            <p className={styles['log-entry-success']}>
                                <span className={styles['log-timestamp']}>[12:44:02]</span> AUTH_SUCCESS_TOKEN_GRANTED
                            </p>
                            <p>
                                <span className={styles['log-timestamp']}>[12:44:05]</span> CONNECTING_TO_EU_W1...
                            </p>
                            <p>
                                <span className={styles['log-timestamp']}>[12:44:08]</span> LATENCY: 22MS (STABLE)
                            </p>
                            <p className={styles['log-entry-error']}>
                                <span className={styles['log-timestamp']}>[12:45:12]</span> MATCH_FOUND_HANDSHAKE_ERR
                            </p>
                            <p>
                                <span className={styles['log-timestamp']}>[12:45:15]</span> RETRYING_MATCHMAKING...
                            </p>
                            <p>
                                <span className={styles['log-timestamp']}>[12:46:01]</span> QUEUE_POSITION: 04/1024
                            </p>
                            <p className={styles['log-entry-active']}>
                                <span className={styles['log-timestamp']}>[12:47:33]</span> SCANNING_FOR_RIVALS_
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer className={styles['footer']}>
                <div className={styles['footer-actions']}>
                    <button className={styles['footer-btn']}>
                        <span className={"material-symbols-outlined " + styles['footer-btn-icon']}>settings</span>
                        <span className={styles['footer-btn-text']}>Settings</span>
                    </button>
                    <button className={styles['footer-btn']}>
                        <span className={"material-symbols-outlined " + styles['footer-btn-icon']}>forum</span>
                        <span className={styles['footer-btn-text']}>Comms</span>
                    </button>
                    <button className={styles['footer-btn']}>
                        <span className={"material-symbols-outlined " + styles['footer-btn-icon']}>help</span>
                        <span className={styles['footer-btn-text']}>Support</span>
                    </button>
                </div>
                <div className={styles['footer-right']}>
                    <span className={styles['footer-version']}>V.1.24.4_BUILD_STABLE</span>
                    <div className={styles['footer-dots']}>
                        <div className={[styles['footer-dot'], styles['primary']].join(' ')} />
                        <div className={[styles['footer-dot'], styles['mid']].join(' ')} />
                        <div className={[styles['footer-dot'], styles['faint']].join(' ')} />
                    </div>
                </div>
            </footer>

            {/* Vignette overlay */}
            <div className={styles['vignette-overlay']} />
        </div>
    );
}
