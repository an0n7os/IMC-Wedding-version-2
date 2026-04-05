import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Magnetic component wrapper that adds a smooth "attraction" effect to its children
 * as the cursor approaches. Uses high-performance GSAP quickTo for buttery smoothness.
 */
const Magnetic = ({ children, strength = 0.5 }) => {
    const magneticRef = useRef(null);

    useEffect(() => {
        const el = magneticRef.current;
        if (!el) return;

        const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = el.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            
            // Apply strength factor to the movement
            xTo(x * strength);
            yTo(y * strength);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={magneticRef} style={{ display: 'inline-block' }}>
            {children}
        </div>
    );
};

export default Magnetic;
