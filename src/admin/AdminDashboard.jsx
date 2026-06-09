import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IconUsersGroup, IconPhoto, IconClipboardCheck, IconQuote,
  IconArrowUpRight, IconLoader2,
} from '@tabler/icons-react';
import { supabase } from '../lib/supabase.js';

function StatCard({ Icon, label, value, to, loading }) {
  return (
    <Link to={to} className="dr-admin-stat">
      <div className="dr-admin-stat__head">
        <span className="dr-admin-stat__icon"><Icon size={18} stroke={1.75} /></span>
        <span className="dr-admin-stat__label">{label}</span>
        <IconArrowUpRight size={14} stroke={1.75} className="dr-admin-stat__go" />
      </div>
      <div className="dr-admin-stat__value">
        {loading ? <IconLoader2 size={20} className="dr-admin-spin" /> : value}
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    leads: null,
    images: null,
    picks: null,
    testimonials: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchCount = async (table) => {
      const { count, error } = await supabase
        .from(table)
        .select('id', { count: 'exact', head: true });
      if (error) {
        console.error(`[admin] count ${table} failed`, error);
        return 0;
      }
      return count ?? 0;
    };
    (async () => {
      const [leads, images, picks, testimonials] = await Promise.all([
        fetchCount('leads'),
        fetchCount('images'),
        fetchCount('audit_picks'),
        fetchCount('testimonials'),
      ]);
      if (cancelled) return;
      setCounts({ leads, images, picks, testimonials });
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="dr-admin-page">
      <header className="dr-admin-page__head">
        <h1 className="dr-admin-page__h1">Overview</h1>
        <p className="dr-admin-page__sub">
          Real-time totals from your Supabase project. Click any tile to drill in.
        </p>
      </header>

      <div className="dr-admin-grid">
        <StatCard
          Icon={IconUsersGroup}
          label="Leads"
          to="/admin/leads"
          value={counts.leads}
          loading={loading}
        />
        <StatCard
          Icon={IconClipboardCheck}
          label="Audit picks"
          to="/admin/picks"
          value={counts.picks}
          loading={loading}
        />
        <StatCard
          Icon={IconPhoto}
          label="Images"
          to="/admin/imagery"
          value={counts.images}
          loading={loading}
        />
        <StatCard
          Icon={IconQuote}
          label="Testimonials"
          to="/admin/testimonials"
          value={counts.testimonials}
          loading={loading}
        />
      </div>
    </div>
  );
}
