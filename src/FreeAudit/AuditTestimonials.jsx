// REPLACE: Replace placeholder testimonials with real client quotes when available
// REPLACE: Real client names and locations
const QUOTES = [
  {
    quote:
      'We were spending $2,000 a month on Google Ads with nothing to show for it. The audit showed us exactly why. Within 30 days we had 11 qualified leads.',
    name: '[Roofing Company Owner]',
    location: 'Tampa, FL',
    label: 'Google Ads client',
  },
  {
    quote:
      'I was skeptical about another agency. But the free audit was different. They actually showed me what was wrong before asking for anything.',
    name: '[Roofing Company Owner]',
    location: 'Clearwater, FL',
    label: 'Google + Meta client',
  },
  {
    quote:
      'The audit report alone was worth more than what I paid my last agency for a full month of management.',
    name: '[Roofing Company Owner]',
    location: 'St. Petersburg, FL',
    label: 'Starter plan client',
  },
];

const delays = ['d1', 'd2', 'd3'];

export default function AuditTestimonials() {
  return (
    <section className="audit-testimonials">
      <div className="wrap">
        <header className="audit-section-head">
          <h2 className="display audit-section-h2 r-up">
            Results speak louder.
          </h2>
        </header>

        <div className="audit-testimonials-grid">
          {QUOTES.map((q, i) => (
            <figure
              key={i}
              className={`audit-quote-card r-up ${delays[i]}`}
            >
              <span className="audit-quote-shadow" aria-hidden="true"></span>
              <div className="audit-quote-inner">
                <span className="audit-quote-mark" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="audit-quote-body">{q.quote}</blockquote>
                <figcaption className="audit-quote-foot">
                  <div className="audit-quote-name">{q.name}</div>
                  <div className="mono audit-quote-meta">
                    {q.location}
                  </div>
                  <div className="mono audit-quote-label">{q.label}</div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
