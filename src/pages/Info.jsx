import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { knowledgeBase, testimonials } from '../data/portfolio';
import SplitText from '../components/SplitText';

gsap.registerPlugin(ScrollTrigger);




const Info = () => {
    const containerRef = useRef(null);
    const [activeFaq, setActiveFaq] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({ names: '', date: '', location: '', vision: '' });

    useGSAP(() => {
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

        // Testimonial Carousel Sequence
        const tSlides = gsap.utils.toArray('.testimonial-slide');
        if (tSlides.length > 0) {
          let cur = 0;
          const playTestimonial = (index) => {
            const slide = tSlides[index];
            const words = slide.querySelectorAll(`.word-${index}`);
            const author = slide.querySelector('.testimonial-author');
            
            gsap.set(slide, { opacity: 1, y: 0 });
            
            const tl = gsap.timeline();
            tl.fromTo(words, 
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power2.out' }
            )
            .fromTo(author,
              { opacity: 0 },
              { opacity: 1, duration: 1 },
              "-=0.5"
            )
            .to({}, { duration: 4 })
            .to(slide, { opacity: 0, y: -20, duration: 1, ease: 'power2.in' })
            .call(() => {
              cur = (cur + 1) % tSlides.length;
              playTestimonial(cur);
            });
          };
          playTestimonial(0);
        }
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="info-prestige" style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '15vh' }}>
            
            <header className="section hero-knowledge" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden', marginTop: '-15vh' }}>
                <div className="hero-bg-wrap" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img src="/images/hero_knowledge.png" alt="" style={{ width: '100%', height: '120%', objectFit: 'cover', opacity: 0.35 }} className="img-parallax" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-bg) 0%, transparent 60%, rgba(0,0,0,0.6) 100%)' }}></div>
                </div>
                
                <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="red-dot" style={{ margin: '0 auto 2rem' }}></div>
                    <span className="subtitle-mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '2rem' }}>Knowledge</span>
                    <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', color: 'var(--color-ivory)', lineHeight: 1 }}>
                        <SplitText className="reveal-liquid">The Guide.</SplitText>
                    </h1>
                </div>
            </header>

            <section className="section faq-editorial-section" style={{ paddingBottom: '10rem' }}>
                <div className="container-wide">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8vw', alignItems: 'start' }}>
                        <div className="faq-list-wrap">
                            <div style={{ padding: '2rem 0', borderTop: '1px solid rgba(212, 175, 55, 0.2)', marginBottom: '4rem' }}>
                               <span className="subtitle-mono" style={{ fontSize: '0.6rem', color: 'var(--color-gold)', letterSpacing: '4px' }}>Protocol // Index</span>
                            </div>
                            {knowledgeBase.map((item, index) => (
                                <div key={index} className="faq-item" style={{ borderBottom: '1px solid rgba(253, 251, 247, 0.08)', overflow: 'hidden' }}>
                                    <button 
                                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                        style={{ 
                                            width: '100%', padding: '2.5rem 0', background: 'transparent', border: 'none', 
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left'
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'baseline' }}>
                                           <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', opacity: 0.6 }}>0{index + 1}</span>
                                           <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', fontWeight: 300 }}>{item.q}</h3>
                                        </div>
                                        <span style={{ 
                                            fontSize: '1.5rem', transform: activeFaq === index ? 'rotate(45deg)' : 'rotate(0)', 
                                            transition: 'transform 0.4s var(--ease-cinematic)', color: 'var(--color-gold)'
                                        }}>+</span>
                                    </button>
                                    <AnimatePresence>
                                        {activeFaq === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                                            >
                                                <div style={{ paddingBottom: '3rem', paddingLeft: '4rem', maxWidth: '700px' }}>
                                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>{item.a}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        <div className="faq-visual-side" style={{ position: 'sticky', top: '15vh', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div className="editorial-frame" style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden', borderRadius: '2px', position: 'relative' }}>
                                <img src="/images/faq_editorial.png" alt="" style={{ width: '100%', height: '120%', objectFit: 'cover' }} className="img-parallax" />
                                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(10px)', padding: '1rem 2rem', borderLeft: '2px solid var(--color-gold)' }}>
                                    <span className="subtitle-mono" style={{ fontSize: '0.5rem', color: 'var(--color-gold)', letterSpacing: '4px' }}>EST. 2016 // ARCHIVE_01</span>
                                </div>
                            </div>
                            <div style={{ padding: '0 2rem', opacity: 0.6 }}>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.6, textTransform: 'uppercase', letterSpacing: '2px' }}>
                                    "Our knowledge base is a curated collection of standard protocols and creative philosophies developed over a decade of archive history."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials with Visual Voice */}
            <section className="section testimonial-section" style={{ background: '#0a0a0a', padding: '15rem 0', borderTop: '1px solid rgba(253, 251, 247, 0.05)', position: 'relative', overflow: 'hidden' }}>
                <div className="testimonial-bg-visual" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img src="/images/testimonial_bg.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, filter: 'grayscale(1) brightness(0.5)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(10,10,10,0.9) 80%)' }}></div>
                </div>

                <div className="container-wide" style={{ textAlign: 'center', maxWidth: '1000px', position: 'relative', zIndex: 2, minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', top: '-2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '3px' }}>
                       {[...Array(8)].map((_, i) => (
                          <motion.div key={i} animate={{ height: [4, 12, 6, 20, 8] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }} style={{ width: '2px', background: 'var(--color-gold)', opacity: 0.3 }} />
                       ))}
                    </div>
                    {testimonials.map((t, index) => (
                        <div key={index} className="testimonial-slide" style={{ position: 'absolute', width: '100%', opacity: 0 }}>
                            <h3 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 2.8rem)', lineHeight: 1.2, fontFamily: 'var(--font-serif-elegant)', fontWeight: 300, marginBottom: '3rem', color: 'var(--color-ivory)' }}>
                                {t.quote.split(' ').map((word, i) => (
                                    <span key={i} className={`word-${index}`} style={{ display: 'inline-block', marginRight: '0.35em' }}>{word}</span>
                                ))}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="testimonial-author">
                                <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)' }}>Archive Record // {t.name}</span>
                                <div style={{ width: '30px', height: '1px', background: 'var(--color-gold)', margin: '0 auto', opacity: 0.5 }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="diamond-separator"></div>

            {/* ═══ CONCIERGE CONNECTION ═══ */}
            <section className="section concierge-cta" style={{ background: 'var(--color-bg)', padding: '12rem 0', textAlign: 'center', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}>
                <div className="container-wide" style={{ maxWidth: '800px' }}>
                    <span className="subtitle-mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '8px', color: 'var(--color-gold)', display: 'block', marginBottom: '3rem', opacity: 0.8 }}>Limited Availability</span>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1, fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', marginBottom: '4rem', fontWeight: 300 }}>
                        Every story is a <br/><span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-gold)' }}>Limited Edition.</span>
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 2, marginBottom: '6rem', maxWidth: '600px', margin: '0 auto 6rem auto' }}>
                        To maintain the integrity of our craft, we only accept a select number of commissions annually. We invite you to share your vision through our dedicated concierge portal.
                    </p>
                    <Link 
                        to="/inquire" 
                        className="btn-premium-diamond interactive magnetic-btn" 
                        style={{ margin: '0 auto', display: 'inline-flex' }}
                    >
                        Begin Your Inquiry
                    </Link>
                </div>
                
                <div className="diamond-separator" style={{ marginTop: '10rem' }}></div>
            </section>
        </div>
    );
};

import { Link } from 'react-router-dom';
export default Info;
