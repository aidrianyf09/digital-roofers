import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { IconArrowRight, IconLoader2, IconLock, IconAlertTriangle } from '@tabler/icons-react';
import { useAdminAuth } from './AdminAuth.jsx';
import { supabase } from '../lib/supabase.js';

export default function AdminLogin() {
  const { session, signIn } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [setupAvailable, setSetupAvailable] = useState(false);

  // Show a "first-time setup" hint if no super-admin exists yet.
  useEffect(() => {
    supabase.rpc('has_super_admin').then(({ data, error }) => {
      if (error) {
        console.error('[admin/login] has_super_admin check failed', error);
        return;
      }
      setSetupAvailable(!data);
    });
  }, []);

  useEffect(() => {
    if (session) navigate(from, { replace: true });
  }, [session, navigate, from]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || submitting) return;
    setSubmitting(true);
    setErrorMsg('');
    const { error } = await signIn({ username: username.trim(), password });
    if (error) {
      setErrorMsg(error.message || 'Sign-in failed.');
      setSubmitting(false);
    }
  };

  return (
    <main className="dr-admin-auth">
      <div className="dr-admin-auth__shell">
        <Link to="/" className="dr-admin-auth__logo">
          Digital Roofers <span>/</span> Admin
        </Link>
        <h1 className="dr-admin-auth__h1">Sign in</h1>
        <p className="dr-admin-auth__sub">Authorized staff only.</p>

        <form className="dr-admin-auth__form" onSubmit={onSubmit}>
          <label className="dr-admin-auth__label" htmlFor="admin-username">Username</label>
          <input
            id="admin-username"
            className="dr-admin-auth__input"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="dr-admin-auth__label" htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            className="dr-admin-auth__input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMsg && (
            <div className="dr-admin-auth__error" role="alert">
              <IconAlertTriangle size={16} stroke={2} aria-hidden="true" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button type="submit" className="dr-admin-auth__btn" disabled={submitting}>
            {submitting ? (
              <>
                <IconLoader2 size={16} stroke={2} className="dr-admin-spin" />
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <IconArrowRight size={16} stroke={2} />
              </>
            )}
          </button>
        </form>

        {setupAvailable ? (
          <p className="dr-admin-auth__hint">
            <IconLock size={12} stroke={2} aria-hidden="true" />
            <span>
              First time? <Link to="/admin/setup">Create the super-admin account</Link>.
            </span>
          </p>
        ) : (
          <p className="dr-admin-auth__hint">
            <IconLock size={12} stroke={2} aria-hidden="true" />
            <span>Forgot your password? Contact the super-admin.</span>
          </p>
        )}
      </div>
    </main>
  );
}
