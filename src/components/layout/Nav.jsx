import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconMenu2, IconX } from '@tabler/icons-react';
import Logo from './Logo.jsx';
import Button from '../ui/Button.jsx';

const LINKS = [
  { label: 'Services',   to: '/#services' },
  { label: 'Free Audit', to: '/free-audit' },
  { label: 'Contact',    to: '/#footer' },
];

const ESTIMATOR_PATH = '/revenue-estimator';

/**
 * Shared site nav — white surface with hairline border, Sapphire CTA.
 * Sticky; gains glass blur after 80px scroll.
 */
export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path) =>
    path.startsWith('/#') ? false : location.pathname === path;

  return (
    <nav
      className={`dr-nav ${isScrolled ? 'is-scrolled' : ''} ${mobileOpen ? 'is-open' : ''}`}
      aria-label="Primary"
    >
      <div className="dr-container dr-nav__inner">
        <Link to="/" className="dr-nav__brand" aria-label="Digital Roofers home">
          <Logo variant="horizontal" tone="dark" size={36} />
        </Link>

        <ul className="dr-nav__links" role="list">
          {LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`dr-nav__link ${isActive(link.to) ? 'is-active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Button to={ESTIMATOR_PATH} variant="primary" size="sm">
              Let&apos;s talk roofs
            </Button>
          </li>
        </ul>

        <button
          type="button"
          className="dr-nav__burger"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <IconX size={24} stroke={2} /> : <IconMenu2 size={24} stroke={2} />}
        </button>
      </div>

      <div className={`dr-nav__mobile ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen}>
        <ul className="dr-nav__mobile-list" role="list">
          {LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`dr-nav__mobile-link ${isActive(link.to) ? 'is-active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Button
              to={ESTIMATOR_PATH}
              variant="primary"
              size="md"
              onClick={() => setMobileOpen(false)}
            >
              Let&apos;s talk roofs
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
