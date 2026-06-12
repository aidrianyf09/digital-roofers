import { motion } from 'motion/react';
import { ease, dur, inViewDefaults } from '../../motion/motion-config.js';

export default function Wedge({ service }) {
  return (
    <section className="dr-svc-wedge">
      <div className="dr-container">
        <motion.p
          className="dr-svc-wedge__copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewDefaults}
          transition={{ duration: dur.slow, ease: ease.outExpo }}
        >
          {service.wedge}
        </motion.p>
      </div>
    </section>
  );
}
