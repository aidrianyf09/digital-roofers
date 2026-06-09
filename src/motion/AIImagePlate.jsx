import { motion, useReducedMotion } from 'motion/react';
import { IconPhotoOff } from '@tabler/icons-react';
import { ease, dur } from './motion-config.js';

/**
 * Image plate. When `src` is set, renders the image with optional Ken Burns drift.
 * When `src` is absent, renders an honest Light Gray placeholder with a photo-off
 * glyph. No grain, no slot label, no fake-screenshot tells.
 */
export default function AIImagePlate({
  src,
  alt = '',
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
        visible: { clipPath: 'inset(0 0 0 0)', opacity: 1, transition: { duration: dur.base, ease: ease.outExpo } },
      }
    : undefined;

  return (
    <motion.figure
      className={`dr-image-plate ${src ? '' : 'is-empty'} ${className}`.trim()}
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
          animate={showKenBurns ? { scale: 1.06 } : undefined}
          transition={showKenBurns ? { duration: 20, ease: 'easeInOut' } : undefined}
        />
      ) : (
        <div className="dr-image-plate__empty">
          <IconPhotoOff size={32} stroke={1.5} aria-hidden="true" />
          <span className="dr-visually-hidden">Image pending.</span>
        </div>
      )}
    </motion.figure>
  );
}
