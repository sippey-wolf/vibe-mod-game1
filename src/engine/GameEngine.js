/**
 * The Cold Case of Eleanor Ash - Game Engine
 * Core game state management and rendering system
 */

class GameEngine {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameState = 'title'; // title, narrative, puzzle, transition, complete
        this.currentLevel = 1;
        this.isRunning = false;
        this.lastFrameTime = 0;
        
        // Game components
        this.inputHandler = null;
        this.storyManager = null;
        this.currentLevelInstance = null;
        this.ui = null;
        
        // Settings
        this.settings = {
            highContrast: false,
            reducedMotion: false,
            volume: 0.5
        };
        
        // Evidence tracking
        this.evidence = {
            photo: false,
            letter: false,
            scene: false
        };
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.loadSettings();
        this.bindEvents();
        console.log('Game Engine initialized');
    }
    
    setupCanvas() {
        // Set up high DPI canvas
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        
        // Set canvas display size
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }
    
    loadSettings() {
        const saved = localStorage.getItem('eleanor-ash-settings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
            this.applySettings();
        }
    }
    
    saveSettings() {
        localStorage.setItem('eleanor-ash-settings', JSON.stringify(this.settings));
    }
    
    applySettings() {
        const body = document.body;
        body.classList.toggle('high-contrast', this.settings.highContrast);
        body.classList.toggle('reduced-motion', this.settings.reducedMotion);
        
        // Update UI elements
        document.getElementById('high-contrast').checked = this.settings.highContrast;
        document.getElementById('reduced-motion').checked = this.settings.reducedMotion;
        document.getElementById('volume-slider').value = this.settings.volume * 100;
    }
    
    bindEvents() {
        // Title screen
        document.getElementById('begin-investigation').addEventListener('click', () => {
            this.startGame();
        });
        
        // Settings
        document.getElementById('settings-button').addEventListener('click', () => {
            this.showSettings();
        });
        
        document.getElementById('close-settings').addEventListener('click', () => {
            this.hideSettings();
        });
        
        // Settings controls
        document.getElementById('high-contrast').addEventListener('change', (e) => {
            this.settings.highContrast = e.target.checked;
            this.applySettings();
            this.saveSettings();
        });
        
        document.getElementById('reduced-motion').addEventListener('change', (e) => {
            this.settings.reducedMotion = e.target.checked;
            this.applySettings();
            this.saveSettings();
        });
        
        document.getElementById('volume-slider').addEventListener('input', (e) => {
            this.settings.volume = e.target.value / 100;
            this.saveSettings();
        });
        
        // Game controls
        document.getElementById('hint-button').addEventListener('click', () => {
            this.showHint();
        });
        
        document.getElementById('reset-button').addEventListener('click', () => {
            this.resetLevel();
        });
        
        // Continue buttons
        document.getElementById('continue-button').addEventListener('click', () => {
            this.continueFromNarrative();
        });
        
        document.getElementById('continue-investigation').addEventListener('click', () => {
            this.continueToNextLevel();
        });
        
        // Final screen
        document.getElementById('end-game').addEventListener('click', () => {
            this.endGame();
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.setupCanvas();
        });
    }
    
    startGame() {
        this.switchScreen('title', 'game');
        this.gameState = 'narrative';
        this.currentLevel = 1;
        
        // Initialize game components
        this.inputHandler = new InputHandler(this);
        this.storyManager = new StoryManager(this);
        this.ui = new DetectiveUI(this);
        
        // Start Level 1 narrative
        this.storyManager.showLevelIntro(1);
    }
    
    continueFromNarrative() {
        this.gameState = 'puzzle';
        this.hideNarrative();
        this.loadLevel(this.currentLevel);
        this.startGameLoop();
    }
    
    loadLevel(levelNumber) {
        // Clean up previous level
        if (this.currentLevelInstance) {
            this.currentLevelInstance.cleanup();
        }
        
        // Load new level
        switch (levelNumber) {
            case 1:
                this.currentLevelInstance = new Level1(this);
                break;
            case 2:
                // this.currentLevelInstance = new Level2(this);
                console.log('Level 2 not implemented yet');
                break;
            case 3:
                // this.currentLevelInstance = new Level3(this);
                console.log('Level 3 not implemented yet');
                break;
            default:
                console.error('Invalid level number:', levelNumber);
                return;
        }
        
        this.updateLevelUI(levelNumber);
        console.log(`Loaded Level ${levelNumber}`);
    }
    
    updateLevelUI(levelNumber) {
        const levelTitles = {
            1: 'The Torn Photograph',
            2: 'The Shredded Letter',
            3: 'Crime Scene Reenactment'
        };
        
        document.getElementById('current-level').textContent = `Level ${levelNumber}`;
        document.getElementById('level-title').textContent = levelTitles[levelNumber];
    }
    
    startGameLoop() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.gameLoop();
    }
    
    stopGameLoop() {
        this.isRunning = false;
    }
    
    gameLoop(currentTime = 0) {
        if (!this.isRunning) return;
        
        const deltaTime = currentTime - this.lastFrameTime;
        this.lastFrameTime = currentTime;
        
        // Update
        this.update(deltaTime);
        
        // Render
        this.render();
        
        // Continue loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    update(deltaTime) {
        if (this.gameState === 'puzzle' && this.currentLevelInstance) {
            this.currentLevelInstance.update(deltaTime);
        }
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Render current level
        if (this.gameState === 'puzzle' && this.currentLevelInstance) {
            this.currentLevelInstance.render(this.ctx);
        }
    }
    
    onLevelComplete(levelNumber) {
        this.stopGameLoop();
        this.gameState = 'transition';
        
        // Mark evidence as collected
        const evidenceTypes = { 1: 'photo', 2: 'letter', 3: 'scene' };
        this.evidence[evidenceTypes[levelNumber]] = true;
        this.ui.updateEvidence(evidenceTypes[levelNumber]);
        
        // Show victory modal
        this.showVictoryModal(levelNumber);
    }
    
    showVictoryModal(levelNumber) {
        const modal = document.getElementById('victory-modal');
        const title = document.getElementById('victory-title');
        const content = document.getElementById('victory-content');
        
        const victories = {
            1: {
                title: 'Photo Reconstructed',
                content: 'You stare at the full photo.<br><br>Eleanor, smiling.<br><br>Beside her, a man—mid-30s, confident, arm around her shoulders. He wasn\'t in the report. Wasn\'t in any of the case files.<br><br>Why tear him out?'
            },
            2: {
                title: 'Letter Assembled',
                content: '"If you come near me again, I\'ll go to the police. You don\'t control me anymore. I\'m done being afraid of you."<br><br>Signed: E.<br><br>You flip the envelope. One initial in pencil: D.<br><br>Someone she feared. Someone she warned.'
            },
            3: {
                title: 'Truth Revealed',
                content: 'The bloodstain was never by the bed.<br><br>The chair was knocked over near the door—not the window.<br><br>The outline—wrong angle, wrong posture.<br><br>Someone moved her. Someone staged this.<br><br>And someone closed the file before anyone could ask why.'
            }
        };
        
        title.textContent = victories[levelNumber].title;
        content.innerHTML = victories[levelNumber].content;
        modal.style.display = 'flex';
    }
    
    continueToNextLevel() {
        document.getElementById('victory-modal').style.display = 'none';
        
        if (this.currentLevel < 3) {
            this.currentLevel++;
            this.gameState = 'narrative';
            this.storyManager.showLevelIntro(this.currentLevel);
        } else {
            // All levels complete - show final screen
            this.showFinalScreen();
        }
    }
    
    showFinalScreen() {
        this.switchScreen('game', 'final');
        this.gameState = 'complete';
    }
    
    switchScreen(fromScreen, toScreen) {
        const from = document.getElementById(`${fromScreen}-screen`);
        const to = document.getElementById(`${toScreen}-screen`);
        
        if (from) {
            from.classList.remove('active');
        }
        
        if (to) {
            to.classList.add('active');
        }
    }
    
    showNarrative() {
        document.getElementById('narrative-panel').style.display = 'flex';
    }
    
    hideNarrative() {
        document.getElementById('narrative-panel').style.display = 'none';
    }
    
    showSettings() {
        document.getElementById('settings-modal').style.display = 'flex';
    }
    
    hideSettings() {
        document.getElementById('settings-modal').style.display = 'none';
    }
    
    showHint() {
        if (this.currentLevelInstance && this.currentLevelInstance.showHint) {
            this.currentLevelInstance.showHint();
        }
    }
    
    resetLevel() {
        if (this.currentLevelInstance && this.currentLevelInstance.reset) {
            this.currentLevelInstance.reset();
        }
    }
    
    endGame() {
        // Reset game state
        this.gameState = 'title';
        this.currentLevel = 1;
        this.evidence = { photo: false, letter: false, scene: false };
        
        // Reset UI
        this.ui.resetEvidence();
        
        // Return to title screen
        this.switchScreen('final', 'title');
        
        console.log('Game ended, returned to title screen');
    }
    
    // Utility methods
    getCanvasMousePos(event) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    
    playSound(soundName) {
        // Placeholder for sound system
        if (this.settings.volume > 0) {
            console.log(`Playing sound: ${soundName} at volume ${this.settings.volume}`);
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new GameEngine();
});