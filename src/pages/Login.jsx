import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handle = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.token);
      navigate('/wallet');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-layout">
      <section className="auth-aside">
        <p className="eyebrow">Welcome back</p>
        <h1 className="hero-title">Pick up where your wallet activity left off.</h1>
        <p className="hero-summary">
          Review balances, continue purchases, and track campaign funding from one account workspace.
        </p>
      </section>

      <form onSubmit={handle} className="auth-card">
        <div>
          <p className="eyebrow">Login</p>
          <h2 className="section-title">Sign in to your account</h2>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <label className="field-group">
          <span>Email</span>
          <input className="field-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
        </label>

        <label className="field-group">
          <span>Password</span>
          <input type="password" className="field-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
        </label>

        <button className="button-link w-full justify-center" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>

        <p className="auth-meta">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
