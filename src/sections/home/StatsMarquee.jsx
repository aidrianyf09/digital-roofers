import CountUp from '../../motion/CountUp.jsx';
import StaggerIn, { StaggerItem } from '../../motion/StaggerIn.jsx';

const STATS = [
  { value: 2.4,  prefix: '$',  suffix: 'M',   label: 'Lead value tracked',  format: (v) => v.toFixed(1) },
  { value: 180,  prefix: '',   suffix: '+',   label: 'Roofs sold for clients' },
  { value: 100,  prefix: '',   suffix: '%',   label: 'Florida-focused' },
];

export default function StatsMarquee() {
  return (
    <section className="dr-stats" aria-label="By the numbers">
      <div className="dr-container">
        <span className="dr-eyebrow">
          <span className="dr-eyebrow__num">03</span>
          <span className="dr-eyebrow__sep">/</span>
          By The Numbers
        </span>
        <StaggerIn className="dr-stats__grid" staggerChildren={0.12}>
          {STATS.map((s) => (
            <StaggerItem key={s.label} className="dr-stat">
              <span className="dr-stat__value">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} format={s.format} duration={1600} />
              </span>
              <span className="dr-stat__label">{s.label}</span>
            </StaggerItem>
          ))}
        </StaggerIn>
      </div>
    </section>
  );
}
