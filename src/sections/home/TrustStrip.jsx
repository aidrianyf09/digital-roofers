import Marquee from '../../motion/Marquee.jsx';

const PHRASES = [
  'DATA-DRIVEN',
  'MEASURABLE ROI',
  'FLORIDA ROOFERS',
  'STRATEGY-FIRST',
  'PARTNERSHIP NOT TRANSACTION',
  'ACCESSIBLE EXPERTISE',
];

export default function TrustStrip() {
  return (
    <section className="dr-trust-strip" aria-label="What we stand for">
      <Marquee speed={0.8}>
        {PHRASES.map((p, i) => (
          <span key={i} className="dr-trust-strip__item">
            <span className="dr-trust-strip__text">{p}</span>
            <span className="dr-trust-strip__dot" aria-hidden="true">•</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
