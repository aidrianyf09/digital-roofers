import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { IconLoader2 } from '@tabler/icons-react';
import { supabase } from '../lib/supabase.js';
import { useAdminAuth } from './AdminAuth.jsx';

/**
 * Super-admin-only user management. Currently lists admin profiles +
 * shows the steps for adding new admins.
 *
 * NOTE: Adding a new auth user requires the Supabase service_role key,
 * which we deliberately do NOT ship in the browser bundle. For now, new
 * admins are created via the Supabase dashboard (Authentication → Users
 * → Add user). Once added there, the profile row is auto-created via
 * the on_auth_user_created trigger. Super-admin can promote them via
 * the toggle below.
 */
export default function AdminUsers() {
  const { profile } = useAdminAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, full_name, is_super_admin, created_at, last_seen_at')
      .order('created_at', { ascending: true });
    if (error) console.error('[admin/users] fetch failed', error);
    setProfiles(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  if (profile && !profile.is_super_admin) {
    return <Navigate to="/admin" replace />;
  }

  const toggleSuper = async (id, current) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_super_admin: !current })
      .eq('id', id);
    if (error) alert('Update failed: ' + error.message);
    load();
  };

  return (
    <div className="dr-admin-page">
      <header className="dr-admin-page__head">
        <h1 className="dr-admin-page__h1">Users</h1>
        <p className="dr-admin-page__sub">
          Super-admin only. Promote / demote admins. To add a brand-new admin, create them in Supabase first (see steps below).
        </p>
      </header>

      <div className="dr-admin-user-form">
        <strong>To add a new admin:</strong>
        <ol style={{ paddingLeft: 18, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--brand-charcoal)', lineHeight: 1.5 }}>
          <li>Open the Supabase dashboard → Authentication → Users → Add user.</li>
          <li>Enter their email + a temporary password. Check &quot;Auto Confirm User&quot;.</li>
          <li>Click Create. They&apos;ll appear in the list below.</li>
          <li>If they should be a super-admin, click the toggle next to their name.</li>
          <li>Share the temporary password with them. They&apos;ll change it via Supabase Auth on first login.</li>
        </ol>
      </div>

      <div className="dr-admin-table-wrap">
        {loading ? (
          <div className="dr-admin-empty"><IconLoader2 size={20} className="dr-admin-spin" /></div>
        ) : (
          <table className="dr-admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Role</th>
                <th>Created</th>
                <th>Last seen</th>
                <th>Toggle</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id}>
                  <td>{p.full_name || '—'}</td>
                  <td>{p.username || '—'}</td>
                  <td>
                    <span className={`dr-admin-table__pill ${p.is_super_admin ? 'is-synced' : ''}`}>
                      {p.is_super_admin ? 'Super-admin' : 'Admin'}
                    </span>
                  </td>
                  <td>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td>{p.last_seen_at ? new Date(p.last_seen_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '—'}</td>
                  <td>
                    <button
                      type="button"
                      className="dr-admin-slot__btn"
                      onClick={() => toggleSuper(p.id, p.is_super_admin)}
                    >
                      {p.is_super_admin ? 'Demote' : 'Promote'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
