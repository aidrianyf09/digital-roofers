import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import WordReveal from '../../motion/WordReveal.jsx';
import AIImagePlate from '../../motion/AIImagePlate.jsx';
import MagneticCTA from '../../motion/MagneticCTA.jsx';
import Button from '../../components/ui/Button.jsx';
import { ease, dur } from '../../motion/motion-config.js';

const HERO_SERVICES = [
  { num: '01', name: 'Google Ads', tag: 'Paid Search' },
  { num: '02', name: 'Meta Ads', tag: 'Paid Social' },
  { num: '03', name: 'Social Media Management', tag: 'Organic' },
  { num: '04', name: 'Web Design / Web Development', tag: 'Build' },
  { num: '05', name: 'And More!', tag: 'SEO · Email · Branding' },
];

const ESTIMATOR_PATH = '/revenue-estimator';

export default function Hero() {
  const [activeSvc, setActiveSvc] = useState(0);
  const [svcHover, setSvcHover] = useState(false);

  useEffect(() => {
    if (svcHover) return;
    const id = setInterval(() => {
      setActiveSvc((i) => (i + 1) % HERO_SERVICES.length);
    }, 2400);
    return () => clearInterval(id);
  }, [svcHover]);

  return (
    <section className="dr-hero">
      <div className="dr-container dr-hero__grid">
        <div className="dr-hero__copy">
          <motion.span
            className="dr-hero__eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur.base, ease: ease.outExpo }}
          >
            Digital Roofers <span className="dr-hero__eyebrow-sep">/</span> By SBU
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.6 }}
          >
            Marketing that actually moves the needle for Florida roofers.
            Data-driven strategy, executed end-to-end. No fluff, no theory —
            just what works.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.75 }}
            className="dr-hero__cta"
          >
            <MagneticCTA strength={0.3} radius={120}>
              <Button to={ESTIMATOR_PATH} variant="primary" size="lg">
                Let&apos;s talk roofs
              </Button>
            </MagneticCTA>
            <span className="dr-hero__cta-meta">15 min · No pitch · Real numbers</span>
          </motion.div>
        </div>

        <motion.aside
          className="dr-hero__visual"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.slow, ease: ease.outExpo, delay: 0.35 }}
        >
          <AIImagePlate
            slot="hero/owner-dashboard"
            ratio="4 / 5"
            kenBurns
            reveal={false}
            className="dr-hero__plate"
          />
          <div
            className="dr-hero__svc-card"
            onMouseEnter={() => setSvcHover(true)}
            onMouseLeave={() => setSvcHover(false)}
          >
            <div className="dr-hero__svc-head">
              <span className="dr-hero__svc-eyebrow">What We Do</span>
              <span className="dr-tabular">
                {String(activeSvc + 1).padStart(2, '0')} / {String(HERO_SERVICES.length).padStart(2, '0')}
              </span>
            </div>
            <ul className="dr-hero__svc-list" role="list">
              {HERO_SERVICES.map((svc, i) => (
                <li
                  key={svc.name}
                  className={`dr-hero__svc-item ${i === activeSvc ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveSvc(i)}
                >
                  <a href="#services" className="dr-hero__svc-link">
                    <span className="dr-hero__svc-num">{svc.num}</span>
                    <span className="dr-hero__svc-body">
                      <span className="dr-hero__svc-name">{svc.name}</span>
                      <span className="dr-hero__svc-tag">{svc.tag}</span>
                    </span>
                    <span className="dr-hero__svc-arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
