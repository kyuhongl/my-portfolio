import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const homeStyle = `
  .bubble-link {
    background: linear-gradient(
      135deg,
      rgba(210, 212, 235, 0.78) 0%,
      rgba(107, 112, 137, 0.44) 50%,
      rgba(55, 60, 78, 0.34) 100%
    );
    box-shadow: 
      0 4px 15px rgba(105, 134, 198, 0.3),
      inset 0 2px 4px rgba(255, 255, 255, 0.6);
    overflow: hidden;
  }

`;

const HomeBubble = ({ onClick }) => {
  return (
    <>
      <style>{homeStyle}</style>
      <Link
        to="/"
        onClick={onClick}
        className="bubble-link rounded-full fixed bottom-4 right-4 z-50" 
      >
        <div className="rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-300">
          <FaHome className="text-white w-6 h-6" />
        </div>
      </Link>
    </>
  );
};

export default HomeBubble;