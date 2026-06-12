import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Nav from '../components/layout/Nav.jsx';
import Footer from '../components/layout/Footer.jsx';
import ServiceHero from '../sections/service/ServiceHero.jsx';
import ServiceTrustStrip from '../sections/service/ServiceTrustStrip.jsx';
import Wedge from '../sections/service/Wedge.jsx';
import HowItWorks from '../sections/service/HowItWorks.jsx';
import Objections from '../sections/service/Objections.jsx';
import PricingSignal from '../sections/service/PricingSignal.jsx';
import Included from '../sections/service/Included.jsx';
import Stack from '../sections/service/Stack.jsx';
import ServiceCTA from '../sections/service/ServiceCTA.jsx';
import { getServiceBySlug } from '../data/services.js';

export default function ServicePage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      <Nav />
      <main className="dr-svc" style={{ '--svc-accent': service.accent }}>
        <ServiceHero service={service} />
        <ServiceTrustStrip service={service} />
        <Wedge service={service} />
        <HowItWorks service={service} />
        <Objections service={service} />
        <PricingSignal service={service} />
        <Included service={service} />
        <Stack service={service} />
        <ServiceCTA service={service} />
      </main>
      <Footer />
    </>
  );
}
