// Vercel serverless function: POST /api/insight
// Generates a single short personalized market-insight sentence for the
// Revenue Estimator result screen. Calls Anthropic's Claude Haiku 4.5.

const MODEL = 'claude-haiku-4-5-20251001';
const ENDPOINT = 'https://api.anthropic.com/v1/messages';

const SYSTEM_PROMPT = `You are a senior digital strategist at Digital Roofers by SBU, a paid ads agency focused exclusively on Florida roofing companies.

Write ONE punchy market insight, 2 sentences max, under 45 words total.
Style: Direct, specific, no hedging. Reference the city by name. Mention ONE concrete tactical move (e.g., emergency-keyword bidding, storm-season retargeting, call tracking, local service ads). No greetings. No "I". Start with a strong observation, end with the move.

Return only the insight text. No quotes, no preamble.`;

function fmtMoney(n) {
  if (n >= 1000) return '$' + Math.round(n / 1000) + 'K';
  return '$' + n;
}

function buildUserMessage(answers, estimate) {
  return `City: ${answers.city || 'Florida'}
Primary service: ${estimate.serviceLabel}
Average ticket: ${estimate.ticketLabel}
Current monthly leads: ${answers.leads}
Monthly ad budget bracket: ${answers.budget}
Estimated monthly revenue from ads: ${fmtMoney(estimate.revenueLow)}–${fmtMoney(estimate.revenueHigh)}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'missing ANTHROPIC_API_KEY' });
    return;
  }

  const { answers, estimate } = req.body || {};
  if (!answers || !estimate) {
    res.status(400).json({ error: 'missing answers or estimate' });
    return;
  }

  try {
    const upstream = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 160,
        system: [
          {
            type: 'text',
            text: SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: [{ role: 'user', content: buildUserMessage(answers, estimate) }],
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '');
      res.status(502).json({ error: 'upstream', status: upstream.status, detail });
      return;
    }

    const data = await upstream.json();
    const block = Array.isArray(data.content) ? data.content.find((b) => b.type === 'text') : null;
    const insight = (block && block.text && block.text.trim()) || '';
    if (!insight) {
      res.status(502).json({ error: 'empty insight' });
      return;
    }
    res.status(200).json({ insight });
  } catch (err) {
    res.status(500).json({ error: 'fetch failed', detail: String(err && err.message) });
  }
}
