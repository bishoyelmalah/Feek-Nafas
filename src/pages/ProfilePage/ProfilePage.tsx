import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { supabase } from '../../lib/supabase';
import { getUserProfile, updateUserProfile, type UserProfile } from '../../services/ProfileService';
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
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', username: '', email: '', codeforces_handle: '' });

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
        setEditForm({
          name: (userProfile as any).name || '',
          username: userProfile.username || '',
          email: userProfile.email || '',
          codeforces_handle: userProfile.codeforces_handle || '',
        });
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

  const handleSave = async () => {
    if (!userId) return;
    setIsLoading(true);
    setError('');
    try {
      await updateUserProfile(userId, {
        name: editForm.name || null,
        username: editForm.username || null,
        email: editForm.email || null,
        codeforces_handle: editForm.codeforces_handle || null,
      });

      const refreshed = await getUserProfile(userId);
      setProfile(refreshed);
      const url = await getAvatarUrl(userId);
      setAvatarUrl(url);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
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
            <button className={styles.logoutButton} onClick={() => setIsEditing(true)}>
              EDIT PROFILE
            </button>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Profile</h2>
            <div className={styles.inputRow}>
              <label>Name</label>
              <input value={editForm.name} onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))} />
            </div>
            <div className={styles.inputRow}>
              <label>Handle</label>
              <input value={editForm.username} onChange={e => setEditForm(prev => ({ ...prev, username: e.target.value }))} />
            </div>
            <div className={styles.inputRow}>
              <label>Email</label>
              <input value={editForm.email} onChange={e => setEditForm(prev => ({ ...prev, email: e.target.value }))} />
            </div>
            <div className={styles.inputRow}>
              <label>Codeforces Handle</label>
              <input value={editForm.codeforces_handle} onChange={e => setEditForm(prev => ({ ...prev, codeforces_handle: e.target.value }))} />
            </div>
            <div className={styles.inputRow}>
              <label>Add Photo</label>
              <div className={styles.fileRow}>
                <button type="button" className={styles.uploadIconButton} title="Upload photo" onClick={() => {}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M12 16V4" stroke="#ec5b13" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 10l6-6 6 6" stroke="#ec5b13" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 20H4a2 2 0 0 1-2-2v-4" stroke="#00f2ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <span className={styles.fileHint}>Upload photo</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className={styles.logoutButton} onClick={handleSave} disabled={isLoading}>SAVE</button>
              <button className={styles.logoutButton} onClick={() => setIsEditing(false)}>CANCEL</button>
              <a href="#" className={`${styles.version} ${styles.changePasswordLink}`} style={{ marginLeft: 'auto', alignSelf: 'center' }}>Change password</a>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}