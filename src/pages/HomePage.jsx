import React, { useState, useEffect } from 'react';
import RotatingFontName from '../components/RotatingFontName';
import BubbleNav from '../components/BubbleNav';
import StaggeredElement from '../components/StaggeredElement';

const HomePage = ({ playAnimation }) => {
  const [showBubbles, setShowBubbles] = useState(false);

  useEffect(() => {
    if (!playAnimation) {
      setShowBubbles(true);
    }
  }, [playAnimation]);

  const handleAnimationComplete = () => {
    setTimeout(() => {
      setShowBubbles(true);
    }, 1000);
  };

  return (
    <section className="bg-white h-screen flex flex-col items-center justify-center relative">
      {playAnimation ? (
        <RotatingFontName onAnimationComplete={handleAnimationComplete} />
      ) : (
        <StaggeredElement delay={0}>
          <h1 className="text-5xl tracking-wide text-black">kyuhong</h1>
        </StaggeredElement>
      )}
      
      <StaggeredElement delay={0.2}>
        <BubbleNav show={showBubbles} />
      </StaggeredElement>
    </section>
  );
};

export default HomePage;