import { IconBrandGoogleFilled, IconBrandMeta, IconDeviceLaptop, IconCheck } from '@tabler/icons-react';
import StaggerIn, { StaggerItem } from '../motion/StaggerIn.jsx';

const CARDS = [
  {
    Icon: IconBrandGoogleFilled,
    title: 'Google Ads Account',
    items: [
      'Campaign structure',
      'Keyword targeting and match types',
      'Ad copy and quality score',
      'Bidding strategy',
      'Conversion tracking setup',
      'Wasted spend identification',
    ],
  },
  {
    Icon: IconBrandMeta,
    title: 'Meta Ads Account',
    items: [
      'Campaign objectives',
      'Audience targeting',
      'Creative performance',
      'Pixel and event tracking',
      'Budget allocation',
      'Retargeting setup',
    ],
  },
  {
    Icon: IconDeviceLaptop,
    title: 'Website and Tracking',
    items: [
      'Landing page conversion rate',
      'Call to action clarity',
      'Google Analytics 4 setup',
      'Google Tag Manager',
      'Local Service Ads eligibility',
      'Mobile experience',
    ],
  },
];

export default function AuditChecklist() {
  return (
    <section className="dr-fa-checklist">
      <div className="dr-container">
        <header className="dr-fa-section-head">
          <h2 className="dr-fa-section-h2">
            Every angle. <span className="dr-fa-accent">Not just the ads.</span>
          </h2>
        </header>

        <StaggerIn className="dr-fa-checklist__grid" staggerChildren={0.12}>
          {CARDS.map(({ Icon, title, items }) => (
            <StaggerItem key={title} as="article" className="dr-fa-check-card">
              <div className="dr-fa-check-card__head">
                <span className="dr-fa-check-card__icon" aria-hidden="true">
                  <Icon size={28} stroke={1.75} />
                </span>
                <h3 className="dr-fa-check-card__title">{title}</h3>
              </div>
              <ul className="dr-fa-check-card__items">
                {items.map((it) => (
                  <li key={it} className="dr-fa-check-card__item">
                    <span className="dr-fa-check-card__tick" aria-hidden="true">
                      <IconCheck size={14} stroke={2.5} />
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </StaggerIn>
      </div>
    </section>
  );
}
