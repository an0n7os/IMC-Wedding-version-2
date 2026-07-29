import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'phosphor-react';

const storiesData = [
  {
    id: 'shifin-rahla',
    title: 'Shifin & Rahla',
    tag: 'MAGAZINE',
    avatar: '/images/shifin-rahla/bride-07.jpg',
    slug: 'shifin-rahla',
    slides: [
      { url: '/images/shifin-rahla/bride-07.jpg', caption: 'Red & Ivory Splendor in Kerala' },
      { url: '/images/shifin-rahla/bride-06.jpg', caption: 'Quiet Bridal Moments' },
      { url: '/images/shifin-rahla/bride-11.jpg', caption: 'Stage Moments & Garlands' },
      { url: '/images/shifin-rahla/bride-22.jpg', caption: 'Magazine Album Edition' }
    ]
  },
  {
    id: 'dilsha-adil',
    title: 'Dilsha & Adil',
    tag: 'FEATURED',
    avatar: '/images/dilsha-adil/couple-01.jpg',
    slug: 'dilsha-adil',
    slides: [
      { url: '/images/dilsha-adil/couple-01.jpg', caption: 'Golden Hour Sparklers' },
      { url: '/images/dilsha-adil/couple-07.jpg', caption: 'Grand Entry Celebration' },
      { url: '/images/dilsha-adil/couple-10.jpg', caption: 'Traditional Garlands' }
    ]
  },
  {
    id: 'shibil-shasiya',
    title: 'Shibil & Shasiya',
    tag: 'INTIMATE',
    avatar: '/images/shibil-shasiya/bride-08.jpg',
    slug: 'shibil-shasiya',
    slides: [
      { url: '/images/shibil-shasiya/bride-08.jpg', caption: 'Confetti & Joyful Glances' },
      { url: '/images/shibil-shasiya/bride-10.jpg', caption: 'Quiet Moments' },
      { url: '/images/shibil-shasiya/bride-04.jpg', caption: 'Celebration Highlights' }
    ]
  },
  {
    id: 'namra-arshad',
    title: 'Namra Arshad',
    tag: 'URBAN CHIC',
    avatar: '/images/magazine/NAMRA ARSHAD 1.jpg',
    slug: 'namra-arshad',
    slides: [
      { url: '/images/magazine/NAMRA ARSHAD 1.jpg', caption: 'Modern Urban Chic' },
      { url: '/images/magazine/NAMRA ARSHAD  2.jpg', caption: 'Bangalore Sunset' }
    ]
  },
  {
    id: 'hamza-balooshi',
    title: 'Hamza Al Balooshi',
    tag: 'ABU DHABI',
    avatar: '/images/magazine/HAMZA_A1-17.jpg',
    slug: 'hamza-balooshi',
    slides: [
      { url: '/images/magazine/HAMZA_A1-17.jpg', caption: 'Arabic Grace & Heritage' },
      { url: '/images/magazine/HAMZA_A1-48.jpg', caption: 'Abu Dhabi Grandeur' }
    ]
  }
];

const WeddingStories = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStory = activeStoryIndex !== null ? storiesData[activeStoryIndex] : null;

  const handleNextSlide = useCallback(() => {
    if (!currentStory) return;
    if (activeSlideIndex < currentStory.slides.length - 1) {
      setActiveSlideIndex(prev => prev + 1);
    } else if (activeStoryIndex < storiesData.length - 1) {
      setActiveStoryIndex(prev => prev + 1);
      setActiveSlideIndex(0);
    } else {
      setActiveStoryIndex(null);
      setActiveSlideIndex(0);
    }
  }, [currentStory, activeSlideIndex, activeStoryIndex]);

  const handlePrevSlide = useCallback(() => {
    if (!currentStory) return;
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(prev => prev - 1);
    } else if (activeStoryIndex > 0) {
      setActiveStoryIndex(prev => prev - 1);
      const prevStory = storiesData[activeStoryIndex - 1];
      setActiveSlideIndex(prevStory.slides.length - 1);
    } else {
      setActiveSlideIndex(0);
    }
  }, [currentStory, activeSlideIndex, activeStoryIndex]);

  useEffect(() => {
    if (activeStoryIndex === null || isPaused) return;

    const timer = setTimeout(() => {
      handleNextSlide();
    }, 4000);

    return () => clearTimeout(timer);
  }, [activeStoryIndex, activeSlideIndex, isPaused, handleNextSlide]);

  useEffect(() => {
    if (activeStoryIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeStoryIndex]);

  return (
    <div className="wedding-stories-section" style={{ padding: '4rem 0', background: 'var(--color-bg)', borderBottom: '1px solid rgba(253, 251, 247, 0.05)' }}>
      <div className="container-wide" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="subtitle-mono" style={{ fontSize: '0.6rem', color: 'var(--color-gold)', letterSpacing: '4px', textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem' }}>
          Live Highlights
        </span>
        <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)' }}>
          Wedding Stories
        </h3>
      </div>

      {/* Story Rings Horizontal Scroll Ribbon */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '2rem', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '0 2vw' 
        }}
      >
        {storiesData.map((story, i) => (
          <div 
            key={story.id} 
            className="story-ring-item interactive"
            onClick={() => {
              setActiveStoryIndex(i);
              setActiveSlideIndex(0);
            }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '0.8rem',
              cursor: 'pointer' 
            }}
          >
            <div 
              style={{ 
                position: 'relative', 
                width: '88px', 
                height: '88px', 
                borderRadius: '50%', 
                padding: '3px',
                background: 'linear-gradient(135deg, var(--color-gold) 0%, #ffffff 50%, var(--color-gold) 100%)',
                boxShadow: '0 8px 25px rgba(212,175,55,0.25)',
                transition: 'transform 0.4s ease'
              }}
            >
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--color-bg)' }}>
                <img 
                  src={story.avatar} 
                  alt={story.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <span 
                style={{ 
                  position: 'absolute', 
                  bottom: '-4px', 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  background: 'var(--color-gold)',
                  color: '#000',
                  fontSize: '0.45rem',
                  fontWeight: 'bold',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  whiteSpace: 'nowrap',
                  letterSpacing: '1px'
                }}
              >
                {story.tag}
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)', letterSpacing: '1px' }}>
              {story.title}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        .story-ring-item:hover div {
          transform: scale(1.08);
        }
      `}</style>

      {/* Story Viewer Fullscreen Modal */}
      <AnimatePresence>
        {activeStoryIndex !== null && currentStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(5,5,5,0.96)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => setActiveStoryIndex(null)}
          >
            {/* Story Card Mobile Format (9:16 Aspect) */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '420px',
                height: '88vh',
                maxHeight: '820px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 30px 90px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.1)',
                background: '#0a0a0a'
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Image Slide */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${activeStoryIndex}-${activeSlideIndex}`}
                  src={currentStory.slides[activeSlideIndex].url}
                  alt=""
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </AnimatePresence>

              {/* Gradient Overlays */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 20%, transparent 70%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none' }} />

              {/* Top Progress Segment Bar */}
              <div 
                style={{ 
                  position: 'absolute', 
                  top: '12px', 
                  left: '12px', 
                  right: '12px', 
                  display: 'flex', 
                  gap: '4px', 
                  zIndex: 20 
                }}
              >
                {currentStory.slides.map((_, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      flex: 1, 
                      height: '3px', 
                      background: 'rgba(255,255,255,0.3)', 
                      borderRadius: '2px', 
                      overflow: 'hidden' 
                    }}
                  >
                    <div 
                      style={{ 
                        height: '100%', 
                        background: 'var(--color-gold)', 
                        width: idx < activeSlideIndex ? '100%' : idx === activeSlideIndex ? (isPaused ? '50%' : '100%') : '0%',
                        transition: idx === activeSlideIndex && !isPaused ? 'width 4s linear' : 'none'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Story Header Info */}
              <div 
                style={{ 
                  position: 'absolute', 
                  top: '25px', 
                  left: '16px', 
                  right: '16px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  zIndex: 20 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <img 
                    src={currentStory.avatar} 
                    alt="" 
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-gold)' }} 
                  />
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 600, display: 'block' }}>{currentStory.title}</span>
                    <span style={{ fontSize: '0.55rem', color: 'var(--color-gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>IMC Weddings Story</span>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveStoryIndex(null)}
                  style={{ background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Tap Left / Right Touch Zones */}
              <div 
                onClick={handlePrevSlide}
                style={{ position: 'absolute', top: '70px', bottom: '100px', left: 0, width: '35%', zIndex: 15, cursor: 'pointer' }} 
              />
              <div 
                onClick={handleNextSlide}
                style={{ position: 'absolute', top: '70px', bottom: '100px', right: 0, width: '65%', zIndex: 15, cursor: 'pointer' }} 
              />

              {/* Bottom Caption & Action Link */}
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: '24px', 
                  left: '16px', 
                  right: '16px', 
                  zIndex: 20,
                  textAlign: 'center'
                }}
              >
                <p style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.8)', fontFamily: 'var(--font-heading)' }}>
                  {currentStory.slides[activeSlideIndex].caption}
                </p>

                <Link
                  to={`/gallery/${currentStory.slug}`}
                  onClick={() => setActiveStoryIndex(null)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.7rem 1.8rem',
                    background: 'var(--color-gold)',
                    color: '#000',
                    borderRadius: '25px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 10px 25px rgba(212,175,55,0.4)'
                  }}
                >
                  <span>View Full Album</span>
                  <ArrowUpRight size={14} weight="bold" />
                </Link>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeddingStories;
