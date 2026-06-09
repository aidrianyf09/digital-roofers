import { Link } from 'react-router-dom';
import { IconMapPin, IconPhone, IconMail } from '@tabler/icons-react';
import Logo from './Logo.jsx';

const EMAIL = 'office@strongbrandsunited.com';
const PHONE_DISPLAY = '+1 (813) 957-9715';
const PHONE_HREF = 'tel:+18139579715';
const ADDRESS = ['217 S Cedar Ave, Unit C', 'Tampa, FL 33606'];

const MARQUEE_ITEMS = [
  'DATA-DRIVEN',
  'MEASURABLE ROI',
  'FLORIDA ROOFERS',
  'STRATEGY-FIRST',
  'PARTNERSHIP NOT TRANSACTION',
];

export default function Footer() {
  return (
    <footer className="dr-footer" id="footer">
      <div className="dr-container dr-footer__inner">
        <div className="dr-footer__cols">
          <div className="dr-footer__col dr-footer__col--brand">
            <Logo variant="horizontal" tone="light" size={48} />
            <p className="dr-footer__tag">
              Marketing that actually moves the needle — for Florida roofers.
            </p>
          </div>

          <div className="dr-footer__col">
            <h4 className="dr-footer__h">Get in Touch</h4>
            <ul className="dr-footer__contact" role="list">
              <li>
                <IconMapPin size={16} stroke={2} aria-hidden="true" />
                <span>{ADDRESS[0]}<br />{ADDRESS[1]}</span>
              </li>
              <li>
                <IconPhone size={16} stroke={2} aria-hidden="true" />
                <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <IconMail size={16} stroke={2} aria-hidden="true" />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            </ul>
          </div>

          <div className="dr-footer__col">
            <h4 className="dr-footer__h">Quick Links</h4>
            <ul className="dr-footer__links" role="list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/#services">Services</Link></li>
              <li><Link to="/free-audit">Free Audit</Link></li>
              <li><Link to="/revenue-estimator">Revenue Estimator</Link></li>
            </ul>
          </div>
        </div>

        <div className="dr-footer__marquee" aria-hidden="true">
          <div className="dr-footer__marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="dr-footer__marquee-item">
                {item} <span className="dr-footer__marquee-dot">•</span>
              </span>
            ))}
          </div>
        </div>

        <div className="dr-footer__bottom">
          <span>© {new Date().getFullYear()} Digital Roofers by SBU · Built in Tampa, FL</span>
          <span>Let&apos;s build a data-driven strategy together.</span>
        </div>
      </div>
    </footer>
  );
}
