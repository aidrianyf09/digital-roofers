import { motion } from 'motion/react';
import WordReveal from '../motion/WordReveal.jsx';
import MagneticCTA from '../motion/MagneticCTA.jsx';
import AIImagePlate from '../motion/AIImagePlate.jsx';
import Marquee from '../motion/Marquee.jsx';
import Button from '../components/ui/Button.jsx';
import { ease, dur } from '../motion/motion-config.js';

const TRUST = ['15 MINUTES', 'NO OBLIGATION', 'LIVE WITH A SPECIALIST', 'FREE AUDIT', 'NO PITCH'];

export default function AuditHero({ onBookClick }) {
  return (
    <section className="dr-fa-hero">
      <div className="dr-container dr-fa-hero__grid">
        <div className="dr-fa-hero__copy">
          <motion.span
            className="dr-fa-hero__eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur.base, ease: ease.outExpo }}
          >
            Free Live Ads Audit
          </motion.span>

          <h1 className="dr-fa-hero__h1">
            <span className="dr-fa-hero__h1-line">
              <WordReveal text="Find Out Exactly What Is" as="span" stagger={0.05} delay={0.1} />
            </span>
            <span className="dr-fa-hero__h1-line">
              <WordReveal
                text="Costing You Roofing Leads"
                as="span"
                highlight="Costing"
                stagger={0.05}
                delay={0.45}
              />
            </span>
          </h1>

          <motion.p
            className="dr-fa-hero__body"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.8 }}
          >
            Book a free 15-minute call with our ads specialist. We review your current
            Google Ads, Meta Ads, and website live on the call, then tell you exactly
            what to fix. No pitch. Just findings.
          </motion.p>

          <motion.div
            className="dr-fa-hero__cta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.95 }}
          >
            <MagneticCTA strength={0.3} radius={120}>
              <Button onClick={onBookClick} variant="primary" size="lg">
                Book My Free Audit
              </Button>
            </MagneticCTA>
          </motion.div>
        </div>

        <motion.aside
          className="dr-fa-hero__visual"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.slow, ease: ease.outExpo, delay: 0.35 }}
        >
          <AIImagePlate
            src="/imagery/audit-hero/owner-laptop.webp"
            alt="Roofing-business owner reviewing a Google Ads dashboard on a laptop."
            ratio="5 / 6"
            kenBurns
            reveal={false}
            className="dr-fa-hero__plate"
          />
        </motion.aside>
      </div>

      <div className="dr-fa-hero__trust" aria-label="Why book a free audit">
        <Marquee speed={0.7}>
          {TRUST.map((t, i) => (
            <span key={i} className="dr-fa-hero__trust-item">
              <span>{t}</span>
              <span className="dr-fa-hero__trust-dot" aria-hidden="true">•</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
