import StaggerIn, { StaggerItem } from '../../motion/StaggerIn.jsx';
import SectionDivider from '../../components/layout/SectionDivider.jsx';

export default function Objections({ service }) {
  return (
    <section className="dr-svc-obj">
      <div className="dr-container">
        <SectionDivider letter="B" label="You're probably wondering" />

        <h2 className="dr-svc-obj__h2">
          The questions every owner asks us, answered.
        </h2>

        <StaggerIn className="dr-svc-obj__grid" staggerChildren={0.08}>
          {service.objections.map((o, i) => (
            <StaggerItem key={i} as="article" className="dr-svc-obj__card">
              <div className="dr-svc-obj__q" style={{ color: service.accent }}>
                <span className="dr-svc-obj__quote">"</span>
                {o.q}
              </div>
              <p className="dr-svc-obj__a">{o.a}</p>
            </StaggerItem>
          ))}
        </StaggerIn>
      </div>
    </section>
  );
}
