import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Pakka Premium Custom Cursor
 * Features: Magnetic snapping, morphing states, and smooth follow.
 */
const CustomCursor = () => {
  const [cursorState, setCursorState] = useState('');
  const [cursorText, setCursorText] = useState('');
  const cursorRef = useRef(null);
  const [isVisible] = useState(() => 
    typeof window !== 'undefined' ? !window.matchMedia('(pointer: coarse)').matches : true
  );

  useEffect(() => {
    if (!isVisible) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GSAP quickTo for ultra-smooth performance
    // Custom QuickTo configuration for spring-like feel
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "expo.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "expo.out" });

    const moveCursor = (e) => {
      if (!cursorRef.current || !e.target) return;
      const { clientX: x, clientY: y } = e;
      const target = (e.target instanceof HTMLElement || e.target instanceof SVGElement) ? e.target.closest('.interactive') : null;
      
      if (target && !target.classList.contains('no-magnetic')) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Dynamic magnetic pull
        const pullX = centerX + (x - centerX) * 0.2;
        const pullY = centerY + (y - centerY) * 0.2;
        
        xTo(pullX);
        yTo(pullY);
      } else {
        xTo(x);
        yTo(y);
      }
    };

    const handleMouseOver = (e) => {
      if (!e.target || !(e.target instanceof HTMLElement || e.target instanceof SVGElement)) return;
      
      const cursorTarget = e.target.closest('[data-cursor]');
      const interactiveTarget = e.target.closest('.interactive, a, button');

      const target = cursorTarget || interactiveTarget;

      if (target) {
        let name = target.getAttribute('aria-label') || target.title || target.getAttribute('alt');
        if (!name && target.innerText) {
          const lines = target.innerText.split('\n').map(s => s.trim()).filter(s => s.length > 0);
          if (lines.length > 0) name = lines[0];
        }

        if (name && name.length > 15) {
          name = name.substring(0, 15) + '...';
        }

      if (cursorTarget) {
          const type = cursorTarget.getAttribute('data-cursor');
          setCursorState(`state-${type}`);
          
          // Try to get a meaningful label from the element
          let label = cursorTarget.getAttribute('aria-label') || cursorTarget.getAttribute('title') || cursorTarget.getAttribute('alt') || '';
          if (!label && cursorTarget.innerText) {
            const lines = cursorTarget.innerText.split('\n').map(s => s.trim()).filter(s => s.length > 0 && s.length < 30);
            if (lines.length > 0) label = lines[0];
          }
          // Trim long labels
          if (label && label.length > 12) label = label.substring(0, 12) + '…';
          
          // Fallback to type
          let fallback = '';
          if (type === 'explore') fallback = 'Explore';
          if (type === 'view') fallback = 'View';
          if (type === 'play') fallback = 'Play';
          
          setCursorText(label || fallback);
        } else {
          setCursorState('state-nav-hover');
          setCursorText('');
        }
      } else {
        setCursorState('');
        setCursorText('');
      }
    };


    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  return (
    <div ref={cursorRef} className={`custom-cursor ${cursorState}`} style={{ display: isVisible ? 'flex' : 'none' }}>
      <span className="cursor-text" style={{ opacity: cursorText ? 1 : 0 }}>{cursorText}</span>
    </div>
  );
};

export default CustomCursor;
