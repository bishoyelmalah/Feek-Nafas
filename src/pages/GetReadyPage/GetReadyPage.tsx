import styles from './GetReadyPage.module.css';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useEffect, useState } from 'react';
import { getProblemByRatingOrTopic } from '../../services/codeforcesService';
import lobbySound from '../../assets/sounds/lobby_sound.mp3'

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
    const nav = useNavigate();
    const [ isp1ready , setIsp1ready ] = useState(false);
    const [ isp2ready , setIsp2ready] = useState(false);
    const [timer , setTimer] = useState(3);
    const ready = isp1ready && isp2ready;

    const findMatch = async (nav: NavigateFunction) => {
        const problem = await getProblemByRatingOrTopic({rating: 800});
        await nav('/match', { state: {problem} });
    }


    const handlePlayer1Ready = () => {
        setIsp1ready(!isp1ready);
    }
    const handlePlayer2Ready = () => {
        setIsp2ready(!isp2ready);
    }
    useEffect(()=>{
        if(!ready) return;
            const x = setInterval(() => {
                setTimer((prev) => prev <= 1 ? 0 : prev - 1);
            },1000)
            return () => clearInterval(x);
        },[ready])

    useEffect(() => {
        if(timer === 0) findMatch(nav);
    }, [timer]);

    useEffect(() => {
        audio.loop = true;
        audio.play()
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
                            <h2 className={styles.playerName}>{player.name}</h2>
                            <p className={styles.playerRank}>
                                <span className="material-symbols-outlined">stars</span>
                                RANK: {player.rank}
                                <span className={styles.dot}>•</span>
                                {player.rp}
                            </p>
                            <button onClick={handlePlayer1Ready} className={styles.readyButton}>{isp1ready ? 'READY ✓' : 'READY'}</button>
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
                            <h2 className={styles.playerName}>{opponent.name}</h2>
                            <p className={styles.playerRank}>
                                <span className="material-symbols-outlined">stars</span>
                                RANK: {opponent.rank}
                                <span className={styles.dot}>•</span>
                                {opponent.rp}
                            </p>
                            <button onClick={handlePlayer2Ready} className={styles.readyButton}>{isp2ready ? 'READY ✓' : 'READY'}</button>
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
                            <p className={styles.hudValue}>5:00 MINUTES</p>
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
