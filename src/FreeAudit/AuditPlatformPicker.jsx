import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { IconBrandGoogle, IconBrandMeta, IconInfinity, IconCheck, IconArrowRight } from '@tabler/icons-react';
import StaggerIn, { StaggerItem } from '../motion/StaggerIn.jsx';
import { captureAuditPick } from '../lib/leads.js';

const PLATFORMS = [
  { id: 'google', name: 'Google Ads', blurb: 'High-intent leads searching for a roofer right now.',  Icon: IconBrandGoogle },
  { id: 'meta',   name: 'Meta Ads',   blurb: 'Storm-season demand creation + retargeting.',          Icon: IconBrandMeta },
  { id: 'both',   name: 'Both',       blurb: 'Full-funnel: capture searches + create demand.',       Icon: IconInfinity },
];

const AuditPlatformPicker = forwardRef(function AuditPlatformPicker({ selected, onSelect }, ref) {
  const handleSelect = (platformId) => {
    onSelect(platformId);
    // Fire-and-forget: track the pick in Supabase. Failure is silent.
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    captureAuditPick({
      platform: platformId,
      attribution: {
        utm_source: params.get('utm_source') || null,
        utm_content: params.get('utm_content') || null,
        referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      },
    });
  };

  return (
    <section ref={ref} id="picker" className="dr-fa-picker">
      <div className="dr-container">
        <header className="dr-fa-section-head is-centered">
          <h2 className="dr-fa-section-h2">What should we audit?</h2>
          <p className="dr-fa-section-sub">
            Pick one. We tailor the 15-minute review to the channel you actually run.
          </p>
        </header>

        <StaggerIn className="dr-fa-picker__grid" staggerChildren={0.1}>
          {PLATFORMS.map((p) => {
            const active = selected === p.id;
            return (
              <StaggerItem key={p.id}>
                <motion.button
                  type="button"
                  className={`dr-fa-picker__card ${active ? 'is-active' : ''}`}
                  aria-pressed={active}
                  onClick={() => handleSelect(p.id)}
                  whileHover={{ y: -4 }}
                  whileTap={{ y: 2, scale: 0.985 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <span className="dr-fa-picker__icon">
                    <p.Icon size={36} stroke={1.75} aria-hidden="true" />
                  </span>
                  <span className="dr-fa-picker__name">{p.name}</span>
                  <span className="dr-fa-picker__blurb">{p.blurb}</span>
                  <span className="dr-fa-picker__state">
                    {active ? (
                      <>
                        <IconCheck size={16} stroke={2.25} />
                        <span>Selected</span>
                      </>
                    ) : (
                      <>
                        <span>Choose</span>
                        <IconArrowRight size={16} stroke={2} />
                      </>
                    )}
                  </span>
                </motion.button>
              </StaggerItem>
            );
          })}
        </StaggerIn>
      </div>
    </section>
  );
});

export default AuditPlatformPicker;
