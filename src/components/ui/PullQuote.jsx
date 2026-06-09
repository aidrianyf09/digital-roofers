import { motion } from 'motion/react';
import { ease, dur } from '../../motion/motion-config.js';

/**
 * Editorial pull-quote: oversized Georgia italic, centered, with hairline rules
 * flanking it. Use sparingly — max 3 per page.
 */
export default function PullQuote({ children, className = '' }) {
  return (
    <motion.figure
      className={`dr-pull-quote ${className}`.trim()}
      initial={{ opacity: 0, transform: 'translateY(16px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: dur.slow, ease: ease.outExpo }}
    >
      <blockquote className="dr-pull-quote__text">
        &ldquo;{children}&rdquo;
      </blockquote>
    </motion.figure>
  );
}
