import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import ReelModal from './components/ReelModal';
import Footer from './components/Footer';
import { WhatsappLogo, ArrowUp } from 'phosphor-react';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Films from './pages/Films';
import Info from './pages/Info';
import WhatWeDo from './pages/WhatWeDo';
import Inquire from './pages/Inquire';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [reelOpen, setReelOpen] = useState(false);
  const location = useLocation();
  const lenisRef = useRef();
  const progressBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress}%`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Expose setReelOpen globally so Home.jsx Play Reel button can trigger it
  useEffect(() => {
    window.__openReel = () => setReelOpen(true);
    return () => { delete window.__openReel; };
  }, []);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    // 2. Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(500, 33);

    // 3. Global Anchor Smooth Scroll Interceptor
    const handleAnchorClicks = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const id = target.getAttribute('href');
        if (id === '#') {
          lenis.scrollTo(0, { duration: 1.5 });
          return;
        }
        lenis.scrollTo(id, { offset: 0, duration: 2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      }
    };
    document.addEventListener('click', handleAnchorClicks);

    return () => {
      document.removeEventListener('click', handleAnchorClicks);
      lenis.destroy();
    };
  }, []);

  // Stop scrolling during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);

  return (
    <div className={`app-wrapper ${loading ? 'loading' : 'loaded'}`}>
      <AnimatePresence mode="wait">
        {loading && <Preloader setLoading={setLoading} key="preloader" />}
      </AnimatePresence>

      <CustomCursor />
      <Navbar />
      
      {/* Gold Scroll Progress Bar */}
      <div ref={progressBarRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '0%',
        height: '2px',
        background: 'linear-gradient(90deg, var(--color-gold), #fff8dc)',
        zIndex: 99998,
        transition: 'width 0.1s linear',
        transformOrigin: 'left',
        pointerEvents: 'none',
        boxShadow: '0 0 8px rgba(201, 168, 76, 0.6)',
      }} />

      {/* Cinematic Showreel Modal */}
      <ReelModal
        isOpen={reelOpen}
        onClose={() => setReelOpen(false)}
        reelUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:id" element={<ProjectDetail />} />
            <Route path="/stories" element={<Films />} />
            <Route path="/info" element={<Info />} />
            <Route path="/inquire" element={<Inquire />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/wedding" element={<Films />} />
            <Route path="/portfolio" element={<Gallery />} />
            <Route path="/learn" element={<Info />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <Footer />

      <div className="floating-actions">
        <a 
          href="https://wa.me/918075358113?text=Hi%20IMC%20Weddings!%20I'm%20interested%20in%20booking%20your%20services%20for%20my%20wedding." 
          target="_blank" 
          rel="noreferrer" 
          className="wa-btn interactive"
          title="Chat on WhatsApp"
        >
          <WhatsappLogo size={32} weight="fill" />
        </a>
        <button 
          className="wa-btn scroll-up interactive" 
          onClick={() => lenisRef.current?.scrollTo(0)}
          title="Scroll to top"
        >
          <ArrowUp size={24} weight="bold" />
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
