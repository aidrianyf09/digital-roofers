const STEPS = [
  {
    num: '01',
    title: 'We ask the right questions',
    body: 'Understanding your goals, market, and what you have tried before.',
  },
  {
    num: '02',
    title: 'We look at your ads live',
    body: 'Screenshots of your current campaigns, targeting, spend, and results.',
  },
  {
    num: '03',
    title: 'We identify the gaps',
    body: 'What is wasting your budget and what opportunities you are missing.',
  },
  {
    num: '04',
    title: 'You get the full report',
    body: 'Written audit report delivered within 24 hours after the call.',
  },
];

const delays = ['d1', 'd2', 'd3', 'd4'];

export default function AuditSteps() {
  return (
    <section className="audit-steps">
      <div className="wrap">
        <header className="audit-section-head">
          <span className="mono audit-eyebrow r-up">What To Expect</span>
          <h2 className="display audit-section-h2 r-up d1">
            A real audit.<br />Not a sales pitch.
          </h2>
          <p className="audit-section-body r-up d2">
            Most agencies give you a watered-down PDF and call it an audit. This is
            different. You get on a live call with our specialist, we look at your
            account together, and you leave knowing exactly what is broken and what
            it is costing you.
          </p>
        </header>

        <ol className="audit-steps-grid">
          {STEPS.map((s, i) => (
            <li key={s.num} className={`audit-step r-up ${delays[i]}`}>
              <span className="mono audit-step-num">{s.num}</span>
              <h3 className="display audit-step-title">{s.title}</h3>
              <p className="audit-step-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
