import { motion } from 'motion/react';
import CountUp from '../../motion/CountUp.jsx';
import { ease, dur } from '../../motion/motion-config.js';

/**
 * Statement-piece number. One oversized figure in Inter 900 with a Georgia
 * italic annotation underneath. Replaces the 3-up hero-metric block per the
 * brand-author sign-off on the editorial pivot.
 *
 * Component name preserved as StatsMarquee for import-path compatibility.
 */
export default function StatsMarquee() {
  return (
    <section className="dr-statement" aria-label="By the numbers">
      <div className="dr-container">
        <figure className="dr-statement__inner">
          <motion.span
            className="dr-statement__figure"
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: dur.slow, ease: ease.outExpo }}
          >
            <CountUp
              to={2.4}
              prefix="$"
              suffix="M"
              duration={1.6}
              format={(v) => v.toFixed(1)}
            />
          </motion.span>

          <motion.figcaption
            className="dr-statement__annotation"
            initial={{ opacity: 0, transform: 'translateY(12px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: dur.slow, ease: ease.outExpo, delay: 0.25 }}
          >
            in tracked roofing revenue for Florida operators.
            That includes 180 roofs sold and 1,200 inbound leads we can name.
          </motion.figcaption>
        </figure>
      </div>
    </section>
  );
}
