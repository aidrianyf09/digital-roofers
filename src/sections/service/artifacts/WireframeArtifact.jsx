import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../../../motion/motion-config.js';

/**
 * Web Design. A wireframe that builds itself piece by piece. Structural
 * rectangles only. No fake browser chrome.
 */
const BLOCKS = [
  { key: 'nav',   className: 'dr-svc-wf__nav',   delay: 0.2 },
  { key: 'hero',  className: 'dr-svc-wf__hero',  delay: 0.5 },
  { key: 'text1', className: 'dr-svc-wf__text', delay: 0.8 },
  { key: 'text2', className: 'dr-svc-wf__text dr-svc-wf__text--short', delay: 0.95 },
  { key: 'cta',   className: 'dr-svc-wf__cta',   delay: 1.3, accentBg: true },
];

export default function WireframeArtifact({ accent }) {
  const reduced = useReducedMotion();
  return (
    <div className="dr-svc-artifact dr-svc-artifact--wireframe" aria-hidden="true">
      <span className="dr-svc-wf__caption" style={{ color: accent }}>
        Built for the phone in the driveway.
      </span>

      <div className="dr-svc-wf__frame">
        {BLOCKS.map((b) => (
          <motion.div
            key={b.key}
            className={b.className}
            style={b.accentBg ? { background: accent } : undefined}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur.base, ease: ease.outExpo, delay: b.delay }}
          />
        ))}
      </div>
    </div>
  );
}
