import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { ease } from './motion-config.js';

const cubicBezier = (p1x, p1y, p2x, p2y) => {
  // simple cubic-bezier sampler
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;
  const sample = (t) => {
    let x = t;
    for (let i = 0; i < 6; i++) {
      const cur = ((ax * x + bx) * x + cx) * x - t;
      const der = (3 * ax * x + 2 * bx) * x + cx;
      if (Math.abs(cur) < 1e-4 || der === 0) break;
      x = x - cur / der;
    }
    return ((ay * x + by) * x + cy) * x;
  };
  return sample;
};

const sampler = cubicBezier(...ease.outExpo);

/**
 * Animates a number from `from` to `to` on view. Supports prefix/suffix and formatter.
 */
export default function CountUp({
  to,
  from = 0,
  duration = 1400,
  prefix = '',
  suffix = '',
  format,
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : from);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = sampler(t);
      setValue(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, from, duration, reduced]);

  const display = format ? format(value) : Math.round(value).toLocaleString();
  return (
    <span ref={ref} className={`dr-tabular ${className}`.trim()}>
      {prefix}{display}{suffix}
    </span>
  );
}
