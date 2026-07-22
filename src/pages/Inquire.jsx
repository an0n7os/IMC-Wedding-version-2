import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Inquire = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({ names: '', date: '', location: '', vision: '' });
    const containerRef = useRef(null);
    const flareRef = useRef(null);

    // Scroll to top when form is submitted successfully
    useEffect(() => {
        if (isSubmitted) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [isSubmitted]);

    // Calculate progress based on filled fields
    const fields = Object.values(formData);
    const filled = fields.filter(val => val.length > 2).length;
    const formProgress = (filled / fields.length) * 100;

    useGSAP(() => {
        // Shutter Reveal Effect
        gsap.fromTo('.inquire-shutter', 
            { scaleY: 1 }, 
            { scaleY: 0, duration: 1.4, ease: "expo.inOut", transformOrigin: 'top' }
        );

        // Subtle Optical Flare Movement
        if (flareRef.current) {
            gsap.to(flareRef.current, {
                x: '10%',
                y: '5%',
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }, { scope: containerRef });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsSubmitted(true);
        }, 2200);
    };

    return (
        <div ref={containerRef} className="inquire-page-dedicated" style={{ 
            background: 'var(--color-bg)', minHeight: '100vh', position: 'relative', overflow: 'hidden', 
            display: 'flex', color: 'var(--color-ivory)' 
        }}>
            {/* Shutter Overlay */}
            <div className="inquire-shutter" style={{ 
                position: 'fixed', inset: 0, background: 'var(--color-gold)', zIndex: 10000 
            }}></div>

            {/* LEFT PANE: Cinematic Visualizer */}
            <div className="inquire-visual-pane d-none-mobile" style={{ 
                width: '50%', height: '100vh', position: 'fixed', top: 0, left: 0, 
                borderRight: '1px solid rgba(212,175,55,0.1)', overflow: 'hidden', zIndex: 5 
            }}>
                <img 
                    src="/images/DSC09779.jpeg" 
                    alt="Archive" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35) contrast(1.1) grayscale(0.4)' }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 70%, var(--color-bg) 100%)' }}></div>
                
                {/* Technical Metadata Overlay */}
                <div style={{ position: 'absolute', bottom: '4rem', left: '4rem', zIndex: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <span style={{ fontSize: '0.6rem', letterSpacing: '5px', color: 'var(--color-gold)', opacity: 0.8, textTransform: 'uppercase' }}>IMC ARCHIVE // COLLECTION 26</span>
                        <span style={{ fontSize: '1rem', fontFamily: 'var(--font-heading)', letterSpacing: '3px', opacity: 0.4, textTransform: 'uppercase' }}>Availability: Worldwide</span>
                    </div>
                </div>

                {/* Vertical Gauge Integration */}
                <div style={{ position: 'absolute', right: '3rem', top: '50%', transform: 'translateY(-50%)', width: '1px', height: '200px', background: 'rgba(212,175,55,0.1)' }}>
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${formProgress}%` }}
                        style={{ width: '100%', background: 'var(--color-gold)', boxShadow: '0 0 15px rgba(212,175,55,0.5)' }}
                    />
                </div>
            </div>

            {/* RIGHT PANE: Narrative Form */}
            <div className="inquire-form-pane" style={{ 
                width: '50%', marginLeft: '50%', minHeight: '100vh', 
                display: 'flex', flexDirection: 'column', padding: '12vh 6vw', position: 'relative', zIndex: 6 
            }}>
                <div className="portal-header" style={{ marginBottom: '8rem' }}>
                    <span className="subtitle-mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '8px', color: 'var(--color-gold)', display: 'block', marginBottom: '2.5rem', opacity: 0.8 }}>Sovereign Inquiry</span>
                    <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: 0.9, fontFamily: 'var(--font-heading)', fontWeight: 400, letterSpacing: '-0.02em' }}>
                        Start Your <br/><span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-gold)' }}>Archive.</span>
                    </h1>
                </div>

                <div className="narrative-wrap" style={{ position: 'relative' }}>
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.div
                                key="form-container"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            >
                                <form onSubmit={handleSubmit} data-lenis-prevent style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)', lineHeight: 2.2, fontFamily: 'var(--font-serif-elegant)', color: 'rgba(252, 250, 248, 0.9)', textAlign: 'left' }}>
                                    Dear IMC, our names are{" "}
                                    <input 
                                        className="inquire-input editorial-input"
                                        placeholder="protagonists"
                                        value={formData.names}
                                        required
                                        onChange={(e) => setFormData({...formData, names: e.target.value})}
                                        style={{ width: 'clamp(200px, 15vw, 300px)' }}
                                    />
                                    , and we dream of a celebration on{" "}
                                    <input 
                                        className="inquire-input editorial-input"
                                        placeholder="date"
                                        value={formData.date}
                                        required
                                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                                        style={{ width: 'clamp(150px, 10vw, 200px)' }}
                                    />
                                    {" "}at{" "}
                                    <input 
                                        className="inquire-input editorial-input"
                                        placeholder="location"
                                        value={formData.location}
                                        required
                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                        style={{ width: 'clamp(180px, 12vw, 250px)' }}
                                    />
                                    . Our cinematic vision for our wedding archive is one that captures{" "}
                                    <input 
                                        className="inquire-input editorial-input"
                                        placeholder="your vision"
                                        value={formData.vision}
                                        required
                                        onChange={(e) => setFormData({...formData, vision: e.target.value})}
                                        style={{ width: 'clamp(300px, 30vw, 500px)' }}
                                    />
                                    . We are ready to begin this journey with your studio.
                                    
                                    <div style={{ marginTop: '9rem', display: 'flex', alignItems: 'center', gap: '3.5rem' }}>
                                        <div style={{ position: 'relative' }}>
                                            <AnimatePresence>
                                                {isProcessing && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
                                                    >
                                                        <div className="spinner-gold" style={{ width: '25px', height: '25px' }} />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <button 
                                                type="submit"
                                                disabled={isProcessing}
                                                className="monogram-seal-btn interactive magnetic-btn"
                                                style={{ opacity: isProcessing ? 0.3 : 1 }}
                                            >
                                                <div className="monogram-inner">IMC</div>
                                            </button>
                                        </div>
                                        
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                            <span style={{ fontSize: '0.65rem', letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 500 }}>Sign to Commission</span>
                                            <span style={{ fontSize: '0.5rem', opacity: 0.3, letterSpacing: '2px', textTransform: 'uppercase' }}>Limited slots available for 2026</span>
                                        </div>
                                    </div>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="success-portal"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                                style={{ textAlign: 'left', paddingTop: '4vh' }}
                            >
                                <div style={{ width: '50px', height: '1px', background: 'var(--color-gold)', marginBottom: '3rem' }}></div>
                                <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', marginBottom: '2.5rem', lineHeight: 1.1, fontWeight: 300 }}>Vision<br/><span style={{ fontStyle: 'italic' }}>Archived.</span></h2>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: '480px', lineHeight: 2, fontWeight: 300 }}>
                                    Your narrative has been entrusted to our studio. We will review your vision and reach out within 24 hours to begin the creative dialogue.
                                </p>
                                <Link to="/" className="interactive" style={{ marginTop: '7rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', color: 'var(--color-gold)', fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
                                    Return to Studio Archive
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style>{`
                .editorial-input {
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid rgba(252, 250, 248, 0.15);
                    font-family: inherit;
                    font-size: 0.8em;
                    color: var(--color-gold);
                    text-align: center;
                    outline: none;
                    transition: all 0.6s var(--ease-cinematic);
                    padding: 0 10px;
                }
                .editorial-input:focus {
                    border-bottom: 1px solid var(--color-gold);
                    color: var(--color-ivory);
                    text-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
                }
                .editorial-input::placeholder {
                    color: rgba(252, 250, 248, 0.1);
                    font-style: italic;
                    font-size: 0.7em;
                    letter-spacing: 1px;
                }
                
                .monogram-seal-btn {
                    width: 100px;
                    height: 100px;
                    border: none;
                    background: transparent;
                    position: relative;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                }
                .monogram-inner {
                    width: 100%;
                    height: 100%;
                    border: 1px solid var(--color-gold);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: var(--font-heading);
                    font-size: 1.2rem;
                    color: var(--color-gold);
                    letter-spacing: 2px;
                    transition: all 0.6s var(--ease-cinematic);
                    background: rgba(212,175,55,0.02);
                }
                .monogram-seal-btn:hover .monogram-inner {
                    background: var(--color-gold);
                    color: var(--color-bg);
                    box-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
                    transform: scale(1.05);
                }
                .monogram-seal-btn:active .monogram-inner {
                    transform: scale(0.95);
                }

                .spinner-gold {
                    border: 2px solid rgba(212,175,55,0.1);
                    border-top: 2px solid var(--color-gold);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

                @media (max-width: 991px) {
                    .inquire-form-pane { width: 100% !important; marginLeft: 0 !important; padding: 15vh 8vw !important; }
                    .d-none-mobile { display: none !important; }
                    .editorial-input { width: 100% !important; margin: 1rem 0; text-align: left; }
                }
            `}</style>
        </div>
    );
};

export default Inquire;
