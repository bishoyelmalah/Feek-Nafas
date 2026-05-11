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

//Players Info
const player = {
    name: 'Ahmed_Warrior',
    rank: 'DIAMOND III',
    rp: '2,450 RP',
    ping: '24ms',
    connection: 'Stable',
    avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDJQQb5REYkskZvP0fno-34F4MIlFTmuLqLHdwpCLWil7Q89LQlscGkaWrP_p99FjSzObdRpoB75vgwplDx5NeSmFJCI5C4jkEqoZ0KIy4uztMEq_PBzjVdDvQ2vx_NbX3ZVqapod1iPM7gitI9VsM8I9hAnVDCNh_G5JAxDxSj7llqS59KLT0oLpa11Z9r2ZYjpvQxg8nfdOskbZX75SJBinpxF1h9kn2VuEshf57myvCWZcRr_kyLczkNeXkYrmAV20sQNm83I0w',
};

const opponent = {
    name: 'Night_Stalker',
    rank: 'DIAMOND II',
    rp: '2,510 RP',
    ping: '42ms',
    connection: 'Encrypted',
    avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDmUKiQzzHs9RtgWfCftqWTbVZaFTKCYjYaFFPBP0ctzBSMqZ_muyIZyMA-LBClqJxTMJu_dnMykWaJCY8Lu0HC7Z_l9nnIG0lHqxFY0x4PWhQgKZmhBv9oCx-OQGkRmkAOeA9TOMbOM6OSQNDdMZb_P-0FBo8N_TlejOdn0QzAZYco7GsOi7TWsjnD8HOcXlg-_52vZV1xQmwtQxiqiPnhT36A-FbC_TJKqcnfZjw-k3UpgGetbAdkxEfX6A8en9M4hPDZGjim6Ac',
};

const audio = new Audio(lobbySound);

export function GetReadyPage() {
    const {matchData} = useMatch();
    const {userData} = useAuth();
    const {opponentData, setOpponentData} = useOpponent();
    const nav = useNavigate();
    const selectedDuration = matchData?.duration ?? 30;
    // const [ isp1ready , setIsp1ready ] = useState(false);
    // const [ isp2ready , setIsp2ready] = useState(false);

    const isPlayer1 = userData?.id === matchData?.player1_id;

    const [ isp1ready , setIsp1ready ] = useState(
        isPlayer1 ? (matchData?.player1_ready || false) : (matchData?.player2_ready || false)
    );
    const [ isp2ready , setIsp2ready] = useState(
        isPlayer1 ? (matchData?.player2_ready || false) : (matchData?.player1_ready || false)
    );

    const [timer , setTimer] = useState(3);
    const ready = isp1ready && isp2ready;


    // const channelRef = useRef<any>(null); // can delete if using Postgres Changes only, but keeping it here in case we want to add any broadcast features later without setting up another listener

    // SUPABASE BROADCAST (LISTEN & STORE)
    // useEffect(() => {
    //     if (!matchData?.id) return;

    //     const channel = supabase.channel(`match_${matchData.id}`);

    //     // 1. Listen for opponent's status
    //     channel.on('broadcast', { event: 'ready_status' }, (data) => {
    //         console.log("Incoming broadcast:", data);
    //         setIsp2ready(data.payload.isReady);
    //     }).subscribe();

    //     // 2. Save the live channel so our button can use it to send
    //     channelRef.current = channel; 

    //     return () => {
    //         supabase.removeChannel(channel);
    //     };
    // }, [matchData?.id]);



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
    }, [matchData?.id, isPlayer1]);




    // Set Opponent Data
    useEffect(() => {
        const handleOpponentData = async ()=>{
            let data;
            if (userData?.id === matchData?.player1_id) {
                data = await getUserData(matchData?.player2_id as string);
            } else {
                data = await getUserData(matchData?.player1_id as string);
            }
            setOpponentData(data);
        }
        handleOpponentData();
    }, [])

    // SUPABASE BROADCAST (SEND)
    // const handlePlayer1Ready = () => {
    //     if (ready) return;         // SECURITY LOCK: If both players are ready (timer started), prevent cancelling!

    //     const newState = !isp1ready;
    //     setIsp1ready(newState);

    //     // Broadcast to the opponent --> Use the saved channel to send our status to the opponent
    //     if (channelRef.current) {
    //         channelRef.current.send({
    //             type: 'broadcast',
    //             event: 'ready_status',
    //             payload: { isReady: newState }
    //         });
    //     }
    // }




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





    // const handlePlayer1Ready = () => {
    //     setIsp1ready(!isp1ready);
    // }
    // const handlePlayer2Ready = () => {
    //     setIsp2ready(!isp2ready);
    // }

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
                                    <img src={player.avatar} alt="Player avatar" className={styles.avatar} />
                                </div>
                                <span className={`${styles.badge} ${styles.youBadge}`}>YOU</span>
                            </div>
                            <h2 className={styles.playerName}>{userData?.name}</h2>
                            <p className={styles.playerRank}>
                                <span className="material-symbols-outlined">stars</span>
                                RANK: {player.rank}
                                <span className={styles.dot}>•</span>
                                {player.rp}
                            </p>
                            {/*Cancel Button*/}
                            <button 
                                onClick={handlePlayer1Ready} 
                                disabled={ready}
                                className={`${styles.readyButton} ${isp1ready ? styles.playerReadyButton : styles.playerWaitingButton}`}
                            >
                                {isp1ready ? (ready ? 'LOCKED IN' : 'CANCEL') : 'READY'}
                            </button>

                        </div>


                        <div className={styles.connectionRow}>
                            <span>Ping: {player.ping}</span>
                            <span>Connection: {player.connection}</span>
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
                                    <img src={opponent.avatar} alt="Opponent avatar" className={styles.avatar} />
                                </div>
                                <span className={`${styles.badge} ${styles.opponentBadge}`}>OPPONENT</span>
                            </div>
                            <h2 className={styles.playerName}>{opponentData?.name}</h2>
                            <p className={styles.playerRank}>
                                <span className="material-symbols-outlined">stars</span>
                                RANK: {opponent.rank}
                                <span className={styles.dot}>•</span>
                                {opponent.rp}
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
                            <span>Ping: {opponent.ping}</span>
                            <span>Connection: {opponent.connection}</span>
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
                    <article className={styles.hudCard}>
                        <div className={styles.hudIcon}>
                            <span className="material-symbols-outlined">timer</span>
                        </div>
                        <div>
                            <p className={styles.hudLabel}>Match Duration</p>
                            <p className={styles.hudValue}>{selectedDuration}:00 MINUTES</p>
                        </div>
                    </article>
                    <article className={styles.hudCard}>
                        <div className={styles.hudIcon}>
                            <span className="material-symbols-outlined">chat</span>
                        </div>
                        <div>
                            <p className={styles.hudLabel}>Lobby Chat</p>
                            <p className={styles.hudHint}>Press [T] to talk</p>
                        </div>
                    </article>
                </section>
            </main>

            <div className={styles.decorTopLeft} />
            <div className={styles.decorBottomRight} />
        </div>
    );
}