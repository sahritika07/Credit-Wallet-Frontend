const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const request = async (path, options = {}) => {
  try {
    const headers = options.headers || {};
    const token = localStorage.getItem('token');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...headers },
      ...options,
    });

    const body = await res.json().catch(() => null);
    if (!res.ok) {
      const normalizedError = body?.error || body || { message: 'Network error', details: null };
      throw normalizedError;
    }

    return body?.data ?? body;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const signup = async (payload) => request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) });
export const login = async (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
export const getProfile = async () => request('/auth/profile');
export const getWallets = async () => request('/wallet');
export const getLedger = async (currencyId) => request(`/wallet/ledger${currencyId ? `?currencyId=${currencyId}` : ''}`);
export const createCheckout = async (payload) => request('/stripe/checkout', { method: 'POST', body: JSON.stringify(payload) });
export const createCampaign = async (payload) => request('/campaigns', { method: 'POST', body: JSON.stringify(payload) });
export const fundCampaign = async (id, payload) => request(`/campaigns/${id}/fund`, { method: 'POST', body: JSON.stringify(payload) });
export const getCampaigns = async () => request('/campaigns');
export const isAuthenticated = () => Boolean(localStorage.getItem('token'));
export const logout = () => {
  localStorage.removeItem('token');
};
