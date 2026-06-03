import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './FreeCompetitorAudit.css';
import './FreeAudit.css';
import AuditHero from './FreeAudit/AuditHero.jsx';
import AuditSteps from './FreeAudit/AuditSteps.jsx';
import AuditBooking from './FreeAudit/AuditBooking.jsx';
import AuditChecklist from './FreeAudit/AuditChecklist.jsx';
import AuditTestimonials from './FreeAudit/AuditTestimonials.jsx';
import AuditFAQ from './FreeAudit/AuditFAQ.jsx';
import AuditFinalCTA from './FreeAudit/AuditFinalCTA.jsx';

const EMAIL = 'office@strongbrandsunited.com';
const ESTIMATOR_PATH = '/revenue-estimator';

export default function FreeAudit() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const bookingRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsLoaded(true));
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
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

  const scrollToBooking = () => {
    if (!bookingRef.current) return;
    bookingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navClass = [
    'nav',
    isLoaded && 'is-loaded',
    isScrolled && 'is-scrolled',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="audit-page">
      {/* =================== NAV =================== */}
      <nav className={navClass} id="nav">
        <div className="wrap nav-inner">
          <Link to="/" className="nav-wordmark">
            DIGITAL ROOFERS<span>/</span>SBU
          </Link>
          <div className="nav-desktop nav-links">
            <Link className="nav-link" to="/#services">Services</Link>
            <Link className="nav-link nav-link--active" to="/free-audit">Free Audit</Link>
            <Link className="nav-link" to="/#footer">Contact</Link>
            <Link
              className="cta cta-sm"
              to={ESTIMATOR_PATH}
              style={{ marginLeft: 8 }}
            >
              <span className="cta-shadow"></span>
              <span className="cta-btn">
                Let's talk roofs <span className="arrow">→</span>
              </span>
            </Link>
          </div>
          <button
            className="nav-burger"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={`nav-mobile${mobileOpen ? ' is-open' : ''}`}>
          <Link className="nav-link" to="/#services" onClick={closeMobile}>Services</Link>
          <Link className="nav-link nav-link--active" to="/free-audit" onClick={closeMobile}>Free Audit</Link>
          <Link className="nav-link" to="/#footer" onClick={closeMobile}>Contact</Link>
          <div style={{ height: 8 }}></div>
          <Link className="cta" to={ESTIMATOR_PATH} onClick={closeMobile}>
            <span className="cta-shadow"></span>
            <span className="cta-btn">
              Let's talk roofs <span className="arrow">→</span>
            </span>
          </Link>
        </div>
      </nav>

      {/* =================== SECTIONS =================== */}
      <main className="audit-main">
        <AuditHero onBookClick={scrollToBooking} />
        <AuditSteps />
        <AuditBooking ref={bookingRef} />
        <AuditChecklist />
        <AuditTestimonials />
        <AuditFAQ />
        <AuditFinalCTA onBookClick={scrollToBooking} />
      </main>

      {/* =================== FOOTER =================== */}
      <footer className="footer" id="footer">
        <div className="wrap">
          <div className="footer-cols">
            <div className="footer-col">
              <div className="footer-wordmark">
                Digital<br />Roofers<br /><span>/</span>by SBU
              </div>
              <p className="footer-tag">Digital growth for Florida roofers.</p>
            </div>
            <div className="footer-col">
              <h4 className="footer-h">Get in Touch</h4>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                217 S Cedar Ave, Unit C<br />Tampa, FL 33606
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                marginTop: 14,
              }}>
                <a href="tel:+18139579715">+1 (813) 957-9715</a><br />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </p>
            </div>
            <div className="footer-col">
              <h4 className="footer-h">Quick Links</h4>
              <ul className="quick-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/#services">Services</Link></li>
                <li><Link to="/free-audit">Free Audit</Link></li>
                <li><a href={`mailto:${EMAIL}`}>Email</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© 2026 Digital Roofers by SBU · Built in Tampa, FL</div>
            <div>Free Live Audit · 15 Minutes · No Strings</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
