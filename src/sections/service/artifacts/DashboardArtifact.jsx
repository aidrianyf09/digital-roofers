import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../../../motion/motion-config.js';

/**
 * Analytics. A sparkline that draws itself, plus a stacked rank of three
 * "sources" with their share filling in. No big hero metric. No fake
 * Google Analytics chrome.
 */
const SOURCES = [
  { label: 'Google',   share: 60 },
  { label: 'Meta',     share: 25 },
  { label: 'Organic',  share: 15 },
];

export default function DashboardArtifact({ accent }) {
  const reduced = useReducedMotion();
  return (
    <div className="dr-svc-artifact dr-svc-artifact--dash" aria-hidden="true">
      <span className="dr-svc-dash__caption" style={{ color: accent }}>
        What every dollar bought.
      </span>

      <div className="dr-svc-dash__spark">
        <svg viewBox="0 0 200 60" preserveAspectRatio="none" width="100%" height="60">
          <motion.path
            d="M 0 48 L 24 42 L 48 44 L 72 36 L 96 30 L 120 32 L 144 22 L 168 16 L 200 8"
            stroke={accent}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: ease.outExpo, delay: 0.3 }}
          />
          <motion.circle
            cx="200" cy="8" r="4"
            fill={accent}
            initial={reduced ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: dur.base, ease: ease.outExpo, delay: 1.9 }}
          />
        </svg>
        <span className="dr-svc-dash__spark-label">Cost per booked inspection, last 30 days</span>
      </div>

      <div className="dr-svc-dash__sources">
        {SOURCES.map((s, i) => (
          <div key={s.label} className="dr-svc-dash__source">
            <span className="dr-svc-dash__source-label">{s.label}</span>
            <div className="dr-svc-dash__source-track">
              <motion.div
                className="dr-svc-dash__source-fill"
                style={{ background: i === 0 ? accent : `color-mix(in srgb, ${accent} 35%, transparent)` }}
                initial={reduced ? false : { width: 0 }}
                animate={{ width: `${s.share}%` }}
                transition={{ duration: dur.slow, ease: ease.outExpo, delay: 0.6 + i * 0.15 }}
              />
            </div>
            <span className="dr-svc-dash__source-share">{s.share}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
