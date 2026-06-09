import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IconArrowRight, IconLoader2, IconLock, IconAlertTriangle } from '@tabler/icons-react';
import { useAdminAuth } from './AdminAuth.jsx';
import { supabase } from '../lib/supabase.js';

/**
 * First-time super-admin setup. Only available when no super-admin exists.
 * Once one exists, this page redirects to /admin/login.
 */
export default function AdminSetup() {
  const { signUpFirstAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [checking, setChecking] = useState(true);

  // Gate: if a super-admin already exists, bounce to /admin/login.
  useEffect(() => {
    supabase.rpc('has_super_admin').then(({ data, error }) => {
      if (error) {
        console.error('[admin/setup] has_super_admin check failed', error);
        setChecking(false);
        return;
      }
      if (data) {
        navigate('/admin/login', { replace: true });
      } else {
        setChecking(false);
      }
    });
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const u = username.trim();
    if (u.length < 3) return setErrorMsg('Username must be at least 3 characters.');
    if (!/^[a-z0-9._-]+$/i.test(u)) return setErrorMsg('Username can only use letters, numbers, dot, dash, underscore.');
    if (password.length < 8) return setErrorMsg('Password must be at least 8 characters.');
    if (password !== confirmPassword) return setErrorMsg('Passwords do not match.');
    if (!fullName.trim()) return setErrorMsg('Please enter your full name.');

    setSubmitting(true);
    const { error } = await signUpFirstAdmin({ username: u, password, fullName: fullName.trim() });
    if (error) {
      setErrorMsg(error.message || 'Could not create the account.');
      setSubmitting(false);
      return;
    }
    // Auth state listener will detect the new session and navigate to /admin.
    navigate('/admin', { replace: true });
  };

  if (checking) {
    return (
      <main className="dr-admin-auth">
        <div className="dr-admin-auth__shell" style={{ alignItems: 'center' }}>
          <IconLoader2 size={20} className="dr-admin-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="dr-admin-auth">
      <div className="dr-admin-auth__shell">
        <Link to="/" className="dr-admin-auth__logo">
          Digital Roofers <span>/</span> Admin
        </Link>
        <h1 className="dr-admin-auth__h1">First-time setup</h1>
        <p className="dr-admin-auth__sub">
          No super-admin exists yet. Create yours below. After this, the form locks.
        </p>

        <form className="dr-admin-auth__form" onSubmit={onSubmit}>
          <label className="dr-admin-auth__label" htmlFor="setup-fullname">Your name</label>
          <input
            id="setup-fullname"
            className="dr-admin-auth__input"
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label className="dr-admin-auth__label" htmlFor="setup-username">Username</label>
          <input
            id="setup-username"
            className="dr-admin-auth__input"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={3}
          />

          <label className="dr-admin-auth__label" htmlFor="setup-password">Password</label>
          <input
            id="setup-password"
            className="dr-admin-auth__input"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />

          <label className="dr-admin-auth__label" htmlFor="setup-confirm">Confirm password</label>
          <input
            id="setup-confirm"
            className="dr-admin-auth__input"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
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
                Creating…
              </>
            ) : (
              <>
                Create super-admin
                <IconArrowRight size={16} stroke={2} />
              </>
            )}
          </button>
        </form>

        <p className="dr-admin-auth__hint">
          <IconLock size={12} stroke={2} aria-hidden="true" />
          <span>Save your password somewhere safe. We can&apos;t recover it for you.</span>
        </p>
      </div>
    </main>
  );
}
