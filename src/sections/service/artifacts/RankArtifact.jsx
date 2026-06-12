import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../../../motion/motion-config.js';

/**
 * SEO. Vertical bar chart; the branded bar climbs to position 1 while the
 * others stay muted. Abstract ranking visualization; no Google Search Console
 * chrome.
 */
const POSITIONS = [
  { label: '10', height: 18, branded: false },
  { label: '7',  height: 32, branded: false },
  { label: '4',  height: 50, branded: false },
  { label: '1',  height: 88, branded: true },
];

export default function RankArtifact({ accent }) {
  const reduced = useReducedMotion();
  return (
    <div className="dr-svc-artifact dr-svc-artifact--rank" aria-hidden="true">
      <span className="dr-svc-rank__caption" style={{ color: accent }}>
        Position one. And the long tail.
      </span>

      <div className="dr-svc-rank__chart">
        {POSITIONS.map((p, i) => (
          <div key={p.label} className="dr-svc-rank__col">
            <motion.div
              className={`dr-svc-rank__bar ${p.branded ? 'is-branded' : ''}`}
              style={p.branded ? { background: accent } : undefined}
              initial={reduced ? false : { height: 0 }}
              animate={{ height: `${p.height}%` }}
              transition={{ duration: dur.slow, ease: ease.outExpo, delay: 0.3 + i * 0.15 }}
            />
            <span className="dr-svc-rank__label">{p.label}</span>
          </div>
        ))}
      </div>

      <div className="dr-svc-rank__axis">Rank position</div>
    </div>
  );
}
