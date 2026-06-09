export default function Container({ as: As = 'div', children, className = '', ...rest }) {
  return (
    <As className={`dr-container ${className}`.trim()} {...rest}>
      {children}
    </As>
  );
}
