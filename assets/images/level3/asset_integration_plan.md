# Asset Integration Plan - Level 3: Crime Scene Reenactment

## Overview
This document outlines the technical integration of Level 3 visual assets into "The Cold Case of Eleanor Ash" game engine, following the established patterns from Levels 1 and 2.

## Asset Manager Integration

### Level 3 Asset Loading
Add to [`AssetManager.js`](../../../src/engine/AssetManager.js):

```javascript
// Level 3: Crime Scene Reenactment Assets
const level3Assets = [
    // Crime Scene Backgrounds
    { type: 'image', name: 'level3_apartment_staged', src: 'assets/images/level3/eleanor_apartment_staged.png' },
    { type: 'image', name: 'level3_apartment_true', src: 'assets/images/level3/eleanor_apartment_true.png' },
    
    // Moveable Evidence Objects - Staged States
    { type: 'image', name: 'level3_chair_staged', src: 'assets/images/level3/evidence_chair_knocked.png' },
    { type: 'image', name: 'level3_gun_staged', src: 'assets/images/level3/evidence_gun_wrong_hand.png' },
    { type: 'image', name: 'level3_blood_staged', src: 'assets/images/level3/evidence_blood_official.png' },
    { type: 'image', name: 'level3_outline_staged', src: 'assets/images/level3/evidence_body_outline_staged.png' },
    { type: 'image', name: 'level3_window_staged', src: 'assets/images/level3/evidence_window_closed.png' },
    
    // Moveable Evidence Objects - True States
    { type: 'image', name: 'level3_chair_true', src: 'assets/images/level3/evidence_chair_correct.png' },
    { type: 'image', name: 'level3_gun_true', src: 'assets/images/level3/evidence_gun_correct.png' },
    { type: 'image', name: 'level3_blood_true', src: 'assets/images/level3/evidence_blood_actual.png' },
    { type: 'image', name: 'level3_outline_true', src: 'assets/images/level3/evidence_body_outline_murder.png' },
    { type: 'image', name: 'level3_window_true', src: 'assets/images/level3/evidence_window_open.png' },
    
    // Additional Evidence
    { type: 'image', name: 'level3_lamp_broken', src: 'assets/images/level3/evidence_lamp_broken.png' },
    
    // Evidence Markers
    { type: 'image', name: 'level3_marker_1', src: 'assets/images/level3/evidence_marker_1.png' },
    { type: 'image', name: 'level3_marker_2', src: 'assets/images/level3/evidence_marker_2.png' },
    { type: 'image', name: 'level3_marker_3', src: 'assets/images/level3/evidence_marker_3.png' },
    { type: 'image', name: 'level3_marker_4', src: 'assets/images/level3/evidence_marker_4.png' },
    { type: 'image', name: 'level3_marker_5', src: 'assets/images/level3/evidence_marker_5.png' },
    { type: 'image', name: 'level3_marker_6', src: 'assets/images/level3/evidence_marker_6.png' },
    
    // Static Furniture
    { type: 'image', name: 'level3_bed', src: 'assets/images/level3/apartment_bed.png' },
    { type: 'image', name: 'level3_nightstand', src: 'assets/images/level3/apartment_nightstand.png' },
    { type: 'image', name: 'level3_dresser', src: 'assets/images/level3/apartment_dresser.png' },
    { type: 'image', name: 'level3_bookshelf', src: 'assets/images/level3/apartment_bookshelf.png' },
    
    // Atmospheric Elements
    { type: 'image', name: 'level3_lighting', src: 'assets/images/level3/crime_scene_lighting.png' },
    { type: 'image', name: 'level3_shadows', src: 'assets/images/level3/shadow_overlay.png' },
    { type: 'image', name: 'level3_police_tape', src: 'assets/images/level3/police_tape.png' },
    { type: 'image', name: 'level3_tools', src: 'assets/images/level3/investigation_tools.png' }
];
```

### Asset Loading Method
```javascript
async loadLevel3Assets() {
    console.log('Loading Level 3 assets...');
    await this.loadAssets(level3Assets);
    console.log('Level 3 assets loaded successfully');
}
```

## Level 3 Class Implementation

### Create Level3.js
File: [`src/levels/Level3.js`](../../../src/levels/Level3.js)

```javascript
/**
 * The Cold Case of Eleanor Ash - Level 3: Crime Scene Reenactment
 * Evidence reconstruction puzzle in Eleanor's apartment crime scene
 */

class Level3 extends SokobanMechanics {
    constructor(gameEngine) {
        super(gameEngine);
        
        // Level-specific properties
        this.levelNumber = 3;
        this.title = "Crime Scene Reenactment";
        this.isComplete = false;
        
        // Crime scene state
        this.sceneMode = 'staged'; // 'staged' or 'truth'
        this.evidenceReconstructed = 0;
        this.totalEvidence = 6;
        
        // Evidence objects data
        this.evidenceObjects = [
            { id: 'chair', type: 'evidence', currentState: 'staged', correctState: 'truth', placed: false },
            { id: 'gun', type: 'evidence', currentState: 'staged', correctState: 'truth', placed: false },
            { id: 'blood', type: 'evidence', currentState: 'staged', correctState: 'truth', placed: false },
            { id: 'outline', type: 'evidence', currentState: 'staged', correctState: 'truth', placed: false },
            { id: 'window', type: 'evidence', currentState: 'staged', correctState: 'truth', placed: false },
            { id: 'lamp', type: 'evidence', currentState: 'staged', correctState: 'truth', placed: false }
        ];
        
        // Crime scene zones
        this.crimeSceneZones = {
            staged: { x: 1, y: 1, width: 6, height: 6 },
            truth: { x: 1, y: 1, width: 6, height: 6 }
        };
        
        this.initLevel();
    }
    
    initLevel() {
        // Initialize 8x8 grid for complex crime scene
        this.initializeGrid(8, 8, 56);
        
        // Set up the crime scene
        this.setupCrimeScene();
        
        // Place evidence objects in staged positions
        this.placeEvidenceObjects();
        
        // Set player starting position
        this.setPlayer(0, 7); // Bottom-left corner (detective enters scene)
        
        console.log('Level 3: Crime Scene Reenactment initialized');
    }
    
    setupCrimeScene() {
        // Add static furniture (immovable)
        this.addStaticObject(6, 1, 'bed', { 
            description: 'Eleanor\'s bed - rumpled bedding suggests disturbance',
            image: 'level3_bed'
        });
        
        this.addStaticObject(7, 1, 'nightstand', { 
            description: 'Nightstand with overturned water glass',
            image: 'level3_nightstand'
        });
        
        this.addStaticObject(6, 0, 'dresser', { 
            description: 'Dresser with cracked mirror',
            image: 'level3_dresser'
        });
        
        this.addStaticObject(0, 0, 'bookshelf', { 
            description: 'Bookshelf with scattered books',
            image: 'level3_bookshelf'
        });
        
        // Add crime scene boundary
        this.addTargetZone(1, 1, 6, 6, 'crime-scene');
    }
    
    placeEvidenceObjects() {
        // Place evidence in initial staged positions
        const stagedPositions = [
            { id: 'chair', x: 5, y: 2, description: 'Chair knocked over near window (staged)' },
            { id: 'gun', x: 4, y: 3, description: 'Gun in wrong hand position' },
            { id: 'blood', x: 4, y: 2, description: 'Blood spatter in staged location' },
            { id: 'outline', x: 4, y: 2, description: 'Body outline in suicide position' },
            { id: 'window', x: 6, y: 2, description: 'Window closed (staged)' },
            { id: 'lamp', x: 3, y: 4, description: 'Broken lamp from struggle' }
        ];
        
        stagedPositions.forEach(pos => {
            const evidenceData = this.evidenceObjects.find(e => e.id === pos.id);
            this.addPushableObject(pos.id, pos.x, pos.y, 'evidence', {
                description: pos.description,
                evidenceData: evidenceData,
                isEvidence: true,
                currentImage: `level3_${pos.id}_staged`
            });
        });
        
        // Add evidence markers
        for (let i = 1; i <= 6; i++) {
            this.addPushableObject(`marker-${i}`, 1 + i, 6, 'marker', {
                description: `Evidence marker #${i}`,
                markerNumber: i,
                isMarker: true,
                currentImage: `level3_marker_${i}`
            });
        }
    }
    
    // Override movement handling for Level 3 specific interactions
    handleMovement(direction) {
        const moved = this.attemptMove(direction);
        
        if (moved) {
            // Update UI
            this.game.ui.showMoveCounter(this.getMoveCount(), this.getPushCount());
            
            // Check for evidence reconstruction
            this.checkEvidenceReconstruction();
        }
        
        return moved;
    }
    
    checkEvidenceReconstruction() {
        let correctlyPlaced = 0;
        
        this.pushableObjects.forEach(obj => {
            if (obj.data.isEvidence) {
                const correctPosition = this.getCorrectPosition(obj.id);
                if (obj.x === correctPosition.x && obj.y === correctPosition.y) {
                    if (!obj.data.evidenceData.placed) {
                        obj.data.evidenceData.placed = true;
                        obj.data.evidenceData.currentState = 'truth';
                        obj.data.currentImage = `level3_${obj.id}_true`;
                        this.game.playSound('evidence_collected');
                        this.showContradictionReveal(obj);
                    }
                    correctlyPlaced++;
                }
            }
        });
        
        this.evidenceReconstructed = correctlyPlaced;
        this.game.ui.showProgressIndicator(correctlyPlaced, this.totalEvidence);
        
        if (correctlyPlaced === this.totalEvidence) {
            this.completeLevel();
        }
    }
    
    getCorrectPosition(evidenceId) {
        // Define correct positions for truth reconstruction
        const correctPositions = {
            'chair': { x: 2, y: 5 }, // Near door (escape attempt)
            'gun': { x: 3, y: 6 }, // Dropped by attacker
            'blood': { x: 2, y: 4 }, // Actual struggle location
            'outline': { x: 2, y: 4 }, // True body position
            'window': { x: 6, y: 2 }, // Open (escape route)
            'lamp': { x: 3, y: 4 } // Broken in struggle
        };
        
        return correctPositions[evidenceId] || { x: 0, y: 0 };
    }
    
    showContradictionReveal(evidenceObj) {
        // Visual effect showing contradiction revealed
        this.game.ui.showContradictionEffect(evidenceObj.x, evidenceObj.y);
        
        // Show narrative text for this evidence
        const revelations = {
            'chair': 'The chair was by the door - Eleanor tried to escape!',
            'gun': 'The gun was dropped by the attacker, not held by Eleanor.',
            'blood': 'Blood spatter shows struggle near the door, not suicide by window.',
            'outline': 'Body position proves murder, not suicide.',
            'window': 'Window was open - the killer\'s escape route.',
            'lamp': 'Lamp broken in struggle, not from falling body.'
        };
        
        this.game.ui.showRevelationText(revelations[evidenceObj.id]);
    }
    
    completeLevel() {
        this.isComplete = true;
        
        // Hide progress indicator
        this.game.ui.hideProgressIndicator();
        
        // Show final crime scene reconstruction animation
        this.showFinalReconstruction();
        
        // Play completion sound
        this.game.playSound('level_complete');
        
        // Trigger game engine level completion
        setTimeout(() => {
            this.game.onLevelComplete(this.levelNumber);
        }, 3000); // Allow time for reconstruction animation
        
        console.log('Level 3 completed - Murder proven!');
    }
    
    showFinalReconstruction() {
        // Animate the complete crime scene reconstruction
        this.sceneMode = 'truth';
        this.game.ui.showFinalReconstructionAnimation();
    }
    
    // Custom rendering for Level 3
    render(ctx) {
        // Render crime scene background
        this.renderCrimeSceneBackground(ctx);
        
        // Render base Sokoban elements
        super.render(ctx);
        
        // Render level-specific elements
        this.renderAtmosphericEffects(ctx);
        this.renderEvidenceHighlights(ctx);
    }
    
    renderCrimeSceneBackground(ctx) {
        // Render appropriate background based on scene mode
        const backgroundImage = this.game.assetManager.getImage(
            this.sceneMode === 'staged' ? 'level3_apartment_staged' : 'level3_apartment_true'
        );
        
        if (backgroundImage) {
            ctx.drawImage(backgroundImage, this.offsetX, this.offsetY, 
                         this.gridWidth * this.cellSize, this.gridHeight * this.cellSize);
        }
        
        // Add lighting overlay
        const lightingImage = this.game.assetManager.getImage('level3_lighting');
        if (lightingImage) {
            ctx.globalAlpha = 0.7;
            ctx.drawImage(lightingImage, this.offsetX, this.offsetY,
                         this.gridWidth * this.cellSize, this.gridHeight * this.cellSize);
            ctx.globalAlpha = 1.0;
        }
    }
    
    renderAtmosphericEffects(ctx) {
        // Render shadows
        const shadowImage = this.game.assetManager.getImage('level3_shadows');
        if (shadowImage) {
            ctx.globalAlpha = 0.5;
            ctx.drawImage(shadowImage, this.offsetX, this.offsetY,
                         this.gridWidth * this.cellSize, this.gridHeight * this.cellSize);
            ctx.globalAlpha = 1.0;
        }
        
        // Render police tape if in staged mode
        if (this.sceneMode === 'staged') {
            const tapeImage = this.game.assetManager.getImage('level3_police_tape');
            if (tapeImage) {
                ctx.globalAlpha = 0.8;
                ctx.drawImage(tapeImage, this.offsetX, this.offsetY,
                             this.gridWidth * this.cellSize, this.gridHeight * this.cellSize);
                ctx.globalAlpha = 1.0;
            }
        }
    }
    
    renderEvidenceHighlights(ctx) {
        // Highlight correctly placed evidence
        this.pushableObjects.forEach(obj => {
            if (obj.data.isEvidence && obj.data.evidenceData.placed) {
                const pos = this.gridToScreen(obj.x, obj.y);
                
                // Green glow for correct placement
                ctx.shadowColor = '#00ff00';
                ctx.shadowBlur = 10;
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 2;
                ctx.strokeRect(pos.x, pos.y, this.cellSize, this.cellSize);
                ctx.shadowBlur = 0;
            }
        });
    }
    
    // Override object rendering for evidence objects
    renderObject(ctx, obj, x, y) {
        if (obj.data.isEvidence || obj.data.isMarker) {
            const image = this.game.assetManager.getImage(obj.data.currentImage);
            if (image) {
                ctx.drawImage(image, x, y, this.cellSize, this.cellSize);
            } else {
                // Fallback rendering
                super.renderObject(ctx, obj, x, y);
            }
        } else {
            // Default rendering for other objects
            super.renderObject(ctx, obj, x, y);
        }
    }
    
    // Override static object rendering
    renderStaticObjects(ctx) {
        this.staticObjects.forEach(obj => {
            const pos = this.gridToScreen(obj.x, obj.y);
            const image = this.game.assetManager.getImage(obj.data.image);
            
            if (image) {
                ctx.drawImage(image, pos.x, pos.y, this.cellSize, this.cellSize);
            } else {
                // Fallback rendering
                super.renderObject(ctx, obj, pos.x, pos.y);
            }
        });
    }
    
    reset() {
        // Reset all evidence states
        this.evidenceObjects.forEach(evidence => {
            evidence.placed = false;
            evidence.currentState = 'staged';
        });
        
        this.sceneMode = 'staged';
        this.evidenceReconstructed = 0;
        
        // Clear and reinitialize
        super.reset();
        this.initLevel();
        
        // Reset UI
        this.game.ui.hideProgressIndicator();
        
        console.log('Level 3 reset');
    }
    
    cleanup() {
        // Clean up level-specific resources
        this.game.ui.hideProgressIndicator();
        console.log('Level 3 cleaned up');
    }
}
```

## Game Engine Integration

### Update GameEngine.js
Add Level 3 loading to [`src/engine/GameEngine.js`](../../../src/engine/GameEngine.js):

```javascript
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
            this.currentLevelInstance = new Level2(this);
            break;
        case 3:
            this.currentLevelInstance = new Level3(this); // Add this line
            break;
        default:
            console.error('Invalid level number:', levelNumber);
            return;
    }
    
    this.updateLevelUI(levelNumber);
    console.log(`Loaded Level ${levelNumber}`);
}
```

## UI Enhancements

### Add Level 3 UI Methods
Add to [`src/ui/DetectiveUI.js`](../../../src/ui/DetectiveUI.js):

```javascript
showContradictionEffect(x, y) {
    // Visual effect when evidence contradiction is revealed
    const effect = document.createElement('div');
    effect.className = 'contradiction-effect';
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
    effect.textContent = 'CONTRADICTION REVEALED!';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 2000);
}

showRevelationText(text) {
    // Show narrative text for evidence revelations
    const revelation = document.getElementById('revelation-text');
    if (revelation) {
        revelation.textContent = text;
        revelation.style.display = 'block';
        
        setTimeout(() => {
            revelation.style.display = 'none';
        }, 3000);
    }
}

showFinalReconstructionAnimation() {
    // Show final crime scene reconstruction
    const modal = document.getElementById('reconstruction-modal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Animate the reconstruction sequence
        this.animateReconstruction();
    }
}

animateReconstruction() {
    // Timeline animation showing actual murder sequence
    const timeline = [
        'Eleanor hears someone at the door...',
        'She tries to escape but is cornered...',
        'A struggle ensues near the door...',
        'Eleanor is shot by her attacker...',
        'The killer stages the scene to look like suicide...',
        'Evidence is moved and positioned...',
        'The window is opened for escape...',
        'The case is closed as suicide...',
        'Until now. Justice for Eleanor.'
    ];
    
    let step = 0;
    const timelineElement = document.getElementById('reconstruction-timeline');
    
    const showNextStep = () => {
        if (step < timeline.length) {
            timelineElement.textContent = timeline[step];
            step++;
            setTimeout(showNextStep, 2000);
        }
    };
    
    showNextStep();
}
```

## CSS Styling

### Add Level 3 Styles
Add to [`styles/game.css`](../../../styles/game.css):

```css
/* Level 3: Crime Scene Reenactment Styles */
.contradiction-effect {
    position: absolute;
    background: rgba(255, 0, 0, 0.9);
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    z-index: 1000;
    animation: contradictionPulse 2s ease-out;
}

@keyframes contradictionPulse {
    0% { transform: scale(0.5); opacity: 0; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
}

#revelation-text {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: #ffb347;
    padding: 15px 30px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    z-index: 1000;
    display: none;
}

#reconstruction-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

#reconstruction-timeline {
    color: white;
    font-size: 24px;
    text-align: center;
    max-width: 600px;
    line-height: 1.5;
}

.evidence-highlight {
    box-shadow: 0 0 15px #00ff00;
    border: 2px solid #00ff00;
}

.crime-scene-grid {
    background: linear-gradient(45deg, #2a2a2a 25%, transparent 25%),
                linear-gradient(-45deg, #2a2a2a 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #2a2a2a 75%),
                linear-gradient(-45deg, transparent 75%, #2a2a2a 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}
```

## Performance Considerations

### Asset Loading Optimization
- Load Level 3 assets only when needed
- Use progressive loading for large crime scene backgrounds
- Implement asset caching for evidence state transitions
- Optimize image sizes for 56x56 pixel grid cells

### Memory Management
- Unload previous level assets before loading Level 3
- Use object pooling for evidence markers
- Implement efficient rendering for atmospheric effects
- Cache frequently used image transformations

### Animation Performance
- Use requestAnimationFrame for smooth evidence transitions
- Implement efficient particle systems for dust effects
- Optimize shadow and lighting overlay rendering
- Use CSS transforms for UI animations

## Testing Framework

### Visual Testing
- Verify all evidence objects render correctly in both states
- Test crime scene background transitions
- Validate atmospheric effect overlays
- Check evidence highlighting and contradiction effects

### Gameplay Testing
- Test evidence reconstruction logic
- Verify win condition detection
- Test undo functionality with evidence states
- Validate progress tracking and UI updates

### Performance Testing
- Monitor frame rate during evidence transitions
- Test memory usage with all assets loaded
- Verify smooth animation performance
- Check loading times for Level 3 assets

## Implementation Checklist

- [ ] Create Level3.js class extending SokobanMechanics
- [ ] Add Level 3 asset loading to AssetManager
- [ ] Update GameEngine to load Level 3
- [ ] Implement evidence reconstruction logic
- [ ] Add crime scene rendering methods
- [ ] Create UI methods for contradictions and revelations
- [ ] Add CSS styling for Level 3 effects
- [ ] Test evidence state transitions
- [ ] Verify win condition and completion sequence
- [ ] Optimize performance and memory usage

This integration plan provides a complete roadmap for implementing Level 3's visual assets and gameplay mechanics within the existing game engine architecture.