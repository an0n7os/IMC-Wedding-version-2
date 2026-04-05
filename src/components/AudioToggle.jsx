import React, { useState, useRef, useEffect } from 'react';

const AudioToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // We create the audio element natively to avoid autoplay block warnings before user interaction
    audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-cinematic-fairy-tale-story-124.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    
    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => console.log("Audio playback was prevented."));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      onClick={toggleAudio}
      className="interactive"
      data-cursor="explore"
      style={{
        position: 'fixed',
        bottom: '2.5rem',
        right: '4vw',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-bg)',
        border: '1px solid rgba(253, 251, 247, 0.1)',
        color: 'var(--color-ivory)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.4s var(--ease-cinematic)',
        overflow: 'hidden'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        height: '15px'
      }}>
        <span style={{ fontSize: '0.45rem', textTransform: 'uppercase', letterSpacing: '2px', marginRight: '4px', fontFamily: 'var(--font-body)', opacity: 0.8 }}>Sound</span>
        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            style={{
              width: '2px',
              backgroundColor: 'var(--color-gold)',
              height: isPlaying ? '100%' : '20%',
              borderRadius: '2px',
              transition: 'height 0.3s ease',
              animation: isPlaying ? `equalizer ${0.5 + (i * 0.1)}s infinite alternate` : 'none'
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes equalizer {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}</style>
    </button>
  );
};

export default AudioToggle;
