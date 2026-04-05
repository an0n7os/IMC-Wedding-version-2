import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Play, ArrowUpRight } from 'phosphor-react';
import { portfolioData } from '../data/portfolio';
import SplitText from '../components/SplitText';


gsap.registerPlugin(ScrollTrigger);

// Mock Data for Projects
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

  const containerRef = useRef(null);

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
        yPercent: 15,
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
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} 
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
                data-cursor="explore"
              >
                <span className="btn-text">View Full Gallery</span>
                <span className="btn-icon">↗</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5vw; }
        @media (max-width: 768px) {
          .project-intro { padding: 8vh 0 !important; }
          .intro-grid { grid-template-columns: 1fr; gap: 3rem; }
          .intro-title { font-size: 2.2rem !important; }
          .intro-p { font-size: 1rem !important; }
          .project-grid { display: flex !important; flex-direction: column !important; gap: 4vh !important; }
          .project-grid-item { width: 100% !important; grid-column: auto !important; height: 60vh !important; }
        }
      `}</style>

      {/* 2.5 The Narrative (Editorial Story) */}
      {project.narrative && project.narrative.length > 0 && (
        <section className="project-story-section">
          <div className="container-wide">
            {project.storyHeadline && (
              <h2 className="project-story-headline reveal-liquid">
                <SplitText>{project.storyHeadline}</SplitText>
              </h2>
            )}
            
            <div className="project-story-content">
              {project.narrative.map((para, i) => (
                <p 
                  key={i} 
                  className="project-story-p"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Editorial Grid */}
      {project.gallery && project.gallery.length > 0 && (
      <section style={{ padding: '0 5vw 5vh 5vw' }}>
        <div className="project-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2vw' }}>
          {project.gallery.map((item, index) => {
            let gridStyles = {};
            if (item.size === 'large') gridStyles = { gridColumn: 'span 7', height: '90vh' };
            if (item.size === 'small') gridStyles = { gridColumn: 'span 5', height: '60vh' };
            if (item.size === 'wide') gridStyles = { gridColumn: 'span 12', height: '80vh' };

            return (
              <div 
                key={index} 
                className="project-grid-item" 
                style={{ ...gridStyles, overflow: 'hidden', position: 'relative', backgroundColor: 'var(--color-bg)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <img 
                  src={item.url} 
                  alt="" 
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '120%', objectFit: 'cover', position: 'absolute', top: '-10%' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1500'; }}
                />
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
          <div style={{ position: 'relative', width: '100%', aspectBackground: '16/9', maxWidth: '1200px', margin: '0 auto', overflow: 'hidden' }} className="interactive" data-cursor="play">
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

      {/* 4.5 External Archive Link */}
      {project.externalLink && (
      <section style={{ padding: '10vh 5vw', textAlign: 'center', borderTop: '1px solid rgba(253,251,247,0.05)' }}>
         <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-taupe)', marginBottom: '2rem', display: 'block' }}>The Complete Collection</span>
         <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '3rem', fontFamily: 'var(--font-heading)' }}>Enter the Archive.</h3>
         <a 
           href={project.externalLink} 
           target="_blank" 
           rel="noopener noreferrer" 
           className="interactive btn-premium-diamond" 
           style={{ display: 'inline-flex', padding: '1.2rem 3.5rem', backgroundColor: 'var(--color-ivory)', color: 'var(--color-bg)' }} 
           data-cursor="explore"
         >
           <span className="btn-text" style={{ fontSize: '0.75rem', fontWeight: '500' }}>Explore Full Archive</span>
           <span className="btn-icon" style={{ borderColor: 'var(--color-bg)', color: 'var(--color-bg)' }}><ArrowUpRight weight="bold" /></span>
         </a>
      </section>
      )}

      {/* 5. Footer Navigation */}
      <footer style={{ padding: '5vh 5vw', borderTop: '1px solid rgba(253,251,247,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/gallery" className="interactive" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'var(--color-ivory)' }} data-cursor="explore">
          <ArrowLeft size={20} />
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Back to Gallery</span>
        </Link>

        <Link to={`/gallery/${nextProject.slug}`} className="interactive" style={{ textAlign: 'right', textDecoration: 'none', color: 'var(--color-ivory)' }} data-cursor="explore">
          <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>Next Story</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>{nextProject.title}</span>
            <ArrowRight size={20} />
          </div>
        </Link>

      </footer>

    </div>
  );
};

export default ProjectDetail;
