import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ setLoading }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return Math.min(prev + Math.random() * 3 + 1, 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, [setLoading]);

  const clampedPercent = Math.min(percent, 100);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-ivory)',
        overflow: 'hidden',
      }}
    >
      {/* Cinematic vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', zIndex: 1 }}>

        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <img
            src="/images/new logo png.png"
            alt="IMC Weddings"
            style={{ width: '120px', height: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.55rem',
            letterSpacing: '8px',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
            opacity: 0.8,
          }}>
            Cinematic Wedding Films & Photography
          </p>
        </motion.div>

        {/* Progress Track */}
        <div style={{ width: '200px', position: 'relative' }}>
          <div style={{
            width: '100%',
            height: '1px',
            background: 'rgba(253, 251, 247, 0.1)',
          }} />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '1px',
              background: 'linear-gradient(90deg, var(--color-gold), #fff8dc)',
              boxShadow: '0 0 8px rgba(201, 168, 76, 0.6)',
              width: `${clampedPercent}%`,
              transition: 'width 0.1s linear',
            }}
          />
        </div>

        {/* Counter */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.6 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--color-ivory)',
          }}
        >
          {Math.floor(clampedPercent).toString().padStart(3, '0')}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Preloader;
