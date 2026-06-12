import { IconCheck } from '@tabler/icons-react';
import SectionDivider from '../../components/layout/SectionDivider.jsx';
import StaggerIn, { StaggerItem } from '../../motion/StaggerIn.jsx';

export default function Included({ service }) {
  return (
    <section className="dr-svc-incl">
      <div className="dr-container">
        <SectionDivider letter="C" label="What's included" />

        <h2 className="dr-svc-incl__h2">Concrete deliverables. No buzzwords.</h2>

        <StaggerIn as="ul" className="dr-svc-incl__grid" staggerChildren={0.05}>
          {service.included.map((item, i) => (
            <StaggerItem key={i} as="li" className="dr-svc-incl__item">
              <IconCheck size={18} stroke={2.25} style={{ color: service.accent }} />
              <span>{item}</span>
            </StaggerItem>
          ))}
        </StaggerIn>
      </div>
    </section>
  );
}
