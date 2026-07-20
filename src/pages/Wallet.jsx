import React, { useEffect, useState } from 'react';
import { getWallets, createCheckout } from '../services/api';
import Modal from '../components/Modal';

export default function Wallet() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await getWallets();
        setWallets(Array.isArray(res) ? res : (res && res.data) ? res.data : []);
      } catch (err) {
        const message = err.message || 'Failed to load wallets';
        setError(message);
        setModalMessage(message);
        setShowModal(true);
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
      if (url) {
        window.location.href = url;
      } else {
        setModalMessage('Checkout URL not returned by server.');
        setShowModal(true);
      }
    } catch (err) {
      const message = err.message || 'Checkout error';
      setModalMessage(message);
      setShowModal(true);
    }
  };

  if (loading) return <div className="p-6 text-center text-slate-500">Loading wallets...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-700 to-slate-900 p-8 text-white shadow-xl">
        <h2 className="text-3xl font-semibold">Your multi-currency wallet</h2>
        <p className="mt-2 text-slate-200">Top up credits and manage your balances across all supported currencies.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {wallets.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">No wallets found</div>
        ) : (
          wallets.map((w) => (
            <div key={w.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{w.currency?.module || 'Currency'}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{w.currency?.name || w.currency?.code || 'Unknown'}</h3>
                </div>
                <div className="rounded-2xl bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase text-indigo-700">{w.currency?.code || 'N/A'}</div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">Balance</p>
                  <p className="mt-1 text-3xl font-semibold text-slate-900">{w.current_balance ?? w.balance ?? 0}</p>
                </div>
                <button
                  className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  onClick={() => handleBuy(w.currency_id || w.currency?.id || w.currencyId)}
                >
                  Buy credits
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <Modal title="Wallet error" message={modalMessage} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
