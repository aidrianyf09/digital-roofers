/**
 * Placeholder logo built from primitives until the brand-kit SVG arrives.
 * Approximates: 4-bar growth chart + orange signal mark + ROOFERS / DIGITAL BY SBU.
 * Swap this component body with the real SVG when source files land.
 */
export default function Logo({ variant = 'horizontal', tone = 'dark', size = 40, className = '' }) {
  const isLight = tone === 'light';
  const wordmarkColor = isLight ? 'var(--brand-white)' : 'var(--brand-charcoal)';
  const subColor = isLight ? 'var(--brand-white)' : 'var(--brand-teal)';
  const barColor = isLight ? 'var(--brand-white)' : 'var(--brand-sapphire)';

  return (
    <span
      className={`dr-logo dr-logo--${variant} dr-logo--${tone} ${className}`}
      role="img"
      aria-label="Digital Roofers by SBU"
    >
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        aria-hidden="true"
        className="dr-logo__mark"
      >
        {/* signal / antenna mark */}
        <path
          d="M40 6 Q46 0 52 6"
          stroke="var(--brand-coral)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="46" cy="3" r="2" fill="var(--brand-coral)" />
        {/* ascending bar chart */}
        <rect x="6"  y="44" width="10" height="14" rx="1.5" fill={barColor} />
        <rect x="20" y="36" width="10" height="22" rx="1.5" fill={barColor} />
        <rect x="34" y="26" width="10" height="32" rx="1.5" fill={barColor} />
        <rect x="48" y="14" width="10" height="44" rx="1.5" fill={barColor} />
      </svg>

      {variant !== 'icon' && (
        <span className="dr-logo__words" style={{ color: wordmarkColor }}>
          <span className="dr-logo__primary">ROOFERS</span>
          <span className="dr-logo__sub" style={{ color: subColor }}>
            DIGITAL <span style={{ color: wordmarkColor }}>BY SBU</span>
          </span>
        </span>
      )}
    </span>
  );
}
