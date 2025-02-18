import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomeBubble from './components/HomeBubble';
import HomePage from './pages/HomePage';
import AboutMe from './pages/AboutMe';
import GamePage from './pages/GamePage';


const MainContent = () => {
  const [playAnimation, setPlayAnimation] = useState(true);
  const location = useLocation();

  const handleHomeClick = () => {
    setPlayAnimation(false);
  };

  return (
    <div>
      {location.pathname !== '/' && <HomeBubble onClick={handleHomeClick} />}
      <div className="content-container">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage playAnimation={playAnimation} />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
};

export default App;