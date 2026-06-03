import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FreeCompetitorAudit from './FreeCompetitorAudit.jsx';
import RevenueEstimator from './RevenueEstimator.jsx';
import FreeAudit from './FreeAudit.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FreeCompetitorAudit />} />
        <Route path="/revenue-estimator" element={<RevenueEstimator />} />
        <Route path="/free-audit" element={<FreeAudit />} />
      </Routes>
    </BrowserRouter>
  );
}
