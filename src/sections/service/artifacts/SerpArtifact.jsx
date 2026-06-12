import { motion, useReducedMotion } from 'motion/react';
import { IconPhone, IconStarFilled, IconSearch } from '@tabler/icons-react';
import { ease, dur } from '../../../motion/motion-config.js';

/**
 * Abstract "intent capture" motif for the Google Ads hero. Not a Google
 * mockup. A stylized flow: query typed, branded answer surfaces, call CTA
 * pulses. Three stacked elements, no browser chrome, no platform labels.
 */
export default function SerpArtifact({ accent }) {
  const reduced = useReducedMotion();
  return (
    <div className="dr-svc-artifact dr-svc-artifact--serp" aria-hidden="true">
      <span className="dr-svc-serp__caption" style={{ color: accent }}>
        Intent. Answer. Call.
      </span>

      <div className="dr-svc-serp__bar">
        <IconSearch size={16} stroke={1.75} className="dr-svc-serp__search-icon" />
        <motion.span
          className="dr-svc-serp__query"
          initial={reduced ? false : { width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.4, ease: ease.outExpo, delay: 0.2 }}
        >
          roof leak repair near me
        </motion.span>
        {!reduced && (
          <motion.span
            className="dr-svc-serp__caret"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>

      <motion.div
        className="dr-svc-serp__answer"
        style={{ borderColor: accent }}
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur.slow, ease: ease.outExpo, delay: 1.8 }}
      >
        <div className="dr-svc-serp__answer-head">
          <div className="dr-svc-serp__brand-mark" style={{ background: accent }}>
            <span>YR</span>
          </div>
          <div className="dr-svc-serp__answer-body">
            <div className="dr-svc-serp__title">Your Roofing Co.</div>
            <div className="dr-svc-serp__meta">
              <span className="dr-svc-serp__stars">
                <IconStarFilled size={11} />
                <IconStarFilled size={11} />
                <IconStarFilled size={11} />
                <IconStarFilled size={11} />
                <IconStarFilled size={11} />
              </span>
              <span>Licensed. Insured. Local crew.</span>
            </div>
          </div>
        </div>

        <motion.div
          className="dr-svc-serp__cta"
          style={{ background: accent }}
          animate={reduced ? undefined : {
            boxShadow: [
              `0 0 0 0 ${accent}40`,
              `0 0 0 16px ${accent}00`,
            ],
          }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 2.4 }}
        >
          <IconPhone size={14} stroke={2} />
          <span>Call now</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
