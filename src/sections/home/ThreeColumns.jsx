import StaggerIn, { StaggerItem } from '../../motion/StaggerIn.jsx';

const COL1 = [
  ['Google Ads', 60, 6],
  ['Website',    40, 4],
  ['Social',     30, 3],
  ['AI Search',  50, 5],
  ['Gap',        50, 5],
];

const COL2 = [
  ['Google Ads', 'lose', 'Losing'],
  ['Website',    'lose', 'Losing'],
  ['Social',     'lose', 'Losing'],
  ['AI Search',  'win',  'Winning'],
  ['Gap',        'win',  'Winning'],
];

const COL3 = [
  ['Month 01', 'Fix the foundation'],
  ['Month 02', 'Launch and optimize'],
  ['Month 03', 'Scale what works'],
];

export default function ThreeColumns() {
  return (
    <section className="dr-howit" id="howit">
      <div className="dr-container">
        <div className="dr-howit__head">
          <div>
            <span className="dr-eyebrow">
              <span className="dr-eyebrow__num">02</span>
              <span className="dr-eyebrow__sep">/</span>
              How It Works
            </span>
            <h2 className="dr-howit__h2">
              Three columns. One page. The whole picture.
            </h2>
          </div>
          <p className="dr-howit__sub">
            A simple chart that does the heavy lifting. Where you stand. Where they stand. What to do about it.
          </p>
        </div>

        <StaggerIn className="dr-howit__cols" staggerChildren={0.12}>
          <StaggerItem className="dr-howit__col">
            <div className="dr-howit__step"><span className="dr-howit__badge">1</span> Score You</div>
            <div className="dr-howit__title">Your digital presence on 5 pillars.</div>
            <p className="dr-howit__desc">
              Google Ads. Website. Social. AI search. Competitor gap. Each rated 1 to 10. Honest. Specific.
            </p>
            <div className="dr-howit__bars" aria-hidden="true">
              {COL1.map(([label, w, n]) => (
                <div className="dr-howit__bar-row" key={label}>
                  <span>{label}</span>
                  <div className="dr-howit__bar"><div className="dr-howit__bar-fill" style={{ '--w': `${w}%` }} /></div>
                  <span className="dr-howit__bar-num dr-tabular">{n}</span>
                </div>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem className="dr-howit__col">
            <div className="dr-howit__step"><span className="dr-howit__badge">2</span> Score Them</div>
            <div className="dr-howit__title">Your top competitors on the same 5 pillars.</div>
            <p className="dr-howit__desc">
              We pull the top 3 to 5 roofers in your service area and score them too. Same scale. Side-by-side.
            </p>
            <div className="dr-howit__vs">
              {COL2.map(([label, cls, tag]) => (
                <div className="dr-howit__vs-row" key={label}>
                  <span>{label}</span>
                  <span className={`dr-howit__vs-tag is-${cls}`}>{tag}</span>
                </div>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem className="dr-howit__col">
            <div className="dr-howit__step"><span className="dr-howit__badge">3</span> Close the Gap</div>
            <div className="dr-howit__title">A 90-day roadmap. Specific. Executable.</div>
            <p className="dr-howit__desc">
              What to fix first. What to launch next. What to scale. No fluff. No theory. Just the next 90 days.
            </p>
            <div className="dr-howit__road">
              {COL3.map(([m, label]) => (
                <div className="dr-howit__road-row" key={m}>
                  <span className="dr-howit__road-m">{m}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </StaggerItem>
        </StaggerIn>
      </div>
    </section>
  );
}
