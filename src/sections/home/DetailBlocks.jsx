import StaggerIn, { StaggerItem } from '../../motion/StaggerIn.jsx';
import AIImagePlate from '../../motion/AIImagePlate.jsx';
import SectionDivider from '../../components/layout/SectionDivider.jsx';
import PullQuote from '../../components/ui/PullQuote.jsx';

const SCORE_ROWS = [
  ['Google Ads Presence',  60, 6],
  ['Website Performance',  40, 4],
  ['Social Media Activity',30, 3],
  ['AI / Search Visibility',50, 5],
  ['Competitor Gap',       50, 5],
];

const GAPS = [
  ['01', 'Google Ads', 'Competitor A is bidding on "emergency roof repair Tampa" with location extensions and call tracking. You aren\'t bidding on emergency keywords at all.'],
  ['02', 'Website',    'Their site loads in 1.4s on mobile and has a sticky "Free Inspection" CTA. Yours loads in 4.1s and buries the phone number in the footer.'],
  ['03', 'Social',     'They post 4 times per week: job-site walkthroughs, before/afters, and crew videos. You haven\'t posted since March.'],
  ['04', 'Reviews',    'They\'ve added 47 Google reviews this year. You\'ve added 6. Their average response time is under 24 hours.'],
  ['05', 'Lead Response','Their inbound form pings them and texts the homeowner inside 2 minutes. Your form goes to an inbox checked twice a day.'],
];

const MONTH_PLANS = [
  {
    num: '01',
    label: 'Month One',
    h: 'Fix the foundation.',
    items: ['Site speed & mobile fix', 'Call tracking installed', 'Google Business Profile audit', 'Review request automation', 'Lead-response SLA < 2 min'],
  },
  {
    num: '02',
    label: 'Month Two',
    h: 'Launch and optimize.',
    items: ['Google Ads live in service zone', 'Meta retargeting funnels', 'Weekly content cadence', 'Landing pages per service', 'CRM lead routing wired up'],
  },
  {
    num: '03',
    label: 'Month Three',
    h: 'Scale what works.',
    items: ['Double budget on winners', 'Kill underperformers', 'Expand to second city', 'Storm-season playbook ready', 'Monthly scorecard, owner-level'],
  },
];

function DetailHead({ num, h3, p }) {
  return (
    <header className="dr-detail__head">
      <div className="dr-detail__rail">
        <span className="dr-detail__rail-num">{num}</span>
        <span className="dr-detail__rail-of">/05</span>
      </div>
      <div className="dr-detail__intro">
        <h3 className="dr-detail__h3">{h3}</h3>
        <p className="dr-detail__p">{p}</p>
      </div>
    </header>
  );
}

export default function DetailBlocks() {
  return (
    <section className="dr-details" id="details">
      <div className="dr-container">
        <SectionDivider letter="C" label="The audit" />

        {/* 01 — YOUR SCORE */}
        <article className="dr-detail dr-detail--alt">
          <DetailHead
            num="01"
            h3="[Company Name] Digital Presence Audit."
            p="Scored on 5 pillars (1 to 10 each). One number tells you nothing. Five numbers tell you exactly where to push."
          />
          <StaggerIn className="dr-detail__body" staggerChildren={0.06}>
            <StaggerItem className="dr-score-card">
              <div className="dr-score-card__head">
                <span>Sample Score Sheet</span>
                <span>Tampa Roofing Co.</span>
              </div>
              <div className="dr-score-card__rows">
                {SCORE_ROWS.map(([label, w, n]) => (
                  <div className="dr-score-card__row" key={label}>
                    <span className="dr-score-card__label">{label}</span>
                    <div className="dr-score-card__meter" style={{ '--w': `${w}%` }} />
                    <span className="dr-score-card__num dr-tabular">{n} / 10</span>
                  </div>
                ))}
              </div>
              <div className="dr-score-card__total">
                <span>Overall Score</span>
                <span className="dr-score-card__big dr-tabular">23 / 50</span>
              </div>
            </StaggerItem>
          </StaggerIn>
        </article>

        <PullQuote>
          One number tells you nothing. Five numbers tell you exactly where to push.
        </PullQuote>

        {/* 02 — COMPETITOR COMPARISON */}
        <article className="dr-detail">
          <DetailHead
            num="02"
            h3="How you stack against the top 3 in your zip code."
            p="Simple table. Their scores vs yours. Where you are winning. Where you are losing. No interpretation theater. The numbers do the talking."
          />
          <div className="dr-detail__body">
            <div className="dr-cmp-wrap">
              <table className="dr-cmp">
                <thead>
                  <tr><th>Metric</th><th>You</th><th>Comp A</th><th>Comp B</th><th>Comp C</th></tr>
                </thead>
                <tbody>
                  <tr><td>Google Ads</td><td className="is-you">6</td><td className="is-win">8</td><td className="is-win">7</td><td className="is-lose">5</td></tr>
                  <tr><td>Website</td><td className="is-you">4</td><td className="is-win">9</td><td className="is-win">7</td><td className="is-win">6</td></tr>
                  <tr><td>Social Media</td><td className="is-you">3</td><td className="is-win">8</td><td className="is-win">6</td><td className="is-win">7</td></tr>
                  <tr><td>AI / Search</td><td className="is-you">5</td><td className="is-lose">3</td><td className="is-lose">4</td><td className="is-lose">2</td></tr>
                  <tr><td>Gap Score</td><td className="is-you">5</td><td className="is-lose">4</td><td className="is-lose">3</td><td className="is-lose">4</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>

        {/* 03 — GAP ANALYSIS */}
        <article className="dr-detail dr-detail--alt">
          <DetailHead
            num="03"
            h3="Here is what your top competitor is doing that you are not."
            p="Specific. Actionable. Real. The receipts on what's working for the guys eating your lunch, and the exact moves to take them on."
          />
          <StaggerIn className="dr-detail__body dr-gap-list" staggerChildren={0.06}>
            {GAPS.map(([num, label, body]) => (
              <StaggerItem key={num} className="dr-gap-row">
                <span className="dr-gap-row__num dr-tabular">{num}</span>
                <div className="dr-gap-row__text">
                  <div className="dr-gap-row__label">{label}</div>
                  <div className="dr-gap-row__body">{body}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerIn>
        </article>

        <PullQuote>
          No interpretation theater. The numbers do the talking.
        </PullQuote>

        {/* 04 — 90-DAY ROADMAP */}
        <article className="dr-detail">
          <DetailHead
            num="04"
            h3="Three months. Three jobs. No detours."
            p="We don't believe in 12-month plans. The roofing market moves in storm seasons. Here's what the next 90 days look like."
          />
          <StaggerIn className="dr-detail__body dr-roadmap" staggerChildren={0.1}>
            {MONTH_PLANS.map((m) => (
              <StaggerItem key={m.num} className="dr-month">
                <div className="dr-month__head">
                  <span className="dr-month__num dr-tabular">{m.num}</span>
                  <span>{m.label}</span>
                </div>
                <h4 className="dr-month__h">{m.h}</h4>
                <ul className="dr-month__list">
                  {m.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </StaggerItem>
            ))}
          </StaggerIn>
        </article>

        <PullQuote>
          Three months. Three jobs. No detours.
        </PullQuote>

        {/* 05 — CTA SUMMARY */}
        <article className="dr-detail dr-detail--alt">
          <DetailHead
            num="05"
            h3="We can execute this for you."
            p="The audit is free. The roadmap is yours either way. If you want us to run it, we'll talk numbers, not pitch decks."
          />
          <div className="dr-detail__body">
            <AIImagePlate
              src="/imagery/proof/before-after.webp"
              alt="Before and after of a residential roof replacement in Florida."
              ratio="16 / 9"
              kenBurns={false}
              reveal
            />
          </div>
        </article>

      </div>
    </section>
  );
}
