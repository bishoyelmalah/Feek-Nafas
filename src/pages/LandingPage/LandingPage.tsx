import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import bishoyAvatar from '../../assets/Developers_avatars/Bishoy_avatar.jpg';
import bavlyAvatar from '../../assets/Developers_avatars/Bavly_avatar.jpg';
import paulaAvatar from '../../assets/Developers_avatars/Paula_avatar.jpg';
import farahAvatar from '../../assets/Developers_avatars/Farah_avatar.jpg';
import shahdAvatar from '../../assets/Developers_avatars/Shahd_avatar.jpg';

const contributors = [
  {
    name: 'Bishoy El Malah',
    avatar: bishoyAvatar,
    linkedin: 'https://www.linkedin.com/in/bishoyelmalah/',
    github: 'https://github.com/bishoyelmalah',
  },
  {
    name: 'Bavly Peter',
    avatar: bavlyAvatar,
    linkedin: 'https://www.linkedin.com/in/bavly-peter-barsoum/',
    github: 'https://github.com/BavlyPeter',
  },
  {
    name: 'Paula Sameh',
    avatar: paulaAvatar,
    linkedin: 'https://www.linkedin.com/in/paula-sameh-53277420b/',
    github: 'https://github.com/Paula387',
  },
  {
    name: 'Farah Ahmed',
    avatar: farahAvatar,
    linkedin: 'https://www.linkedin.com/in/farah-ahmed-magdy/',
    github: 'https://github.com/farah-ah',
  },
  {
    name: 'Shahd Madeeh',
    avatar: shahdAvatar,
    linkedin: 'https://www.linkedin.com/in/shahd-madeeh/',
    github: 'https://github.com/shahd-madeeh',
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className={`${styles['landing-page']} ${styles['grid-overlay']}`}>
      <Header />

      <main>
        {/* Hero Section */}
        <section className={styles['hero-section']}>
          <div
            className={styles['hero-bg']}
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAECOzcNfS4cUGBMt1SRbV9xcEw-BuOGnWCA_fruxTfWegS-neXuR36XQbBzEOzgcpvJSBuqV8YGIt6qyS4CerU8h5bH6_C3tlPWuEXNOsQL7saNUtCJsPV57dGdN6Szvjo9E9FIzpiMticw2pl_L2RMfwi2BTmIu_vx1WbA6qjZC-32VU7fbRYMn4OKQxrG09PnaMtBuVe5nzhRB85CTEPDnyeNwcg6aqEUas-vQ2XG84ZLaNu2XKquvbSIfHERCfq4NjZ_g_hfcI')",
            }}
          />
          <div className={`${styles['max-w-7xl']} ${styles['hero-content']}`}>  
            <div className={styles['hero-badge']}>
              <span className={`${styles['hero-badge-text']} ${styles['neon-text-blue']}`}>System Online: Season 04</span>
            </div>
            <h1 className={styles['hero-title']}>
              DOMINATE <span className={styles['hero-title-accent']}>THE CODE</span>
            </h1>
            <p className={styles['hero-description']}>
              The ultimate cyberpunk e-sports competitive programming platform. Outpace, outcode,
              and outlive the competition in the high-stakes digital arena.
            </p>
            <div className={styles['hero-actions']}>
              <Link to="/register" className={styles['btn-hero']}>
                <span>Initialize Combat</span>
                <span className={`material-symbols-outlined ${styles['icon']}`}>bolt</span>
              </Link>
              <button className={styles['btn-secondary']}>View Rankings</button>
            </div>
          </div>
        </section>

        {/* AI Instructor */} 
        <section className={`${styles['section']} ${styles['section-dark']}`}>
          <div className={styles['max-w-7xl']}>
            <div className={styles['section-header']}>
              <span className={`material-symbols-outlined ${styles['section-icon']}`}>psychology</span>
              <h2 className={styles['section-title']}>
                AI Instructor: <span className={styles['section-title-accent']}>System Core</span>
              </h2>
            </div>
            <div className={styles['card-grid']}>
              <div className={styles['card']}>
                <div className={styles['card-icon-bg']}>
                  <span className="material-symbols-outlined">troubleshoot</span>
                </div>
                <h3 className={styles['card-title']}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>
                    data_object
                  </span>
                  Problem Clarification
                </h3>
                <p className={styles['card-description']}>
                  Real-time neural analysis of complex constraints. Our AI breaks down cryptic
                  problem statements into actionable algorithmic paths.
                </p>
                <div className={styles['progress-bar']}>
                  <div className={styles['progress-fill']} style={{ width: '66%' }}></div>
                </div>
              </div>
              <div className={styles['card']}>
                <div className={styles['card-icon-bg']} style={{ color: 'var(--accent-blue)' }}>
                  <span className="material-symbols-outlined">hub</span>
                </div>
                <h3 className={styles['card-title']}>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: 'var(--accent-blue)' }}
                  >
                    neurology
                  </span>
                  Technique Deep-Dive
                </h3>
                <p className={styles['card-description']}>
                  Master advanced algorithms with synthetic intelligence. Interactive walkthroughs
                  for segment trees, heavy-light decomposition, and more.
                </p>
                <div className={styles['progress-bar']}>
                  <div
                    className={styles['progress-fill']}
                    style={{ width: '50%', backgroundColor: 'var(--accent-blue)' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Arena */}
        <section className={styles['section']} id="arena">
          <div className={styles['max-w-7xl']}>
            <div style={{ marginBottom: '3rem' }}>
              <h2 className={styles['section-title']}>
                The Arena <span style={{ color: 'var(--slate-600)' }}>Modes</span>
              </h2>
              <p style={{ color: 'var(--slate-500)', fontWeight: 500 }}>
                Select your battleground and prove your worth.
              </p>
            </div>
            <div className={`${styles['card-grid']} ${styles['card-grid-4']}`}>
              {/* 1v1 Duals */}
              <div className={styles['arena-card']}>
                <div
                  className={styles['arena-icon-box']}
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#ef4444' }}>
                    swords
                  </span>
                </div>
                <h4 className={styles['arena-card-title']}>1v1 Duals</h4>
                <p className={styles['arena-card-description']}>
                  Solo or Team-based tactical duels. Instant matchmaking.
                </p>
                <span className={styles['arena-card-badge']} style={{ color: 'rgba(239, 68, 68, 0.7)' }}>
                  High Stakes
                </span>
              </div>
              {/* Champions League */}
              <div className={styles['arena-card']}>
                <div
                  className={styles['arena-icon-box']}
                  style={{
                    backgroundColor: 'rgba(236, 91, 19, 0.1)',
                    border: '1px solid rgba(236, 91, 19, 0.3)',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>
                    trophy
                  </span>
                </div>
                <h4 className={styles['arena-card-title']}>Champions</h4>
                <p className={styles['arena-card-description']}>
                  Scheduled seasonal tournaments with massive point pools.
                </p>
                <span className={styles['arena-card-badge']} style={{ color: 'rgba(236, 91, 19, 0.7)' }}>
                  Tournament Mode
                </span>
              </div>
              {/* Tactical Games */}
              <div className={styles['arena-card']}>
                <div
                  className={styles['arena-icon-box']}
                  style={{
                    backgroundColor: 'rgba(0, 242, 255, 0.1)',
                    border: '1px solid rgba(0, 242, 255, 0.3)',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: 'var(--accent-blue)' }}
                  >
                    shield_with_heart
                  </span>
                </div>
                <h4 className={styles['arena-card-title']}>Tactical X/O</h4>
                <p className={styles['arena-card-description']}>Use shields and powers to sabotage opponents' logic.</p>
                <span className={styles['arena-card-badge']} style={{ color: 'rgba(0, 242, 255, 0.7)' }}>
                  Strategic
                </span>
              </div>
              {/* Polygon Integration */}
              <div className={styles['arena-card']}>
                <div
                  className={styles['arena-icon-box']}
                  style={{
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#a855f7' }}>
                    grid_view
                  </span>
                </div>
                <h4 className={styles['arena-card-title']}>Polygon Hub</h4>
                <p className={styles['arena-card-description']}>
                  Full CD Ladder integration and problem development suite.
                </p>
                <span className={styles['arena-card-badge']} style={{ color: 'rgba(168, 85, 247, 0.7)' }}>
                  Integration
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* â”€â”€ Evolution System Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className={styles['evolutionSection']}>
          <div className={styles['evolutionInner']}>
            <div className={styles['evolutionText']}>
              <h2 className={styles['evolutionTitle']}>
                Evolution <span className={styles['evolutionTitleAccent']}>System</span>
              </h2>
              <div className={styles['evolutionFeats']}>

                <div className={styles['evolutionFeat']}>
                  <div className={`${styles['featIconWrap']} ${styles['featIconWrapPrimary']}`}>
                    <span className={`material-symbols-outlined ${styles['featIcon']}`}>
                      keyboard_double_arrow_up
                    </span>
                  </div>
                  <div>
                    <h5 className={styles['featTitle']}>XP &amp; Level Ups</h5>
                    <p className={styles['featDesc']}>
                      Earn data shards for every optimized submission. Level up to unlock
                      tier-specific avatars.
                    </p>
                  </div>
                </div>

                <div className={styles['evolutionFeat']}>
                  <div className={`${styles['featIconWrap']} ${styles['featIconWrapBlue']}`}>
                    <span className={`material-symbols-outlined ${styles['featIcon']}`}>
                      electric_bolt
                    </span>
                  </div>
                  <div>
                    <h5 className={styles['featTitle']}>Abilities Unlocked</h5>
                    <p className={styles['featDesc']}>
                      Unlock "Blind Submission" (2x points) and "Time Siphon" at Level 20.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Profile Card */}
            <div className={styles['profileCard']}>
              <div className={styles['profileCardGridBg']} aria-hidden="true" />
              <div className={styles['profileCardContent']}>
                <div className={styles['profileAvatarWrapper']}>
                  <div className={styles['profileAvatar']} aria-label="Cyberpunk character avatar" />
                </div>
                <h4 className={styles['profileName']}>CYBER_PHANTOM</h4>
                <span className={styles['profileTier']}>Grandmaster Tier</span>
                <div className={styles['xpSection']}>
                  <div className={styles['xpLabels']}>
                    <span>XP 24,500 / 30,000</span>
                    <span className={styles['xpPercentage']}>81%</span>
                  </div>
                  <div className={styles['xpTrack']}>
                    <div className={styles['xpBar']} />
                  </div>
                </div>
                <div className={styles['profileStats']}>
                  <div className={styles['profileStat']}>
                    <span className={styles['profileStatLabel']}>Wins</span>
                    <span className={styles['profileStatValue']}>412</span>
                  </div>
                  <div className={styles['profileStat']}>
                    <span className={styles['profileStatLabel']}>AC</span>
                    <span className={`${styles['profileStatValue']} ${styles['profileStatValueGreen']}`}>92%</span>
                  </div>
                  <div className={styles['profileStat']}>
                    <span className={styles['profileStatLabel']}>Rank</span>
                    <span className={`${styles['profileStatValue']} ${styles['profileStatValueBlue']}`}>#12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* â”€â”€ Leaderboard Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className={styles['leaderboardSection']}>
          <div className={styles['leaderboardInner']}>
            <div className={styles['leaderboardTopRow']}>
              <div>
                <h2 className={styles['leaderboardTitle']}>
                  Arena <span className={styles['leaderboardTitleAccent']}>Rankings</span>
                </h2>
                <div className={styles['liveIndicator']}>
                  <span className={styles['liveBlip']}>
                    <span className={styles['liveBlipPing']} />
                    <span className={styles['liveBlipDot']} />
                  </span>
                  Blind Hour Active
                </div>
              </div>
              <div className={styles['leaderboardFilters']}>
                <button className={styles['filterBtnInactive']}>Individual</button>
                <button className={styles['filterBtnActive']}>Teams</button>
              </div>
            </div>

            <div className={styles['tableWrapper']}>
              <table className={styles['leaderboardTable']}>
                <thead className={styles['tableHead']}>
                  <tr>
                    <th className={styles['tableHeadCell']}>Rank</th>
                    <th className={styles['tableHeadCell']}>Hacker</th>
                    <th className={styles['tableHeadCell']}>A</th>
                    <th className={styles['tableHeadCell']}>B</th>
                    <th className={styles['tableHeadCell']}>C</th>
                    <th className={styles['tableHeadCell']}>D</th>
                    <th className={styles['tableHeadCell']}>E</th>
                    <th className={`${styles['tableHeadCell']} ${styles['tableHeadCellRight']}`}>Penalty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles['tableRow']}>
                    <td className={styles['tableCell']}><span className={styles['rankPrimary']}>01</span></td>
                    <td className={styles['tableCell']}>
                      <div className={styles['hackerInfo']}>
                        <div className={styles['hackerAvatar']} />
                        <span className={styles['hackerName']}>NeoCode_01</span>
                      </div>
                    </td>
                    <td className={styles['tableCell']}><span className={`material-symbols-outlined ${styles['iconGreen']}`}>check_circle</span></td>
                    <td className={styles['tableCell']}><span className={`material-symbols-outlined ${styles['iconGreen']}`}>check_circle</span></td>
                    <td className={styles['tableCell']}><span className={`material-symbols-outlined ${styles['iconDim']}`}>radio_button_unchecked</span></td>
                    <td className={styles['tableCell']}><span className={`material-symbols-outlined ${styles['iconRed']}`}>cancel</span></td>
                    <td className={styles['tableCell']}><span className={`material-symbols-outlined ${styles['iconDim']}`}>radio_button_unchecked</span></td>
                    <td className={styles['tableCellRight']}>145</td>
                  </tr>

                  <tr className={`${styles['tableRow']} ${styles['tableRowHighlight']}`}>
                    <td className={styles['tableCell']}><span className={styles['rankPrimary']}>02</span></td>
                    <td className={styles['tableCell']}>
                      <div className={styles['hackerInfo']}>
                        <div className={styles['hackerAvatar']} />
                        <span className={styles['hackerName']}>NullPointer_Ex</span>
                      </div>
                    </td>
                    <td className={styles['tableCell']}><span className={`material-symbols-outlined ${styles['iconGreen']}`}>check_circle</span></td>
                    <td className={styles['tableCell']}><span className={`material-symbols-outlined ${styles['iconGreen']}`}>check_circle</span></td>
                    <td className={`${styles['tableCell']} ${styles['statusBlueText']}`}>???</td>
                    <td className={`${styles['tableCell']} ${styles['statusBlueText']}`}>???</td>
                    <td className={styles['tableCell']}><span className={`material-symbols-outlined ${styles['iconDim']}`}>radio_button_unchecked</span></td>
                    <td className={styles['tableCellRight']}>182</td>
                  </tr>

                  <tr className={styles['tableRow']}>
                    <td className={styles['tableCell']}><span className={styles['rankDefault']}>03</span></td>
                    <td className={styles['tableCell']}>
                      <div className={styles['hackerInfo']}>
                        <div className={styles['hackerAvatar']} />
                        <span className={styles['hackerName']}>BinaryWitch</span>
                      </div>
                    </td>
                    <td className={styles['tableCell']}><span className={`material-symbols-outlined ${styles['iconGreen']}`}>check_circle</span></td>
                    <td className={`${styles['tableCell']} ${styles['statusBlueText']}`}>???</td>
                    <td className={styles['tableCell']}><span className={`material-symbols-outlined ${styles['iconDim']}`}>radio_button_unchecked</span></td>
                    <td className={styles['tableCell']}><span className={`material-symbols-outlined ${styles['iconDim']}`}>radio_button_unchecked</span></td>
                    <td className={styles['tableCell']}><span className={`material-symbols-outlined ${styles['iconDim']}`}>radio_button_unchecked</span></td>
                    <td className={styles['tableCellRight']}>204</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* â”€â”€ Community Nodes Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className={styles['communitySection']}>
          <div className={styles['communityGrid']}>

            <div className={styles['communityCol']}>
              <div className={styles['communityColHeader']}>
                <span className={`material-symbols-outlined ${styles['communityColIcon']}`}>podcasts</span>
                <h3 className={styles['communityColTitle']}>Live Nodes</h3>
              </div>
              <div className={styles['liveNodesList']}>
                <div className={`${styles['liveNodeCard']} ${styles['liveNodeCardPrimary']}`}>
                  <div>
                    <p className={styles['liveNodeTitle']}>System Design Talk</p>
                    <span className={styles['liveNodeParticipants']}>12 Active Participants</span>
                  </div>
                  <span className={`material-symbols-outlined ${styles['liveNodeIconPrimary']}`}>volume_up</span>
                </div>
                <div className={`${styles['liveNodeCard']} ${styles['liveNodeCardBlue']}`}>
                  <div>
                    <p className={styles['liveNodeTitle']}>Dynamic Programming 101</p>
                    <span className={styles['liveNodeParticipants']}>48 Active Participants</span>
                  </div>
                  <span className={`material-symbols-outlined ${styles['liveNodeIconBlue']}`}>volume_up</span>
                </div>
              </div>
            </div>

            <div className={styles['communityCol']}>
              <div className={styles['communityColHeader']}>
                <span className={`material-symbols-outlined ${styles['communityColIcon']}`}>groups_3</span>
                <h3 className={styles['communityColTitle']}>Global Tasks</h3>
              </div>
              <div className={styles['globalTaskCard']}>
                <p className={styles['globalTaskText']}>
                  COLLECTIVE CHALLENGE: Solve 5,000 DP problems as a community.
                </p>
                <div className={styles['globalTaskTrack']}>
                  <div className={styles['globalTaskBar']} />
                </div>
                <div className={styles['globalTaskLabels']}>
                  <span>3,250 AC</span>
                  <span>65% COMPLETE</span>
                </div>
              </div>
            </div>

            <div className={styles['communityCol']}>
              <div className={styles['communityColHeader']}>
                <span className={`material-symbols-outlined ${styles['communityColIcon']}`}>leaderboard</span>
                <h3 className={styles['communityColTitle']}>Clan Wars</h3>
              </div>
              <div className={styles['clanList']}>
                <div className={styles['clanRow']}>
                  <div className={styles['clanRowInfo']}>
                    <span className={styles['clanRankPrimary']}>#1</span>
                    <span className={styles['clanName']}>SYNTH_CORE</span>
                  </div>
                  <span className={styles['clanPoints']}>12,400p</span>
                </div>
                <div className={styles['clanRow']}>
                  <div className={styles['clanRowInfo']}>
                    <span className={styles['clanRankDim']}>#2</span>
                    <span className={styles['clanName']}>NULL_VOID</span>
                  </div>
                  <span className={styles['clanPoints']}>11,850p</span>
                </div>
                <div className={styles['clanViewAll']}>
                  <button className={styles['clanViewAllBtn']}>
                    View All Clans
                    <span className={`material-symbols-outlined ${styles['clanViewAllBtnIcon']}`}>arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* â”€â”€ Training Grounds Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className={styles['trainingSection']}>
          <div className={styles['trainingSectionInner']}>
            <div className={styles['trainingGrid']}>

              <div>
                <h2 className={styles['trainingTitle']}>
                  Training <br />
                  <span className={styles['trainingTitleAccent']}>Grounds</span>
                </h2>
                <p className={styles['trainingSubtitle']}>
                  Sharpen your edge before entering the ranked arena.
                </p>
                <div className={styles['trainingBtns']}>
                  <button className={styles['trainingBtnActive']}>
                    Algorithms
                    <span className="material-symbols-outlined">menu_book</span>
                  </button>
                  <button className={styles['trainingBtnInactive']}>
                    Data Structures
                    <span className="material-symbols-outlined">account_tree</span>
                  </button>
                  <button className={styles['trainingBtnInactive']}>
                    Math &amp; Logic
                    <span className="material-symbols-outlined">functions</span>
                  </button>
                </div>
              </div>

              <div className={styles['trainingContent']}>

                <div className={styles['challengeCard']}>
                  <div>
                    <div className={styles['challengeCardTop']}>
                      <span className={styles['challengeBadge']}>Hard Challenge</span>
                      <span className={`material-symbols-outlined ${styles['challengeBookmark']}`}>bookmark</span>
                    </div>
                    <h4 className={styles['challengeTitle']}>Matrix Inversion 2.0</h4>
                    <p className={styles['challengeDesc']}>
                      Master the efficient way of calculating inverse matrices under modulo prime
                      constraints.
                    </p>
                  </div>
                  <div className={styles['challengeCardBottom']}>
                    <div className={styles['challengeTimerInfo']}>
                      <span className={`material-symbols-outlined ${styles['challengeTimerIcon']}`}>schedule</span>
                      <span className={styles['challengeTimerText']}>Timed Hints: 15:00</span>
                    </div>
                    <button className={styles['challengePracticeBtn']}>Practice Now</button>
                  </div>
                </div>

                <div className={styles['relatedCard']}>
                  <h5 className={styles['relatedCardTitle']}>Related Problems</h5>
                  <ul className={styles['relatedList']}>
                    <li className={styles['relatedItem']}>
                      <span className={styles['relatedItemNum']}>#812</span>
                      <span className={styles['relatedItemTitle']}>Fast Fourier Transform</span>
                      <span className={`material-symbols-outlined ${styles['relatedItemIcon']}`}>trending_flat</span>
                    </li>
                    <li className={styles['relatedItem']}>
                      <span className={styles['relatedItemNum']}>#441</span>
                      <span className={styles['relatedItemTitle']}>Convex Hull Trick</span>
                      <span className={`material-symbols-outlined ${styles['relatedItemIcon']}`}>trending_flat</span>
                    </li>
                    <li className={styles['relatedItem']}>
                      <span className={styles['relatedItemNum']}>#902</span>
                      <span className={styles['relatedItemTitle']}>Li-Chao Tree</span>
                      <span className={`material-symbols-outlined ${styles['relatedItemIcon']}`}>trending_flat</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section className={styles['section']}>
          <div className={`${styles['max-w-7xl']} ${styles['contributors-section']}`}>
            <div className={styles['contributors-header']}>
              <h3 className={styles['contributors-title']}>
                System <span className={styles['section-title-accent']}>Architects</span>
              </h3>
              <p className={styles['contributors-subtitle']}>Core Development Team</p>
            </div>

            <div className={styles['contributors-grid']}>
              {contributors.map((member) => (
                <div className={styles['contributor-card']} key={member.name}>
                  <div className={styles['contributor-content']}>
                    <div className={styles['contributor-avatar']}>
                      <img className={styles['contributor-avatar-img']} src={member.avatar} alt={member.name} />
                    </div>

                    <div className={styles['contributor-info']}>
                      <h4 className={styles['contributor-name']}>{member.name}</h4>
                      <p className={styles['contributor-role']}>Developer</p>
                    </div>

                    <div className={styles['contributor-socials']}>
                      <a className={styles['social-link']} href={member.linkedin} target="_blank" rel="noreferrer">
                        <span className="material-symbols-outlined">language</span>
                      </a>
                      <a className={styles['social-link']} href={member.github} target="_blank" rel="noreferrer">
                        <span className="material-symbols-outlined">code</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export { LandingPage };

