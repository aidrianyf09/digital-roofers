import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../../../motion/motion-config.js';

/**
 * Email. A stack of message rows; the branded one is highlighted, suggesting
 * the message that earned the open. Abstract inbox; no Gmail/Apple Mail
 * chrome.
 */
const ROWS = [
  { branded: false, subject: 'Service area newsletter', skel: 0.5 },
  { branded: true,  subject: 'Storm warning tonight. Here is what to check.', skel: 0.78 },
  { branded: false, subject: 'Weekly roundup', skel: 0.4 },
  { branded: false, subject: 'Quote follow-up', skel: 0.55 },
];

export default function InboxArtifact({ accent }) {
  const reduced = useReducedMotion();
  return (
    <div className="dr-svc-artifact dr-svc-artifact--inbox" aria-hidden="true">
      <span className="dr-svc-inbox__caption" style={{ color: accent }}>
        Opened. Acted on.
      </span>

      <div className="dr-svc-inbox__stack">
        {ROWS.map((row, i) => (
          <motion.div
            key={i}
            className={`dr-svc-inbox__row ${row.branded ? 'is-branded' : ''}`}
            style={row.branded ? { borderColor: accent } : undefined}
            initial={reduced ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: row.branded ? 1 : 0.6, x: 0 }}
            transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.2 + i * 0.1 }}
          >
            <span
              className="dr-svc-inbox__dot"
              style={row.branded ? { background: accent } : undefined}
            />
            <span className="dr-svc-inbox__subject">{row.subject}</span>
            <span className="dr-svc-inbox__bar" style={{ width: `${row.skel * 100}%` }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
