import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  IconArrowRight, IconArrowLeft, IconClock, IconCircleCheck, IconShield,
  IconAlertTriangle, IconHome, IconCalendarEvent, IconChartBar, IconLoader2,
  IconRotateClockwise2,
} from '@tabler/icons-react';
import { sendLeadToGhl } from './lib/ghl-webhook';
import Logo from './components/layout/Logo.jsx';
import { ease, dur } from './motion/motion-config.js';
import CountUp from './motion/CountUp.jsx';

const CALENDLY_URL = 'https://calendly.com/office-strongbrandsunited/30min';
const AUDIT_PATH = '/free-audit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,}$/;

/* ============================================================
   DATA — unchanged from V1
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
   CALCULATION — unchanged from V1
   ============================================================ */
function computeEstimate(answers) {
  const ticket  = QUESTIONS[1].options.find((o) => o.value === answers.ticket)  || QUESTIONS[1].options[1];
  const leads   = QUESTIONS[2].options.find((o) => o.value === answers.leads)   || QUESTIONS[2].options[1];
  const budget  = QUESTIONS[3].options.find((o) => o.value === answers.budget)  || QUESTIONS[3].options[2];
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
   PROGRESS RAIL
   ============================================================ */
function ProgressRail({ step, total }) {
  const pct = step === 0 ? 0 : Math.min(100, Math.round((step / total) * 100));
  const displayStep = Math.max(1, step);
  return (
    <div className="dr-re__progress">
      <div className="dr-re__progress-meta">
        <span>{step === 0 ? 'Get Started' : `Step ${displayStep} of ${total}`}</span>
        <span className="dr-tabular">{pct}%</span>
      </div>
      <div className="dr-re__progress-track">
        <motion.div
          className="dr-re__progress-fill"
          initial={false}
          animate={{ width: pct + '%' }}
          transition={{ duration: dur.base, ease: ease.outExpo }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   STEP TRANSITION WRAPPER
   ============================================================ */
const screenVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0, transition: { duration: dur.base, ease: ease.outExpo } },
  exit:    { opacity: 0, y: -16, transition: { duration: dur.fast, ease: ease.outQuart } },
};

/* ============================================================
   SCREENS
   ============================================================ */
function IntroScreen({ onStart }) {
  return (
    <motion.div className="dr-re__screen" variants={screenVariants} initial="initial" animate="enter" exit="exit">
      <span className="dr-re__intro-icon" aria-hidden="true">
        <IconHome size={36} stroke={1.75} />
      </span>
      <span className="dr-re__eyebrow">Florida Roofing · Revenue Tool</span>
      <h1 className="dr-re__title">How Many Roofing Leads Could Google Ads Get You?</h1>
      <p className="dr-re__sub">
        Answer 5 questions. Get your personalized revenue estimate in 60 seconds.
        <br />No fluff. Just your numbers.
      </p>
      <div className="dr-re__pills">
        <span className="dr-re__pill"><IconClock size={16} stroke={2} /> 60 seconds</span>
        <span className="dr-re__pill"><IconCircleCheck size={16} stroke={2} /> Free estimate</span>
        <span className="dr-re__pill"><IconShield size={16} stroke={2} /> No obligation</span>
      </div>
      <button type="button" className="dr-re__btn-primary" onClick={onStart}>
        Get My Free Revenue Estimate <IconArrowRight size={18} stroke={2} />
      </button>
    </motion.div>
  );
}

function OptionStep({ q, value, onSelect, onBack }) {
  return (
    <motion.div className="dr-re__screen" variants={screenVariants} initial="initial" animate="enter" exit="exit">
      <header className="dr-re__q-head">
        <span className="dr-re__q-label">{q.label}</span>
        <h2 className="dr-re__q-title">{q.title}</h2>
        <p className="dr-re__q-sub">{q.sub}</p>
      </header>
      <div className="dr-re__options">
        {q.options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              className={`dr-re__option ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelect(opt.value)}
            >
              <span className="dr-re__option-body">
                <span className="dr-re__option-label">{opt.label}</span>
                <span className="dr-re__option-desc">{opt.desc}</span>
              </span>
              <span className="dr-re__option-arrow" aria-hidden="true">
                <IconArrowRight size={18} stroke={2} />
              </span>
            </button>
          );
        })}
      </div>
      {onBack && (
        <button type="button" className="dr-re__back" onClick={onBack}>
          <IconArrowLeft size={16} stroke={2} /> Back
        </button>
      )}
    </motion.div>
  );
}

function TextStep({ q, value, onChange, onNext, onBack }) {
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const disabled = !value || value.trim().length < 2;
  const handleKey = (e) => { if (e.key === 'Enter' && !disabled) onNext(); };

  return (
    <motion.div className="dr-re__screen" variants={screenVariants} initial="initial" animate="enter" exit="exit">
      <header className="dr-re__q-head">
        <span className="dr-re__q-label">{q.label}</span>
        <h2 className="dr-re__q-title">{q.title}</h2>
        <p className="dr-re__q-sub">{q.sub}</p>
      </header>
      <label className="dr-re__input-label" htmlFor="re-text">{q.inputLabel}</label>
      <input
        ref={inputRef}
        id="re-text"
        type="text"
        className="dr-re__input"
        placeholder={q.placeholder}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
      />
      <button type="button" className="dr-re__btn-primary" disabled={disabled} onClick={onNext}>
        Continue <IconArrowRight size={18} stroke={2} />
      </button>
      {onBack && (
        <button type="button" className="dr-re__back" onClick={onBack}>
          <IconArrowLeft size={16} stroke={2} /> Back
        </button>
      )}
    </motion.div>
  );
}

function ContactStep({ contact, answers, onChange, onSubmit, onBack }) {
  const [submitting, setSubmitting] = useState(false);
  const firstRef = useRef(null);
  useEffect(() => { firstRef.current?.focus(); }, []);

  const trimmed = {
    firstName:   (contact.firstName   || '').trim(),
    lastName:    (contact.lastName    || '').trim(),
    email:       (contact.email       || '').trim(),
    phone:       (contact.phone       || '').trim(),
    companyName: (contact.companyName || '').trim(),
  };
  const valid =
    trimmed.firstName.length >= 1 &&
    trimmed.lastName.length  >= 1 &&
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
    <motion.form
      className="dr-re__screen"
      onSubmit={handleSubmit}
      variants={screenVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <header className="dr-re__q-head">
        <span className="dr-re__q-label">Almost there</span>
        <h2 className="dr-re__q-title">Where should we send your estimate?</h2>
        <p className="dr-re__q-sub">
          Your custom revenue range is ready. Tell us where to send it and we&apos;ll unlock the
          breakdown plus a strategy call invite.
        </p>
      </header>

      <div className="dr-re__contact-grid">
        <div className="dr-re__field">
          <label className="dr-re__input-label" htmlFor="re-firstName">First name</label>
          <input
            ref={firstRef}
            id="re-firstName"
            className="dr-re__input"
            type="text"
            autoComplete="given-name"
            value={contact.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
          />
        </div>
        <div className="dr-re__field">
          <label className="dr-re__input-label" htmlFor="re-lastName">Last name</label>
          <input
            id="re-lastName"
            className="dr-re__input"
            type="text"
            autoComplete="family-name"
            value={contact.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
          />
        </div>
        <div className="dr-re__field dr-re__field--full">
          <label className="dr-re__input-label" htmlFor="re-email">Email</label>
          <input
            id="re-email"
            className="dr-re__input"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={contact.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>
        <div className="dr-re__field dr-re__field--full">
          <label className="dr-re__input-label" htmlFor="re-phone">Phone</label>
          <input
            id="re-phone"
            className="dr-re__input"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+1 555 555 0123"
            value={contact.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>
        <div className="dr-re__field dr-re__field--full">
          <label className="dr-re__input-label" htmlFor="re-company">
            Company <span className="dr-re__optional">(optional)</span>
          </label>
          <input
            id="re-company"
            className="dr-re__input"
            type="text"
            autoComplete="organization"
            value={contact.companyName}
            onChange={(e) => onChange('companyName', e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="dr-re__btn-primary" disabled={!valid || submitting}>
        {submitting ? (
          <>
            <IconLoader2 size={18} stroke={2} className="dr-re__spin" /> Calculating your estimate…
          </>
        ) : (
          <>Show My Revenue Estimate <IconArrowRight size={18} stroke={2} /></>
        )}
      </button>
      {onBack && (
        <button type="button" className="dr-re__back" onClick={onBack} disabled={submitting}>
          <IconArrowLeft size={16} stroke={2} /> Back
        </button>
      )}
    </motion.form>
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
    <div className="dr-re__insight">
      <span className="dr-re__insight-eyebrow">
        <IconChartBar size={14} stroke={2} /> Market Insight
      </span>
      {loading ? (
        <div className="dr-re__insight-loading">
          <IconLoader2 size={18} stroke={2} className="dr-re__spin" />
          Analyzing your market…
        </div>
      ) : (
        <blockquote className="dr-re__insight-body">&ldquo;{text}&rdquo;</blockquote>
      )}
    </div>
  );
}

function ResultScreen({ answers, onReset }) {
  const estimate = useMemo(() => computeEstimate(answers), [answers]);
  const cityClean = (answers.city || 'Your').trim().replace(/\s+/g, ' ');
  const cityTitle = cityClean.charAt(0).toUpperCase() + cityClean.slice(1);

  return (
    <motion.div
      className="dr-re__screen dr-re__screen--result"
      variants={screenVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <div className="dr-re__result-head">
        <span className="dr-re__result-pill">Your Revenue Estimate</span>
        <h2 className="dr-re__result-title">{cityTitle} Roofing Could Generate</h2>
        <div className="dr-re__result-number" key={`${estimate.revenueLow}-${estimate.revenueHigh}`}>
          <CountUp to={estimate.revenueLow}  duration={1100} format={fmtMoney} />
          <span className="dr-re__result-dash">–</span>
          <CountUp to={estimate.revenueHigh} duration={1100} format={fmtMoney} />
        </div>
        <div className="dr-re__result-caption">
          estimated new monthly revenue from Google Ads
        </div>
      </div>

      <div className="dr-re__disclaimer">
        <IconAlertTriangle size={18} stroke={2} className="dr-re__disclaimer-icon" />
        <span>
          This is an estimate only based on Florida roofing industry benchmarks. Strong Brands
          United does not guarantee specific lead volumes, revenue figures, or business outcomes.
          Actual results vary.
        </span>
      </div>

      <div className="dr-re__stats">
        <div className="dr-re__stat">
          <div className="dr-re__stat-v dr-tabular">
            {estimate.leadsLow}–{estimate.leadsHigh}
          </div>
          <div className="dr-re__stat-l">Est. Leads / Month</div>
        </div>
        <div className="dr-re__stat">
          <div className="dr-re__stat-v">{estimate.plan}</div>
          <div className="dr-re__stat-l">Recommended Plan</div>
        </div>
        <div className="dr-re__stat">
          <div className="dr-re__stat-v dr-tabular">
            {fmtMoney(estimate.budgetLow)}–{fmtMoney(estimate.budgetHigh)}
          </div>
          <div className="dr-re__stat-l">Ad Budget</div>
        </div>
      </div>

      <InsightBlock answers={answers} estimate={estimate} />

      <div className="dr-re__result-ctas">
        <Link to={AUDIT_PATH} className="dr-re__btn-primary">
          Book My Free Audit <IconArrowRight size={18} stroke={2} />
        </Link>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="dr-re__btn-secondary"
        >
          <IconCalendarEvent size={16} stroke={2} /> Or talk to us directly
        </a>
      </div>
      <p className="dr-re__cta-sub">
        Free 15-minute audit. Data-driven roadmap.
        <br />We show you exactly how to get to these numbers.
      </p>

      <button type="button" className="dr-re__back dr-re__back--center" onClick={onReset}>
        <IconRotateClockwise2 size={16} stroke={2} /> Start over
      </button>
    </motion.div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function RevenueEstimator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    city: '', ticket: '', leads: '', budget: '', service: '',
  });
  const [contact, setContact] = useState({
    firstName: '', lastName: '', email: '', phone: '', companyName: '',
  });

  const totalSteps = QUESTIONS.length + 1;
  const contactStep = QUESTIONS.length + 1;
  const resultStep = QUESTIONS.length + 2;

  useEffect(() => {
    const previous = document.title;
    document.title = 'Free Revenue Estimate — Digital Roofers by SBU';
    return () => { document.title = previous; };
  }, []);

  const setAnswer = (key, value) => setAnswers((prev) => ({ ...prev, [key]: value }));
  const setContactField = (key, value) => setContact((prev) => ({ ...prev, [key]: value }));
  const advance = () => setStep((s) => s + 1);
  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const reset = () => {
    setStep(0);
    setAnswers({ city: '', ticket: '', leads: '', budget: '', service: '' });
    setContact({ firstName: '', lastName: '', email: '', phone: '', companyName: '' });
  };

  const onSelectOption = (qIndex, qId) => (value) => {
    setAnswer(qId, value);
    setTimeout(() => setStep(qIndex + 2), 220);
  };

  let body;
  let bodyKey = `step-${step}`;
  if (step === 0) {
    body = <IntroScreen onStart={() => setStep(1)} />;
  } else if (step >= 1 && step <= QUESTIONS.length) {
    const qIdx = step - 1;
    const q = QUESTIONS[qIdx];
    bodyKey = `q-${q.id}`;
    body = q.type === 'text' ? (
      <TextStep
        key={q.id}
        q={q}
        value={answers[q.id]}
        onChange={(v) => setAnswer(q.id, v)}
        onNext={advance}
        onBack={goBack}
      />
    ) : (
      <OptionStep
        key={q.id}
        q={q}
        value={answers[q.id]}
        onSelect={onSelectOption(qIdx, q.id)}
        onBack={goBack}
      />
    );
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
    <main className="dr-re">
      <div className="dr-re__rule" aria-hidden="true" />
      <div className="dr-re__shell">
        <Link to="/" className="dr-re__home-link">
          <IconArrowLeft size={16} stroke={2} /> Back to home
        </Link>

        <div className="dr-re__brand">
          <Link to="/" className="dr-re__brand-mark" aria-label="Digital Roofers home">
            <Logo variant="horizontal" tone="dark" size={36} />
          </Link>
          <span className="dr-re__brand-tag">
            Florida Roofing Growth · Data-Driven Strategy
          </span>
        </div>

        <ProgressRail step={step > totalSteps ? totalSteps : step} total={totalSteps} />

        <div className="dr-re__card">
          <AnimatePresence mode="wait">
            <motion.div key={bodyKey} className="dr-re__card-inner">
              {body}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="dr-re__footer">
          Digital Roofers by SBU — Strong Brands United Corporation — Tampa, FL
        </div>
      </div>
    </main>
  );
}
