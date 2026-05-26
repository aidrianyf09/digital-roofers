import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FreeCompetitorAudit from './FreeCompetitorAudit.jsx';
import RevenueEstimator from './RevenueEstimator.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FreeCompetitorAudit />} />
        <Route path="/revenue-estimator" element={<RevenueEstimator />} />
      </Routes>
    </BrowserRouter>
  );
}
