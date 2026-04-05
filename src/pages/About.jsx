import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import SplitText from '../components/SplitText';

gsap.registerPlugin(ScrollTrigger);


const About = () => {
  const containerRef = useRef(null);
  const [activeService, setActiveService] = useState(0);

  const services = [
    { 
      title: 'Weddings', 
      tag: 'ARCHIVE & NARRATIVE',
      img: '/images/DSC09163.jpeg',
      desc: 'Our primary obsession. We specialize in high-end, multi-day wedding archives that blend documentary grit with editorial fashion. From the quiet morning prayers to the chaotic midnight dances, every frame is treated with cinematic reverence.',
      features: ['Long-form Stories', 'Editorial Stills', 'Signature Grain', 'Poetic Motion']
    },
    { 
      title: 'Brand Concept Shoots', 
      tag: 'EDITORIAL ARTISTRY',
      img: '/images/corporate_events.png',
      desc: 'Transforming commercial visions into cinematic poetry. We work with premium brands to create visual manifestos that resonate with high-prestige audiences through meticulous light-shaping and color-science.',
      features: ['Creative Direction', 'High-Fashion Aesthetics', 'Bespoke Lighting', 'Visual Strategy']
    },
    { 
      title: 'Engagement Narratives', 
      tag: 'RAW & UNPLAYED',
      img: '/images/athira...jpeg',
      desc: 'The prologue to your legacy. These are quiet, unscripted sessions where we capture the foundational chemistry of your bond in its purest architectural or natural form.',
      features: ['Directed Spontaneity', 'Film Emulation', 'Atmospheric Grading', 'Candid Focus']
    },
    { 
      title: 'Corporate Excellence', 
      tag: 'PRESTIGE ARCHIVAL',
      img: '/images/wedding_photography.png',
      desc: 'Capturing the scale and soul of high-stakes corporate celebrations. Our approach is discreet and professional, ensuring the brand’s legacy is documented with the same cinematic precision as our weddings.',
      features: ['Event Highlights', 'Documentary Interviews', 'Scale Coverage', 'Fast Delivery']
    },
    { 
      title: 'Newborn Portraiture', 
      tag: 'TIMELESS BEGINNINGS',
      img: '/images/DSC00031.JPG',
      desc: 'Our most gentle craft. We document the first chapters of your family legacy with soft, natural palettes and a patient eye for the most delicate emotions.',
      features: ['Studio or Home', 'Natural Palette', 'Art-Print Ready', 'Heirloom Curation']
    }
  ];

  const [hoveredService, setHoveredService] = useState(0);

  useGSAP(() => {
    // ... existing animations
    // Liquid Text Reveal for headers
    const headings = gsap.utils.toArray('.reveal-liquid');
    headings.forEach(heading => {
      gsap.fromTo(heading.querySelectorAll('.char-liquid'),
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.5,
          stagger: 0.02,
          ease: "power4.out",
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
          }
        }
      );
    });

    // Ken Burns Parallax for images
    const images = gsap.utils.toArray('.img-parallax');
    images.forEach((img) => {
      gsap.to(img, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // ─── NEW: Animated Counters ───
    const counters = gsap.utils.toArray('.stat-metric-num');
    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.target);
      gsap.fromTo(counter, 
        { innerText: 0 }, 
        { 
          innerText: target, 
          duration: 2.5, 
          snap: { innerText: 1 }, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
          }
        }
      );
    });

    // ─── NEW: Reveal Stagger for Timeline ───
    gsap.fromTo('.timeline-item', 
      { opacity: 0, x: -30 }, 
      { 
        opacity: 1, x: 0, 
        duration: 1.2, 
        stagger: 0.3, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.timeline-container',
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="about-prestige" style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '15vh' }}>
      
      {/* 1. Header Section */}
      <header className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container-wide" style={{ textAlign: 'center' }}>
          <div className="red-dot"></div>
          <span className="subtitle-mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '2rem' }}>The Visionaries</span>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--color-ivory)', lineHeight: 1 }}>
            <SplitText className="reveal-liquid">Crafting Immortal</SplitText><br/>
            <SplitText className="reveal-liquid">Stories.</SplitText>
          </h1>
        </div>
      </header>

      {/* 1.5 Cinematic Stats Band */}
      <section className="section" style={{ background: '#141313', padding: '6rem 0', borderBottom: '1px solid rgba(253, 251, 247, 0.05)' }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem', textAlign: 'center' }}>
          {[
            { metric: '10', label: 'Years of Magic', suffix: '+' },
            { metric: '500', label: 'Love Stories Captured', suffix: '+' },
            { metric: '15', label: 'Destination Countries', suffix: '+' },
            { metric: '12', label: 'Global Awards Won', suffix: '' }
          ].map((stat, i) => (
            <div key={i} style={{ flex: '1 1 200px' }}>
              <h3 className="stat-metric"><span className="stat-metric-num" data-target={stat.metric}>0</span>{stat.suffix}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
             {/* 2. Brand Narrative Grid / Manifesto Section */}
      <section className="section manifesto-section" style={{ background: 'var(--color-ivory)', color: 'var(--color-text-dark)', position: 'relative', overflow: 'hidden' }}>
         <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem', alignItems: 'center' }}>
            <div style={{ gridColumn: '1 / 6', paddingRight: '2vw' }}>
              <span className="subtitle-mono" style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-taupe)', display: 'block', marginBottom: '2.5rem' }}>The Creative Ethos</span>
              <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.95, marginBottom: '4rem', fontFamily: 'var(--font-heading)' }}>
                Poetic <br/>Realism.
              </h2>
              <div className="manifesto-wrap" style={{ position: 'relative', paddingLeft: '2.5rem', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '1.3rem', lineHeight: 1.8, color: 'var(--color-text-dark)', opacity: 0.8, marginBottom: '3rem', fontFamily: 'var(--font-serif-elegant)' }}>
                  "We don't just record events; we visualize emotions before they happen. Our craft is an exploration of poetic realism—seeking the silent glances, the deep breaths, and the unscripted magic that makes your bond unique."
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', marginTop: '5rem' }}>
                  <div className="signature-box">
                    <svg width="120" height="60" viewBox="0 0 120 60" style={{ opacity: 0.8 }}>
                      <path d="M10,45 Q30,10 50,45 T90,45" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" className="signature-path" />
                    </svg>
                    <span className="font-signature" style={{ fontSize: '2.8rem', display: 'block', marginTop: '-1.5rem' }}>Aswin</span>
                    <p style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-gold)', position: 'relative' }}>Director</p>
                  </div>
                  <div style={{ width: '1px', height: '60px', background: 'rgba(0,0,0,0.05)' }}></div>
                  <div className="signature-box">
                    <svg width="120" height="60" viewBox="0 0 120 60" style={{ opacity: 0.8 }}>
                      <path d="M20,40 C40,10 80,10 100,40" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" className="signature-path" />
                    </svg>
                    <span className="font-signature" style={{ fontSize: '2.8rem', display: 'block', marginTop: '-1.5rem' }}>Sreenath</span>
                    <p style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-gold)' }}>Creative Lead</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ gridColumn: '7 / 13', height: '90vh', position: 'relative' }}>
              <div className="founders-montage" style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ paddingTop: '15vh' }}>
                  <div className="parallax-box" style={{ height: '50vh', overflow: 'hidden', borderRadius: '2px', marginBottom: '1rem' }}>
                    <img className="img-parallax" src="/images/DSC09671.jpeg" alt="" style={{ width: '100%', height: '130%', objectFit: 'cover' }} />
                  </div>
                  <div className="parallax-box" style={{ height: '35vh', overflow: 'hidden', borderRadius: '2px', background: 'var(--color-bg)' }}>
                     <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}>
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-cinematic-portrait-of-a-beautiful-bride-4416-large.mp4" type="video/mp4" />
                     </video>
                  </div>
                </div>
                <div>
                  <div className="parallax-box" style={{ height: '40vh', overflow: 'hidden', borderRadius: '2px', marginBottom: '1rem' }}>
                    <img className="img-parallax" src="/images/HAMZA_A1-3.jpg" alt="" style={{ width: '100%', height: '130%', objectFit: 'cover' }} />
                  </div>
                  <div className="parallax-box" style={{ height: '55vh', overflow: 'hidden', borderRadius: '2px' }}>
                    <img className="img-parallax" src="/images/DSC09779.jpeg" alt="" style={{ width: '100%', height: '130%', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 10 }}>
                 <span className="subtitle-mono" style={{ fontSize: '0.5rem', color: 'var(--color-gold)', letterSpacing: '3px' }}>EST. 2016 // DOCUMENTING LEGACIES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 Atelier Capabilities (Enhanced with Visual Sync) */}
      <section className="section" style={{ background: 'var(--color-bg)', color: 'var(--color-ivory)', padding: '12rem 0', borderTop: '1px solid rgba(253, 251, 247, 0.05)', position: 'relative' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '8vw', alignItems: 'start' }}>
            
            <div style={{ position: 'sticky', top: '15vh' }}>
              <span className="subtitle-mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '2.5rem' }}>Our Capabilities</span>
              <h2 style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 0.85, fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', marginBottom: '3rem' }}>
                Atelier.
              </h2>
              
              <div className="service-visual-window" style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden', borderRadius: '4px', position: 'relative', background: '#0a0a0a' }}>
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={hoveredService}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                      style={{ position: 'absolute', inset: 0 }}
                    >
                      <img 
                        src={services[hoveredService]?.img} 
                        alt="" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} 
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.8), transparent 40%)' }}></div>
                      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                         <span className="subtitle-mono" style={{ fontSize: '0.55rem', color: 'var(--color-gold)', letterSpacing: '3px' }}>{services[hoveredService]?.tag}</span>
                      </div>
                    </motion.div>
                 </AnimatePresence>
              </div>
            </div>

            <div className="atelier-list" style={{ marginTop: '5vh' }}>
              {services.map((service, idx) => (
                <div 
                  key={idx} 
                  className="capability-item interactive" 
                  onMouseEnter={() => setHoveredService(idx)}
                  onClick={() => setActiveService(activeService === idx ? null : idx)}
                  style={{ 
                    borderBottom: '1px solid rgba(253, 251, 247, 0.08)', 
                    padding: '3rem 0', 
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    opacity: activeService === idx || hoveredService === idx ? 1 : 0.4
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <h3 style={{ 
                        fontSize: 'clamp(2rem, 5vw, 3rem)', 
                        fontFamily: 'var(--font-heading)', 
                        fontWeight: 300,
                        color: 'var(--color-ivory)',
                        transition: 'transform 0.4s ease'
                      }}>
                        {service.title}
                      </h3>
                      <div style={{ 
                        width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(212,175,55,0.3)', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transform: activeService === idx ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s ease'
                      }}>
                        <span style={{ color: 'var(--color-gold)', fontSize: '1.2rem' }}>+</span>
                      </div>
                  </div>

                  <AnimatePresence>
                    {activeService === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingTop: '2.5rem', maxWidth: '500px' }}>
                          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-muted)', marginBottom: '2rem' }}>{service.desc}</p>
                          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                             {service.features.map((f, i) => (
                               <li key={i} style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                 <div style={{ width: '3px', height: '3px', background: 'currentColor', borderRadius: '50%' }}></div>
                                 {f}
                               </li>
                             ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>      </div>
      </section>

      {/* 4. The Archive Process (Editorial Timeline) */}
      <section className="section" style={{ background: 'var(--color-ivory)', color: 'var(--color-text-dark)', padding: '10rem 0' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem' }}>
            <div style={{ gridColumn: '2 / 5' }}>
              <span className="subtitle-mono" style={{ fontSize: '0.6rem', color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '2rem', display: 'block' }}>The Archive Protocol</span>
              <h2 style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '3rem' }}>How we preserve your magic.</h2>
              <p style={{ color: 'var(--color-text-muted)' }}>We take on only a limited number of commissions each year to ensure every story receives our hallmark meticulous attention.</p>
            </div>
            
            <div className="timeline-container" style={{ gridColumn: '6 / 12' }}>
              {[
                { step: '01', title: 'Consultation & Vision', desc: 'We begin by listening. Understanding your family traditions, your aesthetic preferences, and the silent expectations of your celebration.', img: '/images/DSC09671.jpeg' },
                { step: '02', title: 'Directed Spontaneity', desc: 'On your wedding day, we are quiet observers. We direct gently when needed, hunters for the perfect light and the most honest emotions.', img: '/images/DSC09163.jpeg' },
                { step: '03', title: 'The Film Suite', desc: 'Our editorial team meticulously grades every frame, selecting the perfect colors and sounds to recreate the feeling of being there.', img: '/images/editing_color.png' },
                { step: '04', title: 'The Legacy Hand-off', desc: 'Your archive is delivered in a bespoke digital archive, along with our Signature Magazine Albums—a physical heirloom for generations.', img: '/images/hero_knowledge.png' }
              ].map((item, i) => (
                <div key={i} className="timeline-item group" style={{ position: 'relative', padding: '3rem 0', paddingLeft: '4rem', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
                  <div className="timeline-visual-hint" style={{ position: 'absolute', right: '-2rem', top: '1rem', width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', opacity: 0, transform: 'scale(0.8)', transition: 'all 0.6s var(--ease-cinematic)', pointerEvents: 'none', zIndex: 0 }}>
                     <img src={item.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
                  </div>
                  <div className="timeline-dot" style={{ position: 'absolute', left: '-5px', top: '3.5rem', width: '9px', height: '9px', background: 'var(--color-gold)', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontFamily: 'var(--font-body)', fontWeight: 600, position: 'relative', zIndex: 1 }}>{item.step}</span>
                  <h4 style={{ fontSize: '1.5rem', marginTop: '0.8rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>{item.title}</h4>
                  <p style={{ fontSize: '0.95rem', maxWidth: '500px', position: 'relative', zIndex: 1 }}>{item.desc}</p>
                  
                  <style>{`
                    .timeline-item:hover .timeline-visual-hint {
                      opacity: 0.15;
                      transform: scale(1.1) translateX(-20px);
                    }
                    .timeline-item:hover h4 {
                      color: var(--color-gold);
                    }
                  `}</style>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Recognition Marquee */}
      <section className="section" style={{ background: '#0a0a0a', padding: '5rem 0', borderTop: '1px solid rgba(253, 251, 247, 0.05)', overflow: 'hidden' }}>
        <div className="marquee-row">
           {[...Array(2)].map((_, i) => (
             <React.Fragment key={i}>
                <span className="award-item"> Fearless Photographers Top 50 </span>
                <span className="award-divider">◆</span>
                <span className="award-item"> Junebug Weddings Choice </span>
                <span className="award-divider">◆</span>
                <span className="award-item"> WPAI Winner 2025 </span>
                <span className="award-divider">◆</span>
                <span className="award-item"> MyWed Editorial Award </span>
                <span className="award-divider">◆</span>
             </React.Fragment>
           ))}
        </div>
      </section>

      {/* 6. Contact Tease */}
      <section className="section" style={{ textAlign: 'center', background: 'var(--color-bg)', padding: '12rem 0' }}>
         <div className="red-dot"></div>
         <span className="subtitle-mono" style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '1.5rem' }}>Join the History</span>
         <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '3rem' }}><SplitText className="reveal-liquid">Your legacy begins here.</SplitText></h2>
         <Link to="/inquire" className="btn-premium-diamond interactive magnetic-btn" style={{ margin: '0 auto', display: 'inline-flex', textDecoration: 'none' }}>Connect for 2026/27</Link>
      </section>

    </div>
  );
};

export default About;
