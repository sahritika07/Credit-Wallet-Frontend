import { useEffect, useState } from 'react';
import { createCheckout, getWallets } from '../services/api';

const formatInr = (paise) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format((paise || 0) / 100);

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
        setWallets(Array.isArray(res) ? res : []);
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
      const res = await createCheckout({ currencyId, quantity: 10 });
      const url = res?.checkoutUrl || res?.url || res?.sessionUrl;
      if (url) {
        globalThis.location.assign(url);
        return;
      }
      alert('Checkout URL not returned by server');
    } catch (err) {
      const message = err.message || 'Checkout error';
      setModalMessage(message);
      setShowModal(true);
    }
  };

  if (loading) return <div className="page-state">Loading wallets...</div>;
  if (error) return <div className="page-state error-text">{error}</div>;

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Wallet overview</p>
          <h1 className="section-title">Manage balances by credit type</h1>
        </div>
        <p className="section-copy">Each wallet is tied to one currency. Stripe purchases create pending payments first, then confirmed credits after webhook success.</p>
      </section>

      <section className="feature-grid">
        {wallets.length === 0 && <div className="panel-card">No wallets found.</div>}
        {wallets.map((wallet) => (
          <article key={wallet.id} className="panel-card">
            <div className="wallet-topline">
              <p className="eyebrow">{wallet.currency?.module || 'wallet'}</p>
              <span className="wallet-chip">{wallet.currency?.code || 'N/A'}</span>
            </div>
            <h2 className="section-title">{wallet.currency?.name || 'Currency wallet'}</h2>
            <p className="wallet-balance">{wallet.current_balance} credits</p>
            <p className="section-copy">Price per credit: {formatInr(wallet.currency?.price_per_credit_paise)}</p>
            <button className="button-link mt-4" onClick={() => handleBuy(wallet.currency?.id)}>
              Buy 10 credits in INR
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
