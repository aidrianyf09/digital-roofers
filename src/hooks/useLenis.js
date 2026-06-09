import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Initialise Lenis smooth scroll once at the app root.
 * Auto-disables for reduce-motion users and on touch devices (where native scroll is preferable).
 */
export function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (reduced || touch) return;

    const lenis = new Lenis({
      duration: 1.0,
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.1,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}
