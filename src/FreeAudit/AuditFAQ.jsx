import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconChevronDown } from '@tabler/icons-react';
import { ease, dur } from '../motion/motion-config.js';

const FAQ = [
  {
    q: 'Is this actually free?',
    a: 'Yes. No credit card. No commitment. The audit call is completely free. We do it because we believe that if we show you what is broken, you will want us to fix it. If not, you still leave with real findings you can act on.',
  },
  {
    q: 'How long is the call?',
    a: '15 minutes. We respect your time. We get straight to the point and tell you exactly what we found.',
  },
  {
    q: 'Do I need to prepare anything?',
    a: 'Nothing. Just show up to the call. Our specialist will guide you through what screenshots or access we need during the call itself.',
  },
  {
    q: 'What happens after the audit?',
    a: 'Within 24 hours you receive a written audit report covering everything we discussed on the call: what is working, what is broken, and what we recommend fixing first.',
  },
  {
    q: 'Is there a sales pitch on the call?',
    a: 'No. The call is 15 minutes and focused entirely on your account. If you want to work with us after, that is a separate conversation.',
  },
];

function FAQItem({ q, a, isOpen, onToggle, id }) {
  return (
    <div className={`dr-fa-faq__item ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="dr-fa-faq__q"
        aria-expanded={isOpen}
        aria-controls={`faq-${id}`}
        onClick={onToggle}
      >
        <span className="dr-fa-faq__q-mark" aria-hidden="true">Q.</span>
        <span className="dr-fa-faq__q-text">{q}</span>
        <motion.span
          className="dr-fa-faq__chevron"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: dur.base, ease: ease.outExpo }}
          aria-hidden="true"
        >
          <IconChevronDown size={22} stroke={1.75} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-${id}`}
            className="dr-fa-faq__a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: dur.base, ease: ease.outExpo }}
          >
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AuditFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="dr-fa-faq">
      <div className="dr-container">
        <header className="dr-fa-section-head">
          <h2 className="dr-fa-section-h2">Everything you need to know.</h2>
        </header>

        <div className="dr-fa-faq__list">
          {FAQ.map((f, i) => (
            <FAQItem
              key={f.q}
              id={i}
              q={f.q}
              a={f.a}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
