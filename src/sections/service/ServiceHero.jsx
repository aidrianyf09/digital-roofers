import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import MagneticCTA from '../../motion/MagneticCTA.jsx';
import Button from '../../components/ui/Button.jsx';
import WordReveal from '../../motion/WordReveal.jsx';
import { ease, dur } from '../../motion/motion-config.js';
import { getArtifact } from './artifacts/index.js';

const ESTIMATOR_PATH = '/revenue-estimator';

export default function ServiceHero({ service }) {
  const Artifact = getArtifact(service.artifactKey);
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const artifactY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const dotsY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  return (
    <section ref={ref} className="dr-svc-hero" style={{ '--svc-accent': service.accent }}>
      <motion.div
        className="dr-svc-hero__dots"
        aria-hidden="true"
        style={reduced ? undefined : { y: dotsY }}
      />
      <div className="dr-container dr-svc-hero__grid">
        <div className="dr-svc-hero__copy">
          <motion.span
            className="dr-svc-hero__eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur.base, ease: ease.outExpo }}
          >
            <span className="dr-svc-hero__eyebrow-tick" aria-hidden="true" />
            <span className="dr-svc-hero__eyebrow-num">{service.num}</span>
            <span className="dr-svc-hero__eyebrow-sep">/</span>
            <span>{service.tag}</span>
          </motion.span>

          <h1 className="dr-svc-hero__h1">
            <WordReveal text={service.hero.headline} as="span" stagger={0.035} delay={0.15} />
          </h1>

          <motion.p
            className="dr-svc-hero__sub"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.55 }}
          >
            {service.hero.sub}
          </motion.p>

          <motion.div
            className="dr-svc-hero__cta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.75 }}
          >
            <MagneticCTA strength={0.3} radius={120}>
              <Button to={ESTIMATOR_PATH} variant="primary" size="lg">
                Book a strategy call
              </Button>
            </MagneticCTA>
            <span className="dr-svc-hero__cta-meta">15 minutes. No pitch.</span>
          </motion.div>
        </div>

        <motion.aside
          className="dr-svc-hero__visual"
          style={reduced ? undefined : { y: artifactY }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.slow, ease: ease.outExpo, delay: 0.4 }}
        >
          <Artifact accent={service.accent} iconKey={service.iconKey} name={service.name} />
        </motion.aside>
      </div>
    </section>
  );
}
