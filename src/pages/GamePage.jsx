import React, { useState, useEffect, useRef } from 'react';
import StaggeredElement from '../components/StaggeredElement';
import { database } from '../../firebase.js';
import { ref, push, onValue } from 'firebase/database';
import allAnimationsSprite from '../sprites/all_animations.png';



const preloadImages = (images, callback) => {
  let loadedImages = 0;
  const totalImages = Object.values(images).length;

  Object.values(images).forEach((src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedImages += 1;
      if (loadedImages === totalImages) {
        callback();
      }
    };
  });
};




const CharacterSprite = ({ animationState }) => {
    const [frame, setFrame] = useState(0);

    const FRAME_WIDTH = 64;   
    const FRAME_HEIGHT = 64;  
    const SCALE = 2;          
    const FRAMES_PER_ROW = 8; 


    const animationRows = {
        'idle': 0,
        'walk-left': 1,
        'walk-north': 2,
        'walk-right': 3,
        'walk-south': 4
    };

    const rowIndex = animationRows[animationState] || 0;

    const frameCounts = {
        'idle': 4,
        'walk-left': 8,
        'walk-north': 8,
        'walk-right': 8,
        'walk-south': 8
    };

    const totalFrames = frameCounts[animationState] || 4;

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame(prevFrame => (prevFrame + 1) % totalFrames);
        }, 200);

        return () => clearInterval(interval);
    }, [animationState, totalFrames]);

    const containerStyle = {
        width: `${FRAME_WIDTH * SCALE}px`,
        height: `${FRAME_HEIGHT * SCALE}px`,
        overflow: 'hidden',
        position: 'relative'
    };

    const spriteStyle = {
        position: 'absolute',
        width: `${FRAME_WIDTH * FRAMES_PER_ROW}px`, 
        height: `${FRAME_HEIGHT * 5}px`, 
        backgroundImage: `url(${allAnimationsSprite})`,
        imageRendering: 'pixelated',
        transform: `scale(${SCALE}) translate(-${frame * FRAME_WIDTH}px, -${rowIndex * FRAME_HEIGHT}px)`,
        transformOrigin: 'top left',
    };

    return (
        <div style={containerStyle}>
            <div style={spriteStyle} />
        </div>
    );
};

const Sign = ({ sign, playerPosition }) => {
    const [isNearby, setIsNearby] = useState(false);
    const INTERACTION_DISTANCE = 50; 
  
    useEffect(() => {
      const distance = Math.sqrt(
        Math.pow(playerPosition.x - sign.x, 2) + 
        Math.pow(playerPosition.y - sign.y, 2)
      );
      
      setIsNearby(distance < INTERACTION_DISTANCE);
    }, [playerPosition, sign.x, sign.y]);
  
    return (
      <div
        style={{
          position: 'absolute',
          left: `${sign.x}px`,
          top: `${sign.y}px`,
          transform: `translate(-50%, -50%) ${isNearby ? 'scale(1.1)' : 'scale(1)'}`,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {/* Circle container */}
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: sign.color || 'rgba(2, 2, 2, 0.6)', 
            border: '2px solid rgba(255, 255, 255, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer',
          }}
        >
        </div>
  
        {/* Message bubble */}
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: `translate(-50%, ${isNearby ? '-20px' : '0px'})`,
            background: sign.color || 'rgba(255, 255, 255, 0.9)', 
            padding: '12px 16px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            opacity: isNearby ? 1 : 0,
            visibility: isNearby ? 'visible' : 'hidden',
            transition: 'all 0.3s ease-in-out',
            whiteSpace: 'nowrap',
            maxWidth: '200px',
            fontSize: '14px',
            color: '#333',
          }}
        >
          {sign.text}
          {/* Triangle pointer */}
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: `6px solid ${sign.color || 'rgba(255, 255, 255, 0.9)'}`,
              
            }}
          />
        </div>
      </div>
    );
};
  
const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease-in-out',
  };

  const Modal = ({ isOpen, onClose, onSubmit, children }) => {
    const [selectedColor, setSelectedColor] = useState('#FF69B4'); 
    
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e, selectedColor);
    };
  
    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        zIndex: 1000,
        width: '80%',
        maxWidth: '400px',
        transition: 'all 0.3s ease-in-out',
    };
  
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
    };


    const colorOptions = [
      '#FF69B4', // Pink
      '#87CEEB', // Sky Blue
      '#98FB98', // Pale Green
      '#DDA0DD', // Plum
      '#F0E68C', // Khaki
      '#FF7F50', // Coral
      '#C0C0C0', // Silver
      
    ];

    const colorPickerStyle = {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginBottom: '20px',
    };
    

    const colorButtonStyle = (color) => ({
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: color,
      border: selectedColor === color ? '3px solid #333' : '2px solid #ddd',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      ':hover': {
        transform: 'scale(1.1)',
      }
    });

    const buttonContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '20px',
    };

    const actionButtonStyle = {
      padding: '8px 16px',
      borderRadius: '20px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.2s',
    };

    return (
        <>
            <div style={overlayStyle} onClick={onClose} />
            <div style={modalStyle}>
                <h2 style={{ 
                    textAlign: 'center', 
                    marginBottom: '20px',
                    color: '#333',
                    fontSize: '18px',
                    fontWeight: '500'
                }}>
                    Choose a color for your message!
                </h2>

                <div style={colorPickerStyle}>
                    {colorOptions.map((color) => (
                        <button
                            key={color}
                            style={colorButtonStyle(color)}
                            onClick={() => setSelectedColor(color)}
                        />
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ padding: '0 20px' }}>
                        {children}
                    </div>

                    <div style={buttonContainerStyle}>
                        <button
                            type="submit"
                            style={{
                                ...buttonStyle,
                                backgroundColor: '#4285f4',
                                color: 'white',
                            }}
                        >
                            Place Message
                        </button>
                        <button
                            type="button"
                            style={{
                                ...buttonStyle,
                                backgroundColor: '#f1f3f4',
                                color: '#333',
                            }}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

const GamePage = () => {

    const [animationState, setAnimationState] = useState('idle-down')
    const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const [facing, setFacing] = useState('down');
    const [keysPressed, setKeysPressed] = useState(new Set());
    const [signs, setSigns] = useState([]);
    const [isPlacingSign, setIsPlacingSign] = useState(false);
    const [signText, setSignText] = useState('');
    const moveSpeed = 5;
    const SPRITE_WIDTH = 64 * 2;  
    const SPRITE_HEIGHT = 64 * 2; 

  

  
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isPlacingSign) return;
        setKeysPressed(prev => new Set(prev).add(e.key));
        };

    const handleKeyUp = (e) => {
        setKeysPressed(prev => {
            const newKeys = new Set(prev);
            newKeys.delete(e.key);
            return newKeys;
        });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Game loop
const gameLoop = setInterval(() => {
    setPosition(prev => {
        let dx = 0;
        let dy = 0;
        let isMoving = false;

        if (keysPressed.has('ArrowLeft') || keysPressed.has('a')) {
            dx -= 1;
            isMoving = true;
        }
        if (keysPressed.has('ArrowRight') || keysPressed.has('d')) {
            dx += 1;
            isMoving = true;
        }
        if (keysPressed.has('ArrowUp') || keysPressed.has('w')) {
            dy -= 1;
            isMoving = true;
        }
        if (keysPressed.has('ArrowDown') || keysPressed.has('s')) {
            dy += 1;
            isMoving = true;
        }

        if (dx !== 0 && dy !== 0) {
            const length = Math.sqrt(dx * dx + dy * dy);
            dx = dx / length;
            dy = dy / length;
        }

        let newX = prev.x + dx * moveSpeed;
        let newY = prev.y + dy * moveSpeed;

        if (isMoving) {
            if (Math.abs(dx) > Math.abs(dy)) {
                setAnimationState(dx > 0 ? 'walk-right' : 'walk-left');
                setFacing(dx > 0 ? 'right' : 'left');
            } else {
                setAnimationState(dy > 0 ? 'walk-south' : 'walk-north');
                setFacing(dy > 0 ? 'down' : 'up');
            }
        } else {
            setAnimationState('idle');
        }

        newX = Math.max(SPRITE_WIDTH/2, Math.min(window.innerWidth - SPRITE_WIDTH/2, newX));
        newY = Math.max(SPRITE_HEIGHT/2, Math.min(window.innerHeight - SPRITE_HEIGHT/2, newY));

        return { x: newX, y: newY };
    });
}, 1000 / 60);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(gameLoop);
    };
  }, [keysPressed, isPlacingSign, facing]);

  useEffect(() => {
    const signsRef = ref(database, 'signs');
    
    const unsubscribe = onValue(signsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const signsList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setSigns(signsList);
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePlaceSign = async (e, selectedColor) => {
    e.preventDefault();
    if (signText.trim()) {
        const signsRef = ref(database, 'signs');
        const newSign = {
            x: position.x,
            y: position.y,
            text: signText,
            color: selectedColor,
            timestamp: Date.now(),
        };
        
        try {
            await push(signsRef, newSign);
            setSignText('');
            setIsPlacingSign(false);
        } catch (error) {
            console.error("Error placing sign:", error);
        }
    }
};

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'e' || e.key === 'E') {
                if (!isPlacingSign) {
                    e.preventDefault();
                    setIsPlacingSign(true);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isPlacingSign]); 
  



    const characterStyle = {
        position: 'absolute',
        left: `${position.x - SPRITE_WIDTH/2}px`,  
        top: `${position.y - SPRITE_HEIGHT/2}px`,  
    };



    return (
        <StaggeredElement delay={0}>
        <div className="game-container relative w-full h-screen bg-white overflow-hidden">
            {/* Character */}
            <div style={characterStyle}>
            <CharacterSprite animationState={animationState} />
            </div>

            {/* Signs */}
            {signs.map((sign) => (
                <Sign key={sign.id} 
                sign={sign} 
                playerPosition={position} 
                />
            ))}

            {/* Sign placement modal */}
            <Modal 
                isOpen={isPlacingSign} 
                onClose={() => setIsPlacingSign(false)}
                onSubmit={handlePlaceSign}
            >
                <input
                    type="text"
                    value={signText}
                    onChange={(e) => setSignText(e.target.value)}
                    placeholder="Enter sign text..."
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '10px',
                        border: '1px solid #ccc',
                        marginBottom: '10px',
                        fontSize: '16px',
                    }}
                    autoFocus
                />
            </Modal>

            {/* Controls info */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
            
            WASD /  ← ↑ ↓ → to move   •    E to place message
            </div>


        </div>
        </StaggeredElement>
    );
};

export default GamePage;

