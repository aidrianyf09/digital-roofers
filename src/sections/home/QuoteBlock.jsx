import Quote from '../../components/ui/Quote.jsx';
import { motion } from 'motion/react';
import { ease, dur } from '../../motion/motion-config.js';

export default function QuoteBlock() {
  return (
    <section className="dr-quote-section" aria-label="Client voice">
      <div className="dr-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: dur.slow, ease: ease.outExpo }}
        >
          <Quote
            attribution="Roofing Company Owner"
            role="Tampa, FL · Placeholder testimonial"
          >
            They actually showed up with the numbers — not a sales deck. Five
            pillars, side-by-side with three competitors, and a 90-day plan I
            could hand to my team on day one.
          </Quote>
        </motion.div>
      </div>
    </section>
  );
}
