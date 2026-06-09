import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../../motion/motion-config.js';

export default function PageTransition({ children }) {
  const reduced = useReducedMotion();
  const variants = reduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, transform: 'translateY(12px)' },
        animate: { opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.24, ease: ease.outExpo } },
        exit:    { opacity: 0, transform: 'translateY(-8px)', transition: { duration: 0.14, ease: ease.outQuart } },
      };
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={variants}>
      {children}
    </motion.div>
  );
}
