import { Link } from 'react-router-dom';
import { IconArrowRight } from '@tabler/icons-react';

/**
 * Brand button. Renders as <button>, <a>, or react-router <Link> based on props.
 * Variants:
 *   - primary (Sapphire) — default
 *   - urgency (Coral)    — for high-attention CTAs
 *   - ghost (outlined)   — secondary actions
 * Sizes: sm | md | lg
 */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  arrow = true,
  className = '',
  ...rest
}) {
  const cls = `dr-btn dr-btn--${variant} dr-btn--${size} ${className}`.trim();

  const content = (
    <>
      <span className="dr-btn__label">{children}</span>
      {arrow && (
        <IconArrowRight size={18} stroke={2} className="dr-btn__arrow" aria-hidden="true" />
      )}
    </>
  );

  if (to) {
    return <Link to={to} className={cls} {...rest}>{content}</Link>;
  }
  if (href) {
    return <a href={href} className={cls} {...rest}>{content}</a>;
  }
  return <button type="button" className={cls} {...rest}>{content}</button>;
}
