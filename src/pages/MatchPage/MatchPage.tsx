import styles from './MatchPage.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { createChatRoom, receiveMessage, sendMessage } from '../../services/chatService';
import { RealtimeChannel } from '@supabase/supabase-js';
// import { getMatch } from '../../services/matchService';

import { type SubmitEvent } from 'react';
import { type ChatMessage } from '../../types/ChatMessage';
import { checkSubmission } from '../../services/codeforcesService';
// import { type MatchData } from '../../types/MatchData';



export function MatchPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const channelRef = useRef<RealtimeChannel | null>(null);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    // const [problem, setProblem] = useState<MatchData | null>(null);
    
    const { problem } = state;
    const matchId = "d1111111-1111-4111-8111-111111111111";
    const handle = "bishoy.elmalah";

    const handleRefresh = async () => {
        const result = await checkSubmission(handle, "2185", "A");
        // console.log(result);
        if (result) navigate('/victory');
    };

    const handleSendMessage = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage(channelRef.current, chatInput, "bishoy")
        setMessages(prev => 
            [...prev, {
                id: 2, sender: 'you', text: chatInput, time: 'time'
                }
            ]
        )
        setChatInput('');
    }

    useEffect(()=>{
        const channel = createChatRoom(`chat-room-${matchId}`);
        channelRef.current = channel;

        receiveMessage(channel, (msg: any)=>{
            setMessages((prev) => [
                ...prev,
                {id: 2, sender: 'opponent', text: msg.payload.message, time: 'time'}
            ])
            // console.log(payload);
        })

        // const handleMatchData = async () => {
        //     const matchData = await getMatch(matchId);
        //     setProblem(matchData);
        // };

        // void handleMatchData();

        return () => {
            channel.unsubscribe();
        }
    }, [])

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
                                    <img 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcSM1JyCgADutBmUal13KYePGDj08Do90Z2zgAeUp9R2VqFq3wAhR8GsAdZXGZTSuutZx0brGzt9_pSsScFju4iwXzh4EDGZuAoCqFm4cXngbLtTRbTHE-EJVXv2GquZ6WbgQhhNKrKfVEszX_TOxWgY8wU9DJFxWG1ueTI_ObIaJ0IS4SNEZeJP1ibgFZZ0zOzsHkSeRXUvCEi6yHozWr8t8kDH9RKiZGgSvlruDo53Bc5B0C87nqhIdbIIYJXU7m0TSF-uX35Ds" 
                                        alt="Player A avatar"
                                    />
                                </div>
                                <div className={styles['online-indicator']}></div>
                            </div>
                            <div className={styles['player-details']}>
                                <span className={[styles['player-name'], styles['blue-text']].join(' ')}>Player A (You)</span>
                                <div className={styles['player-stats']}>
                                    <span className={[styles['rank-badge'], styles['blue-badge']].join(' ')}>Candidate Master</span>
                                    <span className={styles['rating']}>1840</span>
                                </div>
                            </div>
                            <div className={styles['player-status']}>
                                <span className={[styles['status-text'], styles['thinking']].join(' ')}>Thinking</span>
                            </div>
                        </div>
                    </div>

                    {/* Timer HUD */}
                    <div className={styles['timer-container']}>
                        <div className={styles['timer-display']}>
                            <span className={styles['timer-value']}>14:20</span>
                            <p className={styles['timer-label']}>Time Remaining</p>
                        </div>
                    </div>

                    {/* Player B (Opponent) */}
                    <div className={[styles['player-card'], styles['player-b']].join(' ')}>
                        <div className={styles['player-info']}>
                            <div className={styles['player-status']}>
                                <span className={[styles['status-text'], styles['submitting']].join(' ')}>Submitting...</span>
                            </div>
                            <div className={[styles['player-details'], styles['right']].join(' ')}>
                                <span className={[styles['player-name'], styles['orange-text']].join(' ')}>Player B</span>
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
                <div className={styles['momentum-section']}>
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
                                        {problem
                                            ? `${problem.contest_id}${problem.problem_index}`
                                            : 'Loading challenge...'}
                                    </h1>
                                </div>
                                <div className={styles['challenge-meta']}>
                                    <span className={styles['meta-badge']}>DIFF: 800</span>
                                    <span className={styles['meta-badge']}>POINTS: 500</span>
                                </div>
                            </div>
                            
                            <p className={styles['challenge-description']}>
                                Contestant who earns a score equal to or greater than the k-th place finisher's score will advance to the next round, as long as the contestant earns a positive score...
                            </p>
                            
                            <div className={styles['challenge-tags']}>
                                <span className={styles['tag']}>Implementation</span>
                                <span className={styles['tag']}>Special Problems</span>
                            </div>
                            
                            <a
                                href={problem ? `https://codeforces.com/contest/${problem.contest_id}/problem/${problem.problem_index}` : '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles['solve-button']}
                                aria-disabled={!problem}
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
                            <button className={[styles['action-btn'], styles['danger']].join(' ')}>
                                <span className="material-symbols-outlined">logout</span>
                                Return to Lobby
                            </button>
                            <button
                                className={[styles['action-btn'], styles['secondary']].join(' ')}
                                onClick={() => navigate('/victory')}
                            >
                                Victory
                            </button>
                            <button
                                className={[styles['action-btn'], styles['danger']].join(' ')}
                                onClick={() => navigate('/lose')}
                            >
                                Lose
                            </button>
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
                                    const isYou = message.sender === 'you';
                                    const isSystem = message.sender === 'system';
                                    const senderLabel = isSystem
                                        ? 'SYSTEM'
                                        : isYou
                                            ? 'You'
                                            : 'Player B';

                                    return (
                                        <div
                                            key={message.id}
                                            className={[
                                                styles['chat-entry'],
                                                isYou
                                                    ? styles['chat-entry-right']
                                                    : isSystem
                                                        ? styles['chat-entry-center']
                                                        : styles['chat-entry-left'],
                                            ].join(' ')}
                                        >
                                            <div
                                                className={[
                                                    styles['chat-bubble'],
                                                    isYou
                                                        ? styles['chat-bubble-you']
                                                        : isSystem
                                                            ? styles['chat-bubble-system']
                                                            : styles['chat-bubble-opponent'],
                                                ].join(' ')}
                                            >
                                                <div className={styles['chat-meta']}>
                                                    <span
                                                        className={[
                                                            styles['feed-player'],
                                                            isYou
                                                                ? styles['blue-text']
                                                                : isSystem
                                                                    ? styles['feed-system']
                                                                    : styles['orange-text'],
                                                        ].join(' ')}
                                                    >
                                                        {senderLabel}
                                                    </span>
                                                    <span className={styles['feed-time']}>{`[${message.time}]`}</span>
                                                </div>
                                                <p className={styles['chat-text']}>{message.text}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className={styles['feed-entry']}>
                                    <span className={styles['feed-cursor']}></span>
                                </div>
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
    )
}