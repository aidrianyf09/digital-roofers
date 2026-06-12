import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { IconArrowRight } from '@tabler/icons-react';
import { getRelatedServices } from '../../data/services.js';
import { ease, dur, inViewDefaults } from '../../motion/motion-config.js';

/**
 * Mini-stack diagram. Shows the chain of services that compound.
 */
export default function Stack({ service }) {
  const related = getRelatedServices(service.stack.services);
  const chain = [service, ...related];

  return (
    <section className="dr-svc-stack">
      <div className="dr-container">
        <h2 className="dr-svc-stack__h2">{service.name} compounds.</h2>
        <p className="dr-svc-stack__lede">{service.stack.outcome}</p>

        <motion.div
          className="dr-svc-stack__chain"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewDefaults}
          transition={{ duration: dur.slow, ease: ease.outExpo }}
        >
          {chain.map((s, i) => (
            <div key={s.slug} className="dr-svc-stack__node-wrap">
              <Link
                to={i === 0 ? '#' : `/services/${s.slug}`}
                className={`dr-svc-stack__node ${i === 0 ? 'is-current' : ''}`}
                style={{ '--node-accent': s.accent }}
                onClick={i === 0 ? (e) => e.preventDefault() : undefined}
              >
                <span className="dr-svc-stack__node-num">{s.num}</span>
                <span className="dr-svc-stack__node-name">{s.name}</span>
                {i === 0 && <span className="dr-svc-stack__node-flag">You are here</span>}
              </Link>
              {i < chain.length - 1 && (
                <IconArrowRight size={20} stroke={1.75} className="dr-svc-stack__arrow" aria-hidden="true" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
