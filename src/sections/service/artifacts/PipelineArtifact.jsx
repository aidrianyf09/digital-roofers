import { motion, useReducedMotion } from 'motion/react';

/**
 * Web Development. Three-node pipeline diagram with a single packet
 * traveling left to right. Abstract: Form, CRM, Dashboard.
 */
const NODES = ['Form', 'CRM', 'Dashboard'];

export default function PipelineArtifact({ accent }) {
  const reduced = useReducedMotion();
  return (
    <div className="dr-svc-artifact dr-svc-artifact--pipeline" aria-hidden="true">
      <span className="dr-svc-pipe__caption" style={{ color: accent }}>
        Nothing falls through.
      </span>

      <div className="dr-svc-pipe__row">
        {NODES.map((label, i) => (
          <div key={label} className="dr-svc-pipe__node-wrap">
            <div className="dr-svc-pipe__node" style={{ borderColor: accent }}>
              <span className="dr-svc-pipe__node-label">{label}</span>
            </div>
            {i < NODES.length - 1 && (
              <div className="dr-svc-pipe__edge">
                <span className="dr-svc-pipe__line" />
                <motion.span
                  className="dr-svc-pipe__packet"
                  style={{ background: accent }}
                  initial={reduced ? false : { x: '-100%' }}
                  animate={reduced ? { x: '100%' } : { x: ['-10%', '110%'] }}
                  transition={reduced ? undefined : {
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
