# Level 2: The Shredded Letter - Asset Integration Plan

## Overview
This document provides detailed specifications for integrating the Level 2 visual assets into "The Cold Case of Eleanor Ash" game engine. Following the successful pattern established in Level 1, this plan ensures seamless integration of the threatening letter reconstruction puzzle.

## Asset Loading Configuration

### AssetManager.js Updates

#### Level 2 Asset Definitions
```javascript
// Add to AssetManager.js asset loading configuration
const LEVEL2_ASSETS = [
    // Complete Letter
    { type: 'image', name: 'threatening_letter_complete', src: 'assets/images/level2/threatening_letter_complete.png' },
    { type: 'image', name: 'threatening_letter_aged', src: 'assets/images/level2/threatening_letter_aged.png' },
    
    // Letter Fragments
    { type: 'image', name: 'fragment_a_if_you_come', src: 'assets/images/level2/fragment_a_if_you_come.png' },
    { type: 'image', name: 'fragment_b_again_ill_go', src: 'assets/images/level2/fragment_b_again_ill_go.png' },
    { type: 'image', name: 'fragment_c_the_police', src: 'assets/images/level2/fragment_c_the_police.png' },
    { type: 'image', name: 'fragment_d_control_me', src: 'assets/images/level2/fragment_d_control_me.png' },
    { type: 'image', name: 'fragment_e_im_done', src: 'assets/images/level2/fragment_e_im_done.png' },
    { type: 'image', name: 'fragment_f_afraid_of_you', src: 'assets/images/level2/fragment_f_afraid_of_you.png' },
    { type: 'image', name: 'fragment_g_signature', src: 'assets/images/level2/fragment_g_signature.png' },
    { type: 'image', name: 'fragment_h_decoy', src: 'assets/images/level2/fragment_h_decoy.png' },
    
    // Environment Assets
    { type: 'image', name: 'evidence_room_background', src: 'assets/images/level2/evidence_room_background.png' },
    { type: 'image', name: 'wooden_desk_surface', src: 'assets/images/level2/wooden_desk_surface.png' },
    { type: 'image', name: 'light_table_glow', src: 'assets/images/level2/light_table_glow.png' },
    { type: 'image', name: 'wastebasket_metal', src: 'assets/images/level2/wastebasket_metal.png' },
    { type: 'image', name: 'magnifying_glass', src: 'assets/images/level2/magnifying_glass.png' },
    { type: 'image', name: 'evidence_boxes', src: 'assets/images/level2/evidence_boxes.png' },
    { type: 'image', name: 'scattered_papers', src: 'assets/images/level2/scattered_papers.png' }
];
```

#### Loading Method Enhancement
```javascript
// Add to AssetManager.js
async loadLevel2Assets() {
    console.log('Loading Level 2: The Shredded Letter assets...');
    try {
        await this.loadAssets(LEVEL2_ASSETS);
        console.log('Level 2 assets loaded successfully');
        return true;
    } catch (error) {
        console.error('Failed to load Level 2 assets:', error);
        return false;
    }
}

// Preload method for Level 2
preloadLevel2() {
    return this.loadLevel2Assets();
}
```

## Level2.js Implementation

### Class Structure
```javascript
/**
 * The Cold Case of Eleanor Ash - Level 2: The Shredded Letter
 * Letter reconstruction puzzle in evidence storage room
 */
class Level2 extends SokobanMechanics {
    constructor(gameEngine) {
        super(gameEngine);
        
        // Level-specific properties
        this.levelNumber = 2;
        this.title = "The Shredded Letter";
        this.isComplete = false;
        
        // Letter fragments data
        this.letterFragments = [
            { id: 'fragment-a', text: "If you come near me", placed: false, order: 1 },
            { id: 'fragment-b', text: "again, I'll go to", placed: false, order: 2 },
            { id: 'fragment-c', text: "the police. You don't", placed: false, order: 3 },
            { id: 'fragment-d', text: "control me anymore.", placed: false, order: 4 },
            { id: 'fragment-e', text: "I'm done being", placed: false, order: 5 },
            { id: 'fragment-f', text: "afraid of you.", placed: false, order: 6 },
            { id: 'fragment-g', text: "- D", placed: false, order: 7 }
        ];
        
        // Target positions for letter reconstruction (light table area)
        this.lightTableZone = { x: 2, y: 2, width: 2, height: 2 };
        this.showTargetHighlight = false;
        
        this.initLevel();
    }
}
```

### Grid Layout and Object Placement
```javascript
initLevel() {
    // Initialize 6x6 grid for Level 2
    this.initializeGrid(6, 6, 60);
    
    // Set up the evidence storage room
    this.setupEvidenceRoom();
    
    // Place letter fragments
    this.placeLetterFragments();
    
    // Set player starting position
    this.setPlayer(0, 5);
    
    console.log('Level 2: The Shredded Letter initialized');
}

setupEvidenceRoom() {
    // Add walls and immovable obstacles
    for (let x = 0; x < 6; x++) {
        this.addStaticObject(x, 0, 'wall', { description: 'Evidence room wall' });
        this.addStaticObject(x, 5, 'wall', { description: 'Evidence room wall' });
    }
    for (let y = 1; y < 5; y++) {
        this.addStaticObject(0, y, 'wall', { description: 'Evidence room wall' });
        this.addStaticObject(5, y, 'wall', { description: 'Evidence room wall' });
    }
    
    // Add evidence storage boxes (immovable obstacles)
    this.addStaticObject(1, 1, 'evidence-box', { description: 'Heavy evidence storage box' });
    this.addStaticObject(4, 1, 'evidence-box', { description: 'Heavy evidence storage box' });
    this.addStaticObject(1, 4, 'evidence-box', { description: 'Heavy evidence storage box' });
    this.addStaticObject(4, 4, 'evidence-box', { description: 'Heavy evidence storage box' });
    
    // Add light table target zone (2x2 area in center)
    this.addTargetZone(this.lightTableZone.x, this.lightTableZone.y, 
                      this.lightTableZone.width, this.lightTableZone.height, 'light-table');
    
    // Add wastebasket where fragments were found
    this.addStaticObject(5, 3, 'wastebasket', { 
        description: 'Metal wastebasket where letter fragments were discovered' 
    });
    
    // Add magnifying glass (movable tool)
    this.addPushableObject('magnifying-glass', 3, 1, 'magnifying-glass', { 
        description: 'Detective magnifying glass for examining evidence',
        canPush: true,
        isTool: true
    });
}
```

### Fragment Placement and Management
```javascript
placeLetterFragments() {
    // Place fragments strategically around the room
    const fragmentPositions = [
        { id: 'fragment-a', x: 2, y: 1, description: "If you come near me" },
        { id: 'fragment-b', x: 1, y: 2, description: "again, I'll go to" },
        { id: 'fragment-c', x: 4, y: 2, description: "the police. You don't" },
        { id: 'fragment-d', x: 3, y: 4, description: "control me anymore." },
        { id: 'fragment-e', x: 2, y: 4, description: "I'm done being" },
        { id: 'fragment-f', x: 1, y: 3, description: "afraid of you." },
        { id: 'fragment-g', x: 4, y: 3, description: "Signature: - D" },
        { id: 'fragment-h', x: 3, y: 3, description: "Grocery list (decoy)" } // Red herring
    ];
    
    fragmentPositions.forEach(fragment => {
        this.addPushableObject(fragment.id, fragment.x, fragment.y, 'letter-fragment', {
            description: fragment.description,
            fragmentData: this.letterFragments.find(f => f.id === fragment.id),
            isLetterFragment: true,
            isDecoy: fragment.id === 'fragment-h'
        });
    });
}
```

### Win Condition Logic
```javascript
checkWinCondition() {
    // Check if all letter fragments are in the light table area
    const fragmentsInTable = this.pushableObjects.filter(obj => 
        obj.data.isLetterFragment && 
        !obj.data.isDecoy && 
        this.isInLightTable(obj.x, obj.y)
    );
    
    const totalFragments = this.letterFragments.length;
    const placedFragments = fragmentsInTable.length;
    
    // Update progress
    this.game.ui.showProgressIndicator(placedFragments, totalFragments);
    
    if (placedFragments === totalFragments) {
        // Check if fragments are in correct reading order
        if (this.areFragmentsInCorrectOrder(fragmentsInTable)) {
            this.completeLevel();
            return true;
        }
    }
    
    return false;
}

areFragmentsInCorrectOrder(fragments) {
    // Sort fragments by their position in the light table
    fragments.sort((a, b) => {
        if (a.y !== b.y) return a.y - b.y; // Top to bottom
        return a.x - b.x; // Left to right
    });
    
    // Check if they're in the correct narrative order
    for (let i = 0; i < fragments.length; i++) {
        const expectedOrder = i + 1;
        if (fragments[i].data.fragmentData.order !== expectedOrder) {
            return false;
        }
    }
    
    return true;
}
```

### Custom Rendering Implementation
```javascript
render(ctx) {
    // Render background atmosphere
    this.renderBackground(ctx);
    
    // Render base Sokoban elements
    super.render(ctx);
    
    // Render level-specific elements
    this.renderLightTable(ctx);
    this.renderAtmosphere(ctx);
}

renderBackground(ctx) {
    // Evidence room background
    const bgImage = this.game.assetManager.getImage('evidence_room_background');
    if (bgImage) {
        ctx.drawImage(bgImage, 0, 0, this.game.canvas.width, this.game.canvas.height);
    } else {
        // Fallback: Cold institutional atmosphere
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    }
}

renderLightTable(ctx) {
    // Render the light table with glow effect
    const tableX = this.offsetX + (this.lightTableZone.x * this.cellSize);
    const tableY = this.offsetY + (this.lightTableZone.y * this.cellSize);
    const tableWidth = this.lightTableZone.width * this.cellSize;
    const tableHeight = this.lightTableZone.height * this.cellSize;
    
    // Light table glow
    const glowImage = this.game.assetManager.getImage('light_table_glow');
    if (glowImage) {
        ctx.drawImage(glowImage, tableX - 10, tableY - 10, tableWidth + 20, tableHeight + 20);
    } else {
        // Fallback: Simple glow effect
        const gradient = ctx.createRadialGradient(
            tableX + tableWidth/2, tableY + tableHeight/2, 0,
            tableX + tableWidth/2, tableY + tableHeight/2, tableWidth
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(tableX, tableY, tableWidth, tableHeight);
    }
    
    // Table border
    ctx.strokeStyle = this.showTargetHighlight ? '#00ff00' : '#cccccc';
    ctx.lineWidth = this.showTargetHighlight ? 3 : 1;
    ctx.strokeRect(tableX, tableY, tableWidth, tableHeight);
}
```

### Object Rendering Overrides
```javascript
renderObject(ctx, obj, x, y) {
    if (obj.data.isLetterFragment) {
        this.renderLetterFragment(ctx, obj, x, y);
    } else if (obj.type === 'magnifying-glass') {
        this.renderMagnifyingGlass(ctx, x, y);
    } else {
        // Default rendering
        super.renderObject(ctx, obj, x, y);
    }
}

renderLetterFragment(ctx, obj, x, y) {
    // Get the appropriate fragment image
    const fragmentImage = this.game.assetManager.getImage(obj.id.replace('-', '_'));
    
    if (fragmentImage) {
        // Render the actual letter fragment image
        ctx.drawImage(fragmentImage, x + 5, y + 5, this.cellSize - 10, this.cellSize - 10);
    } else {
        // Fallback: Simple paper representation
        ctx.fillStyle = obj.data.isDecoy ? '#f0f0f0' : '#f5f5dc';
        ctx.fillRect(x + 8, y + 8, this.cellSize - 16, this.cellSize - 16);
        
        // Add torn edge effect
        ctx.strokeStyle = '#d3d3d3';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 2]);
        ctx.strokeRect(x + 8, y + 8, this.cellSize - 16, this.cellSize - 16);
        ctx.setLineDash([]);
        
        // Add text preview
        ctx.fillStyle = obj.data.isDecoy ? '#666' : '#2d2d2d';
        ctx.font = '8px Arial';
        ctx.textAlign = 'center';
        const previewText = obj.data.description.substring(0, 8) + '...';
        ctx.fillText(previewText, x + this.cellSize / 2, y + this.cellSize / 2);
    }
    
    // Add subtle shadow for depth
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(x + 10, y + 10, this.cellSize - 16, this.cellSize - 16);
}
```

## Performance Considerations

### Memory Management
```javascript
// Efficient asset loading
preloadLevel2Assets() {
    // Only load Level 2 assets when needed
    if (!this.level2AssetsLoaded) {
        return this.game.assetManager.loadLevel2Assets().then(() => {
            this.level2AssetsLoaded = true;
        });
    }
    return Promise.resolve();
}

// Clean up when leaving level
cleanup() {
    // Optionally unload Level 2 assets to free memory
    if (this.game.settings.aggressiveMemoryManagement) {
        this.game.assetManager.clearAssets('level2');
    }
    super.cleanup();
}
```

### Rendering Optimization
```javascript
// Cache rendered fragments for better performance
cacheFragmentRendering() {
    this.fragmentCache = new Map();
    
    this.letterFragments.forEach(fragment => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = this.cellSize;
        canvas.height = this.cellSize;
        
        // Pre-render fragment to cache
        this.renderLetterFragment(ctx, { id: fragment.id, data: fragment }, 0, 0);
        this.fragmentCache.set(fragment.id, canvas);
    });
}
```

## Testing Framework

### Visual Testing
```javascript
// Test fragment visibility and alignment
testFragmentVisibility() {
    const testResults = [];
    
    this.letterFragments.forEach(fragment => {
        const image = this.game.assetManager.getImage(fragment.id.replace('-', '_'));
        testResults.push({
            fragment: fragment.id,
            imageLoaded: !!image,
            readable: this.isTextReadable(image),
            properSize: this.isProperSize(image)
        });
    });
    
    return testResults;
}

// Test letter reconstruction logic
testLetterReconstruction() {
    // Simulate placing all fragments in correct order
    const testFragments = this.letterFragments.map((fragment, index) => ({
        x: 2 + (index % 2),
        y: 2 + Math.floor(index / 2),
        data: { fragmentData: fragment }
    }));
    
    return this.areFragmentsInCorrectOrder(testFragments);
}
```

### Performance Testing
```javascript
// Monitor asset loading performance
measureAssetLoadTime() {
    const startTime = performance.now();
    
    return this.game.assetManager.loadLevel2Assets().then(() => {
        const loadTime = performance.now() - startTime;
        console.log(`Level 2 assets loaded in ${loadTime}ms`);
        return loadTime;
    });
}
```

## Integration Checklist

### Pre-Implementation
- [ ] All Level 2 images generated and placed in assets/images/level2/
- [ ] Image files properly named according to asset definitions
- [ ] Images optimized for web delivery (appropriate file sizes)
- [ ] Transparency properly applied to fragment edges

### Code Implementation
- [ ] AssetManager.js updated with Level 2 asset definitions
- [ ] Level2.js class created extending SokobanMechanics
- [ ] Grid layout and object placement implemented
- [ ] Fragment reconstruction logic implemented
- [ ] Custom rendering methods for letter fragments
- [ ] Win condition checking for correct letter assembly

### Testing and Validation
- [ ] All assets load without errors
- [ ] Fragment images display correctly in game
- [ ] Letter reconstruction puzzle mechanics work
- [ ] Performance acceptable on target devices
- [ ] Fallback rendering works when images unavailable
- [ ] Narrative progression flows correctly from Level 1

### Polish and Optimization
- [ ] Visual effects and animations added
- [ ] Sound effects integrated
- [ ] UI feedback for fragment placement
- [ ] Accessibility features implemented
- [ ] Memory usage optimized

This integration plan provides a complete roadmap for implementing the Level 2 visual assets, ensuring they work seamlessly with the existing game engine while delivering the intended narrative impact of the threatening letter revelation.