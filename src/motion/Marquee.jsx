import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

/**
 * Infinite auto-scrolling marquee. Embla provides drag/snap; AutoScroll plugin runs continuously.
 * Pass `direction="backward"` to reverse.
 */
export default function Marquee({
  children,
  direction = 'forward',
  speed = 1,
  className = '',
  containerClassName = '',
  slideClassName = '',
}) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: 'start', containScroll: false },
    [AutoScroll({ speed, direction, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  useEffect(() => {
    // no-op — Embla owns the loop; placeholder if we ever need to pause programmatically
  }, []);

  const items = Array.isArray(children) ? children : [children];
  // duplicate for visual continuity
  const renderItems = [...items, ...items, ...items];

  return (
    <div className={`dr-marquee ${className}`.trim()} ref={emblaRef}>
      <div className={`dr-marquee__container ${containerClassName}`.trim()}>
        {renderItems.map((child, i) => (
          <div key={i} className={`dr-marquee__slide ${slideClassName}`.trim()}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
