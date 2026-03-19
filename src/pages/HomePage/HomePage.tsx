import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './HomePage.module.css'; 
import { useAuth } from '../../services/authService';

import { createInbox, removeInbox } from '../../services/invitationService';
import { type MatchData } from '../../types/MatchData';
import { getOpponentDetails } from '../../utils/getOpponentDetails';
import type { User } from '../../types/UserData';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';

export function HomePage() {
    const navigate = useNavigate();
    const { userId } = useAuth();
    const [hasUnreadNotification, setHasUnreadNotification] = useState(false);
    const [notification, setNotification ] = useState<string>();
    const [matchId, setMatchId] = useState('');

    const handleFindMatch = () => {
        navigate('/findMatch');
    };

    useEffect(() => {
        if (!userId) {
            return;
        }

        const inboxChannel = createInbox(userId, async (invitation: MatchData) => {
            setHasUnreadNotification(true);
            const opponent: User | undefined = await getOpponentDetails(invitation.player1_id);
            setMatchId(invitation.id);
            setNotification(`You have a new match invitation from ${opponent?.username}`);
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
                notification={notification}
                matchId={matchId}
            />

            <main className={styles.contentSpacing}>
                <section className={styles.heroSection}>
                    <div className={styles.heroBg}>
                        <div className={styles.heroBgGradient}></div>
                        <img
                            data-alt="High tech server room with orange glow"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJhpmlnavepBwsqGIol1FDPsy2BkLlawrtpK2EChGjZW7dJYZedK9U1yd01Wo7Wq8RiL-13SAZcA1FuvV5lCjEyr00FMMytmT9PUo09RbnG3escGPRbbtmQTJ_rOiGPVoRODROCVcLjl85WXkZStwiVMAFmMjIqxobMaQTvicBok5Ai8tqrfN8brKqSXhicecnDVoHFUEWjM-zesKfbRfsPwnFwT4QJpcRi3nGjxpZM7quAxRC7SYkfzkpuzlwLgbJkzYRplGJ2Lg"
                            className={styles.heroBgImg}
                        />
                    </div>

                    <div className={`${styles.heroContent} ${styles.heroContentSpacing}`}>
                        <div className={styles.seasonBadge}>
                            <span className={styles.pulseDot}>
                                <span className={styles.pulseOuter}></span>
                                <span className={styles.pulseInner}></span>
                            </span>
                            Season 4: Binary Surge
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
            </main>

            <Footer />
        </>
    );
}