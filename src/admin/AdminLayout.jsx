import { useEffect } from 'react';
import { NavLink, Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import {
  IconHome, IconUsersGroup, IconPhoto, IconClipboardCheck,
  IconQuote, IconUserShield, IconLogout, IconLoader2,
} from '@tabler/icons-react';
import { useAdminAuth } from './AdminAuth.jsx';
import { supabase } from '../lib/supabase.js';

const NAV = [
  { to: '/admin',              label: 'Overview',      Icon: IconHome,           exact: true },
  { to: '/admin/leads',        label: 'Leads',         Icon: IconUsersGroup },
  { to: '/admin/imagery',      label: 'Imagery',       Icon: IconPhoto },
  { to: '/admin/picks',        label: 'Audit picks',   Icon: IconClipboardCheck },
  { to: '/admin/testimonials', label: 'Testimonials',  Icon: IconQuote },
];

const SUPER_NAV = [
  { to: '/admin/users', label: 'Users', Icon: IconUserShield },
];

export default function AdminLayout() {
  const { session, profile, loading, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!session) return;
    // Lightly touch last_seen so the super-admin can see who's been active.
    supabase
      .from('profiles')
      .update({ last_seen_at: new Date().toISOString() })
      .eq('id', session.user.id)
      .then(({ error }) => {
        if (error) console.error('[admin] last_seen update failed', error);
      });
  }, [session]);

  if (loading) {
    return (
      <div className="dr-admin-fullscreen-loading">
        <IconLoader2 size={28} stroke={2} className="dr-admin-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  const isSuper = profile?.is_super_admin;
  const displayName = profile?.full_name || profile?.username || session.user.email;

  return (
    <div className="dr-admin">
      <aside className="dr-admin__sidebar">
        <div className="dr-admin__brand">
          <span className="dr-admin__brand-name">Digital Roofers</span>
          <span className="dr-admin__brand-tag">Admin</span>
        </div>

        <nav className="dr-admin__nav" aria-label="Admin">
          {NAV.map(({ to, label, Icon, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                `dr-admin__nav-link ${isActive ? 'is-active' : ''}`
              }
            >
              <Icon size={18} stroke={1.75} />
              <span>{label}</span>
            </NavLink>
          ))}
          {isSuper && (
            <>
              <div className="dr-admin__nav-sep" />
              {SUPER_NAV.map(({ to, label, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `dr-admin__nav-link ${isActive ? 'is-active' : ''}`
                  }
                >
                  <Icon size={18} stroke={1.75} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </>
          )}
        </nav>

        <div className="dr-admin__sidebar-footer">
          <div className="dr-admin__me">
            <div className="dr-admin__me-name">{displayName}</div>
            <div className="dr-admin__me-role">
              {isSuper ? 'Super-admin' : 'Admin'}
            </div>
          </div>
          <button
            type="button"
            className="dr-admin__signout"
            onClick={handleSignOut}
            aria-label="Sign out"
          >
            <IconLogout size={16} stroke={2} />
          </button>
        </div>
      </aside>

      <main className="dr-admin__main">
        <Outlet />
      </main>
    </div>
  );
}
