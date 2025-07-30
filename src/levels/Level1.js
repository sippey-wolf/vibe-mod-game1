/**
 * The Cold Case of Eleanor Ash - Level 1: The Torn Photograph
 * Photo reconstruction puzzle in Eleanor's apartment
 */

class Level1 extends SokobanMechanics {
    constructor(gameEngine) {
        super(gameEngine);
        
        // Level-specific properties
        this.levelNumber = 1;
        this.title = "The Torn Photograph";
        this.isComplete = false;
        
        // Photo fragments data
        this.photoFragments = [
            { id: 'fragment-a', text: "Eleanor's face", placed: false },
            { id: 'fragment-b', text: "Eleanor's shoulder", placed: false },
            { id: 'fragment-c', text: "Man's hand", placed: false },
            { id: 'fragment-d', text: "Man's torso", placed: false },
            { id: 'fragment-e', text: "Man's face", placed: false }
        ];
        
        // Target positions for photo reconstruction
        this.photoFrameZone = { x: 3, y: 1, width: 2, height: 3 };
        this.showTargetHighlight = false;
        
        this.initLevel();
    }
    
    initLevel() {
        // Initialize 5x5 grid
        this.initializeGrid(5, 5, 80);
        
        // Set up the apartment room layout
        this.setupRoom();
        
        // Place photo fragments
        this.placePhotoFragments();
        
        // Set player starting position
        this.setPlayer(2, 2);
        
        console.log('Level 1: The Torn Photograph initialized');
    }
    
    setupRoom() {
        // Add static objects (furniture and obstacles)
        this.addStaticObject(0, 0, 'wall-corner', { description: 'Corner of the room' });
        this.addStaticObject(4, 0, 'wall-corner', { description: 'Corner of the room' });
        this.addStaticObject(0, 4, 'wall-corner', { description: 'Corner of the room' });
        this.addStaticObject(4, 4, 'wall-corner', { description: 'Corner of the room' });
        
        // Add desk lamp (immovable, provides atmosphere)
        this.addStaticObject(4, 1, 'desk-lamp', { 
            description: 'Warm desk lamp casting amber light',
            isLightSource: true 
        });
        
        // Add chair (can be pushed to access fragments)
        this.addPushableObject('chair', 1, 3, 'chair', { 
            description: 'Old wooden chair',
            canPush: true 
        });
        
        // Add book stack (immovable obstacle)
        this.addStaticObject(3, 3, 'books', { 
            description: 'Stack of case files and books' 
        });
        
        // Add photo frame target zone (2x3 area)
        this.addTargetZone(this.photoFrameZone.x, this.photoFrameZone.y, 
                          this.photoFrameZone.width, this.photoFrameZone.height, 'photo-frame');
        
        // Add red herring objects
        this.addPushableObject('newspaper', 0, 2, 'newspaper', { 
            description: 'Old newspaper clipping',
            isRedHerring: true 
        });
        
        this.addPushableObject('pen', 1, 1, 'pen', { 
            description: 'Fountain pen',
            isRedHerring: true 
        });
    }
    
    placePhotoFragments() {
        // Place fragments in strategic positions around the room
        const fragmentPositions = [
            { id: 'fragment-a', x: 2, y: 0, description: "Eleanor's smiling face" },
            { id: 'fragment-b', x: 0, y: 1, description: "Eleanor's shoulder and arm" },
            { id: 'fragment-c', x: 4, y: 2, description: "A man's hand on Eleanor's shoulder" },
            { id: 'fragment-d', x: 1, y: 4, description: "Man's torso in dark shirt" },
            { id: 'fragment-e', x: 4, y: 3, description: "Man's face - confident, mid-30s" }
        ];
        
        fragmentPositions.forEach(fragment => {
            this.addPushableObject(fragment.id, fragment.x, fragment.y, 'photo-fragment', {
                description: fragment.description,
                fragmentData: this.photoFragments.find(f => f.id === fragment.id),
                isPhotoFragment: true
            });
        });
    }
    
    // Override movement handling for Level 1 specific interactions
    handleMovement(direction) {
        const moved = this.attemptMove(direction);
        
        if (moved) {
            // Update UI
            this.game.ui.showMoveCounter(this.getMoveCount(), this.getPushCount());
            
            // Check for special interactions
            this.checkForInteractions();
        }
        
        return moved;
    }
    
    handleClick(x, y) {
        // Convert screen coordinates to grid coordinates
        const gridPos = this.screenToGrid(x, y);
        
        if (this.isValidPosition(gridPos.x, gridPos.y)) {
            const obj = this.getObjectAt(gridPos.x, gridPos.y);
            
            if (obj) {
                // Show tooltip with object description
                this.game.ui.showTooltip(x, y, obj.data.description);
                
                // Handle object-specific interactions
                this.handleObjectInteraction(obj);
            } else {
                this.game.ui.hideTooltip();
            }
        }
    }
    
    handleMouseMove(x, y) {
        // Update cursor and tooltips based on what's under mouse
        const gridPos = this.screenToGrid(x, y);
        
        if (this.isValidPosition(gridPos.x, gridPos.y)) {
            const obj = this.getObjectAt(gridPos.x, gridPos.y);
            
            if (obj && obj.data.isPhotoFragment) {
                this.game.canvas.className = 'can-move';
            } else {
                this.game.canvas.className = '';
            }
        }
    }
    
    handleMouseUp(x, y) {
        this.game.ui.hideTooltip();
    }
    
    handleAction() {
        // Handle space/enter key actions
        const playerX = this.player.x;
        const playerY = this.player.y;
        
        // Check adjacent cells for interactable objects
        const directions = [
            { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }
        ];
        
        for (let dir of directions) {
            const checkX = playerX + dir.x;
            const checkY = playerY + dir.y;
            const obj = this.getObjectAt(checkX, checkY);
            
            if (obj && obj.data.isPhotoFragment) {
                this.handleObjectInteraction(obj);
                break;
            }
        }
    }
    
    handleObjectInteraction(obj) {
        if (obj.data.isPhotoFragment) {
            // Highlight the photo frame area
            this.highlightTargetZone();
            
            // Play interaction sound
            this.game.playSound('fragment_select');
        }
    }
    
    highlightTargetZone() {
        // Visual feedback for target zone (implemented in render method)
        this.showTargetHighlight = true;
        
        setTimeout(() => {
            this.showTargetHighlight = false;
        }, 2000);
    }
    
    checkForInteractions() {
        // Check if player is near important objects
        const playerX = this.player.x;
        const playerY = this.player.y;
        
        // Check for fragments near photo frame
        this.pushableObjects.forEach(obj => {
            if (obj.data.isPhotoFragment) {
                const inFrame = this.isInPhotoFrame(obj.x, obj.y);
                if (inFrame && !obj.data.fragmentData.placed) {
                    obj.data.fragmentData.placed = true;
                    this.game.playSound('place_correct');
                    this.checkWinCondition();
                }
            }
        });
    }
    
    isInPhotoFrame(x, y) {
        return x >= this.photoFrameZone.x && 
               x < this.photoFrameZone.x + this.photoFrameZone.width &&
               y >= this.photoFrameZone.y && 
               y < this.photoFrameZone.y + this.photoFrameZone.height;
    }
    
    checkWinCondition() {
        // Check if all photo fragments are in the frame area
        const fragmentsInFrame = this.pushableObjects.filter(obj => 
            obj.data.isPhotoFragment && this.isInPhotoFrame(obj.x, obj.y)
        );
        
        const totalFragments = this.photoFragments.length;
        const placedFragments = fragmentsInFrame.length;
        
        // Update progress
        this.game.ui.showProgressIndicator(placedFragments, totalFragments);
        
        if (placedFragments === totalFragments) {
            // Check if fragments are in correct relative positions
            if (this.areFragmentsCorrectlyArranged(fragmentsInFrame)) {
                this.completeLevel();
                return true;
            }
        }
        
        return false;
    }
    
    areFragmentsCorrectlyArranged(fragments) {
        // Define correct arrangement pattern (2x3 grid)
        const correctPattern = [
            ['fragment-a', 'fragment-c'],  // Top row: Eleanor's face, Man's hand
            ['fragment-b', 'fragment-d'],  // Middle row: Eleanor's shoulder, Man's torso  
            [null, 'fragment-e']           // Bottom row: empty, Man's face
        ];
        
        // Check each fragment's position relative to frame origin
        for (let fragment of fragments) {
            const relativeX = fragment.x - this.photoFrameZone.x;
            const relativeY = fragment.y - this.photoFrameZone.y;
            
            if (relativeY < correctPattern.length && relativeX < correctPattern[relativeY].length) {
                const expectedId = correctPattern[relativeY][relativeX];
                if (expectedId !== fragment.id) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    completeLevel() {
        this.isComplete = true;
        
        // Hide progress indicator
        this.game.ui.hideProgressIndicator();
        
        // Show victory animation
        this.game.ui.showVictoryAnimation(this.levelNumber);
        
        // Play completion sound
        this.game.playSound('level_complete');
        
        // Trigger game engine level completion
        setTimeout(() => {
            this.game.onLevelComplete(this.levelNumber);
        }, 1000);
        
        console.log('Level 1 completed!');
    }
    
    showHint() {
        this.game.ui.showHint(this.levelNumber);
    }
    
    reset() {
        // Reset all fragments
        this.photoFragments.forEach(fragment => {
            fragment.placed = false;
        });
        
        // Clear and reinitialize
        super.reset();
        this.initLevel();
        
        // Reset UI
        this.game.ui.hideProgressIndicator();
        
        console.log('Level 1 reset');
    }
    
    undo() {
        const undone = this.undoLastMove();
        if (undone) {
            // Update UI
            this.game.ui.showMoveCounter(this.getMoveCount(), this.getPushCount());
            
            // Recheck fragment placement
            this.recheckFragmentPlacement();
        }
        return undone;
    }
    
    recheckFragmentPlacement() {
        // Update fragment placement status after undo
        this.photoFragments.forEach(fragment => {
            fragment.placed = false;
        });
        
        this.pushableObjects.forEach(obj => {
            if (obj.data.isPhotoFragment && this.isInPhotoFrame(obj.x, obj.y)) {
                obj.data.fragmentData.placed = true;
            }
        });
        
        // Update progress
        const placedCount = this.photoFragments.filter(f => f.placed).length;
        this.game.ui.showProgressIndicator(placedCount, this.photoFragments.length);
    }
    
    canInteractAt(x, y) {
        const gridPos = this.screenToGrid(x, y);
        if (!this.isValidPosition(gridPos.x, gridPos.y)) return false;
        
        const obj = this.getObjectAt(gridPos.x, gridPos.y);
        return obj && (obj.data.isPhotoFragment || obj.data.canPush);
    }
    
    // Custom rendering for Level 1
    render(ctx) {
        // Render background atmosphere
        this.renderBackground(ctx);
        
        // Render base Sokoban elements
        super.render(ctx);
        
        // Render level-specific elements
        this.renderPhotoFrame(ctx);
        this.renderAtmosphere(ctx);
    }
    
    renderBackground(ctx) {
        // Create apartment atmosphere with warm lighting
        const gradient = ctx.createRadialGradient(
            this.offsetX + (4 * this.cellSize), this.offsetY + (1 * this.cellSize), 0,
            this.offsetX + (4 * this.cellSize), this.offsetY + (1 * this.cellSize), 200
        );
        gradient.addColorStop(0, 'rgba(255, 179, 71, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 179, 71, 0.05)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(this.offsetX, this.offsetY, 
                    this.gridWidth * this.cellSize, this.gridHeight * this.cellSize);
    }
    
    renderPhotoFrame(ctx) {
        // Render the photo frame with special highlighting
        const frameX = this.offsetX + (this.photoFrameZone.x * this.cellSize);
        const frameY = this.offsetY + (this.photoFrameZone.y * this.cellSize);
        const frameWidth = this.photoFrameZone.width * this.cellSize;
        const frameHeight = this.photoFrameZone.height * this.cellSize;
        
        // Frame background
        ctx.fillStyle = 'rgba(139, 69, 19, 0.3)';
        ctx.fillRect(frameX, frameY, frameWidth, frameHeight);
        
        // Frame border
        ctx.strokeStyle = this.showTargetHighlight ? '#ffb347' : '#8b4513';
        ctx.lineWidth = this.showTargetHighlight ? 4 : 2;
        ctx.strokeRect(frameX, frameY, frameWidth, frameHeight);
        
        // Frame corners (decorative)
        ctx.fillStyle = '#8b4513';
        const cornerSize = 8;
        // Top-left corner
        ctx.fillRect(frameX - cornerSize/2, frameY - cornerSize/2, cornerSize, cornerSize);
        // Top-right corner
        ctx.fillRect(frameX + frameWidth - cornerSize/2, frameY - cornerSize/2, cornerSize, cornerSize);
        // Bottom-left corner
        ctx.fillRect(frameX - cornerSize/2, frameY + frameHeight - cornerSize/2, cornerSize, cornerSize);
        // Bottom-right corner
        ctx.fillRect(frameX + frameWidth - cornerSize/2, frameY + frameHeight - cornerSize/2, cornerSize, cornerSize);
    }
    
    renderAtmosphere(ctx) {
        // Add dust motes or particles in the lamp light
        if (Math.random() < 0.1) {
            ctx.fillStyle = 'rgba(255, 179, 71, 0.6)';
            for (let i = 0; i < 3; i++) {
                const x = this.offsetX + (3.5 + Math.random()) * this.cellSize;
                const y = this.offsetY + (1 + Math.random() * 2) * this.cellSize;
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    // Override object rendering for photo fragments
    renderObject(ctx, obj, x, y) {
        if (obj.data.isPhotoFragment) {
            this.renderPhotoFragment(ctx, obj, x, y);
        } else if (obj.type === 'chair') {
            this.renderChair(ctx, x, y);
        } else if (obj.type === 'newspaper') {
            this.renderNewspaper(ctx, x, y);
        } else if (obj.type === 'pen') {
            this.renderPen(ctx, x, y);
        } else {
            // Default rendering
            super.renderObject(ctx, obj, x, y);
        }
    }
    
    renderPhotoFragment(ctx, obj, x, y) {
        // Render photo fragment with torn edges
        ctx.fillStyle = '#f5f5dc';
        ctx.fillRect(x + 8, y + 8, this.cellSize - 16, this.cellSize - 16);
        
        // Add torn edge effect
        ctx.strokeStyle = '#d3d3d3';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 2]);
        ctx.strokeRect(x + 8, y + 8, this.cellSize - 16, this.cellSize - 16);
        ctx.setLineDash([]);
        
        // Add fragment identifier
        ctx.fillStyle = '#2d2d2d';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        const fragmentLetter = obj.id.split('-')[1].toUpperCase();
        ctx.fillText(fragmentLetter, x + this.cellSize / 2, y + this.cellSize / 2 + 3);
        
        // Add subtle shadow for depth
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(x + 10, y + 10, this.cellSize - 16, this.cellSize - 16);
    }
    
    renderChair(ctx, x, y) {
        // Simple chair representation
        ctx.fillStyle = '#8b4513';
        // Chair back
        ctx.fillRect(x + 12, y + 8, this.cellSize - 24, 8);
        // Chair seat
        ctx.fillRect(x + 8, y + 20, this.cellSize - 16, 8);
        // Chair legs
        ctx.fillRect(x + 12, y + 28, 4, this.cellSize - 36);
        ctx.fillRect(x + this.cellSize - 16, y + 28, 4, this.cellSize - 36);
    }
    
    renderNewspaper(ctx, x, y) {
        // Newspaper representation
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(x + 8, y + 12, this.cellSize - 16, this.cellSize - 24);
        
        // Add text lines
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(x + 12, y + 18 + (i * 6));
            ctx.lineTo(x + this.cellSize - 12, y + 18 + (i * 6));
            ctx.stroke();
        }
    }
    
    renderPen(ctx, x, y) {
        // Fountain pen representation
        ctx.fillStyle = '#2d2d2d';
        ctx.fillRect(x + this.cellSize/2 - 2, y + 16, 4, this.cellSize - 32);
        
        // Pen tip
        ctx.fillStyle = '#ffb347';
        ctx.fillRect(x + this.cellSize/2 - 1, y + 12, 2, 8);
    }
    
    // Override static object rendering
    renderStaticObjects(ctx) {
        this.staticObjects.forEach(obj => {
            const pos = this.gridToScreen(obj.x, obj.y);
            
            if (obj.type === 'desk-lamp') {
                this.renderDeskLamp(ctx, pos.x, pos.y);
            } else if (obj.type === 'books') {
                this.renderBooks(ctx, pos.x, pos.y);
            } else if (obj.type === 'wall-corner') {
                this.renderWallCorner(ctx, pos.x, pos.y);
            }
        });
    }
    
    renderDeskLamp(ctx, x, y) {
        // Lamp base
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x + 16, y + 40, this.cellSize - 32, 16);
        
        // Lamp stem
        ctx.fillRect(x + this.cellSize/2 - 2, y + 20, 4, 20);
        
        // Lamp shade
        ctx.fillStyle = '#ffb347';
        ctx.beginPath();
        ctx.arc(x + this.cellSize/2, y + 16, 16, 0, Math.PI * 2);
        ctx.fill();
        
        // Light glow effect
        const gradient = ctx.createRadialGradient(
            x + this.cellSize/2, y + 16, 0,
            x + this.cellSize/2, y + 16, 40
        );
        gradient.addColorStop(0, 'rgba(255, 179, 71, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 179, 71, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x + this.cellSize/2, y + 16, 40, 0, Math.PI * 2);
        ctx.fill();
    }
    
    renderBooks(ctx, x, y) {
        // Stack of books
        const bookColors = ['#8b0000', '#228b22', '#4682b4'];
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = bookColors[i];
            ctx.fillRect(x + 8, y + 40 - (i * 8), this.cellSize - 16, 8);
        }
    }
    
    renderWallCorner(ctx, x, y) {
        // Simple wall corner representation
        ctx.fillStyle = '#4a4a4a';
        ctx.fillRect(x, y, this.cellSize, this.cellSize);
        
        // Add texture
        ctx.fillStyle = '#5a5a5a';
        ctx.fillRect(x + 4, y + 4, this.cellSize - 8, this.cellSize - 8);
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        
        // Update any level-specific animations or effects
        if (this.showTargetHighlight) {
            // Could add pulsing effect or other animations here
        }
    }
    
    cleanup() {
        // Clean up level-specific resources
        this.game.ui.hideProgressIndicator();
        console.log('Level 1 cleaned up');
    }
}