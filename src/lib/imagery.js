import { useEffect, useState } from 'react';
import { supabase } from './supabase.js';

/**
 * In-memory cache of slot → image row. Populated once per session via fetch.
 * Avoids one network round-trip per AIImagePlate instance.
 */
let cache = null;
let inflight = null;

async function loadActiveImages() {
  if (cache) return cache;
  if (inflight) return inflight;
  inflight = supabase
    .from('images')
    .select('slot, public_url, alt')
    .eq('active', true)
    .then(({ data, error }) => {
      inflight = null;
      if (error) {
        console.error('[imagery] cache fetch failed', error);
        return {};
      }
      const map = {};
      (data || []).forEach((row) => { map[row.slot] = row; });
      cache = map;
      return cache;
    });
  return inflight;
}

/**
 * Hook: given a slot id, resolve to an image record (from Supabase) or null.
 * Components decide what to render when null (static fallback or placeholder).
 */
export function useImageForSlot(slot) {
  const [record, setRecord] = useState(() => (cache ? cache[slot] || null : null));
  useEffect(() => {
    if (!slot) return;
    let cancelled = false;
    loadActiveImages().then((map) => {
      if (!cancelled) setRecord(map[slot] || null);
    });
    return () => { cancelled = true; };
  }, [slot]);
  return record;
}

/**
 * Reset the in-memory cache. Useful after an admin upload — call this
 * from the admin imagery page so the rest of the SPA re-fetches.
 */
export function invalidateImageryCache() {
  cache = null;
}
