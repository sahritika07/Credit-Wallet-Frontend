import React from 'react';
import { useLocation } from 'react-router-dom';

export default function CheckoutReturn() {
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const success = params.get('success');
  const session = params.get('session_id') || params.get('session');

  return (
    <div className="p-6 text-center">
      {success === 'true' || success === '1' ? (
        <>
          <h2 className="text-xl mb-2">Payment successful</h2>
          <p>Your credits will be applied once the webhook processes the event.</p>
          <p className="mt-4">Session: {session}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl mb-2">Checkout status</h2>
          <p>If you were redirected here after checkout, please check your email or the wallet page.</p>
        </>
      )}
    </div>
  );
}
