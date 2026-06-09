import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import FreeCompetitorAudit from './FreeCompetitorAudit.jsx';
import RevenueEstimator from './RevenueEstimator.jsx';
import FreeAudit from './FreeAudit.jsx';
import CityPage from './pages/CityPage.jsx';
import PageTransition from './components/layout/PageTransition.jsx';
import { useLenis } from './hooks/useLenis.js';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><FreeCompetitorAudit /></PageTransition>} />
        <Route path="/revenue-estimator" element={<PageTransition><RevenueEstimator /></PageTransition>} />
        <Route path="/free-audit" element={<PageTransition><FreeAudit /></PageTransition>} />
        <Route path="/:slug" element={<PageTransition><CityPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useLenis();
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
