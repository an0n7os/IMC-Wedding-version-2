import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const WhatWeDo = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Page Wipe Animation
    gsap.fromTo('.page-wipe', 
      { translateY: '0%' }, 
      { translateY: '-100%', duration: 1.2, ease: "power4.inOut" }
    );

    // 2. Hero Animations
    gsap.fromTo('.hero-tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.2 });
    gsap.fromTo('.hero-title-line', { opacity: 0, y: '100%' }, { opacity: 1, y: '0%', duration: 1, stagger: 0.2, delay: 1.3, ease: "power4.out" });
    gsap.fromTo('.hero-sub', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.8 });
    gsap.fromTo('.scroll-cue', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 2.2 });

    // 3. Service Section Reveals & Shutter Animation
    const sections = gsap.utils.toArray('.service-section');
    sections.forEach((section) => {
      const imgWrap = section.querySelector('.service-img-panel');
      const img = imgWrap.querySelector('img');

      // Shutter Reveal (Clip-Path)
      gsap.fromTo(imgWrap, 
        { clipPath: 'inset(45% 0% 45% 0%)' }, 
        { 
          clipPath: 'inset(0% 0% 0% 0%)', 
          duration: 1.5, 
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => section.classList.add('in-view'),
      });

      // Parallax effect for images
      gsap.to(img, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // 4. Optical Flare (Hero Mouse Move or Scroll)
    gsap.to('.optical-flare', {
      xPercent: 15,
      yPercent: 10,
      rotate: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-intro',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // 5. Animated Counters
    const counters = gsap.utils.toArray('.counter');
    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.target);
      ScrollTrigger.create({
        trigger: '.stats-band',
        start: 'top 80%',
        onEnter: () => {
          gsap.to(counter, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power4.out"
          });
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="what-we-do-page" style={{ 
      background: 'var(--color-bg)', 
      color: 'var(--color-ivory)', 
      overflowX: 'hidden'
    }}>
      <div className="page-wipe" style={{ 
        position: 'fixed', inset: 0, zIndex: 9996, 
        background: 'var(--color-bg)' 
      }}></div>

      {/* ═══ HERO INTRO ═══ */}
      <section className="hero-intro" style={{
        height: '100vh', display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div className="hero-image-container" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="/images/hero_whatwedo.png" alt="Cinematic Background" style={{ 
            width: '100%', height: '100%', objectFit: 'cover', 
            filter: 'brightness(0.35) contrast(1.1)',
            animation: 'slowZoom 20s ease-out infinite alternate' 
          }} />
          <div className="optical-flare" style={{ 
            position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', 
            background: 'radial-gradient(circle at 30% 30%, rgba(212,175,55,0.08) 0%, transparent 50%)', 
            zIndex: 1, pointerEvents: 'none' 
          }}></div>
          <div className="hero-overlay" style={{ 
            position: 'absolute', inset: 0, 
            background: 'linear-gradient(to bottom, rgba(16,16,16,0.5) 0%, transparent 50%, #111 100%)' 
          }}></div>
        </div>

        <p className="hero-tag" style={{ letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.5rem', zIndex: 1, fontSize: '0.7rem' }}>✦ Our Services</p>
        <h1 className="hero-title" style={{ 
          fontFamily: "var(--font-heading)", fontSize: 'clamp(3.5rem, 9vw, 8rem)', 
          fontWeight: 300, fontStyle: 'italic', lineHeight: 0.95, textAlign: 'center', zIndex: 1 
        }}>
          <span className="hero-title-line" style={{ display: 'block' }}><span>What We</span></span>
          <span className="hero-title-line" style={{ display: 'block' }}><span>Create</span></span>
        </h1>
        <p className="hero-sub" style={{ 
          fontSize: '0.9rem', fontWeight: 300, letterSpacing: '0.08em', 
          color: 'rgba(255,255,255,0.6)', maxWidth: '400px', textAlign: 'center', lineHeight: 2, zIndex: 1 
        }}>Four pillars of artistry — each one crafted to preserve the unrepeatable moments of your story.</p>

        <div className="scroll-cue" style={{ position: 'absolute', bottom: '3rem', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div className="scroll-cue-line" style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--color-gold), transparent)' }}></div>
          <span className="scroll-cue-text" style={{ fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(253,251,247,0.4)', writingMode: 'vertical-rl' }}>Scroll</span>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <div className="services-wrapper">
        {/* Service 01 */}
        <section className="service-section" id="s1">
          <div className="service-img-panel">
            <img src="/images/DSC09671.jpeg" alt="Signature Engagement" loading="lazy" decoding="async" />
            <span className="img-num">01</span>
          </div>
          <div className="service-content-panel">
            <div className="svc-eyebrow">
              <span className="svc-eyebrow-line"></span>
              <span className="svc-eyebrow-text">The Prelude</span>
            </div>
            <h2 className="svc-title"><span className="svc-title-inner">Signature<br/>Engagement</span></h2>
            <p className="svc-desc">
              Your story begins here. We craft intimate pre-wedding narratives that capture the raw chemistry and quiet anticipation before the grand celebration.
            </p>
            
            <div className="studio-specs-grid">
               <div className="spec-item">
                 <span className="spec-label">Optics</span>
                 <span className="spec-value">35mm Prime Arc</span>
               </div>
               <div className="spec-item">
                 <span className="spec-label">Format</span>
                 <span className="spec-value">4K ProRes 10-bit</span>
               </div>
               <div className="spec-item">
                 <span className="spec-label">Color Space</span>
                 <span className="spec-value">S-Log3 Narrative</span>
               </div>
               <div className="spec-item">
                 <span className="spec-label">Delivery</span>
                 <span className="spec-value">Editorial Archive</span>
               </div>
            </div>

            <p style={{ fontStyle: 'italic', color: 'var(--color-gold)', opacity: 0.7, fontSize: '0.85rem', margin: '2rem 0', fontFamily: 'var(--font-serif-elegant)' }}>
               "Seeking the foundational chemistry—the silence between the words." — Aswin
            </p>

            <Link to="/inquire" className="svc-cta">Inquire for shoot <span className="svc-cta-arrow"></span></Link>
          </div>
        </section>

        {/* Service 02 */}
        <section className="service-section alt" id="s2">
          <div className="service-img-panel">
            <img src="/images/wedding_photography.png" alt="Documentary Weddings" loading="lazy" decoding="async" />
            <span className="img-num">02</span>
          </div>
          <div className="service-content-panel">
            <div className="svc-eyebrow">
              <span className="svc-eyebrow-line"></span>
              <span className="svc-eyebrow-text">The Legacy</span>
            </div>
            <h2 className="svc-title"><span className="svc-title-inner">Documentary<br/>Weddings</span></h2>
            <p className="svc-desc">
              High-art photography meets soulful documentary. We don't just shoot events; we archive legacies of light and truth.
            </p>

            <div className="studio-specs-grid">
               <div className="spec-item">
                 <span className="spec-label">Process</span>
                 <span className="spec-value">Poetic Realism</span>
               </div>
               <div className="spec-item">
                 <span className="spec-label">Grade</span>
                 <span className="spec-value">Signature Film Grain</span>
               </div>
               <div className="spec-item">
                 <span className="spec-label">Audio</span>
                 <span className="spec-value">32-bit Float Audio</span>
               </div>
               <div className="spec-item">
                 <span className="spec-label">Heritage</span>
                 <span className="spec-value">Legacy Archive Boxes</span>
               </div>
            </div>

            <p style={{ fontStyle: 'italic', color: 'var(--color-gold)', opacity: 0.7, fontSize: '0.85rem', margin: '2rem 0', fontFamily: 'var(--font-serif-elegant)' }}>
               "We visualize the feeling before it happens." — Sreenath
            </p>

            <Link to="/inquire" className="svc-cta">Request Brochure <span className="svc-cta-arrow"></span></Link>
          </div>
        </section>

        {/* Service 03 */}
        <section className="service-section" id="s3">
          <div className="service-img-panel">
            <img src="/images/editing_color.png" alt="Cinema Post-Production" loading="lazy" decoding="async" />
            <span className="img-num">03</span>
          </div>
          <div className="service-content-panel">
            <div className="svc-eyebrow">
              <span className="svc-eyebrow-line"></span>
              <span className="svc-eyebrow-text">The Artistry</span>
            </div>
            <h2 className="svc-title"><span className="svc-title-inner">Cinema<br/>Post-Production</span></h2>
            <p className="svc-desc">
              Our in-house boutique lab specializes in custom color science and immersive sound design. Meticulously graded to a timeless palette.
            </p>

            <div className="studio-specs-grid">
               <div className="spec-item">
                 <span className="spec-label">Engine</span>
                 <span className="spec-value">DaVinci Resolve Lab</span>
               </div>
               <div className="spec-item">
                 <span className="spec-label">Workflow</span>
                 <span className="spec-value">ACES 2.0 Standard</span>
               </div>
               <div className="spec-item">
                 <span className="spec-label">Export</span>
                 <span className="spec-value">Rec.2020 HDR Archive</span>
               </div>
               <div className="spec-item">
                 <span className="spec-label">Audio</span>
                 <span className="spec-value">5.1 Surround Suite</span>
               </div>
            </div>

            <p style={{ fontStyle: 'italic', color: 'var(--color-gold)', opacity: 0.7, fontSize: '0.85rem', margin: '2rem 0', fontFamily: 'var(--font-serif-elegant)' }}>
               "Colors are memories given light." — Lead Editor
            </p>

            <Link to="/inquire" className="svc-cta">See workflow <span className="svc-cta-arrow"></span></Link>
          </div>
        </section>

        {/* Service 04 */}
        <section className="service-section alt" id="s4" style={{ borderBottom: 'none' }}>
          <div className="service-img-panel">
            <img src="/images/corporate_events.png" alt="Bespoke Branding" loading="lazy" decoding="async" />
            <span className="img-num">04</span>
          </div>
          <div className="service-content-panel">
            <div className="svc-eyebrow">
              <span className="svc-eyebrow-line"></span>
              <span className="svc-eyebrow-text">The Brand</span>
            </div>
            <h2 className="svc-title"><span className="svc-title-inner">Bespoke<br/>Branding</span></h2>
            <p className="svc-desc">
              For elite organizations and visionary brands. Strategic visual storytelling that elevates presence with an editorial, premium soul.
            </p>

            <div className="studio-specs-grid">
               <div className="spec-item">
                 <span className="spec-label">Vision</span>
                 <span className="spec-value">High-Prestige Strategy</span>
               </div>
               <div className="spec-item">
                 <span className="spec-label">Gear</span>
                 <span className="spec-value">8K RAW Acquisition</span>
               </div>
               <div className="spec-item">
                 <span className="spec-label">Style</span>
                 <span className="spec-value">Editorial & High-Fashion</span>
               </div>
               <div className="spec-item">
                 <span className="spec-label">Purpose</span>
                 <span className="spec-value">Commercial Manifesto</span>
               </div>
            </div>

            <p style={{ fontStyle: 'italic', color: 'var(--color-gold)', opacity: 0.7, fontSize: '0.85rem', margin: '2rem 0', fontFamily: 'var(--font-serif-elegant)' }}>
               "Transforming concepts into cinematic poetry." — IMC Team
            </p>

            <Link to="/inquire" className="svc-cta">Collaborate <span className="svc-cta-arrow"></span></Link>
          </div>
        </section>
      </div>

      {/* ═══ PHILOSOPHY QUOTE ═══ */}
      <section className="philosophy" style={{ padding: '10rem 5vw', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div>
          <p style={{ letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.5rem', fontSize: '0.7rem' }}>✦ Our Philosophy</p>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: '3rem', fontStyle: 'italic', color: 'rgba(253,251,247,0.2)' }}>Every frame<br/>tells a truth.</p>
        </div>
        <blockquote style={{ 
          fontFamily: "var(--font-heading)", fontSize: '2.5rem', fontWeight: 300, 
          fontStyle: 'italic', lineHeight: 1.45, color: 'var(--color-ivory)', borderLeft: '2px solid var(--color-gold)', paddingLeft: '2rem' 
        }}>
          We don't just capture moments —<br/>we preserve the <em style={{ color: 'var(--color-gold)' }}>feeling</em> between them.<br/>The glance. The pause. The exhale.
        </blockquote>
      </section>

      {/* ═══ STATS BAND ═══ */}
      <div className="stats-band" style={{ background: 'var(--color-bg)', padding: '8rem 5vw', position: 'relative', overflow: 'hidden' }}>
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: '5rem', color: 'var(--color-gold)' }}>
              <span className="counter" data-target="1300">0</span>+
            </div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>Weddings Captured</div>
          </div>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: '5rem', color: 'var(--color-gold)' }}>
              <span className="counter" data-target="10">0</span>
            </div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(253,251,247,0.4)', marginTop: '1rem' }}>Years of Excellence</div>
          </div>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: '5rem', color: 'var(--color-gold)' }}>
              <span className="counter" data-target="12">0</span>+
            </div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(253,251,247,0.4)', marginTop: '1rem' }}>Countries Covered</div>
          </div>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: '5rem', color: 'var(--color-gold)' }}>
              <span className="counter" data-target="20">0</span>K+
            </div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>Cinema Line Cameras</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .service-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .service-section.alt { direction: rtl; }
        .service-section.alt > * { direction: ltr; }
        .service-img-panel { position: relative; overflow: hidden; }
        .service-img-panel img { 
          width: 100%; height: 100%; object-fit: cover; 
          filter: brightness(0.7) grayscale(0.2); 
          transition: transform 1.5s ease;
        }
        .service-section:hover .service-img-panel img { transform: scale(1.08); filter: brightness(0.9) grayscale(0); }
        .img-num { 
          position: absolute; bottom: 2rem; right: 2rem; 
          font-family: var(--font-heading); font-size: 8rem; font-style: italic; 
          color: rgba(253,251,247,0.05); line-height: 1; pointer-events: none;
        }
        .service-content-panel { 
          display: flex; flex-direction: column; justify-content: center; 
          padding: 8rem; background: var(--color-bg); 
        }
        .svc-eyebrow { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2.5rem; opacity: 0; transform: translateX(-20px); transition: 0.8s ease; }
        .in-view .svc-eyebrow { opacity: 1; transform: translateX(0); }
        .svc-eyebrow-line { width: 50px; height: 1px; background: var(--color-gold); }
        .svc-eyebrow-text { font-size: 0.65rem; letter-spacing: 0.5em; text-transform: uppercase; color: var(--color-gold); }
        .svc-title { font-family: var(--font-heading); font-size: clamp(3rem, 6vw, 4.8rem); font-style: italic; font-weight: 300; margin-bottom: 2.5rem; line-height: 1; }
        
        .studio-specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin: 3rem 0;
          padding: 2rem 0;
          border-top: 1px solid rgba(253,251,247,0.05);
          border-bottom: 1px solid rgba(253,251,247,0.05);
          opacity: 0;
          transform: translateY(20px);
          transition: 0.8s ease 0.5s;
        }
        .in-view .studio-specs-grid { opacity: 1; transform: translateY(0); }
        .spec-item { display: flex; flex-direction: column; gap: 0.5rem; }
        .spec-label { font-size: 0.55rem; text-transform: uppercase; letter-spacing: 3px; color: var(--color-gold); opacity: 0.8; }
        .spec-value { font-size: 0.8rem; letter-spacing: 1px; color: var(--color-ivory); font-weight: 300; }

        .svc-desc { color: rgba(253,251,247,0.6); line-height: 1.8; font-weight: 300; font-size: 1.05rem; max-width: 500px; opacity: 0; transform: translateY(20px); transition: 0.8s ease 0.3s; }
        .in-view .svc-desc { opacity: 1; transform: translateY(0); }
        
        .svc-cta { display: flex; align-items: center; gap: 1.5rem; margin-top: 2rem; color: var(--color-ivory); text-decoration: none; font-size: 0.65rem; letter-spacing: 0.4em; text-transform: uppercase; opacity: 0; transition: 0.8s ease 0.9s; }
        .in-view .svc-cta { opacity: 1; }
        .svc-cta-arrow { width: 40px; height: 1px; background: var(--color-gold); position: relative; }
        .svc-cta-arrow::after { content: ''; position: absolute; right: 0; top: -3px; width: 7px; height: 7px; border-top: 1px solid var(--color-gold); border-right: 1px solid var(--color-gold); transform: rotate(45deg); }
        
        @media (max-width: 1200px) {
          .service-content-panel { padding: 4rem; }
        }
        @media (max-width: 991px) {
          .service-section { grid-template-columns: 1fr !important; min-height: auto; }
          .service-img-panel { height: 50vh; clip-path: none !important; }
          .service-content-panel { padding: 5rem 2rem; }
          .service-section.alt { direction: ltr; }
          .studio-specs-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
};

export default WhatWeDo;
