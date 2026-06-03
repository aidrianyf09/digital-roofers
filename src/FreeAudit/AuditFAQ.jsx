import { useState, useRef, useEffect } from 'react';
import { ChevronIcon } from './Icons.jsx';

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
  const bodyRef = useRef(null);
  const [maxH, setMaxH] = useState(0);

  useEffect(() => {
    if (!bodyRef.current) return;
    setMaxH(isOpen ? bodyRef.current.scrollHeight : 0);
  }, [isOpen]);

  return (
    <div className={`audit-faq-item${isOpen ? ' is-open' : ''}`}>
      <button
        type="button"
        className="audit-faq-q"
        aria-expanded={isOpen}
        aria-controls={`faq-${id}`}
        onClick={onToggle}
      >
        <span className="display audit-faq-q-text">{q}</span>
        <span className="audit-faq-chevron" aria-hidden="true">
          <ChevronIcon size={22} />
        </span>
      </button>
      <div
        id={`faq-${id}`}
        className="audit-faq-a"
        style={{ maxHeight: `${maxH}px` }}
        ref={bodyRef}
      >
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function AuditFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="audit-faq">
      <div className="wrap">
        <header className="audit-section-head">
          <h2 className="display audit-section-h2 r-up">
            Everything you need to know.
          </h2>
        </header>

        <div className="audit-faq-list r-up d1">
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
