import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopUsers, getUserRank } from '../../services/userService';
import landingStyles from './leaderboard.module.css';
import Header from '../../components/Header/Header';
import { type Notification } from '../../types/Notification';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

// Type definition for our Hacker
interface Hacker {
    id: string;
    username: string;
    codeforces_handle: string;
    score: number;
    avatar?: string;
    avatar_url?: string;
}

const LeaderboardPage: React.FC = () => {
    const { limit } = useParams<{ limit: string }>();
    const navigate = useNavigate();
    
    // Default to 10 if no limit is provided in URL
    const userLimit = limit ? parseInt(limit) : 10;
    const {userId} = useAuth(); // Replace with your actual auth logic

    const [topUsers, setTopUsers] = useState<Hacker[]>([]);
    const [currentUserRank, setCurrentUserRank] = useState<any>(null);
    const [hasUnreadNotification, setHasUnreadNotification] = useState(false);
    const [notifications ] = useState<Notification[]>([]);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const getAvatarUrl = async (userId: string): Promise<string | null> => {
        try {
            const { data, error } = await supabase
                .from("users")
                .select("avatar_url")
                .eq("id", userId)
                .single();

            if (error || !data?.avatar_url) {
                return null;
            }

            const { data: publicUrlData } = supabase.storage
                .from("avatars")
                .getPublicUrl(data.avatar_url);

            return publicUrlData.publicUrl;
        } catch (error) {
            console.error("Failed to fetch avatar:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const users = await getTopUsers(userLimit);

                const usersWithAvatars = await Promise.all(users.map(async (user: any) => {
                    const avatarUrl = await getAvatarUrl(user.id);
                    return {
                        ...user,
                        avatar_url: avatarUrl
                    };
                }));

                setTopUsers(usersWithAvatars);
            } catch (error) {
                console.error("Failed to fetch rankings:", error);
            }
        };

        fetchLeaderboard();
    }, [userLimit]);

    useEffect(() => {
        const fetchUserRank = async () => {
            if (!userId) return;
            const rankData = await getUserRank(userId);
            if (rankData) {
                const avatarUrl = await getAvatarUrl(userId);
                setCurrentUserRank({
                    ...rankData,
                    avatar_url: avatarUrl
                });
            }
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
                                                    {user.avatar_url && !imageErrors[user.id] ? (
                                                        <img 
                                                            src={user.avatar_url} 
                                                            alt={user.username} 
                                                            style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', borderRadius: '50%' }}
                                                            onError={() => setImageErrors(prev => ({ ...prev, [user.id]: true }))}
                                                        />
                                                    ) : (
                                                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>
                                                            {user.username?.charAt(0).toUpperCase() || '?'}
                                                        </span>
                                                    )}
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
                                                {currentUserRank.avatar_url && userId && !imageErrors[userId] ? (
                                                    <img 
                                                        src={currentUserRank.avatar_url} 
                                                        alt="Me" 
                                                        style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', borderRadius: '50%' }}
                                                        onError={() => setImageErrors(prev => ({ ...prev, [userId]: true }))}
                                                    />
                                                ) : (
                                                    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>
                                                        {currentUserRank.username?.charAt(0).toUpperCase() || '?'}
                                                    </span>
                                                )}
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
                    {/* {isLoading && <div className={landingStyles['loader']}>Hacking Database...</div>} */}
                </div>
            </div>
        </section>
        </div>
    );
};

export default LeaderboardPage;