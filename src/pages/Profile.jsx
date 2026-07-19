import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getProfile();
        setProfile(res.user || res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!profile) return <div className="p-6">No profile</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl mb-4">Profile</h2>
      <div className="p-4 border rounded bg-white shadow-sm">
        <div className="mb-2">Email: <span className="font-medium">{profile.email}</span></div>
        <div>User ID: <span className="font-mono text-sm">{profile.id}</span></div>
      </div>
    </div>
  );
}
