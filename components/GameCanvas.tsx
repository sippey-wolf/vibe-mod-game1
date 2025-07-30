'use client';

import { useEffect, useRef, useState } from 'react';

// Import our existing game engine classes
declare global {
  interface Window {
    GameEngine: any;
    SokobanMechanics: any;
    InputHandler: any;
    StoryManager: any;
    DetectiveUI: any;
    AssetManager: any;
    Level1: any;
  }
}

interface GameCanvasProps {
  currentLevel: number;
  onLevelComplete: (levelNumber: number) => void;
  onShowSettings: () => void;
}

export default function GameCanvas({ currentLevel, onLevelComplete, onShowSettings }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameEngineRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [moveCount, setMoveCount] = useState(0);
  const [pushCount, setPushCount] = useState(0);

  useEffect(() => {
    // Load game engine scripts
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadGameEngine = async () => {
      try {
        // Load all game engine scripts in order
        await loadScript('/src/engine/AssetManager.js');
        await loadScript('/src/engine/SokobanMechanics.js');
        await loadScript('/src/engine/InputHandler.js');
        await loadScript('/src/narrative/StoryManager.js');
        await loadScript('/src/ui/DetectiveUI.js');
        await loadScript('/src/levels/Level1.js');
        await loadScript('/src/engine/GameEngine.js');
        
        // Wait a bit for classes to be available
        setTimeout(() => {
          initializeGame();
        }, 100);
      } catch (error) {
        console.error('Failed to load game engine:', error);
        setIsLoading(false);
      }
    };

    const initializeGame = () => {
      if (!canvasRef.current) {
        console.error('Canvas not available');
        return;
      }

      // Create a simple placeholder game for now
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        console.error('Could not get canvas context');
        return;
      }

      // Set up canvas
      canvas.width = 800;
      canvas.height = 600;

      // Simple placeholder game
      const drawPlaceholderGame = () => {
        // Clear canvas
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, 800, 600);

        // Draw grid
        ctx.strokeStyle = '#4a4a4a';
        ctx.lineWidth = 1;
        
        const cellSize = 80;
        const gridWidth = 5;
        const gridHeight = 5;
        const offsetX = (800 - (gridWidth * cellSize)) / 2;
        const offsetY = (600 - (gridHeight * cellSize)) / 2;

        // Draw grid lines
        for (let x = 0; x <= gridWidth; x++) {
          ctx.beginPath();
          ctx.moveTo(offsetX + x * cellSize, offsetY);
          ctx.lineTo(offsetX + x * cellSize, offsetY + gridHeight * cellSize);
          ctx.stroke();
        }
        
        for (let y = 0; y <= gridHeight; y++) {
          ctx.beginPath();
          ctx.moveTo(offsetX, offsetY + y * cellSize);
          ctx.lineTo(offsetX + gridWidth * cellSize, offsetY + y * cellSize);
          ctx.stroke();
        }

        // Draw photo frame target area
        ctx.fillStyle = 'rgba(255, 179, 71, 0.2)';
        ctx.strokeStyle = '#ffb347';
        ctx.lineWidth = 2;
        ctx.fillRect(offsetX + 3 * cellSize + 2, offsetY + 1 * cellSize + 2, 2 * cellSize - 4, 3 * cellSize - 4);
        ctx.strokeRect(offsetX + 3 * cellSize + 2, offsetY + 1 * cellSize + 2, 2 * cellSize - 4, 3 * cellSize - 4);

        // Draw photo fragments
        const fragments = [
          { x: 2, y: 0, label: 'A' },
          { x: 0, y: 1, label: 'B' },
          { x: 4, y: 2, label: 'C' },
          { x: 1, y: 4, label: 'D' },
          { x: 4, y: 3, label: 'E' }
        ];

        fragments.forEach(fragment => {
          const x = offsetX + fragment.x * cellSize;
          const y = offsetY + fragment.y * cellSize;
          
          // Fragment background
          ctx.fillStyle = '#f5f5dc';
          ctx.fillRect(x + 8, y + 8, cellSize - 16, cellSize - 16);
          
          // Fragment border (torn effect)
          ctx.strokeStyle = '#d3d3d3';
          ctx.lineWidth = 2;
          ctx.setLineDash([3, 2]);
          ctx.strokeRect(x + 8, y + 8, cellSize - 16, cellSize - 16);
          ctx.setLineDash([]);
          
          // Fragment label
          ctx.fillStyle = '#2d2d2d';
          ctx.font = '16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(fragment.label, x + cellSize / 2, y + cellSize / 2 + 6);
        });

        // Draw player (detective)
        const playerX = offsetX + 2 * cellSize;
        const playerY = offsetY + 2 * cellSize;
        
        ctx.fillStyle = '#f5f5dc';
        ctx.fillRect(playerX + 8, playerY + 8, cellSize - 16, cellSize - 16);
        
        // Detective hat
        ctx.fillStyle = '#2d2d2d';
        ctx.fillRect(playerX + 12, playerY + 8, cellSize - 24, 16);
        
        // Magnifying glass
        ctx.strokeStyle = '#ffb347';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(playerX + cellSize - 16, playerY + cellSize - 16, 8, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(playerX + cellSize - 8, playerY + cellSize - 8);
        ctx.lineTo(playerX + cellSize - 4, playerY + cellSize - 4);
        ctx.stroke();

        // Instructions
        ctx.fillStyle = '#8a8a8a';
        ctx.font = '16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Use WASD or Arrow Keys to move the detective', 400, 50);
        ctx.fillText('Push photo fragments into the frame to reconstruct the evidence', 400, 70);
        ctx.fillText('(This is a placeholder - full game engine loading...)', 400, 550);
      };

      drawPlaceholderGame();
      setIsLoading(false);

      // Simple keyboard handling for placeholder
      const handleKeyDown = (event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
          event.preventDefault();
          console.log(`Movement key pressed: ${key}`);
          // Placeholder feedback
          drawPlaceholderGame();
          ctx.fillStyle = '#ffb347';
          ctx.font = '20px Inter';
          ctx.textAlign = 'center';
          ctx.fillText(`Pressed: ${key.toUpperCase()}`, 400, 30);
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      // Cleanup function
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    };

    loadGameEngine();
  }, [currentLevel, onLevelComplete, onShowSettings]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '800px',
        height: '600px',
        background: '#1a1a1a',
        border: '2px solid #ffb347',
        borderRadius: '8px',
        color: '#f5f5dc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #4a4a4a',
            borderTop: '4px solid #ffb347',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ fontFamily: 'Special Elite, monospace' }}>Loading Investigation...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          border: '2px solid #ffb347',
          borderRadius: '8px',
          background: '#1a1a1a',
          cursor: 'default'
        }}
        width={800}
        height={600}
      />
      
      {/* Game UI Overlay */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        right: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        pointerEvents: 'none'
      }}>
        {/* Level Info */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          border: '1px solid #4a4a4a',
          pointerEvents: 'auto'
        }}>
          <span style={{ color: '#ffb347', fontWeight: '600', marginRight: '1rem' }}>
            Level {currentLevel}
          </span>
          <span style={{ color: '#8a8a8a', fontStyle: 'italic' }}>
            {currentLevel === 1 && "The Torn Photograph"}
            {currentLevel === 2 && "The Shredded Letter"}
            {currentLevel === 3 && "Crime Scene Reenactment"}
          </span>
        </div>
        
        {/* Game Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', pointerEvents: 'auto' }}>
          <button
            onClick={() => console.log('Hint clicked')}
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#f5f5dc',
              border: '1px solid #4a4a4a',
              padding: '0.5rem 0.75rem',
              borderRadius: '3px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#2d2d2d';
              e.currentTarget.style.borderColor = '#ffb347';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
              e.currentTarget.style.borderColor = '#4a4a4a';
            }}
          >
            💡 Hint
          </button>
          <button
            onClick={() => console.log('Reset clicked')}
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#f5f5dc',
              border: '1px solid #4a4a4a',
              padding: '0.5rem 0.75rem',
              borderRadius: '3px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#2d2d2d';
              e.currentTarget.style.borderColor = '#ffb347';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
              e.currentTarget.style.borderColor = '#4a4a4a';
            }}
          >
            🔄 Reset
          </button>
          <button
            onClick={onShowSettings}
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#f5f5dc',
              border: '1px solid #4a4a4a',
              padding: '0.5rem 0.75rem',
              borderRadius: '3px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#2d2d2d';
              e.currentTarget.style.borderColor = '#ffb347';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
              e.currentTarget.style.borderColor = '#4a4a4a';
            }}
          >
            ⚙️ Settings
          </button>
        </div>
      </div>
      
      {/* Move Counter */}
      {(moveCount > 0 || pushCount > 0) && (
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          border: '1px solid #4a4a4a'
        }}>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#8a8a8a' }}>Moves</div>
              <div style={{ color: '#ffb347', fontWeight: '600' }}>{moveCount}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#8a8a8a' }}>Pushes</div>
              <div style={{ color: '#ffb347', fontWeight: '600' }}>{pushCount}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add CSS for spinner animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}