import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Inverse from './pages/Inverse';
import Composition from './pages/Composition';
import Circle from './pages/Circle';
import TopNav from './components/TopNav';
import GlobalFooter from './components/GlobalFooter';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TopNav />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invers" element={<Inverse />} />
            <Route path="/komposisi" element={<Composition />} />
            <Route path="/lingkaran" element={<Circle />} />
          </Routes>
        </div>
        <GlobalFooter />
      </div>
    </Router>
  );
}

export default App;
