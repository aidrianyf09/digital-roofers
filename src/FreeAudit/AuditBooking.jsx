import { forwardRef, useState, useEffect } from 'react';
import { InlineWidget } from 'react-calendly';

// REPLACE: Swap this URL with Edrian's actual Calendly booking link
const CALENDLY_URL = 'https://calendly.com/digitalroofers/free-audit';

const AuditBooking = forwardRef(function AuditBooking(_props, ref) {
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

  return (
    <section ref={ref} id="booking" className="audit-booking">
      <div className="wrap">
        <header className="audit-section-head audit-section-head--centered">
          <span className="mono audit-eyebrow audit-eyebrow--on-dark r-up">
            Book Your Free Audit
          </span>
          <h2 className="display audit-section-h2 audit-section-h2--on-dark r-up d1">
            15 minutes. Free.<br />No obligation.
          </h2>
          <p className="audit-section-body audit-section-body--on-dark r-up d2">
            Pick a time that works for you. The call is with Edrian, our Google
            and Meta Ads specialist. He has reviewed hundreds of roofing campaigns
            in Florida.
          </p>
        </header>

        <div className="audit-calendly-wrap r-up d3" id="calendly-mount">
          {!failed && (
            <InlineWidget
              url={CALENDLY_URL}
              styles={{ height: '700px', width: '100%' }}
              pageSettings={{
                backgroundColor: 'ffffff',
                primaryColor: '0F3D3E',
                textColor: '08222a',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
              }}
            />
          )}
          {failed && (
            <div className="audit-calendly-fallback">
              <p className="mono audit-calendly-fallback-eyebrow">
                Calendar Not Loading
              </p>
              <p className="audit-calendly-fallback-body">
                Email{' '}
                <a href="mailto:office@strongbrandsunited.com">
                  office@strongbrandsunited.com
                </a>{' '}
                and we will book your free audit call within the same day.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default AuditBooking;
