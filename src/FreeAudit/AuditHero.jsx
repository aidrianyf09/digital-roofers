export default function AuditHero({ onBookClick }) {
  return (
    <section className="audit-hero">
      <div className="wrap">
        <div className="audit-hero-inner">
          <span className="mono audit-eyebrow audit-eyebrow--on-dark r-up">
            Free Live Ads Audit
          </span>
          <h1 className="display audit-hero-h1 r-up d1">
            Find Out Exactly What Is<br />
            <span className="audit-hero-accent">Costing You Roofing Leads</span>
          </h1>
          <p className="audit-hero-body r-up d2">
            Book a free 15-minute call with our ads specialist. We review your current
            Google Ads, Meta Ads, and website live on the call, then tell you exactly
            what to fix. No pitch. Just findings.
          </p>
          <div className="audit-hero-cta r-up d3">
            <button type="button" className="cta cta-lg" onClick={onBookClick}>
              <span className="cta-shadow"></span>
              <span className="cta-btn">
                Book My Free Audit <span className="arrow">→</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="audit-trust">
        <div className="wrap">
          <ul className="audit-trust-list">
            <li className="audit-trust-pill mono r-up d1">15 Minutes</li>
            <li className="audit-trust-pill mono r-up d2">No Obligation</li>
            <li className="audit-trust-pill mono r-up d3">Live With A Specialist</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
