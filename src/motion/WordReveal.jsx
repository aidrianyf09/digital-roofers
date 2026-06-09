import { motion, useReducedMotion } from 'motion/react';
import { ease, dur } from './motion-config.js';

/**
 * Split text into words and reveal each with stagger. Pass `highlight` (a string
 * exactly matching one of the words) to render it in --accent. `mode="letters"`
 * splits per character inside the highlight word for the hero slam-in.
 */
export default function WordReveal({
  text,
  as: As = 'h1',
  highlight,
  highlightAs = 'span',
  className = '',
  delay = 0,
  stagger = 0.06,
  mode = 'words',
  ...rest
}) {
  const reduced = useReducedMotion();
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: { transition: { delayChildren: delay, staggerChildren: reduced ? 0 : stagger } },
  };
  const wordVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: dur.slow, ease: ease.outExpo } },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      {...rest}
    >
      <As style={{ margin: 0 }}>
        {words.map((w, i) => {
          const isHighlight = highlight && w === highlight;
          const Wrap = isHighlight ? highlightAs : 'span';
          const wrapStyle = isHighlight ? { color: 'var(--accent)' } : undefined;

          if (isHighlight && mode === 'letters') {
            return (
              <span key={i} className="dr-word-reveal__word">
                <Wrap style={wrapStyle} className="dr-word-reveal__highlight">
                  {Array.from(w).map((char, j) => (
                    <span key={j} className="dr-word-reveal__letter-wrap">
                      <motion.span
                        className="dr-word-reveal__letter"
                        variants={wordVariants}
                      >
                        {char}
                      </motion.span>
                    </span>
                  ))}
                </Wrap>
              </span>
            );
          }

          return (
            <span key={i} className="dr-word-reveal__word">
              <Wrap style={wrapStyle}>
                <motion.span className="dr-word-reveal__inner" variants={wordVariants}>
                  {w}
                </motion.span>
              </Wrap>
            </span>
          );
        })}
      </As>
    </motion.div>
  );
}
