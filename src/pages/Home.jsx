import { Link } from 'react-router-dom';
import { isAuthenticated } from '../services/api';

export default function Home() {
  const authenticated = isAuthenticated();

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Credit operations, simplified</p>
          <h1 className="hero-title">Buy wallet credits, track every balance move, and fund campaigns from one clean workspace.</h1>
          <p className="hero-summary">
            This app connects Stripe checkout, wallet ledgers, and campaign funding so every credit movement is recorded and easy to follow.
          </p>
          <div className="hero-actions">
            <Link to={authenticated ? '/wallet' : '/signup'} className="button-link">
              {authenticated ? 'Open wallet' : 'Start here'}
            </Link>
            <Link to="/campaigns" className="button-link button-link-secondary">
              Explore campaigns
            </Link>
          </div>
        </div>

        <div className="hero-stats">
          <article className="stat-card">
            <span>Wallet model</span>
            <strong>Multi-currency balances</strong>
            <p>Each active currency gets its own wallet and transaction ledger.</p>
          </article>
          <article className="stat-card">
            <span>Funding model</span>
            <strong>Ledger-backed campaign spend</strong>
            <p>Campaign funding reduces wallet balance and creates an audit trail.</p>
          </article>
          <article className="stat-card">
            <span>Payments</span>
            <strong>Stripe checkout + webhook confirmation</strong>
            <p>Credits are granted only after verified webhook completion.</p>
          </article>
        </div>
      </section>

      <section className="feature-grid">
        <article className="panel-card">
          <p className="eyebrow">Business flow</p>
          <h2 className="section-title">How the project works</h2>
          <p className="section-copy">
            Users authenticate, buy credits through Stripe, receive wallet credits after webhook confirmation, and spend campaign credits to fund active campaigns.
          </p>
        </article>

        <article className="panel-card">
          <p className="eyebrow">Ledger first</p>
          <h2 className="section-title">Every balance change is explainable</h2>
          <p className="section-copy">
            Purchases, Stripe grants, and campaign spends all create clear records so balances can be audited instead of guessed.
          </p>
        </article>
      </section>
    </div>
  );
}
