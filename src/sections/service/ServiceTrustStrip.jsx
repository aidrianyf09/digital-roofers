import Marquee from '../../motion/Marquee.jsx';

/**
 * Thin sapphire/accent marquee directly under the hero. Reuses the home
 * page TrustStrip rhythm so the service pages feel like part of the same
 * site, not a different room. Per-service phrases.
 */
const PHRASES = {
  'google-ads':              ['BOOKED INSPECTIONS', 'COST PER LEAD', 'STORM-SEASON READY', 'DIRECT STRATEGIST LINE'],
  'meta-ads':                ['STORM-SEASON DEMAND', 'RETARGETING THAT CLOSES', 'CREATIVE FOR THE TRADE', 'OWNER-LED UGC'],
  'social-media-management': ['WEEKLY CADENCE', 'JOB-SITE CONTENT', 'REVIEW AMPLIFICATION', 'AI-ASSISTED PIPELINE'],
  'web-design':              ['MOBILE-FIRST BUILD', 'PHONE-IN-DRIVEWAY SPEED', 'TRUST ABOVE THE FOLD', 'CONVERSION-TUNED'],
  'web-development':         ['END-TO-END TRACKED', 'CRM-ROUTED LEADS', 'CLEAN INTEGRATIONS', 'ZERO LEAKAGE'],
  'ai-automation':           ['ANSWER IN 90 SECONDS', 'CALENDAR FILLS ITSELF', 'ALWAYS ON', 'EDGE CASES TO HUMANS'],
  'seo':                     ['LONG-TAIL INTENT', 'COMPOUNDING RETURNS', 'LOCAL MAP DOMINANCE', 'EARNED CLICKS'],
  'email':                   ['NURTURE NOT NOISE', 'INBOX-WORTHY CONTENT', 'CAPTURE THE NOT-NOW', 'BOOKINGS AS THE METRIC'],
  'branding':                ['TRUST BEFORE THE CALL', 'PREMIUM POSITIONING', 'IDENTITY THAT SCALES', 'LOOK THE PART'],
  'analytics':               ['COST PER BOOKED INSPECTION', 'SOURCE ATTRIBUTION', 'WEEKLY READINGS', 'CONFIDENT DECISIONS'],
};

export default function ServiceTrustStrip({ service }) {
  const phrases = PHRASES[service.slug] || ['BUILT FOR ROOFERS'];
  return (
    <section className="dr-svc-trust" style={{ '--svc-accent': service.accent }} aria-label={`${service.name} principles`}>
      <Marquee speed={0.8}>
        {phrases.map((p, i) => (
          <span key={i} className="dr-svc-trust__item">
            <span className="dr-svc-trust__text">{p}</span>
            <span className="dr-svc-trust__dot" aria-hidden="true">•</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
