import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import StaggerIn, { StaggerItem } from '../motion/StaggerIn.jsx';

const STEPS = [
  { num: '01', title: 'We ask the right questions', body: 'Understanding your goals, market, and what you have tried before.' },
  { num: '02', title: 'We look at your ads live',  body: 'Screenshots of your current campaigns, targeting, spend, and results.' },
  { num: '03', title: 'We identify the gaps',      body: 'What is wasting your budget and what opportunities you are missing.' },
  { num: '04', title: 'You get the full report',   body: 'Written audit report delivered within 24 hours after the call.' },
];

export default function AuditSteps() {
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start 80%', 'end 20%'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="dr-fa-steps">
      <div className="dr-container">
        <header className="dr-fa-section-head">
          <span className="dr-eyebrow">
            <span className="dr-eyebrow__num">01</span>
            <span className="dr-eyebrow__sep">/</span>
            What To Expect
          </span>
          <h2 className="dr-fa-section-h2">
            A real audit. <span className="dr-fa-accent">Not a sales pitch.</span>
          </h2>
          <p className="dr-fa-section-sub">
            Most agencies give you a watered-down PDF and call it an audit. This is
            different. You get on a live call with our specialist, we look at your
            account together, and you leave knowing exactly what is broken and what
            it is costing you.
          </p>
        </header>

        <div className="dr-fa-steps__timeline" ref={wrapRef}>
          <div className="dr-fa-steps__rail" aria-hidden="true">
            <motion.span className="dr-fa-steps__rail-fill" style={{ height: lineHeight }} />
          </div>
          <StaggerIn className="dr-fa-steps__list" as="ol" staggerChildren={0.12}>
            {STEPS.map((s) => (
              <StaggerItem key={s.num} as="li" className="dr-fa-step">
                <div className="dr-fa-step__num-wrap" aria-hidden="true">
                  <span className="dr-fa-step__num">{s.num}</span>
                </div>
                <div className="dr-fa-step__body">
                  <h3 className="dr-fa-step__title">{s.title}</h3>
                  <p className="dr-fa-step__desc">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerIn>
        </div>
      </div>
    </section>
  );
}
