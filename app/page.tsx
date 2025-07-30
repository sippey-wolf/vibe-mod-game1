'use client'

import { useState } from 'react'

export default function Home() {
  const [gameState, setGameState] = useState<'title' | 'game' | 'final'>('title')

  if (gameState === 'title') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-amber-50">
        <div className="text-center max-w-4xl px-8">
          <h1 className="text-6xl font-bold text-amber-400 mb-8" style={{ fontFamily: 'Special Elite, monospace' }}>
            The Cold Case of Eleanor Ash
          </h1>
          
          <div className="bg-black/70 rounded-lg p-8 mb-8 border border-gray-600">
            <div className="text-xl leading-relaxed text-gray-300 space-y-4">
              <p>Twelve years ago, Eleanor Ash was found dead in her apartment.</p>
              <p>The official cause: suicide.</p>
              <p>You were a rookie then—barely on the case, quickly reassigned.</p>
              <p>Last week, an envelope arrived. No return address.</p>
              <p>Inside: a photo fragment, and a single line in shaky ink:</p>
              <p className="text-amber-400 font-semibold italic text-2xl">
                "You missed something."
              </p>
              <p>Now you're back where it all started.</p>
            </div>
          </div>
          
          <button
            onClick={() => setGameState('game')}
            className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-amber-50 border-2 border-amber-400 hover:border-amber-50 px-8 py-4 text-xl font-bold rounded transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-400/30"
            style={{ fontFamily: 'Special Elite, monospace', letterSpacing: '1px' }}
          >
            BEGIN INVESTIGATION
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'game') {
    return (
      <div className="min-h-screen bg-gray-900 text-amber-50">
        <div className="grid grid-cols-12 gap-4 p-4 h-screen">
          {/* Narrative Panel */}
          <div className="col-span-3 bg-black/80 border border-gray-600 rounded-lg p-6">
            <h3 className="text-amber-400 text-lg font-bold mb-4 border-b border-gray-600 pb-2" style={{ fontFamily: 'Special Elite, monospace' }}>
              Case File
            </h3>
            <div className="text-gray-300 leading-relaxed space-y-3">
              <p>The apartment's been untouched since the investigation.</p>
              <p>Eleanor's belongings are boxed and stacked like an afterthought.</p>
              <p>On the desk: a broken frame, glass missing.</p>
              <p>You recognize the photo. Or part of it.</p>
              <p>It's time to put the pieces together.</p>
            </div>
          </div>
          
          {/* Game Canvas */}
          <div className="col-span-6 flex items-center justify-center">
            <div className="bg-gray-800 border-2 border-amber-400 rounded-lg p-4">
              <canvas 
                width={800} 
                height={600} 
                className="bg-gray-900 rounded"
                ref={(canvas) => {
                  if (canvas) {
                    const ctx = canvas.getContext('2d')
                    if (ctx) {
                      // Clear canvas
                      ctx.fillStyle = '#1a1a1a'
                      ctx.fillRect(0, 0, 800, 600)
                      
                      // Draw grid
                      ctx.strokeStyle = '#4a4a4a'
                      ctx.lineWidth = 1
                      
                      const cellSize = 80
                      const gridWidth = 5
                      const gridHeight = 5
                      const offsetX = (800 - (gridWidth * cellSize)) / 2
                      const offsetY = (600 - (gridHeight * cellSize)) / 2
                      
                      // Draw grid lines
                      for (let x = 0; x <= gridWidth; x++) {
                        ctx.beginPath()
                        ctx.moveTo(offsetX + x * cellSize, offsetY)
                        ctx.lineTo(offsetX + x * cellSize, offsetY + gridHeight * cellSize)
                        ctx.stroke()
                      }
                      
                      for (let y = 0; y <= gridHeight; y++) {
                        ctx.beginPath()
                        ctx.moveTo(offsetX, offsetY + y * cellSize)
                        ctx.lineTo(offsetX + gridWidth * cellSize, offsetY + y * cellSize)
                        ctx.stroke()
                      }
                      
                      // Draw photo frame target area
                      ctx.fillStyle = 'rgba(255, 179, 71, 0.2)'
                      ctx.strokeStyle = '#ffb347'
                      ctx.lineWidth = 2
                      ctx.fillRect(offsetX + 3 * cellSize + 2, offsetY + 1 * cellSize + 2, 2 * cellSize - 4, 3 * cellSize - 4)
                      ctx.strokeRect(offsetX + 3 * cellSize + 2, offsetY + 1 * cellSize + 2, 2 * cellSize - 4, 3 * cellSize - 4)
                      
                      // Instructions
                      ctx.fillStyle = '#8a8a8a'
                      ctx.font = '16px Inter'
                      ctx.textAlign = 'center'
                      ctx.fillText('Level 1: The Torn Photograph', 400, 50)
                      ctx.fillText('Push photo fragments into the frame to reconstruct evidence', 400, 70)
                      ctx.fillText('Use WASD or Arrow Keys to move', 400, 550)
                    }
                  }
                }}
              />
            </div>
          </div>
          
          {/* Evidence Panel */}
          <div className="col-span-3 bg-black/80 border border-gray-600 rounded-lg p-6">
            <h3 className="text-amber-400 text-lg font-bold mb-4 border-b border-gray-600 pb-2" style={{ fontFamily: 'Special Elite, monospace' }}>
              Evidence Collected
            </h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 rounded border border-gray-600 bg-gray-800/30 opacity-50">
                <div className="text-2xl mr-3">📷</div>
                <div className="text-amber-50 font-medium">Reconstructed Photo</div>
              </div>
              <div className="flex items-center p-3 rounded border border-gray-600 bg-gray-800/30 opacity-50">
                <div className="text-2xl mr-3">✉️</div>
                <div className="text-amber-50 font-medium">Threatening Letter</div>
              </div>
              <div className="flex items-center p-3 rounded border border-gray-600 bg-gray-800/30 opacity-50">
                <div className="text-2xl mr-3">🔍</div>
                <div className="text-amber-50 font-medium">Crime Scene Truth</div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-600 text-center">
              <p className="text-sm text-gray-400 italic">Begin collecting evidence...</p>
            </div>
          </div>
        </div>
        
        {/* Back button for testing */}
        <div className="fixed bottom-4 left-4">
          <button
            onClick={() => setGameState('title')}
            className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded transition-colors"
          >
            Back to Title
          </button>
        </div>
      </div>
    )
  }

  return <div>Final screen placeholder</div>
}
