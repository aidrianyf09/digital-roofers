import { motion } from 'motion/react';
import Button from '../../components/ui/Button.jsx';
import MagneticCTA from '../../motion/MagneticCTA.jsx';
import WordReveal from '../../motion/WordReveal.jsx';
import { ease, dur, inViewDefaults } from '../../motion/motion-config.js';

const ESTIMATOR_PATH = '/revenue-estimator';
const EMAIL = 'office@strongbrandsunited.com';

export default function ServiceCTA({ service }) {
  return (
    <section className="dr-svc-cta" style={{ '--svc-accent': service.accent }}>
      <div className="dr-container dr-svc-cta__inner">
        <motion.span
          className="dr-svc-cta__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewDefaults}
          transition={{ duration: dur.base, ease: ease.outExpo }}
        >
          Book a 15-minute call. No pitch.
        </motion.span>

        <WordReveal
          text={`Let's see if ${service.name} is the right move for you.`}
          as="h2"
          className="dr-svc-cta__h2"
          stagger={0.04}
        />

        <motion.p
          className="dr-svc-cta__lede"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewDefaults}
          transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.2 }}
        >
          We'll walk through your current setup, your goals, and tell you which tier fits.
          Or whether you should hold off. Straight answers, no slides.
        </motion.p>

        <motion.div
          className="dr-svc-cta__actions"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewDefaults}
          transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.32 }}
        >
          <MagneticCTA strength={0.3} radius={120}>
            <Button to={ESTIMATOR_PATH} variant="urgency" size="lg">
              Book a strategy call
            </Button>
          </MagneticCTA>
          <span className="dr-svc-cta__micro">
            Prefer email?{' '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
