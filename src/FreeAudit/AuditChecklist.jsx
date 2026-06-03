import { SearchIcon, TargetIcon, MonitorIcon, CheckIcon } from './Icons.jsx';

const CARDS = [
  {
    Icon: SearchIcon,
    title: 'Google Ads Account',
    items: [
      'Campaign structure',
      'Keyword targeting and match types',
      'Ad copy and quality score',
      'Bidding strategy',
      'Conversion tracking setup',
      'Wasted spend identification',
    ],
  },
  {
    Icon: TargetIcon,
    title: 'Meta Ads Account',
    items: [
      'Campaign objectives',
      'Audience targeting',
      'Creative performance',
      'Pixel and event tracking',
      'Budget allocation',
      'Retargeting setup',
    ],
  },
  {
    Icon: MonitorIcon,
    title: 'Website and Tracking',
    items: [
      'Landing page conversion rate',
      'Call to action clarity',
      'Google Analytics 4 setup',
      'Google Tag Manager',
      'Local Service Ads eligibility',
      'Mobile experience',
    ],
  },
];

const delays = ['d1', 'd2', 'd3'];

export default function AuditChecklist() {
  return (
    <section className="audit-checklist">
      <div className="wrap">
        <header className="audit-section-head">
          <span className="mono audit-eyebrow r-up">What We Audit</span>
          <h2 className="display audit-section-h2 r-up d1">
            Every angle.<br />Not just the ads.
          </h2>
        </header>

        <div className="audit-checklist-grid">
          {CARDS.map(({ Icon, title, items }, i) => (
            <article key={title} className={`audit-check-card r-up ${delays[i]}`}>
              <span className="audit-check-shadow" aria-hidden="true"></span>
              <div className="audit-check-inner">
                <div className="audit-check-icon">
                  <Icon size={32} />
                </div>
                <h3 className="display audit-check-title">{title}</h3>
                <ul className="audit-check-items">
                  {items.map((it) => (
                    <li key={it} className="audit-check-item">
                      <span className="audit-check-tick" aria-hidden="true">
                        <CheckIcon size={14} />
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
