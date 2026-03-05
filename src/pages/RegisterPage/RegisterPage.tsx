import { useState, type SubmitEvent } from 'react';
import { Link } from 'react-router';
import { supabase } from '../../services/supabase';
import './RegisterPage.css';

export function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignUp = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('PASSWORDS DO NOT MATCH');
            return;
        }

        setLoading(true);

        const { error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { username } },
        });

        if (authError) {
            setError(authError.message.toUpperCase());
        } else {
            setSuccess(true);
        }

        setLoading(false);
    };

    return (
        <div className="sign-up-page">
            {/* Background layers */}
            <div className="sign-up-bg-grid" />
            <div className="sign-up-bg-scanline" />
            <div className="sign-up-bg-glow-left" />
            <div className="sign-up-bg-glow-right" />

            {/* Card */}
            <div className="sign-up-card">

                {/* Logo */}
                <div className="sign-up-logo">
                    <div className="sign-up-logo-icon">
                        <span className="material-symbols-outlined">terminal</span>
                    </div>
                    <h1 className="sign-up-logo-text">
                        FEEK<span>NAFAS</span>
                    </h1>
                </div>

                {/* Header */}
                <div className="sign-up-header">
                    <p className="sign-up-tagline">// OPERATOR_REGISTRATION</p>
                    <h2 className="sign-up-title">
                        JOIN THE <span>ARENA</span>
                    </h2>
                    <p className="sign-up-subtitle">CREATE_YOUR_OPERATOR_PROFILE</p>
                </div>

                <div className="sign-up-divider" />

                {/* Form */}
                {success ? (
                    <div className="sign-up-success">
                        <span className="material-symbols-outlined sign-up-success-icon">mark_email_read</span>
                        <p className="sign-up-success-title">TRANSMISSION_SENT</p>
                        <p className="sign-up-success-body">
                            Check your inbox to confirm your operator profile.<br />
                            <Link to="/login">RETURN_TO_LOGIN</Link>
                        </p>
                    </div>
                ) : (
                <form className="sign-up-form" onSubmit={handleSignUp}>

                    {error && (
                        <div className="sign-up-error">
                            <span className="material-symbols-outlined">error</span>
                            {error}
                        </div>
                    )}

                    {/* Username */}
                    <div className="sign-up-field">
                        <label className="sign-up-label" htmlFor="username">
                            CALLSIGN
                        </label>
                        <div className="sign-up-input-wrapper">
                            <input
                                id="username"
                                className="sign-up-input"
                                type="text"
                                placeholder="RAVEN_04"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                            />
                            <span className="sign-up-input-icon material-symbols-outlined">badge</span>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="sign-up-field">
                        <label className="sign-up-label" htmlFor="email">
                            TERMINAL_ID
                        </label>
                        <div className="sign-up-input-wrapper">
                            <input
                                id="email"
                                className="sign-up-input"
                                type="email"
                                placeholder="operator@feekNafas.io"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                            <span className="sign-up-input-icon material-symbols-outlined">alternate_email</span>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="sign-up-field">
                        <label className="sign-up-label" htmlFor="password">
                            ACCESS_KEY
                        </label>
                        <div className="sign-up-input-wrapper">
                            <input
                                id="password"
                                className="sign-up-input"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                minLength={6}
                            />
                            <span className="sign-up-input-icon material-symbols-outlined">lock</span>
                            <button
                                type="button"
                                className="sign-up-input-toggle"
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
                    <div className="sign-up-field">
                        <label className="sign-up-label" htmlFor="confirmPassword">
                            CONFIRM_ACCESS_KEY
                        </label>
                        <div className="sign-up-input-wrapper">
                            <input
                                id="confirmPassword"
                                className="sign-up-input"
                                type={showConfirm ? 'text' : 'password'}
                                placeholder="••••••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                minLength={6}
                            />
                            <span className="sign-up-input-icon material-symbols-outlined">lock_reset</span>
                            <button
                                type="button"
                                className="sign-up-input-toggle"
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
                    <button className="sign-up-submit" type="submit" disabled={loading}>
                        {loading ? (
                            <div className="sign-up-spinner" />
                        ) : (
                            <>
                                <span className="material-symbols-outlined">app_registration</span>
                                CREATE_PROFILE
                            </>
                        )}
                    </button>

                    {/* Separator */}
                    <div className="sign-up-separator">
                        <div className="sign-up-separator-line" />
                        <span className="sign-up-separator-text">have an account?</span>
                        <div className="sign-up-separator-line" />
                    </div>

                    {/* Login link */}
                    <p className="sign-up-register">
                        <Link to="/login">LOGIN_TO_PROFILE</Link>
                    </p>
                </form>
                )}

                {/* Status bar */}
                <div className="sign-up-status-bar">
                    <div className="sign-up-status-item">
                        <span className="sign-up-status-label">SYSTEM_STATUS</span>
                        <span className="sign-up-status-value sign-up-status-dot">ONLINE</span>
                    </div>
                    <div className="sign-up-status-item" style={{ textAlign: 'right' }}>
                        <span className="sign-up-status-label">PLAYERS_ONLINE</span>
                        <span className="sign-up-status-value">14,204</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
