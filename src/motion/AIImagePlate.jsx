import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from './motion-config.js';

/**
 * Image plate with built-in placeholder for when AI imagery hasn't been generated yet.
 * Pass `src` when the file lands; without it, renders a Sapphire→Teal gradient + grain + slot label.
 * `kenBurns` enables a subtle 1.04× zoom on idle. `reveal` adds a clip-path reveal on enter.
 */
export default function AIImagePlate({
  src,
  alt = '',
  slot,
  kenBurns = true,
  reveal = true,
  ratio = '4 / 5',
  className = '',
  style,
}) {
  const reduced = useReducedMotion();
  const showKenBurns = kenBurns && !reduced && src;

  const wrapperVariants = reveal && !reduced
    ? {
        hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0.6 },
        visible: { clipPath: 'inset(0 0 0 0)', opacity: 1, transition: { duration: dur.slow + 0.2, ease: ease.outExpo } },
      }
    : undefined;

  return (
    <motion.figure
      className={`dr-image-plate ${className}`.trim()}
      style={{ aspectRatio: ratio, ...style }}
      variants={wrapperVariants}
      initial={wrapperVariants ? 'hidden' : false}
      whileInView={wrapperVariants ? 'visible' : undefined}
      viewport={{ once: true, amount: 0.3 }}
    >
      {src ? (
        <motion.img
          src={src}
          alt={alt}
          className="dr-image-plate__img"
          loading="lazy"
          animate={showKenBurns ? { scale: [1, 1.04, 1] } : undefined}
          transition={showKenBurns ? { duration: 16, ease: 'linear', repeat: Infinity } : undefined}
        />
      ) : (
        <div className="dr-image-plate__placeholder" aria-hidden="true">
          <svg className="dr-image-plate__noise" aria-hidden="true">
            <filter id={`dr-noise-${slot || 'x'}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.45 0" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#dr-noise-${slot || 'x'})`} />
          </svg>
          {slot && (
            <span className="dr-image-plate__slot">
              <span className="dr-image-plate__slot-dot" />
              AI · {slot}
            </span>
          )}
        </div>
      )}
    </motion.figure>
  );
}
