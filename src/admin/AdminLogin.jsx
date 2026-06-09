import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { IconArrowRight, IconLoader2, IconLock, IconAlertTriangle } from '@tabler/icons-react';
import { useAdminAuth } from './AdminAuth.jsx';

export default function AdminLogin() {
  const { session, signIn } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (session) navigate(from, { replace: true });
  }, [session, navigate, from]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || submitting) return;
    setSubmitting(true);
    setErrorMsg('');
    const { error } = await signIn({ email: email.trim(), password });
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
          <label className="dr-admin-auth__label" htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            className="dr-admin-auth__input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <p className="dr-admin-auth__hint">
          <IconLock size={12} stroke={2} aria-hidden="true" />
          <span>Forgot your password? Contact the super-admin.</span>
        </p>
      </div>
    </main>
  );
}
