/**
 * The Cold Case of Eleanor Ash - Input Handler
 * Manages keyboard, mouse, and touch input for the game
 */

class InputHandler {
    constructor(gameEngine) {
        this.game = gameEngine;
        this.keys = {};
        this.mousePos = { x: 0, y: 0 };
        this.isMouseDown = false;
        this.touchStartPos = null;
        
        // Input settings
        this.keyRepeatDelay = 200; // ms
        this.keyRepeatRate = 100; // ms
        this.lastKeyTime = {};
        
        this.bindEvents();
    }
    
    bindEvents() {
        const canvas = this.game.canvas;
        
        // Keyboard events
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));
        
        // Mouse events
        canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
        canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Touch events for mobile
        canvas.addEventListener('touchstart', (e) => this.onTouchStart(e));
        canvas.addEventListener('touchend', (e) => this.onTouchEnd(e));
        canvas.addEventListener('touchmove', (e) => this.onTouchMove(e));
        
        // Prevent default touch behaviors
        canvas.addEventListener('touchstart', (e) => e.preventDefault());
        canvas.addEventListener('touchmove', (e) => e.preventDefault());
        
        console.log('Input handler initialized');
    }
    
    onKeyDown(event) {
        const key = event.key.toLowerCase();
        const currentTime = Date.now();
        
        // Handle key repeat
        if (this.keys[key]) {
            if (currentTime - this.lastKeyTime[key] < this.keyRepeatRate) {
                return;
            }
        } else {
            this.keys[key] = true;
            this.lastKeyTime[key] = currentTime;
        }
        
        // Process game input
        if (this.game.gameState === 'puzzle') {
            this.handlePuzzleInput(key);
        }
        
        // Global shortcuts
        this.handleGlobalInput(key, event);
    }
    
    onKeyUp(event) {
        const key = event.key.toLowerCase();
        this.keys[key] = false;
        delete this.lastKeyTime[key];
    }
    
    handlePuzzleInput(key) {
        if (!this.game.currentLevelInstance) return;
        
        // Movement keys
        const movements = {
            'arrowup': 'up',
            'w': 'up',
            'arrowdown': 'down',
            's': 'down',
            'arrowleft': 'left',
            'a': 'left',
            'arrowright': 'right',
            'd': 'right'
        };
        
        if (movements[key]) {
            this.game.currentLevelInstance.handleMovement(movements[key]);
        }
        
        // Action keys
        switch (key) {
            case ' ':
            case 'enter':
                this.game.currentLevelInstance.handleAction();
                break;
            case 'z':
                if (this.keys['control'] || this.keys['meta']) {
                    this.game.currentLevelInstance.undo();
                }
                break;
            case 'r':
                if (this.keys['control'] || this.keys['meta']) {
                    this.game.resetLevel();
                }
                break;
            case 'h':
                this.game.showHint();
                break;
        }
    }
    
    handleGlobalInput(key, event) {
        switch (key) {
            case 'escape':
                if (this.game.gameState === 'puzzle') {
                    this.game.showSettings();
                }
                break;
            case 'f11':
                event.preventDefault();
                this.toggleFullscreen();
                break;
            case 'm':
                if (this.keys['control'] || this.keys['meta']) {
                    this.toggleMute();
                }
                break;
        }
    }
    
    onMouseDown(event) {
        this.isMouseDown = true;
        this.mousePos = this.game.getCanvasMousePos(event);
        
        if (this.game.gameState === 'puzzle' && this.game.currentLevelInstance) {
            this.game.currentLevelInstance.handleClick(this.mousePos.x, this.mousePos.y);
        }
    }
    
    onMouseUp(event) {
        this.isMouseDown = false;
        this.mousePos = this.game.getCanvasMousePos(event);
        
        if (this.game.gameState === 'puzzle' && this.game.currentLevelInstance) {
            this.game.currentLevelInstance.handleMouseUp(this.mousePos.x, this.mousePos.y);
        }
    }
    
    onMouseMove(event) {
        this.mousePos = this.game.getCanvasMousePos(event);
        
        if (this.game.gameState === 'puzzle' && this.game.currentLevelInstance) {
            this.game.currentLevelInstance.handleMouseMove(this.mousePos.x, this.mousePos.y);
        }
        
        // Update cursor based on what's under mouse
        this.updateCursor();
    }
    
    onTouchStart(event) {
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            const rect = this.game.canvas.getBoundingClientRect();
            this.touchStartPos = {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
            
            // Treat as mouse down
            this.onMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
        }
    }
    
    onTouchEnd(event) {
        if (this.touchStartPos && event.changedTouches.length === 1) {
            const touch = event.changedTouches[0];
            const rect = this.game.canvas.getBoundingClientRect();
            const touchEndPos = {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
            
            // Calculate swipe direction
            const deltaX = touchEndPos.x - this.touchStartPos.x;
            const deltaY = touchEndPos.y - this.touchStartPos.y;
            const minSwipeDistance = 30;
            
            if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
                // Determine swipe direction
                let direction = null;
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    direction = deltaX > 0 ? 'right' : 'left';
                } else {
                    direction = deltaY > 0 ? 'down' : 'up';
                }
                
                // Handle as movement
                if (this.game.gameState === 'puzzle' && this.game.currentLevelInstance) {
                    this.game.currentLevelInstance.handleMovement(direction);
                }
            } else {
                // Handle as tap
                if (this.game.gameState === 'puzzle' && this.game.currentLevelInstance) {
                    this.game.currentLevelInstance.handleClick(touchEndPos.x, touchEndPos.y);
                }
            }
            
            this.touchStartPos = null;
        }
    }
    
    onTouchMove(event) {
        // Prevent scrolling
        event.preventDefault();
    }
    
    updateCursor() {
        if (this.game.gameState !== 'puzzle' || !this.game.currentLevelInstance) {
            this.game.canvas.className = '';
            return;
        }
        
        // Check if mouse is over an interactive object
        const canInteract = this.game.currentLevelInstance.canInteractAt(this.mousePos.x, this.mousePos.y);
        
        if (canInteract) {
            this.game.canvas.className = 'can-move';
        } else {
            this.game.canvas.className = '';
        }
    }
    
    // Utility methods
    isKeyPressed(key) {
        return !!this.keys[key.toLowerCase()];
    }
    
    isMovementKey(key) {
        const movementKeys = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'];
        return movementKeys.includes(key.toLowerCase());
    }
    
    getMovementDirection() {
        if (this.isKeyPressed('arrowup') || this.isKeyPressed('w')) return 'up';
        if (this.isKeyPressed('arrowdown') || this.isKeyPressed('s')) return 'down';
        if (this.isKeyPressed('arrowleft') || this.isKeyPressed('a')) return 'left';
        if (this.isKeyPressed('arrowright') || this.isKeyPressed('d')) return 'right';
        return null;
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    toggleMute() {
        this.game.settings.volume = this.game.settings.volume > 0 ? 0 : 0.5;
        this.game.saveSettings();
        this.game.applySettings();
    }
    
    // Accessibility helpers
    announceToScreenReader(text) {
        // Create temporary element for screen reader announcement
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        
        document.body.appendChild(announcement);
        announcement.textContent = text;
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Input state queries
    getInputState() {
        return {
            keys: { ...this.keys },
            mousePos: { ...this.mousePos },
            isMouseDown: this.isMouseDown,
            touchActive: !!this.touchStartPos
        };
    }
    
    cleanup() {
        // Remove event listeners if needed
        console.log('Input handler cleaned up');
    }
}