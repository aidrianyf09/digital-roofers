import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

/**
 * Wraps a child element with pointer-tracked translate within a 60px radius.
 * Falls back to a static wrapper when reduce-motion is preferred.
 */
export default function MagneticCTA({ children, strength = 0.35, radius = 120, className = '' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { duration: 0.5, bounce: 0.15 });
  const sy = useSpring(y, { duration: 0.5, bounce: 0.15 });

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    // Smoothly attenuate displacement based on distance to the magnetic radius.
    // dist = 0 -> full strength, dist >= radius -> zero. No snap-to-zero jump.
    const attenuation = Math.max(0, 1 - dist / radius);
    x.set(dx * strength * attenuation);
    y.set(dy * strength * attenuation);
  };

  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.span>
  );
}
