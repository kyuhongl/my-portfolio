import React from 'react';

import headshot from '../img/headshot_updated.jpg';

import shift_picture from '../img/shift_picture.jpeg';
import multiplayer_pic from '../img/multiplayer_rendering.png';
import vr_workshop from '../img/vr_workshop.jpeg';
import sisters from '../img/sistas.jpeg';
import StaggeredElement from '../components/StaggeredElement';
import connect from '../img/connect.jpg';
import handsup from '../img/handsup.png';
import bth from '../img/bth.png';

import { useEffect, useState } from 'react';



const AboutMe = () => {
  const projects = [
    {
      title: "Realtime Multiplayer Rendering",
      description: "An implementation of multiplayer handling using Godot and Google Firebase's Realtime Database. Handles player movement, messages, and game state.",
      image: multiplayer_pic,
      link: "https://github.com/kyuhongl/godot-firebase-multiplayer",
      technologies: ["Godot", "GDScript", "Firebase"]
    },
    {
      title: "커넥션즈 (Connections)",
      description: "A Korean interpretation of the NYT game \"Connections\"",
      image: connect,
      link: "https://kyuhongl.github.io/connections-korean/",
      technologies: ["Godot", "GDScript", "Firebase"]
    },
    {
      title: "Hand Up! (WIP)",
      description: "A plugin for FL Studio and Logic that allows users to control the DAW with hand gestures; inspired by Imogen Heap's Mi.Mu gloves",
      image: handsup,
      link: "",
      technologies: ["Python", "React", "Node.js", "AWS"]
    },
    {
      title: "Beary The Hatchet",
      description: "A 2.5D visual novel game made in RPGMaker. Made by Team CETACITY. ",
      image: bth,
      link: "https://mokadevs.itch.io/beary-the-hatchet",
      technologies: ["RPGMaker", "Javascript", "MV3D"]
    }

  ];


  const personalPhotos = [
    {
      image: shift_picture,
      caption: "Me and my fellow Shifties at the annual Shift SC photoshoot!",
      layout: "square"
    },
    {
      image: vr_workshop,
      caption: "At the hands on VR workshop... I saw some things...",
      layout: "vertical"
    },
    {
      image: sisters,
      caption: "Me and my sistas",
      layout: "square"
    },
  ];1

  const PhotoSlider = () => {
    const [position, setPosition] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const triplicatedPhotos = [...personalPhotos, ...personalPhotos, ...personalPhotos];
    const photoWidth = 420;
    const totalWidth = personalPhotos.length * photoWidth;
  
    useEffect(() => {
      if (isPaused) return; 
  
      const interval = setInterval(() => {
        setPosition((prev) => {
          if (prev <= -totalWidth) {
            return -totalWidth/3;
          }
          return prev - 0.75;
        });
      }, 30);
  
      return () => clearInterval(interval);
    }, [totalWidth, isPaused]); 
  
    return (
      <div className="overflow-hidden relative w-full h-[400px]">
        <div 
          className="flex gap-4 absolute transition-transform duration-100"
          style={{ 
            transform: `translateX(${position}px)`,
            width: `${triplicatedPhotos.length * photoWidth}px`
          }}
        >
          {triplicatedPhotos.map((photo, index) => (
            <div 
              key={index}
              className={`relative flex-shrink-0 rounded-xl overflow-hidden group
                ${photo.layout === 'vertical' 
                  ? 'w-[300px] h-[400px]'
                  : 'w-[400px] h-[400px]'
                }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <img 
                src={photo.image}
                alt={photo.caption}
                className={`
                  transition-all duration-300 group-hover:scale-105
                  ${photo.layout === 'vertical'
                    ? 'w-full h-full object-cover'
                    : 'w-full h-full object-cover'
                  }
                `}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-white text-lg font-semibold">
                    {photo.caption}
                  </p>
                  {photo.date && (
                    <p className="text-white/80 text-sm mt-2">
                      {photo.date}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white text-black p-8">
      <div className="max-w-[1000px] mx-auto p-8">
        {/* Profile Header Section */}
        <StaggeredElement delay={0}>
          <div className="flex items-end gap-6 mb-8">
            <div className="w-[232px] h-[232px] flex-shrink-0">
              <img 
                src={headshot}
                alt="Profile"
                className="w-full h-full rounded-full shadow-lg object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Hey, I'm... </p>
              <h1 className="text-7xl font-bold mb-4 text-black">kyuhong!</h1>
              <div className="text-sm text-gray-600">
                {/* <span>Developer</span>
                <span className="mx-2">•</span>
                <span>Problem Solver</span>
                <span className="mx-2">•</span>
                <span></span> */}
              </div>
            </div>
          </div>
          
        </StaggeredElement>

                  {/* About Me Description Section */}
          <StaggeredElement delay={0.1}>
            <div className="mb-12 bg-white/50 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-black mb-4">About Me</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Hi there! I'm a passionate computer scientist and student at the University of Southern California, 
                  with a love for creating things- anything really, whether it's art, games, or software. I'm originally 
                  from Seattle, WA, but I'm currently based in Los Angeles, CA. 

                  Feel free to check everything out!
                </p>
                <p>
                  
                </p>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Skills & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'React', 'Node.js', 'Python', 'AWS'].map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </StaggeredElement>

        {/* Featured Photos Section */}
        <StaggeredElement delay={0.2}>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-black">Me!</h2>
          </div>
          <PhotoSlider />
        </div>
      </StaggeredElement>

        {/* Projects Section */}
        <StaggeredElement delay={0.4}>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-black">Projects</h2>

            </div>
            <div className="space-y-3">
              {projects.map((project, index) => (
                <StaggeredElement delay={0.1 * (index + 1)} key={index}>
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-md hover:bg-gray-100 group cursor-pointer"
                  >
                    <span className="text-gray-600 w-6">{index + 1}</span>
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold text-black">{project.title}</p>
                      <p className="text-sm text-gray-600">{project.description}</p>
                      <div className="flex gap-2 mt-1">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={i}
                            className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <svg 
                      className="w-6 h-6 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </StaggeredElement>
              ))}
            </div>
          </div>
        </StaggeredElement>
      </div>
    </div>
  );
};

export default AboutMe;