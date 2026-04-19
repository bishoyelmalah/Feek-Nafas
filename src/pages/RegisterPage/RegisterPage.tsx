import { useState, type SubmitEvent } from 'react';
import { Link } from 'react-router';
import { signUp } from '../../services/authService';
import { insertUserProfile } from '../../services/authService';
import styles from './RegisterPage.module.css';

export function RegisterPage() {
    const [username, setUsername] = useState('');
    const [name, setname] = useState('');
    const [handle, setHandle] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInsertion = async (userId: string) => {
        return insertUserProfile({
            id: userId,
            name,
            username,
            email,
            codeforcesHandle: handle,
        });
    };

    const handleSignUp = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('PASSWORDS DO NOT MATCH');
            return;
        }
        setLoading(true);
        
        const { error: authError, userId } = await signUp({
            email,
            password,
        });

        if (authError) {
            setError(authError.message.toUpperCase());
            setLoading(false);
            return;
        }

        if (!userId) {
            setError('USER_ID_NOT_FOUND_AFTER_SIGNUP');
            setLoading(false);
            return;
        }

        const { error: insertError } = await handleInsertion(userId);
        if (insertError) {
            setError(insertError.message.toUpperCase());
            setLoading(false);
            return;
        }

        setSuccess(true);
        setLoading(false);
    };

    return (
        <div className={styles['sign-up-page']}>
            {/* Background layers */}
            <div className={styles['sign-up-bg-grid']} />
            <div className={styles['sign-up-bg-scanline']} />
            <div className={styles['sign-up-bg-glow-left']} />
            <div className={styles['sign-up-bg-glow-right']} />

            {/* Card */}
            <div className={styles['sign-up-card']}>

                {/* Logo */}
                <div className={styles['sign-up-logo']}>
                    <div className={styles['sign-up-logo-icon']}>
                        <span className="material-symbols-outlined">terminal</span>
                    </div>
                    <h1 className={styles['sign-up-logo-text']}>
                        FEEK<span>NAFAS</span>
                    </h1>
                </div>

                {/* Header */}
                <div className={styles['sign-up-header']}>
                    <p className={styles['sign-up-tagline']}>// OPERATOR_REGISTRATION</p>
                    <h2 className={styles['sign-up-title']}>
                        JOIN THE <span>ARENA</span>
                    </h2>
                    <p className={styles['sign-up-subtitle']}>CREATE_YOUR_OPERATOR_PROFILE</p>
                </div>

                <div className={styles['sign-up-divider']} />

                {/* Form */}
                {success ? (
                    <div className={styles['sign-up-success']}>
                        <span className={"material-symbols-outlined " + styles['sign-up-success-icon']}>mark_email_read</span>
                        <p className={styles['sign-up-success-title']}>TRANSMISSION_SENT</p>
                        <p className={styles['sign-up-success-body']}>
                            Check your inbox to confirm your operator profile.<br />
                            <Link to="/login">RETURN_TO_LOGIN</Link>
                        </p>
                    </div>
                ) : (
                <form className={styles['sign-up-form']} onSubmit={handleSignUp}>

                    {error && (
                        <div className={styles['sign-up-error']}>
                            <span className="material-symbols-outlined">error</span>
                            {error}
                        </div>
                    )}

                    {/* Username */}
                    <div className={styles['sign-up-field']}>
                        <label className={styles['sign-up-label']} htmlFor="username">
                            Name
                        </label>
                        <div className={styles['sign-up-input-wrapper']}>
                            <input
                                id="name"
                                className={styles['sign-up-input']}
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                required
                                autoComplete="name"
                            />
                            <span className={"material-symbols-outlined " + styles['sign-up-input-icon']}>badge</span>
                        </div>
                        <label className={styles['sign-up-label']} htmlFor="username">
                            UserName
                        </label>
                        <div className={styles['sign-up-input-wrapper']}>
                            <input
                                id="username"
                                className={styles['sign-up-input']}
                                type="text"
                                placeholder="UserName"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                            />
                            <span className={"material-symbols-outlined " + styles['sign-up-input-icon']}>badge</span>
                        </div>
                    </div>
                    <div className={styles['sign-up-field']}>
                        <label className={styles['sign-up-label']} htmlFor="handle">
                            Codeforces Handle
                        </label>
                        <div className={styles['sign-up-input-wrapper']}>
                            <input
                                id="handle"
                                className={styles['sign-up-input']}
                                type="text"
                                placeholder="Handle"
                                value={handle}
                                onChange={(e) => setHandle(e.target.value)}
                                required
                                autoComplete="nickname"
                            />
                            <span className={"material-symbols-outlined " + styles['sign-up-input-icon']}>badge</span>
                        </div>
                    </div>

                    {/* Email */}
                    <div className={styles['sign-up-field']}>
                        <label className={styles['sign-up-label']} htmlFor="email">
                            Email
                        </label>
                        <div className={styles['sign-up-input-wrapper']}>
                            <input
                                id="email"
                                className={styles['sign-up-input']}
                                type="email"
                                placeholder="operator@feekNafas.io"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                            <span className={"material-symbols-outlined " + styles['sign-up-input-icon']}>alternate_email</span>
                        </div>
                    </div>

                    {/* Password */}
                    <div className={styles['sign-up-field']}>
                        <label className={styles['sign-up-label']} htmlFor="password">
                            ACCESS_KEY
                        </label>
                        <div className={styles['sign-up-input-wrapper']}>
                            <input
                                id="password"
                                className={styles['sign-up-input']}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                minLength={6}
                            />
                            <span className={"material-symbols-outlined " + styles['sign-up-input-icon']}>lock</span>
                            <button
                                type="button"
                                className={styles['sign-up-input-toggle']}
                                onClick={() => setShowPassword((p) => !p)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                <span className="material-symbols-outlined">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className={styles['sign-up-field']}>
                        <label className={styles['sign-up-label']} htmlFor="confirmPassword">
                            CONFIRM_ACCESS_KEY
                        </label>
                        <div className={styles['sign-up-input-wrapper']}>
                            <input
                                id="confirmPassword"
                                className={styles['sign-up-input']}
                                type={showConfirm ? 'text' : 'password'}
                                placeholder="••••••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                minLength={6}
                            />
                            <span className={"material-symbols-outlined " + styles['sign-up-input-icon']}>lock_reset</span>
                            <button
                                type="button"
                                className={styles['sign-up-input-toggle']}
                                onClick={() => setShowConfirm((p) => !p)}
                                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                            >
                                <span className="material-symbols-outlined">
                                    {showConfirm ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button className={styles['sign-up-submit']} type="submit" disabled={loading}>
                        {loading ? (
                            <div className={styles['sign-up-spinner']} />
                        ) : (
                            <>
                                <span className="material-symbols-outlined">app_registration</span>
                                CREATE_PROFILE
                            </>
                        )}
                    </button>

                    {/* Separator */}
                    <div className={styles['sign-up-separator']}>
                        <div className={styles['sign-up-separator-line']} />
                        <span className={styles['sign-up-separator-text']}>have an account?</span>
                        <div className={styles['sign-up-separator-line']} />
                    </div>

                    {/* Login link */}
                    <p className={styles['sign-up-register']}>
                        <Link to="/login">LOGIN_TO_PROFILE</Link>
                    </p>
                </form>
                )}

                {/* Status bar */}
                <div className={styles['sign-up-status-bar']}>
                    <div className={styles['sign-up-status-item']}>
                        <span className={styles['sign-up-status-label']}>SYSTEM_STATUS</span>
                        <span className={[styles['sign-up-status-value'], styles['sign-up-status-dot']].join(' ')}>ONLINE</span>
                    </div>
                    <div className={styles['sign-up-status-item']} style={{ textAlign: 'right' }}>
                        <span className={styles['sign-up-status-label']}>PLAYERS_ONLINE</span>
                        <span className={styles['sign-up-status-value']}>14,204</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
