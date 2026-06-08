const TIMEOUT_MS = 8000;

export async function sendLeadToGhl({ answers, estimate, contact }) {
  const url = import.meta.env.VITE_GHL_WEBHOOK_URL;

  if (!url) {
    console.warn('[ghl-webhook] VITE_GHL_WEBHOOK_URL is not set — skipping POST');
    return { ok: false, skipped: true };
  }

  const payload = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    companyName: contact.companyName || '',
    serviceArea: answers.city,
    adSpend: String(estimate.budgetLow),
    platform: 'Google Ads',
    estimatedRevenue: String(estimate.revenueHigh),
    source: 'Digital Roofers Revenue Calculator',
    tags: ['Calculator Lead', 'FL'],
    pipelineStage: 'Cold Lead',
    serviceLabel: estimate.serviceLabel,
    ticketLabel: estimate.ticketLabel,
    plan: estimate.plan,
    leadsLow: estimate.leadsLow,
    leadsHigh: estimate.leadsHigh,
    revenueLow: estimate.revenueLow,
    revenueHigh: estimate.revenueHigh,
    budgetLow: estimate.budgetLow,
    budgetHigh: estimate.budgetHigh,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    console.error('[ghl-webhook] POST failed', err);
    return { ok: false, status: 0, error: err && err.message };
  } finally {
    clearTimeout(timeout);
  }
}
