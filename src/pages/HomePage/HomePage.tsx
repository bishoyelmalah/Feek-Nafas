import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './HomePage.module.css';
import landingStyles from '../LandingPage/LandingPage.module.css';
import { useAuth } from '../../hooks/useAuth';

import { createInbox, removeInbox, checkMatchInvitations } from '../../services/invitationService';
import { type MatchData } from '../../types/MatchData';
import { getOpponentDetails } from '../../utils/getOpponentDetails';
import type { User } from '../../types/UserData';
import { type Notification } from '../../types/Notification';
import { getTopUsers, getUserRank } from '../../services/userService';

export function HomePage() {
    const navigate = useNavigate();
    const { userId } = useAuth();
    const [hasUnreadNotification, setHasUnreadNotification] = useState(false);
    const [notifications, setNotifications ] = useState<Notification[]>([]);
    const [topUsers, setTopUsers] = useState<any[]>([]);
    const [currentUserRank, setCurrentUserRank] = useState<any>(null);

    const handleFindMatch = () => {
        navigate('/findMatch');
    };

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const users = await getTopUsers(5);
            setTopUsers(users);
        };
        fetchLeaderboard();
    }, []);

    useEffect(() => {
        const fetchUserRank = async () => {
            if (!userId) {
                return;
            }
            const rankData = await getUserRank(userId);
            setCurrentUserRank(rankData);
        };
        fetchUserRank();
    }, [userId]);

    useEffect(() => {
        if (!userId) {
            return;
        }
        const inboxChannel = createInbox(userId, async (invitation: MatchData) => {
            setHasUnreadNotification(true);
            const opponent: User | undefined = await getOpponentDetails(invitation.player1_id);
            setNotifications((prev) => [...prev, {
                body: `You have a new match invitation from ${opponent?.username}`,
                matchId: invitation.id
            }]);
        });

        checkMatchInvitations(userId, async (matches: MatchData[]) => {
            if (!matches?.length) {
                return;
            }

            const invitations = await Promise.all(
                matches.map(async (match: MatchData) => {
                    const opponent = await getOpponentDetails(match.player1_id);
                    return {
                        body: `You have a new match invitation from ${opponent?.username}`,
                        matchId: match.id
                    };
                })
            );

            setHasUnreadNotification(true);
            setNotifications((prev) => [...prev, ...invitations]);
        });

        return () => {
            removeInbox(inboxChannel);
        };
    }, [userId]);

    return (
        <>
            <Header
                activeLink="arena"
                notificationCount={hasUnreadNotification ? 1 : 0}
                onNotificationOpened={() => setHasUnreadNotification(false)}
                notifications={notifications}
            />

            <main className={styles.contentSpacing}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
                    <section className={styles.heroSection}>


                        <div className={`${styles.heroContent} ${styles.heroContentSpacing}`}>
                            <div className={styles.seasonBadge}>
                                <span className={styles.pulseDot}>
                                    <span className={styles.pulseOuter}></span>
                                    <span className={styles.pulseInner}></span>
                                </span>
                                Season 4
                            </div>

                            <h2 className={styles.heroTitle}>
                                PROVE YOUR <br /> <span className={styles.highlight}>LOGIC</span>.
                            </h2>

                            <p className={styles.heroDescription}>
                                The ultimate competitive terminal for high-velocity coders. Scale the ranks, dominate the arena, and define your legacy in real-time.
                            </p>

                            <div className={styles.heroButtons}>
                                <button 
                                    className={styles.btnPrimary}
                                    onClick={handleFindMatch}
                                >
                                    <span> FIND THE MATCH </span>
                                </button>
                            </div>

                            <div className={styles.terminalLog}>
                                [ROOT@SERVER]: INIT_CONNECTION_ESTABLISHED... <br />
                                [SYSTEM]: DECRYPTING_MATCH_LOGS...
                            </div>
                        </div>
                    </section>

                    {/* Leaderboard Section */}
                    <section className={landingStyles['leaderboardSection']} id="arena-rankings" style={{ marginTop: 0 }}>
                        <div className={landingStyles['leaderboardInner']}>
                            <div className={landingStyles['leaderboardTopRow']}>
                                <div>
                                    <h2 className={landingStyles['leaderboardTitle']}>
                                        Arena <span className={landingStyles['leaderboardTitleAccent']}>Rankings</span>
                                    </h2>
                                </div>
                            </div>

                            <div className={landingStyles['tableWrapper']}>
                                <table className={landingStyles['leaderboardTable']}>
                                    <thead className={landingStyles['tableHead']}>
                                        <tr>
                                            <th className={landingStyles['tableHeadCell']}>Rank</th>
                                            <th className={landingStyles['tableHeadCell']}>Contestants</th>
                                            <th className={landingStyles['tableHeadCell']}>Codeforces Handle</th>
                                            <th className={`${landingStyles['tableHeadCell']} ${landingStyles['tableHeadCellRight']}`}>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topUsers.map((user, index) => {
                                            let rowClass = landingStyles['tableRow'];
                                            
                                            // First place gets priority styling
                                            if (index === 0) {
                                                rowClass = `${landingStyles['tableRow']} ${landingStyles['tableRowFirstPlace']}`;
                                            } else if (user.id === userId) {
                                                rowClass = `${landingStyles['tableRow']} ${landingStyles['tableRowCurrentUser']}`;
                                            } else if (index === 1) {
                                                rowClass = `${landingStyles['tableRow']} ${landingStyles['tableRowSecondPlace']}`;
                                            } else if (index === 2) {
                                                rowClass = `${landingStyles['tableRow']} ${landingStyles['tableRowThirdPlace']}`;
                                            }

                                            return (
                                                <tr key={user.id} className={rowClass}>
                                                    <td className={landingStyles['tableCell']}>
                                                        <span className={index === 0 ? landingStyles['rankPrimary'] : landingStyles['rankDefault']}>
                                                            {String(index + 1).padStart(2, '0')}
                                                        </span>
                                                    </td>
                                                    <td className={landingStyles['tableCell']}>
                                                        <div className={landingStyles['hackerInfo']}>
                                                            <div className={landingStyles['hackerAvatar']} />
                                                            <span className={landingStyles['hackerName']}>{user.username}</span>
                                                        </div>
                                                    </td>
                                                    <td className={landingStyles['tableCell']}>
                                                        <span className={landingStyles['codeforcesHandle']}>{user.codeforces_handle || '-'}</span>
                                                    </td>
                                                    <td className={landingStyles['tableCellRight']}>
                                                        <span className={landingStyles['userScore']}>{user.score}</span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {currentUserRank && currentUserRank.rank > 5 && (
                                            <tr className={`${landingStyles['tableRow']} ${landingStyles['tableRowCurrentUser']}`}>
                                                <td className={landingStyles['tableCell']}>
                                                    <span className={landingStyles['rankDefault']}>
                                                        {String(currentUserRank.rank).padStart(2, '0')}
                                                    </span>
                                                </td>
                                                <td className={landingStyles['tableCell']}>
                                                    <div className={landingStyles['hackerInfo']}>
                                                        <div className={landingStyles['hackerAvatar']} />
                                                        <span className={landingStyles['hackerName']}>{currentUserRank.username}</span>
                                                    </div>
                                                </td>
                                                <td className={landingStyles['tableCell']}>
                                                    <span className={landingStyles['codeforcesHandle']}>{currentUserRank.codeforces_handle || '-'}</span>
                                                </td>
                                                <td className={landingStyles['tableCellRight']}>
                                                    <span className={landingStyles['userScore']}>{currentUserRank.score}</span>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Training Grounds Section */}
                <section className={landingStyles['trainingSection']} id="training-grounds">
                  <div className={landingStyles['trainingSectionInner']}>
                    <div className={landingStyles['trainingGrid']}>

                      <div>
                        <h2 className={landingStyles['trainingTitle']}>
                          Training <br />
                          <span className={landingStyles['trainingTitleAccent']}>Grounds</span>
                        </h2>
                        <p className={landingStyles['trainingSubtitle']}>
                          Sharpen your edge before entering the ranked arena.
                        </p>
                        <div className={landingStyles['trainingBtns']}>
                          <button className={landingStyles['trainingBtnActive']} onClick={()=>window.open("https://codeforces.com/blog/entry/148942" ,'blank')}>
                            Algorithms
                            <span className="material-symbols-outlined">menu_book</span>
                          </button>
                          <button className={landingStyles['trainingBtnInactive']} onClick={()=>window.open("https://codeforces.com/blog/entry/15729" ,'blank')}>
                            Data Structures
                            <span className="material-symbols-outlined">account_tree</span>
                          </button>
                          <button className={landingStyles['trainingBtnInactive']} onClick={()=>window.open("https://codeforces.com/blog/entry/59617" ,'blank')}>
                            Math &amp; Logic
                            <span className="material-symbols-outlined">functions</span>
                          </button>
                        </div>
                      </div>

                      <div className={landingStyles['trainingContent']}>

                        <div className={landingStyles['challengeCard']}>
                          <div>
                            <div className={landingStyles['challengeCardTop']}>
                              <span className={landingStyles['challengeBadge']}>Hard Challenge</span>
                              <span className={`material-symbols-outlined ${landingStyles['challengeBookmark']}`}>bookmark</span>
                            </div>
                            <h4 className={landingStyles['challengeTitle']}>Matrix Inversion 2.0</h4>
                            <p className={landingStyles['challengeDesc']}>
                              Master the efficient way of calculating inverse matrices under modulo prime
                              constraints.
                            </p>
                          </div>
                          <div className={landingStyles['challengeCardBottom']}>
                            <div className={landingStyles['challengeTimerInfo']}>
                              <span className={`material-symbols-outlined ${landingStyles['challengeTimerIcon']}`}>schedule</span>
                              <span className={landingStyles['challengeTimerText']}>Timed Hints: 15:00</span>
                            </div>
                            <button className={landingStyles['challengePracticeBtn']} onClick={() => window.open("https://codeforces.com/problemset/problem/274/D", "_blank")}>Practice Now</button>
                          </div>
                        </div>

                        <div className={landingStyles['relatedCard']}>
                          <h5 className={landingStyles['relatedCardTitle']}>Related Problems</h5>
                          <ul className={landingStyles['relatedList']}>
                            <li className={landingStyles['relatedItem']}>
                              <span className={landingStyles['relatedItemNum']}>#812</span>
                              <span className={landingStyles['relatedItemTitle']}><a href = "https://codeforces.com/problemset/problem/812/C" target="_blank">Fast Fourier Transform</a></span>
                              <span className={`material-symbols-outlined ${landingStyles['relatedItemIcon']}`}>trending_flat</span>
                            </li>
                            <li className={landingStyles['relatedItem']}>
                              <span className={landingStyles['relatedItemNum']}>#441</span>
                              <span className={landingStyles['relatedItemTitle']}><a href = "https://codeforces.com/problemset/problem/441/D" target="_blank">Valera and Swaps</a></span>
                              <span className={`material-symbols-outlined ${landingStyles['relatedItemIcon']}`}>trending_flat</span>
                            </li>
                            <li className={landingStyles['relatedItem']}>
                              <span className={landingStyles['relatedItemNum']}>#902</span>
                              <span className={landingStyles['relatedItemTitle']}><a href = "https://codeforces.com/problemset/problem/902/E" target="_blank">Bipartite Segments</a></span>
                              <span className={`material-symbols-outlined ${landingStyles['relatedItemIcon']}`}>trending_flat</span>
                            </li>
                          </ul>
                        </div>

                      </div>
                    </div>
                  </div>
                </section>

 
            </main>

            <Footer />
        </>
    );
}