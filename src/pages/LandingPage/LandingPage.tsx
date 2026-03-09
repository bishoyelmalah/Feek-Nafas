import styles from './LandingPage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router';

export function LandingPage() {
    const navigate = useNavigate();
  return (
    <div className={styles.pageWrapper}>

      {/* ── Navigation ───────────────────────────────────────── */}
      {/* <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <div className={styles.logo}>
              <span className={`material-symbols-outlined ${styles.logoIcon}`}>terminal</span>
              <h2 className={styles.logoText}>Feek Nafas</h2>
            </div>
            <nav className={styles.nav}>
              <a className={styles.navLink} href="#">Arena</a>
              <a className={styles.navLink} href="#">Leaderboard</a>
              <a className={styles.navLink} href="#">Training</a>
              <a className={styles.navLink} href="#">Nodes</a>
            </nav>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.searchBox}>
              <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
              <input
                className={styles.searchInput}
                placeholder="Search Matrix..."
                type="text"
              />
            </div>
            <button className={styles.enterArenaBtn}>Enter Arena</button>
          </div>
        </div>
      </header> */}
      <Header />

      <main className={styles.main}>

        {/* ── Hero Section ─────────────────────────────────────── */}
        <section className={styles.heroSection}>
          <div className={styles.heroBg} aria-hidden="true" />
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeText}>System Online: Season 04</span>
            </div>
            <h1 className={styles.heroTitle}>
              DOMINATE <span className={styles.heroTitleAccent}>THE CODE</span>
            </h1>
            <p className={styles.heroSubtitle}>
              The ultimate cyberpunk e-sports competitive programming platform. Outpace, outcode,
              and outlive the competition in the high-stakes digital arena.
            </p>
            <div className={styles.heroCtas}>
              <button className={styles.primaryBtn} onClick={(e)=>{
                e.preventDefault();
                navigate('/register');
              }}>
                <span>Initialize Combat</span>
                <span className={`material-symbols-outlined ${styles.primaryBtnIcon}`}>bolt</span>
              </button>
              <button className={styles.secondaryBtn}>View Rankings</button>
            </div>
          </div>
        </section>

        {/* ── AI Instructor Section ─────────────────────────────── */}
        <section className={styles.aiSection}>
          <div className={styles.aiSectionInner}>
            <div className={styles.aiSectionHeader}>
              <span className={`material-symbols-outlined ${styles.aiHeaderIcon}`}>psychology</span>
              <h2 className={styles.aiSectionTitle}>
                AI Instructor: <span className={styles.aiSectionTitleAccent}>System Core</span>
              </h2>
            </div>
            <div className={styles.aiGrid}>

              {/* Problem Clarification card */}
              <div className={styles.aiCard}>
                <div className={styles.aiCardBgIcon}>
                  <span className={`material-symbols-outlined ${styles.aiCardBgIconText}`}>
                    troubleshoot
                  </span>
                </div>
                <h3 className={styles.aiCardTitle}>
                  <span className={`material-symbols-outlined ${styles.aiCardTitleIcon}`}>
                    data_object
                  </span>
                  Problem Clarification
                </h3>
                <p className={styles.aiCardText}>
                  Real-time neural analysis of complex constraints. Our AI breaks down cryptic
                  problem statements into actionable algorithmic paths.
                </p>
                <div className={styles.aiProgressTrack}>
                  <div className={styles.aiProgressBar} />
                </div>
              </div>

              {/* Technique Deep-Dive card */}
              <div className={`${styles.aiCard} ${styles.aiCardBlue}`}>
                <div className={`${styles.aiCardBgIcon} ${styles.aiCardBlueBgIcon}`}>
                  <span className={`material-symbols-outlined ${styles.aiCardBgIconText}`}>
                    hub
                  </span>
                </div>
                <h3 className={styles.aiCardTitle}>
                  <span className={`material-symbols-outlined ${styles.aiCardTitleIconBlue}`}>
                    neurology
                  </span>
                  Technique Deep-Dive
                </h3>
                <p className={styles.aiCardText}>
                  Master advanced algorithms with synthetic intelligence. Interactive walkthroughs
                  for segment trees, heavy-light decomposition, and more.
                </p>
                <div className={styles.aiProgressTrack}>
                  <div className={`${styles.aiProgressBar} ${styles.aiProgressBarBlue}`} />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Arena Modes Section ───────────────────────────────── */}
        <section className={styles.arenaSection}>
          <div className={styles.arenaSectionInner}>
            <div className={styles.arenaSectionHeader}>
              <h2 className={styles.arenaSectionTitle}>
                The Arena <span className={styles.arenaSectionTitleDim}>Modes</span>
              </h2>
              <p className={styles.arenaSectionSubtitle}>
                Select your battleground and prove your worth.
              </p>
            </div>
            <div className={styles.arenaGrid}>

              {/* 1v1 Duals */}
              <div className={styles.arenaCard}>
                <div className={`${styles.arenaCardIconWrap} ${styles.arenaCardIconRed}`}>
                  <span className={`material-symbols-outlined ${styles.arenaCardIcon}`}>swords</span>
                </div>
                <h4 className={styles.arenaCardTitle}>1v1 Duals</h4>
                <p className={styles.arenaCardText}>
                  Solo or Team-based tactical duels. Instant matchmaking.
                </p>
                <span className={`${styles.arenaCardTag} ${styles.arenaCardTagRed}`}>
                  High Stakes
                </span>
              </div>

              {/* Champions */}
              <div className={styles.arenaCard}>
                <div className={`${styles.arenaCardIconWrap} ${styles.arenaCardIconPrimary}`}>
                  <span className={`material-symbols-outlined ${styles.arenaCardIcon}`}>trophy</span>
                </div>
                <h4 className={styles.arenaCardTitle}>Champions</h4>
                <p className={styles.arenaCardText}>
                  Scheduled seasonal tournaments with massive point pools.
                </p>
                <span className={`${styles.arenaCardTag} ${styles.arenaCardTagPrimary}`}>
                  Tournament Mode
                </span>
              </div>

              {/* Tactical X/O */}
              <div className={styles.arenaCard}>
                <div className={`${styles.arenaCardIconWrap} ${styles.arenaCardIconBlue}`}>
                  <span className={`material-symbols-outlined ${styles.arenaCardIcon}`}>
                    shield_with_heart
                  </span>
                </div>
                <h4 className={styles.arenaCardTitle}>Tactical X/O</h4>
                <p className={styles.arenaCardText}>
                  Use shields and powers to sabotage opponents' logic.
                </p>
                <span className={`${styles.arenaCardTag} ${styles.arenaCardTagBlue}`}>
                  Strategic
                </span>
              </div>

              {/* Polygon Hub */}
              <div className={styles.arenaCard}>
                <div className={`${styles.arenaCardIconWrap} ${styles.arenaCardIconPurple}`}>
                  <span className={`material-symbols-outlined ${styles.arenaCardIcon}`}>
                    grid_view
                  </span>
                </div>
                <h4 className={styles.arenaCardTitle}>Polygon Hub</h4>
                <p className={styles.arenaCardText}>
                  Full CD Ladder integration and problem development suite.
                </p>
                <span className={`${styles.arenaCardTag} ${styles.arenaCardTagPurple}`}>
                  Integration
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* ── Evolution System Section ──────────────────────────── */}
        <section className={styles.evolutionSection}>
          <div className={styles.evolutionInner}>
            <div className={styles.evolutionText}>
              <h2 className={styles.evolutionTitle}>
                Evolution <span className={styles.evolutionTitleAccent}>System</span>
              </h2>
              <div className={styles.evolutionFeats}>

                <div className={styles.evolutionFeat}>
                  <div className={`${styles.featIconWrap} ${styles.featIconWrapPrimary}`}>
                    <span className={`material-symbols-outlined ${styles.featIcon}`}>
                      keyboard_double_arrow_up
                    </span>
                  </div>
                  <div>
                    <h5 className={styles.featTitle}>XP &amp; Level Ups</h5>
                    <p className={styles.featDesc}>
                      Earn data shards for every optimized submission. Level up to unlock
                      tier-specific avatars.
                    </p>
                  </div>
                </div>

                <div className={styles.evolutionFeat}>
                  <div className={`${styles.featIconWrap} ${styles.featIconWrapBlue}`}>
                    <span className={`material-symbols-outlined ${styles.featIcon}`}>
                      electric_bolt
                    </span>
                  </div>
                  <div>
                    <h5 className={styles.featTitle}>Abilities Unlocked</h5>
                    <p className={styles.featDesc}>
                      Unlock "Blind Submission" (2x points) and "Time Siphon" at Level 20.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Profile Card */}
            <div className={styles.profileCard}>
              <div className={styles.profileCardGridBg} aria-hidden="true" />
              <div className={styles.profileCardContent}>
                <div className={styles.profileAvatarWrapper}>
                  <div
                    className={styles.profileAvatar}
                    aria-label="Cyberpunk character avatar"
                  />
                </div>
                <h4 className={styles.profileName}>CYBER_PHANTOM</h4>
                <span className={styles.profileTier}>Grandmaster Tier</span>
                <div className={styles.xpSection}>
                  <div className={styles.xpLabels}>
                    <span>XP 24,500 / 30,000</span>
                    <span className={styles.xpPercentage}>81%</span>
                  </div>
                  <div className={styles.xpTrack}>
                    <div className={styles.xpBar} />
                  </div>
                </div>
                <div className={styles.profileStats}>
                  <div className={styles.profileStat}>
                    <span className={styles.profileStatLabel}>Wins</span>
                    <span className={styles.profileStatValue}>412</span>
                  </div>
                  <div className={styles.profileStat}>
                    <span className={styles.profileStatLabel}>AC</span>
                    <span className={`${styles.profileStatValue} ${styles.profileStatValueGreen}`}>
                      92%
                    </span>
                  </div>
                  <div className={styles.profileStat}>
                    <span className={styles.profileStatLabel}>Rank</span>
                    <span className={`${styles.profileStatValue} ${styles.profileStatValueBlue}`}>
                      #12
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Leaderboard Section ───────────────────────────────── */}
        <section className={styles.leaderboardSection}>
          <div className={styles.leaderboardInner}>
            <div className={styles.leaderboardTopRow}>
              <div>
                <h2 className={styles.leaderboardTitle}>
                  Arena <span className={styles.leaderboardTitleAccent}>Rankings</span>
                </h2>
                <div className={styles.liveIndicator}>
                  <span className={styles.liveBlip}>
                    <span className={styles.liveBlipPing} />
                    <span className={styles.liveBlipDot} />
                  </span>
                  Blind Hour Active
                </div>
              </div>
              <div className={styles.leaderboardFilters}>
                <button className={styles.filterBtnInactive}>Individual</button>
                <button className={styles.filterBtnActive}>Teams</button>
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.leaderboardTable}>
                <thead className={styles.tableHead}>
                  <tr>
                    <th className={styles.tableHeadCell}>Rank</th>
                    <th className={styles.tableHeadCell}>Hacker</th>
                    <th className={styles.tableHeadCell}>A</th>
                    <th className={styles.tableHeadCell}>B</th>
                    <th className={styles.tableHeadCell}>C</th>
                    <th className={styles.tableHeadCell}>D</th>
                    <th className={styles.tableHeadCell}>E</th>
                    <th className={`${styles.tableHeadCell} ${styles.tableHeadCellRight}`}>
                      Penalty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <span className={styles.rankPrimary}>01</span>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.hackerInfo}>
                        <div className={styles.hackerAvatar} />
                        <span className={styles.hackerName}>NeoCode_01</span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`material-symbols-outlined ${styles.iconGreen}`}>
                        check_circle
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`material-symbols-outlined ${styles.iconGreen}`}>
                        check_circle
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`material-symbols-outlined ${styles.iconDim}`}>
                        radio_button_unchecked
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`material-symbols-outlined ${styles.iconRed}`}>cancel</span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`material-symbols-outlined ${styles.iconDim}`}>
                        radio_button_unchecked
                      </span>
                    </td>
                    <td className={styles.tableCellRight}>145</td>
                  </tr>

                  <tr className={`${styles.tableRow} ${styles.tableRowHighlight}`}>
                    <td className={styles.tableCell}>
                      <span className={styles.rankPrimary}>02</span>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.hackerInfo}>
                        <div className={styles.hackerAvatar} />
                        <span className={styles.hackerName}>NullPointer_Ex</span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`material-symbols-outlined ${styles.iconGreen}`}>
                        check_circle
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`material-symbols-outlined ${styles.iconGreen}`}>
                        check_circle
                      </span>
                    </td>
                    <td className={`${styles.tableCell} ${styles.statusBlueText}`}>???</td>
                    <td className={`${styles.tableCell} ${styles.statusBlueText}`}>???</td>
                    <td className={styles.tableCell}>
                      <span className={`material-symbols-outlined ${styles.iconDim}`}>
                        radio_button_unchecked
                      </span>
                    </td>
                    <td className={styles.tableCellRight}>182</td>
                  </tr>

                  <tr className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <span className={styles.rankDefault}>03</span>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.hackerInfo}>
                        <div className={styles.hackerAvatar} />
                        <span className={styles.hackerName}>BinaryWitch</span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`material-symbols-outlined ${styles.iconGreen}`}>
                        check_circle
                      </span>
                    </td>
                    <td className={`${styles.tableCell} ${styles.statusBlueText}`}>???</td>
                    <td className={styles.tableCell}>
                      <span className={`material-symbols-outlined ${styles.iconDim}`}>
                        radio_button_unchecked
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`material-symbols-outlined ${styles.iconDim}`}>
                        radio_button_unchecked
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`material-symbols-outlined ${styles.iconDim}`}>
                        radio_button_unchecked
                      </span>
                    </td>
                    <td className={styles.tableCellRight}>204</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Community Nodes Section ───────────────────────────── */}
        <section className={styles.communitySection}>
          <div className={styles.communityGrid}>

            {/* Live Nodes */}
            <div className={styles.communityCol}>
              <div className={styles.communityColHeader}>
                <span className={`material-symbols-outlined ${styles.communityColIcon}`}>
                  podcasts
                </span>
                <h3 className={styles.communityColTitle}>Live Nodes</h3>
              </div>
              <div className={styles.liveNodesList}>
                <div className={`${styles.liveNodeCard} ${styles.liveNodeCardPrimary}`}>
                  <div>
                    <p className={styles.liveNodeTitle}>System Design Talk</p>
                    <span className={styles.liveNodeParticipants}>12 Active Participants</span>
                  </div>
                  <span className={`material-symbols-outlined ${styles.liveNodeIconPrimary}`}>
                    volume_up
                  </span>
                </div>
                <div className={`${styles.liveNodeCard} ${styles.liveNodeCardBlue}`}>
                  <div>
                    <p className={styles.liveNodeTitle}>Dynamic Programming 101</p>
                    <span className={styles.liveNodeParticipants}>48 Active Participants</span>
                  </div>
                  <span className={`material-symbols-outlined ${styles.liveNodeIconBlue}`}>
                    volume_up
                  </span>
                </div>
              </div>
            </div>

            {/* Global Tasks */}
            <div className={styles.communityCol}>
              <div className={styles.communityColHeader}>
                <span className={`material-symbols-outlined ${styles.communityColIcon}`}>
                  groups_3
                </span>
                <h3 className={styles.communityColTitle}>Global Tasks</h3>
              </div>
              <div className={styles.globalTaskCard}>
                <p className={styles.globalTaskText}>
                  COLLECTIVE CHALLENGE: Solve 5,000 DP problems as a community.
                </p>
                <div className={styles.globalTaskTrack}>
                  <div className={styles.globalTaskBar} />
                </div>
                <div className={styles.globalTaskLabels}>
                  <span>3,250 AC</span>
                  <span>65% COMPLETE</span>
                </div>
              </div>
            </div>

            {/* Clan Wars */}
            <div className={styles.communityCol}>
              <div className={styles.communityColHeader}>
                <span className={`material-symbols-outlined ${styles.communityColIcon}`}>
                  leaderboard
                </span>
                <h3 className={styles.communityColTitle}>Clan Wars</h3>
              </div>
              <div className={styles.clanList}>
                <div className={styles.clanRow}>
                  <div className={styles.clanRowInfo}>
                    <span className={styles.clanRankPrimary}>#1</span>
                    <span className={styles.clanName}>SYNTH_CORE</span>
                  </div>
                  <span className={styles.clanPoints}>12,400p</span>
                </div>
                <div className={styles.clanRow}>
                  <div className={styles.clanRowInfo}>
                    <span className={styles.clanRankDim}>#2</span>
                    <span className={styles.clanName}>NULL_VOID</span>
                  </div>
                  <span className={styles.clanPoints}>11,850p</span>
                </div>
                <div className={styles.clanViewAll}>
                  <button className={styles.clanViewAllBtn}>
                    View All Clans
                    <span className={`material-symbols-outlined ${styles.clanViewAllBtnIcon}`}>
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Training Grounds Section ──────────────────────────── */}
        <section className={styles.trainingSection}>
          <div className={styles.trainingSectionInner}>
            <div className={styles.trainingGrid}>

              {/* Sidebar */}
              <div>
                <h2 className={styles.trainingTitle}>
                  Training <br />
                  <span className={styles.trainingTitleAccent}>Grounds</span>
                </h2>
                <p className={styles.trainingSubtitle}>
                  Sharpen your edge before entering the ranked arena.
                </p>
                <div className={styles.trainingBtns}>
                  <button className={styles.trainingBtnActive}>
                    Algorithms
                    <span className="material-symbols-outlined">menu_book</span>
                  </button>
                  <button className={styles.trainingBtnInactive}>
                    Data Structures
                    <span className="material-symbols-outlined">account_tree</span>
                  </button>
                  <button className={styles.trainingBtnInactive}>
                    Math &amp; Logic
                    <span className="material-symbols-outlined">functions</span>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className={styles.trainingContent}>

                {/* Challenge Card */}
                <div className={styles.challengeCard}>
                  <div>
                    <div className={styles.challengeCardTop}>
                      <span className={styles.challengeBadge}>Hard Challenge</span>
                      <span className={`material-symbols-outlined ${styles.challengeBookmark}`}>
                        bookmark
                      </span>
                    </div>
                    <h4 className={styles.challengeTitle}>Matrix Inversion 2.0</h4>
                    <p className={styles.challengeDesc}>
                      Master the efficient way of calculating inverse matrices under modulo prime
                      constraints.
                    </p>
                  </div>
                  <div className={styles.challengeCardBottom}>
                    <div className={styles.challengeTimerInfo}>
                      <span className={`material-symbols-outlined ${styles.challengeTimerIcon}`}>
                        schedule
                      </span>
                      <span className={styles.challengeTimerText}>Timed Hints: 15:00</span>
                    </div>
                    <button className={styles.challengePracticeBtn}>Practice Now</button>
                  </div>
                </div>

                {/* Related Problems Card */}
                <div className={styles.relatedCard}>
                  <h5 className={styles.relatedCardTitle}>Related Problems</h5>
                  <ul className={styles.relatedList}>
                    <li className={styles.relatedItem}>
                      <span className={styles.relatedItemNum}>#812</span>
                      <span className={styles.relatedItemTitle}>Fast Fourier Transform</span>
                      <span className={`material-symbols-outlined ${styles.relatedItemIcon}`}>
                        trending_flat
                      </span>
                    </li>
                    <li className={styles.relatedItem}>
                      <span className={styles.relatedItemNum}>#441</span>
                      <span className={styles.relatedItemTitle}>Convex Hull Trick</span>
                      <span className={`material-symbols-outlined ${styles.relatedItemIcon}`}>
                        trending_flat
                      </span>
                    </li>
                    <li className={styles.relatedItem}>
                      <span className={styles.relatedItemNum}>#902</span>
                      <span className={styles.relatedItemTitle}>Li-Chao Tree</span>
                      <span className={`material-symbols-outlined ${styles.relatedItemIcon}`}>
                        trending_flat
                      </span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <Footer/>
    </div>
  );
}
