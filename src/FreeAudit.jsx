import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './FreeCompetitorAudit.css';
import './FreeAudit.css';
import Nav from './components/layout/Nav.jsx';
import Footer from './components/layout/Footer.jsx';
import AuditHero from './FreeAudit/AuditHero.jsx';
import AuditSteps from './FreeAudit/AuditSteps.jsx';
import AuditPlatformPicker from './FreeAudit/AuditPlatformPicker.jsx';
import AuditBooking from './FreeAudit/AuditBooking.jsx';
import AuditChecklist from './FreeAudit/AuditChecklist.jsx';
import AuditTestimonials from './FreeAudit/AuditTestimonials.jsx';
import AuditFAQ from './FreeAudit/AuditFAQ.jsx';
import AuditFinalCTA from './FreeAudit/AuditFinalCTA.jsx';

const EMAIL = 'office@strongbrandsunited.com';
const ESTIMATOR_PATH = '/revenue-estimator';

export default function FreeAudit() {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const pickerRef = useRef(null);
  const bookingRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    document.querySelectorAll('.audit-page .r-up').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const scrollToPicker = () => {
    if (!pickerRef.current) return;
    pickerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToBooking = () => {
    if (!bookingRef.current) return;
    bookingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (selectedPlatform) scrollToBooking();
  }, [selectedPlatform]);

  return (
    <div className="audit-page">
      <Nav />

      {/* =================== SECTIONS =================== */}
      <main className="audit-main">
        <AuditHero onBookClick={scrollToPicker} />
        <AuditSteps />
        <AuditPlatformPicker
          ref={pickerRef}
          selected={selectedPlatform}
          onSelect={setSelectedPlatform}
        />
        <AuditBooking
          ref={bookingRef}
          selected={selectedPlatform}
          onChangeClick={scrollToPicker}
        />
        <AuditChecklist />
        <AuditTestimonials />
        <AuditFAQ />
        <AuditFinalCTA onBookClick={scrollToPicker} />
      </main>

      <Footer />
    </div>
  );
}
