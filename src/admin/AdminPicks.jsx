import { useEffect, useState } from 'react';
import { IconDownload, IconRefresh, IconLoader2 } from '@tabler/icons-react';
import { supabase } from '../lib/supabase.js';

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

export default function AdminPicks() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRows = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('audit_picks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);
    if (error) console.error('[admin/picks] fetch failed', error);
    setRows(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchRows(); }, []);

  const counts = rows.reduce(
    (acc, r) => ({ ...acc, [r.platform]: (acc[r.platform] || 0) + 1 }),
    {}
  );

  return (
    <div className="dr-admin-page">
      <header className="dr-admin-page__head">
        <h1 className="dr-admin-page__h1">Audit picks</h1>
        <p className="dr-admin-page__sub">
          Every Google / Meta / Both selection on the free-audit page. {rows.length} total.
          {' '}Google: <strong>{counts.google || 0}</strong>,
          {' '}Meta: <strong>{counts.meta || 0}</strong>,
          {' '}Both: <strong>{counts.both || 0}</strong>.
        </p>
      </header>

      <div className="dr-admin-toolbar">
        <button type="button" className="dr-admin-toolbar__btn" onClick={fetchRows} disabled={loading}>
          {loading ? <IconLoader2 size={14} className="dr-admin-spin" /> : <IconRefresh size={14} stroke={2} />}
          Refresh
        </button>
      </div>

      <div className="dr-admin-table-wrap">
        {loading ? (
          <div className="dr-admin-empty"><IconLoader2 size={20} className="dr-admin-spin" /></div>
        ) : !rows.length ? (
          <div className="dr-admin-empty">No picks yet. They&apos;ll appear as soon as someone selects a platform on /free-audit.</div>
        ) : (
          <table className="dr-admin-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Platform</th>
                <th>UTM source</th>
                <th>UTM content</th>
                <th>Referrer</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{fmtDate(r.created_at)}</td>
                  <td>
                    <span className={`dr-admin-table__pill is-${r.platform}`}>
                      {r.platform === 'both' ? 'Both' : r.platform === 'google' ? 'Google' : 'Meta'}
                    </span>
                  </td>
                  <td>{r.utm_source || '—'}</td>
                  <td>{r.utm_content || '—'}</td>
                  <td style={{ maxWidth: 320, wordBreak: 'break-all' }}>{r.referrer || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
