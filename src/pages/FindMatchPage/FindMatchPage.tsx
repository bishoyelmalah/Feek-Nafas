import styles from './FindMatchPage.module.css';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { CreateMatchServices } from '../../services/findMatchService';
import { supabase } from '../../lib/supabase';
import { getProblemByRatingOrTopic } from '../../services/codeforcesService';
import { useOpponent } from '../../hooks/useOpponent';
import { getUserDataByHandle } from '../../services/authService';

export function FindMatchPage() {
    const nav = useNavigate();
    const { setOpponentData } = useOpponent();

    const [searchUsername, setSearchUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const ratingOptions = ['Any', '800', '1000', '1200', '1400', '1600', '1800', '2000'];
    const topicOptions = ['Any', 'Implementation', 'Math', 'Greedy', 'DP', 'Graphs'];
    const durationOptions = [15, 30, 45, 60];
    const [selectedRating, setSelectedRating] = useState('Any');
    const [selectedTopic, setSelectedTopic] = useState('Any');
    const [selectedDuration, setSelectedDuration] = useState(30);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();
                if (error) {
                    console.error('Error fetching user:', error);
                    window.location.href = '/login';
                    return;
                }
                if (user) {
                    setCurrentUserId(user.id);
                    const { data: existingUser } = await supabase
                        .from("users")
                        .select("id")
                        .eq("id", user.id)
                        .single();

                    if (!existingUser) {
                        await supabase.from("users").insert({
                            id: user.id,
                            email: user.email,
                            username: user.email?.split("@")[0],
                            name: user.email?.split("@")[0]
                        });
                        console.log("User added successfully");
                    } else {
                        console.log("User already exists");
                    }
                } else {
                    nav('/login');
                }
            } catch (err) {
                console.error('Unexpected error:', err);
                nav('/login');
            }
        };
        getCurrentUser();
    }, [nav]);

    const handleInvite = async () => {
        if (!searchUsername.trim()) {
            setError('Please enter a username');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const problem = await getProblemByRatingOrTopic({
                rating: selectedRating === 'Any' ? undefined : parseInt(selectedRating),
                topic: selectedTopic === 'Any' ? undefined : selectedTopic
            });

            const match = await CreateMatchServices(currentUserId, searchUsername, problem?.contestId, problem?.index, selectedDuration);
            const OpponentData = await getUserDataByHandle(searchUsername);
            setOpponentData(OpponentData);
            nav(`/getReady/${(match as any).id}`, { state: { selectedDuration } });
        } catch (err: any) {
            setError(err.message || 'Failed to create match');
        } finally {
            setIsLoading(false);
        }
    };

    if (!currentUserId) {
        return <div className={styles['loading-screen']}>Initiating Connection...</div>;
    }

    return (
        <div className={styles['find-match-page']}>
            <Header />

            <main className={styles['main-layout']}>
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
                </div>

                <div className={styles['matchmaking-center']}>
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
                                value={searchUsername}
                                onChange={(e) => setSearchUsername(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                                disabled={isLoading}
                            />
                            <span className={"material-symbols-outlined " + styles['search-icon']}>search</span>
                        </div>
                        <div className={styles['rivals-section']}>
                            <p className={styles['rivals-label']}>Recent Rivals</p>
                            <div className={styles['rivals-list']}>
                                <div className={styles['rival-item']}>
                                    <div className={styles['rival-left']}>
                                        <div className={[styles['rival-status-dot'], styles['online']].join(' ')} />
                                        <span className={styles['rival-name']}>SYNTH_STRIKER</span>
                                    </div>
                                    <button className={styles['rival-invite-btn']}
                                        onClick={() => {
                                            setSearchUsername('SYNTH_STRIKER');
                                            handleInvite();
                                        }}
                                        disabled={isLoading}
                                    >Invite</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles['find-match-btn-wrapper']}>
                        <div className={styles['btn-outer-ring']} />
                        <div className={styles['btn-inner-ring']} />
                        <button className={[styles['find-match-btn'], styles['find-match-glow']].join(' ')} onClick={handleInvite}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span>SEARCHING...</span>
                            ) : (
                                <>
                                    <div className={styles['find-match-btn-gradient']} />
                                    <div className={styles['scanline']} />
                                    <span className={"material-symbols-outlined " + styles['find-match-btn-icon']}>radar</span>
                                    <h2 className={[styles['find-match-btn-title'], styles['glitch-text']].join(' ')}>Start Match</h2>
                                    <p className={styles['find-match-btn-subtitle']}>Ranked 1v1</p>
                                    <div className={styles['btn-corner-tl']} />
                                    <div className={styles['btn-corner-br']} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </main>

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

            <div className={styles['vignette-overlay']} />
        </div>
    );
}