import React, { useEffect, useState } from 'react';
import { getWallets, createCheckout } from '../services/api';

export default function Wallet() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getWallets();
        // API now returns the wallets array directly (or { success/data } is unwrapped)
        setWallets(Array.isArray(res) ? res : (res && res.data) ? res.data : []);
      } catch (err) {
        setError(err.message || 'Failed to load wallets');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleBuy = async (currencyId) => {
    try {
      const res = await createCheckout({ currencyId, quantity: 1 });
      const url = res.checkoutUrl || res.url || res.sessionUrl;
      if (url) window.location.href = url;
      else alert('Checkout URL not returned by server');
    } catch (err) {
      alert(err.message || 'Checkout error');
    }
  };

  if (loading) return <div className="p-6">Loading wallets...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your wallets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wallets.length === 0 && <div className="p-4">No wallets found</div>}
        {wallets.map((w) => (
          <div key={w.id} className="p-4 border rounded shadow-sm bg-white">
            <div className="font-medium text-lg">{w.currency?.code || w.currencyCode || (w.currency && w.currency.code)}</div>
            <div className="text-sm text-gray-600">Balance: {w.current_balance ?? w.balance ?? 0}</div>
            <button className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded" onClick={() => handleBuy(w.currency_id || w.currency?.id || w.currencyId)}>
              Buy credits
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
