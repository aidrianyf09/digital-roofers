import { motion } from 'motion/react';
import WordReveal from '../motion/WordReveal.jsx';
import MagneticCTA from '../motion/MagneticCTA.jsx';
import Button from '../components/ui/Button.jsx';
import { ease, dur } from '../motion/motion-config.js';

export default function AuditFinalCTA({ onBookClick }) {
  return (
    <section className="dr-fa-final">
      <div className="dr-container dr-fa-final__inner">
        <motion.span
          className="dr-fa-final__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: dur.base, ease: ease.outExpo }}
        >
          Free Audit · 5 Spots / Week · No Pitch
        </motion.span>

        <h2 className="dr-fa-final__h2">
          <span className="dr-fa-final__h2-line">
            <WordReveal text="Ready to Find Out What Is" as="span" stagger={0.04} />
          </span>
          <span className="dr-fa-final__h2-line">
            <WordReveal
              text="Costing You Leads?"
              as="span"
              highlight="Costing"
              stagger={0.04}
              delay={0.3}
            />
          </span>
        </h2>

        <motion.p
          className="dr-fa-final__body"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.5 }}
        >
          Book your free 15-minute audit call now. Spots are limited to 5 per week.
        </motion.p>

        <motion.div
          className="dr-fa-final__cta"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.62 }}
        >
          <MagneticCTA strength={0.3} radius={120}>
            <Button onClick={onBookClick} variant="urgency" size="lg">
              Book My Free Audit
            </Button>
          </MagneticCTA>
          <span className="dr-fa-final__meta">15 Minutes · Free · No Obligation</span>
        </motion.div>
      </div>
    </section>
  );
}
