/**
 * The Cold Case of Eleanor Ash - Main Entry Point
 * Initializes and starts the game
 */

// Game initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('The Cold Case of Eleanor Ash - Starting...');
    
    // Initialize the game engine (already done in GameEngine.js)
    // The game engine is automatically created when the DOM loads
    
    // Preload game sounds
    if (window.game && window.game.assetManager) {
        window.game.assetManager = new AssetManager();
        window.game.assetManager.preloadGameSounds();
    }
    
    // Add global error handling
    window.addEventListener('error', (event) => {
        console.error('Game Error:', event.error);
        
        // Show user-friendly error message
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(139, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            z-index: 10000;
            font-family: 'Inter', sans-serif;
        `;
        errorDiv.innerHTML = `
            <h3>Game Error</h3>
            <p>Something went wrong. Please refresh the page to try again.</p>
            <button onclick="location.reload()" style="
                background: #ffb347;
                color: #1a1a1a;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
            ">Refresh Game</button>
        `;
        document.body.appendChild(errorDiv);
    });
    
    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Game Load Performance:', {
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                    totalTime: perfData.loadEventEnd - perfData.fetchStart
                });
            }, 0);
        });
    }
    
    // Add visibility change handling (pause/resume)
    document.addEventListener('visibilitychange', () => {
        if (window.game) {
            if (document.hidden) {
                // Game is hidden, pause if needed
                if (window.game.gameState === 'puzzle') {
                    console.log('Game paused (tab hidden)');
                }
            } else {
                // Game is visible again, resume if needed
                if (window.game.gameState === 'puzzle') {
                    console.log('Game resumed (tab visible)');
                }
            }
        }
    });
    
    // Add keyboard shortcuts info
    console.log('Keyboard Controls:');
    console.log('- Arrow Keys / WASD: Move');
    console.log('- Space/Enter: Interact');
    console.log('- H: Hint');
    console.log('- Ctrl+Z: Undo');
    console.log('- Ctrl+R: Reset Level');
    console.log('- Escape: Settings');
    console.log('- F11: Fullscreen');
    
    console.log('Game initialized successfully!');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GameEngine,
        SokobanMechanics,
        InputHandler,
        StoryManager,
        DetectiveUI,
        AssetManager,
        Level1
    };
}