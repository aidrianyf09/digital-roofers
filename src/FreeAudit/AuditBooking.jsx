import { forwardRef, useState, useEffect } from 'react';
import { InlineWidget } from 'react-calendly';
import { motion } from 'motion/react';
import { IconEdit, IconCalendarEvent } from '@tabler/icons-react';
import { ease, dur } from '../motion/motion-config.js';

const CALENDLY_URL = 'https://calendly.com/office-strongbrandsunited/30min';

const PLATFORM_LABELS = {
  google: 'Google Ads',
  meta: 'Meta Ads',
  both: 'Both Channels',
};

const AuditBooking = forwardRef(function AuditBooking({ selected, onChangeClick }, ref) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const el = document.getElementById('calendly-mount');
      if (el && !el.querySelector('iframe')) {
        setFailed(true);
      }
    }, 6000);
    return () => clearTimeout(t);
  }, []);

  const url = selected
    ? `${CALENDLY_URL}?utm_content=${selected}`
    : CALENDLY_URL;

  return (
    <section ref={ref} id="booking" className="dr-fa-booking">
      <div className="dr-container">
        <header className="dr-fa-section-head is-centered">
          <span className="dr-eyebrow">
            <span className="dr-eyebrow__num">03</span>
            <span className="dr-eyebrow__sep">/</span>
            Book Your Free Audit
          </span>
          <h2 className="dr-fa-section-h2">
            15 minutes. Free. <span className="dr-fa-accent">No obligation.</span>
          </h2>
          <p className="dr-fa-section-sub">
            Pick a time that works for you. The call is with Edrian, our Google and
            Meta Ads specialist. He has reviewed hundreds of roofing campaigns in Florida.
          </p>
        </header>

        {selected && (
          <motion.div
            className="dr-fa-booking__chip-wrap"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur.base, ease: ease.outExpo }}
          >
            <div className="dr-fa-booking__chip">
              <span className="dr-fa-booking__chip-dot" aria-hidden="true" />
              <span>You picked: <strong>{PLATFORM_LABELS[selected]}</strong></span>
              <button type="button" className="dr-fa-booking__chip-change" onClick={onChangeClick}>
                <IconEdit size={14} stroke={2} /> Change
              </button>
            </div>
          </motion.div>
        )}

        <motion.div
          className="dr-fa-booking__card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: dur.slow, ease: ease.outExpo }}
          id="calendly-mount"
        >
          {!failed && (
            <InlineWidget
              url={url}
              styles={{ height: '700px', width: '100%' }}
              pageSettings={{
                backgroundColor: 'ffffff',
                primaryColor: '004B87',
                textColor: '1F2937',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
              }}
            />
          )}
          {failed && (
            <div className="dr-fa-booking__fallback">
              <IconCalendarEvent size={32} stroke={1.75} className="dr-fa-booking__fallback-icon" />
              <p className="dr-fa-booking__fallback-eyebrow">Calendar Not Loading</p>
              <p className="dr-fa-booking__fallback-body">
                Email{' '}
                <a href="mailto:office@strongbrandsunited.com">office@strongbrandsunited.com</a>
                {' '}and we will book your free audit call within the same day.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
});

export default AuditBooking;
