import {
  IconSearch, IconBrandMeta, IconUsersGroup, IconDeviceLaptop,
  IconCode, IconRobot, IconSparkles, IconArrowUpRight,
} from '@tabler/icons-react';
import StaggerIn, { StaggerItem } from '../../motion/StaggerIn.jsx';
import AIImagePlate from '../../motion/AIImagePlate.jsx';
import SectionDivider from '../../components/layout/SectionDivider.jsx';

const SERVICES = [
  {
    num: '01',
    tag: 'Paid Search',
    name: 'Google Ads',
    desc: 'Capture homeowners the second they search "roof repair near me." Built for cost-per-lead, not vanity clicks.',
    Icon: IconSearch,
    kpi: 'Built for cost per lead',
    span: 'wide',
    image: true,
  },
  {
    num: '02',
    tag: 'Paid Social',
    name: 'Meta Ads',
    desc: 'Storm-season campaigns, retargeting funnels, and creative that turns scrollers into booked inspections.',
    Icon: IconBrandMeta,
    kpi: 'Storm-season ready',
  },
  {
    num: '03',
    tag: 'Organic',
    name: 'Social Media Management',
    desc: 'Daily presence that builds trust in your service area. Job-site content, reviews, authority, handled.',
    Icon: IconUsersGroup,
    kpi: 'Weekly cadence',
  },
  {
    num: '04',
    tag: 'Design',
    name: 'Web Design',
    desc: 'Roofing sites that look like the trade and convert like a machine. Fast on phones in driveways.',
    Icon: IconDeviceLaptop,
    kpi: 'Mobile-first build',
  },
  {
    num: '05',
    tag: 'Build',
    name: 'Web Development',
    desc: 'Custom builds, lead-routing, CRM integrations, and tracking that actually works.',
    Icon: IconCode,
    kpi: 'End-to-end tracked',
  },
  {
    num: '06',
    tag: 'AI',
    name: 'AI & Automation',
    desc: 'Instant lead response. AI-qualified inbound calls. Automated follow-up. No lead ever cools off.',
    Icon: IconRobot,
    kpi: 'Instant lead capture',
    span: 'wide',
  },
  {
    num: '07',
    tag: 'And More',
    name: 'SEO, Email, Branding, Analytics',
    desc: 'If it scales roofers, we build it.',
    Icon: IconSparkles,
    kpi: 'Strategy-first',
  },
];

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
          {SERVICES.map((s) => (
            <StaggerItem
              key={s.num}
              as="article"
              className={`dr-svc-card ${s.span === 'wide' ? 'is-wide' : ''}`}
            >
              {s.image && (
                <div className="dr-svc-card__image">
                  <AIImagePlate
                    slot="services/google-ads"
                    src="/imagery/services/google-ads.webp"
                    alt="Strategist reviewing a Google Ads dashboard for a Florida roofing campaign."
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
                  <s.Icon size={28} stroke={1.75} className="dr-svc-card__icon" aria-hidden="true" />
                </div>
                <h3 className="dr-svc-card__name">{s.name}</h3>
                <p className="dr-svc-card__desc">{s.desc}</p>
                <div className="dr-svc-card__foot">
                  <span className="dr-svc-card__kpi">{s.kpi}</span>
                  <IconArrowUpRight size={20} stroke={1.75} className="dr-svc-card__arrow" aria-hidden="true" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerIn>
      </div>
    </section>
  );
}
