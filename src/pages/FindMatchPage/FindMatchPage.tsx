import styles from './FindMatchPage.module.css';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { CreateMatchServices } from '../../services/findMatchService';
import { supabase } from '../../lib/supabase';
import { getProblemByRatingOrTopic } from '../../services/codeforcesService';

import { type MatchData } from '../../types/MatchData';
import { useMatch } from '../../hooks/useMatch';


export function FindMatchPage() {
    const nav = useNavigate();

    const [searchUsername, setSearchUsername] = useState ('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const ratingOptions = ['Any', '800', '1000', '1200', '1400', '1600', '1800', '2000'];
    const topicOptions = ['Any', 'Implementation', 'Math', 'Greedy', 'DP', 'Graphs'];
    const durationOptions = [15, 30, 45, 60];
    const [selectedRating, setSelectedRating] = useState('Any');
    const [selectedTopic, setSelectedTopic] = useState('Any');
    const [selectedDuration, setSelectedDuration] = useState(30);

    const {setMatchData} = useMatch();

    useEffect(() => { 
        const getCurrentUser = async() =>{
            try{
                const { data: {user},error} = await supabase.auth.getUser();
                if (error){
                    console.error('Error fetching user:',error);
                    window.location.href = '/login';
                    return;
                }
                if (user){
                setCurrentUserId(user.id);
                const {data: exsistingUser}= await supabase
                .from("users")
                .select("id")
                .eq("id",user.id)
                .single();

                if(!exsistingUser){
                    await supabase.from("users").insert({
                        id : user.id,
                        email: user.email,
                        username: user.email?.split("@")[0],
                        name: user.email?.split("@")[0]

                    });
                    console.log("User added successfully");
                }else{
                    console.log("User already exsist");
                }
                }
                else{
                    nav('/login');}
                }catch(err){
                    console.error('Unexpected error:', err);
                    nav('/login');
                }
                };
                getCurrentUser();
            }, [nav]);

        const handleInvite = async () =>{
            if (!searchUsername.trim()){
                setError('Please enter a username');
                return;
            }
           
            setIsLoading(true);
            setError('');

            try{
                const problem = await getProblemByRatingOrTopic({
                    rating: selectedRating === 'Any' ? undefined : parseInt(selectedRating), 
                    topic: selectedTopic === 'Any' ? undefined : selectedTopic
                });

                const match: MatchData = await CreateMatchServices(currentUserId, searchUsername, problem?.contestId, problem?.index, selectedDuration);
                setMatchData(match);

                nav(`/getReady/${match.id}`);

            } catch (err: any){
                setError(err.message || 'Failed to create match');
            } finally {
                setIsLoading(false);
            }
        };


        if (!currentUserId){
            return(
          <div className={styles['loading-screen']}
          > Initiating Connection...</div>
        );
    }
            
    return (
        <div className={styles['find-match-page']}>
            <Header />

            {/* ── Main Layout ── */}
            <main className={styles['main-layout']}>

                {/* ── Left Sidebar: Recent Matches ── */}
                <div className={styles['sidebar-left']}>
                    <div className={styles['filter-section']}>
                        <div className={styles['sidebar-header']}>
                            <h3 className={styles['sidebar-title']}>Problem Rating</h3>
                            <span className={styles['sidebar-version']}>SELECT_01</span>
                        </div>
                        <div className={styles['filter-options']}>
                            {ratingOptions.map((rating) => (
                                <button
                                    key={rating}
                                    type="button"
                                    className={[
                                        styles['filter-option-btn'],
                                        selectedRating === rating ? styles['active'] : ''
                                    ].join(' ')}
                                    onClick={() => setSelectedRating(rating)}
                                    aria-pressed={selectedRating === rating}
                                >
                                    {rating}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles['filter-section']}>
                        <div className={styles['sidebar-header']}>
                            <h3 className={styles['sidebar-title']}>Problem Topic</h3>
                            <span className={styles['sidebar-version']}>SELECT_02</span>
                        </div>
                        <div className={styles['filter-options']}>
                            {topicOptions.map((topic) => (
                                <button
                                    key={topic}
                                    type="button"
                                    className={[
                                        styles['filter-option-btn'],
                                        selectedTopic === topic ? styles['active'] : ''
                                    ].join(' ')}
                                    onClick={() => setSelectedTopic(topic)}
                                    aria-pressed={selectedTopic === topic}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles['filter-section']}>
                        <div className={styles['sidebar-header']}>
                            <h3 className={styles['sidebar-title']}>Problem Duration</h3>
                            <span className={styles['sidebar-version']}>SELECT_03</span>
                        </div>
                        <div className={styles['filter-options']}>
                            {durationOptions.map((duration) => (
                                <button
                                    key={duration}
                                    type="button"
                                    className={[
                                        styles['filter-option-btn'],
                                        selectedDuration === duration ? styles['active'] : ''
                                    ].join(' ')}
                                    onClick={() => setSelectedDuration(duration)}
                                    aria-pressed={selectedDuration === duration}
                                >
                                    {duration}m
                                </button>
                            ))}
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

                           {error && (
                            <div className={styles['error-message']}>
                                {error}
                                </div>
                           )}

                        <div className={styles['search-wrapper']}>
                            <input
                                className={styles['search-input']}
                                placeholder="SEARCH USERNAME..."
                                type="text"
                                value = {searchUsername}
                                onChange={(e)=> setSearchUsername(e.target.value)}
                                onKeyDown={(e)=> e.key === 'Enter' && handleInvite()}
                                disabled = {isLoading}
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
                                    <button className={styles['rival-invite-btn']}
                                    onClick={()=> {
                                        setSearchUsername('SYNTH_STRIKER');
                                        handleInvite();
                                    }}
                                    disabled = {isLoading}
                                    >Invite</button>
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
                        <button className={[styles['find-match-btn'], styles['find-match-glow']].join(' ')} onClick={handleInvite}
                        disabled = {isLoading}
                        >
                            {isLoading ? (
                                <span>
                                    SEARCHING...
                                </span>
                            ) :(
                                <>
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
                            </>
                            )}
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
