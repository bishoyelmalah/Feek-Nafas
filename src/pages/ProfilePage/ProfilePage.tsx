import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { supabase } from '../../lib/supabase';
import { getUserProfile, type UserProfile } from '../../services/ProfileService';
import { getAvatarUrl } from '../../services/avatarService';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const nav = useNavigate();
  const auth = useContext(AuthContext);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const userId = auth?.userId;

  useEffect(() => {
    if (!userId) {
      nav('/login');
      return;
    }

    const loadProfile = async () => {
      setIsLoading(true);
      setError('');
      try {
        const userProfile = await getUserProfile(userId);
        setProfile(userProfile);
      } catch (err: any) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [userId, nav]);

  useEffect(() => {
    const loadAvatar = async () => {
      if (userId) {
        const url = await getAvatarUrl(userId);
        setAvatarUrl(url);
      }
    };
    loadAvatar();
  }, [userId]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    nav('/login');
  };

  if (isLoading) {
    return (
      <>
        <Header activeLink="profile" />
        <div className={styles.loadingScreen}>
          <div className={styles.spinner} />
          <p>LOADING PROFILE</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !profile) {
    return (
      <>
        <Header activeLink="profile" />
        <div className={styles.errorScreen}>
          <p>{error || 'Profile not found'}</p>
          <button onClick={() => window.location.reload()}>RETRY</button>
        </div>
        <Footer />
      </>
    );
  }

  const winRate = profile.totalMatches > 0
    ? Math.round((profile.wins / profile.totalMatches) * 100)
    : 0;

  return (
    <>
      <Header activeLink="profile" />
      <div className={styles.profilePage}>
        <div className={styles.profileCard}>
          <div className={styles.header}>
            <h1>OPERATOR PROFILE</h1>
            <span className={styles.version}>ID: {userId?.slice(0, 8)}</span>
          </div>

          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" className={styles.avatarImage} />
              ) : (
                <div className={styles.avatarInitial}>
                  {profile.username?.charAt(0).toUpperCase() || '?'}
                </div>
              )}
            </div>
            <div className={styles.rankBadge}>
              <span className={styles.rankLabel}>RANK</span>
              <span className={styles.rankValue}>#{profile.rank}</span>
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoRow}>
              <span className={styles.label}>HANDLE</span>
              <span className={styles.value}>{profile.username || 'N/A'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>EMAIL</span>
              <span className={styles.value}>{profile.email || 'N/A'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>CODEFORCES HANDLE</span>
              <span className={styles.value}>{profile.codeforces_handle || 'NOT SET'}</span>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{profile.score}</span>
              <span className={styles.statLabel}>SCORE (TOTAL)</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{profile.totalMatches}</span>
              <span className={styles.statLabel}>MATCHES</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{winRate}%</span>
              <span className={styles.statLabel}>WIN RATE</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.logoutButton} onClick={handleSignOut}>
              SIGN OUT
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}