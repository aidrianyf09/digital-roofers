import { motion, useReducedMotion } from 'motion/react';

/**
 * Social Media Management. A 3x3 cadence grid; cells pulse in a weekly
 * rhythm to evoke consistent posting. Not an Instagram clone; no usernames,
 * no platform chrome. Just the rhythm.
 */
const PATTERN = [2, 1, 0, 1, 2, 1, 0, 1, 2]; // intensity per cell, 0..2

export default function FeedGridArtifact({ accent }) {
  const reduced = useReducedMotion();
  return (
    <div className="dr-svc-artifact dr-svc-artifact--feed-grid" aria-hidden="true">
      <span className="dr-svc-feed-grid__caption" style={{ color: accent }}>
        Weekly rhythm.
      </span>

      <div className="dr-svc-feed-grid__grid">
        {PATTERN.map((intensity, i) => {
          const base = intensity === 2
            ? accent
            : intensity === 1
            ? `color-mix(in srgb, ${accent} 45%, transparent)`
            : `color-mix(in srgb, ${accent} 12%, transparent)`;
          return (
            <motion.div
              key={i}
              className="dr-svc-feed-grid__cell"
              style={{ background: base }}
              initial={reduced ? false : { opacity: 0, scale: 0.92 }}
              animate={reduced ? { opacity: 1, scale: 1 } : {
                opacity: [0.55, 1, 0.55],
                scale: [0.98, 1, 0.98],
              }}
              transition={reduced ? undefined : {
                duration: 3.2,
                repeat: Infinity,
                delay: i * 0.18,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </div>

      <div className="dr-svc-feed-grid__weekdays">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
    </div>
  );
}
