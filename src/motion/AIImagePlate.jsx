import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { IconPhotoOff } from '@tabler/icons-react';
import { ease, dur } from './motion-config.js';
import { useImageForSlot } from '../lib/imagery.js';

/**
 * Image plate. Resolution priority for what gets rendered:
 *   1. Admin-uploaded image at the given `slot` (Supabase).
 *   2. The `src` prop (static path under public/imagery/).
 *   3. Light Gray placeholder with photo-off glyph.
 *
 * Anything that 404s gracefully falls through to the next layer — no broken
 * image icons, no JSX errors. Drop a file via the admin OR drop one into
 * public/imagery/; whichever exists wins.
 */
export default function AIImagePlate({
  slot,
  src,
  alt = '',
  kenBurns = true,
  reveal = true,
  ratio = '4 / 5',
  className = '',
  style,
}) {
  const reduced = useReducedMotion();
  const [hasError, setHasError] = useState(false);

  // 1) Supabase admin upload takes priority.
  const supaImage = useImageForSlot(slot);
  const resolvedSrc = (supaImage?.public_url) || (!hasError ? src : null);
  const resolvedAlt = supaImage?.alt || alt;
  const showImage = !!resolvedSrc;
  const showKenBurns = kenBurns && !reduced && showImage;

  const wrapperVariants = reveal && !reduced
    ? {
        hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0.6 },
        visible: { clipPath: 'inset(0 0 0 0)', opacity: 1, transition: { duration: dur.base, ease: ease.outExpo } },
      }
    : undefined;

  return (
    <motion.figure
      className={`dr-image-plate ${showImage ? '' : 'is-empty'} ${className}`.trim()}
      style={{ aspectRatio: ratio, ...style }}
      variants={wrapperVariants}
      initial={wrapperVariants ? 'hidden' : false}
      whileInView={wrapperVariants ? 'visible' : undefined}
      viewport={{ once: true, amount: 0.3 }}
    >
      {showImage ? (
        <motion.img
          key={resolvedSrc}
          src={resolvedSrc}
          alt={resolvedAlt}
          className="dr-image-plate__img"
          loading="lazy"
          onError={() => setHasError(true)}
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
