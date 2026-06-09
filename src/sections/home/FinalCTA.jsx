import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import MagneticCTA from '../../motion/MagneticCTA.jsx';
import WordReveal from '../../motion/WordReveal.jsx';
import { ease, dur } from '../../motion/motion-config.js';

const EMAIL = 'office@strongbrandsunited.com';
const ESTIMATOR_PATH = '/revenue-estimator';

export default function FinalCTA() {
  return (
    <section className="dr-final-cta" id="claim">
      <div className="dr-container dr-final-cta__inner">
        <motion.span
          className="dr-final-cta__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: dur.base, ease: ease.outExpo }}
        >
          Book a 15-minute call. No pitch.
        </motion.span>

        <WordReveal
          text="Let's talk roofs. Fifteen minutes, straight to the point."
          as="h2"
          className="dr-final-cta__h2"
          stagger={0.04}
        />

        <motion.p
          className="dr-final-cta__lede"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.2 }}
        >
          Pick a time. We&apos;ll walk through your audit, your competitors, and the 90-day roadmap.
          No slides. No upsell. Just the numbers and what to do next.
        </motion.p>

        <motion.div
          className="dr-final-cta__actions"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.32 }}
        >
          <MagneticCTA strength={0.3} radius={120}>
            <Button to={ESTIMATOR_PATH} variant="urgency" size="lg">
              Let&apos;s talk roofs
            </Button>
          </MagneticCTA>
          <span className="dr-final-cta__micro">
            Prefer email? <Link to="#" onClick={(e) => { e.preventDefault(); window.location.href = `mailto:${EMAIL}`; }}>{EMAIL}</Link>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
