/**
 * The Cold Case of Eleanor Ash - Sokoban Mechanics
 * Core puzzle mechanics for grid-based movement and object pushing
 */

class SokobanMechanics {
    constructor(gameEngine) {
        this.game = gameEngine;
        this.grid = [];
        this.gridWidth = 0;
        this.gridHeight = 0;
        this.cellSize = 64;
        
        // Game objects
        this.player = { x: 0, y: 0 };
        this.pushableObjects = [];
        this.targetZones = [];
        this.staticObjects = [];
        
        // Movement state
        this.isMoving = false;
        this.moveQueue = [];
        this.moveHistory = [];
        
        // Visual properties
        this.offsetX = 0;
        this.offsetY = 0;
        
        // Animation
        this.animationSpeed = 300; // ms
        this.currentAnimations = [];
    }
    
    initializeGrid(width, height, cellSize = 64) {
        this.gridWidth = width;
        this.gridHeight = height;
        this.cellSize = cellSize;
        
        // Calculate centering offset
        const canvasWidth = this.game.canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = this.game.canvas.height / (window.devicePixelRatio || 1);
        
        this.offsetX = (canvasWidth - (width * cellSize)) / 2;
        this.offsetY = (canvasHeight - (height * cellSize)) / 2;
        
        // Initialize empty grid
        this.grid = [];
        for (let y = 0; y < height; y++) {
            this.grid[y] = [];
            for (let x = 0; x < width; x++) {
                this.grid[y][x] = {
                    type: 'empty',
                    object: null,
                    isTarget: false
                };
            }
        }
        
        console.log(`Grid initialized: ${width}x${height}, cell size: ${cellSize}`);
    }
    
    setPlayer(x, y) {
        if (this.isValidPosition(x, y)) {
            this.player.x = x;
            this.player.y = y;
            console.log(`Player positioned at (${x}, ${y})`);
        }
    }
    
    addPushableObject(id, x, y, type, data = {}) {
        if (this.isValidPosition(x, y) && this.grid[y][x].object === null) {
            const obj = {
                id,
                x,
                y,
                type,
                data,
                isAnimating: false,
                animationProgress: 0
            };
            
            this.pushableObjects.push(obj);
            this.grid[y][x].object = obj;
            this.grid[y][x].type = 'pushable';
            
            console.log(`Added pushable object ${id} at (${x}, ${y})`);
            return obj;
        }
        return null;
    }
    
    addStaticObject(x, y, type, data = {}) {
        if (this.isValidPosition(x, y)) {
            const obj = { x, y, type, data };
            this.staticObjects.push(obj);
            this.grid[y][x].type = 'static';
            
            console.log(`Added static object ${type} at (${x}, ${y})`);
            return obj;
        }
        return null;
    }
    
    addTargetZone(x, y, width = 1, height = 1, id = null) {
        const zone = { x, y, width, height, id, occupiedCells: [] };
        
        for (let dy = 0; dy < height; dy++) {
            for (let dx = 0; dx < width; dx++) {
                const targetX = x + dx;
                const targetY = y + dy;
                
                if (this.isValidPosition(targetX, targetY)) {
                    this.grid[targetY][targetX].isTarget = true;
                    zone.occupiedCells.push({ x: targetX, y: targetY });
                }
            }
        }
        
        this.targetZones.push(zone);
        console.log(`Added target zone at (${x}, ${y}) size ${width}x${height}`);
        return zone;
    }
    
    isValidPosition(x, y) {
        return x >= 0 && x < this.gridWidth && y >= 0 && y < this.gridHeight;
    }
    
    canMoveTo(x, y) {
        if (!this.isValidPosition(x, y)) return false;
        
        const cell = this.grid[y][x];
        return cell.type === 'empty' || cell.type === 'target';
    }
    
    canPushObject(objX, objY, pushX, pushY) {
        // Check if push destination is valid
        if (!this.isValidPosition(pushX, pushY)) return false;
        
        const destCell = this.grid[pushY][pushX];
        return destCell.type === 'empty' || (destCell.type === 'target' && destCell.object === null);
    }
    
    attemptMove(direction) {
        if (this.isMoving) return false;
        
        const directions = {
            'up': { x: 0, y: -1 },
            'down': { x: 0, y: 1 },
            'left': { x: -1, y: 0 },
            'right': { x: 1, y: 0 }
        };
        
        const dir = directions[direction];
        if (!dir) return false;
        
        const newX = this.player.x + dir.x;
        const newY = this.player.y + dir.y;
        
        // Check if player can move to new position
        if (this.canMoveTo(newX, newY)) {
            this.movePlayer(newX, newY);
            return true;
        }
        
        // Check if there's a pushable object to push
        const cell = this.grid[newY] && this.grid[newY][newX];
        if (cell && cell.type === 'pushable' && cell.object) {
            const pushX = newX + dir.x;
            const pushY = newY + dir.y;
            
            if (this.canPushObject(newX, newY, pushX, pushY)) {
                this.pushObject(cell.object, pushX, pushY);
                this.movePlayer(newX, newY);
                return true;
            }
        }
        
        return false;
    }
    
    movePlayer(x, y) {
        const oldX = this.player.x;
        const oldY = this.player.y;
        
        this.player.x = x;
        this.player.y = y;
        
        // Record move for undo functionality
        this.moveHistory.push({
            type: 'player',
            from: { x: oldX, y: oldY },
            to: { x, y }
        });
        
        this.game.playSound('move');
        console.log(`Player moved from (${oldX}, ${oldY}) to (${x}, ${y})`);
    }
    
    pushObject(obj, newX, newY) {
        const oldX = obj.x;
        const oldY = obj.y;
        
        // Clear old position
        this.grid[oldY][oldX].object = null;
        this.grid[oldY][oldX].type = this.grid[oldY][oldX].isTarget ? 'target' : 'empty';
        
        // Set new position
        obj.x = newX;
        obj.y = newY;
        this.grid[newY][newX].object = obj;
        this.grid[newY][newX].type = 'pushable';
        
        // Record move for undo functionality
        this.moveHistory.push({
            type: 'push',
            object: obj,
            from: { x: oldX, y: oldY },
            to: { x: newX, y: newY }
        });
        
        // Check if object is now in target zone
        const isInTarget = this.grid[newY][newX].isTarget;
        if (isInTarget) {
            this.game.playSound('place_correct');
            console.log(`Object ${obj.id} placed in target zone`);
        } else {
            this.game.playSound('push');
        }
        
        console.log(`Pushed object ${obj.id} from (${oldX}, ${oldY}) to (${newX}, ${newY})`);
        
        // Check win condition
        this.checkWinCondition();
    }
    
    checkWinCondition() {
        // Override in specific level implementations
        return false;
    }
    
    undoLastMove() {
        if (this.moveHistory.length === 0) return false;
        
        const lastMove = this.moveHistory.pop();
        
        if (lastMove.type === 'player') {
            this.player.x = lastMove.from.x;
            this.player.y = lastMove.from.y;
        } else if (lastMove.type === 'push') {
            const obj = lastMove.object;
            
            // Clear current position
            this.grid[obj.y][obj.x].object = null;
            this.grid[obj.y][obj.x].type = this.grid[obj.y][obj.x].isTarget ? 'target' : 'empty';
            
            // Restore old position
            obj.x = lastMove.from.x;
            obj.y = lastMove.from.y;
            this.grid[obj.y][obj.x].object = obj;
            this.grid[obj.y][obj.x].type = 'pushable';
            
            // Also undo player move (should be the previous move)
            if (this.moveHistory.length > 0) {
                const playerMove = this.moveHistory.pop();
                if (playerMove.type === 'player') {
                    this.player.x = playerMove.from.x;
                    this.player.y = playerMove.from.y;
                }
            }
        }
        
        console.log('Undid last move');
        return true;
    }
    
    reset() {
        // Clear all objects and reset positions
        this.pushableObjects = [];
        this.staticObjects = [];
        this.targetZones = [];
        this.moveHistory = [];
        this.isMoving = false;
        
        // Clear grid
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                this.grid[y][x] = {
                    type: 'empty',
                    object: null,
                    isTarget: false
                };
            }
        }
        
        console.log('Sokoban mechanics reset');
    }
    
    // Rendering methods
    gridToScreen(gridX, gridY) {
        return {
            x: this.offsetX + (gridX * this.cellSize),
            y: this.offsetY + (gridY * this.cellSize)
        };
    }
    
    screenToGrid(screenX, screenY) {
        return {
            x: Math.floor((screenX - this.offsetX) / this.cellSize),
            y: Math.floor((screenY - this.offsetY) / this.cellSize)
        };
    }
    
    renderGrid(ctx) {
        // Draw grid background
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        
        for (let x = 0; x <= this.gridWidth; x++) {
            const screenX = this.offsetX + (x * this.cellSize);
            ctx.beginPath();
            ctx.moveTo(screenX, this.offsetY);
            ctx.lineTo(screenX, this.offsetY + (this.gridHeight * this.cellSize));
            ctx.stroke();
        }
        
        for (let y = 0; y <= this.gridHeight; y++) {
            const screenY = this.offsetY + (y * this.cellSize);
            ctx.beginPath();
            ctx.moveTo(this.offsetX, screenY);
            ctx.lineTo(this.offsetX + (this.gridWidth * this.cellSize), screenY);
            ctx.stroke();
        }
    }
    
    renderTargetZones(ctx) {
        ctx.fillStyle = 'rgba(255, 179, 71, 0.2)';
        ctx.strokeStyle = '#ffb347';
        ctx.lineWidth = 2;
        
        this.targetZones.forEach(zone => {
            zone.occupiedCells.forEach(cell => {
                const pos = this.gridToScreen(cell.x, cell.y);
                ctx.fillRect(pos.x + 2, pos.y + 2, this.cellSize - 4, this.cellSize - 4);
                ctx.strokeRect(pos.x + 2, pos.y + 2, this.cellSize - 4, this.cellSize - 4);
            });
        });
    }
    
    renderStaticObjects(ctx) {
        this.staticObjects.forEach(obj => {
            const pos = this.gridToScreen(obj.x, obj.y);
            this.renderObject(ctx, obj, pos.x, pos.y);
        });
    }
    
    renderPushableObjects(ctx) {
        this.pushableObjects.forEach(obj => {
            const pos = this.gridToScreen(obj.x, obj.y);
            this.renderObject(ctx, obj, pos.x, pos.y);
        });
    }
    
    renderPlayer(ctx) {
        const pos = this.gridToScreen(this.player.x, this.player.y);
        
        // Simple player representation (detective)
        ctx.fillStyle = '#f5f5dc';
        ctx.fillRect(pos.x + 8, pos.y + 8, this.cellSize - 16, this.cellSize - 16);
        
        // Add detective hat
        ctx.fillStyle = '#2d2d2d';
        ctx.fillRect(pos.x + 12, pos.y + 8, this.cellSize - 24, 16);
        
        // Add magnifying glass
        ctx.strokeStyle = '#ffb347';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(pos.x + this.cellSize - 16, pos.y + this.cellSize - 16, 8, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(pos.x + this.cellSize - 8, pos.y + this.cellSize - 8);
        ctx.lineTo(pos.x + this.cellSize - 4, pos.y + this.cellSize - 4);
        ctx.stroke();
    }
    
    renderObject(ctx, obj, x, y) {
        // Default object rendering - override in specific implementations
        ctx.fillStyle = '#8a8a8a';
        ctx.fillRect(x + 4, y + 4, this.cellSize - 8, this.cellSize - 8);
        
        // Add object type indicator
        ctx.fillStyle = '#f5f5dc';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(obj.type.charAt(0).toUpperCase(), x + this.cellSize / 2, y + this.cellSize / 2 + 4);
    }
    
    render(ctx) {
        this.renderGrid(ctx);
        this.renderTargetZones(ctx);
        this.renderStaticObjects(ctx);
        this.renderPushableObjects(ctx);
        this.renderPlayer(ctx);
    }
    
    update(deltaTime) {
        // Update animations if any
        this.currentAnimations = this.currentAnimations.filter(animation => {
            animation.progress += deltaTime / animation.duration;
            
            if (animation.progress >= 1) {
                animation.onComplete();
                return false;
            }
            
            animation.onUpdate(animation.progress);
            return true;
        });
        
        this.isMoving = this.currentAnimations.length > 0;
    }
    
    // Utility methods
    getObjectAt(x, y) {
        if (!this.isValidPosition(x, y)) return null;
        return this.grid[y][x].object;
    }
    
    isTargetZone(x, y) {
        if (!this.isValidPosition(x, y)) return false;
        return this.grid[y][x].isTarget;
    }
    
    getMoveCount() {
        return this.moveHistory.filter(move => move.type === 'player').length;
    }
    
    getPushCount() {
        return this.moveHistory.filter(move => move.type === 'push').length;
    }
}