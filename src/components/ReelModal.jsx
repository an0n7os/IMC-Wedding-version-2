import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'phosphor-react';

const ReelModal = ({ isOpen, onClose, reelUrl }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Extract YouTube video ID from various URL formats
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(reelUrl);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&color=white&modestbranding=1`
    : reelUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            backgroundColor: 'rgba(10, 10, 10, 0.97)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'none',
              border: '1px solid rgba(253, 251, 247, 0.2)',
              color: 'var(--color-ivory)',
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'none',
              zIndex: 1,
              transition: 'border-color 0.3s ease',
            }}
            className="interactive"
          >
            <X size={20} />
          </motion.button>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              position: 'absolute',
              top: '2.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.55rem',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
            }}
          >
            IMC WEDDINGS — SHOWREEL
          </motion.p>

          {/* Video Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '80vw',
              maxWidth: '1200px',
              aspectRatio: '16 / 9',
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 30px 100px rgba(0,0,0,0.8)',
            }}
          >
            <iframe
              src={embedUrl}
              title="IMC Weddings Showreel"
              allow="autoPlay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReelModal;
