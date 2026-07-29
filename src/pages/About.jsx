import { useRef, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteMeta, studioStats, portfolioData } from '../data/portfolio';
import SplitText from '../components/SplitText';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const [activeService, setActiveService] = useState(null);
  const [hoveredService, setHoveredService] = useState(0);

  const magazineAlbums = portfolioData.filter(p => p.category === 'Magazine Album');

  useGSAP(() => {
    // Liquid Reveal for headers
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

    // Parallax Images
    const images = gsap.utils.toArray('.img-parallax');
    images.forEach((img) => {
      gsap.to(img, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });
  }, { scope: containerRef });

  const services = [
    {
      title: 'Wedding Photography',
      desc: 'Full-day documentary coverage of your wedding rituals, stage moments, and portraits. We focus on real emotions, subtle details, and timeless framing.',
      tag: 'COLLECTOR EDITION',
      img: '/images/wedding_photography.jpg',
      features: ['2 Photographers', 'High-Res Digital Gallery', 'Color Graded Archive', 'Printed Keepsake']
    },
    {
      title: 'Wedding Cinema',
      desc: 'Cinematic films with natural sound, ambient score, and candid speech audio. We capture the movement, joy, and voices of your day.',
      tag: 'FILM ARCHIVE',
      img: '/images/DSC00018.jpeg',
      features: ['Teaser Film (60s)', 'Highlight Film (5-7m)', 'Full Ceremony Film', '4K Master Delivery']
    },
    {
      title: 'Magazine Albums',
      desc: 'Bespoke printed keepsakes designed in-house and printed in Dubai. Thick museum-grade pages, layflat binding, and custom foil cover typography.',
      tag: 'PRINTED KEEPSAKE',
      img: '/images/shifin-rahla/bride-07.jpg',
      features: ['Custom Layout Design', 'Dubai Studio Printing', 'Velvet & Leather Covers', 'Family Replica Albums']
    },
    {
      title: 'Destination Weddings',
      desc: 'Coverage for weddings in Dubai, Abu Dhabi, Bahrain, Jaipur, Goa, Europe, and beyond. Complete travel planning and multi-day itinerary coverage.',
      tag: 'GLOBAL DESTINATIONS',
      img: '/images/HAMZA_A1-3.jpg',
      features: ['Pre-Wedding Shoot', 'Multi-Day Events', 'Worldwide Travel Team', 'Same-Day Preview Edit']
    }
  ];

  return (
    <div ref={containerRef} className="about-prestige" style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '12vh' }}>
      
      {/* 1. Cinematic Hero Header Section */}
      <header 
        className="section" 
        style={{ 
          minHeight: '75vh', 
          display: 'flex', 
          alignItems: 'center', 
          position: 'relative', 
          overflow: 'hidden',
          paddingBottom: '6vh'
        }}
      >
        {/* Subtle Background Parallax Image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.25 }}>
          <img 
            src="/images/DSC00018.jpeg" 
            alt="Hero Background" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6) brightness(0.5)' }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--color-bg) 0%, transparent 40%, transparent 60%, var(--color-bg) 100%)' }} />
        </div>

        <div className="container-wide" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div className="red-dot" style={{ margin: '0 auto 1.5rem auto' }}></div>
          <span className="subtitle-mono" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '5px', color: 'var(--color-gold)', display: 'block', marginBottom: '1.5rem' }}>
            EST. {siteMeta.foundedYear} &bull; KERALA &amp; DUBAI
          </span>
          
          <h1 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', color: 'var(--color-ivory)', lineHeight: 0.95, marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
            <SplitText className="reveal-liquid">About Us.</SplitText>
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--color-taupe)', maxWidth: '640px', margin: '0 auto 3rem auto', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 300 }}>
            Documentary wedding photography &amp; cinematic films preserving love stories with grace and timeless honesty.
          </p>

          {/* Stats Bar */}
          <div 
            style={{ 
              display: 'inline-flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '2.5rem', 
              padding: '1.2rem 3rem', 
              background: 'rgba(255,255,255,0.04)', 
              border: '1px solid rgba(212,175,55,0.2)', 
              borderRadius: '50px',
              backdropFilter: 'blur(10px)'
            }}
          >
            {studioStats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontWeight: 500 }}>
                  {stat.value}{stat.suffix}
                </span>
                <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-ivory)', display: 'block', opacity: 0.8, marginTop: '0.2rem' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 2. About IMC Weddings */}
      <section className="section manifesto-section" style={{ background: 'var(--color-ivory)', color: 'var(--color-text-dark)', position: 'relative', overflow: 'hidden' }}>
         <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem', alignItems: 'flex-start' }}>
            <div style={{ gridColumn: '1 / 6', paddingRight: '2vw' }}>
              <span className="subtitle-mono" style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-taupe)', display: 'block', marginBottom: '2.5rem' }}>About IMC Weddings</span>
              <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.95, marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
                Crafting Timeless<br/>Stories.
              </h2>
              <p style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontStyle: 'italic', marginBottom: '2.5rem', letterSpacing: '0.02em' }}>
                With elegance and soul.
              </p>
              <div className="manifesto-wrap" style={{ position: 'relative', paddingLeft: '2.5rem', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(17, 17, 17, 0.75)', maxWidth: '560px', marginBottom: '1.8rem' }}>
                  A wedding is more than a celebration &mdash; it is the beginning of a legacy. At IMC Weddings, we believe every glance, every embrace, and every quiet emotion deserves to be preserved with honesty, artistry, and intention.
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(17, 17, 17, 0.75)', maxWidth: '560px', marginBottom: '1.8rem' }}>
                  Founded by Nishad Chatholi, IMC Weddings is a luxury wedding photography and filmmaking studio based in Kerala, India, with a growing presence in Dubai, UAE. Our work is dedicated to couples who value authenticity, refined aesthetics, and storytelling that transcends trends.
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(17, 17, 17, 0.75)', maxWidth: '560px', marginBottom: '1.8rem' }}>
                  Every wedding is approached with a bespoke mindset. Rather than simply documenting events, we immerse ourselves in the rhythm of your celebration, capturing genuine moments as they naturally unfold &mdash; imagery that feels elegant, cinematic, and deeply personal.
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(17, 17, 17, 0.75)', maxWidth: '560px' }}>
                  At IMC Weddings, luxury is not defined by extravagance &mdash; it is reflected in the care we invest, the relationships we build, and the timeless experience we create for every couple.
                </p>
              </div>
            </div>

            <div style={{ gridColumn: '7 / 13', height: '90vh', position: 'relative' }}>
              <div className="founders-montage" style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ paddingTop: '15vh' }}>
                  <div className="parallax-box" style={{ height: '50vh', overflow: 'hidden', borderRadius: '2px', marginBottom: '1rem' }}>
                    <img className="img-parallax" src="/images/shifin-rahla/bride-07.jpg" alt="" style={{ width: '100%', height: '130%', objectFit: 'cover' }} />
                  </div>
                  <div className="parallax-box" style={{ height: '35vh', overflow: 'hidden', borderRadius: '2px' }}>
                     <img className="img-parallax" src="/images/dilsha-adil/couple-01.jpg" alt="" style={{ width: '100%', height: '130%', objectFit: 'cover' }} />
                  </div>
                </div>
                <div>
                  <div className="parallax-box" style={{ height: '40vh', overflow: 'hidden', borderRadius: '2px', marginBottom: '1rem' }}>
                    <img className="img-parallax" src="/images/shibil-shasiya/bride-08.jpg" alt="" style={{ width: '100%', height: '130%', objectFit: 'cover' }} />
                  </div>
                  <div className="parallax-box" style={{ height: '55vh', overflow: 'hidden', borderRadius: '2px' }}>
                    <img className="img-parallax" src="/images/DSC09779.jpeg" alt="" style={{ width: '100%', height: '130%', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 10 }}>
                 <span className="subtitle-mono" style={{ fontSize: '0.5rem', color: 'var(--color-gold)', letterSpacing: '3px' }}>EST. {siteMeta.foundedYear} // KERALA &amp; DUBAI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 A Note from the Founder */}
      <section className="section" style={{ background: 'var(--color-bg)', color: 'var(--color-ivory)', padding: '10rem 0', borderTop: '1px solid rgba(253, 251, 247, 0.05)' }}>
        <div className="container-wide">
          <div className="founder-note-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4vw', alignItems: 'center' }}>
            <div style={{ gridColumn: '2 / 6' }}>
              <div className="founder-photo-frame" style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden', borderRadius: '2px', position: 'relative', background: '#0a0a0a' }}>
                <img
                  src="/images/nishad-chatholi.jpg"
                  alt="Nishad Chatholi, Founder of IMC Weddings"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>
            <div style={{ gridColumn: '7 / 12' }}>
              <span className="subtitle-mono" style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '2.5rem' }}>A Note from the Founder</span>
              <p style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)', lineHeight: 1.7, fontFamily: 'var(--font-serif-elegant)', fontStyle: 'italic', color: 'var(--color-ivory)', opacity: 0.9, marginBottom: '2.5rem' }}>
                "I started IMC Weddings with one simple belief: every couple has a story that deserves to be remembered with beauty and honesty. For me, wedding photography is not just about creating beautiful images &mdash; it's about preserving emotions that families will cherish for generations.
                <br/><br/>
                Over the years, I've had the privilege of documenting celebrations across cultures, from the vibrant traditions of Kerala to elegant weddings in Dubai. Each journey has strengthened my passion for creating meaningful, cinematic stories that remain timeless.
                <br/><br/>
                At IMC Weddings, my team and I are committed to delivering more than photographs and films. We create an experience built on trust, creativity, and meticulous attention to detail, ensuring that your memories become a lasting legacy."
              </p>
              <span className="font-signature" style={{ fontSize: '2.2rem', display: 'block', color: 'var(--color-gold)' }}>Nishad Chatholi</span>
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-taupe)', marginTop: '0.5rem' }}>Founder &amp; Creative Director, IMC Weddings</p>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 991px) {
            .founder-note-grid {
              display: flex !important;
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 3rem !important;
            }
          }
        `}</style>
      </section>

      {/* 2.8 Featured Magazine Collection Ribbon */}
      <section className="section" style={{ background: '#0a0a0a', padding: '8rem 0', borderTop: '1px solid rgba(253,251,247,0.05)' }}>
        <div className="container-wide" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="subtitle-mono" style={{ fontSize: '0.6rem', color: 'var(--color-gold)', display: 'block', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '1rem' }}>Physical Keepsakes</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)' }}>
            Handcrafted Magazine Albums
          </h2>
          <p style={{ color: 'var(--color-taupe)', maxWidth: '550px', margin: '1rem auto 0 auto', fontSize: '0.95rem' }}>
            Printed in our Dubai studio using fine-art paper and velvet/leather covers &mdash; made to sit on coffee tables and be passed down for generations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2vw', padding: '0 5vw' }}>
          {magazineAlbums.slice(0, 3).map((album, i) => (
            <Link
              key={i}
              to={`/gallery/${album.slug}`}
              className="interactive"
              style={{
                position: 'relative',
                height: '450px',
                borderRadius: '4px',
                overflow: 'hidden',
                display: 'block',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <img src={album.img} alt={album.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '3px' }}>{album.date}</span>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--color-ivory)', fontFamily: 'var(--font-heading)', marginTop: '0.3rem' }}>{album.title}</h3>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '0.5rem', display: 'block' }}>Explore Magazine Issue &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3.5 Atelier Capabilities (Enhanced with Visual Sync) */}
      <section className="section" style={{ background: 'var(--color-bg)', color: 'var(--color-ivory)', padding: '12rem 0', borderTop: '1px solid rgba(253, 251, 247, 0.05)', position: 'relative' }}>
        <div className="container-wide">
          <div className="about-atelier-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '8vw', alignItems: 'start' }}>

            <div style={{ position: 'sticky', top: '15vh' }}>
              <span className="subtitle-mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '2.5rem' }}>What We Do</span>
              <h2 style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 0.85, fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', marginBottom: '3rem' }}>
                Services.
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
      </section>

      {/* 4. The Archive Process (Editorial Timeline) */}
      <section className="section" style={{ background: 'var(--color-ivory)', color: 'var(--color-text-dark)', padding: '10rem 0' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem' }}>
            <div style={{ gridColumn: '2 / 5' }}>
              <span className="subtitle-mono" style={{ fontSize: '0.6rem', color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '2rem', display: 'block' }}>How It Works</span>
              <h2 style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '3rem' }}>From booking to delivery.</h2>
              <p style={{ color: 'var(--color-text-muted)' }}>We take on a limited number of weddings each year so every couple gets our full attention, start to finish.</p>
            </div>

            <div className="timeline-container" style={{ gridColumn: '6 / 12' }}>
              {[
                { step: '01', title: 'First Conversation', desc: 'We start by listening — your traditions, your style, and what matters most to you and your family on the day.', img: '/images/DSC09671.jpeg' },
                { step: '02', title: 'Your Wedding Day', desc: "We stay in the background, watching for real moments. We only step in to direct when it's needed for a portrait or group shot.", img: '/images/DSC09163.jpeg' },
                { step: '03', title: 'Editing & Color', desc: 'Our team edits every photo and film in-house, choosing colors and sound that bring back the feeling of being there.', img: '/images/editing_color.jpg' },
                { step: '04', title: 'Delivery', desc: 'You get an online gallery with your full photos and films, plus a printed magazine album to keep as a family keepsake.', img: '/images/hero_knowledge.jpg' }
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
             <Fragment key={i}>
                <span className="award-item"> Fearless Photographers Top 50 </span>
                <span className="award-divider">◆</span>
                <span className="award-item"> Junebug Weddings Choice </span>
                <span className="award-divider">◆</span>
                <span className="award-item"> WPAI Winner 2025 </span>
                <span className="award-divider">◆</span>
                <span className="award-item"> MyWed Editorial Award </span>
                <span className="award-divider">◆</span>
             </Fragment>
           ))}
        </div>
      </section>

      {/* 6. Contact Tease */}
      <section className="section" style={{ textAlign: 'center', background: 'var(--color-bg)', padding: '12rem 0' }}>
         <div className="red-dot"></div>
         <span className="subtitle-mono" style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '1.5rem' }}>Get In Touch</span>
         <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '3rem' }}><SplitText className="reveal-liquid">Let's plan your wedding.</SplitText></h2>
         <Link to="/inquire" className="btn-premium-diamond interactive magnetic-btn" style={{ margin: '0 auto', display: 'inline-flex', textDecoration: 'none' }}>Book Your Wedding</Link>
      </section>

    </div>
  );
};

export default About;
