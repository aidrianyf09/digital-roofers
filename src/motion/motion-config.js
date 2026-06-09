/**
 * Shared motion config. Easings/durations align with --ease-* and --dur-* CSS tokens.
 */
export const ease = {
  outExpo:  [0.16, 1, 0.3, 1],
  outQuart: [0.25, 1, 0.5, 1],
  spring:   [0.5, 1.5, 0.7, 1],
};

export const dur = {
  fast: 0.16,
  base: 0.32,
  slow: 0.64,
};

export const inViewDefaults = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -10% 0px',
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.outExpo } },
};

export const staggerContainer = (delayChildren = 0, staggerChildren = 0.08) => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});
