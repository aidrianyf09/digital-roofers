import { forwardRef } from 'react';

const PLATFORMS = [
  {
    id: 'google',
    name: 'Google Ads',
    blurb: 'High-intent leads searching for a roofer right now.',
    glyph: 'G',
  },
  {
    id: 'meta',
    name: 'Meta Ads',
    blurb: 'Storm-season demand creation + retargeting.',
    glyph: 'M',
  },
  {
    id: 'both',
    name: 'Both',
    blurb: 'Full-funnel: capture searches + create demand.',
    glyph: '∞',
  },
];

const AuditPlatformPicker = forwardRef(function AuditPlatformPicker(
  { selected, onSelect },
  ref
) {
  return (
    <section ref={ref} id="picker" className="audit-picker">
      <div className="wrap">
        <header className="audit-section-head audit-section-head--centered">
          <span className="mono audit-eyebrow r-up">
            Step 02 — Pick Your Channel
          </span>
          <h2 className="display audit-section-h2 r-up d1">
            What should we audit?
          </h2>
          <p className="audit-section-body r-up d2">
            Pick one — we tailor the 15-minute review to the channel you
            actually run.
          </p>
        </header>

        <div className="audit-picker-grid r-up d3">
          {PLATFORMS.map((p) => {
            const active = selected === p.id;
            return (
              <button
                key={p.id}
                type="button"
                className={`audit-picker-card${active ? ' is-active' : ''}`}
                aria-pressed={active}
                onClick={() => onSelect(p.id)}
              >
                <span
                  className="audit-picker-card-shadow"
                  aria-hidden="true"
                />
                <span className="audit-picker-card-inner">
                  <span className="audit-picker-glyph" aria-hidden="true">
                    {p.glyph}
                  </span>
                  <span className="audit-picker-name display">{p.name}</span>
                  <span className="audit-picker-blurb">{p.blurb}</span>
                  <span className="audit-picker-check mono">
                    {active ? '✓ Selected' : 'Choose →'}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default AuditPlatformPicker;
