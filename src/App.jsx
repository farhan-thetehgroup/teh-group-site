// App.jsx
import { useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MainWebsite from "./components/MainWebsite";
import Legal from "./components/Legal";
import LegalTerms from "./components/LegalTerms";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // GSAP ScrollTrigger caches the last scroll position and re-applies it
    // when its triggers refresh after a route change (it scrolls the new page
    // back to the old, footer-level position). Reset the scroll BEFORE the
    // rAF-queued refresh records positions, and clear its cache, so the
    // restore is a no-op. The extra rAF re-assert beats any refresh that was
    // already queued before this effect ran.
    ScrollTrigger.clearScrollMemory();
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainWebsite />} />
          <Route path="/privacy-policy" element={<Legal />} />
          <Route path="/terms-and-conditions" element={<LegalTerms />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
