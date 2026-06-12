/**
 * Single source of truth for the 10 service offerings.
 * Powers /services hub, /services/:slug detail pages, and home Services grid.
 *
 * Pricing rule: NO numbers from the internal pricing PDF appear on the public
 * site. Pricing signal is directional only.
 */

export const SERVICES = [
  // -------------------------------------------------------------------------
  {
    slug: 'google-ads',
    num: '01',
    tag: 'Paid Search',
    name: 'Google Ads',
    accent: 'var(--brand-sapphire)',
    iconKey: 'search',
    artifactKey: 'serp',
    hero: {
      headline: 'When a homeowner Googles "roof leak" at 6am, your phone should ring by 6:02.',
      sub: 'Google Ads campaigns engineered for booked inspections, not clicks. For roofers ready to close.',
    },
    wedge:
      "Most roofers either don't run Google Ads, or pay an agency that bills on ad spend and prays for clicks. Both are slow ways to bleed money. The job isn't traffic. The job is a booked inspection your sales team can close.",
    steps: [
      {
        n: '01',
        title: 'Intent mapping',
        body: "We pull the keywords homeowners actually type when they're ready to buy. Replacement, leak, storm damage, insurance. Tire-kicker terms get ignored.",
      },
      {
        n: '02',
        title: 'Landers built for one job',
        body: 'Every campaign hits a page designed to capture a phone call or an inspection request. Not a "learn more."',
      },
      {
        n: '03',
        title: "Call + form tracking that doesn't lie",
        body: "Every lead tied back to the keyword, the ad, the time of day. You see what's actually paying for itself.",
      },
      {
        n: '04',
        title: 'Weekly tuning cycles',
        body: "Each week we look at what closed, what didn't, and shift spend toward the wins. No autopilot. No quarterly check-ins.",
      },
    ],
    adSpendTrust: true,
    objections: [
      {
        q: 'I tried Google Ads. My CPL was painful.',
        a: 'Almost always the lander, not the ads. We rebuild the page first, then the campaign. Most engagements see CPL drop materially within the first two months.',
      },
      {
        q: 'Agencies are scammy with reporting.',
        a: 'You see two numbers each month: what Google charged you and what we charged you. A plain-English report on the leads each dollar bought, plus a direct text line to your strategist. Not a ticket queue.',
      },
      {
        q: "My closer can't handle more leads right now.",
        a: "Then we don't start with Google Ads. We start with closing-rate work. We'll tell you that on the call instead of selling you ads you can't absorb.",
      },
    ],
    included: [
      'Campaign build (search + Local Services Ads where eligible)',
      'Conversion-tuned landing pages',
      'Call + form tracking, routed to your CRM',
      'Weekly optimization cycles',
      'Monthly report in plain English. Cost per booked inspection, not impressions',
      'Direct text/Slack line to your strategist',
    ],
    stack: {
      services: ['web-design', 'ai-automation'],
      outcome: 'Capture intent. Convert the click. Answer the lead in seconds.',
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'meta-ads',
    num: '02',
    tag: 'Paid Social',
    name: 'Meta Ads',
    accent: 'var(--brand-coral)',
    iconKey: 'meta',
    artifactKey: 'feed',
    hero: {
      headline: 'After the storm, your offer should already be in their feed.',
      sub: 'Meta campaigns built for storm-season demand, retargeting, and creative that turns scrollers into booked inspections.',
    },
    wedge:
      "Google catches homeowners who already know they have a problem. Meta gets in front of the other 80%. The ones who didn't realize last night's wind took shingles off. That's where the next wave of jobs hides.",
    steps: [
      { n: '01', title: 'Audience layering', body: 'Service-area targeting overlaid with homeowner signals. Age, neighborhood, recent move, home value bands.' },
      { n: '02', title: 'Creative built for the trade', body: 'Job-site clips, before/afters, owner-on-camera UGC. Not stock photos. Not "we care about quality."' },
      { n: '03', title: 'Retargeting that finishes the sale', body: "Homeowners who watched, scrolled, or clicked get a different message until they book, or clearly don't want to." },
      { n: '04', title: 'Storm-season triggers', body: "When weather hits your service area, campaigns shift inside 24 hours. Demand doesn't wait." },
    ],
    adSpendTrust: true,
    objections: [
      { q: 'Facebook ads feel like a waste for roofing.', a: 'They are, when the creative is generic and the targeting is broad. Tight service area plus real job-site creative changes the math completely.' },
      { q: "I don't want to be on camera.", a: "You don't have to be. UGC-style content from your crew, before/after walkthroughs, and AI-assisted creative do the heavy lifting." },
      { q: 'How is this different from Google Ads?', a: 'Meta builds demand and stays in front of homeowners across the consideration window. Google captures it at the moment of intent. Best results come from running both.' },
    ],
    included: [
      'Audience + creative strategy',
      'Ad creative production (static + UGC-style video)',
      'Retargeting funnels',
      'Storm-trigger campaign shifts',
      'Weekly optimization + plain-English reporting',
      'Direct text/Slack line to your strategist',
    ],
    stack: {
      services: ['social-media-management', 'web-design'],
      outcome: 'Build awareness in the feed. Close in the inspection.',
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'social-media-management',
    num: '03',
    tag: 'Organic Social',
    name: 'Social Media Management',
    accent: 'var(--brand-teal)',
    iconKey: 'users',
    artifactKey: 'feed-grid',
    hero: {
      headline: 'When a neighbor asks "who did your roof?", your feed answers for you.',
      sub: 'A weekly rhythm of job-site content, reviews, and authority that makes you the obvious answer in your service area.',
    },
    wedge:
      "Most roofing social pages are dead. Three posts from 2023 and a profile photo of a generic shingle. Homeowners look. When the page looks asleep, the company does too. Trust gets built in the feed, well before the call.",
    steps: [
      { n: '01', title: 'Content rhythm built around real jobs', body: 'Job-site walkthroughs, before/afters, owner moments, reviews. All turned into a consistent weekly cadence.' },
      { n: '02', title: 'AI-assisted creative pipeline', body: "AI handles the heavy lifting on cuts, captions, and variants. Your team isn't making content, just supplying the raw footage." },
      { n: '03', title: 'Review amplification', body: 'Real reviews get turned into shareable assets, not buried on a Google profile.' },
      { n: '04', title: 'Inbox + DM management', body: 'Inbound questions get answered fast and routed into your CRM. Conversations become leads.' },
    ],
    objections: [
      { q: "My customers aren't on Instagram.", a: "They're on Facebook, and their kids check the company's socials before approving the call. Both matter." },
      { q: 'I post when I have time.', a: 'Inconsistent posting hurts more than no posting. Homeowners notice the gaps. A defined cadence solves it.' },
      { q: "I don't want my crew making TikToks.", a: 'Neither do we. The pipeline runs on raw clips, not performances. Your team supplies footage; we turn it into content.' },
    ],
    included: [
      'Weekly content rhythm (static + short-form video)',
      'AI-assisted creative pipeline',
      'Caption + hashtag strategy',
      'Review amplification',
      'Inbox + DM management routed to your CRM',
      'Monthly performance report',
    ],
    stack: {
      services: ['meta-ads', 'branding'],
      outcome: 'Organic builds trust. Paid scales the reach. Brand makes it stick.',
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'web-design',
    num: '04',
    tag: 'Design',
    name: 'Web Design',
    accent: 'var(--brand-gold)',
    iconKey: 'laptop',
    artifactKey: 'wireframe',
    hero: {
      headline: 'A roofing site that looks like the trade and converts like a machine.',
      sub: 'Mobile-first design that makes homeowners reach for the phone in the driveway.',
    },
    wedge:
      "Most roofing sites are catalogs of services nobody reads. The job of a roofing site is simple. Tell a homeowner you're real, you're local, you're good, and make it easy to call you. Everything else is decoration.",
    steps: [
      { n: '01', title: 'Mobile-first wireframes', body: 'Built for the phone in the driveway, not the desktop in the office. Desktop comes second.' },
      { n: '02', title: 'Trust + proof up top', body: 'License, insurance, real photos, real reviews. All visible above the fold. Not buried on an About page.' },
      { n: '03', title: 'One job per page', body: 'Each page exists to make one specific homeowner take one specific action. No menus to "explore."' },
      { n: '04', title: 'Speed + tracking baked in', body: 'Fast load, clean analytics, and every form/call routed to your CRM with full attribution.' },
    ],
    objections: [
      { q: 'I already have a site.', a: "We can audit it first. If it converts, we leave it alone. If it doesn't, you'll know exactly why." },
      { q: 'How long does it take?', a: "Most builds ship inside a few weeks. We don't do six-month redesigns." },
      { q: 'Do I own the site?', a: 'Yes. Code, content, and domain all transfer to you. No hostage situation.' },
    ],
    included: [
      'Strategy + sitemap',
      'Mobile-first wireframes + design',
      'Build on a fast, owned stack',
      'Conversion-tuned landing pages',
      'CRM + tracking integration',
      'Launch support + handoff',
    ],
    stack: {
      services: ['google-ads', 'seo'],
      outcome: 'A site that earns the click from paid and ranks for organic.',
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'web-development',
    num: '05',
    tag: 'Build',
    name: 'Web Development',
    accent: 'var(--brand-sapphire)',
    iconKey: 'code',
    artifactKey: 'pipeline',
    hero: {
      headline: 'Custom builds, CRM integrations, and the tracking that actually works.',
      sub: "When your business runs on a stack that doesn't leak leads, you stop guessing what's working. You see it.",
    },
    wedge:
      "Most roofing tech stacks are duct tape. A website here, a form there, a CRM that doesn't talk to the call tracker. Leads fall through the cracks every week. We build the connective tissue so nothing gets dropped.",
    steps: [
      { n: '01', title: 'Audit the current stack', body: 'Where do leads come in? Where do they get stuck? Where are you flying blind? We map it before we touch it.' },
      { n: '02', title: 'Build the integrations', body: 'Forms, CRM, call tracking, reporting. Everything talks to everything. Owner sees one dashboard, not seven.' },
      { n: '03', title: 'Add the routing logic', body: 'Right lead to right rep, right zone to right crew, right follow-up at the right time. All automated.' },
      { n: '04', title: 'Verify with real data', body: "We don't hand off until we've watched a real lead flow through end-to-end and counted it." },
    ],
    objections: [
      { q: 'My CRM kind of works.', a: '"Kind of" is where leads die. We don\'t replace what works. We fix what doesn\'t.' },
      { q: 'Will this break my current site?', a: "No. We stage everything, test it, and only flip when it's ready. Zero downtime." },
      { q: 'Do I need to be technical to manage it?', a: 'No. The dashboard is built for owners, not engineers.' },
    ],
    included: [
      'Stack audit + integration plan',
      'Form, CRM, and call-tracking integration',
      'Lead routing + automation logic',
      'Reporting dashboard',
      'Ongoing technical support',
      'Documentation + handoff',
    ],
    stack: {
      services: ['ai-automation', 'analytics'],
      outcome: 'Solid infrastructure. AI on top. Numbers you can trust.',
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'ai-automation',
    num: '06',
    tag: 'AI',
    name: 'AI & Automation',
    accent: 'var(--brand-teal)',
    iconKey: 'robot',
    artifactKey: 'conversation',
    hero: {
      headline: 'Answer every lead in 90 seconds. Even at 11pm on a Sunday.',
      sub: 'AI that picks up the phone, qualifies homeowners, and books inspections. No lead cools off waiting on a callback.',
    },
    wedge:
      'Most roofers lose half their inbound to slow response time. The homeowner calls three companies; whoever picks up first usually wins. AI handles the picking up. Your team handles the closing.',
    steps: [
      { n: '01', title: 'Instant lead capture', body: 'New lead hits the system, whether call, form, or ad click, and gets a response inside 90 seconds. Always.' },
      { n: '02', title: 'AI qualification', body: 'A few smart questions: zip, roof age, urgency, insurance situation. Bad-fit leads filtered. Good-fit leads tagged hot.' },
      { n: '03', title: 'Automatic booking', body: 'Qualified homeowners get sent straight to your calendar. Inspection on the books without a human touch.' },
      { n: '04', title: "Follow-up that doesn't quit", body: "Leads who didn't book get nurtured automatically with text, email, and voicemail drop. Until they convert or opt out." },
    ],
    objections: [
      { q: "Won't AI feel robotic to homeowners?", a: "Done badly, yes. We tune voice and copy until it sounds like a competent receptionist. The homeowner doesn't care, because their roof got handled." },
      { q: 'What if it qualifies someone wrong?', a: "Edge cases route to a human immediately. AI handles the 80% that don't need judgment." },
      { q: 'Will this replace my office staff?', a: 'No. It frees them to handle the conversations that actually need a human. And it stops leads dying in the queue.' },
    ],
    included: [
      'AI voice + text setup on your GHL stack',
      'Lead qualification logic',
      'Calendar integration + auto-booking',
      'Multi-channel follow-up sequences',
      'Live dashboard + override controls',
      'Ongoing tuning as your offer evolves',
    ],
    stack: {
      services: ['google-ads', 'meta-ads'],
      outcome: 'Paid drives the lead. AI answers it. Calendar fills itself.',
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'seo',
    num: '07',
    tag: 'Organic Search',
    name: 'SEO',
    accent: 'var(--brand-sapphire)',
    iconKey: 'trending',
    artifactKey: 'rank',
    hero: {
      headline: 'Rank for "roofer near me", plus the 200 long-tail searches that close.',
      sub: 'Local SEO built for roofing service areas, Google Business Profile, and content that earns the click without paying for it.',
    },
    wedge:
      "Paid ads stop the day you stop paying. SEO compounds. The job isn't to rank for one vanity keyword. It's to own the 200 searches a homeowner actually makes when they're picking who to call.",
    steps: [
      { n: '01', title: 'Local foundation', body: 'Google Business Profile, citations, and on-page basics. All fixed before we touch anything else.' },
      { n: '02', title: 'Service-area pages that rank', body: 'A page per city/neighborhood you serve, written for humans first and search bots second.' },
      { n: '03', title: 'Content that earns the click', body: 'Insurance-claim guides, storm-damage explainers, roofing material breakdowns. The questions homeowners actually search.' },
      { n: '04', title: 'Reviews + reputation', body: 'Systematic review collection that lifts your map ranking and converts the click into a call.' },
    ],
    objections: [
      { q: 'SEO is slow.', a: 'It is. We tell you upfront. If you need leads this month, start with Google Ads. If you want a moat in 12 months, start SEO now.' },
      { q: 'I tried SEO and saw nothing.', a: 'Usually because it was thin content + bad backlinks. Local SEO for roofing is a different game. It rewards trust signals, not tricks.' },
      { q: "How do I know it's working?", a: "You'll see rankings move, organic calls show up in your CRM, and the source of every lead labeled. No black boxes." },
    ],
    included: [
      'Local SEO foundation (GBP, citations, on-page)',
      'Service-area page strategy + build',
      'Content production (guides, articles, FAQs)',
      'Review collection system',
      'Monthly ranking + organic-leads report',
      'Direct text/Slack line to your strategist',
    ],
    stack: {
      services: ['web-design', 'google-ads'],
      outcome: 'Organic compounds. Paid fills the gap. Both data streams feed each other.',
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'email',
    num: '08',
    tag: 'Lifecycle',
    name: 'Email',
    accent: 'var(--brand-gold)',
    iconKey: 'mail',
    artifactKey: 'inbox',
    hero: {
      headline: 'The lead who said "not now" is worth more than the one who says "yes today."',
      sub: 'Email + SMS sequences that keep you in the inbox without being the company that spams. Nurture, not noise.',
    },
    wedge:
      "Most roofers email a homeowner once after the inspection, then never again. That homeowner remembered the project. They just weren't ready. Six months later, someone else got the call. Email is how you make sure that someone is you.",
    steps: [
      { n: '01', title: 'Map the touchpoints', body: 'Where in your customer lifecycle does an email actually help? Post-inspection, post-job, seasonal, referral. We pick the moments that matter.' },
      { n: '02', title: 'Write sequences worth opening', body: 'Plain-English, useful content. Storm warnings, maintenance reminders, insurance tips. Not "check out our latest blog post."' },
      { n: '03', title: 'Segment by behavior', body: "Inspection-only homeowners get different messages than past customers. Both get something they'd actually open." },
      { n: '04', title: 'Measure what came back', body: "Every email tied to revenue or it doesn't belong in the sequence. Opens are vanity; bookings are the metric." },
    ],
    objections: [
      { q: "Don't homeowners hate marketing emails?", a: 'They hate bad ones. A storm-warning the morning of a thunderstorm gets opened. Generic "spring roofing tips" gets ignored.' },
      { q: "I don't have a list.", a: "You're building one every time someone fills a form or books an inspection. Most roofers just don't use it." },
      { q: 'Can I write the emails myself?', a: "You can supply the voice and the constraints. We handle the production. Most owners don't have time to write them weekly." },
    ],
    included: [
      'Lifecycle map + sequence strategy',
      'Copywriting + design',
      'Segmentation logic',
      'SMS layer where it lifts response',
      'Deliverability monitoring',
      'Monthly performance report',
    ],
    stack: {
      services: ['ai-automation', 'web-design'],
      outcome: 'Capture the lead. Nurture them through "not now." Book when ready.',
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'branding',
    num: '09',
    tag: 'Identity',
    name: 'Branding',
    accent: 'var(--brand-coral)',
    iconKey: 'sparkles',
    artifactKey: 'typography',
    hero: {
      headline: 'Look like the roofer homeowners actually want on their roof.',
      sub: 'Brand identity, voice, and visual system that signals trust before you say a word.',
    },
    wedge:
      "Homeowners can't judge your craftsmanship before you climb up. They judge your truck, your logo, your website, your shirt. Brand is the proxy for quality. The wrong proxy costs you the close.",
    steps: [
      { n: '01', title: 'Brand consultation', body: "Who you serve, who you don't, what you stand for, what you charge for. Strategy first, design after." },
      { n: '02', title: 'Identity system', body: 'Logo, typography, color, the visual rules. Built to work on a truck wrap, an estimate, and an Instagram tile.' },
      { n: '03', title: 'Voice + messaging', body: 'How you sound on the phone, in an email, on the door hanger. Same company, every touchpoint.' },
      { n: '04', title: 'Rollout playbook', body: 'Where the brand shows up first, what gets reprinted, what waits. Practical, not aspirational.' },
    ],
    objections: [
      { q: 'My brand is fine.', a: "Maybe. We start with an audit. If it's holding you back, we'll show you where. If not, we say so." },
      { q: "Won't this cost more than it returns?", a: 'Brand work pays back in close rate and price point, not lead count. Owners who go premium close better and charge more.' },
      { q: 'How long does a rebrand take?', a: 'Strategy + identity ship inside several weeks. Rollout depends on how much physical material needs reprinting.' },
    ],
    included: [
      'Brand strategy + positioning',
      'Logo + identity system',
      'Voice + messaging guidelines',
      'Brand book / style guide',
      'Rollout plan',
      'Brand consultation included in every engagement',
    ],
    stack: {
      services: ['web-design', 'social-media-management'],
      outcome: 'Look the part. Win the click. Close the homeowner at a better price.',
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'analytics',
    num: '10',
    tag: 'Insight',
    name: 'Analytics',
    accent: 'var(--brand-teal)',
    iconKey: 'chart',
    artifactKey: 'dashboard',
    hero: {
      headline: 'Know what every dollar bought, and what to do about it next.',
      sub: 'Analytics for owner-operators. Cost per booked inspection, source attribution, and where to push next.',
    },
    wedge:
      "Most roofers don't have an analytics problem. They have a data problem. Three tools, two spreadsheets, zero confidence in the number. We don't add another dashboard. We make the existing data tell you the truth.",
    steps: [
      { n: '01', title: 'Define the metrics that matter', body: 'Cost per booked inspection, close rate by source, lifetime value by channel. Not pageviews and bounce rate.' },
      { n: '02', title: 'Wire up clean tracking', body: 'Every lead source labeled, every call recorded, every form attributed. No more "I think it was Google."' },
      { n: '03', title: 'Build the owner dashboard', body: "One screen. Real-time. What's working, what's not, what to do this week." },
      { n: '04', title: 'Weekly reading', body: "A short written note on what the numbers said and what we'd shift. Numbers without interpretation are noise." },
    ],
    objections: [
      { q: 'My CRM already has reporting.', a: 'It reports activity, not profitability. We bridge what your CRM tracks with what your ads spent and your jobs closed.' },
      { q: "I don't want to look at dashboards all day.", a: 'Neither do we. The dashboard is a weekly read, not a daily distraction.' },
      { q: 'What if my data is a mess?', a: 'It usually is. We clean it as the first step. That alone changes how you make decisions.' },
    ],
    included: [
      'Metrics definition workshop',
      'Tracking + attribution setup',
      'Owner-friendly dashboard',
      'Weekly written interpretation',
      'Quarterly strategy review',
      'Direct text/Slack line to your analyst',
    ],
    stack: {
      services: ['google-ads', 'ai-automation'],
      outcome: 'Clean data. Confident decisions. Spend where it actually pays back.',
    },
  },
];

export const getServiceBySlug = (slug) => SERVICES.find((s) => s.slug === slug);

export const getRelatedServices = (slugs) =>
  slugs.map((slug) => SERVICES.find((s) => s.slug === slug)).filter(Boolean);

/**
 * Sequencing pillars for the /services hub.
 * "Roofers don't need 10 tools. They need a sequence that compounds."
 */
export const SERVICE_PILLARS = [
  {
    key: 'foundation',
    label: 'Foundation',
    blurb: 'Look the part. Earn the trust before the call.',
    services: ['branding', 'web-design'],
  },
  {
    key: 'demand',
    label: 'Demand',
    blurb: 'Get in front of homeowners with paid and organic.',
    services: ['google-ads', 'meta-ads', 'seo', 'social-media-management'],
  },
  {
    key: 'conversion',
    label: 'Conversion',
    blurb: 'Turn the click into a booked inspection. Fast.',
    services: ['web-development', 'ai-automation', 'email'],
  },
  {
    key: 'insight',
    label: 'Insight',
    blurb: 'See what worked. Push spend where it pays back.',
    services: ['analytics'],
  },
];
