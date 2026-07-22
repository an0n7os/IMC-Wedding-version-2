import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { portfolioData } from '../data/portfolio';
import SplitText from '../components/SplitText';

gsap.registerPlugin(ScrollTrigger);


const Gallery = () => {
    const containerRef = useRef(null);
    const storiesWrapRef = useRef(null);
    const storiesContainerRef = useRef(null);
    const stories = portfolioData.filter(p => p.featured);

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

        // Ken Burns Parallax for images
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
        
        // Horizontal Scroll for Featured Stories
        let mm = gsap.matchMedia();
        mm.add("(min-width: 992px)", () => {
          if (storiesContainerRef.current && storiesWrapRef.current) {
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
          }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="gallery-prestige" style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '15vh' }}>
            
            <header className="section" style={{ minHeight: '30vh', display: 'flex', alignItems: 'flex-end', paddingBottom: '5vh' }}>
                <div className="container-wide">
                    <div className="red-dot"></div>
                    <Link to="/" className="interactive" data-cursor="nav-hover" style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-taupe)', position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)' }}>&larr; Back Home</Link>
                    <span className="subtitle-mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '1rem' }}>The Registry</span>
                    <h1 style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', color: 'var(--color-ivory)', lineHeight: 0.9 }}>
                        <SplitText className="reveal-liquid">Love & Architecture.</SplitText>
                    </h1>
                </div>
            </header>

            {/* Magazine Collection */}
            <section className="section" style={{ paddingTop: '10vh' }}>
                <div className="container-wide">
                    <div style={{ marginBottom: '5rem', borderBottom: '1px solid rgba(253, 251, 247, 0.1)', paddingBottom: '1.5rem', textAlign: 'center' }}>
                        <span className="subtitle-mono" style={{ fontSize: '0.6rem', color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '4px' }}>Magazine Collection</span>
                    </div>
                    
                    <div className="editorial-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4vw 2vw', alignItems: 'center' }}>
                        {[
                            {
                                id: 'sunset-archives',
                                title: <>Sunset<br/>Archives</>,
                                col: '1 / 7', height: '65vh', mt: '2vh', isFeatured: false
                            },
                            {
                                id: 'namra-arshad',
                                title: <>Namra<br/>Arshad</>,
                                col: '7 / 13', height: '80vh', mt: '8vh', isFeatured: true
                            },
                            {
                                id: 'varisha-tansih',
                                title: <>Varisha<br/>Tansih</>,
                                col: '2 / 8', height: '55vh', mt: '10vh', isFeatured: false
                            },
                            {
                                id: 'ruksar-basith',
                                title: <>Ruksar<br/>Basith</>,
                                col: '8 / 13', height: '70vh', mt: '2vh', isFeatured: false
                            },
                            {
                                id: 'hamza-balooshi',
                                title: <>Hamza<br/>Balooshi</>,
                                col: '1 / 6', height: '75vh', mt: '5vh', isFeatured: false
                            },
                            {
                                id: 'heritage-collective',
                                title: <>The Heritage<br/>Collective</>,
                                col: '6 / 12', height: '60vh', mt: '15vh', isFeatured: false
                            }
                        ].map((mag) => {
                            const portData = portfolioData.find(p => p.id === mag.id);
                            const isCenter = mag.isFeatured;
                            const resolvedImg = portData?.img || '/images/DSC08078.jpeg'; 
                            const resolvedLocationDate = portData ? `${portData.location} / ${portData.date}` : 'BANGALORE, INDIA / DECEMBER 2025';
                            const resolvedTitle = portData 
                                ? <>{portData.title.split(' ')[0]}<br/>{portData.title.split(' ').slice(1).join(' ')}</> 
                                : mag.title;
                            
                            return (
                                <Link 
                                    key={mag.id}
                                    to={`/gallery/${mag.id}`} 
                                    className="magazine-issue interactive" 
                                    data-cursor="view" 
                                    style={{ gridColumn: mag.col, marginTop: mag.mt }}
                                >
                                    <div className="magazine-img-wrap" style={{ 
                                        height: mag.height, 
                                        overflow: 'hidden', 
                                        position: 'relative', 
                                        background: 'transparent', 
                                        padding: isCenter ? '15px' : '0' 
                                    }}>
                                        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                                            <img 
                                                src={resolvedImg} 
                                                alt="Magazine Cover" 
                                                loading="lazy"
                                                decoding="async"
                                                style={{ 
                                                    width: '100%', height: '100%', objectFit: 'cover', 
                                                    opacity: isCenter ? 0.8 : 0.7, 
                                                    transition: 'transform 1.2s var(--ease-cinematic), filter 1.2s var(--ease-cinematic), opacity 1.2s ease',
                                                    willChange: 'transform',
                                                    transform: 'translateZ(0)'
                                                 }}
                                            />
                                            <div className="magazine-overlay" />
                                            <div className="magazine-content" style={isCenter ? { textAlign: 'center', inset: 'auto 2rem 3rem 2rem', alignItems: 'center' } : {}}>
                                                <span className="mag-volume" style={isCenter ? { marginBottom: '0.5rem' } : {}}>{resolvedLocationDate}</span>
                                                <h4 className="mag-title" style={{ fontSize: isCenter ? '2.5rem' : '1.8rem' }}>{resolvedTitle}</h4>
                                                <div className="mag-view-details" style={isCenter ? { justifyContent: 'center' } : {}}>
                                                    <div className="mag-line" />
                                                    <span>View Issue</span>
                                                </div>
                                            </div>
                                            <div className="mag-border" style={isCenter ? { border: 'none', boxShadow: 'inset 0 0 0 1px rgba(212, 175, 55, 0.2)' } : {}} />
                                        </div>
                                        {isCenter && (
                                            <div className="mag-outer-border" style={{ position: 'absolute', inset: 0, border: '1px solid rgba(212, 175, 55, 0.4)', pointerEvents: 'none', zIndex: 6 }}></div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <style>{`
                    .magazine-issue { position: relative; transition: transform 0.8s var(--ease-cinematic); display: block; text-decoration: none; }
                    .magazine-issue:hover { transform: translateY(-12px); }
                    .magazine-issue:hover img { opacity: 1 !important; transform: scale(1.05); filter: brightness(1.1); }\n                    \n                    .story-card .img-parallax { \n                        filter: grayscale(1); \n                        transition: filter 0.8s var(--ease-cinematic), transform 1.2s var(--ease-cinematic) !important; \n                    }\n                    .story-card:hover .img-parallax { \n                        filter: grayscale(0); \n                    }
                    
                    .magazine-overlay { 
                        position: absolute; inset: 0; 
                        background: linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 60%); 
                        z-index: 2; transition: opacity 0.6s ease;
                    }

                    .magazine-content {
                        position: absolute; bottom: 2rem; left: 2rem; right: 2rem; z-index: 5;
                        display: flex; flex-direction: column; gap: 0.5rem;
                    }

                    .mag-volume { 
                        font-size: 0.55rem; color: var(--color-gold); 
                        text-transform: uppercase; letter-spacing: 3px; 
                    }

                    .mag-title { 
                        font-family: var(--font-heading); color: var(--color-ivory); 
                        font-weight: 300; line-height: 1.1; transition: color 0.4s ease;
                    }

                    .mag-view-details { 
                        display: flex; align-items: center; gap: 0.8rem; margin-top: 1rem; 
                        opacity: 0; transform: translateY(10px); transition: all 0.5s ease;
                    }

                    .mag-line { width: 30px; height: 1px; background: var(--color-gold); }
                    .mag-view-details span { 
                        font-size: 0.6rem; color: var(--color-gold); 
                        text-transform: uppercase; letter-spacing: 3px; 
                    }

                    .mag-border {
                        position: absolute; inset: 0; 
                        border: 1px solid rgba(212, 175, 55, 0.1); 
                        pointer-events: none; transition: border-color 0.5s ease; z-index: 3;
                    }

                    .magazine-issue:hover .mag-view-details { opacity: 1 !important; transform: translateY(0) !important; }
                    .magazine-issue:hover .mag-border { border-color: rgba(212, 175, 55, 0.6) !important; }
                    .magazine-issue:hover .mag-title { color: var(--color-gold) !important; }

                    @media (max-width: 900px) {
                        .editorial-grid { display: flex !important; flex-direction: column; gap: 2rem !important; }
                        .magazine-img-wrap { height: 50vh !important; margin-top: 0 !important; }
                        .mag-title { font-size: 2.5rem !important; }
                    }
                `}</style>
            </section>

            {/* Wedding Films (Cinema Archive) */}
            <section ref={storiesWrapRef} id="wedding-films" className="section" style={{ background: 'var(--color-bg)', padding: 0, overflow: 'hidden', position: 'relative' }}>
                <div className="red-dot" style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}></div>
                <div className="container-wide" style={{ position: 'absolute', top: '4rem', left: '0', right: '0', textAlign: 'center', zIndex: 10 }}>
                   <h2 style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}><SplitText className="reveal-liquid">Stories Archive</SplitText></h2>
                   <span className="subtitle-mono" style={{ fontSize: '0.6rem', color: 'var(--color-gold)', marginTop: '0.5rem', display: 'block', textTransform: 'uppercase', letterSpacing: '4px' }}>Wedding Stories</span>
                </div>
                <div ref={storiesContainerRef} className="stories-container" style={{ display: 'flex', gap: '3rem', padding: '25vh 5vw 10vh 5vw', width: 'fit-content', willChange: 'transform' }}>
                  {stories.map(story => (
                    <Link 
                      to={`/gallery/${story.slug}`}
                      key={story.id} 
                      className="story-card interactive" 
                      style={{ width: '50vw', minWidth: '600px', height: '65vh', position: 'relative', display: 'block' }} 
                      data-cursor="view"
                    >
                      <div style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
                        <img className="img-parallax" src={story.img} alt={story.title} loading="lazy" decoding="async" style={{ width: '100%', height: '130%', objectFit: 'cover', top: '-15%', position: 'absolute' }} />
                      </div>
                      <div style={{ position: 'absolute', bottom: '-4rem', left: 0, width: '100%', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '2px', color: 'var(--color-taupe)', padding: '0 1rem', transform: 'none' }}>
                        <span style={{ color: 'var(--color-ivory)' }}>{story.title}</span>
                        <span>{story.location} &mdash; {story.mood}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="diamond-separator" style={{ marginTop: '10rem' }}></div>
            </section>

            <footer className="section" style={{ textAlign: 'center', marginTop: '5rem' }}>
                <div className="diamond-separator"></div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}><SplitText className="reveal-liquid">Every moment is a legacy.</SplitText></h2>
                <Link to="/inquire" className="btn-premium-diamond interactive magnetic-btn" style={{ margin: '0 auto', display: 'inline-flex', textDecoration: 'none' }}>Book Your History</Link>
            </footer>
        </div>
    );
};

export default Gallery;
