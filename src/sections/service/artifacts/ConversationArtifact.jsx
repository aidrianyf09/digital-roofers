import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../../../motion/motion-config.js';

/**
 * AI & Automation. Two bubbles plus a typing indicator. Abstract conversation
 * shape; no iMessage or WhatsApp chrome.
 */
export default function ConversationArtifact({ accent }) {
  const reduced = useReducedMotion();
  return (
    <div className="dr-svc-artifact dr-svc-artifact--convo" aria-hidden="true">
      <span className="dr-svc-convo__caption" style={{ color: accent }}>
        Answered in 90 seconds.
      </span>

      <div className="dr-svc-convo__thread">
        <motion.div
          className="dr-svc-convo__bubble dr-svc-convo__bubble--in"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.2 }}
        >
          My roof is leaking, can someone come look today?
        </motion.div>

        <motion.div
          className="dr-svc-convo__typing"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur.fast, delay: 0.9 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={reduced ? undefined : { y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>

        <motion.div
          className="dr-svc-convo__bubble dr-svc-convo__bubble--out"
          style={{ background: accent }}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.base, ease: ease.outExpo, delay: 1.8 }}
        >
          Yes. Tomorrow at 9am works. Confirm?
        </motion.div>
      </div>
    </div>
  );
}
