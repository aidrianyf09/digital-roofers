export default function AuditFinalCTA({ onBookClick }) {
  return (
    <section className="audit-final">
      <div className="wrap">
        <div className="audit-final-inner">
          <h2 className="display audit-final-h2 r-up">
            Ready to Find Out What Is<br />
            <span className="audit-final-accent">Costing You Leads?</span>
          </h2>
          <p className="audit-final-body r-up d1">
            Book your free 15-minute audit call now. Spots are limited to 5 per week.
          </p>
          <div className="audit-final-cta r-up d2">
            <button type="button" className="cta cta-lg" onClick={onBookClick}>
              <span className="cta-shadow"></span>
              <span className="cta-btn">
                Book My Free Audit <span className="arrow">→</span>
              </span>
            </button>
          </div>
          <p className="mono audit-final-meta r-up d3">
            15 Minutes · Free · No Obligation
          </p>
        </div>
      </div>
    </section>
  );
}
