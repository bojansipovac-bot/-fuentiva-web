import React, { useState } from 'react';
import { supabase } from '../supabase';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --black: #080808; --gray1: #111111; --gray2: #1C1C1C; --gray3: #2E2E2E;
    --muted: #6B6B6B; --light: #A0A0A0; --white: #F2F2F0;
    --orange: #FF5500; --orange2: #FF7733; --oglow: rgba(255,85,0,0.10);
  }
  body { background: var(--black); color: var(--white); font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }

  .auth-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: var(--black); position: relative; overflow: hidden;
  }
  .auth-page::before {
    content: ''; position: absolute; top: -200px; left: 50%; transform: translateX(-50%);
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(255,85,0,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .auth-box {
    width: 100%; max-width: 420px;
    background: var(--gray1); border: 1px solid var(--gray2);
    padding: 48px 40px; position: relative; z-index: 1;
  }

  .auth-logo {
    font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700;
    letter-spacing: -0.5px; color: var(--white); text-decoration: none;
    display: block; margin-bottom: 32px;
  }
  .auth-logo span { color: var(--orange); }

  .auth-title {
    font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700;
    letter-spacing: -1px; margin-bottom: 8px;
  }
  .auth-subtitle { font-size: 14px; color: var(--muted); margin-bottom: 36px; }

  .form-group { margin-bottom: 20px; }
  .form-label { font-size: 12px; font-weight: 600; letter-spacing: 0.5px; color: var(--light); display: block; margin-bottom: 8px; text-transform: uppercase; }
  .form-input {
    width: 100%; background: var(--black); border: 1px solid var(--gray3);
    color: var(--white); font-family: 'Inter', sans-serif; font-size: 14px;
    padding: 12px 16px; outline: none; transition: border-color 0.2s;
  }
  .form-input:focus { border-color: var(--orange); }
  .form-input::placeholder { color: var(--muted); }

  .btn-submit {
    width: 100%; background: var(--orange); color: #fff;
    font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600;
    padding: 14px; border: none; cursor: pointer; transition: background 0.2s;
    margin-top: 8px; letter-spacing: 0.2px;
  }
  .btn-submit:hover { background: var(--orange2); }
  .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  .auth-forgot {
    display: block; text-align: right; font-size: 12px; color: var(--muted);
    text-decoration: none; margin-top: -12px; margin-bottom: 20px;
    transition: color 0.2s;
  }
  .auth-forgot:hover { color: var(--orange); }

  .auth-divider { border: none; border-top: 1px solid var(--gray2); margin: 28px 0; }

  .auth-switch { font-size: 13px; color: var(--muted); text-align: center; }
  .auth-switch button {
    background: none; border: none; color: var(--orange); cursor: pointer;
    font-size: 13px; font-weight: 600; padding: 0; margin-left: 4px;
    transition: color 0.2s;
  }
  .auth-switch button:hover { color: var(--orange2); }

  .alert {
    padding: 12px 16px; font-size: 13px; margin-bottom: 20px;
    border: 1px solid;
  }
  .alert-error { background: rgba(255,50,50,0.08); border-color: rgba(255,50,50,0.3); color: #FF6B6B; }
  .alert-success { background: rgba(74,222,128,0.08); border-color: rgba(74,222,128,0.3); color: #4ADE80; }

  .back-home {
    position: absolute; top: 24px; left: 24px;
    font-size: 13px; color: var(--muted); text-decoration: none;
    display: flex; align-items: center; gap: 6px; transition: color 0.2s;
  }
  .back-home:hover { color: var(--white); }
`;

export default function Login() {
  const [mode, setMode] = useState('login'); // login | signup | forgot
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const resetFeedback = () => {
    setError(null);
    setMessage(null);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    resetFeedback();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetFeedback();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      window.location.href = '/dashboard';
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    resetFeedback();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    } else if (data?.user && data.user.identities && data.user.identities.length === 0) {
      // Supabase returns an "existing user" shape with empty identities when the email is already registered
      setError('An account with this email already exists. Try signing in instead.');
    } else if (data?.session) {
      // Email confirmation disabled in Supabase settings — user is signed in immediately
      window.location.href = '/dashboard';
    } else {
      setMessage('Account created! Check your email to confirm your address before signing in.');
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetFeedback();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Password reset email sent! Check your inbox.');
    }
    setLoading(false);
  };

  return (
    <>
      <style>{css}</style>
      <div className="auth-page">
        <a href="/" className="back-home">← Back to home</a>

        <div className="auth-box">
          <a href="/" className="auth-logo">Fuen<span>tiva</span></a>

          {mode === 'login' && (
            <>
              <div className="auth-title">Welcome back</div>
              <div className="auth-subtitle">Sign in to your coaching portal</div>

              {error && <div className="alert alert-error">{error}</div>}
              {message && <div className="alert alert-success">{message}</div>}

              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email" className="form-input" placeholder="your@email.com"
                    value={email} onChange={e => setEmail(e.target.value)} required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password" className="form-input" placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)} required
                  />
                </div>
                <button
                  type="button" className="auth-forgot"
                  onClick={() => switchMode('forgot')}
                  style={{background:'none', border:'none', cursor:'pointer', display:'block', width:'100%', textAlign:'right', color:'var(--muted)', fontSize:'12px', marginBottom:'20px', marginTop:'-8px'}}
                >
                  Forgot password?
                </button>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <hr className="auth-divider" />
              <div className="auth-switch">
                Don't have an account?
                <button onClick={() => switchMode('signup')}>Sign up</button>
              </div>
            </>
          )}

          {mode === 'signup' && (
            <>
              <div className="auth-title">Create account</div>
              <div className="auth-subtitle">Get started with your coaching portal</div>

              {error && <div className="alert alert-error">{error}</div>}
              {message && <div className="alert alert-success">{message}</div>}

              <form onSubmit={handleSignUp}>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email" className="form-input" placeholder="your@email.com"
                    value={email} onChange={e => setEmail(e.target.value)} required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password" className="form-input" placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)} required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password" className="form-input" placeholder="••••••••"
                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
                  />
                </div>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>

              <hr className="auth-divider" />
              <div className="auth-switch">
                Already have an account?
                <button onClick={() => switchMode('login')}>Sign in</button>
              </div>
            </>
          )}

          {mode === 'forgot' && (
            <>
              <div className="auth-title">Reset password</div>
              <div className="auth-subtitle">Enter your email and we'll send you a reset link</div>

              {error && <div className="alert alert-error">{error}</div>}
              {message && <div className="alert alert-success">{message}</div>}

              <form onSubmit={handleForgotPassword}>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email" className="form-input" placeholder="your@email.com"
                    value={email} onChange={e => setEmail(e.target.value)} required
                  />
                </div>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <hr className="auth-divider" />
              <div className="auth-switch">
                Remember your password?
                <button onClick={() => switchMode('login')}>Sign in</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}