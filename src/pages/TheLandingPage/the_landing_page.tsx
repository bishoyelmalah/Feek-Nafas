import React from 'react';
import { Link } from 'react-router-dom';
import './the_landing_page.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import bishoyAvatar from '../../assets/Developers_avatars/Bishoy_avatar.jpg';
import bavlyAvatar from '../../assets/Developers_avatars/Bavly_avatar.jpg';
import paulaAvatar from '../../assets/Developers_avatars/Paula_avatar.jpg';
import farahAvatar from '../../assets/Developers_avatars/Farah_avatar.jpg';
import shahdAvatar from '../../assets/Developers_avatars/Shahd_avatar.jpg';

const contributors = [
  {
    name: 'Bishoy Mina',
    avatar: bishoyAvatar,
    linkedin: 'https://www.l  nkedin.com/in/bishoyelmalah/',
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
    name: 'Farah Ahmed Magdy',
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

const TheLandingPage: React.FC = () => {
  return (
    <div className="landing-page grid-overlay">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div
            className="hero-bg"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAECOzcNfS4cUGBMt1SRbV9xcEw-BuOGnWCA_fruxTfWegS-neXuR36XQbBzEOzgcpvJSBuqV8YGIt6qyS4CerU8h5bH6_C3tlPWuEXNOsQL7saNUtCJsPV57dGdN6Szvjo9E9FIzpiMticw2pl_L2RMfwi2BTmIu_vx1WbA6qjZC-32VU7fbRYMn4OKQxrG09PnaMtBuVe5nzhRB85CTEPDnyeNwcg6aqEUas-vQ2XG84ZLaNu2XKquvbSIfHERCfq4NjZ_g_hfcI')",
            }}
          />
          <div className="max-w-7xl hero-content">  
            <div className="hero-badge">
              <span className="hero-badge-text neon-text-blue">System Online: Season 04</span>
            </div>
            <h1 className="hero-title">
              DOMINATE <span className="hero-title-accent">THE CODE</span>
            </h1>
            <p className="hero-description">
              The ultimate cyberpunk e-sports competitive programming platform. Outpace, outcode,
              and outlive the competition in the high-stakes digital arena.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn-hero">
                <span>Initialize Combat</span>
                <span className="material-symbols-outlined icon">bolt</span>
              </Link>
              <button className="btn-secondary">View Rankings</button>
            </div>
          </div>
        </section>

        {/* AI Instructor */} 
        <section className="section section-dark">
          <div className="max-w-7xl">
            <div className="section-header">
              <span className="material-symbols-outlined section-icon">psychology</span>
              <h2 className="section-title">
                AI Instructor: <span className="section-title-accent">System Core</span>
              </h2>
            </div>
            <div className="card-grid">
              <div className="card">
                <div className="card-icon-bg">
                  <span className="material-symbols-outlined">troubleshoot</span>
                </div>
                <h3 className="card-title">
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>
                    data_object
                  </span>
                  Problem Clarification
                </h3>
                <p className="card-description">
                  Real-time neural analysis of complex constraints. Our AI breaks down cryptic
                  problem statements into actionable algorithmic paths.
                </p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '66%' }}></div>
                </div>
              </div>
              <div className="card">
                <div className="card-icon-bg" style={{ color: 'var(--accent-blue)' }}>
                  <span className="material-symbols-outlined">hub</span>
                </div>
                <h3 className="card-title">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: 'var(--accent-blue)' }}
                  >
                    neurology
                  </span>
                  Technique Deep-Dive
                </h3>
                <p className="card-description">
                  Master advanced algorithms with synthetic intelligence. Interactive walkthroughs
                  for segment trees, heavy-light decomposition, and more.
                </p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: '50%', backgroundColor: 'var(--accent-blue)' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Arena */}
        <section className="section" id="arena">
          <div className="max-w-7xl">
            <div style={{ marginBottom: '3rem' }}>
              <h2 className="section-title">
                The Arena <span style={{ color: 'var(--slate-600)' }}>Modes</span>
              </h2>
              <p style={{ color: 'var(--slate-500)', fontWeight: 500 }}>
                Select your battleground and prove your worth.
              </p>
            </div>
            <div className="card-grid card-grid-4">
              {/* 1v1 Duals */}
              <div className="arena-card">
                <div
                  className="arena-icon-box"
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#ef4444' }}>
                    swords
                  </span>
                </div>
                <h4 className="arena-card-title">1v1 Duals</h4>
                <p className="arena-card-description">
                  Solo or Team-based tactical duels. Instant matchmaking.
                </p>
                <span className="arena-card-badge" style={{ color: 'rgba(239, 68, 68, 0.7)' }}>
                  High Stakes
                </span>
              </div>
              {/* Champions League */}
              <div className="arena-card">
                <div
                  className="arena-icon-box"
                  style={{
                    backgroundColor: 'rgba(236, 91, 19, 0.1)',
                    border: '1px solid rgba(236, 91, 19, 0.3)',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>
                    trophy
                  </span>
                </div>
                <h4 className="arena-card-title">Champions</h4>
                <p className="arena-card-description">
                  Scheduled seasonal tournaments with massive point pools.
                </p>
                <span className="arena-card-badge" style={{ color: 'rgba(236, 91, 19, 0.7)' }}>
                  Tournament Mode
                </span>
              </div>
              {/* Tactical Games */}
              <div className="arena-card">
                <div
                  className="arena-icon-box"
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
                <h4 className="arena-card-title">Tactical X/O</h4>
                <p className="arena-card-description">Use shields and powers to sabotage opponents' logic.</p>
                <span className="arena-card-badge" style={{ color: 'rgba(0, 242, 255, 0.7)' }}>
                  Strategic
                </span>
              </div>
              {/* Polygon Integration */}
              <div className="arena-card">
                <div
                  className="arena-icon-box"
                  style={{
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#a855f7' }}>
                    grid_view
                  </span>
                </div>
                <h4 className="arena-card-title">Polygon Hub</h4>
                <p className="arena-card-description">
                  Full CD Ladder integration and problem development suite.
                </p>
                <span className="arena-card-badge" style={{ color: 'rgba(168, 85, 247, 0.7)' }}>
                  Integration
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Evolution System Section ──────────────────────────── */}
        <section className="evolutionSection">
          <div className="evolutionInner">
            <div className="evolutionText">
              <h2 className="evolutionTitle">
                Evolution <span className="evolutionTitleAccent">System</span>
              </h2>
              <div className="evolutionFeats">

                <div className="evolutionFeat">
                  <div className="featIconWrap featIconWrapPrimary">
                    <span className="material-symbols-outlined featIcon">
                      keyboard_double_arrow_up
                    </span>
                  </div>
                  <div>
                    <h5 className="featTitle">XP &amp; Level Ups</h5>
                    <p className="featDesc">
                      Earn data shards for every optimized submission. Level up to unlock
                      tier-specific avatars.
                    </p>
                  </div>
                </div>

                <div className="evolutionFeat">
                  <div className="featIconWrap featIconWrapBlue">
                    <span className="material-symbols-outlined featIcon">
                      electric_bolt
                    </span>
                  </div>
                  <div>
                    <h5 className="featTitle">Abilities Unlocked</h5>
                    <p className="featDesc">
                      Unlock "Blind Submission" (2x points) and "Time Siphon" at Level 20.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Profile Card */}
            <div className="profileCard">
              <div className="profileCardGridBg" aria-hidden="true" />
              <div className="profileCardContent">
                <div className="profileAvatarWrapper">
                  <div className="profileAvatar" aria-label="Cyberpunk character avatar" />
                </div>
                <h4 className="profileName">CYBER_PHANTOM</h4>
                <span className="profileTier">Grandmaster Tier</span>
                <div className="xpSection">
                  <div className="xpLabels">
                    <span>XP 24,500 / 30,000</span>
                    <span className="xpPercentage">81%</span>
                  </div>
                  <div className="xpTrack">
                    <div className="xpBar" />
                  </div>
                </div>
                <div className="profileStats">
                  <div className="profileStat">
                    <span className="profileStatLabel">Wins</span>
                    <span className="profileStatValue">412</span>
                  </div>
                  <div className="profileStat">
                    <span className="profileStatLabel">AC</span>
                    <span className="profileStatValue profileStatValueGreen">92%</span>
                  </div>
                  <div className="profileStat">
                    <span className="profileStatLabel">Rank</span>
                    <span className="profileStatValue profileStatValueBlue">#12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Leaderboard Section ───────────────────────────────── */}
        <section className="leaderboardSection">
          <div className="leaderboardInner">
            <div className="leaderboardTopRow">
              <div>
                <h2 className="leaderboardTitle">
                  Arena <span className="leaderboardTitleAccent">Rankings</span>
                </h2>
                <div className="liveIndicator">
                  <span className="liveBlip">
                    <span className="liveBlipPing" />
                    <span className="liveBlipDot" />
                  </span>
                  Blind Hour Active
                </div>
              </div>
              <div className="leaderboardFilters">
                <button className="filterBtnInactive">Individual</button>
                <button className="filterBtnActive">Teams</button>
              </div>
            </div>

            <div className="tableWrapper">
              <table className="leaderboardTable">
                <thead className="tableHead">
                  <tr>
                    <th className="tableHeadCell">Rank</th>
                    <th className="tableHeadCell">Hacker</th>
                    <th className="tableHeadCell">A</th>
                    <th className="tableHeadCell">B</th>
                    <th className="tableHeadCell">C</th>
                    <th className="tableHeadCell">D</th>
                    <th className="tableHeadCell">E</th>
                    <th className="tableHeadCell tableHeadCellRight">Penalty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="tableRow">
                    <td className="tableCell"><span className="rankPrimary">01</span></td>
                    <td className="tableCell">
                      <div className="hackerInfo">
                        <div className="hackerAvatar" />
                        <span className="hackerName">NeoCode_01</span>
                      </div>
                    </td>
                    <td className="tableCell"><span className="material-symbols-outlined iconGreen">check_circle</span></td>
                    <td className="tableCell"><span className="material-symbols-outlined iconGreen">check_circle</span></td>
                    <td className="tableCell"><span className="material-symbols-outlined iconDim">radio_button_unchecked</span></td>
                    <td className="tableCell"><span className="material-symbols-outlined iconRed">cancel</span></td>
                    <td className="tableCell"><span className="material-symbols-outlined iconDim">radio_button_unchecked</span></td>
                    <td className="tableCellRight">145</td>
                  </tr>

                  <tr className="tableRow tableRowHighlight">
                    <td className="tableCell"><span className="rankPrimary">02</span></td>
                    <td className="tableCell">
                      <div className="hackerInfo">
                        <div className="hackerAvatar" />
                        <span className="hackerName">NullPointer_Ex</span>
                      </div>
                    </td>
                    <td className="tableCell"><span className="material-symbols-outlined iconGreen">check_circle</span></td>
                    <td className="tableCell"><span className="material-symbols-outlined iconGreen">check_circle</span></td>
                    <td className="tableCell statusBlueText">???</td>
                    <td className="tableCell statusBlueText">???</td>
                    <td className="tableCell"><span className="material-symbols-outlined iconDim">radio_button_unchecked</span></td>
                    <td className="tableCellRight">182</td>
                  </tr>

                  <tr className="tableRow">
                    <td className="tableCell"><span className="rankDefault">03</span></td>
                    <td className="tableCell">
                      <div className="hackerInfo">
                        <div className="hackerAvatar" />
                        <span className="hackerName">BinaryWitch</span>
                      </div>
                    </td>
                    <td className="tableCell"><span className="material-symbols-outlined iconGreen">check_circle</span></td>
                    <td className="tableCell statusBlueText">???</td>
                    <td className="tableCell"><span className="material-symbols-outlined iconDim">radio_button_unchecked</span></td>
                    <td className="tableCell"><span className="material-symbols-outlined iconDim">radio_button_unchecked</span></td>
                    <td className="tableCell"><span className="material-symbols-outlined iconDim">radio_button_unchecked</span></td>
                    <td className="tableCellRight">204</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Community Nodes Section ───────────────────────────── */}
        <section className="communitySection">
          <div className="communityGrid">

            <div className="communityCol">
              <div className="communityColHeader">
                <span className="material-symbols-outlined communityColIcon">podcasts</span>
                <h3 className="communityColTitle">Live Nodes</h3>
              </div>
              <div className="liveNodesList">
                <div className="liveNodeCard liveNodeCardPrimary">
                  <div>
                    <p className="liveNodeTitle">System Design Talk</p>
                    <span className="liveNodeParticipants">12 Active Participants</span>
                  </div>
                  <span className="material-symbols-outlined liveNodeIconPrimary">volume_up</span>
                </div>
                <div className="liveNodeCard liveNodeCardBlue">
                  <div>
                    <p className="liveNodeTitle">Dynamic Programming 101</p>
                    <span className="liveNodeParticipants">48 Active Participants</span>
                  </div>
                  <span className="material-symbols-outlined liveNodeIconBlue">volume_up</span>
                </div>
              </div>
            </div>

            <div className="communityCol">
              <div className="communityColHeader">
                <span className="material-symbols-outlined communityColIcon">groups_3</span>
                <h3 className="communityColTitle">Global Tasks</h3>
              </div>
              <div className="globalTaskCard">
                <p className="globalTaskText">
                  COLLECTIVE CHALLENGE: Solve 5,000 DP problems as a community.
                </p>
                <div className="globalTaskTrack">
                  <div className="globalTaskBar" />
                </div>
                <div className="globalTaskLabels">
                  <span>3,250 AC</span>
                  <span>65% COMPLETE</span>
                </div>
              </div>
            </div>

            <div className="communityCol">
              <div className="communityColHeader">
                <span className="material-symbols-outlined communityColIcon">leaderboard</span>
                <h3 className="communityColTitle">Clan Wars</h3>
              </div>
              <div className="clanList">
                <div className="clanRow">
                  <div className="clanRowInfo">
                    <span className="clanRankPrimary">#1</span>
                    <span className="clanName">SYNTH_CORE</span>
                  </div>
                  <span className="clanPoints">12,400p</span>
                </div>
                <div className="clanRow">
                  <div className="clanRowInfo">
                    <span className="clanRankDim">#2</span>
                    <span className="clanName">NULL_VOID</span>
                  </div>
                  <span className="clanPoints">11,850p</span>
                </div>
                <div className="clanViewAll">
                  <button className="clanViewAllBtn">
                    View All Clans
                    <span className="material-symbols-outlined clanViewAllBtnIcon">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Training Grounds Section ──────────────────────────── */}
        <section className="trainingSection">
          <div className="trainingSectionInner">
            <div className="trainingGrid">

              <div>
                <h2 className="trainingTitle">
                  Training <br />
                  <span className="trainingTitleAccent">Grounds</span>
                </h2>
                <p className="trainingSubtitle">
                  Sharpen your edge before entering the ranked arena.
                </p>
                <div className="trainingBtns">
                  <button className="trainingBtnActive">
                    Algorithms
                    <span className="material-symbols-outlined">menu_book</span>
                  </button>
                  <button className="trainingBtnInactive">
                    Data Structures
                    <span className="material-symbols-outlined">account_tree</span>
                  </button>
                  <button className="trainingBtnInactive">
                    Math &amp; Logic
                    <span className="material-symbols-outlined">functions</span>
                  </button>
                </div>
              </div>

              <div className="trainingContent">

                <div className="challengeCard">
                  <div>
                    <div className="challengeCardTop">
                      <span className="challengeBadge">Hard Challenge</span>
                      <span className="material-symbols-outlined challengeBookmark">bookmark</span>
                    </div>
                    <h4 className="challengeTitle">Matrix Inversion 2.0</h4>
                    <p className="challengeDesc">
                      Master the efficient way of calculating inverse matrices under modulo prime
                      constraints.
                    </p>
                  </div>
                  <div className="challengeCardBottom">
                    <div className="challengeTimerInfo">
                      <span className="material-symbols-outlined challengeTimerIcon">schedule</span>
                      <span className="challengeTimerText">Timed Hints: 15:00</span>
                    </div>
                    <button className="challengePracticeBtn">Practice Now</button>
                  </div>
                </div>

                <div className="relatedCard">
                  <h5 className="relatedCardTitle">Related Problems</h5>
                  <ul className="relatedList">
                    <li className="relatedItem">
                      <span className="relatedItemNum">#812</span>
                      <span className="relatedItemTitle">Fast Fourier Transform</span>
                      <span className="material-symbols-outlined relatedItemIcon">trending_flat</span>
                    </li>
                    <li className="relatedItem">
                      <span className="relatedItemNum">#441</span>
                      <span className="relatedItemTitle">Convex Hull Trick</span>
                      <span className="material-symbols-outlined relatedItemIcon">trending_flat</span>
                    </li>
                    <li className="relatedItem">
                      <span className="relatedItemNum">#902</span>
                      <span className="relatedItemTitle">Li-Chao Tree</span>
                      <span className="material-symbols-outlined relatedItemIcon">trending_flat</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="max-w-7xl contributors-section">
            <div className="contributors-header">
              <h3 className="contributors-title">
                System <span className="section-title-accent">Architects</span>
              </h3>
              <p className="contributors-subtitle">Core Development Team</p>
            </div>

            <div className="contributors-grid">
              {contributors.map((member) => (
                <div className="contributor-card" key={member.name}>
                  <div className="contributor-content">
                    <div className="contributor-avatar">
                      <img className="contributor-avatar-img" src={member.avatar} alt={member.name} />
                    </div>

                    <div className="contributor-info">
                      <h4 className="contributor-name">{member.name}</h4>
                      <p className="contributor-role">Developer</p>
                    </div>

                    <div className="contributor-socials">
                      <a className="social-link" href={member.linkedin} target="_blank" rel="noreferrer">
                        <span className="material-symbols-outlined">language</span>
                      </a>
                      <a className="social-link" href={member.github} target="_blank" rel="noreferrer">
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

export default TheLandingPage;
