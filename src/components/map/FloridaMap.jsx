import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { CITIES } from '../../data/cities.js';
import { ease, dur } from '../../motion/motion-config.js';

/**
 * Stylized SVG outline of Florida with 6 clickable city pins.
 * Pins navigate to /<citySlug>. Hover/focus shows a Teal ring.
 * HQ marker (Tampa) renders slightly larger with a Coral signal mark
 * echoing the brand-kit logo's antenna.
 *
 * Hit areas are 22px-radius transparent circles for WCAG 2.5.5 compliance —
 * the visible dot stays small but the touch surface is ~44px diameter.
 */

// Stylized Florida outline. ~35 anchor points, traced clockwise from
// Pensacola along the Gulf coast, around the southern tip, up the Atlantic,
// across the Georgia line, back to Pensacola.
const FLORIDA_PATH = [
  'M 15 70',
  // Panhandle south coast, west to east
  'L 35 67 L 70 68 L 105 75 L 125 82',
  // Big Bend, curving down to peninsula
  'L 140 95 L 155 108 L 170 118 L 180 130',
  // Gulf coast — Tampa Bay area indents slightly
  'L 188 145 L 198 155 L 200 163 L 205 170 L 213 178 L 218 190',
  // Continuing south down the gulf
  'L 230 215 L 242 230 L 252 245',
  // Cape Sable, around the southern tip
  'L 268 260 L 285 262',
  // Up the Atlantic coast
  'L 295 245 L 298 225 L 303 205 L 308 180 L 312 158',
  // Cape Canaveral bump, north Atlantic coast
  'L 308 140 L 302 118 L 295 95 L 285 75',
  // Georgia line, east to west across north Florida
  'L 230 67 L 195 63 L 158 60 L 125 58 L 85 58 L 50 60 L 18 65',
  'Z',
].join(' ');

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

        {/* City pins */}
        {CITIES.map((city, i) => {
          const isHovered = hoveredId === city.slug;
          const isHQ = city.hq;
          const labelLeft = city.labelSide === 'left';
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
                {/* Invisible 22px hit area — WCAG 2.5.5 compliance.
                    Click anywhere within ~44px diameter to navigate. */}
                <circle
                  cx={city.coords.x}
                  cy={city.coords.y}
                  r="22"
                  fill="transparent"
                />
                {/* Outer hover/focus ring */}
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
                {/* HQ signal arc */}
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
                  x={city.coords.x + (labelLeft ? -(isHQ ? 14 : 12) : (isHQ ? 14 : 12))}
                  y={city.coords.y + 4}
                  textAnchor={labelLeft ? 'end' : 'start'}
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
                {/* HQ caption under Tampa */}
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
      <p className="dr-map__hint">Click your city.</p>
    </div>
  );
}
