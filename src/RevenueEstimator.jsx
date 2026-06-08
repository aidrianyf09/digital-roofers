import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './RevenueEstimator.css';
import { sendLeadToGhl } from './lib/ghl-webhook';

const CALENDLY_URL = 'https://calendly.com/strongbrandsunited';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,}$/;

/* ============================================================
   ICONS — inline SVG
   ============================================================ */
const Icon = ({ d, vb = '0 0 24 24', style }) => (
  <svg viewBox={vb} fill="currentColor" style={style} aria-hidden="true">
    <path d={d} />
  </svg>
);
const HomeIcon = (p) => <Icon {...p} d="M19 9.3V4h-3v2.6L12 3 2 12h3v8h6v-6h2v6h6v-8h3z" />;
const ArrowRight = (p) => <Icon {...p} d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4z" />;
const ArrowLeft = (p) => <Icon {...p} d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />;
const ClockIcon = (p) => <Icon {...p} d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5 3 .75-1.23L12.5 12V7z" />;
const CheckIcon = (p) => <Icon {...p} d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-5l-3.5-3.5 1.4-1.4L11 12.2l4.6-4.6 1.4 1.4L11 15z" />;
const ShieldIcon = (p) => <Icon {...p} d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />;
const WarningIcon = (p) => <Icon {...p} d="M12 2 1 21h22L12 2zm0 4 7.5 13h-15L12 6zm-1 6v4h2v-4h-2zm0 5v2h2v-2h-2z" />;

/* ============================================================
   DATA
   ============================================================ */
const QUESTIONS = [
  {
    id: 'city',
    type: 'text',
    label: 'Question 01',
    title: 'Where in Florida do you operate?',
    sub: 'Your primary service area. We use this to benchmark you against the competition in your market.',
    placeholder: 'e.g. Tampa, Orlando, Miami…',
    inputLabel: 'Service area',
  },
  {
    id: 'ticket',
    type: 'option',
    label: 'Question 02',
    title: "What's your average roof job value?",
    sub: 'A rough average across residential, commercial, and storm work.',
    options: [
      { value: 'under8',  label: 'Under $8,000',       desc: 'Mostly repairs and partials',      low: 5000,  high: 8000 },
      { value: '8to15',   label: '$8,000 – $15,000',   desc: 'Mix of repairs and re-roofs',      low: 8000,  high: 15000 },
      { value: '15to25',  label: '$15,000 – $25,000',  desc: 'Full residential re-roofs',        low: 15000, high: 25000 },
      { value: 'over25',  label: '$25,000+',           desc: 'Larger residential or commercial', low: 25000, high: 45000 },
    ],
  },
  {
    id: 'leads',
    type: 'option',
    label: 'Question 03',
    title: 'How many qualified leads do you get monthly right now?',
    sub: 'Real inbound leads — phone calls, form fills, referrals worth quoting.',
    options: [
      { value: '0-10',  label: '0 – 10 leads / month',  desc: "We're leaving real money on the table",   mult: 0.7 },
      { value: '11-25', label: '11 – 25 leads / month', desc: 'Decent volume, room to scale',            mult: 1.0 },
      { value: '26-50', label: '26 – 50 leads / month', desc: "Strong pipeline — let's tighten it",      mult: 1.2 },
      { value: '50+',   label: '50+ leads / month',     desc: 'Mature operation, optimize cost-per-job', mult: 1.3 },
    ],
  },
  {
    id: 'budget',
    type: 'option',
    label: 'Question 04',
    title: "What's your monthly ad budget?",
    sub: "Total media spend across Google, Meta, or anywhere else. If you're not running ads yet, pick what you're willing to commit.",
    options: [
      { value: 'none',     label: 'Not running ads yet',     desc: "We'll recommend a starting budget", budgetLow: 2500,  budgetHigh: 4000,  plan: 'Foundation' },
      { value: 'under2k',  label: 'Under $2,000 / month',    desc: 'Small test budget',                 budgetLow: 1500,  budgetHigh: 2000,  plan: 'Foundation' },
      { value: '2to5k',    label: '$2,000 – $5,000 / month', desc: 'Standard launch budget',            budgetLow: 2000,  budgetHigh: 5000,  plan: 'Accelerator' },
      { value: '5to15k',   label: '$5,000 – $15,000 / month', desc: 'Scaling operator',                 budgetLow: 5000,  budgetHigh: 15000, plan: 'Operator' },
      { value: 'over15k',  label: '$15,000+ / month',        desc: 'Multi-market dominance',            budgetLow: 15000, budgetHigh: 30000, plan: 'Dominator' },
    ],
  },
  {
    id: 'service',
    type: 'option',
    label: 'Question 05',
    title: "What's your primary roofing service?",
    sub: 'The work that pays the bills. We tune the strategy to the lane you compete in.',
    options: [
      { value: 'residential', label: 'Residential Re-Roofs',  desc: 'Asphalt, metal, tile',         cplLow: 90,  cplHigh: 180 },
      { value: 'commercial',  label: 'Commercial Roofing',    desc: 'Flat, TPO, larger ticket',     cplLow: 140, cplHigh: 280 },
      { value: 'storm',       label: 'Storm / Insurance',     desc: 'Hurricane and hail claims',    cplLow: 70,  cplHigh: 150 },
      { value: 'repair',      label: 'Repairs & Maintenance', desc: 'Smaller tickets, faster cycle', cplLow: 60,  cplHigh: 130 },
      { value: 'all',         label: 'All of the above',      desc: 'Full-service operator',         cplLow: 90,  cplHigh: 200 },
    ],
  },
];

/* ============================================================
   CALCULATION
   ============================================================ */
function computeEstimate(answers) {
  const ticket = QUESTIONS[1].options.find((o) => o.value === answers.ticket) || QUESTIONS[1].options[1];
  const leads = QUESTIONS[2].options.find((o) => o.value === answers.leads) || QUESTIONS[2].options[1];
  const budget = QUESTIONS[3].options.find((o) => o.value === answers.budget) || QUESTIONS[3].options[2];
  const service = QUESTIONS[4].options.find((o) => o.value === answers.service) || QUESTIONS[4].options[0];

  const newLeadsLow = Math.floor(budget.budgetLow / service.cplHigh);
  const newLeadsHigh = Math.ceil(budget.budgetHigh / service.cplLow);
  const closeLow = 0.2;
  const closeHigh = 0.38;
  const mult = leads.mult || 1;

  const revenueLow = Math.round(newLeadsLow * closeLow * ticket.low * mult);
  const revenueHigh = Math.round(newLeadsHigh * closeHigh * ticket.high * mult);

  return {
    revenueLow,
    revenueHigh,
    leadsLow: newLeadsLow,
    leadsHigh: newLeadsHigh,
    plan: budget.plan,
    budgetLow: budget.budgetLow,
    budgetHigh: budget.budgetHigh,
    serviceLabel: service.label,
    ticketLabel: ticket.label,
  };
}

function fmtMoney(n) {
  if (n >= 1000) return '$' + (n / 1000).toFixed(0) + 'K';
  return '$' + n;
}

/* ============================================================
   COMPONENTS
   ============================================================ */
function ProgressBar({ step, total }) {
  const pct = step === 0 ? 0 : Math.min(100, Math.round((step / total) * 100));
  const displayStep = Math.max(1, step);
  return (
    <div className="progress">
      <div className="progress-meta">
        <span className="step">{step === 0 ? 'Get Started' : `Step ${displayStep} of ${total}`}</span>
        <span className="pct">{pct}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: pct + '%' }} />
      </div>
    </div>
  );
}

function IntroScreen({ onStart }) {
  return (
    <div className="screen">
      <div className="intro-icon-wrap">
        <span className="intro-icon"><HomeIcon /></span>
      </div>
      <div style={{ marginBottom: 14 }}>
        <span className="eyebrow">Florida Roofing · Revenue Tool</span>
      </div>
      <h1 className="title">How Many Roofing Leads Could Google Ads Get You?</h1>
      <p className="sub">
        Answer 5 questions. Get your personalized revenue estimate in 60 seconds.
        <br />No fluff. Just your numbers.
      </p>
      <div className="pills">
        <span className="pill"><ClockIcon /> 60 seconds</span>
        <span className="pill"><CheckIcon /> Free estimate</span>
        <span className="pill"><ShieldIcon /> No obligation</span>
      </div>
      <button className="btn-gold" onClick={onStart}>
        Get My Free Revenue Estimate <ArrowRight />
      </button>
    </div>
  );
}

function OptionStep({ q, value, onSelect, onBack }) {
  return (
    <div className="screen">
      <div className="q-head">
        <span className="q-label">{q.label}</span>
        <h2 className="q-title">{q.title}</h2>
        <p className="sub sub-left">{q.sub}</p>
      </div>
      <div className="options">
        {q.options.map((opt) => (
          <button
            key={opt.value}
            className={'option' + (value === opt.value ? ' is-selected' : '')}
            onClick={() => onSelect(opt.value)}
          >
            <span className="option-content">
              <span className="option-label">{opt.label}</span>
              <span className="option-desc">{opt.desc}</span>
            </span>
            <span className="option-arrow"><ArrowRight /></span>
          </button>
        ))}
      </div>
      {onBack && (
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft /> Back
        </button>
      )}
    </div>
  );
}

function TextStep({ q, value, onChange, onNext, onBack }) {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);
  const disabled = !value || value.trim().length < 2;
  const handleKey = (e) => {
    if (e.key === 'Enter' && !disabled) onNext();
  };
  return (
    <div className="screen">
      <div className="q-head">
        <span className="q-label">{q.label}</span>
        <h2 className="q-title">{q.title}</h2>
        <p className="sub sub-left">{q.sub}</p>
      </div>
      <label className="input-label">{q.inputLabel}</label>
      <input
        ref={inputRef}
        type="text"
        className="text-input"
        placeholder={q.placeholder}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
      />
      <div style={{ height: 24 }} />
      <button className="btn-gold" disabled={disabled} onClick={onNext}>
        Continue <ArrowRight />
      </button>
      {onBack && (
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft /> Back
        </button>
      )}
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <div className="v">{value}</div>
      <div className="l">{label}</div>
    </div>
  );
}

function staticInsight(answers, estimate) {
  const city = (answers.city || 'Your market').trim();
  const svc = (estimate.serviceLabel || 'roofing').toLowerCase();
  return `${city} has 3–5 competitors actively bidding on "${svc}" keywords. Install call tracking and bid on emergency intent terms — that's where the high-ticket jobs live.`;
}

function InsightBlock({ answers, estimate }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch('/api/insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers, estimate }),
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('insight ' + res.status))))
      .then((data) => {
        if (cancelled) return;
        const insight = (data && data.insight && data.insight.trim()) || staticInsight(answers, estimate);
        setText(insight);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setText(staticInsight(answers, estimate));
        setLoading(false);
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [answers, estimate]);

  return (
    <div className="insight">
      {loading ? (
        <div className="insight-loading">
          <span className="spin" /> Analyzing your market…
        </div>
      ) : (
        <div className="insight-body">&ldquo;{text}&rdquo;</div>
      )}
    </div>
  );
}

function CountRange({ low, high }) {
  const [dispLow, setLow] = useState(0);
  const [dispHigh, setHigh] = useState(0);
  useEffect(() => {
    setLow(0);
    setHigh(0);
    const dur = 900;
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setLow(Math.round(low * eased));
      setHigh(Math.round(high * eased));
      if (p >= 1) clearInterval(id);
    }, 33);
    const fallback = setTimeout(() => {
      setLow(low);
      setHigh(high);
      clearInterval(id);
    }, dur + 200);
    return () => {
      clearInterval(id);
      clearTimeout(fallback);
    };
  }, [low, high]);
  return <div className="result-number">{fmtMoney(dispLow)}–{fmtMoney(dispHigh)}</div>;
}

function ContactStep({ contact, answers, onChange, onSubmit, onBack }) {
  const [submitting, setSubmitting] = useState(false);
  const firstRef = useRef(null);
  useEffect(() => {
    firstRef.current && firstRef.current.focus();
  }, []);

  const trimmed = {
    firstName: (contact.firstName || '').trim(),
    lastName: (contact.lastName || '').trim(),
    email: (contact.email || '').trim(),
    phone: (contact.phone || '').trim(),
    companyName: (contact.companyName || '').trim(),
  };
  const valid =
    trimmed.firstName.length >= 1 &&
    trimmed.lastName.length >= 1 &&
    EMAIL_RE.test(trimmed.email) &&
    PHONE_RE.test(trimmed.phone);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    const estimate = computeEstimate(answers);
    await sendLeadToGhl({ answers, estimate, contact: trimmed });
    onSubmit();
  };

  return (
    <form className="screen" onSubmit={handleSubmit}>
      <div className="q-head">
        <span className="q-label">Almost there</span>
        <h2 className="q-title">Where should we send your estimate?</h2>
        <p className="sub sub-left">
          Your custom revenue range is ready. Tell us where to send it and we'll unlock the
          breakdown plus a strategy call invite.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-field">
          <label className="input-label" htmlFor="re-firstName">First name</label>
          <input
            ref={firstRef}
            id="re-firstName"
            className="contact-input"
            type="text"
            autoComplete="given-name"
            value={contact.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
          />
        </div>
        <div className="contact-field">
          <label className="input-label" htmlFor="re-lastName">Last name</label>
          <input
            id="re-lastName"
            className="contact-input"
            type="text"
            autoComplete="family-name"
            value={contact.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
          />
        </div>
        <div className="contact-field contact-field-full">
          <label className="input-label" htmlFor="re-email">Email</label>
          <input
            id="re-email"
            className="contact-input"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={contact.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>
        <div className="contact-field contact-field-full">
          <label className="input-label" htmlFor="re-phone">Phone</label>
          <input
            id="re-phone"
            className="contact-input"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+1 555 555 0123"
            value={contact.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>
        <div className="contact-field contact-field-full">
          <label className="input-label" htmlFor="re-company">
            Company <span className="input-optional">(optional)</span>
          </label>
          <input
            id="re-company"
            className="contact-input"
            type="text"
            autoComplete="organization"
            value={contact.companyName}
            onChange={(e) => onChange('companyName', e.target.value)}
          />
        </div>
      </div>

      <div style={{ height: 18 }} />
      <button
        type="submit"
        className="btn-gold"
        disabled={!valid || submitting}
      >
        {submitting ? (
          <>
            <span className="spin" /> Calculating your estimate…
          </>
        ) : (
          <>
            Show My Revenue Estimate <ArrowRight />
          </>
        )}
      </button>
      {onBack && (
        <button type="button" className="back-btn" onClick={onBack} disabled={submitting}>
          <ArrowLeft /> Back
        </button>
      )}
    </form>
  );
}

function ResultScreen({ answers, onReset }) {
  const estimate = useMemo(() => computeEstimate(answers), [answers]);
  const cityClean = (answers.city || 'Your').trim().replace(/\s+/g, ' ');
  const cityTitle = cityClean.charAt(0).toUpperCase() + cityClean.slice(1);

  return (
    <div className="screen">
      <div className="result-head">
        <span className="result-pill">Your Revenue Estimate</span>
        <h2 className="result-title">{cityTitle} Roofing Could Generate</h2>
        <CountRange low={estimate.revenueLow} high={estimate.revenueHigh} />
        <div className="result-caption">estimated new monthly revenue from Google Ads</div>
      </div>

      <div className="disclaimer">
        <WarningIcon />
        <span>
          This is an estimate only based on Florida roofing industry benchmarks. Strong Brands
          United does not guarantee specific lead volumes, revenue figures, or business outcomes.
          Actual results vary.
        </span>
      </div>

      <div className="stat-row">
        <StatCard value={`${estimate.leadsLow}–${estimate.leadsHigh}`} label="Est. Leads / Month" />
        <StatCard value={estimate.plan} label="Recommended Plan" />
        <StatCard
          value={`${fmtMoney(estimate.budgetLow)}–${fmtMoney(estimate.budgetHigh)}`}
          label="Ad Budget"
        />
      </div>

      <InsightBlock answers={answers} estimate={estimate} />

      <a className="btn-navy" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
        Book Your Free Strategy Call <ArrowRight />
      </a>
      <p className="cta-sub">
        30-minute call. No obligation.
        <br />We show you exactly how to get these results.
      </p>

      <button
        className="back-btn"
        onClick={onReset}
        style={{ display: 'block', margin: '14px auto 0' }}
      >
        <ArrowLeft /> Start over
      </button>
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function RevenueEstimator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    city: '',
    ticket: '',
    leads: '',
    budget: '',
    service: '',
  });
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
  });

  const totalSteps = QUESTIONS.length + 1;
  const contactStep = QUESTIONS.length + 1;
  const resultStep = QUESTIONS.length + 2;

  useEffect(() => {
    const previous = document.title;
    document.title = 'Free Revenue Estimate — Digital Roofers by SBU';
    return () => {
      document.title = previous;
    };
  }, []);

  const setAnswer = (key, value) => setAnswers((prev) => ({ ...prev, [key]: value }));
  const setContactField = (key, value) =>
    setContact((prev) => ({ ...prev, [key]: value }));
  const advance = () => setStep((s) => s + 1);
  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const reset = () => {
    setStep(0);
    setAnswers({ city: '', ticket: '', leads: '', budget: '', service: '' });
    setContact({ firstName: '', lastName: '', email: '', phone: '', companyName: '' });
  };

  const onSelectOption = (qIndex, qId) => (value) => {
    setAnswer(qId, value);
    setTimeout(() => setStep(qIndex + 2), 180);
  };

  let body;
  if (step === 0) {
    body = <IntroScreen onStart={() => setStep(1)} />;
  } else if (step >= 1 && step <= QUESTIONS.length) {
    const qIdx = step - 1;
    const q = QUESTIONS[qIdx];
    if (q.type === 'text') {
      body = (
        <TextStep
          key={q.id}
          q={q}
          value={answers[q.id]}
          onChange={(v) => setAnswer(q.id, v)}
          onNext={advance}
          onBack={goBack}
        />
      );
    } else {
      body = (
        <OptionStep
          key={q.id}
          q={q}
          value={answers[q.id]}
          onSelect={onSelectOption(qIdx, q.id)}
          onBack={goBack}
        />
      );
    }
  } else if (step === contactStep) {
    body = (
      <ContactStep
        contact={contact}
        answers={answers}
        onChange={setContactField}
        onSubmit={() => setStep(resultStep)}
        onBack={goBack}
      />
    );
  } else {
    body = <ResultScreen answers={answers} onReset={reset} />;
  }

  return (
    <div className="estimator-page">
      <div className="gold-rule" />
      <div className="app">
        <Link to="/" className="home-link">
          <ArrowLeft /> Back to home
        </Link>
        <div className="brand">
          <Link to="/" className="brand-mark">
            <span className="name">
              Digital Roofers<span className="accent">/</span>SBU
            </span>
          </Link>
          <span className="brand-tag">Florida Roofing Leads · Guaranteed Strategy</span>
        </div>

        <ProgressBar step={step > totalSteps ? totalSteps : step} total={totalSteps} />

        <div className="card">{body}</div>

        <div className="ftr">
          Digital Roofers by SBU — Strong Brands United Corporation — Tampa, FL
        </div>
      </div>
    </div>
  );
}
