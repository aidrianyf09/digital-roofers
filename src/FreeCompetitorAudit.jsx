import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './FreeCompetitorAudit.css';

const EMAIL = 'office@strongbrandsunited.com';
const ESTIMATOR_PATH = '/revenue-estimator';

const HERO_SERVICES = [
  { num: '01', name: 'Google Ads', tag: 'Paid Search' },
  { num: '02', name: 'Meta Ads', tag: 'Paid Social' },
  { num: '03', name: 'Social Media Management', tag: 'Organic' },
  { num: '04', name: 'Web Design / Web Development', tag: 'Build' },
  { num: '05', name: 'And More!', tag: 'SEO · Email · Branding' },
];

export default function FreeCompetitorAudit() {
  const navRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSvc, setActiveSvc] = useState(0);
  const [svcHover, setSvcHover] = useState(false);

  useEffect(() => {
    if (svcHover) return;
    const id = setInterval(() => {
      setActiveSvc((i) => (i + 1) % HERO_SERVICES.length);
    }, 2200);
    return () => clearInterval(id);
  }, [svcHover]);

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
    document
      .querySelectorAll('.r-up, .howit, .details, .svc')
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const navClass = [
    'nav',
    isLoaded && 'is-loaded',
    isScrolled && 'is-scrolled',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {/* =================== NAV =================== */}
      <nav className={navClass} id="nav" ref={navRef}>
        <div className="wrap nav-inner">
          <a href="#" className="nav-wordmark">
            DIGITAL ROOFERS<span>/</span>SBU
          </a>
          <div className="nav-desktop nav-links">
            <a className="nav-link" href="#services">Services</a>
            <Link className="nav-link" to="/free-audit">Free Audit</Link>
            <a className="nav-link" href="#footer">Contact</a>
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
            id="navBurger"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={`nav-mobile${mobileOpen ? ' is-open' : ''}`} id="navMobile">
          <a className="nav-link" href="#services" onClick={closeMobile}>Services</a>
          <Link className="nav-link" to="/free-audit" onClick={closeMobile}>Free Audit</Link>
          <a className="nav-link" href="#footer" onClick={closeMobile}>Contact</a>
          <div style={{ height: 8 }}></div>
          <Link
            className="cta"
            to={ESTIMATOR_PATH}
            onClick={closeMobile}
          >
            <span className="cta-shadow"></span>
            <span className="cta-btn">
              Let's talk roofs <span className="arrow">→</span>
            </span>
          </Link>
        </div>
      </nav>

      {/* =================== HERO =================== */}
      <section className="page-hero">
        <div className="wrap">
          <div className="crumbs">
            <a href="#">Home</a> / Free Competitor Audit
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <h1 className="display">
                Stop<br />
                Chasing<br />
                Leads.<br />
                <span className="accent">
                  Start<br />
                  Closing<br />
                  Roofs.
                </span>
              </h1>
              <Link
                className="cta cta-lg"
                to={ESTIMATOR_PATH}
              >
                <span className="cta-shadow"></span>
                <span className="cta-btn">
                  Let's talk roofs! <span className="arrow">→</span>
                </span>
              </Link>
            </div>

            <aside
              className="svc-card"
              onMouseEnter={() => setSvcHover(true)}
              onMouseLeave={() => setSvcHover(false)}
            >
              <span className="svc-card-shadow" aria-hidden="true"></span>
              <div className="svc-card-inner">
                <div className="svc-card-head">
                  <span className="svc-card-eyebrow">What We Do</span>
                  <span className="svc-card-count tab-nums">
                    {String(activeSvc + 1).padStart(2, '0')} / {String(HERO_SERVICES.length).padStart(2, '0')}
                  </span>
                </div>
                <ul className="svc-card-list">
                  {HERO_SERVICES.map((svc, i) => (
                    <li
                      key={svc.name}
                      className={`svc-item${i === activeSvc ? ' is-active' : ''}`}
                      onMouseEnter={() => setActiveSvc(i)}
                    >
                      <a
                        href="#services"
                        className="svc-item-link"
                        onFocus={() => setActiveSvc(i)}
                      >
                        <span className="svc-item-num">{svc.num}</span>
                        <span className="svc-item-body">
                          <span className="svc-item-name">{svc.name}</span>
                          <span className="svc-item-tag">{svc.tag}</span>
                        </span>
                        <span className="svc-item-arrow" aria-hidden="true">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="#services" className="svc-card-footer">
                  See all services <span aria-hidden="true">→</span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =================== SERVICES =================== */}
      <section className="services" id="services">
        <div className="wrap">
          <div className="services-head">
            <div>
              <div className="services-eyebrow r-up">
                <span className="num">01</span>/ What We Build
              </div>
              <h2 className="display r-up d1">
                Every lever you need to scale a roofing business.
              </h2>
            </div>
            <p className="services-sub r-up d2">
              Pick one. Stack a few. Or hand us the whole growth engine.
            </p>
          </div>

          <div className="svc-grid">
            <article className="svc col-3">
              <div className="svc-num">01 — Paid Search</div>
              <h3 className="svc-name">Google Ads</h3>
              <p className="svc-desc">
                Capture homeowners the second they search "roof repair near me." Built for
                cost-per-lead, not vanity clicks.
              </p>
              <span className="svc-arrow">→</span>
            </article>

            <article className="svc col-3">
              <div className="svc-num">02 — Paid Social</div>
              <h3 className="svc-name">Meta Ads</h3>
              <p className="svc-desc">
                Storm-season campaigns, retargeting funnels, and creative that turns scrollers
                into booked inspections.
              </p>
              <span className="svc-arrow">→</span>
            </article>

            <article className="svc col-2">
              <div className="svc-num">03 — Organic</div>
              <h3 className="svc-name">Social Media Management</h3>
              <p className="svc-desc">
                Daily presence that builds trust in your service area. Job-site content, reviews,
                authority — handled.
              </p>
              <span className="svc-arrow">→</span>
            </article>

            <article className="svc col-2">
              <div className="svc-num">04 — Design</div>
              <h3 className="svc-name">Web Design</h3>
              <p className="svc-desc">
                Roofing sites that look like the trade and convert like a machine. Fast on phones
                in driveways.
              </p>
              <span className="svc-arrow">→</span>
            </article>

            <article className="svc col-2">
              <div className="svc-num">05 — Build</div>
              <h3 className="svc-name">Web Development</h3>
              <p className="svc-desc">
                Custom builds, lead-routing, CRM integrations, and tracking that actually works.
              </p>
              <span className="svc-arrow">→</span>
            </article>

            <article className="svc col-4">
              <div className="svc-num">06 — AI</div>
              <h3 className="svc-name">AI &amp; Automation</h3>
              <p className="svc-desc">
                Instant lead response. AI-qualified inbound calls. Automated follow-up. No lead
                ever cools off.
              </p>
              <span className="svc-arrow">→</span>
            </article>

            <article className="svc col-2">
              <span className="svc-stamp">+ More</span>
              <h3 className="svc-name" style={{ fontSize: '1.4rem' }}>
                SEO · Email · Branding · Analytics.
              </h3>
              <p className="svc-desc">If it scales roofers, we build it.</p>
              <span className="svc-arrow">→</span>
            </article>
          </div>
        </div>
      </section>

      {/* =================== 3-WAY CHART (HOOK) =================== */}
      <section className="howit" id="howit">
        <div className="wrap">
          <div className="howit-head">
            <div>
              <div className="howit-eyebrow r-up">
                <span className="num">01</span>/ How It Works
              </div>
              <h2 className="display r-up d1">
                Three columns. One page. The whole picture.
              </h2>
            </div>
            <p className="howit-sub r-up d2">
              A simple chart that does the heavy lifting. Where you stand. Where they stand. What
              to do about it.
            </p>
          </div>

          <div className="three-way">
            {/* Column 1 */}
            <div className="tw-col">
              <div className="tw-step">
                <span className="badge">1</span> Score You
              </div>
              <div className="tw-title">Your digital presence on 5 pillars.</div>
              <p className="tw-desc">
                Google Ads. Website. Social. AI search. Competitor gap. Each rated 1–10. Honest.
                Specific.
              </p>
              <div className="bars" aria-hidden="true">
                {[
                  ['Google Ads', 60, 6],
                  ['Website', 40, 4],
                  ['Social', 30, 3],
                  ['AI Search', 50, 5],
                  ['Gap', 50, 5],
                ].map(([label, w, n]) => (
                  <div className="bar-row" key={label}>
                    <span>{label}</span>
                    <div className="bar">
                      <div className="bar-fill you" style={{ '--w': `${w}%` }}></div>
                    </div>
                    <span className="bar-num">{n}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div className="tw-col">
              <div className="tw-step">
                <span className="badge">2</span> Score Them
              </div>
              <div className="tw-title">Your top competitors on the same 5 pillars.</div>
              <p className="tw-desc">
                We pull the top 3–5 roofers in your service area and score them too. Same scale.
                Side-by-side.
              </p>
              <div className="vs-mini" aria-hidden="true">
                {[
                  ['Google Ads', 'lose', 'Losing'],
                  ['Website', 'lose', 'Losing'],
                  ['Social', 'lose', 'Losing'],
                  ['AI Search', 'win', 'Winning'],
                  ['Gap', 'win', 'Winning'],
                ].map(([label, cls, tag]) => (
                  <div className="vs-row" key={label}>
                    <span>{label}</span>
                    <span className={`vs-tag ${cls}`}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3 */}
            <div className="tw-col">
              <div className="tw-step">
                <span className="badge">3</span> Close the Gap
              </div>
              <div className="tw-title">A 90-day roadmap. Specific. Executable.</div>
              <p className="tw-desc">
                What to fix first. What to launch next. What to scale. No fluff. No theory. Just
                the next 90 days.
              </p>
              <div className="road-mini" aria-hidden="true">
                <div className="road-row">
                  <span className="m">Month 01</span>
                  <span>Fix the foundation</span>
                </div>
                <div className="road-row">
                  <span className="m">Month 02</span>
                  <span>Launch and optimize</span>
                </div>
                <div className="road-row">
                  <span className="m">Month 03</span>
                  <span>Scale what works</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== DETAILS =================== */}
      <section className="details" id="details">
        <div className="wrap">

          {/* SECTION 1 — YOUR SCORE */}
          <div className="detail-block">
            <div className="detail-num">
              <span>01</span>
              <span className="of">/05</span>
            </div>
            <div className="detail-body">
              <span className="detail-eyebrow">Section 1 — Your Score</span>
              <h3>[Company Name] Digital Presence Audit.</h3>
              <p>
                Scored on 5 pillars (1–10 each). One number tells you nothing. Five numbers tell
                you exactly where to push.
              </p>

              <div className="score-card r-up">
                <div className="score-head">
                  <span>Sample Score Sheet</span>
                  <span>Tampa Roofing Co.</span>
                </div>
                <div className="score-rows">
                  {[
                    ['Google Ads Presence', 60, 6],
                    ['Website Performance', 40, 4],
                    ['Social Media Activity', 30, 3],
                    ['AI / Search Visibility', 50, 5],
                    ['Competitor Gap', 50, 5],
                  ].map(([label, w, n]) => (
                    <div className="score-row" key={label}>
                      <span>{label}</span>
                      <div className="score-meter" style={{ '--w': `${w}%` }}></div>
                      <span className="score-num">{n} / 10</span>
                    </div>
                  ))}
                </div>
                <div className="score-total">
                  <span>Overall Score</span>
                  <span className="big tab-nums">23 / 50</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2 — COMPETITOR COMPARISON */}
          <div className="detail-block">
            <div className="detail-num">
              <span>02</span>
              <span className="of">/05</span>
            </div>
            <div className="detail-body">
              <span className="detail-eyebrow">Section 2 — Competitor Comparison</span>
              <h3>How you stack against the top 3 in your zip code.</h3>
              <p>
                Simple table. Their scores vs yours. Where you are winning. Where you are losing.
                No interpretation theater — the numbers do the talking.
              </p>

              <table className="cmp-table r-up">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>You</th>
                    <th>Competitor A</th>
                    <th>Competitor B</th>
                    <th>Competitor C</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="metric">Google Ads</td>
                    <td className="you">6</td>
                    <td className="win">8</td>
                    <td className="win">7</td>
                    <td className="lose">5</td>
                  </tr>
                  <tr>
                    <td className="metric">Website</td>
                    <td className="you">4</td>
                    <td className="win">9</td>
                    <td className="win">7</td>
                    <td className="win">6</td>
                  </tr>
                  <tr>
                    <td className="metric">Social Media</td>
                    <td className="you">3</td>
                    <td className="win">8</td>
                    <td className="win">6</td>
                    <td className="win">7</td>
                  </tr>
                  <tr>
                    <td className="metric">AI / Search</td>
                    <td className="you">5</td>
                    <td className="lose">3</td>
                    <td className="lose">4</td>
                    <td className="lose">2</td>
                  </tr>
                  <tr>
                    <td className="metric">Gap Score</td>
                    <td className="you">5</td>
                    <td className="lose">4</td>
                    <td className="lose">3</td>
                    <td className="lose">4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 3 — GAP ANALYSIS */}
          <div className="detail-block">
            <div className="detail-num">
              <span>03</span>
              <span className="of">/05</span>
            </div>
            <div className="detail-body">
              <span className="detail-eyebrow">Section 3 — The Gap Analysis</span>
              <h3>Here is what your top competitor is doing that you are not.</h3>
              <p>
                Specific. Actionable. Real. The receipts on what's working for the guys eating
                your lunch — and the exact moves to take them on.
              </p>

              <div className="gap-list r-up">
                {[
                  ['01', 'Google Ads', 'Competitor A is bidding on "emergency roof repair Tampa" with location extensions and call tracking. You aren\'t bidding on emergency keywords at all.'],
                  ['02', 'Website', 'Their site loads in 1.4s on mobile and has a sticky "Free Inspection" CTA. Yours loads in 4.1s and buries the phone number in the footer.'],
                  ['03', 'Social', 'They post 4× per week — job-site walkthroughs, before/afters, and crew videos. You haven\'t posted since March.'],
                  ['04', 'Reviews', 'They\'ve added 47 Google reviews this year. You\'ve added 6. Their average response time is under 24 hours.'],
                  ['05', 'Lead Response', 'Their inbound form pings them and texts the homeowner inside 2 minutes. Your form goes to an inbox checked twice a day.'],
                ].map(([num, label, body]) => (
                  <div className="gap-row" key={num}>
                    <div className="gap-num">{num}</div>
                    <div className="gap-text">
                      <div className="label">{label}</div>
                      <div className="body">{body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4 — 90-DAY ROADMAP */}
          <div className="detail-block">
            <div className="detail-num">
              <span>04</span>
              <span className="of">/05</span>
            </div>
            <div className="detail-body">
              <span className="detail-eyebrow">Section 4 — The 90-Day Roadmap</span>
              <h3>Three months. Three jobs. No detours.</h3>
              <p>
                We don't believe in 12-month plans. The roofing market moves in storm seasons.
                Here's what the next 90 days look like.
              </p>

              <div className="roadmap r-up">
                <div className="month">
                  <div className="month-head">
                    <span className="month-num">01</span>
                    <span>Month One</span>
                  </div>
                  <h4>Fix the foundation.</h4>
                  <ul>
                    <li>Site speed &amp; mobile fix</li>
                    <li>Call tracking installed</li>
                    <li>Google Business Profile audit</li>
                    <li>Review request automation</li>
                    <li>Lead-response SLA &lt; 2 min</li>
                  </ul>
                </div>
                <div className="month">
                  <div className="month-head">
                    <span className="month-num">02</span>
                    <span>Month Two</span>
                  </div>
                  <h4>Launch and optimize.</h4>
                  <ul>
                    <li>Google Ads live in service zone</li>
                    <li>Meta retargeting funnels</li>
                    <li>Weekly content cadence</li>
                    <li>Landing pages per service</li>
                    <li>CRM lead routing wired up</li>
                  </ul>
                </div>
                <div className="month">
                  <div className="month-head">
                    <span className="month-num">03</span>
                    <span>Month Three</span>
                  </div>
                  <h4>Scale what works.</h4>
                  <ul>
                    <li>Double budget on winners</li>
                    <li>Kill underperformers</li>
                    <li>Expand to second city</li>
                    <li>Storm-season playbook ready</li>
                    <li>Monthly scorecard, owner-level</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5 — CTA SUMMARY */}
          <div className="detail-block">
            <div className="detail-num">
              <span>05</span>
              <span className="of">/05</span>
            </div>
            <div className="detail-body">
              <span className="detail-eyebrow">Section 5 — The CTA</span>
              <h3>We can execute this for you.</h3>
              <p>
                The audit is free. The roadmap is yours either way. If you want us to run it,
                we'll talk numbers — not pitch decks.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =================== FINAL CTA — LET'S TALK ROOFS =================== */}
      <section className="email-cta" id="claim">
        <div className="wrap">
          <span className="eyebrow-line">Book a Call · 15 Minutes · No Pitch</span>
          <h2 className="display">
            Let's talk roofs. Fifteen minutes, straight to the point.
          </h2>
          <p className="lede">
            Pick a time. We'll walk through your audit, your competitors, and the 90-day roadmap.
            No slides. No upsell. Just the numbers and what to do next.
          </p>
          <div className="cta-stack">
            <Link
              className="cta cta-lg"
              to={ESTIMATOR_PATH}
            >
              <span className="cta-shadow"></span>
              <span className="cta-btn">
                Let's talk roofs <span className="arrow">→</span>
              </span>
            </Link>
            <div className="micro">
              Prefer email? <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>
        </div>
      </section>

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
                <li><a href="#">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><Link to="/free-audit">Free Audit</Link></li>
                <li><a href={`mailto:${EMAIL}`}>Email</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© 2026 Digital Roofers by SBU · Built in Tampa, FL</div>
            <div>Free Competitor Audit · One Page · No Strings</div>
          </div>
        </div>
      </footer>
    </>
  );
}
