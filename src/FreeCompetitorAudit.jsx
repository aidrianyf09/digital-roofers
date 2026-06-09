import { useEffect } from 'react';
import Nav from './components/layout/Nav.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './sections/home/Hero.jsx';
import TrustStrip from './sections/home/TrustStrip.jsx';
import Services from './sections/home/Services.jsx';
import ThreeColumns from './sections/home/ThreeColumns.jsx';
import DetailBlocks from './sections/home/DetailBlocks.jsx';
import StatsMarquee from './sections/home/StatsMarquee.jsx';
import QuoteBlock from './sections/home/QuoteBlock.jsx';
import FinalCTA from './sections/home/FinalCTA.jsx';

export default function FreeCompetitorAudit() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <ThreeColumns />
        <DetailBlocks />
        <StatsMarquee />
        <QuoteBlock />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
