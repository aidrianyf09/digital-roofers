/**
 * Florida cities served by Digital Roofers by SBU.
 * Each city gets a per-city landing page at /<slug>.
 *
 * Coordinates are positioned on a 0-400 x 0-300 SVG viewBox of Florida.
 * Positioning paragraphs are generic per-market positioning (no fake numbers
 * — per V3.0 brand-author signoff).
 */
export const CITIES = [
  {
    slug: 'tampa',
    name: 'Tampa',
    region: 'Tampa Bay',
    hq: true,
    coords: { x: 207, y: 165 },
    positioning:
      'We\'re based here. We know the Tampa Bay roofing market because we run campaigns in it every day. Big-box operators dominate paid search; mid-size local roofers are leaving territory on the table. The win is owning the emergency-repair intent that the volume players underbid.',
    audience:
      'Tampa, St. Petersburg, Clearwater, Brandon, and the rest of Tampa Bay.',
  },
  {
    slug: 'orlando',
    name: 'Orlando',
    region: 'Central Florida',
    coords: { x: 258, y: 142 },
    positioning:
      'Central Florida is one of the most competitive roofing markets in the state. Storm-season volume is real, but so is the bidding pressure on emergency-repair keywords. The roofers winning here have wired up call tracking and lead-response under 2 minutes. The rest are losing the lead in the first call.',
    audience:
      'Orlando, Kissimmee, Lake Mary, Sanford, and Central Florida.',
  },
  {
    slug: 'miami',
    name: 'Miami',
    region: 'Miami-Dade',
    coords: { x: 295, y: 245 },
    positioning:
      'Miami-Dade has the highest cost-per-lead in Florida, driven by commercial demand and dense paid-search competition. Most wins come from local SEO and review velocity, not paid ads. The roofers who treat reviews as a marketing channel beat the ones who treat them as customer service.',
    audience:
      'Miami, Coral Gables, Kendall, Doral, and Miami-Dade.',
  },
  {
    slug: 'jacksonville',
    name: 'Jacksonville',
    region: 'Northeast Florida',
    coords: { x: 280, y: 87 },
    positioning:
      'Northeast Florida runs different from the rest of the state. Less storm chasing, more residential re-roof volume. Roofers who own the "best roofers in Jacksonville" search rank win. The ones who rely on Google Ads alone get squeezed on every quarter\'s budget review.',
    audience:
      'Jacksonville, St. Augustine, Orange Park, and Northeast Florida.',
  },
  {
    slug: 'fort-lauderdale',
    name: 'Fort Lauderdale',
    region: 'Broward County',
    coords: { x: 299, y: 220 },
    labelSide: 'left', // pull label left to avoid collision with Miami label below
    positioning:
      'Broward County is dominated by a handful of large operators who treat marketing as table stakes. Mid-size roofers can\'t outspend them. They have to compete on speed and proof: faster lead response, more recent reviews, sharper landing pages. That\'s where the audit usually starts.',
    audience:
      'Fort Lauderdale, Pompano Beach, Hollywood, and Broward County.',
  },
  {
    slug: 'naples',
    name: 'Naples',
    region: 'Southwest Florida',
    coords: { x: 240, y: 228 },
    positioning:
      'Southwest Florida\'s high-ticket roofing market is built on referrals and reputation. Paid acquisition only works when paired with strong review systems and a fast lead-response setup. The roofers who land Naples and Marco Island jobs are the ones whose first call answers on ring two.',
    audience:
      'Naples, Bonita Springs, Marco Island, Cape Coral, and Southwest Florida.',
  },
];

export const getCityBySlug = (slug) => CITIES.find((c) => c.slug === slug);
