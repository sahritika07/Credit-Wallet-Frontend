import { Link, NavLink } from 'react-router-dom';
import { isAuthenticated } from '../services/api';

const navClassName = ({ isActive }) =>
  `nav-link ${isActive ? 'nav-link-active' : ''}`;

export default function Navbar() {
  const authenticated = isAuthenticated();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="brand-group">
          <Link to="/" className="brand-mark">
            <span className="brand-mark-badge">CW</span>
            <span>
              <strong>CreditWallet</strong>
              <small>Wallet and campaign workspace</small>
            </span>
          </Link>

          <nav className="primary-nav">
            <NavLink to="/" className={navClassName} end>
              Home
            </NavLink>
            <NavLink to="/wallet" className={navClassName}>
              Wallets
            </NavLink>
            <NavLink to="/campaigns" className={navClassName}>
              Campaigns
            </NavLink>
            {authenticated && (
              <NavLink to="/profile" className={navClassName}>
                Profile
              </NavLink>
            )}
          </nav>
        </div>

        <div className="auth-nav">
          {authenticated ? (
            <>
              <NavLink to="/profile" className={navClassName}>
                Account
              </NavLink>
              <NavLink to="/logout" className="button-link button-link-secondary">
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClassName}>
                Login
              </NavLink>
              <NavLink to="/signup" className="button-link">
                Create account
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
