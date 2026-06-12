import { Link } from 'react-router-dom';
import { IconArrowUpRight } from '@tabler/icons-react';
import StaggerIn, { StaggerItem } from '../../motion/StaggerIn.jsx';
import AIImagePlate from '../../motion/AIImagePlate.jsx';
import SectionDivider from '../../components/layout/SectionDivider.jsx';
import { SERVICES } from '../../data/services.js';
import { SERVICE_ICONS } from '../service/icons.js';

/**
 * Per-card KPI copy + visual "span" (wide cards anchor the rhythm of the grid).
 * Keyed by service slug so the data model stays pure structural and the home
 * grid keeps its own visual cadence.
 */
const CARD_META = {
  'google-ads': {
    kpi: 'Built for cost per lead', span: 'wide', image: true,
    desc: 'Capture homeowners the second they search "roof repair near me." Built for cost per lead, not vanity clicks.',
  },
  'meta-ads': {
    kpi: 'Storm-season ready',
    desc: 'Storm-season campaigns, retargeting funnels, and creative that turns scrollers into booked inspections.',
  },
  'social-media-management': {
    kpi: 'Weekly cadence',
    desc: 'Daily presence that builds trust in your service area. Job-site content, reviews, authority, handled.',
  },
  'web-design': {
    kpi: 'Mobile-first build',
    desc: 'Roofing sites that look like the trade and convert like a machine. Fast on phones in driveways.',
  },
  'web-development': {
    kpi: 'End-to-end tracked',
    desc: 'Custom builds, lead-routing, CRM integrations, and tracking that actually works.',
  },
  'ai-automation': {
    kpi: 'Instant lead capture', span: 'wide',
    desc: 'Instant lead response. AI-qualified inbound calls. Automated follow-up. No lead ever cools off.',
  },
  'seo': {
    kpi: 'Compounds over time',
    desc: 'Rank for "roofer near me" and the long-tail searches that close. Local SEO built for service areas.',
  },
  'email': {
    kpi: 'Nurture, not noise',
    desc: 'Sequences that keep you in the inbox without being the company that spams. The "not now" lead becomes the yes.',
  },
  'branding': {
    kpi: 'Trust before the call',
    desc: 'Identity, voice, and visuals that signal trust before you say a word. Premium positioning, not template look.',
  },
  'analytics': {
    kpi: 'What every dollar bought',
    desc: 'Owner-friendly dashboards. Cost per booked inspection. The one number that tells you where to push next.',
  },
};

export default function Services() {
  return (
    <section className="dr-services" id="services">
      <div className="dr-container">
        <SectionDivider letter="A" label="What we build" />
        <div className="dr-services__head">
          <div>
            <h2 className="dr-services__h2">
              Every lever you need to scale a roofing business.
            </h2>
          </div>
          <p className="dr-services__sub">
            Pick one. Stack a few. Or hand us the whole growth engine.
          </p>
        </div>

        <StaggerIn className="dr-services__grid" staggerChildren={0.06}>
          {SERVICES.map((s) => {
            const meta = CARD_META[s.slug] || {};
            const Icon = SERVICE_ICONS[s.iconKey];
            return (
              <StaggerItem
                key={s.slug}
                as="article"
                className={`dr-svc-card ${meta.span === 'wide' ? 'is-wide' : ''}`}
              >
                <Link to={`/services/${s.slug}`} className="dr-svc-card__link" aria-label={`Learn more about ${s.name}`}>
                  {meta.image && (
                    <div className="dr-svc-card__image">
                      <AIImagePlate
                        slot={`services/${s.slug}`}
                        src={`/imagery/services/${s.slug}.webp`}
                        alt={`${s.name} for Florida roofing companies.`}
                        ratio="16 / 9"
                        kenBurns={false}
                        reveal={false}
                      />
                    </div>
                  )}
                  <div className="dr-svc-card__body">
                    <div className="dr-svc-card__head">
                      <span className="dr-svc-card__num">
                        {s.num} <span className="dr-svc-card__sep">·</span> {s.tag}
                      </span>
                      {Icon && (
                        <Icon size={28} stroke={1.75} className="dr-svc-card__icon" aria-hidden="true" />
                      )}
                    </div>
                    <h3 className="dr-svc-card__name">{s.name}</h3>
                    <p className="dr-svc-card__desc">{meta.desc}</p>
                    <div className="dr-svc-card__foot">
                      <span className="dr-svc-card__kpi">{meta.kpi}</span>
                      <IconArrowUpRight size={20} stroke={1.75} className="dr-svc-card__arrow" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerIn>
      </div>
    </section>
  );
}
