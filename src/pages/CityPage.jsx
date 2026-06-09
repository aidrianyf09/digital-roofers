import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { IconArrowLeft } from '@tabler/icons-react';
import Nav from '../components/layout/Nav.jsx';
import Footer from '../components/layout/Footer.jsx';
import Button from '../components/ui/Button.jsx';
import MagneticCTA from '../motion/MagneticCTA.jsx';
import WordReveal from '../motion/WordReveal.jsx';
import { ease, dur } from '../motion/motion-config.js';
import { getCityBySlug } from '../data/cities.js';

const AUDIT_PATH = '/free-audit';
const ESTIMATOR_PATH = '/revenue-estimator';

export default function CityPage() {
  const { slug } = useParams();
  const city = getCityBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!city) return;
    const previous = document.title;
    document.title = `Roofing Marketing in ${city.name}. Digital Roofers by SBU.`;
    return () => { document.title = previous; };
  }, [city]);

  if (!city) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Nav />
      <main className="dr-city">
        <section className="dr-city__hero">
          <div className="dr-container">
            <motion.div
              className="dr-city__breadcrumb"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: dur.base, ease: ease.outExpo }}
            >
              <Link to="/" className="dr-city__back">
                <IconArrowLeft size={14} stroke={2} aria-hidden="true" />
                Back to the map
              </Link>
            </motion.div>

            <motion.span
              className="dr-city__eyebrow"
              initial={{ opacity: 0, transform: 'translateY(12px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.1 }}
            >
              {city.region}{city.hq ? '. Our HQ.' : '.'}
            </motion.span>

            <h1 className="dr-city__h1">
              <WordReveal
                text={`Roofing marketing in`}
                as="span"
                stagger={0.04}
                delay={0.2}
              />
              <span className="dr-city__h1-city">
                <WordReveal
                  text={`${city.name}.`}
                  as="span"
                  highlight={`${city.name}.`}
                  mode="letters"
                  stagger={0.05}
                  delay={0.55}
                />
              </span>
            </h1>

            <motion.p
              className="dr-city__positioning"
              initial={{ opacity: 0, transform: 'translateY(12px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.9 }}
            >
              {city.positioning}
            </motion.p>

            <motion.p
              className="dr-city__audience"
              initial={{ opacity: 0, transform: 'translateY(12px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: dur.base, ease: ease.outExpo, delay: 1.0 }}
            >
              {city.audience}
            </motion.p>

            <motion.div
              className="dr-city__cta"
              initial={{ opacity: 0, transform: 'translateY(12px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: dur.base, ease: ease.outExpo, delay: 1.15 }}
            >
              <MagneticCTA strength={0.3} radius={120}>
                <Button
                  to={`${AUDIT_PATH}?utm_source=city&utm_content=${city.slug}`}
                  variant="primary"
                  size="lg"
                >
                  Book my free {city.name} audit
                </Button>
              </MagneticCTA>
              <Link to={ESTIMATOR_PATH} className="dr-city__secondary">
                Or estimate the revenue we could unlock
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
