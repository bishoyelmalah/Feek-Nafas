import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';
import { updateUserProfile } from '../../services/authService';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './ProfilePage.module.css';
import { useAuth } from '../../hooks/useAuth';

export function ProfilePage() {
  const nav = useNavigate();
  const { userId, userData, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '' });
  const [isUploading, setIsUploading] = useState(false);
  const [resetPasswordMessage, setResetPasswordMessage] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatarValue = userData?.avatar_url;
  const isAvatarUrl = avatarValue?.startsWith('http');

  useEffect(() => {
    if (!authLoading && !userId) {
      nav('/login');
    }
    if (userData) {
      setEditForm({
        username: userData.username || '',
      });
    }
  }, [userId, authLoading, nav, userData]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    nav('/login');
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    setIsUploading(true);
    setError('');
    let uploadedUserId = userId;
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('User not authenticated');
      uploadedUserId = user.id;

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from('users')
        .update({
          avatar_url: filePath,
          updated_at: new Date(),
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

    } catch (err: any) {
      setError(err.message || 'Failed to upload avatar');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      // Notify AuthContext and other components to refresh avatar
      window.dispatchEvent(new CustomEvent('avatarUpdated', { detail: { userId: uploadedUserId } }));
    }
  };

  const handleSave = async () => {
    if (!userId) return;
    setError('');
    try {
      await updateUserProfile(userId, {
        username: editForm.username || null,
      });

      setIsEditing(false);
      // Notify AuthContext to refresh user data
      window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { userId } }));
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    }
  };

  const handleResetPassword = async () => {
    if (!userData?.email) {
      setError('Email not found');
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(userData.email);
      if (error) throw error;
      setResetPasswordMessage('Password reset email sent! Check your inbox for instructions.');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    }
  };


  if (authLoading) {
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

  if (!userData) {
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

  const winRate = (userData.totalMatches || 0) > 0
    ? Math.round(((userData.wins || 0) / (userData.totalMatches || 1)) * 100)
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
            <div className={styles.avatarInfo}>
              <div className={styles.avatar}>
                {isAvatarUrl ? (
                  <img src={avatarValue} alt="avatar" className={styles.avatarImage} />
                ) : (
                  <div className={styles.avatarInitial}>
                    {avatarValue || userData.username?.charAt(0).toUpperCase() || '?'}
                  </div>
                )}
              </div>
              <div className={styles.userName}>
                {userData.name || 'N/A'}
              </div>
            </div>
            <div className={styles.rankBadge}>
              <span className={styles.rankLabel}>RANK</span>
              <span className={styles.rankValue}>#{userData.rank}</span>
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoRow}>
              <span className={styles.label}>EMAIL</span>
              <span className={styles.value}>{userData.email || 'N/A'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>USERNAME</span>
              <span className={styles.value}>{userData.username || 'N/A'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>CODEFORCES HANDLE</span>
              <span className={styles.value}>{userData.codeforces_handle || 'NOT SET'}</span>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{userData.score}</span>
              <span className={styles.statLabel}>SCORE (TOTAL)</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{userData.totalMatches}</span>
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
            {error && <div style={{ color: '#ff6b6b', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
            <div className={styles.inputRow}>
              <label>Handle</label>
              <input value={editForm.username} onChange={e => setEditForm(prev => ({ ...prev, username: e.target.value }))} />
            </div>
            <div className={styles.inputRow}>
              <label>Add Photo</label>
              <div className={styles.fileRow}>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="avatarUpload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarUpload}
                  disabled={isUploading}
                />
                <button
                  type="button"
                  className={styles.uploadIconButton}
                  title="Upload photo"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M12 16V4" stroke="#ec5b13" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 10l6-6 6 6" stroke="#ec5b13" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 20H4a2 2 0 0 1-2-2v-4" stroke="#00f2ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <span className={styles.fileHint}>{isUploading ? 'Uploading...' : 'Upload photo'}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className={styles.logoutButton} onClick={handleSave} disabled={authLoading}>SAVE</button>
              <button 
                className={styles.logoutButton} 
                onClick={() => {
                  setIsEditing(false);
                  setError('');
                }}
              >
                CANCEL
              </button>
              <button 
                type="button"
                className={`${styles.version} ${styles.changePasswordLink}`}
                style={{ marginLeft: 'auto', alignSelf: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={handleResetPassword}
              >
                Change password
              </button>
            </div>
          </div>
        </div>
      )}
      {resetPasswordMessage && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Password Reset</h2>
            <p style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '0.95rem' }}>{resetPasswordMessage}</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button 
                className={styles.logoutButton} 
                onClick={() => setResetPasswordMessage('')}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}