/**
 * The Cold Case of Eleanor Ash - Detective UI
 * Manages the detective-themed user interface elements
 */

class DetectiveUI {
    constructor(gameEngine) {
        this.game = gameEngine;
        this.evidenceElements = {
            photo: document.getElementById('evidence-photo'),
            letter: document.getElementById('evidence-letter'),
            scene: document.getElementById('evidence-scene')
        };
        
        this.init();
    }
    
    init() {
        this.setupEvidenceTracker();
        this.setupHintSystem();
        console.log('Detective UI initialized');
    }
    
    setupEvidenceTracker() {
        // Initially hide all evidence items
        Object.values(this.evidenceElements).forEach(element => {
            if (element) {
                element.style.display = 'none';
            }
        });
    }
    
    updateEvidence(evidenceType) {
        const element = this.evidenceElements[evidenceType];
        if (element) {
            element.style.display = 'flex';
            element.classList.add('fade-in');
            
            // Add collection animation
            setTimeout(() => {
                element.classList.remove('fade-in');
                element.classList.add('evidence-collected');
            }, 500);
            
            // Play collection sound
            this.game.playSound('evidence_collected');
            
            console.log(`Evidence collected: ${evidenceType}`);
        }
    }
    
    resetEvidence() {
        Object.values(this.evidenceElements).forEach(element => {
            if (element) {
                element.style.display = 'none';
                element.classList.remove('fade-in', 'evidence-collected');
            }
        });
    }
    
    setupHintSystem() {
        this.hintTexts = {
            1: [
                "Look for photo fragments scattered around the room.",
                "The empty frame on the desk shows where the pieces should go.",
                "Try pushing the fragments into the frame area.",
                "Some fragments might be hidden behind other objects."
            ],
            2: [
                "The letter has been torn into strips.",
                "Look for the beginning of sentences to establish order.",
                "The light table is where you need to arrange the pieces.",
                "Read what you have so far to determine what comes next."
            ],
            3: [
                "Compare the current scene with the official crime scene photos.",
                "Look for inconsistencies in object placement.",
                "The blood evidence doesn't match the official story.",
                "Move objects to show what really happened."
            ]
        };
        
        this.currentHintIndex = 0;
    }
    
    showHint(levelNumber) {
        const hints = this.hintTexts[levelNumber];
        if (!hints || hints.length === 0) return;
        
        const hint = hints[this.currentHintIndex % hints.length];
        this.currentHintIndex++;
        
        // Show hint in narrative panel temporarily
        if (this.game.storyManager) {
            this.game.storyManager.showHint(hint);
        }
        
        // Also announce for accessibility
        this.announceHint(hint);
        
        console.log(`Hint shown: ${hint}`);
    }
    
    announceHint(hintText) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('role', 'status');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.textContent = `Hint: ${hintText}`;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    showProgressIndicator(current, total) {
        // Create or update progress indicator
        let progressElement = document.getElementById('progress-indicator');
        
        if (!progressElement) {
            progressElement = document.createElement('div');
            progressElement.id = 'progress-indicator';
            progressElement.className = 'progress-indicator';
            
            const gameUI = document.getElementById('game-ui');
            if (gameUI) {
                gameUI.appendChild(progressElement);
            }
        }
        
        progressElement.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(current / total) * 100}%"></div>
            </div>
            <div class="progress-text">${current}/${total} pieces placed</div>
        `;
    }
    
    hideProgressIndicator() {
        const progressElement = document.getElementById('progress-indicator');
        if (progressElement) {
            progressElement.remove();
        }
    }
    
    showMoveCounter(moves, pushes) {
        let counterElement = document.getElementById('move-counter');
        
        if (!counterElement) {
            counterElement = document.createElement('div');
            counterElement.id = 'move-counter';
            counterElement.className = 'move-counter';
            
            const gameUI = document.getElementById('game-ui');
            if (gameUI) {
                gameUI.appendChild(counterElement);
            }
        }
        
        counterElement.innerHTML = `
            <div class="counter-item">
                <span class="counter-label">Moves:</span>
                <span class="counter-value">${moves}</span>
            </div>
            <div class="counter-item">
                <span class="counter-label">Pushes:</span>
                <span class="counter-value">${pushes}</span>
            </div>
        `;
    }
    
    showVictoryAnimation(levelNumber) {
        // Create victory overlay
        const overlay = document.createElement('div');
        overlay.className = 'victory-overlay';
        overlay.innerHTML = `
            <div class="victory-content">
                <div class="victory-icon">🔍</div>
                <div class="victory-text">Evidence Discovered!</div>
                <div class="victory-subtext">Level ${levelNumber} Complete</div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Animate in
        setTimeout(() => {
            overlay.classList.add('show');
        }, 100);
        
        // Remove after animation
        setTimeout(() => {
            overlay.classList.add('hide');
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 500);
        }, 2000);
    }
    
    showTooltip(x, y, text) {
        // Remove existing tooltip
        this.hideTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.id = 'game-tooltip';
        tooltip.className = 'game-tooltip';
        tooltip.textContent = text;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        tooltip.style.left = `${x + 10}px`;
        tooltip.style.top = `${y - 30}px`;
        
        // Show tooltip
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 100);
    }
    
    hideTooltip() {
        const tooltip = document.getElementById('game-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
    
    updateLevelProgress(levelNumber, progress) {
        const levelInfo = document.getElementById('level-info');
        if (levelInfo) {
            // Add progress indicator to level info
            let progressBar = levelInfo.querySelector('.level-progress');
            if (!progressBar) {
                progressBar = document.createElement('div');
                progressBar.className = 'level-progress';
                levelInfo.appendChild(progressBar);
            }
            
            progressBar.innerHTML = `
                <div class="progress-bar-small">
                    <div class="progress-fill-small" style="width: ${progress * 100}%"></div>
                </div>
            `;
        }
    }
    
    // Accessibility features
    announceGameState(state) {
        const messages = {
            'puzzle_start': 'Puzzle started. Use arrow keys or WASD to move.',
            'object_pushed': 'Object pushed.',
            'correct_placement': 'Correct placement!',
            'level_complete': 'Level complete! Evidence discovered.',
            'hint_available': 'Press H for a hint.',
            'undo_available': 'Press Ctrl+Z to undo last move.'
        };
        
        const message = messages[state];
        if (message) {
            this.announceToScreenReader(message);
        }
    }
    
    announceToScreenReader(text) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.setAttribute('role', 'status');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.textContent = text;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Theme management
    applyTheme(theme) {
        const body = document.body;
        body.className = body.className.replace(/theme-\w+/g, '');
        body.classList.add(`theme-${theme}`);
    }
    
    // Responsive design helpers
    updateLayoutForScreen() {
        const gameScreen = document.getElementById('game-screen');
        const canvas = document.getElementById('game-canvas');
        
        if (window.innerWidth < 900) {
            gameScreen.classList.add('mobile-layout');
        } else {
            gameScreen.classList.remove('mobile-layout');
        }
        
        // Update canvas size
        if (this.game && this.game.setupCanvas) {
            this.game.setupCanvas();
        }
    }
    
    // Cleanup
    cleanup() {
        this.hideTooltip();
        this.hideProgressIndicator();
        
        const moveCounter = document.getElementById('move-counter');
        if (moveCounter) {
            moveCounter.remove();
        }
        
        console.log('Detective UI cleaned up');
    }
}

// Add CSS for dynamic UI elements
const uiStyles = `
.progress-indicator {
    position: absolute;
    top: 60px;
    left: 1rem;
    background: rgba(0, 0, 0, 0.8);
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid var(--noir-gray);
    color: var(--noir-cream);
    font-size: 0.9rem;
}

.progress-bar {
    width: 120px;
    height: 8px;
    background: var(--noir-dark-gray);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.25rem;
}

.progress-fill {
    height: 100%;
    background: var(--noir-amber);
    transition: width 0.3s ease;
}

.move-counter {
    position: absolute;
    top: 60px;
    right: 1rem;
    background: rgba(0, 0, 0, 0.8);
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid var(--noir-gray);
    color: var(--noir-cream);
    font-size: 0.9rem;
    display: flex;
    gap: 1rem;
}

.counter-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.counter-label {
    font-size: 0.8rem;
    color: var(--noir-light-gray);
}

.counter-value {
    font-weight: 600;
    color: var(--noir-amber);
}

.victory-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    opacity: 0;
    transition: opacity 0.5s ease;
}

.victory-overlay.show {
    opacity: 1;
}

.victory-overlay.hide {
    opacity: 0;
}

.victory-content {
    text-align: center;
    color: var(--noir-cream);
    transform: translateY(20px);
    transition: transform 0.5s ease;
}

.victory-overlay.show .victory-content {
    transform: translateY(0);
}

.victory-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.victory-text {
    font-size: 2rem;
    font-family: var(--typewriter-font);
    color: var(--noir-amber);
    margin-bottom: 0.5rem;
}

.victory-subtext {
    font-size: 1.2rem;
    color: var(--noir-light-gray);
}

.game-tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.9);
    color: var(--noir-cream);
    padding: 0.5rem;
    border-radius: 3px;
    font-size: 0.9rem;
    pointer-events: none;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.2s ease;
}

.game-tooltip.show {
    opacity: 1;
}

.evidence-collected {
    animation: evidenceCollected 0.6s ease;
}

@keyframes evidenceCollected {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); box-shadow: 0 0 20px var(--noir-amber); }
    100% { transform: scale(1); }
}

.level-progress {
    margin-top: 0.5rem;
}

.progress-bar-small {
    width: 100px;
    height: 4px;
    background: var(--noir-dark-gray);
    border-radius: 2px;
    overflow: hidden;
}

.progress-fill-small {
    height: 100%;
    background: var(--noir-amber);
    transition: width 0.3s ease;
}

@media (max-width: 900px) {
    .progress-indicator,
    .move-counter {
        position: relative;
        top: auto;
        left: auto;
        right: auto;
        margin: 0.5rem;
    }
    
    .mobile-layout .progress-indicator {
        order: 1;
    }
    
    .mobile-layout .move-counter {
        order: 2;
    }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = uiStyles;
document.head.appendChild(styleSheet);