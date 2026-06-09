import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from '../../motion/motion-config.js';

export default function PageTransition({ children }) {
  const reduced = useReducedMotion();
  const variants = reduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0, transition: { duration: dur.base, ease: ease.outExpo } },
        exit:    { opacity: 0, y: -8, transition: { duration: dur.fast, ease: ease.outQuart } },
      };
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={variants}>
      {children}
    </motion.div>
  );
}
