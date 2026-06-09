import { useEffect, useMemo, useState } from 'react';
import { IconDownload, IconRefresh, IconLoader2 } from '@tabler/icons-react';
import { supabase } from '../lib/supabase.js';

function fmtMoney(n) {
  if (n == null) return '—';
  if (n >= 1000) return '$' + (n / 1000).toFixed(0) + 'k';
  return '$' + n;
}
function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function toCsv(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const escape = (v) => {
    if (v == null) return '';
    const s = String(v);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };
  return [
    headers.join(','),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(',')),
  ].join('\n');
}

export default function AdminLeads() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);
    if (error) console.error('[admin/leads] fetch failed', error);
    setRows(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const filtered = useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) =>
      [r.contact_email, r.contact_first_name, r.contact_last_name, r.contact_company, r.city, r.contact_phone]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [rows, query]);

  const downloadCsv = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const ts = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `digital-roofers-leads-${ts}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dr-admin-page">
      <header className="dr-admin-page__head">
        <h1 className="dr-admin-page__h1">Leads</h1>
        <p className="dr-admin-page__sub">
          Every revenue-estimator submission. {filtered.length} shown of {rows.length} total.
        </p>
      </header>

      <div className="dr-admin-toolbar">
        <input
          className="dr-admin-toolbar__search"
          type="search"
          placeholder="Search by email, name, company, city, phone…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="button" className="dr-admin-toolbar__btn" onClick={fetchLeads} disabled={loading}>
          {loading ? <IconLoader2 size={14} className="dr-admin-spin" /> : <IconRefresh size={14} stroke={2} />}
          Refresh
        </button>
        <button type="button" className="dr-admin-toolbar__btn" onClick={downloadCsv} disabled={!filtered.length}>
          <IconDownload size={14} stroke={2} /> Export CSV
        </button>
      </div>

      <div className="dr-admin-table-wrap">
        {loading ? (
          <div className="dr-admin-empty">
            <IconLoader2 size={20} className="dr-admin-spin" />
          </div>
        ) : !filtered.length ? (
          <div className="dr-admin-empty">No leads yet. They&apos;ll appear here as soon as someone submits the estimator.</div>
        ) : (
          <table className="dr-admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Contact</th>
                <th>City</th>
                <th>Plan</th>
                <th>Revenue est.</th>
                <th>Ad budget</th>
                <th>Source</th>
                <th>GHL</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>{fmtDate(r.created_at)}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{[r.contact_first_name, r.contact_last_name].filter(Boolean).join(' ') || '—'}</div>
                    {r.contact_company && <div style={{ color: 'var(--ink-muted)', fontSize: 12 }}>{r.contact_company}</div>}
                  </td>
                  <td className="dr-admin-table__email">
                    {r.contact_email && <div><a href={`mailto:${r.contact_email}`}>{r.contact_email}</a></div>}
                    {r.contact_phone && <div style={{ color: 'var(--ink-muted)', fontSize: 12 }}>{r.contact_phone}</div>}
                  </td>
                  <td>{r.city || '—'}</td>
                  <td>{r.plan || '—'}</td>
                  <td>{fmtMoney(r.revenue_low)} to {fmtMoney(r.revenue_high)}</td>
                  <td>{fmtMoney(r.budget_low)} to {fmtMoney(r.budget_high)}</td>
                  <td>
                    {r.utm_source ? `${r.utm_source}${r.utm_content ? ` / ${r.utm_content}` : ''}` : '—'}
                  </td>
                  <td>
                    <span className={`dr-admin-table__pill ${r.ghl_synced ? 'is-synced' : 'is-pending'}`}>
                      {r.ghl_synced ? 'Synced' : 'Pending'}
                    </span>
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
