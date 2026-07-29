import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { reelsData, siteMeta } from '../data/portfolio';
import SplitText from '../components/SplitText';
import WeddingStories from '../components/WeddingStories';
import { Play, X } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const filmItems = [
    {
        id: 'shifin-rahla',
        title: 'Shifin & Rahla',
        location: 'Kerala, India',
        mood: 'ROYAL RED & IVORY',
        heroImg: '/images/shifin-rahla/bride-07.jpg',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-in-a-park-42642-large.mp4',
        year: '2025',
        category: 'Documentary Feature'
    },
    {
        id: 'dilsha-adil',
        title: 'Dilsha & Adil',
        location: 'Malappuram',
        mood: 'SPARKLER EVENING',
        heroImg: '/images/dilsha-adil/couple-01.jpg',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-having-a-romantic-moment-42641-large.mp4',
        year: '2025',
        category: 'High-Energy Teaser'
    },
    {
        id: 'shibil-shasiya',
        title: 'Shibil & Shasiya',
        location: 'Kozhikode',
        mood: 'JOYFUL & CONFETTI',
        heroImg: '/images/shibil-shasiya/bride-08.jpg',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-hand-in-hand-42643-large.mp4',
        year: '2025',
        category: 'Intimate Ceremony'
    },
    {
        id: 'namra-arshad',
        title: 'Namra Arshad',
        location: 'Bangalore',
        mood: 'URBAN CHIC',
        heroImg: '/images/magazine/NAMRA ARSHAD 1.jpg',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-in-a-park-42642-large.mp4',
        year: '2024',
        category: 'Editorial Story'
    },
    {
        id: 'hamza-balooshi',
        title: 'Hamza Al Balooshi',
        location: 'Abu Dhabi, UAE',
        mood: 'ARABIC HERITAGE',
        heroImg: '/images/magazine/HAMZA_A1-17.jpg',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-having-a-romantic-moment-42641-large.mp4',
        year: '2024',
        category: 'International Cinema'
    }
];

const stillsData = [
    { id: 1, title: 'Garland Ceremony', tag: 'KERALA', url: '/images/shifin-rahla/bride-11.jpg' },
    { id: 2, title: 'Golden Hour Embrace', tag: 'DESTINATION', url: '/images/dilsha-adil/couple-01.jpg' },
    { id: 3, title: 'Bridal Portrait', tag: 'STUDIO', url: '/images/shibil-shasiya/bride-08.jpg' },
    { id: 4, title: 'Stage Confetti', tag: 'CELEBRATION', url: '/images/magazine/NAMRA ARSHAD 1.jpg' },
    { id: 5, title: 'Royal Heritage Entry', tag: 'DUBAI', url: '/images/magazine/HAMZA_A1-17.jpg' }
];

const Films = () => {
    const containerRef = useRef(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

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

        const images = gsap.utils.toArray('.img-parallax');
        images.forEach((img) => {
            gsap.to(img, {
                yPercent: 15,
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
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="films-prestige" style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '15vh' }}>
            
            {/* Header Section */}
            <section className="section" style={{ minHeight: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div className="hero-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img 
                        src="/images/shifin-rahla/bride-07.jpg" 
                        alt="" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, filter: 'grayscale(0.3) brightness(0.6)', willChange: 'transform', animation: 'filmsHeroZoom 20s ease-out infinite alternate' }} 
                    />
                    <style>{`
                        @keyframes filmsHeroZoom {
                            from { transform: scale(1); }
                            to { transform: scale(1.08); }
                        }
                    `}</style>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-bg) 0%, transparent 60%, rgba(10,10,10,0.8) 100%)' }}></div>
                </div>
                
                <div className="hero-content" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <div className="red-dot" style={{ margin: '0 auto 1.5rem' }}></div>
                    <span className="subtitle-mono" style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>
                      SINCE {siteMeta.foundedYear} &bull; KERALA &amp; DUBAI
                    </span>
                    <h1 style={{ fontSize: 'clamp(4rem, 13vw, 10rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', lineHeight: 0.88, marginBottom: '1.5rem' }}>
                        <SplitText className="reveal-liquid">Stories.</SplitText>
                    </h1>
                    <p style={{ fontSize: '1rem', color: 'var(--color-taupe)', maxWidth: '550px', margin: '0 auto 2rem auto', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 300 }}>
                      Documentary wedding films &amp; candid visual narratives crafted with soul.
                    </p>
                </div>

                <div className="vertical-archive-text" style={{ position: 'absolute', right: '5vw', top: '50%', transform: 'translateY(-50%) rotate(90deg)', fontSize: '10rem', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', opacity: 0.03, pointerEvents: 'none', letterSpacing: '2rem', whiteSpace: 'nowrap' }}>
                    FILMS
                </div>
            </section>

            {/* Interactive Live Instagram-Style Wedding Stories */}
            <WeddingStories />

            {/* Main Film Showcase Grid */}
            <section className="section" style={{ padding: '10vh 0' }}>
                <div className="container-wide">
                    <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                      <span className="subtitle-mono" style={{ fontSize: '0.6rem', color: 'var(--color-gold)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'block' }}>
                        Featured Films
                      </span>
                      <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)' }}>
                        Cinematic Documentaries
                      </h2>
                    </div>

                    {filmItems.map((film, index) => {
                        const isEven = index % 2 === 0;
                        const isThird = (index + 1) % 3 === 0;
                        
                        let alignSelf = 'flex-start';
                        let width = '72%';
                        
                        if (!isEven) { 
                            alignSelf = 'flex-end'; 
                            width = '62%';
                        }
                        if (isThird) {
                            alignSelf = 'center';
                            width = '100%';
                        }

                        return (
                            <div 
                                key={film.id} 
                                className="film-row interactive group" 
                                style={{ 
                                    marginBottom: '20vh', 
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignSelf: alignSelf,
                                    width: width,
                                    marginLeft: alignSelf === 'flex-end' ? 'auto' : '0',
                                    marginRight: alignSelf === 'flex-start' ? 'auto' : '0'
                                }} 
                                onClick={() => setSelectedVideo(film)}
                            >
                                {/* Editorial Numbering */}
                                <div className="editorial-num" style={{ 
                                    position: 'absolute', 
                                    left: isEven ? '-4vw' : 'auto', 
                                    right: isEven ? 'auto' : '-4vw', 
                                    top: '-4rem', 
                                    fontSize: '15rem', 
                                    fontFamily: 'var(--font-heading)', 
                                    color: 'var(--color-gold)', 
                                    opacity: 0.04, 
                                    pointerEvents: 'none', 
                                    zIndex: 0 
                                }}>
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                <div className="film-card-wrap" style={{ 
                                    width: '100%', 
                                    aspectRatio: isThird ? '21/9' : '16/9', 
                                    overflow: 'hidden', 
                                    position: 'relative', 
                                    marginBottom: '2.5rem', 
                                    transition: 'all 0.8s var(--ease-cinematic)', 
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                    border: '1px solid rgba(255,255,255,0.08)'
                                }}>
                                    <img 
                                        className="img-parallax" 
                                        src={film.heroImg} 
                                        alt={film.title} 
                                        style={{ 
                                            width: '100%', 
                                            height: '140%', 
                                            objectFit: 'cover', 
                                            position: 'absolute', 
                                            top: '-20%',
                                            transition: 'transform 1.2s var(--ease-cinematic), filter 1.2s var(--ease-cinematic)',
                                            willChange: 'transform'
                                        }} 
                                    />
                                    
                                    {/* Cinematic Letterbox Mask */}
                                    <div className="letterbox-top" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5%', background: 'var(--color-bg)', zIndex: 5 }}></div>
                                    <div className="letterbox-bottom" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '5%', background: 'var(--color-bg)', zIndex: 5 }}></div>

                                    {/* Inner Film Graphics */}
                                    <div style={{ position: 'absolute', top: '2.5rem', left: '2.5rem', color: 'var(--color-gold)', fontSize: '0.6rem', letterSpacing: '4px', zIndex: 10, opacity: 0.85 }}>
                                       {film.year} // {film.category.toUpperCase()}
                                    </div>

                                    <div className="film-hover-overlay" style={{ 
                                        position: 'absolute', 
                                        inset: 0, 
                                        background: 'rgba(10, 10, 10, 0.45)', 
                                        opacity: 0, 
                                        transition: 'opacity 0.6s var(--ease-cinematic)',
                                        zIndex: 1
                                    }}></div>
                                    
                                    <div className="play-btn-circle" style={{ 
                                        position: 'absolute', 
                                        top: '50%', 
                                        left: '50%', 
                                        transform: 'translate(-50%, -50%) scale(0.9)', 
                                        width: '120px', 
                                        height: '120px', 
                                        borderRadius: '50%', 
                                        border: '1px solid rgba(212, 175, 55, 0.6)', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        background: 'rgba(10, 10, 10, 0.6)', 
                                        backdropFilter: 'blur(20px)',
                                        zIndex: 6,
                                        transition: 'all 0.6s var(--ease-cinematic)',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
                                    }}>
                                        <Play size={32} weight="fill" color="var(--color-gold)" style={{ marginLeft: '4px' }} />
                                    </div>
                                </div>

                                <div className="story-meta-wrap" style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'flex-start', 
                                    padding: '0 1rem',
                                    maxWidth: isThird ? '900px' : '100%',
                                    margin: isThird ? '0 auto' : '0'
                                }}>
                                    <div>
                                        <span style={{ fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'block' }}>{film.mood}</span>
                                        <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', lineHeight: 1, fontWeight: 300, transition: 'color 0.4s ease' }}>{film.title}</h3>
                                    </div>
                                    <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                                        <span className="subtitle-mono" style={{ color: 'var(--color-taupe)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '0.4rem' }}>{film.location}</span>
                                        <Link to={`/gallery/${film.id}`} onClick={(e) => e.stopPropagation()} style={{ fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '2px', textDecoration: 'none', textTransform: 'uppercase' }}>
                                          Explore Album &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )})}
                </div>
            </section>

            {/* Vertical Narratives (Reels) */}
            <section className="section" style={{ padding: '0 0 15vh 0' }}>
                <div className="container-wide">
                    <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
                         <span className="subtitle-mono" style={{ fontSize: '0.6rem', color: 'var(--color-gold)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>Social Highlights</span>
                         <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)' }}>Vertical Narratives.</h2>
                    </div>
                    
                    <div className="reels-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        {reelsData.map((reel) => (
                            <div key={reel.id} className="reel-card interactive group" style={{ position: 'relative' }}>
                                <div className="reel-video-wrap" style={{ width: '100%', aspectRatio: '9/16', overflow: 'hidden', position: 'relative', borderRadius: '4px', background: '#111' }}>
                                    <img 
                                        src={reel.thumbnail} 
                                        alt={reel.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.6s ease' }} 
                                        className="reel-thumb"
                                    />
                                    <video 
                                        src={reel.video} 
                                        loop muted playsInline 
                                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 0.6s ease' }}
                                        className="reel-video"
                                        onMouseEnter={(e) => { e.target.play(); e.target.style.opacity = 1; }}
                                        onMouseLeave={(e) => { e.target.pause(); e.target.style.opacity = 0; }}
                                    />
                                    <div className="reel-badge" style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.5rem', color: 'var(--color-gold)', border: '1px solid currentColor', padding: '0.2rem 0.6rem', borderRadius: '20px', zIndex: 10, opacity: 0.8 }}>REEL</div>
                                </div>
                                <div style={{ marginTop: '1.5rem', padding: '0 0.5rem' }}>
                                    <span className="subtitle-mono" style={{ fontSize: '0.55rem', color: 'var(--color-gold)', letterSpacing: '2px', display: 'block', marginBottom: '0.4rem' }}>{reel.style} // {reel.client}</span>
                                    <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', fontWeight: 300 }}>{reel.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cinema Stills (Anamorphic Filmstrip) */}
            <section className="section" style={{ padding: '15vh 0' }}>
                <div className="container-wide">
                    <div style={{ marginBottom: '6rem', textAlign: 'left' }}>
                         <span className="subtitle-mono" style={{ fontSize: '0.6rem', color: 'var(--color-gold)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>Frozen Moments</span>
                         <h2 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', lineHeight: 1 }}>Cinema Stills.</h2>
                         <span style={{ fontSize: '0.6rem', color: 'var(--color-taupe)', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '1.5rem', display: 'block', opacity: 0.7 }}>Scroll sideways to browse the strip</span>
                    </div>
                </div>

                <div className="stills-filmstrip" data-lenis-prevent style={{ display: 'flex', gap: '4rem', padding: '0 5vw', overflowX: 'auto' }}>
                    {stillsData.map((still, index) => (
                        <div key={still.id} className="still-frame interactive" style={{ position: 'relative', width: 'min(70vw, 900px)', flexShrink: 0, paddingTop: '2rem' }}>
                            <div style={{ position: 'absolute', top: '-2rem', left: '0', fontSize: '0.55rem', color: 'var(--color-taupe)', opacity: 0.5, letterSpacing: '2px' }}>
                                FRM_{index + 1240} // {still.tag}
                            </div>
                            <div style={{ width: '100%', aspectRatio: '2.35/1', overflow: 'hidden', borderRadius: '4px', background: '#0a0a0a', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <img 
                                    src={still.url} 
                                    alt={still.title} 
                                    className="still-img-parallax"
                                    style={{ width: '110%', height: '110%', objectFit: 'cover', opacity: 0.85, transition: 'transform 0.8s ease' }} 
                                />
                            </div>
                            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.65rem', color: 'var(--color-ivory)', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '2px' }}>{still.title}</span>
                                <span style={{ fontSize: '0.55rem', color: 'var(--color-gold)', opacity: 0.8 }}>2.35:1 ANAMORPHIC</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Video Trailer Modal */}
            {selectedVideo && (
              <div 
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 99999,
                  background: 'rgba(0,0,0,0.95)',
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem'
                }}
                onClick={() => setSelectedVideo(null)}
              >
                <button
                  onClick={() => setSelectedVideo(null)}
                  style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#fff',
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={24} />
                </button>

                <div style={{ width: '100%', maxWidth: '1000px', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 30px 90px rgba(0,0,0,0.9)' }} onClick={(e) => e.stopPropagation()}>
                  <video src={selectedVideo.videoUrl} controls autoPlay style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            )}

            <style>{`
                .film-row:hover .film-hover-overlay { opacity: 1 !important; }
                .film-row:hover .play-btn-circle { transform: translate(-50%, -50%) scale(1.1) !important; background: rgba(212, 175, 55, 0.2) !important; border-color: var(--color-gold) !important; }
                .film-row:hover img { transform: scale(1.05) translateZ(0) !important; filter: brightness(1.1) !important; }
                .film-row:hover h3 { color: var(--color-gold) !important; }
                
                .still-frame:hover .still-img-parallax { transform: scale(1.03) !important; opacity: 1 !important; }

                @media (max-width: 900px) {
                    .reels-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    .still-frame { width: 85vw !important; }
                }
            `}</style>

            <footer className="section" style={{ textAlign: 'center', marginTop: '5rem' }}>
                <div className="diamond-separator"></div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}><SplitText className="reveal-liquid">Sound, Light, Emotion.</SplitText></h2>
                <Link to="/inquire" className="btn-premium-diamond interactive magnetic-btn" style={{ margin: '0 auto', display: 'inline-flex', textDecoration: 'none' }}>Book Your Wedding</Link>
            </footer>
        </div>
    );
};

export default Films;
