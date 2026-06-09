import { useEffect, useRef, useState } from 'react';
import { IconLoader2, IconUpload, IconTrash, IconPhoto } from '@tabler/icons-react';
import { supabase } from '../lib/supabase.js';
import { useAdminAuth } from './AdminAuth.jsx';

// The canonical list of image slots used by the site. Keep in sync with
// the AIImagePlate callsites in src/sections/home/Services.jsx,
// src/sections/home/DetailBlocks.jsx, src/FreeAudit/AuditHero.jsx.
const SLOTS = [
  {
    slot: 'services/google-ads',
    name: 'Services — Google Ads card',
    where: 'Home page, "What we build" section, the wide left card.',
    ratio: '16:9',
  },
  {
    slot: 'proof/before-after',
    name: 'Detail Block 05 — Before / After',
    where: 'Home page, end of "The Audit" section.',
    ratio: '16:9',
  },
  {
    slot: 'audit-hero/owner-laptop',
    name: 'Audit hero — Owner reviewing dashboard',
    where: '/free-audit page hero right column.',
    ratio: '5:6 (portrait)',
  },
];

export default function AdminImagery() {
  const { session } = useAdminAuth();
  const [active, setActive] = useState({});  // slot → image row
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(null); // slot currently uploading
  const [toast, setToast] = useState(null);
  const inputRefs = useRef({});

  const loadActive = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('active', true);
    if (error) console.error('[admin/imagery] load failed', error);
    const map = {};
    (data || []).forEach((row) => { map[row.slot] = row; });
    setActive(map);
    setLoading(false);
  };

  useEffect(() => { loadActive(); }, []);

  const flash = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 3200);
  };

  const handleUpload = async (slot, file) => {
    if (!file) return;
    setUploading(slot);
    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'webp';
      const path = `${slot}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('imagery')
        .upload(path, file, { upsert: false, contentType: file.type });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from('imagery').getPublicUrl(path);
      const publicUrl = pub?.publicUrl;
      if (!publicUrl) throw new Error('Could not resolve public URL.');

      // Deactivate any current active image for this slot (RLS-safe — we own it).
      await supabase.from('images').update({ active: false }).eq('slot', slot).eq('active', true);

      // Insert the new row as active.
      const { error: insErr } = await supabase.from('images').insert({
        slot,
        storage_path: path,
        public_url: publicUrl,
        active: true,
        uploaded_by: session?.user?.id ?? null,
      });
      if (insErr) throw insErr;

      await loadActive();
      flash('Uploaded. The site will pick it up on next reload.');
    } catch (err) {
      console.error('[admin/imagery] upload failed', err);
      flash(err.message || 'Upload failed.', true);
    } finally {
      setUploading(null);
    }
  };

  const handleRemove = async (slot) => {
    const row = active[slot];
    if (!row) return;
    if (!window.confirm(`Remove the current image for "${slot}"? The site will fall back to its placeholder.`)) return;
    try {
      const { error: delImgErr } = await supabase.from('images').update({ active: false }).eq('id', row.id);
      if (delImgErr) throw delImgErr;
      await supabase.storage.from('imagery').remove([row.storage_path]).catch(() => {});
      await loadActive();
      flash('Removed.');
    } catch (err) {
      console.error('[admin/imagery] remove failed', err);
      flash(err.message || 'Could not remove image.', true);
    }
  };

  return (
    <div className="dr-admin-page">
      <header className="dr-admin-page__head">
        <h1 className="dr-admin-page__h1">Imagery</h1>
        <p className="dr-admin-page__sub">
          Upload an image to fill a slot. The site picks it up automatically.
          {' '}WebP preferred (smaller). Keep under 500 kB.
        </p>
      </header>

      {loading ? (
        <div className="dr-admin-empty"><IconLoader2 size={20} className="dr-admin-spin" /></div>
      ) : (
        <div className="dr-admin-imagery-grid">
          {SLOTS.map((s) => {
            const current = active[s.slot];
            const inputId = `upload-${s.slot}`;
            return (
              <div key={s.slot} className="dr-admin-slot">
                <div className="dr-admin-slot__preview">
                  {current ? (
                    <img src={current.public_url} alt={current.alt || ''} />
                  ) : (
                    <IconPhoto size={28} stroke={1.5} />
                  )}
                </div>
                <div className="dr-admin-slot__body">
                  <div className="dr-admin-slot__name">{s.name}</div>
                  <div className="dr-admin-slot__where">{s.where} Aspect {s.ratio}.</div>
                  <div className="dr-admin-slot__path">{s.slot}</div>
                  <div className="dr-admin-slot__actions">
                    <button
                      type="button"
                      className="dr-admin-slot__btn"
                      onClick={() => inputRefs.current[s.slot]?.click()}
                      disabled={uploading === s.slot}
                    >
                      {uploading === s.slot ? <IconLoader2 size={14} className="dr-admin-spin" /> : <IconUpload size={14} stroke={2} />}
                      {current ? 'Replace' : 'Upload'}
                    </button>
                    {current && (
                      <button
                        type="button"
                        className="dr-admin-slot__btn is-danger"
                        onClick={() => handleRemove(s.slot)}
                      >
                        <IconTrash size={14} stroke={2} /> Remove
                      </button>
                    )}
                    <input
                      id={inputId}
                      ref={(el) => { inputRefs.current[s.slot] = el; }}
                      type="file"
                      accept="image/webp,image/jpeg,image/png"
                      className="dr-admin-slot__file-input"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        e.target.value = ''; // allow re-selecting same file
                        if (f) handleUpload(s.slot, f);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {toast && (
        <div className={`dr-admin-toast ${toast.isError ? 'is-error' : ''}`}>{toast.msg}</div>
      )}
    </div>
  );
}
