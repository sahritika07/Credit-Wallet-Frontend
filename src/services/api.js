const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const headers = options.headers || {};
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { credentials: 'include', headers: { 'Content-Type': 'application/json', ...headers }, ...options });
  const body = await res.json().catch(() => null);
  if (!res.ok) throw body || { message: 'Network error' };
  return body;
}

export const signup = (payload) => request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) });
export const login = (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
export const getProfile = () => request('/auth/profile');
export const getWallets = () => request('/wallet');
export const getLedger = (currencyId) => request(`/wallet/ledger${currencyId ? `?currencyId=${currencyId}` : ''}`);
export const createCheckout = (payload) => request('/stripe/checkout', { method: 'POST', body: JSON.stringify(payload) });
export const createCampaign = (payload) => request('/campaigns', { method: 'POST', body: JSON.stringify(payload) });
export const fundCampaign = (id, payload) => request(`/campaigns/${id}/fund`, { method: 'POST', body: JSON.stringify(payload) });
