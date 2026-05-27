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
import { startMatch, finishMatch, getMatch, cancelMatch } from '../../services/matchService';
import { supabase } from '../../lib/supabase';
import { updateUserScore } from '../../services/userService';
import { useMatchTimer } from '../../hooks/useMatchTimer';
import { useOpponent } from '../../hooks/useOpponent';
import { useMatch } from '../../hooks/useMatch';
import { Modal } from '../../components/Modal/Modal';
import { getUserData } from '../../services/authService';
import { getPublicAvatarUrl } from '../../services/avatarService';



export function MatchPage() {
    const navigate = useNavigate();
    const { id: matchId } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(true);

    const channelRef = useRef<RealtimeChannel | null>(null);
    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const [isFinished, setIsFinished] = useState<{finished: boolean, win: boolean, draw: boolean}>({finished: false, win: false, draw: false});
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    
    const {userId, userData} = useAuth();
    const {opponentData, setOpponentData} = useOpponent();
    const {matchData, setMatchData} = useMatch();
    const handle = userData?.codeforces_handle ?? '';

    const userAvatarValue = userData?.avatar_url;
    const isUserAvatarUrl = userAvatarValue?.startsWith('http');

    const opponentAvatarValue = opponentData?.avatar_url;
    const isOpponentAvatarUrl = opponentAvatarValue?.startsWith('http');

    // Scroll to bottom whenever messages change
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Load messages from localStorage and cleanup old matches
    useEffect(() => {
        if (!matchId) return;

        // Cleanup: remove any localStorage items for other matches
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('match_chat_') && key !== `match_chat_${matchId}`) {
                localStorage.removeItem(key);
            }
        });

        // Load messages for current match
        const savedMessages = localStorage.getItem(`match_chat_${matchId}`);
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, [matchId]);

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

                // Fetch and resolve opponent data
                let opponentId = "";
                if (userId === data.player1_id) {
                    opponentId = data.player2_id;
                } else {
                    opponentId = data.player1_id;
                }

                if (opponentId) {
                    const opponent = await getUserData(opponentId);
                    if (opponent) {
                        if (opponent.avatar_url && !opponent.avatar_url.startsWith('http')) {
                            opponent.avatar_url = getPublicAvatarUrl(opponent.avatar_url) || "";
                        } else if (!opponent.avatar_url) {
                            opponent.avatar_url = opponent.name
                                ?.split(' ')
                                .map((n: string) => n[0])
                                .join('')
                                .toUpperCase() || opponent.username?.charAt(0).toUpperCase() || '?';
                        }
                        setOpponentData(opponent);
                    }
                }

                // If the match is already finished, determine the result and display the appropriate page
                if (data.status === 'finished') {
                    setMatchData(null);
                    setOpponentData(null);
                    localStorage.removeItem(`match_chat_${matchId}`);
                    const isDraw = !data.winner_user_id;
                    setIsFinished({
                        finished: true,
                        win: data.winner_user_id === userId,
                        draw: isDraw
                    });
                    setIsLoading(false);
                    return; // Skip setting context data
                }

                if (data.status === 'canceled' || data.status === 'declined') {
                    setMatchData(null);
                    setOpponentData(null);
                    localStorage.removeItem(`match_chat_${matchId}`);
                    navigate('/home', { 
                        state: { 
                            notification: data.status === 'canceled' ? "The match is canceled" : "The invitation was declined",
                            notificationColor: '#ef4444'
                        } 
                    });
                    setIsLoading(false);
                    return;
                }

                setMatchData(data);
            } catch (error) {
                console.error('Failed to fetch match data:', error);
                navigate('/home');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMatchData();
    }, [matchId, navigate, userId, setMatchData, setOpponentData]);

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

    const handleReturnToLobby = () => {
        setIsCancelModalOpen(true);
    };

    const confirmCancelMatch = async () => {
        if (effectiveMatchData) {
            try {
                await cancelMatch(effectiveMatchData.id);
                navigate('/home');
            } catch (error) {
                console.error('Failed to cancel match:', error);
            }
        }
        setIsCancelModalOpen(false);
    };

    const handleSendMessage = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!effectiveMatchData || !userId || !chatInput || !channelRef.current) return;

        const newMessage: ChatMessage = {
            match_id: effectiveMatchData.id,
            sender_id: userId,
            content: chatInput,
        };

        try {
            // Broadcast the message to other devices
            channelRef.current.send({
                type: 'broadcast',
                event: 'chat-message',
                payload: newMessage
            });

            // Save to localStorage and update state
            setMessages((prev) => {
                const updated = [...prev, newMessage];
                localStorage.setItem(`match_chat_${effectiveMatchData.id}`, JSON.stringify(updated));
                return updated;
            });

            setChatInput('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    }

    useEffect(()=>{
        if (!effectiveMatchData?.id) return;

        // Subscribe to broadcast messages and match status changes
        const channel = supabase
            .channel(`match_chat:${effectiveMatchData.id}`)
            .on(
                'broadcast',
                { event: 'chat-message' },
                (payload) => {
                    const newMessage = payload.payload as ChatMessage;
                    setMessages((prev) => {
                        const updated = [...prev, newMessage];
                        localStorage.setItem(`match_chat_${effectiveMatchData.id}`, JSON.stringify(updated));
                        return updated;
                    });
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
                    
                    if (updatedMatch.status === 'finished') {
                        localStorage.removeItem(`match_chat_${effectiveMatchData.id}`);
                        setMatchData(null);
                        setOpponentData(null);
                        const isWin = updatedMatch.winner_user_id === userId;
                        const isDraw = !updatedMatch.winner_user_id;

                        setIsFinished({
                            finished: true,
                            win: isWin,
                            draw: isDraw
                        });

                        // LOCAL SCORE UPDATE: Each user updates their OWN score to respect RLS
                        if (!isDraw && userId) {
                            const scoreChange = isWin ? 20 : -20;
                            updateUserScore(userId, scoreChange).catch(err => {
                                console.error('Failed to update local score:', err);
                            });
                        }
                    } else if (updatedMatch.status === 'canceled') {
                        localStorage.removeItem(`match_chat_${effectiveMatchData.id}`);
                        setMatchData(null);
                        setOpponentData(null);
                        navigate('/home', { 
                            state: { 
                                notification: "The match was canceled",
                                notificationColor: '#ef4444'
                            } 
                        });
                    }
                }
            )
            .subscribe();

        channelRef.current = channel;
        
        return () => {
            channel.unsubscribe();
            matchChannel.unsubscribe();
        }
    }, [effectiveMatchData?.id, userId, setMatchData, setOpponentData, navigate])

    useEffect(()=>{
        if (!effectiveMatchData?.id || effectiveMatchData.status !== 'accepted') return;
        
        const triggerStartMatch = async () => {
            try {
                await startMatch(effectiveMatchData.id);
                if (effectiveMatchData) {
                    setMatchData({ ...effectiveMatchData, status: 'in_progress' });
                }
            } catch (error) {
                console.error('Failed to start match:', error);
            }
        };
        triggerStartMatch();
    }, [effectiveMatchData, setMatchData]);

    if (isLoading) {
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

    if (!effectiveMatchData) {
        return null;
    }

    return (
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
                                    {isUserAvatarUrl ? (
                                        <img src={userAvatarValue} alt="Player A avatar" />
                                    ) : (
                                        <div className={styles['avatar-placeholder']}>
                                            {userAvatarValue}
                                        </div>
                                    )}
                                </div>
                                <div className={styles['online-indicator']}></div>
                            </div>
                            <div className={styles['player-details']}>
                                <span className={[styles['player-name'], styles['blue-text']].join(' ')}>{handle} (You)</span>
                            </div>
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
                            <div className={[styles['player-details'], styles['right']].join(' ')}>
                                <span className={[styles['player-name'], styles['orange-text']].join(' ')}>{opponentData?.codeforces_handle}</span>
                            </div>
                            <div className={styles['player-avatar-container']}>
                                <div className={[styles['player-avatar'], styles['orange-border']].join(' ')}>
                                    {isOpponentAvatarUrl ? (
                                        <img src={opponentAvatarValue} alt="Player B avatar" />
                                    ) : (
                                        <div className={styles['avatar-placeholder']}>
                                            {opponentAvatarValue}
                                        </div>
                                    )}
                                </div>
                                <div className={styles['online-indicator']}></div>
                            </div>
                        </div>
                    </div>
                </div>

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
                            </div>
                            
                            <p className={styles['challenge-description']}>
                                To complete this challenge, click the button below to open the problem on Codeforces. Once you've submitted your solution and received an "Accepted" verdict, return here and press the <strong>Refresh</strong> button to synchronize your status.
                            </p>
                            
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
                                onClick={handleReturnToLobby}
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

            <Modal 
                isOpen={isCancelModalOpen}
                title="Cancel Match"
                message="Do you want to cancel this match and return to home page?"
                onConfirm={confirmCancelMatch}
                onCancel={() => setIsCancelModalOpen(false)}
                confirmText="Yes, Cancel"
                cancelText="No, Stay"
            />
        </div>
    )
}