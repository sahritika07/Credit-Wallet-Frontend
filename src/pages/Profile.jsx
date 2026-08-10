import { useEffect, useState } from 'react';
import { getProfile } from '../services/api';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getProfile();
        setProfile(res || null);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <div className="page-state">Loading profile...</div>;
  if (error) return <div className="page-state error-text">{error}</div>;
  if (!profile) return <div className="page-state">No profile found.</div>;

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Account</p>
          <h1 className="section-title">Your profile</h1>
        </div>
        <p className="section-copy">This page reflects the authenticated user record returned by the backend profile endpoint.</p>
      </section>

      <section className="feature-grid">
        <article className="panel-card">
          <p className="eyebrow">Identity</p>
          <h2 className="section-title">{profile.full_name}</h2>
          <p className="section-copy">{profile.email}</p>
        </article>

        <article className="panel-card">
          <p className="eyebrow">Access</p>
          <h2 className="section-title">Role: {profile.role}</h2>
          <p className="section-copy">User ID: {profile.id}</p>
        </article>
      </section>
    </div>
  );
}
