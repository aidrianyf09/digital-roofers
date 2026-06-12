import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../../../motion/motion-config.js';

/**
 * Branding. Pure typographic showpiece. One word, displayed at scale, with a
 * subtle accent shape behind it. Type IS the visual.
 */
export default function TypographyArtifact({ accent }) {
  const reduced = useReducedMotion();
  return (
    <div className="dr-svc-artifact dr-svc-artifact--type" aria-hidden="true">
      <span className="dr-svc-type__caption" style={{ color: accent }}>
        Trust before the call.
      </span>

      <div className="dr-svc-type__stage">
        <motion.span
          className="dr-svc-type__blob"
          style={{ background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)` }}
          animate={reduced ? undefined : {
            scale: [1, 1.08, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="dr-svc-type__word"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.slow, ease: ease.outExpo, delay: 0.2 }}
        >
          Identity.
        </motion.div>

        <motion.div
          className="dr-svc-type__sub"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.7 }}
        >
          The proxy for quality.
        </motion.div>

        <div className="dr-svc-type__swatches">
          <span style={{ background: accent }} />
          <span style={{ background: `color-mix(in srgb, ${accent} 60%, var(--brand-charcoal))` }} />
          <span style={{ background: 'var(--brand-charcoal)' }} />
        </div>
      </div>
    </div>
  );
}
