import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/api';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl items-center justify-center px-6">
      <div className="panel-card text-center">
        <p className="eyebrow">Session</p>
        <h1 className="section-title">Signing you out</h1>
        <p className="section-copy">Your local session is being cleared.</p>
      </div>
    </div>
  );
}
