import styles from './MatchPage.module.css';
import { VictoryPage } from '../VictoryPage/VictoryPage';
import { LosePage } from '../LosePage/LosePage';
import { DrawPage } from '../DrawPage/DrawPage';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useAuth } from '../../hooks/useAuth';
// import { getMatch } from '../../services/matchService';

import { type SubmitEvent } from 'react';
import { type ChatMessage } from '../../types/ChatMessage';
import { checkSubmission } from '../../services/codeforcesService';
import { startMatch, finishMatch, getMatch, sendMessage, getMessages } from '../../services/matchService';
import { supabase } from '../../lib/supabase';
import { useMatchTimer } from '../../hooks/useMatchTimer';
import { OpponentContextProvider } from '../../contexts/OpponentContext/OpponentContextProvider';
import { useOpponent } from '../../hooks/useOpponent';
import { useMatch } from '../../hooks/useMatch';



export function MatchPage() {
    const navigate = useNavigate();
    const { id: matchId } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(true);

    const channelRef = useRef<RealtimeChannel | null>(null);
    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const [isFinished, setIsFinished] = useState<{finished: boolean, win: boolean, draw: boolean}>({finished: false, win: false, draw: false});
    
    const {userId, userData} = useAuth();
    const {opponentData} = useOpponent();
    const {matchData, setMatchData} = useMatch();
    const handle = userData?.codeforces_handle ?? '';

    // Scroll to bottom whenever messages change
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Always use fresh data from the database to ensure we have the latest status and winner information
    const effectiveMatchData = matchData;

    useEffect(() => {
        const fetchMatchData = async () => {
            if (!matchId) {
                navigate('/home');
                return;
            }

            try {
                // Perform a new query every time the user enters the page to bypass stale local storage/context
                const data = await getMatch(matchId);
                if (!data) {
                    navigate('/home');
                    return;
                }
                setMatchData(data);

                // If the match is already finished, determine the result and display the appropriate page
                if (data.status === 'finished') {
                    const isDraw = !data.winner_user_id;
                    setIsFinished({
                        finished: true,
                        win: data.winner_user_id === userId,
                        draw: isDraw
                    });
                }
            } catch (error) {
                console.error('Failed to fetch match data:', error);
                navigate('/home');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMatchData();
    }, [matchId, navigate, userId, setMatchData]);
    
    const {timeLeft, durationInMinutes, isTimeUp} = useMatchTimer(effectiveMatchData?.id);

    useEffect(() => {
        if (isTimeUp && effectiveMatchData && effectiveMatchData.status !== 'finished') {
            finishMatch(effectiveMatchData.id as string, null);
        }
    }, [isTimeUp, effectiveMatchData]);

    const handleRefresh = async () => {
        if (!effectiveMatchData) return;
        const result = await checkSubmission(handle, effectiveMatchData.contest_id, effectiveMatchData.problem_index, durationInMinutes);
        // console.log(result);
        if (result) {
            finishMatch(effectiveMatchData.id as string, userId as string);
        } 
            
    };

    const handleSendMessage = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!effectiveMatchData || !userId || !chatInput) return;

        const newMessage: ChatMessage = {
            match_id: effectiveMatchData.id,
            sender_id: userId,
            content: chatInput,
        };

        try {
            await sendMessage(newMessage);
            setChatInput('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    }

    useEffect(()=>{
        if (!effectiveMatchData?.id) return;

        // Fetch initial messages
        const fetchInitialMessages = async () => {
            try {
                const msgs = await getMessages(effectiveMatchData.id);
                setMessages(msgs);
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };
        fetchInitialMessages();

        // Subscribe to messages table changes
        const channel = supabase
            .channel(`messages:${effectiveMatchData.id}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `match_id=eq.${effectiveMatchData.id}`
                },
                (payload) => {
                    const newMessage = payload.new as ChatMessage;
                    console.log(newMessage);
                    setMessages((prev) => [...prev, newMessage]);
                }
            )
            .subscribe();

        // Subscribe to match status changes
        const matchChannel = supabase
            .channel(`match-status:${effectiveMatchData.id}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'matches',
                    filter: `id=eq.${effectiveMatchData.id}`
                },
                (payload) => {
                    const updatedMatch = payload.new as any;
                    console.log('Match status update received:', updatedMatch);
                    console.log('Current User ID:', userId);
                    console.log('Match Winner ID:', updatedMatch.winner_user_id);
                    
                    if (updatedMatch.status === 'finished') {
                        setIsFinished({
                            finished: true,
                            win: updatedMatch.winner_user_id === userId,
                            draw: !updatedMatch.winner_user_id
                        });
                        setMatchData(updatedMatch);
                    }
                }
            )
            .subscribe((status) => {
                console.log(`Match status subscription: ${status}`);
            });

        channelRef.current = channel;
        
        return () => {
            channel.unsubscribe();
            matchChannel.unsubscribe();
        }
    }, [effectiveMatchData?.id, userId, setMatchData])

    useEffect(()=>{
        if (!effectiveMatchData?.id || effectiveMatchData.status === 'finished') return;
        startMatch(effectiveMatchData.id);
    }, [effectiveMatchData?.id, effectiveMatchData?.status]);

    if (isLoading || !effectiveMatchData) {
        return null;
    }

    if (isFinished.finished) {
        if (isFinished.draw) {
            return <DrawPage />
        }
        if (isFinished.win) {
            return <VictoryPage />
        } else {
            return <LosePage />
        }
    }

    return (
        <OpponentContextProvider>
        <div className={styles['match-page']}>
            {/* <Header activeLink="arena" /> */}
            
            <main className={styles['match-main']}>
                {/* HUD: Countdown & Players */}
                <div className={styles['match-hud']}>
                    {/* Player A (User) */}
                    <div className={[styles['player-card'], styles['player-a']].join(' ')}>
                        <div className={styles['player-info']}>
                            <div className={styles['player-avatar-container']}>
                                <div className={[styles['player-avatar'], styles['blue-border']].join(' ')}>
                                    <img 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcSM1JyCgADutBmUal13KYePGDj08Do90Z2zgAeUp9R2VqFq3wAhR8GsAdZXGZTSuutZx0brGzt9_pSsScFju4iwXzh4EDGZuAoCqFm4cXngbLtTRbTHE-EJVXv2GquZ6WbgQhhNKrKfVEszX_TOxWgY8wU9DJFxWG1ueTI_ObIaJ0IS4SNEZeJP1ibgFZZ0zOzsHkSeRXUvCEi6yHozWr8t8kDH9RKiZGgSvlruDo53Bc5B0C87nqhIdbIIYJXU7m0TSF-uX35Ds" 
                                        alt="Player A avatar"
                                    />
                                </div>
                                <div className={styles['online-indicator']}></div>
                            </div>
                            <div className={styles['player-details']}>
                                <span className={[styles['player-name'], styles['blue-text']].join(' ')}>{handle} (You)</span>
                                <div className={styles['player-stats']}>
                                    <span className={[styles['rank-badge'], styles['blue-badge']].join(' ')}>Candidate Master</span>
                                    <span className={styles['rating']}>1840</span>
                                </div>
                            </div>
                            {/* <div className={styles['player-status']}>
                                <span className={[styles['status-text'], styles['thinking']].join(' ')}>Thinking</span>
                            </div> */}
                        </div>
                    </div>

                    {/* Timer HUD */}
                    <div className={styles['timer-container']}>
                        <div className={styles['timer-display']}>
                            <span className={styles['timer-value']}>{timeLeft}</span>
                            <p className={styles['timer-label']}>Time Remaining</p>
                        </div>
                    </div>

                    {/* Player B (Opponent) */}
                    <div className={[styles['player-card'], styles['player-b']].join(' ')}>
                        <div className={styles['player-info']}>
                            {/* <div className={styles['player-status']}>
                                <span className={[styles['status-text'], styles['submitting']].join(' ')}>Submitting...</span>
                            </div> */}
                            <div className={[styles['player-details'], styles['right']].join(' ')}>
                                <span className={[styles['player-name'], styles['orange-text']].join(' ')}>{opponentData?.codeforces_handle}</span>
                                <div className={styles['player-stats']}>
                                    <span className={styles['rating']}>1910</span>
                                    <span className={[styles['rank-badge'], styles['orange-badge']].join(' ')}>Master</span>
                                </div>
                            </div>
                            <div className={styles['player-avatar-container']}>
                                <div className={[styles['player-avatar'], styles['orange-border']].join(' ')}>
                                    <img 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnkP0tPBbWUufigD2mPunXbt4EYjBqJJgv7Uq6uYj01D-AH8FVNHK2Df06ZMf9RTOINJzZwneretI5Z6G09nsHGJ7bdxqbLyPhnZHQfKj4OfN_rUHSoReSnYA9JVVesrBi_gKVpHcZ5Lq6VehWiDvoGxh1OI_66BtggFz9zGVGB3jKzw0B4OcFxWiqSv8QX5NiidXC6FQxBspR2Wwbg52l6NTo5ja3Uf3hLQ1svBSBmC8YcN5HAKC6lQFZW8nCuQN_MZaQ1wfDluw" 
                                        alt="Player B avatar"
                                    />
                                </div>
                                <div className={styles['online-indicator']}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tug of War Bar */}
                {/* <div className={styles['momentum-section']}>
                    <div className={styles['momentum-labels']}>
                        <div className={styles['momentum-player']}>
                            <span className={[styles['momentum-title'], styles['blue-text']].join(' ')}>Momentum</span>
                            <span className={styles['momentum-value']}>50%</span>
                        </div>
                        <div className={[styles['momentum-player'], styles['right']].join(' ')}>
                            <span className={[styles['momentum-title'], styles['orange-text']].join(' ')}>Momentum</span>
                            <span className={styles['momentum-value']}>50%</span>
                        </div>
                    </div>
                    <div className={styles['momentum-bar']}>
                        <div className={[styles['momentum-fill'], styles['blue-momentum']].join(' ')} style={{ width: '50%' }}></div>
                        <div className={[styles['momentum-fill'], styles['orange-momentum']].join(' ')} style={{ width: '50%' }}></div>
                        <div className={styles['momentum-marker']}></div>
                    </div>
                </div> */}

                {/* Main Content Area */}
                <div className={styles['match-content']}>
                    {/* Left: Challenge Info */}
                    <div className={styles['challenge-section']}>
                        <div className={styles['challenge-card']}>
                            <div className={styles['challenge-header']}>
                                <div>
                                    <h3 className={styles['challenge-label']}>
                                        <span className="material-symbols-outlined">terminal</span>
                                        Current Challenge
                                    </h3>
                                    <h1 className={styles['challenge-title']}>
                                        {effectiveMatchData
                                            ? `${effectiveMatchData.contest_id}${effectiveMatchData.problem_index}`
                                            : 'Loading challenge...'}
                                    </h1>
                                </div>
                                {/* <div className={styles['challenge-meta']}>
                                    <span className={styles['meta-badge']}>RATING: 800</span>
                                </div> */}
                            </div>
                            
                            <p className={styles['challenge-description']}>
                                Contestant who earns a score equal to or greater than the k-th place finisher's score will advance to the next round, as long as the contestant earns a positive score...
                            </p>
                            
                            <div className={styles['challenge-tags']}>
                                <span className={styles['tag']}>Implementation</span>
                                <span className={styles['tag']}>Special Problems</span>
                            </div>
                            
                            <a
                                href={effectiveMatchData ? `https://codeforces.com/contest/${effectiveMatchData.contest_id}/problem/${effectiveMatchData.problem_index}` : '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles['solve-button']}
                                aria-disabled={!effectiveMatchData}
                            >
                                <span className="material-symbols-outlined">launch</span>
                                Solve on Codeforces
                            </a>
                        </div>

                        <div className={styles['action-buttons']}>
                            <button   onClick={handleRefresh} className={[styles['action-btn'], styles['secondary']].join(' ')}>
                                <span className="material-symbols-outlined">refresh</span>
                                Refresh
                            </button>
                            <button 
                                className={[styles['action-btn'], styles['danger']].join(' ')}
                                onClick={() => navigate('/home')}
                            >
                                <span className="material-symbols-outlined">logout</span>
                                Return to Lobby
                            </button>
                            
                            <div className={styles['simulation-group']}>
                                <button
                                    className={[styles['action-btn'], styles['secondary']].join(' ')}
                                    onClick={() => finishMatch(effectiveMatchData.id as string, userId as string)}
                                >
                                    Win
                                </button>
                                <button
                                    className={[styles['action-btn'], styles['warning']].join(' ')}
                                    onClick={() => finishMatch(effectiveMatchData.id as string, null)}
                                >
                                    Draw
                                </button>
                                <button
                                    className={[styles['action-btn'], styles['danger']].join(' ')}
                                    onClick={() => finishMatch(effectiveMatchData.id as string, opponentData?.id as string)}
                                >
                                    Lose
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Match Chat */}
                    <div className={styles['live-feed']}>
                        <div className={styles['feed-card']}>
                            <div className={styles['feed-header']}>
                                <h4 className={styles['feed-title']}>
                                    <span className={styles['live-indicator']}></span>
                                    Match Chat
                                </h4>
                                <span className={styles['session-id']}>ROOM: #AF92-X</span>
                            </div>
                            <div className={styles['feed-content']}>
                                {messages.map((message) => {
                                    const isYou = message.sender_id === userId;
                                    const senderLabel =
                                        isYou
                                            ? 'You'
                                            : opponentData?.username;

                                    return (
                                        <div
                                            key={message.id}
                                            className={[
                                                styles['chat-entry'],
                                                isYou
                                                    ? styles['chat-entry-right']
                                                    : styles['chat-entry-left'],
                                            ].join(' ')}
                                        >
                                            <div
                                                className={[
                                                    styles['chat-bubble'],
                                                    isYou
                                                        ? styles['chat-bubble-you']
                                                        : styles['chat-bubble-opponent'],
                                                ].join(' ')}
                                            >
                                                <div className={styles['chat-meta']}>
                                                    <span
                                                        className={[
                                                            styles['feed-player'],
                                                            isYou
                                                                ? styles['blue-text']
                                                                : styles['orange-text'],
                                                        ].join(' ')}
                                                    >
                                                        {senderLabel}
                                                    </span>
                                                    {/* <span className={styles['feed-time']}>{`[${message.time}]`}</span> */}
                                                </div>
                                                <p className={styles['chat-text']}>{message.content}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className={styles['feed-entry']}>
                                    <span className={styles['feed-cursor']}></span>
                                </div>
                                <div ref={chatEndRef} />
                            </div>

                            <form className={styles['chat-form']} onSubmit={handleSendMessage}>
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    className={styles['chat-input']}
                                    placeholder="Type your message..."
                                    aria-label="Type your message"
                                />
                                <button type="submit" className={styles['chat-send-button']}>
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* <Footer/> */}
        </div>
        </OpponentContextProvider>
    )
}