import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FiLogOut, FiExternalLink } from 'react-icons/fi';
import { getSession, isConfigured, signIn, signOut } from '../../lib/supabase.js';

// Mbështjellësi i panelit të adminit: tregon login-in nëse admini s'ka hyrë.
export default function AdminLayout() {
  const [session, setSession] = useState(getSession());
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    setSession(null);
    navigate('/admin');
  };

  return (
    <div className="admin">
      <header className="admin__bar">
        <Link to="/admin" className="logo logo--dark">
          <b className="logo__mark">JD</b>
          <span>ADMIN</span>
        </Link>
        <div className="admin__bar-actions">
          <Link to="/" className="btn btn--ghost btn--sm">
            <FiExternalLink /> Website
          </Link>
          {session && (
            <button className="btn btn--ghost btn--sm" onClick={logout}>
              <FiLogOut /> Log out
            </button>
          )}
        </div>
      </header>

      <main className="admin__main">
        {!isConfigured ? (
          <div className="admin__card">
            <h2>Database not connected yet</h2>
            <p>Supabase is not configured. Add the project URL and anon key in <code>src/lib/supabase.js</code>.</p>
          </div>
        ) : session ? (
          <Outlet context={{ session, onExpired: logout }} />
        ) : (
          <Login onLogin={setSession} />
        )}
      </main>
    </div>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      onLogin(await signIn(email.trim(), password));
    } catch {
      setError('Wrong email or password.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="admin__card admin__login form" onSubmit={submit}>
      <h2>Admin login</h2>
      <p className="muted">Sign in to add and manage properties.</p>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="form__error">{error}</p>}
      <button className="btn btn--primary btn--block" disabled={busy}>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
