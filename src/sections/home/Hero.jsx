import { motion } from 'motion/react';
import WordReveal from '../../motion/WordReveal.jsx';
import MagneticCTA from '../../motion/MagneticCTA.jsx';
import Button from '../../components/ui/Button.jsx';
import FloridaMap from '../../components/map/FloridaMap.jsx';
import { ease, dur } from '../../motion/motion-config.js';

const ESTIMATOR_PATH = '/revenue-estimator';

export default function Hero() {
  return (
    <section className="dr-hero">
      <div className="dr-container dr-hero__grid">
        <div className="dr-hero__copy">
          <motion.span
            className="dr-hero__eyebrow"
            initial={{ opacity: 0, transform: 'translateY(12px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: dur.base, ease: ease.outExpo }}
          >
            Florida Roofers <span className="dr-hero__eyebrow-sep">/</span> By SBU
          </motion.span>

          <h1 className="dr-hero__h1">
            <span className="dr-hero__h1-line">
              <WordReveal
                text="Stop Chasing Leads."
                as="span"
                stagger={0.05}
                delay={0.1}
              />
            </span>
            <span className="dr-hero__h1-line">
              <WordReveal
                text="Start Closing Roofs."
                as="span"
                highlight="Roofs."
                mode="letters"
                stagger={0.05}
                delay={0.45}
              />
            </span>
          </h1>

          <motion.p
            className="dr-hero__sub"
            initial={{ opacity: 0, transform: 'translateY(12px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.6 }}
          >
            Marketing that actually moves the needle for Florida roofers.
            Data-driven strategy, executed end-to-end. No fluff, no theory.
            Just what works.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, transform: 'translateY(12px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.75 }}
            className="dr-hero__cta"
          >
            <MagneticCTA strength={0.3} radius={120}>
              <Button to={ESTIMATOR_PATH} variant="primary" size="lg">
                Let&apos;s talk roofs
              </Button>
            </MagneticCTA>
            <span className="dr-hero__cta-meta">15 minutes. No pitch.</span>
          </motion.div>
        </div>

        <motion.aside
          className="dr-hero__visual"
          initial={{ opacity: 0, transform: 'translateY(32px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: dur.slow, ease: ease.outExpo, delay: 0.35 }}
        >
          <FloridaMap />
        </motion.aside>
      </div>
    </section>
  );
}
