import { useEffect, useState } from 'react';
import { IconLoader2, IconPlus, IconTrash, IconDeviceFloppy, IconEyeOff, IconEye } from '@tabler/icons-react';
import { supabase } from '../lib/supabase.js';

export default function AdminTestimonials() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);

  const fetchRows = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    if (error) console.error('[admin/testimonials] fetch failed', error);
    setRows(data || []);
    setLoading(false);
  };
  useEffect(() => { fetchRows(); }, []);

  const upsert = async (row) => {
    setSaving(row.id || 'new');
    const payload = {
      quote: row.quote,
      name: row.name,
      location: row.location || null,
      label: row.label || null,
      active: row.active ?? true,
      sort_order: row.sort_order ?? 0,
    };
    const { error } = row.id
      ? await supabase.from('testimonials').update(payload).eq('id', row.id)
      : await supabase.from('testimonials').insert(payload);
    setSaving(null);
    if (error) {
      alert('Save failed: ' + error.message);
      return;
    }
    fetchRows();
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) alert('Delete failed: ' + error.message);
    fetchRows();
  };

  const newRow = () => ({
    id: null,
    quote: '',
    name: '',
    location: '',
    label: '',
    active: true,
    sort_order: rows.length,
  });

  const [draft, setDraft] = useState(newRow());

  return (
    <div className="dr-admin-page">
      <header className="dr-admin-page__head">
        <h1 className="dr-admin-page__h1">Testimonials</h1>
        <p className="dr-admin-page__sub">
          Replace the placeholder quotes on the Free Audit page. Toggle active to control which ones appear.
        </p>
      </header>

      {loading ? (
        <div className="dr-admin-empty"><IconLoader2 size={20} className="dr-admin-spin" /></div>
      ) : (
        <div className="dr-admin-testimonials">
          {rows.map((r) => (
            <TestimonialRow
              key={r.id}
              row={r}
              saving={saving === r.id}
              onSave={upsert}
              onRemove={() => remove(r.id)}
            />
          ))}
          <TestimonialRow
            row={draft}
            saving={saving === 'new'}
            onSave={async (row) => { await upsert(row); setDraft(newRow()); }}
            onChange={setDraft}
            isNew
          />
        </div>
      )}
    </div>
  );
}

function TestimonialRow({ row, saving, onSave, onRemove, onChange, isNew = false }) {
  const [local, setLocal] = useState(row);
  useEffect(() => { setLocal(row); }, [row]);
  const set = (k, v) => {
    const next = { ...local, [k]: v };
    setLocal(next);
    if (isNew && onChange) onChange(next);
  };

  const valid = local.quote?.trim() && local.name?.trim();

  return (
    <div className="dr-admin-testimonial">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div className="dr-admin-field">
          <label className="dr-admin-field__label">Quote</label>
          <textarea
            className="dr-admin-textarea"
            rows={3}
            value={local.quote || ''}
            onChange={(e) => set('quote', e.target.value)}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
          <div className="dr-admin-field">
            <label className="dr-admin-field__label">Name</label>
            <input
              className="dr-admin-input"
              value={local.name || ''}
              onChange={(e) => set('name', e.target.value)}
            />
          </div>
          <div className="dr-admin-field">
            <label className="dr-admin-field__label">Location</label>
            <input
              className="dr-admin-input"
              value={local.location || ''}
              onChange={(e) => set('location', e.target.value)}
            />
          </div>
          <div className="dr-admin-field">
            <label className="dr-admin-field__label">Label</label>
            <input
              className="dr-admin-input"
              value={local.label || ''}
              onChange={(e) => set('label', e.target.value)}
            />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'stretch', minWidth: 130 }}>
        <button
          type="button"
          className="dr-admin-slot__btn"
          onClick={() => onSave(local)}
          disabled={!valid || saving}
        >
          {saving ? <IconLoader2 size={14} className="dr-admin-spin" /> : isNew ? <IconPlus size={14} stroke={2} /> : <IconDeviceFloppy size={14} stroke={2} />}
          {isNew ? 'Add' : 'Save'}
        </button>
        {!isNew && (
          <>
            <button
              type="button"
              className="dr-admin-slot__btn"
              onClick={() => onSave({ ...local, active: !local.active })}
            >
              {local.active ? <IconEyeOff size={14} stroke={2} /> : <IconEye size={14} stroke={2} />}
              {local.active ? 'Hide' : 'Show'}
            </button>
            <button
              type="button"
              className="dr-admin-slot__btn is-danger"
              onClick={onRemove}
            >
              <IconTrash size={14} stroke={2} /> Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
