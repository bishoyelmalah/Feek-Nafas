import { useState, type SubmitEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../../services/supabase';
import './loginPage.css';

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
            navigate('/');
        }

        setLoading(false);
    };

    return (
        <div className="login-page">
            {/* Background layers */}
            <div className="login-bg-grid" />
            <div className="login-bg-scanline" />
            <div className="login-bg-glow-left" />
            <div className="login-bg-glow-right" />

            {/* Card */}
            <div className="login-card">

                {/* Logo */}
                <div className="login-logo">
                    <div className="login-logo-icon">
                        <span className="material-symbols-outlined">terminal</span>
                    </div>
                    <h1 className="login-logo-text">
                        FEEK<span>NAFAS</span>
                    </h1>
                </div>

                {/* Header */}
                <div className="login-header">
                    <p className="login-tagline">// SECURE_ACCESS_PORTAL</p>
                    <h2 className="login-title">
                        ENTER THE <span>ARENA</span>
                    </h2>
                    <p className="login-subtitle">AUTHENTICATE_TO_CONTINUE</p>
                </div>

                <div className="login-divider" />

                {/* Form */}
                <form className="login-form" onSubmit={handleLogin}>

                    {error && (
                        <div className="login-error">
                            <span className="material-symbols-outlined">error</span>
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <div className="login-field">
                        <label className="login-label" htmlFor="email">
                            TERMINAL_ID
                        </label>
                        <div className="login-input-wrapper">
                            <input
                                id="email"
                                className="login-input"
                                type="email"
                                placeholder="operator@feekNafas.io"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                            <span className="login-input-icon material-symbols-outlined">alternate_email</span>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="login-field">
                        <label className="login-label" htmlFor="password">
                            ACCESS_KEY
                        </label>
                        <div className="login-input-wrapper">
                            <input
                                id="password"
                                className="login-input"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                            <span className="login-input-icon material-symbols-outlined">lock</span>
                            <button
                                type="button"
                                className="login-input-toggle"
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
                    <div className="login-forgot">
                        <a href="#">FORGOT_ACCESS_KEY?</a>
                    </div>

                    {/* Submit */}
                    <button className="login-submit" type="submit" disabled={loading}>
                        {loading ? (
                            <div className="login-spinner" />
                        ) : (
                            <>
                                <span className="material-symbols-outlined">login</span>
                                AUTHENTICATE
                            </>
                        )}
                    </button>

                    {/* Separator */}
                    <div className="login-separator">
                        <div className="login-separator-line" />
                        <span className="login-separator-text">no account?</span>
                        <div className="login-separator-line" />
                    </div>

                    {/* Register */}
                    <p className="login-register">
                        <Link to="/register">CREATE_OPERATOR_PROFILE</Link>
                    </p>
                </form>

                {/* Status bar */}
                <div className="login-status-bar">
                    <div className="login-status-item">
                        <span className="login-status-label">SYSTEM_STATUS</span>
                        <span className="login-status-value login-status-dot">ONLINE</span>
                    </div>
                    <div className="login-status-item" style={{ textAlign: 'right' }}>
                        <span className="login-status-label">PLAYERS_ONLINE</span>
                        <span className="login-status-value">14,204</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
