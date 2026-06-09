import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { CITIES } from '../../data/cities.js';
import { ease, dur } from '../../motion/motion-config.js';

/**
 * Stylized SVG outline of Florida with 6 clickable city pins.
 * Each pin navigates to /<citySlug>. Pins gain a Teal ring on hover.
 * HQ marker (Tampa) renders slightly larger with a Coral signal mark.
 */
const FLORIDA_PATH =
  // Hand-drawn simplified outline. Panhandle top-left across to peninsula,
  // peninsula down through Miami, back up the gulf coast.
  'M 30 60 ' +
  'L 120 50 ' +
  'L 200 55 ' +
  'L 245 60 ' +
  'L 280 65 ' +
  'L 290 80 ' +
  'L 295 105 ' +
  'L 300 130 ' +
  'L 305 160 ' +
  'L 305 195 ' +
  'L 300 225 ' +
  'L 295 250 ' +
  'L 285 265 ' +
  'L 270 270 ' +
  'L 255 263 ' +
  'L 245 245 ' +
  'L 240 220 ' +
  'L 232 205 ' +
  'L 220 192 ' +
  'L 210 185 ' +
  'L 200 175 ' +
  'L 190 162 ' +
  'L 180 148 ' +
  'L 168 138 ' +
  'L 152 128 ' +
  'L 132 118 ' +
  'L 108 108 ' +
  'L 82 95 ' +
  'L 58 82 ' +
  'L 38 72 ' +
  'Z';

export default function FloridaMap() {
  const reduced = useReducedMotion();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="dr-map">
      <motion.svg
        viewBox="0 0 340 300"
        xmlns="http://www.w3.org/2000/svg"
        className="dr-map__svg"
        aria-label="Florida service area map"
        role="img"
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? false : { opacity: 1 }}
        transition={{ duration: dur.slow, ease: ease.outExpo, delay: 0.3 }}
      >
        {/* Florida outline */}
        <motion.path
          d={FLORIDA_PATH}
          fill="var(--surface-alt)"
          stroke="var(--brand-charcoal)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={reduced ? false : { pathLength: 1 }}
          transition={{ duration: 1.8, ease: ease.outExpo, delay: 0.4 }}
        />

        {/* Tampa Bay subtle indent (decorative) */}
        <circle cx="208" cy="172" r="3" fill="var(--surface)" opacity="0.5" />

        {/* City pins */}
        {CITIES.map((city, i) => {
          const isHovered = hoveredId === city.slug;
          const isHQ = city.hq;
          return (
            <Link
              key={city.slug}
              to={`/${city.slug}`}
              aria-label={`Roofing marketing in ${city.name}`}
              onMouseEnter={() => setHoveredId(city.slug)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(city.slug)}
              onBlur={() => setHoveredId(null)}
            >
              <g className="dr-map__pin">
                {/* Outer ring (appears on hover/focus) */}
                <motion.circle
                  cx={city.coords.x}
                  cy={city.coords.y}
                  r={isHQ ? 12 : 10}
                  fill="none"
                  stroke="var(--brand-teal)"
                  strokeWidth="1.5"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.7,
                  }}
                  transition={{ duration: dur.fast, ease: ease.outExpo }}
                  style={{ transformOrigin: `${city.coords.x}px ${city.coords.y}px` }}
                />
                {/* Pin dot */}
                <motion.circle
                  cx={city.coords.x}
                  cy={city.coords.y}
                  r={isHQ ? 6 : 5}
                  fill={isHQ ? 'var(--brand-coral)' : 'var(--brand-sapphire)'}
                  initial={reduced ? false : { opacity: 0, scale: 0.5 }}
                  animate={reduced ? false : { opacity: 1, scale: 1 }}
                  transition={{
                    duration: dur.base,
                    ease: ease.outExpo,
                    delay: 1.6 + i * 0.08,
                  }}
                  style={{ transformOrigin: `${city.coords.x}px ${city.coords.y}px` }}
                />
                {/* HQ signal mark — small Coral arc above Tampa */}
                {isHQ && (
                  <motion.path
                    d={`M ${city.coords.x - 5} ${city.coords.y - 9} Q ${city.coords.x} ${city.coords.y - 14} ${city.coords.x + 5} ${city.coords.y - 9}`}
                    fill="none"
                    stroke="var(--brand-coral)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={reduced ? false : { opacity: 0 }}
                    animate={reduced ? false : { opacity: 1 }}
                    transition={{ duration: dur.base, ease: ease.outExpo, delay: 2.2 }}
                  />
                )}
                {/* City label */}
                <motion.text
                  x={city.coords.x + (isHQ ? 14 : 12)}
                  y={city.coords.y + 4}
                  fill="var(--brand-charcoal)"
                  fontFamily="var(--font-body)"
                  fontSize="11"
                  fontWeight={isHovered ? '700' : '600'}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={reduced ? false : { opacity: 1 }}
                  transition={{
                    duration: dur.base,
                    ease: ease.outExpo,
                    delay: 1.7 + i * 0.08,
                  }}
                >
                  {city.name}
                </motion.text>
                {/* HQ caption */}
                {isHQ && (
                  <motion.text
                    x={city.coords.x + 14}
                    y={city.coords.y + 17}
                    fill="var(--brand-coral)"
                    fontFamily="var(--font-body)"
                    fontSize="9"
                    fontWeight="700"
                    style={{ letterSpacing: '0.1em' }}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={reduced ? false : { opacity: 1 }}
                    transition={{ duration: dur.base, ease: ease.outExpo, delay: 2.4 }}
                  >
                    OUR HQ
                  </motion.text>
                )}
              </g>
            </Link>
          );
        })}
      </motion.svg>
      <p className="dr-map__hint">
        <span className="dr-map__hint-dot" aria-hidden="true" />
        Click your city to see how we work there.
      </p>
    </div>
  );
}
