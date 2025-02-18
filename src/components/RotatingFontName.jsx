import React, { useState, useEffect, useRef } from 'react';

const RotatingFontName = ({ onAnimationComplete }) => {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);

  const fonts = [
    'font-bodoni_moda italic font-bold',
    'font-raleway',
    'font-rowdies',
    'font-workbench',
    'font-jersey15 tracking-wide',
    'font-playwrite_australia font-bold',
    'font-EB_Garamond font-bold',
    'font-caveat',
    'font-arvo tracking-wide'
  ];

  useEffect(() => {
    if (isAnimating) {
      startTimeRef.current = performance.now();
      
      const animate = (currentTime) => {
        if (!startTimeRef.current) return;

        const elapsed = currentTime - startTimeRef.current;
        const fontChangeInterval = 120; // milliseconds between font changes
        const totalDuration = 2500; // total animation duration

        if (elapsed < totalDuration) {
          const newIndex = Math.floor(elapsed / fontChangeInterval) % fonts.length;
          setCurrentFontIndex(newIndex);
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          setCurrentFontIndex(4); // final font
          onAnimationComplete?.();
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating, onAnimationComplete]);

  return (
    <h1 
      className={`text-5xl ${fonts[currentFontIndex]} transition-all duration-300 text-black`}
      style={{ willChange: 'transform' }} 
    >
      kyuhong
    </h1>
  );
};

export default RotatingFontName;