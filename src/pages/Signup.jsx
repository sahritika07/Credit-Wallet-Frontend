import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/api';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handle = async (event) => {
    event.preventDefault();

    if (!fullName.trim()) {
      setError('Full name is required');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await signup({ full_name: fullName, email, password });
      if (res?.token) {
        localStorage.setItem('token', res.token);
      }
      navigate('/wallet');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-layout">
      <section className="auth-aside">
        <p className="eyebrow">Create your workspace</p>
        <h1 className="hero-title">Set up your account and start managing credits with a clear wallet trail.</h1>
        <p className="hero-summary">
          Signing up creates your user account and pre-builds wallets for every active currency in the system.
        </p>
      </section>

      <form onSubmit={handle} className="auth-card">
        <div>
          <p className="eyebrow">Signup</p>
          <h2 className="section-title">Create your account</h2>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <label className="field-group">
          <span>Full name</span>
          <input className="field-input" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" />
        </label>

        <label className="field-group">
          <span>Email</span>
          <input className="field-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
        </label>

        <label className="field-group">
          <span>Password</span>
          <input type="password" className="field-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
        </label>

        <button className="button-link w-full justify-center" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Create account'}
        </button>

        <p className="auth-meta">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
