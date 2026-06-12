import { motion, useReducedMotion } from 'motion/react';
import { ease } from '../../../motion/motion-config.js';
import { SERVICE_ICONS } from '../icons.js';

/**
 * Fallback hero artifact for services without a custom kinetic motif yet.
 * Quiet, accent-colored card with the service icon and a subtle pulse — sets
 * the tone without competing with the headline.
 */
export default function DefaultArtifact({ accent, iconKey, name }) {
  const Icon = SERVICE_ICONS[iconKey];
  const reduced = useReducedMotion();
  return (
    <div className="dr-svc-artifact dr-svc-artifact--default" aria-hidden="true">
      <motion.div
        className="dr-svc-default__plate"
        style={{ borderColor: accent }}
        initial={reduced ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: ease.outExpo }}
      >
        <motion.div
          className="dr-svc-default__glow"
          style={{ background: `radial-gradient(circle, ${accent}33 0%, transparent 70%)` }}
          animate={reduced ? { opacity: 0.5 } : { opacity: [0.4, 0.8, 0.4] }}
          transition={reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {Icon && <Icon size={64} stroke={1.25} style={{ color: accent }} />}
        <span className="dr-svc-default__label">{name}</span>
      </motion.div>
    </div>
  );
}
