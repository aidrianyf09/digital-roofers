export default function Section({
  as: As = 'section',
  children,
  surface,
  id,
  className = '',
  ...rest
}) {
  const surfaceClass = surface ? `dr-surface-${surface}` : '';
  const cls = `dr-section ${surfaceClass} ${className}`.trim();
  return (
    <As id={id} className={cls} {...rest}>
      {children}
    </As>
  );
}
