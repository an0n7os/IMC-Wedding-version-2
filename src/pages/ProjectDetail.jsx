import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause, 
  ArrowUpRight, 
  X, 
  CaretLeft, 
  CaretRight, 
  ArrowsOut, 
  MagnifyingGlassPlus, 
  MagnifyingGlassMinus,
  CornersOut
} from 'phosphor-react';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

// Transformed data for quick lookup by slug
const projectsBySlug = portfolioData.reduce((acc, project) => {
  acc[project.slug] = project;
  return acc;
}, {});

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsBySlug[id] || portfolioData[0];
  const currentIndex = portfolioData.findIndex(p => p.slug === project.slug);
  const nextProject = portfolioData[(currentIndex + 1) % portfolioData.length];

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef(null);
  const thumbnailRibbonRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // GSAP Parallax for gallery images
    const images = gsap.utils.toArray('.project-grid-item img');
    images.forEach(img => {
      gsap.to(img, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }, [id]);

  // Handle keyboard navigation for Lightbox
  const handleNextImage = useCallback(() => {
    if (selectedImageIndex === null || !project.gallery) return;
    setIsZoomed(false);
    setSelectedImageIndex((prev) => (prev + 1) % project.gallery.length);
  }, [selectedImageIndex, project.gallery]);

  const handlePrevImage = useCallback(() => {
    if (selectedImageIndex === null || !project.gallery) return;
    setIsZoomed(false);
    setSelectedImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  }, [selectedImageIndex, project.gallery]);

  const handleCloseLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    setIsPlaying(false);
    setIsZoomed(false);
  }, []);

  // Slideshow timer
  useEffect(() => {
    if (!isPlaying || selectedImageIndex === null) return;
    const interval = setInterval(() => {
      handleNextImage();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, selectedImageIndex, handleNextImage]);

  // Auto-scroll active thumbnail into view inside thumbnail ribbon
  useEffect(() => {
    if (selectedImageIndex !== null && thumbnailRibbonRef.current) {
      const activeThumb = thumbnailRibbonRef.current.children[selectedImageIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedImageIndex]);

  // Lock body scroll & keyboard listeners
  useEffect(() => {
    if (selectedImageIndex === null) {
      document.body.style.overflow = 'unset';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(p => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImageIndex, handleNextImage, handlePrevImage, handleCloseLightbox]);

  // Toggle browser fullscreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div ref={containerRef} className="project-detail" style={{ background: 'var(--color-bg)', color: 'var(--color-ivory)', minHeight: '100vh' }}>
      
      {/* 1. Full Screen Hero */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <motion.div style={{ scale: heroScale, height: '100%', width: '100%' }}>
          <img 
            src={project.heroImg} 
            alt={project.title} 
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }} 
          />
        </motion.div>
        
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 5vw' }}>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5em', color: 'var(--color-gold)', marginBottom: '2rem' }}
          >
            {project.location} &mdash; {project.date}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', marginBottom: '3rem' }}
          >
            {project.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="scroll-down-hint"
            style={{ position: 'absolute', bottom: '10%' }}
          >
            <div style={{ width: '1px', height: '80px', background: 'var(--color-gold)', position: 'relative', overflow: 'hidden' }}>
              <motion.div 
                animate={{ y: [0, 80] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: 'absolute', top: '-80px', left: 0, width: '100%', height: '100%', background: 'white' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Intro Text */}
      <section className="section project-intro" style={{ padding: '15vh 0' }}>
        <div className="container-wide intro-grid">
          <div>
             <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-taupe)', marginBottom: '2rem', display: 'block' }}>The Mood</span>
             <h2 className="intro-title" style={{ fontSize: '3rem', lineHeight: 1.2, marginBottom: '2rem' }}>{project.mood}</h2>
          </div>
          <div>
            <p className="intro-p" style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--color-text-muted)', maxWidth: '500px', marginBottom: project.externalLink ? '2rem' : '0' }}>
              {project.description}
            </p>
            {project.externalLink && (
              <a 
                href={project.externalLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-premium-diamond interactive" 
                style={{ display: 'inline-flex', marginTop: '1rem' }}
              >
                <span className="btn-text">View Full Disk Gallery</span>
                <span className="btn-icon">↗</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5vw; }
        .project-grid-item {
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 4px;
        }
        .project-grid-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(212, 175, 55, 0.4);
        }
        .project-grid-item:hover img {
          transform: scale(1.06) translateZ(0) !important;
          filter: brightness(1.08) !important;
        }
        .project-grid-item .expand-overlay {
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .project-grid-item:hover .expand-overlay {
          opacity: 1;
        }
        
        .lightbox-action-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: var(--color-ivory);
          padding: 0.6rem 1rem;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }
        .lightbox-action-btn:hover {
          background: var(--color-gold);
          color: #000;
          border-color: var(--color-gold);
        }

        .thumb-item {
          opacity: 0.5;
          transition: all 0.3s ease;
          cursor: pointer;
          border-radius: 3px;
          overflow: hidden;
        }
        .thumb-item:hover, .thumb-item.active {
          opacity: 1;
          transform: scale(1.08);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
        }
        .thumb-item.active {
          border: 2px solid var(--color-gold);
        }

        @media (max-width: 768px) {
          .project-intro { padding: 8vh 0 !important; }
          .intro-grid { grid-template-columns: 1fr; gap: 3rem; }
          .intro-title { font-size: 2.2rem !important; }
          .intro-p { font-size: 1rem !important; }
          .project-grid { display: flex !important; flex-direction: column !important; gap: 4vh !important; }
          .project-grid-item { width: 100% !important; grid-column: auto !important; height: 50vh !important; }
          .lightbox-toolbar-mobile { flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
        }
      `}</style>

      {/* 3. Editorial Grid */}
      {project.gallery && project.gallery.length > 0 && (
      <section style={{ padding: '0 5vw 5vh 5vw' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <span className="subtitle-mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowsOut size={16} /> Click any photo to enter cinema lightbox mode ({project.gallery.length} photos)
          </span>
        </div>
        <div className="project-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2.5vw 2vw' }}>
          {project.gallery.map((item, index) => {
            let gridStyles = {};
            if (item.size === 'large') gridStyles = { gridColumn: 'span 7', height: '75vh' };
            if (item.size === 'small') gridStyles = { gridColumn: 'span 5', height: '55vh' };
            if (item.size === 'wide') gridStyles = { gridColumn: 'span 12', height: '70vh' };

            return (
              <div 
                key={index} 
                className="project-grid-item interactive"
                onClick={() => setSelectedImageIndex(index)}
                style={{ 
                  ...gridStyles, 
                  overflow: 'hidden', 
                  position: 'relative', 
                  backgroundColor: 'rgba(18,18,18,0.9)', 
                  border: '1px solid rgba(255,255,255,0.07)' 
                }}
              >
                <img 
                  src={item.url} 
                  alt="" 
                  loading="lazy"
                  decoding="async"
                  style={{ 
                    width: '100%', 
                    height: '120%', 
                    objectFit: 'cover', 
                    position: 'absolute', 
                    top: '-10%',
                    transition: 'transform 0.8s var(--ease-cinematic), filter 0.8s ease'
                  }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1500'; }}
                />
                
                {/* Hover Expand Overlay */}
                <div 
                  className="expand-overlay"
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)', 
                    display: 'flex', 
                    alignItems: 'flex-end', 
                    justifyContent: 'space-between',
                    padding: '1.8rem',
                    zIndex: 5
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ fontSize: '0.55rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                      IMC Weddings Archive
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-ivory)', fontFamily: 'var(--font-heading)' }}>
                      Photo {String(index + 1).padStart(2, '0')} / {project.gallery.length}
                    </span>
                  </div>
                  <div style={{ 
                    width: '45px', 
                    height: '45px', 
                    borderRadius: '50%', 
                    border: '1px solid var(--color-gold)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--color-gold)',
                    background: 'rgba(10,10,10,0.6)',
                    backdropFilter: 'blur(6px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }}>
                    <ArrowsOut size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      )}

      {/* 4. Film Reveal Section */}
      {project.category !== 'Magazine Album' && (
      <section style={{ padding: '5vh 0', background: 'var(--color-ivory)', color: 'var(--color-bg)' }}>
        <div className="container-wide" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-taupe)', marginBottom: '3rem', display: 'block' }}>The Motion Picture</span>
          <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto', overflow: 'hidden' }} className="interactive">
             <img src={project.heroImg} alt="Film Poster" loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
             <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="play-btn-mobile" style={{ width: '100px', height: '100px', borderRadius: '50%', border: '1px solid var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play size={40} weight="fill" />
                </div>
             </div>
          </div>
          <h3 className="film-reveal-h3" style={{ fontSize: '4rem', marginTop: '4rem' }}>A Love in Motion.</h3>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .film-reveal-h3 { font-size: 2.2rem !important; margin-top: 2rem !important; }
            .play-btn-mobile { width: 60px !important; height: 60px !important; }
            .play-btn-mobile svg { width: 24px !important; }
          }
        `}</style>
      </section>
      )}

      {/* 4.5 External Gallery Link */}
      {project.externalLink && (
      <section style={{ padding: '10vh 5vw', textAlign: 'center', borderTop: '1px solid rgba(253,251,247,0.05)' }}>
         <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-taupe)', marginBottom: '2rem', display: 'block' }}>The Full Set</span>
         <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '3rem', fontFamily: 'var(--font-heading)' }}>See All The Photos.</h3>
         <a
           href={project.externalLink}
           target="_blank"
           rel="noopener noreferrer"
           className="interactive btn-premium-diamond"
           style={{ display: 'inline-flex', padding: '1.2rem 3.5rem', backgroundColor: 'var(--color-ivory)', color: 'var(--color-bg)' }}
         >
           <span className="btn-text" style={{ fontSize: '0.75rem', fontWeight: '500' }}>View Full Gallery</span>
           <span className="btn-icon" style={{ borderColor: 'var(--color-bg)', color: 'var(--color-bg)' }}><ArrowUpRight weight="bold" /></span>
         </a>
      </section>
      )}

      {/* 5. Footer Navigation */}
      <footer style={{ padding: '5vh 5vw', borderTop: '1px solid rgba(253,251,247,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/gallery" className="interactive" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'var(--color-ivory)' }}>
          <ArrowLeft size={20} />
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Back to Gallery</span>
        </Link>

        <Link to={`/gallery/${nextProject.slug}`} className="interactive" style={{ textAlign: 'right', textDecoration: 'none', color: 'var(--color-ivory)' }}>
          <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>Next Story</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>{nextProject.title}</span>
            <ArrowRight size={20} />
          </div>
        </Link>

      </footer>

      {/* 6. Ultra-Luxury Lightbox Full-Screen Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && project.gallery && project.gallery[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: '#060606',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.5rem 2vw 1rem 2vw',
              overflow: 'hidden'
            }}
            onClick={handleCloseLightbox}
          >
            {/* Ambient Blurred Background Glow */}
            <div 
              style={{
                position: 'absolute',
                inset: '-10%',
                pointerEvents: 'none',
                overflow: 'hidden',
                zIndex: 0
              }}
            >
              <img
                src={project.gallery[selectedImageIndex].url}
                alt=""
                style={{
                  width: '120%',
                  height: '120%',
                  objectFit: 'cover',
                  filter: 'blur(70px) brightness(0.4) saturate(1.4)',
                  transform: 'scale(1.2)',
                  opacity: 0.6,
                  transition: 'src 0.6s ease'
                }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(10,10,10,0.4) 0%, rgba(6,6,6,0.95) 80%)' }} />
            </div>

            {/* Top Toolbar */}
            <div 
              className="lightbox-toolbar-mobile"
              style={{ 
                width: '100%', 
                maxWidth: '1400px',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                zIndex: 10,
                color: 'var(--color-ivory)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-gold)', fontWeight: 500 }}>
                  {project.title}
                </span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-taupe)' }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  {selectedImageIndex + 1} / {project.gallery.length}
                </span>
              </div>

              {/* Action Toolbar Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  className="lightbox-action-btn"
                  title={isPlaying ? "Pause Slideshow" : "Play Auto-Slideshow"}
                >
                  {isPlaying ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <button
                  onClick={() => setIsZoomed(z => !z)}
                  className="lightbox-action-btn"
                  title={isZoomed ? "Zoom Out" : "Zoom In (Detail View)"}
                >
                  {isZoomed ? <MagnifyingGlassMinus size={16} /> : <MagnifyingGlassPlus size={16} />}
                  <span>{isZoomed ? 'Reset' : 'Zoom'}</span>
                </button>

                <button
                  onClick={toggleFullScreen}
                  className="lightbox-action-btn"
                  title="Toggle Fullscreen"
                >
                  <CornersOut size={16} />
                  <span>Fullscreen</span>
                </button>

                <button
                  onClick={handleCloseLightbox}
                  className="interactive"
                  aria-label="Close Lightbox"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: 'var(--color-ivory)',
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    marginLeft: '0.5rem'
                  }}
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Main Stage (Photo Display) */}
            <div 
              style={{ 
                position: 'relative', 
                width: '100%', 
                height: '72vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                zIndex: 5
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  src={project.gallery[selectedImageIndex].url}
                  alt={`${project.title} view ${selectedImageIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: isZoomed ? 1.4 : 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setIsZoomed(z => !z)}
                  style={{
                    maxHeight: '72vh',
                    maxWidth: '75vw',
                    display: 'block',
                    margin: '0 auto',
                    objectFit: 'contain',
                    borderRadius: '3px',
                    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255,255,255,0.08)',
                    cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                    className="interactive"
                    aria-label="Previous photo"
                    style={{
                      position: 'absolute',
                      left: '2vw',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(15,15,15,0.7)',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      color: 'var(--color-ivory)',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                      zIndex: 10
                    }}
                  >
                    <CaretLeft size={30} color="var(--color-gold)" />
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                    className="interactive"
                    aria-label="Next photo"
                    style={{
                      position: 'absolute',
                      right: '2vw',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(15,15,15,0.7)',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      color: 'var(--color-ivory)',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                      zIndex: 10
                    }}
                  >
                    <CaretRight size={30} color="var(--color-gold)" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Horizontal Thumbnail Strip */}
            <div 
              style={{ 
                width: '100%', 
                maxWidth: '90vw', 
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.8rem'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                ref={thumbnailRibbonRef}
                style={{ 
                  display: 'flex', 
                  gap: '0.8rem', 
                  overflowX: 'auto', 
                  padding: '0.5rem 1rem', 
                  maxWidth: '100%',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {project.gallery.map((thumb, idx) => (
                  <div 
                    key={idx}
                    className={`thumb-item ${idx === selectedImageIndex ? 'active' : ''}`}
                    onClick={() => { setIsZoomed(false); setSelectedImageIndex(idx); }}
                    style={{ width: '65px', height: '48px', flexShrink: 0 }}
                  >
                    <img 
                      src={thumb.url} 
                      alt="" 
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '0.6rem', color: 'var(--color-taupe)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Use &larr; &rarr; arrows to browse &bull; Space to Play/Pause &bull; Click image to Zoom &bull; ESC to exit
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProjectDetail;
