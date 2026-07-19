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
        setWallets(res.wallets || res);
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
      const res = await createCheckout({ currencyId, amount: 100 });
      const url = res.url || res.checkoutUrl || res.sessionUrl;
      if (url) window.location.href = url;
      else alert('Checkout URL not returned by server');
    } catch (err) {
      alert(err.message || 'Checkout error');
    }
  };

  if (loading) return <div className="p-6">Loading wallets...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Your wallets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wallets.length === 0 && <div>No wallets found</div>}
        {wallets.map((w) => (
          <div key={w.id} className="p-4 border rounded">
            <div className="font-medium">{w.currency?.code || w.currencyCode || w.currency}</div>
            <div className="text-sm">Balance: {w.balance}</div>
            <button className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded" onClick={() => handleBuy(w.currencyId || w.currency?.id)}>
              Buy credits
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
