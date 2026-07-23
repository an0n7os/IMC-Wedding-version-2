import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../components/Magnetic';
import { CaretDown, MapPin, EnvelopeSimple, Phone } from 'phosphor-react';
import SplitText from '../components/SplitText';

gsap.registerPlugin(ScrollTrigger);

import { portfolioData, reelsData, knowledgeBase, testimonials } from '../data/portfolio';

// Featured stories are filtered from the main portfolio data
const stories = portfolioData.filter(p => p.featured);


const Home = () => {
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroHeadlineRef = useRef(null);
  const videoWrapRef = useRef(null);
  const storiesWrapRef = useRef(null);
  const storiesContainerRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const heroSlides = [
    '/images/DSC00018.jpeg',
    '/images/DSC09671.jpeg',
    '/images/IMC_RB_-40 2.JPG',
    '/images/DSC00031.JPG',
    '/images/DSC09056.jpeg',
    '/images/HAMZA_A1-3.jpg',
    '/images/DSC08078.jpeg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Refresh ScrollTrigger after a short delay to account for dynamic content loading
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Track mouse position ONLY when hovering over a featured story card
  useEffect(() => {
    if (!hoveredProject) return;
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hoveredProject]);

  useGSAP(() => {
    // Hero Text Parallax & Fade
    gsap.to(heroTextRef.current, {
      y: 150,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Iris Video Reveal on Scroll
    gsap.to(videoWrapRef.current, {
      clipPath: 'circle(0% at 50% 50%)',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Kinetic Title Animation (Triggered after 1.5s delay to sync with preloader)
    if (heroHeadlineRef.current) {
      gsap.fromTo(heroHeadlineRef.current.querySelectorAll('.char-liquid'),
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.04, 
          ease: 'power3.out', 
          duration: 1.2,
          delay: 1.2
        }
      );
    }

    // Ken Burns Image Parallax for all generic parallax images
    const images = gsap.utils.toArray('.img-parallax');
    images.forEach((img) => {
      gsap.to(img, {
        yPercent: 20,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });



    // Magnetic Buttons Physics
    const magneticBtns = gsap.utils.toArray('.magnetic-btn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      });
    });



    // Horizontal Scroll for Featured Stories
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 992px)", () => {
      const getScrollAmount = () => {
        const containerWidth = storiesContainerRef.current.scrollWidth;
        return -(containerWidth - window.innerWidth);
      };

      const tween = gsap.to(storiesContainerRef.current, {
        x: getScrollAmount,
        ease: "none",
        force3D: true
      });

      ScrollTrigger.create({
        trigger: storiesWrapRef.current,
        start: "top top",
        end: () => `+=${storiesContainerRef.current.scrollWidth - window.innerWidth}`,
        pin: true,
        animation: tween,
        scrub: 0.5,
        invalidateOnRefresh: true
      });
    });

    // Shutter Reveal Animation for Images
    const shutters = gsap.utils.toArray('.shutter-reveal');
    shutters.forEach(shutter => {
      ScrollTrigger.create({
        trigger: shutter,
        start: 'top 80%',
        onEnter: () => shutter.classList.add('in-view')
      });
    });

    // Liquid Text Reveal for all section headers
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

    // 6. Dynamic Stats Counting
    const counters = gsap.utils.toArray('.stat-counter');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      ScrollTrigger.create({
        trigger: '.milestones-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.to(counter, {
            innerText: target,
            duration: 2.5,
            snap: { innerText: 1 },
            ease: "power4.out"
          });
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ background: 'var(--color-bg)' }}>
      


      {/* 0. Floating Project Peek (Follows Mouse) */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              top: mousePos.y,
              left: mousePos.x,
              width: '300px',
              height: '400px',
              zIndex: 50,
              pointerEvents: 'none',
              transform: 'translate(40px, -50%)',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
            }}
          >
            <img 
              src={hoveredProject.img} 
              alt="Peek" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="footer-reveal-wrapper">
        {/* 1. Hero Section - Cinematic Image Slideshow */}
      <section className="hero-section" style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: 'var(--color-bg)' }} data-cursor="play">
        
        {/* Cinematic Image Slideshow Background */}
        <div ref={videoWrapRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, clipPath: 'circle(100% at 50% 50%)', willChange: 'clip-path' }}>
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: i === activeHeroSlide ? 1 : 0,
                transition: 'opacity 1.8s cubic-bezier(0.76, 0, 0.24, 1)',
                zIndex: i === activeHeroSlide ? 1 : 0,
              }}
            >
              <img 
                src={slide} 
                alt={`Hero ${i}`} 
                fetchPriority={i === activeHeroSlide ? "high" : "auto"}
                loading={i === activeHeroSlide ? "eager" : "lazy"}
                decoding={i === activeHeroSlide ? "sync" : "async"}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.72) contrast(1.05)',
                  animation: i === activeHeroSlide ? 'heroKenBurns 5s ease-out forwards' : 'none',
                  willChange: 'transform, opacity',
                }}
              />
            </div>
          ))}
          {/* Dark gradient overlay for text readability */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.1) 50%, rgba(10,10,10,0.3) 100%)', zIndex: 2 }} />
        </div>

        <style>{`
          @keyframes heroKenBurns {
            0%   { transform: scale(1.08); }
            100% { transform: scale(1.0); }
          }
        `}</style>

        {/* Hero Text */}
        <div ref={heroTextRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', pointerEvents: 'none', zIndex: 3 }}>

          <h1 ref={heroHeadlineRef} style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', color: 'var(--color-ivory)', marginBottom: '3.5rem', pointerEvents: 'auto', letterSpacing: '-0.02em', lineHeight: 1 }}>
            <SplitText>Luxury Wedding</SplitText>
            <br/>
            <span style={{ fontStyle: 'italic', fontWeight: 400, opacity: 0.9 }}><SplitText>Archives.</SplitText></span>
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'auto' }}>
            <p className="subtitle-mono" style={{ color: 'var(--color-gold)', fontSize: '0.55rem', letterSpacing: '6px', marginBottom: '3rem' }}>
              INDIA &mdash; UAE &mdash; GLOBAL
            </p>
          </div>
        </div>

        {/* Slide Progress Dots */}
        <div style={{ position: 'absolute', bottom: '5rem', right: '3rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 4 }}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveHeroSlide(i)}
              style={{
                width: i === activeHeroSlide ? '2px' : '2px',
                height: i === activeHeroSlide ? '28px' : '12px',
                background: i === activeHeroSlide ? 'var(--color-gold)' : 'rgba(253,251,247,0.35)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', opacity: 0.7, zIndex: 4 }}>
           <span style={{ fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}>Discover</span>
           <div style={{ width: '1px', height: '60px', background: 'rgba(253, 251, 247, 0.2)', position: 'relative', overflow: 'hidden' }}>
             <div className="scroll-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50%', background: 'var(--color-gold)' }}>
                 <style>{`
                   .scroll-line { animation: drop 1.5s cubic-bezier(0.7, 0, 0.3, 1) infinite; }
                   @keyframes drop {
                     0% { transform: translateY(-100%); }
                     100% { transform: translateY(200%); }
                   }
                 `}</style>
             </div>
           </div>
        </div>
      </section>

      {/* 1.5 Press & Features Marquee */}
      <section className="press-marquee" style={{ background: 'var(--color-ivory)', padding: '4rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div className="container-wide" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-taupe)', marginBottom: '2.5rem' }}>As Featured In</span>
           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'clamp(3rem, 6vw, 6rem)', flexWrap: 'wrap', opacity: 0.7, color: 'var(--color-bg)' }}>
             <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>VOGUE</div>
             <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', letterSpacing: '4px', fontWeight: 600 }}>HARPER'S BAZAAR</div>
             <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontStyle: 'italic', letterSpacing: '1px' }}>The Lane</div>
             <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', letterSpacing: '3px', fontWeight: 500 }}>WEDDED WONDERLAND</div>
           </div>
        </div>
      </section>

      {/* 2. About Section: The Dream Weavers (Unique Editorial) */}
      <section id="about" className="section" style={{ background: 'var(--color-ivory)', color: 'var(--color-text-dark)', padding: '8rem 0', position: 'relative' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4vw', alignItems: 'flex-start' }}>
            
            <div className="about-text-col" style={{ gridColumn: '2 / 7', paddingTop: '5vh' }}>
              <span className="subtitle-mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-taupe)', display: 'block', marginBottom: '3rem' }}>The Visionaries</span>
              
              <h2 className="editorial-headline-stagger" style={{ marginBottom: '4rem' }}>
                <span style={{ display: 'block' }}><SplitText className="reveal-liquid" style={{ whiteSpace: 'nowrap' }}>Creating</SplitText></span>
                <span style={{ display: 'block', marginLeft: '5vw' }}>
                  <SplitText className="reveal-liquid" style={{ whiteSpace: 'nowrap' }}>Magic</SplitText><span className="stagger-dot">.</span>
                </span>
              </h2>

              <div className="premium-text-block" style={{ marginTop: '2rem' }}>
                <p style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontStyle: 'italic', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                  At IMC Weddings, we’re more than just visual artists;
                </p>
                <p style={{ fontSize: '1.05rem', color: 'rgba(17, 17, 17, 0.7)', lineHeight: 2, maxWidth: '480px', fontWeight: 300 }}>
                  We’re passionate dream weavers committed to transforming your love story into an unforgettable cinematic memory. With our artist’s eye and storyteller’s heart, we craft mesmerizing frames that capture every emotion of your special day.
                  <br /><br />
                  From the quiet glances to the grand gestures, we specialize in uncovering the extraordinary beauty hidden within each moment. Together, we’ll embark on a journey filled with laughter, tears, and endless joy, ensuring your memories are preserved as timeless treasures to cherish forever.
                </p>
              </div>
              
              <div style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                 <div style={{ width: '60px', height: '1px', background: 'var(--color-taupe)' }}></div>
                 <Link to="/about" className="interactive" data-cursor="explore" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-bg)', fontWeight: 600, textDecoration: 'none' }}>Discover Our History</Link>
              </div>
            </div>

            <div className="about-image-col" style={{ gridColumn: '8 / 13', position: 'relative' }}>
              <div style={{ height: '85vh', overflow: 'hidden', position: 'relative' }} data-cursor="view">
                 <img className="img-parallax" src="/images/wedding_details_1774728672884.png" alt="Dream Weavers Detail" loading="lazy" decoding="async" style={{ width: '100%', height: '130%', objectFit: 'cover', top: '-15%', position: 'absolute', display: 'block', willChange: 'transform' }} />
              </div>
              
              {/* Rotating Archive Seal Signature */}
              <div className="archive-seal">
                 <svg viewBox="0 0 100 100" width="100" height="100">
                    <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                    <text fontSize="6.5" fontFamily="'Outfit', sans-serif" letterSpacing="3" fill="var(--color-gold)">
                       <textPath href="#circlePath">ESTD 2014 &bull; ARCHIVING LEGACIES &bull;</textPath>
                    </text>
                 </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2.2 What We Do (Minimalist Editorial List) */}
      <section className="section" style={{ background: 'var(--color-ivory)', color: 'var(--color-text-dark)', padding: '5rem 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container-wide" style={{ textAlign: 'center' }}>
          <span className="subtitle-mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '8px', color: 'var(--color-taupe)', display: 'block', marginBottom: '2rem', opacity: 0.8 }}>What We Do</span>
          
          <div className="services-list-editorial" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
            <h2 style={{ fontSize: 'clamp(4rem, 14vw, 11rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 0.9, margin: 0 }}>
              <SplitText className="reveal-liquid">Weddings</SplitText>
            </h2>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 3rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 1.1, margin: 0, opacity: 0.7 }}>
                <SplitText className="reveal-liquid">Brand Concept Shoots</SplitText>
              </h3>
              <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 3rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 1.1, margin: 0, opacity: 0.7 }}>
                <SplitText className="reveal-liquid">Engagement Shoots</SplitText>
              </h3>
              <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 3rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 1.1, margin: 0, opacity: 0.7 }}>
                <SplitText className="reveal-liquid">Corporate Events</SplitText>
              </h3>
              <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 3rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 1.1, margin: 0, opacity: 0.7 }}>
                <SplitText className="reveal-liquid">Newborn Portraiture</SplitText>
              </h3>
            </div>
          </div>
        </div>
        <div className="diamond-separator" style={{ borderColor: 'rgba(0,0,0,0.1)', marginTop: '3rem' }}></div>
      </section>

      {/* 2.5 Our Philosophy (Three Pillars of Excellence) */}
      <section className="section" style={{ background: 'var(--color-bg)', borderTop: '1px solid rgba(253, 251, 247, 0.05)', padding: '6rem 0' }}>
        <div className="container-wide">
          <div className="philosophy-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0' }}>
            <div className="philosophy-item" style={{ borderTop: '1px solid rgba(212,175,55,0.25)', padding: '3rem 3rem 3rem 0', transition: 'border-color 0.4s ease' }}>
               <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '1.5rem' }}>01</span>
               <h3 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', transition: 'color 0.4s ease' }}><SplitText className="reveal-liquid" style={{ whiteSpace: 'nowrap' }}>Vision</SplitText></h3>
               <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.9 }}>We don't just record events; we visualize emotions before they happen. Our directors are trained to hunt for the light that defines your story.</p>
            </div>
            <div className="philosophy-item" style={{ borderTop: '1px solid rgba(212,175,55,0.25)', padding: '3rem', transition: 'border-color 0.4s ease' }}>
               <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '1.5rem' }}>02</span>
               <h3 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', transition: 'color 0.4s ease' }}><SplitText className="reveal-liquid" style={{ whiteSpace: 'nowrap' }}>Archive</SplitText></h3>
               <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.9 }}>Your memories deserve more than a digital folder. We archive every project with the precision of high-end cinema, ensuring it lasts for generations.</p>
            </div>
            <div className="philosophy-item" style={{ borderTop: '1px solid rgba(212,175,55,0.25)', padding: '3rem 0 3rem 3rem', transition: 'border-color 0.4s ease' }}>
               <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '1.5rem' }}>03</span>
               <h3 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', transition: 'color 0.4s ease' }}><SplitText className="reveal-liquid" style={{ whiteSpace: 'nowrap' }}>Legacy</SplitText></h3>
               <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.9 }}>At the end of the day, your films and photos are your family's first heirloom. We build narratives that transcend time and trends.</p>
            </div>
          </div>
        </div>
        <div className="diamond-separator"></div>
        <style>{`
          .philosophy-item:hover { border-top-color: var(--color-gold) !important; }
          .philosophy-item:hover h3 { color: var(--color-gold) !important; }
        `}</style>
      </section>

      {/* 3. The Atelier: What We Do */}
      <section className="section section-no-top" style={{ paddingBottom: 0 }}>
        <div className="red-dot"></div>
        <div className="container-wide" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', marginBottom: '1.5rem' }}>
            <SplitText className="reveal-liquid">Our Atelier.</SplitText>
          </h2>
          <span className="subtitle-mono" style={{ color: 'var(--color-gold)' }}>CORE SERVICES</span>
        </div>
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2px', padding: '2rem 5vw', background: 'transparent' }}>
          {[
            { id: 'amber-nav', title: 'The Engagement', desc: 'Narrative pre-wedding archives', col: '1 / 5' },
            { id: 'namra-arshad', title: 'Documentary Weddings', desc: 'Soulful event storytelling', col: '5 / 9' },
            { id: 'ruksar-basith', title: 'Cinema Post-Production', desc: 'Bespoke color science', col: '9 / 13' }
          ].map((service, index) => {
            const portData = portfolioData.find(p => p.id === service.id) || portfolioData[0];
            return (
              <div key={index} className="service-card interactive" style={{ gridColumn: service.col, height: '78vh', position: 'relative', overflow: 'hidden' }} data-cursor="explore">
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
                  <span style={{ fontSize: '0.6rem', color: 'var(--color-gold)', letterSpacing: '4px', opacity: 0.6 }}>0{index + 1}</span>
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0.2) 50%, transparent 100%)', zIndex: 1, transition: 'background 0.6s ease' }} className="service-overlay"></div>
                <img src={portData.img} alt={service.title} className="img-zoom" loading="lazy" decoding="async" style={{ width: '100%', height: '120%', objectFit: 'cover', transition: 'transform 0.6s ease', willChange: 'transform' }} />
                <div className="service-text" style={{ 
                  position: 'absolute', 
                  bottom: '3rem', 
                  left: 0, 
                  right: 0, 
                  zIndex: 2,
                  transform: 'none',
                  padding: '0 2rem'
                }}>
                  <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)', marginBottom: '1.5rem', transition: 'width 0.6s ease' }} className="service-line"></div>
                  <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', marginBottom: '0.8rem', lineHeight: 1.1, fontWeight: 300, fontStyle: 'italic' }}>{service.title}</h3>
                  <p style={{ color: 'var(--color-taupe)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 500 }}>{service.desc}</p>
                </div>
                <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(212, 175, 55, 0.1)', pointerEvents: 'none', zIndex: 3 }}></div>
              </div>
            );
          })}
        </div>
        <style>{`
          .service-card:hover .service-overlay { background: rgba(10, 10, 10, 0.1) !important; }
          .service-card:hover img { transform: translateY(-5%) scale(1.05) !important; }
          .service-card:hover .service-line { width: 100% !important; }
          @media (max-width: 900px) {
             .services-grid { display: flex !important; flex-direction: column; gap: 1rem !important; padding: 0 4vw !important; }
             .services-grid > div { height: 50vh !important; }
             .service-text { 
               left: 0 !important; 
               right: 0 !important; 
               bottom: 2rem !important; 
               top: auto !important; 
               transform: none !important; 
               width: 100% !important; 
               padding: 0 1.5rem !important; 
             }
             .service-text h3 { font-size: 1.8rem !important; }
          }
        `}</style>
      </section>

      {/* 4. Featured Stories (Horizontal Scroll) */}
      <section ref={storiesWrapRef} id="wedding-films" className="section stories-wrap" style={{ background: 'var(--color-bg)', padding: 0, overflow: 'hidden', position: 'relative' }}>
        <div className="red-dot" style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}></div>
        <div className="container-wide stories-header-wrap" style={{ position: 'relative', paddingTop: '7rem', paddingBottom: '2rem', textAlign: 'center', zIndex: 10 }}>
           <h2 style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}><SplitText className="reveal-liquid">Stories Archive</SplitText></h2>
           <span className="subtitle-mono" style={{ fontSize: '0.6rem', color: 'var(--color-gold)', marginTop: '0.5rem', display: 'block', textTransform: 'uppercase', letterSpacing: '4px' }}>Wedding Stories</span>
        </div>
        <div ref={storiesContainerRef} className="stories-container" style={{ display: 'flex', gap: '3rem', padding: '2rem 5vw 6rem 5vw', width: 'fit-content', willChange: 'transform' }}>
          {stories.slice(0, 4).map(story => (
            <Link 
              to={`/gallery/${story.slug}`}
              key={story.id} 
              className="story-card interactive" 
              style={{ width: '50vw', minWidth: '600px', height: '65vh', position: 'relative', display: 'block' }} 
              data-cursor="view"
              onMouseEnter={() => setHoveredProject(story)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
                <img 
                  src={story.img} 
                  alt={story.title} 
                  loading="lazy" 
                  decoding="async" 
                  style={{ 
                    width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', 
                    willChange: 'transform',
                    transform: hoveredProject?.id === story.id ? 'scale(1.05) translateZ(0)' : 'scale(1.0) translateZ(0)',
                    transition: 'transform 0.8s var(--ease-cinematic)'
                  }} 
                />
              </div>
              <div className="story-card-info" style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-end',
                fontFamily: 'var(--font-body)', 
                textTransform: 'uppercase', 
                fontSize: '0.75rem', 
                letterSpacing: '2px', 
                color: 'var(--color-taupe)', 
                padding: '2.5rem 1.5rem 1.2rem 1.5rem',
                background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.5) 60%, transparent 100%)',
                zIndex: 3 
              }}>
                <span style={{ color: 'var(--color-ivory)', fontWeight: 500 }}>{story.title}</span>
                <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>{story.location} &mdash; {story.mood}</span>
              </div>
            </Link>
          ))}
          {/* Final link to full gallery */}
          <div style={{ width: '30vw', minWidth: '300px', height: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Link to="/gallery" className="btn-premium-diamond interactive" data-cursor="explore">View Full Archive</Link>
          </div>
        </div>
        <div className="diamond-separator"></div>
      </section>

      {/* 4.5 Magazine Albums (Horizontal Ribbon) */}
      <section className="section" style={{ background: 'var(--color-bg)', padding: '10vh 0', overflow: 'hidden' }}>
        <div className="container-wide" style={{ marginBottom: '6rem' }}>
           <div className="red-dot"></div>
           <span className="subtitle-mono" style={{ fontSize: '0.6rem', color: 'var(--color-gold)', display: 'block', textAlign: 'center', marginBottom: '1rem' }}>The Tangible Memory</span>
           <h2 style={{ fontSize: '4rem', textAlign: 'center', padding: '10px 0' }}><SplitText className="reveal-liquid" style={{ whiteSpace: 'nowrap' }}>Magazine Albums.</SplitText></h2>
        </div>
        
        <div className="magazine-ribbon" style={{ display: 'flex', gap: '2vw', padding: '0 5vw', overflow: 'hidden' }}>
          {portfolioData.filter(p => p.category === 'Magazine Album').map((album, i) => (
            <div key={i} className="magazine-card interactive" data-cursor="view" style={{ flex: '0 0 35vw', minWidth: '400px', height: '500px', position: 'relative', background: '#111', overflow: 'hidden' }}>
               <img src={album.img} alt={album.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transition: 'all 1.2s ease', willChange: 'transform, opacity' }} />
               {/* Gradient overlay */}
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)', zIndex: 2 }} />
               <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', zIndex: 5 }}>
                  <span style={{ fontSize: '0.6rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '3px' }}>{album.date}</span>
                  <h4 style={{ fontSize: '1.4rem', color: 'var(--color-ivory)', marginTop: '0.5rem', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>{album.title}</h4>
                  <div className="magazine-view-details" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '1rem', opacity: 0, transform: 'translateY(10px)', transition: 'all 0.5s ease' }}>
                    <div style={{ width: '30px', height: '1px', background: 'var(--color-gold)' }} />
                    <span style={{ fontSize: '0.6rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '3px' }}>View Details</span>
                  </div>
               </div>
               <div className="magazine-overlay" style={{ position: 'absolute', inset: 0, border: '1px solid rgba(197, 160, 89, 0.2)', pointerEvents: 'none', transition: 'border-color 0.5s ease', zIndex: 3 }}></div>
            </div>
          ))}
        </div>
        
        <div className="container-wide" style={{ marginTop: '2rem', textAlign: 'center' }}>
           <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto' }}>
             Our bespoke magazine albums are curated masterpieces, designed in our Dubai studio to preserve your legacy with editorial precision.
           </p>
        </div>
        <style>{`
          .magazine-card { transition: transform 0.8s var(--ease-cinematic); }
          .magazine-card:hover { transform: translateY(-16px); }
          .magazine-card:hover img { opacity: 1 !important; transform: scale(1.06); }
          .magazine-card:hover .magazine-overlay { border-color: rgba(212, 175, 55, 0.6) !important; }
          .magazine-card:hover .magazine-view-details { opacity: 1 !important; transform: translateY(0) !important; }
        `}</style>
      </section>


      <div className="diamond-separator"></div>

      {/* 6. Cinematic Testimonials Overhaul */}
      <section className="section testimonials-section" style={{ background: 'var(--color-ivory)', color: 'var(--color-text-dark)', padding: '12rem 0', overflow: 'hidden' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4vw', alignItems: 'center' }}>
            
            {/* Left Col: Cinematic Frequency Visualizer */}
            <div style={{ gridColumn: '1 / 6' }}>
              <div style={{ position: 'relative', width: '100%', height: '70vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                 <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
                    <img src="/images/DSC09056.jpeg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 </div>
                 <div style={{ display: 'flex', gap: '4px', height: '40px', alignItems: 'center', zIndex: 2 }}>
                    {[...Array(12)].map((_, i) => (
                       <motion.div 
                          key={i} 
                          animate={{ height: [10, 35, 15, 40, 20] }} 
                          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1, ease: "easeInOut" }} 
                          style={{ width: '2px', background: 'var(--color-gold)', opacity: 0.6 }} 
                       />
                    ))}
                 </div>
                 <p className="subtitle-mono" style={{ color: 'var(--color-gold)', fontSize: '0.55rem', letterSpacing: '4px', marginTop: '2rem', zIndex: 2, textTransform: 'uppercase' }}>
                    Archive Record // Playback
                 </p>
              </div>
            </div>

            {/* Right Col: Content Carousel with Word-Reveal */}
            <div style={{ gridColumn: '6 / 13', paddingLeft: '4vw' }}>
               <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-taupe)', display: 'block', marginBottom: '2rem', fontWeight: 600 }}>
                 Voice Of The Archive
               </span>
               
               <div style={{ position: 'relative', minHeight: '300px' }}>
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={activeTestimonial}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.8 }}
                   >
                     <h3 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.6rem)', color: 'var(--color-text-dark)', lineHeight: 1.3, marginBottom: '3.5rem', fontFamily: 'var(--font-serif-elegant)', fontWeight: 300, fontStyle: 'italic' }}>
                       {testimonials[activeTestimonial].quote.split(' ').map((word, i) => (
                         <motion.span 
                            key={i} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.03 }}
                            style={{ display: 'inline-block', marginRight: '0.35em' }}
                         >
                            {word}
                         </motion.span>
                       ))}
                     </h3>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)' }}></div>
                        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600 }}>
                          {testimonials[activeTestimonial].name}
                        </h4>
                     </div>
                   </motion.div>
                 </AnimatePresence>
               </div>

               {/* Carousel Interaction */}
               <div style={{ display: 'flex', gap: '1rem', marginTop: '4rem' }}>
                 {testimonials.map((_, i) => (
                   <button 
                     key={i} 
                     onClick={() => setActiveTestimonial(i)}
                     style={{ 
                       width: i === activeTestimonial ? '40px' : '15px', 
                       height: '2px', 
                       cursor: 'pointer', 
                       transition: 'all 0.6s var(--ease-cinematic)',
                       background: i === activeTestimonial ? 'var(--color-gold)' : 'rgba(10,10,10,0.1)',
                       border: 'none',
                       padding: 0
                     }}
                   ></button>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6.2 Sovereign FAQ Section */}
      <section className="section faq-section" style={{ background: 'var(--color-ivory)', padding: '10rem 0', borderTop: '1px solid rgba(0,0,0,0.03)' }}>
        <div className="container-wide" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
             <div className="red-dot"></div>
             <span className="subtitle-mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '6px', color: 'var(--color-gold)', display: 'block', marginBottom: '1.5rem' }}>Knowledge Index</span>
             <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-bg)' }}>
               Sovereign Guide<span style={{ color: 'var(--color-gold)' }}>.</span>
             </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {knowledgeBase.map((item, index) => (
              <div key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="interactive"
                  data-cursor="explore"
                  style={{ 
                    width: '100%', padding: '2.5rem 0', background: 'transparent', border: 'none', 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-gold)', opacity: 0.6, fontFamily: 'var(--font-body)' }}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                    <h3 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-bg)', fontWeight: 400 }}>{item.q}</h3>
                  </div>
                  <motion.span 
                    animate={{ rotate: activeFaq === index ? 45 : 0 }}
                    style={{ fontSize: '1.5rem', color: 'var(--color-gold)', display: 'inline-block' }}
                  >+</motion.span>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <div style={{ padding: '0 0 3rem 5.2rem', maxWidth: '750px' }}>
                        <p style={{ color: 'rgba(10,10,10,0.6)', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 300 }}>{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 6.5 Agency Milestones (Trust & Scale) */}
      <section className="section milestones-section" style={{ background: 'var(--color-ivory)', color: 'var(--color-bg)', padding: '6rem 0' }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', flexWrap: 'wrap', gap: '3rem', padding: '0 5vw' }}>
          {[
            { metric: '500+', label: 'Love Stories Captured' },
            { metric: '15+', label: 'Destination Countries' },
            { metric: '50+', label: 'Global Awards Won' },
            { metric: '10', label: 'Years of Magic' }
          ].map((stat, i) => (
            <div key={i} className="interactive" style={{ flex: '1 1 200px' }} data-cursor="explore">
              <h4 style={{ fontSize: '4rem', fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', marginBottom: '0.5rem', lineHeight: 1 }}>
                <span className="stat-counter" data-target={parseInt(stat.metric)}>{stat.metric.includes('+') ? '0' : '0'}</span>{stat.metric.includes('+') ? '+' : ''}
              </h4>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600, color: 'var(--color-taupe)' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Inquiry Form (Emotional Tell Us Your Dream) */}
      <section id="inquiry" className="section" style={{ background: 'var(--color-bg)', color: 'var(--color-ivory)', minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Premium BG Image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="/images/DSC09779.jpeg" alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.18) grayscale(0.3)', transform: 'scale(1.02)', willChange: 'transform' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,10,0.95) 55%, rgba(10,10,10,0.7) 100%)' }} />
        </div>
        <div className="container-wide" style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '6px', color: 'var(--color-gold)', display: 'block', marginBottom: '2.5rem' }}>The Invitation</span>
            <h2 style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.9, marginBottom: '3rem', fontFamily: 'var(--font-heading)' }}>
              <SplitText className="reveal-liquid">Tell us your</SplitText><br/>
              <SplitText className="reveal-liquid">dream.</SplitText>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 4rem auto', lineHeight: 1.8 }}>
              We take on a limited number of commissions each year to ensure the absolute quality and emotional depth of our storytelling.
            </p>
            <Link to="/inquire" className="btn-premium-diamond interactive magnetic-btn" style={{ margin: '0 auto', display: 'inline-flex' }}>
              Begin Your Narrative
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Social Archives Teaser (Reels) */}
      <section className="section" style={{ background: 'var(--color-bg)', padding: '10vh 0' }}>
        <div className="container-wide">
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <span className="subtitle-mono" style={{ fontSize: '0.6rem', color: 'var(--color-gold)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>Social Archives</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--color-ivory)' }}>Short Stories.</h2>
          </div>
          
          <div className="reels-grid-home" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', padding: '0 2vw' }}>
            {reelsData.slice(0, 4).map((reel) => (
              <div key={reel.id} className="reel-card interactive group" data-cursor="play" style={{ position: 'relative' }}>
                <div className="reel-video-wrap" style={{ width: '100%', aspectRatio: '9/16', overflow: 'hidden', position: 'relative', borderRadius: '8px', background: '#111' }}>
                  <img src={reel.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <video 
                    src={reel.video} 
                    loop muted playsInline 
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 0.6s ease' }}
                    onMouseEnter={(e) => { e.target.play(); e.target.style.opacity = 1; }}
                    onMouseLeave={(e) => { e.target.pause(); e.target.style.opacity = 0; }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-bg)', color: 'var(--color-ivory)', padding: '4rem 0', borderTop: '1px solid rgba(253, 251, 247, 0.05)' }}>
        <div className="red-dot"></div>
        <div className="container-wide" style={{ textAlign: 'center', marginBottom: '5rem' }}>
           <h3 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', marginBottom: '2rem', color: 'var(--color-ivory)' }}>
            <SplitText className="reveal-liquid">Follow the Magic</SplitText>
          </h3>
          <a href="https://www.instagram.com/_imcweddings_/" target="_blank" rel="noopener noreferrer" className="interactive" data-cursor="explore" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: 600, borderBottom: '1px solid var(--color-gold)', paddingBottom: '0.5rem', color: 'var(--color-gold)' }}>@_imcweddings_</a>

        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', padding: '0 5vw', backgroundColor: 'var(--color-bg)' }}>
          {[
            '/images/DSC00031.JPG',
            '/images/DSC09163.jpeg',
            '/images/DSC09671.jpeg',
            '/images/DSC09779.jpeg',
            '/images/IMG_7881.JPG'
          ].map((img, i) => (
             <a href="https://www.instagram.com/_imcweddings_/" target="_blank" rel="noopener noreferrer" key={i} className="interactive insta-link" data-cursor="explore" style={{ overflow: 'hidden', aspectRatio: '1/1', display: 'block', position: 'relative' }}>
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(212,175,55,0.5) 0%, transparent 70%)', opacity: 0, zIndex: 1, transition: 'opacity 0.5s ease' }} className="insta-hover-overlay"></div>
               <img src={img} alt="IMC Weddings" className="img-zoom" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease, filter 0.8s ease', filter: 'grayscale(0.3) brightness(0.9)' }} />
               <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%) translateY(10px)', zIndex: 2, opacity: 0, transition: 'all 0.5s ease' }} className="insta-icon-overlay">
                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/></svg>
               </div>
             </a>
          ))}
        </div>
        <style>{`
          .insta-link:hover .insta-hover-overlay { opacity: 1 !important; }
          .insta-link:hover img { transform: scale(1.06) !important; filter: grayscale(0) brightness(1) !important; }
          .insta-link:hover .insta-icon-overlay { opacity: 1 !important; transform: translateX(-50%) translateY(0) !important; }
        `}</style>
        </section>


      {/* 8. Global Presence (Strategic Studios) */}
      <section id="presence" className="section" style={{ background: 'var(--color-bg)', color: 'var(--color-ivory)', padding: '10vh 0', borderTop: '1px solid rgba(253, 251, 247, 0.05)' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '6vw', alignItems: 'flex-start' }}>
            <div style={{ gridColumn: '2 / 5' }}>
              <span className="subtitle-mono" style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '2rem' }}>Global Reach</span>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.9, marginBottom: '3rem' }}>
                <SplitText className="reveal-liquid">International</SplitText><br/>
                <SplitText className="reveal-liquid">Studios.</SplitText>
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '400px', lineHeight: 1.8, marginBottom: '3rem' }}>
                Strategy and artistry across borders. Our flagship studios allow us to archive stories globally with uncompromising quality and a local soul.
              </p>
              <div style={{ borderLeft: '1px solid var(--color-gold)', paddingLeft: '1.5rem' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '2px' }}>Commisions</span>
                <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Open Worldwide 2026/27</p>
              </div>
            </div>
            
            <div style={{ gridColumn: '6 / 12' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3vw' }}>
                  <div className="interactive studio-card" data-cursor="explore" style={{ padding: '4rem 3rem', background: 'rgba(253, 251, 247, 0.03)', border: '1px solid rgba(253, 251, 247, 0.05)', transition: 'background 0.6s ease' }}>
                    <h4 style={{ fontSize: '1.5rem', color: 'var(--color-ivory)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>India</h4>
                    <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', lineHeight: 2, color: 'var(--color-taupe)' }}>
                      THURAKKAL JUNCTION<br/>
                      MANJERI, KERALA 676121<br/>
                      <span style={{ color: 'var(--color-gold)', marginTop: '1rem', display: 'inline-block' }}>+91 9544 330 088</span>
                    </p>
                  </div>
                  
                  <div className="interactive studio-card" data-cursor="explore" style={{ padding: '4rem 3rem', background: 'rgba(253, 251, 247, 0.03)', border: '1px solid rgba(253, 251, 247, 0.05)', marginTop: '6vh', transition: 'background 0.6s ease' }}>
                    <h4 style={{ fontSize: '1.5rem', color: 'var(--color-ivory)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>UAE</h4>
                    <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', lineHeight: 2, color: 'var(--color-taupe)' }}>
                      IN5, PRODUCTION CITY<br/>
                      DUBAI, UNITED ARAB EMIRATES<br/>
                      <span style={{ color: 'var(--color-gold)', marginTop: '1rem', display: 'inline-block' }}>+971 054 772 0088</span>
                    </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .studio-card:hover { 
            background: rgba(253, 251, 247, 0.08) !important;
            border-color: var(--color-gold) !important;
          }
        `}</style>
      </section>
      </div> {/* Closes footer-reveal-wrapper */}
    </div>
  );
};

export default Home;
