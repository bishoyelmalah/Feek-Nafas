import styles from './GetReadyPage.module.css';
import { useNavigate } from 'react-router';
import { useEffect, useState} from 'react'; 
import lobbySound from '../../assets/sounds/lobby_sound.mp3'
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useOpponent } from '../../hooks/useOpponent';
import { useMatch } from '../../hooks/useMatch';
import { getUserData } from '../../services/authService';
import { type MatchData } from '../../types/MatchData';

import { getPublicAvatarUrl } from '../../services/avatarService';

const audio = new Audio(lobbySound);

export function GetReadyPage() {
    const {matchData} = useMatch();
    const {userData} = useAuth();
    const {opponentData, setOpponentData} = useOpponent();
    const nav = useNavigate();
    const selectedDuration = matchData?.duration ?? 30;

    const isPlayer1 = userData?.id === matchData?.player1_id;

    const [ isp1ready , setIsp1ready ] = useState(
        isPlayer1 ? (matchData?.player1_ready || false) : (matchData?.player2_ready || false)
    );
    const [ isp2ready , setIsp2ready] = useState(
        isPlayer1 ? (matchData?.player2_ready || false) : (matchData?.player1_ready || false)
    );

    const [timer , setTimer] = useState(3);
    const [isMuted, setIsMuted] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const ready = isp1ready && isp2ready;

    useEffect(() => {
        audio.muted = isMuted;
    }, [isMuted]);

    useEffect(() => {
        const checkInitialStatus = async () => {
            if (!matchData?.id) return;
            const { data } = await supabase.from('matches').select('status').eq('id', matchData.id).single();
            if (data) {
                if (data.status === 'canceled') {
                    nav('/home', { state: { notification: 'The match is canceled', notificationColor: '#ef4444' } });
                } else if (data.status === 'declined') {
                    nav('/home', { state: { notification: 'The invitation was declined', notificationColor: '#ef4444' } });
                } else if (data.status === 'finished') {
                    nav('/home', { state: { notification: 'The match is already finished', notificationColor: '#ec5b13' } });
                }
            }
        };
        checkInitialStatus();
    }, [matchData?.id, nav]);

    const userAvatarValue = userData?.avatar_url;
    const isUserAvatarUrl = userAvatarValue?.startsWith('http');

    const opponentAvatarValue = opponentData?.avatar_url;
    const isOpponentAvatarUrl = opponentAvatarValue?.startsWith('http');

    // --- 📡 SUPABASE POSTGRES CHANGES (LISTEN) ---
    useEffect(() => {
        if (!matchData?.id) return;

        const channel = supabase
            .channel(`match_updates_${matchData.id}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'matches',
                    filter: `id=eq.${matchData.id}`,
                },
                (payload) => {
                    const updatedMatch = payload.new as MatchData;
                    console.log("Match updated in DB:", updatedMatch);
                    
                    if (updatedMatch.status === 'canceled') {
                        nav('/home', { state: { notification: 'The other player canceled the match', notificationColor: '#ef4444' } });
                        return;
                    }

                    if (updatedMatch.status === 'declined') {
                        nav('/home', { state: { notification: 'The other player declined the invitation', notificationColor: '#ef4444' } });
                        return;
                    }

                    // Map the DB columns back to the correct UI sides
                    if (isPlayer1) {
                        setIsp1ready(updatedMatch.player1_ready);
                        setIsp2ready(updatedMatch.player2_ready);
                    } else {
                        setIsp1ready(updatedMatch.player2_ready);
                        setIsp2ready(updatedMatch.player1_ready);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [matchData?.id, isPlayer1, nav]);




    // Set Opponent Data
    useEffect(() => {
        const handleOpponentData = async ()=>{
            if (!matchData || !userData) return;
            let data;
            if (userData?.id === matchData?.player1_id) {
                data = await getUserData(matchData?.player2_id as string);
            } else {
                data = await getUserData(matchData?.player1_id as string);
            }
            
            if (data) {
                if (data.avatar_url && !data.avatar_url.startsWith('http')) {
                    data.avatar_url = getPublicAvatarUrl(data.avatar_url) || "";
                } else if (!data.avatar_url) {
                    data.avatar_url = data.name
                        ?.split(' ')
                        .map((n: string) => n[0])
                        .join('')
                        .toUpperCase() || data.username?.charAt(0).toUpperCase() || '?';
                }
            }
            setOpponentData(data);
        }
        handleOpponentData();
    }, [matchData, userData, setOpponentData])

    // --- 📤 SUPABASE DATABASE UPDATE (SEND) ---
    const handlePlayer1Ready = async () => {
        if (ready || !matchData?.id) return; // SECURITY LOCK

        const newState = !isp1ready;
        setIsp1ready(newState); // Optimistic UI update so it feels instant

        // Figure out which column belongs to us
        const columnToUpdate = isPlayer1 ? 'player1_ready' : 'player2_ready';

        // Update the database
        const { error } = await supabase
            .from('matches')
            .update({ [columnToUpdate]: newState })
            .eq('id', matchData.id);

        if (error) {
            console.error("Failed to update ready status:", error);
            setIsp1ready(!newState); // Revert UI if the database fails
        }
    }

    const handleCancelMatch = async () => {
        if (!matchData?.id || isCancelling) return;
        setIsCancelling(true);

        const { error } = await supabase
            .from('matches')
            .update({ status: 'canceled' })
            .eq('id', matchData.id);

        if (!error) {
            nav('/home');
        } else {
            console.error("Failed to cancel match:", error);
            setIsCancelling(false);
        }
    };

    useEffect(()=>{
        if(!ready) return;
            const x = setInterval(() => {
                setTimer((prev) => prev <= 1 ? 0 : prev - 1);
            },1000)
            return () => clearInterval(x);
        },[ready])

    useEffect(() => {
        if (timer !== 0 || !matchData?.id) return;

        const findMatch = async () => {
            console.log(matchData.id);
            nav(`/match/${matchData.id}`);
        };

        findMatch();
    }, [timer, matchData?.id, nav, selectedDuration]);

    // useEffect(() => {
    //     // Prevent back button
    //     window.history.pushState(null, '', window.location.href);
    //     const handlePopState = () => {
    //         window.history.pushState(null, '', window.location.href);
    //     };

    //     window.addEventListener('popstate', handlePopState);
    //     return () => {
    //         window.removeEventListener('popstate', handlePopState);
    //     };
    // }, []);

    useEffect(() => {
        audio.loop = true;
        audio.play().catch(() => {});
        return () => audio.pause();
    },[])

    return (
        <div className={styles.page}>
            <div className={styles.cyberGrid} />
            <main className={styles.main}>
                <div className={styles.titleBlock}>
                    <h1 className={`${styles.vsGlow} ${styles.title}`}>MATCH STARTING</h1>
                    <p className={styles.subtitle}>PREPARE FOR BATTLE</p>
                </div>

                <section className={styles.grid}>
                    <article className={styles.cardColumn}>
                        <div className={`${styles.playerCard} ${styles.playerCardPrimary}`}>
                            <div className={styles.avatarWrap}>
                                <div className={`${styles.avatarRing} ${styles.primary}`}> 
                                    {isUserAvatarUrl ? (
                                        <img src={userAvatarValue} alt="Player avatar" className={styles.avatar} />
                                    ) : (
                                        <div className={styles.avatarInitial}>
                                            {userAvatarValue}
                                        </div>
                                    )}
                                </div>
                                <span className={`${styles.badge} ${styles.youBadge}`}>YOU</span>
                            </div>
                            <h2 className={styles.playerName}>{userData?.name}</h2>
                            <p className={styles.playerRank}>
                                <span className="material-symbols-outlined">stars</span>
                                RANK: DIAMOND III
                                <span className={styles.dot}>•</span>
                                2,450 RP
                            </p>
                            
                            <button 
                                onClick={handlePlayer1Ready} 
                                disabled={ready}
                                className={`${styles.readyButton} ${isp1ready ? styles.playerReadyButton : styles.playerWaitingButton}`}
                            >
                                {isp1ready ? (ready ? 'LOCKED IN' : 'CANCEL') : 'READY'}
                            </button>
                        </div>

                        <div className={styles.connectionRow}>
                            <span>Ping: 24ms</span>
                            <span>Connection: Stable</span>
                        </div>
                    </article>

                    <div className={styles.vsColumn}>
                        <div className={styles.vsOrb}>
                            <span className={`${styles.vsGlow} ${styles.vsText}`}>
                                {ready ? timer : 'VS'}
                            </span>
                        </div>
                        <div className={styles.matchMeta}>
                            <div className={styles.metaLine} />
                            <span>RANKED MATCH</span>
                            <div className={styles.metaLine} />
                        </div>
                    </div>

                    <article className={styles.cardColumn}>
                        <div className={`${styles.playerCard} ${styles.playerCardSecondary}`}>
                            <div className={styles.avatarWrap}>
                                <div className={`${styles.avatarRing} ${styles.secondary}`}>
                                    {isOpponentAvatarUrl ? (
                                        <img src={opponentAvatarValue} alt="Opponent avatar" className={styles.avatar} />
                                    ) : (
                                        <div className={styles.avatarInitial}>
                                            {opponentAvatarValue}
                                        </div>
                                    )}
                                </div>
                                <span className={`${styles.badge} ${styles.opponentBadge}`}>OPPONENT</span>
                            </div>
                            <h2 className={styles.playerName}>{opponentData?.name}</h2>
                            <p className={styles.playerRank}>
                                <span className="material-symbols-outlined">stars</span>
                                RANK: DIAMOND II
                                <span className={styles.dot}>•</span>
                                2,510 RP
                            </p>
                            {/* <button onClick={handlePlayer2Ready} className={styles.readyButton}>{isp2ready ? 'READY ✓' : 'READY'}</button> */}
                            <button 
                                disabled 
                                className={`${styles.readyButton} ${isp2ready ? styles.opponentReadyButton : styles.opponentWaitingButton}`}
                            >
                                {isp2ready ? 'READY ✓' : 'WAITING...'}
                            </button>
                        </div>
                        <div className={styles.connectionRow}>
                            <span>Ping: 42ms</span>
                            <span>Connection: Encrypted</span>
                        </div>
                    </article>
                </section>

                <section className={styles.hudGrid}>
                    <article className={styles.hudCard}>
                        <div className={styles.hudIcon}>
                            <span className="material-symbols-outlined">map</span>
                        </div>
                        <div>
                            <p className={styles.hudLabel}>Current Map</p>
                            <p className={styles.hudValue}>NEON RIYADH</p>
                        </div>
                    </article>

                    <button 
                        onClick={handleCancelMatch}
                        disabled={ready || isCancelling}
                        className={styles.cancelMatchButton}
                    >
                        <div className={styles.cancelIcon}>
                            <span className="material-symbols-outlined">close</span>
                        </div>
                        <div>
                            <p className={styles.hudLabel}>Session Control</p>
                            <p className={styles.hudValue}>{isCancelling ? 'CANCELLING...' : 'CANCEL MATCH'}</p>
                        </div>
                    </button>

                    <article className={styles.hudCard}>
                        <div className={styles.hudIcon}>
                            <span className="material-symbols-outlined">timer</span>
                        </div>
                        <div>
                            <p className={styles.hudLabel}>Match Duration</p>
                            <p className={styles.hudValue}>{selectedDuration}:00 MINUTES</p>
                        </div>
                    </article>
                </section>
            </main>

            <button 
                className={styles.muteButton} 
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? "Unmute" : "Mute"}
            >
                <span className="material-symbols-outlined">
                    {isMuted ? 'volume_off' : 'volume_up'}
                </span>
            </button>

            <div className={styles.decorTopLeft} />
            <div className={styles.decorBottomRight} />
        </div>
    );
}