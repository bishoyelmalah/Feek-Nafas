import { useContext, useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { supabase } from '../../lib/supabase';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './SettingsPage.module.css';

type ThemeType = 'light' | 'cyber' | 'void';

export function SettingsPage() {
  const nav = useNavigate();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [emailInput, setEmailInput] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [desktopAlerts, setDesktopAlerts] = useState(false);
  const [mobilePush, setMobilePush] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('cyber');

  const userId = auth?.userId;

  useEffect(() => {
    if (!userId) {
      nav('/login');
    }
  }, [userId, nav]);

  const resetPasswordForm = () => {
    setEmailInput('');
    setMessage('');
  };

  const sendPasswordResetEmail = async (emailOverride?: string) => {
    setIsLoading(true);
    setMessage('');

    try {
      const email = emailOverride?.trim() || emailInput.trim() || auth?.userData?.email;
      if (!email) {
        setMessageType('error');
        setMessage('Email address is required');
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessageType('success');
      setMessage(`Password reset email sent to ${email}. Check your inbox to proceed.`);
      setEmailInput('');
    } catch (err: any) {
      setMessageType('error');
      setMessage(err.message || 'Failed to send password reset email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    await sendPasswordResetEmail();
  };

  if (!userId) {
    return null;
  }

  const handlePasswordResetEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendPasswordResetEmail();
  };

  return (
    <>
      <Header activeLink="profile" />
      <div className={styles.settingsPage}>
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <h1 className={styles.title}>TACTICAL SYSTEM CONFIG</h1>
            <p className={styles.subtitle}>
              ADJUST CORE PARAMETERS FOR OPTIMAL COMPETITIVE PERFORMANCE.
            </p>
          </header>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={`${styles.sectionIcon} material-symbols-outlined`}>person</span> ACCOUNT PROFILE
              </h2>
              <div className={styles.accountCard}>
                <p className={styles.cardDesc}>Manage your account information.</p>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <label className={styles.label}>USERNAME</label>
                    <p className={styles.value}>{auth?.userData?.username || 'N/A'}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <label className={styles.label}>EMAIL</label>
                    <p className={styles.value}>{auth?.userData?.email || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={`${styles.sectionIcon} material-symbols-outlined`}>security</span> SECURITY PROTOCOL
              </h2>
              <div className={styles.securityGrid}>
                <div className={styles.securityCard}>
                  <h4 className={styles.cardTitle}>CREDENTIAL RESET</h4>
                  <p className={styles.cardDesc}>
                    Initiate secure password change via email verification.
                  </p>
                  <form onSubmit={handlePasswordResetEmail} className={styles.form}>
                    <input
                      type="email"
                      placeholder="Enter email (optional)"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className={styles.input}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`${styles.button} ${styles.buttonError}`}
                    >
                      {isLoading ? 'SENDING...' : 'RESET PASSWORD'}
                    </button>
                  </form>

                  {message && (
                    <div className={`${styles.message} ${styles[messageType]}`}>
                      {message}
                    </div>
                  )}
                </div>

                <div className={styles.securityCard}>
                  <h4 className={styles.cardTitle}>TWO-FACTOR AUTHENTICATION</h4>
                  <p className={styles.cardDesc}>
                    Multi-layer verification required for login attempts.
                  </p>
                  <label className={styles.toggle}>
                    <input type="checkbox" checked={twoFactorEnabled} onChange={(e) => setTwoFactorEnabled(e.target.checked)} />
                    <div className={styles.toggleSwitch}></div>
                  </label>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={`${styles.sectionIcon} material-symbols-outlined`}>notifications_active</span> SIGNAL CONTROL
              </h2>
              <div className={styles.notificationsList}>
                <label className={styles.notificationItem}>
                  <div className={styles.notificationContent}>
                    <p className={styles.notificationTitle}>EMAIL NOTIFICATIONS</p>
                    <p className={styles.notificationDesc}>
                      Weekly contest summaries and site updates.
                    </p>
                  </div>
                  <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
                </label>
                <label className={styles.notificationItem}>
                  <div className={styles.notificationContent}>
                    <p className={styles.notificationTitle}>DESKTOP ALERTS</p>
                    <p className={styles.notificationDesc}>
                      Real-time status change of your submissions.
                    </p>
                  </div>
                  <input type="checkbox" checked={desktopAlerts} onChange={(e) => setDesktopAlerts(e.target.checked)} />
                </label>
                <label className={styles.notificationItem}>
                  <div className={styles.notificationContent}>
                    <p className={styles.notificationTitle}>MOBILE PUSH</p>
                    <p className={styles.notificationDesc}>
                      Instant contest start alerts and rating updates.
                    </p>
                  </div>
                  <input type="checkbox" checked={mobilePush} onChange={(e) => setMobilePush(e.target.checked)} />
                </label>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={`${styles.sectionIcon} material-symbols-outlined`}>palette</span> INTERFACE VISUALS
              </h2>
              <div className={styles.appearanceGrid}>
                <p className={styles.themeLabel}>VISUAL THEME MODE</p>
                <div className={styles.themeOptions}>
                  <button
                    type="button"
                    className={`${styles.themeOption} ${selectedTheme === 'light' ? styles.active : ''}`}
                    onClick={() => setSelectedTheme('light')}
                  >
                    <div className={styles.themePreview}></div>
                    <span>LIGHT MODE</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles.themeOption} ${selectedTheme === 'cyber' ? styles.active : ''}`}
                    onClick={() => setSelectedTheme('cyber')}
                  >
                    <div className={`${styles.themePreview} ${styles.dark}`}></div>
                    <span>CYBER ATHLETIC</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles.themeOption} ${selectedTheme === 'void' ? styles.active : ''}`}
                    onClick={() => setSelectedTheme('void')}
                  >
                    <div className={`${styles.themePreview} ${styles.void}`}></div>
                    <span>DEEP VOID</span>
                  </button>
                </div>
              </div>
              <div className={styles.appearanceFooterRow}>
                <div>
                  <h4 className={styles.cardTitle}>HIGH CONTRAST MODE</h4>
                  <p className={styles.cardDesc}>Enhance readability for critical data streams.</p>
                </div>
                <label className={styles.toggle}>
                  <input type="checkbox" checked={highContrast} onChange={(e) => setHighContrast(e.target.checked)} />
                  <div className={styles.toggleSwitch}></div>
                </label>
              </div>
            </section>
          </div>

          <div className={styles.footerActions}>
            <button type="button" className={styles.cancelButton} onClick={resetPasswordForm}>
              CANCLE
            </button>
            <button type="button" className={styles.saveButton} onClick={handleSave} disabled={isLoading}>
              {isLoading ? 'SAVING...' : 'SAVE'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
