/**
 * Generic card surface. Use `surface` to switch background and `shadow` for depth.
 */
export default function Card({
  children,
  as: As = 'div',
  surface = 'default',   // default | alt | inverse | deep
  shadow = 'raised',     // flat | raised | lifted | floating
  className = '',
  ...rest
}) {
  const cls = `dr-card dr-card--surface-${surface} dr-card--shadow-${shadow} ${className}`.trim();
  return <As className={cls} {...rest}>{children}</As>;
}
