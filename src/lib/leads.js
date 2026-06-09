import { sendLeadToGhl } from './ghl-webhook.js';
import { supabase } from './supabase.js';

/**
 * Dual-write a revenue-estimator submission to GHL and Supabase.
 * Both writes run in parallel via Promise.allSettled — one failure does not
 * block the other. The function resolves once both attempts have settled.
 *
 * Conversion guardrail: GHL is the existing money path. We never let a
 * Supabase outage break GHL lead capture.
 */
export async function captureLead({ answers, estimate, contact, attribution = {} }) {
  const ghlPromise = sendLeadToGhl({ answers, estimate, contact });

  const supabaseRow = {
    // estimator answers
    city: answers.city || null,
    ticket: answers.ticket || null,
    leads_per_month: answers.leads || null,
    budget: answers.budget || null,
    service: answers.service || null,

    // computed estimate snapshot
    revenue_low: estimate.revenueLow,
    revenue_high: estimate.revenueHigh,
    leads_low: estimate.leadsLow,
    leads_high: estimate.leadsHigh,
    plan: estimate.plan,
    budget_low: estimate.budgetLow,
    budget_high: estimate.budgetHigh,
    service_label: estimate.serviceLabel,
    ticket_label: estimate.ticketLabel,

    // contact
    contact_first_name: contact.firstName,
    contact_last_name: contact.lastName,
    contact_email: contact.email,
    contact_phone: contact.phone,
    contact_company: contact.companyName || null,

    // attribution
    utm_source: attribution.utm_source || null,
    utm_content: attribution.utm_content || null,
    referrer: attribution.referrer || null,
  };

  const supabasePromise = supabase
    .from('leads')
    .insert(supabaseRow)
    .select('id')
    .single()
    .then(
      ({ data, error }) => {
        if (error) throw error;
        return { ok: true, id: data?.id };
      },
      (err) => {
        // eslint-disable-next-line no-console
        console.error('[supabase/leads] insert failed', err);
        return { ok: false, error: err?.message || String(err) };
      }
    );

  const [ghlResult, supabaseResult] = await Promise.allSettled([
    ghlPromise,
    supabasePromise,
  ]);

  const ghl = ghlResult.status === 'fulfilled' ? ghlResult.value : { ok: false };
  const sb = supabaseResult.status === 'fulfilled' ? supabaseResult.value : { ok: false };

  // Best-effort: if both Supabase + GHL succeeded, flip ghl_synced on the row.
  if (sb.ok && sb.id && ghl.ok) {
    supabase
      .from('leads')
      .update({ ghl_synced: true })
      .eq('id', sb.id)
      .then(({ error }) => {
        if (error) console.error('[supabase/leads] flag ghl_synced failed', error);
      });
  }

  return { ghl, supabase: sb };
}

/**
 * Insert a single audit_picks row (free-audit platform selection).
 * Anon insert is permitted by RLS. Fire-and-forget.
 */
export async function captureAuditPick({ platform, attribution = {} }) {
  if (!['google', 'meta', 'both'].includes(platform)) return;
  const { error } = await supabase.from('audit_picks').insert({
    platform,
    utm_source: attribution.utm_source || null,
    utm_content: attribution.utm_content || null,
    referrer: attribution.referrer || null,
    session_id: attribution.session_id || null,
  });
  if (error) console.error('[supabase/audit_picks] insert failed', error);
}
