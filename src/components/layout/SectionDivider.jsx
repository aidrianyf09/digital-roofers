/**
 * Quiet trade-magazine section marker. Hairline rule + 'Section X. Label.' in
 * Georgia italic, right-aligned. Replaces the numbered '01 / What We Build'
 * eyebrow rhythm.
 */
export default function SectionDivider({ letter, label, className = '' }) {
  return (
    <div className={`dr-section-divider ${className}`.trim()}>
      <hr className="dr-section-divider__rule" />
      <span className="dr-section-divider__label">
        Section {letter}. {label}.
      </span>
    </div>
  );
}
