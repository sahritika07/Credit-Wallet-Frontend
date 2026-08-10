import { Link, useLocation } from 'react-router-dom';

export default function CheckoutReturn({ mode }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const session = params.get('session_id') || params.get('session');
  const inferredSuccess = params.get('success');

  const successMode = mode === 'success' || inferredSuccess === 'true' || inferredSuccess === '1';
  const cancelMode = mode === 'cancel';

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <section className="panel-card text-center">
        <p className="eyebrow">Stripe checkout</p>
        <h1 className="section-title">
          {successMode ? 'Payment received' : cancelMode ? 'Checkout canceled' : 'Checkout status'}
        </h1>
        <p className="section-copy">
          {successMode
            ? 'Your credits will be added once the Stripe webhook is verified and the payment is marked successful.'
            : cancelMode
              ? 'No credits were granted. You can return to your wallet and start another checkout when ready.'
              : 'If you completed payment, check your wallet again after the webhook finishes processing.'}
        </p>
        {session && <p className="auth-meta">Session reference: {session}</p>}
        <div className="hero-actions justify-center">
          <Link to="/wallet" className="button-link">
            Go to wallet
          </Link>
          <Link to="/campaigns" className="button-link button-link-secondary">
            View campaigns
          </Link>
        </div>
      </section>
    </div>
  );
}
