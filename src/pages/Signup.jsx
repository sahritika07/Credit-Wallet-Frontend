import React, { useState } from 'react';
import { signup } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({ email, password });
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handle} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl mb-4">Create account</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <label className="block mb-2">Email
          <input className="border p-2 w-full mt-1 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block mb-4">Password
          <input type="password" className="border p-2 w-full mt-1 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="w-full bg-indigo-600 text-white p-2 rounded">Sign up</button>
      </form>
    </div>
  );
}
