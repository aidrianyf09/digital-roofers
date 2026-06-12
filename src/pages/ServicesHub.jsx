import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { IconArrowRight } from '@tabler/icons-react';
import Nav from '../components/layout/Nav.jsx';
import Footer from '../components/layout/Footer.jsx';
import SectionDivider from '../components/layout/SectionDivider.jsx';
import WordReveal from '../motion/WordReveal.jsx';
import StaggerIn, { StaggerItem } from '../motion/StaggerIn.jsx';
import ServiceCTA from '../sections/service/ServiceCTA.jsx';
import { SERVICES, SERVICE_PILLARS } from '../data/services.js';
import { SERVICE_ICONS } from '../sections/service/icons.js';
import { ease, dur, inViewDefaults } from '../motion/motion-config.js';

/**
 * /services hub — sequencing diagram, not a card grid.
 * "Roofers don't need 10 tools. They need a sequence that compounds."
 */
export default function ServicesHub() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ctaService = SERVICES[0]; // Google Ads accent for the hub CTA

  return (
    <>
      <Nav />
      <main className="dr-hub">
        <section className="dr-hub__hero">
          <div className="dr-container">
            <motion.span
              className="dr-hub__eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur.base, ease: ease.outExpo }}
            >
              What we build
            </motion.span>

            <h1 className="dr-hub__h1">
              <WordReveal
                text="Roofers don't need 10 tools."
                as="span"
                stagger={0.04}
                delay={0.1}
              />
              <br />
              <WordReveal
                text="They need a sequence that compounds."
                as="span"
                stagger={0.04}
                delay={0.5}
                highlight="compounds."
                mode="letters"
              />
            </h1>

            <motion.p
              className="dr-hub__sub"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur.base, ease: ease.outExpo, delay: 1.0 }}
            >
              Foundation → Demand → Conversion → Insight. Each service stacks on the one
              before. Pick where you are.
            </motion.p>
          </div>
        </section>

        <section className="dr-hub__pillars">
          <div className="dr-container">
            <SectionDivider letter="A" label="The sequence" />

            <div className="dr-hub__pillars-grid">
              {SERVICE_PILLARS.map((pillar, pIdx) => (
                <motion.div
                  key={pillar.key}
                  className="dr-hub__pillar"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inViewDefaults}
                  transition={{ duration: dur.slow, ease: ease.outExpo, delay: pIdx * 0.08 }}
                >
                  <div className="dr-hub__pillar-head">
                    <span className="dr-hub__pillar-step">0{pIdx + 1}</span>
                    <h2 className="dr-hub__pillar-label">{pillar.label}</h2>
                    <p className="dr-hub__pillar-blurb">{pillar.blurb}</p>
                  </div>

                  <ul className="dr-hub__pillar-services">
                    {pillar.services.map((slug) => {
                      const svc = SERVICES.find((s) => s.slug === slug);
                      if (!svc) return null;
                      const Icon = SERVICE_ICONS[svc.iconKey];
                      return (
                        <li key={slug}>
                          <Link
                            to={`/services/${slug}`}
                            className="dr-hub__service"
                            style={{ '--svc-accent': svc.accent }}
                          >
                            <span className="dr-hub__service-icon">
                              {Icon && <Icon size={20} stroke={1.75} />}
                            </span>
                            <span className="dr-hub__service-name">{svc.name}</span>
                            <IconArrowRight size={16} stroke={1.75} className="dr-hub__service-arrow" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="dr-hub__index">
          <div className="dr-container">
            <h2 className="dr-hub__index-h2">Every service we ship.</h2>

            <StaggerIn as="ol" className="dr-hub__index-list" staggerChildren={0.04}>
              {SERVICES.map((svc) => (
                <StaggerItem key={svc.slug} as="li" className="dr-hub__index-row">
                  <Link
                    to={`/services/${svc.slug}`}
                    className="dr-hub__index-link"
                    style={{ '--svc-accent': svc.accent }}
                  >
                    <span className="dr-hub__index-num">{svc.num}</span>
                    <span className="dr-hub__index-name">{svc.name}</span>
                    <span className="dr-hub__index-tag">{svc.tag}</span>
                    <span className="dr-hub__index-arrow" aria-hidden="true">
                      <IconArrowRight size={18} stroke={1.5} />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerIn>
          </div>
        </section>

        <ServiceCTA service={ctaService} />
      </main>
      <Footer />
    </>
  );
}
