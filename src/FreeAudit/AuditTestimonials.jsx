import { IconQuote, IconMapPin } from '@tabler/icons-react';
import StaggerIn, { StaggerItem } from '../motion/StaggerIn.jsx';

// REPLACE: Replace placeholder testimonials with real client quotes when available
// REPLACE: Real client names and locations
const QUOTES = [
  {
    quote:
      'We were spending $2,000 a month on Google Ads with nothing to show for it. The audit showed us exactly why. Within 30 days we had 11 qualified leads.',
    name: '[Roofing Company Owner]',
    location: 'Tampa, FL',
    label: 'Google Ads client',
  },
  {
    quote:
      'I was skeptical about another agency. But the free audit was different. They actually showed me what was wrong before asking for anything.',
    name: '[Roofing Company Owner]',
    location: 'Clearwater, FL',
    label: 'Google + Meta client',
  },
  {
    quote:
      'The audit report alone was worth more than what I paid my last agency for a full month of management.',
    name: '[Roofing Company Owner]',
    location: 'St. Petersburg, FL',
    label: 'Starter plan client',
  },
];

export default function AuditTestimonials() {
  return (
    <section className="dr-fa-testimonials">
      <div className="dr-container">
        <header className="dr-fa-section-head">
          <h2 className="dr-fa-section-h2">Results speak louder.</h2>
        </header>

        <StaggerIn className="dr-fa-testimonials__grid" staggerChildren={0.12}>
          {QUOTES.map((q, i) => (
            <StaggerItem key={i} as="figure" className="dr-fa-quote-card">
              <IconQuote size={28} stroke={1.5} className="dr-fa-quote-card__mark" aria-hidden="true" />
              <blockquote className="dr-fa-quote-card__body">{q.quote}</blockquote>
              <figcaption className="dr-fa-quote-card__foot">
                <div className="dr-fa-quote-card__name">{q.name}</div>
                <div className="dr-fa-quote-card__meta">
                  <IconMapPin size={12} stroke={2} aria-hidden="true" />
                  {q.location}
                </div>
                <div className="dr-fa-quote-card__label">{q.label}</div>
              </figcaption>
            </StaggerItem>
          ))}
        </StaggerIn>
      </div>
    </section>
  );
}
