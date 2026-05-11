import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopUsers, getUserRank } from '../../services/userService';
import landingStyles from './Leaderboard.module.css';
import Header from '../../components/Header/Header';
import { type Notification } from '../../types/Notification';

// Type definition for our Hacker
interface Hacker {
    id: string;
    username: string;
    codeforces_handle: string;
    score: number;
    avatar?: string;
}

const LeaderboardPage: React.FC = () => {
    const { limit } = useParams<{ limit: string }>();
    const navigate = useNavigate();
    
    // Default to 10 if no limit is provided in URL
    const userLimit = limit ? parseInt(limit) : 10;
    const userId = "current-user-id"; // Replace with your actual auth logic

    const [topUsers, setTopUsers] = useState<Hacker[]>([]);
    const [currentUserRank, setCurrentUserRank] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasUnreadNotification, setHasUnreadNotification] = useState(false);
    const [notifications, setNotifications ] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setIsLoading(true);
            try {
                const users = await getTopUsers(userLimit);
                

                const usersWithAvatars = users.map((user: any) => ({
                    ...user,
                    avatar: `https://api.multiavatar.com/${encodeURIComponent(user.username)}.png`
                }));

                setTopUsers(usersWithAvatars);
            } catch (error) {
                console.error("Failed to fetch rankings:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, [userLimit]);

    useEffect(() => {
        const fetchUserRank = async () => {
            if (!userId) return;
            const rankData = await getUserRank(userId);
            setCurrentUserRank(rankData);
        };
        fetchUserRank();
    }, [userId]);

    return (<div>
                <Header
                activeLink="leaderboard"
                notificationCount={hasUnreadNotification ? 1 : 0}
                onNotificationOpened={() => setHasUnreadNotification(false)}
                notifications={notifications}
            />
        <section className={landingStyles['leaderboardSection']} id="arena-rankings">
            <div className={landingStyles['leaderboardInner']}>
                {/* Back Button */}
                {/* <button 
                    onClick={() => navigate('/home')} 
                    className={landingStyles['backButton']}
                >
                    ← Back to Home
                </button> */}
                <div className={landingStyles['leaderboardTopRow']}>
                    <div>
                        <h2 className={landingStyles['leaderboardTitle']}>
                            Arena <span className={landingStyles['leaderboardTitleAccent']}>Rankings</span>
                        </h2>
                    </div>
                    
                    {/* Filter Controls */}
                    <div className={landingStyles['filterContainer']}>
                        {[3, 5, 7].map((num) => (
                            <button 
                                key={num}
                                className={userLimit === num ? landingStyles['filterBtnActive'] : landingStyles['filterBtnInactive']}
                                onClick={() => navigate(`/leaderboard/${num}`)}
                            >
                                Top {num}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={landingStyles['tableWrapper']}>
                    <table className={landingStyles['leaderboardTable']}>
                        <thead className={landingStyles['tableHead']}>
                            <tr>
                                <th className={landingStyles['tableHeadCell']}>Rank</th>
                                <th className={landingStyles['tableHeadCell']}>Contestants</th>
                                <th className={landingStyles['tableHeadCell']}>Codeforces Handle</th>
                                <th className={`${landingStyles['tableHeadCell']} ${landingStyles['tableHeadCellRight']}`}>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topUsers.map((user, index) => {
                                // Dynamic class logic
                                let rowClass = landingStyles['tableRow'];
                                if (index === 0) rowClass += ` ${landingStyles['tableRowFirstPlace']}`;
                                else if (index === 1) rowClass += ` ${landingStyles['tableRowSecondPlace']}`;
                                else if (index === 2) rowClass += ` ${landingStyles['tableRowThirdPlace']}`;
                                if (user.id === userId) rowClass += ` ${landingStyles['tableRowCurrentUser']}`;

                                return (
                                    <tr key={user.id} className={rowClass}>
                                        <td className={landingStyles['tableCell']}>
                                            <span className={index === 0 ? landingStyles['rankPrimary'] : landingStyles['rankDefault']}>
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </td>
                                        <td className={landingStyles['tableCell']}>
                                            <div className={landingStyles['hackerInfo']}>
                                                <div className={landingStyles['hackerAvatar']}>
                                                    {/* <img 
                                                        src={user.avatar} 
                                                        alt={user.username} 
                                                        style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
                                                        onError={(e) => {
                                                            // Fallback if Multiavatar fails
                                                            (e.target as HTMLImageElement).src = `https://api.dicebear.com/9.x/identicon/svg?seed=${user.username}`;
                                                        }}
                                                    /> */}
                                                </div>
                                                <span className={landingStyles['hackerName']}>{user.username}</span>
                                            </div>
                                        </td>
                                        <td className={landingStyles['tableCell']}>
                                            <span className={landingStyles['codeforcesHandle']}>{user.codeforces_handle || '-'}</span>
                                        </td>
                                        <td className={landingStyles['tableCellRight']}>
                                            <span className={landingStyles['userScore']}>{user.score}</span>
                                        </td>
                                    </tr>
                                );
                            })}

                            {/* Floating Rank for current user if they are outside the Top X */}
                            {currentUserRank && currentUserRank.rank > userLimit && (
                                <tr className={`${landingStyles['tableRow']} ${landingStyles['tableRowCurrentUser']}`}>
                                    <td className={landingStyles['tableCell']}>
                                        <span className={landingStyles['rankDefault']}>
                                            {String(currentUserRank.rank).padStart(2, '0')}
                                        </span>
                                    </td>
                                    <td className={landingStyles['tableCell']}>
                                        <div className={landingStyles['hackerInfo']}>
                                            <div className={landingStyles['hackerAvatar']}>
                                                {/* <img 
                                                    src={`https://api.multiavatar.com/${encodeURIComponent(currentUserRank.username)}.png`} 
                                                    alt="Me" 
                                                    style={{ width: '100%', height: '100%' }}
                                                /> */}
                                            </div>
                                            <span className={landingStyles['hackerName']}>{currentUserRank.username}</span>
                                        </div>
                                    </td>
                                    <td className={landingStyles['tableCell']}>
                                        <span className={landingStyles['codeforcesHandle']}>{currentUserRank.codeforces_handle || '-'}</span>
                                    </td>
                                    <td className={landingStyles['tableCellRight']}>
                                        <span className={landingStyles['userScore']}>{currentUserRank.score}</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {isLoading && <div className={landingStyles['loader']}>Hacking Database...</div>}
                </div>
            </div>
        </section>
        </div>
    );
};

export default LeaderboardPage;