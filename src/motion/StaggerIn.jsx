import { motion, useReducedMotion } from 'motion/react';
import { staggerContainer, fadeUp, inViewDefaults } from './motion-config.js';

export default function StaggerIn({
  children,
  as: As = 'div',
  delayChildren = 0,
  staggerChildren = 0.08,
  className = '',
  ...rest
}) {
  const reduced = useReducedMotion();
  const MotionAs = motion[As] || motion.div;
  return (
    <MotionAs
      className={className}
      variants={staggerContainer(delayChildren, reduced ? 0 : staggerChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={inViewDefaults}
      {...rest}
    >
      {children}
    </MotionAs>
  );
}

export function StaggerItem({ children, as: As = 'div', className = '', ...rest }) {
  const MotionAs = motion[As] || motion.div;
  return (
    <MotionAs className={className} variants={fadeUp} {...rest}>
      {children}
    </MotionAs>
  );
}
