import { IconQuote } from '@tabler/icons-react';

/**
 * Georgia italic pull-quote. The brand-kit "editorial human" accent.
 */
export default function Quote({ children, attribution, role, className = '' }) {
  return (
    <figure className={`dr-quote-block ${className}`.trim()}>
      <IconQuote size={32} stroke={1.75} className="dr-quote-block__icon" aria-hidden="true" />
      <blockquote className="dr-quote-block__text">{children}</blockquote>
      {(attribution || role) && (
        <figcaption className="dr-quote-block__attr">
          {attribution && <span className="dr-quote-block__name">{attribution}</span>}
          {role && <span className="dr-quote-block__role">{role}</span>}
        </figcaption>
      )}
    </figure>
  );
}
