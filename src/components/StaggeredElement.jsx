// components/StaggeredElement.jsx
import React from 'react';
import { motion } from 'framer-motion'; 

const StaggeredElement = ({ 
    children, 
    delay, 
    direction = 1,
    distance = 100,
    duration = 0.5,
    type = 'slide' 
  }) => {
    const animations = {
      slide: {
        initial: { x: distance * direction, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -distance * direction, opacity: 0 }
      },
      fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      },
      scale: {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0, opacity: 0 }
      },
      wave: {
        initial: { 
          x: distance * direction, 
          y: distance, 
          opacity: 0 
        },
        animate: { 
          x: 0, 
          y: 0, 
          opacity: 1 
        },
        exit: { 
          x: -distance * direction, 
          y: -distance, 
          opacity: 0 
        }
      }
    };
  
    const selectedAnimation = animations[type];
  
    return (
      <motion.div
        initial={selectedAnimation.initial}
        animate={selectedAnimation.animate}
        exit={selectedAnimation.exit}
        transition={{
          duration: duration,
          delay: delay,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    );
  };

export default StaggeredElement;