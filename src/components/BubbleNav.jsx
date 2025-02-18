import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaProjectDiagram, FaEnvelope, FaGamepad } from 'react-icons/fa';

const bubbleStyles = `
  .bubble-link {
    background: linear-gradient(
      135deg,
      rgba(210, 212, 235, 0.78) 0%,
      rgba(107, 112, 137, 0.44) 50%,
      rgba(55, 60, 78, 0.34) 100%
    );
    box-shadow: 
      0 4px 15px rgba(44, 44, 44, 0.3),
      inset 0 2px 4px rgba(255, 255, 255, 0.6);
  }
    position: relative;
    overflow: hidden;
    transform-origin: center center;
  }

  .bubble-link::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.8) 0%,
      transparent 70%
    );
    transform: rotate(-45deg);
  }

  @keyframes float {
    0%, 100% {
      transform: translate(calc(-50% + var(--x-offset)), var(--y-offset)) translateY(0);
    }
    50% {
      transform: translate(calc(-50% + var(--x-offset)), var(--y-offset)) translateY(-5px);
    }
  }
`;

const BubbleNav = ({ show }) => {
  const bubbles = [
    { id: 1, label: 'About Me', link: '/about', icon: <FaUser />, angle: -60 },
    { id: 3, label: 'Contact', link: '#contact', icon: <FaEnvelope />, angle: 0 },
    { id: 4, label: 'Game', link: '/game', icon: <FaGamepad />, angle: 60 },
  ];

  const radius = 160;

  return (
    <>
      <style>{bubbleStyles}</style>
      <div
        className={`relative w-full h-32 mt-8 transition-opacity duration-500 ${
          show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {bubbles.map((bubble) => {
          const x = Math.sin((bubble.angle * Math.PI) / 180) * radius;
          const y = Math.cos((bubble.angle * Math.PI) / 180) * (radius / 2.5);

          return (
            <Link
              key={bubble.id}
              to={bubble.link}
              className="bubble-link absolute left-1/2 top-0 w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
              style={{
                '--x-offset': `${x}px`,
                '--y-offset': `${y}px`,
                transform: `translate(calc(-50% + ${x}px), ${y}px)`,
                opacity: show ? 1 : 0,
                transition: `all 0.5s ease-out ${bubble.id * 0.1}s`,
                animation: `float 3s ease-in-out infinite`,
                animationDelay: `${bubble.id * 0.2}s`
              }}
              aria-label={bubble.label}
            >
              <span className="text-white transition-colors duration-300 relative z-10">
                {bubble.icon}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default BubbleNav;