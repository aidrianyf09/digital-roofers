import { motion, useReducedMotion } from 'motion/react';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import { ease, dur } from '../../../motion/motion-config.js';

/**
 * Meta Ads. Abstract "in-feed offer" motif. Branded content tile with a
 * pulsing play affordance and a CTA that suggests booking. Not a Facebook
 * mockup; the chrome is intentionally absent.
 */
export default function FeedArtifact({ accent }) {
  const reduced = useReducedMotion();
  return (
    <div className="dr-svc-artifact dr-svc-artifact--feed" aria-hidden="true">
      <span className="dr-svc-feed__caption" style={{ color: accent }}>
        Scroll. Stop. Book.
      </span>

      <motion.div
        className="dr-svc-feed__card"
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur.slow, ease: ease.outExpo, delay: 0.3 }}
      >
        <div
          className="dr-svc-feed__media"
          style={{ background: `linear-gradient(135deg, ${accent} 0%, color-mix(in srgb, ${accent} 60%, transparent) 100%)` }}
        >
          <motion.span
            className="dr-svc-feed__play"
            animate={reduced ? undefined : { scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <IconPlayerPlayFilled size={22} />
          </motion.span>
        </div>
        <div className="dr-svc-feed__body">
          <div className="dr-svc-feed__title">Storm damage? We are booked all week.</div>
          <div className="dr-svc-feed__skel" />
          <div className="dr-svc-feed__skel" style={{ width: '64%' }} />
        </div>
        <motion.button
          className="dr-svc-feed__cta"
          style={{ background: accent }}
          animate={reduced ? undefined : {
            boxShadow: [`0 0 0 0 ${accent}40`, `0 0 0 14px ${accent}00`],
          }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1.2 }}
        >
          Book inspection
        </motion.button>
      </motion.div>
    </div>
  );
}
