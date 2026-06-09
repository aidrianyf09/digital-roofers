import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from 'motion/react';
import { ease } from './motion-config.js';

/**
 * Animates a number from `from` to `to` on view via motion values.
 * No React state updates per frame — the spring writes directly to the DOM text.
 */
export default function CountUp({
  to,
  from = 0,
  duration = 1.4,
  prefix = '',
  suffix = '',
  format,
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const value = useMotionValue(reduced ? to : from);

  const display = useTransform(value, (v) => {
    const formatted = format ? format(v) : Math.round(v).toLocaleString();
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(value, to, { duration, ease: ease.outExpo });
    return () => controls.stop();
  }, [inView, to, value, duration, reduced]);

  return (
    <motion.span ref={ref} className={`dr-tabular ${className}`.trim()}>
      {display}
    </motion.span>
  );
}
