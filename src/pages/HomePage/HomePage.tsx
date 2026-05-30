import React, { useEffect, useState, startTransition } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './HomePage.module.css';
import landingStyles from '../LandingPage/LandingPage.module.css';
import { useAuth } from '../../hooks/useAuth';

import { getActiveMatch } from '../../services/matchService';
import { Modal } from '../../components/Modal/Modal';

export function HomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = useAuth();
    const [isCheckingActiveMatch, setIsCheckingActiveMatch] = useState(true);

    const [modalConfig, setModalConfig] = useState<{isOpen: boolean, message: string}>({isOpen: false, message: ''});

    useEffect(() => {
        if (location.state?.notification) {
            startTransition(()=>{
                setModalConfig({
                    isOpen: true,
                    message: location.state.notification
                })
            })
            // Clear location state to prevent alert on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    useEffect(() => {
        const checkActiveMatch = async () => {
            if (!userId) {
                setIsCheckingActiveMatch(false);
                return;
            }
            try {
                const activeMatch = await getActiveMatch(userId);
                if (activeMatch) {
                    if (activeMatch.status === 'accepted') {
                        navigate(`/getReady/${activeMatch.id}`);
                        return; // Prevent setting isCheckingActiveMatch to false
                    } else if (activeMatch.status === 'in_progress') {
                        navigate(`/match/${activeMatch.id}`);
                        return; // Prevent setting isCheckingActiveMatch to false
                    }
                }
                setIsCheckingActiveMatch(false);
            } catch (error) {
                console.error('Failed to check for active match:', error);
                setIsCheckingActiveMatch(false);
            }
        };
        checkActiveMatch();
    }, [userId, navigate]);

    const handleFindMatch = () => {
        navigate('/findMatch');
    };

    if (isCheckingActiveMatch) {
        return null; // Or a splash screen/spinner
    }

    return (
        <>
            <Header activeLink="arena" />

            <main className={styles.contentSpacing}>
                <section className={styles.heroSection}>
                    <div className={styles.heroBg}>
                        <div className={styles.heroBgGradient}></div>
                        <img 
                            src="/image.jpg" 
                            alt="Competitive coding arena" 
                            className={styles.heroBgImg} 
                        />
                    </div>
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
                              <span className={landingStyles['relatedItemTitle']}><a href = "https://codeforces.com/problemset/problem/812/C" target="_blank">Sagheer and Nubian Market</a></span>
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
            
            <Modal 
                isOpen={modalConfig.isOpen}
                title="Match Update"
                message={modalConfig.message}
                onConfirm={() => setModalConfig({isOpen: false, message: ''})}
                confirmText="OK"
                type="alert"
            />
        </>
    );
}