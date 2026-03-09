import { useState, type SubmitEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../../services/supabase';
import styles from './loginPage.module.css';

export function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

        if (authError) {
            setError(authError.message.toUpperCase());
        } else {
            navigate('/home');
        }

        setLoading(false);
    };

    return (
        <div className={styles['login-page']}>
            {/* Background layers */}
            <div className={styles['login-bg-grid']} />
            <div className={styles['login-bg-scanline']} />
            <div className={styles['login-bg-glow-left']} />
            <div className={styles['login-bg-glow-right']} />

            {/* Card */}
            <div className={styles['login-card']}>

                {/* Logo */}
                <div className={styles['login-logo']}>
                    <div className={styles['login-logo-icon']}>
                        <span className="material-symbols-outlined">terminal</span>
                    </div>
                    <h1 className={styles['login-logo-text']}>
                        FEEK<span>NAFAS</span>
                    </h1>
                </div>

                {/* Header */}
                <div className={styles['login-header']}>
                    <p className={styles['login-tagline']}>// SECURE_ACCESS_PORTAL</p>
                    <h2 className={styles['login-title']}>
                        ENTER THE <span>ARENA</span>
                    </h2>
                    <p className={styles['login-subtitle']}>AUTHENTICATE_TO_CONTINUE</p>
                </div>

                <div className={styles['login-divider']} />

                {/* Form */}
                <form className={styles['login-form']} onSubmit={handleLogin}>

                    {error && (
                        <div className={styles['login-error']}>
                            <span className="material-symbols-outlined">error</span>
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <div className={styles['login-field']}>
                        <label className={styles['login-label']} htmlFor="email">
                            TERMINAL_ID
                        </label>
                        <div className={styles['login-input-wrapper']}>
                            <input
                                id="email"
                                className={styles['login-input']}
                                type="email"
                                placeholder="operator@feekNafas.io"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                            <span className={"material-symbols-outlined " + styles['login-input-icon']}>alternate_email</span>
                        </div>
                    </div>

                    {/* Password */}
                    <div className={styles['login-field']}>
                        <label className={styles['login-label']} htmlFor="password">
                            ACCESS_KEY
                        </label>
                        <div className={styles['login-input-wrapper']}>
                            <input
                                id="password"
                                className={styles['login-input']}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                            <span className={"material-symbols-outlined " + styles['login-input-icon']}>lock</span>
                            <button
                                type="button"
                                className={styles['login-input-toggle']}
                                onClick={() => setShowPassword((p) => !p)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                <span className="material-symbols-outlined">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Forgot password */}
                    <div className={styles['login-forgot']}>
                        <a href="#">FORGOT_ACCESS_KEY?</a>
                    </div>

                    {/* Submit */}
                    <button className={styles['login-submit']} type="submit" disabled={loading}>
                        {loading ? (
                            <div className={styles['login-spinner']} />
                        ) : (
                            <>
                                <span className="material-symbols-outlined">login</span>
                                AUTHENTICATE
                            </>
                        )}
                    </button>

                    {/* Separator */}
                    <div className={styles['login-separator']}>
                        <div className={styles['login-separator-line']} />
                        <span className={styles['login-separator-text']}>no account?</span>
                        <div className={styles['login-separator-line']} />
                    </div>

                    {/* Register */}
                    <p className={styles['login-register']}>
                        <Link to="/register">CREATE_OPERATOR_PROFILE</Link>
                    </p>
                </form>

                {/* Status bar */}
                <div className={styles['login-status-bar']}>
                    <div className={styles['login-status-item']}>
                        <span className={styles['login-status-label']}>SYSTEM_STATUS</span>
                        <span className={[styles['login-status-value'], styles['login-status-dot']].join(' ')}>ONLINE</span>
                    </div>
                    <div className={styles['login-status-item']} style={{ textAlign: 'right' }}>
                        <span className={styles['login-status-label']}>PLAYERS_ONLINE</span>
                        <span className={styles['login-status-value']}>14,204</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
