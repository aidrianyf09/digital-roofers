import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import SectionDivider from '../../components/layout/SectionDivider.jsx';
import { ease, dur, inViewDefaults } from '../../motion/motion-config.js';

/**
 * Scroll-driven "how it works" section. Sticky left visual advances as the
 * user scrolls the steps on the right. The visual is a stack of step plates;
 * scroll progress drives which one is opaque.
 */
export default function HowItWorks({ service }) {
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start 70%', 'end 30%'],
  });

  const stepCount = service.steps.length;
  const activeIndex = useTransform(scrollYProgress, (v) => {
    const raw = Math.floor(v * stepCount);
    return Math.max(0, Math.min(stepCount - 1, raw));
  });

  return (
    <section className="dr-svc-how" ref={wrapRef}>
      <div className="dr-container">
        <SectionDivider letter="A" label="How it works for roofers" />

        <div className="dr-svc-how__grid">
          <div className="dr-svc-how__visual">
            <div className="dr-svc-how__stage">
              {service.steps.map((step, i) => (
                <StepPlateAtIndex
                  key={step.n}
                  index={i}
                  step={step}
                  accent={service.accent}
                  active={activeIndex}
                />
              ))}
            </div>
          </div>

          <ol className="dr-svc-how__steps">
            {service.steps.map((step) => (
              <motion.li
                key={step.n}
                className="dr-svc-how__step"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewDefaults}
                transition={{ duration: dur.slow, ease: ease.outExpo }}
              >
                <span className="dr-svc-how__step-num" style={{ color: service.accent }}>{step.n}</span>
                <h3 className="dr-svc-how__step-title">{step.title}</h3>
                <p className="dr-svc-how__step-body">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/**
 * Tiny wrapper that subscribes to the MotionValue and renders the plate only
 * when its index matches the active step. Keeps the parent clean.
 */
function StepPlateAtIndex({ index, step, accent, active }) {
  const opacity = useTransform(active, (v) => (v === index ? 1 : 0));
  const y = useTransform(active, (v) => (v === index ? 0 : 14));
  return (
    <motion.div className="dr-svc-how__plate" style={{ opacity, y, borderColor: accent }} aria-hidden="true">
      <span className="dr-svc-how__plate-num" style={{ color: accent }}>{step.n}</span>
      <div className="dr-svc-how__plate-title">{step.title}</div>
      <div className="dr-svc-how__plate-bars">
        <span className="dr-svc-how__plate-bar" style={{ background: accent }} />
        <span className="dr-svc-how__plate-bar" style={{ width: '70%' }} />
        <span className="dr-svc-how__plate-bar" style={{ width: '55%' }} />
      </div>
    </motion.div>
  );
}
