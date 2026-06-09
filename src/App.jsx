import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import FreeCompetitorAudit from './FreeCompetitorAudit.jsx';
import RevenueEstimator from './RevenueEstimator.jsx';
import FreeAudit from './FreeAudit.jsx';
import CityPage from './pages/CityPage.jsx';
import PageTransition from './components/layout/PageTransition.jsx';
import { useLenis } from './hooks/useLenis.js';
import { AdminAuthProvider } from './admin/AdminAuth.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import AdminLeads from './admin/AdminLeads.jsx';
import AdminPicks from './admin/AdminPicks.jsx';
import AdminImagery from './admin/AdminImagery.jsx';
import AdminTestimonials from './admin/AdminTestimonials.jsx';
import AdminUsers from './admin/AdminUsers.jsx';

function AnimatedRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={isAdmin ? '__admin__' : location.pathname}>
        <Route path="/" element={<PageTransition><FreeCompetitorAudit /></PageTransition>} />
        <Route path="/revenue-estimator" element={<PageTransition><RevenueEstimator /></PageTransition>} />
        <Route path="/free-audit" element={<PageTransition><FreeAudit /></PageTransition>} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="picks" element={<AdminPicks />} />
          <Route path="imagery" element={<AdminImagery />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        {/* Catch-all city pages (must come last so named routes shadow it) */}
        <Route path="/:slug" element={<PageTransition><CityPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useLenis();
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <AnimatedRoutes />
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
