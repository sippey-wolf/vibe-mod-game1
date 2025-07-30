# Level 1: The Torn Photograph - Detailed Design

## Overview
**Grid Size**: 5x5  
**Theme**: Photo reconstruction in Eleanor's apartment  
**Narrative Goal**: Reveal the hidden man in Eleanor's life  
**Emotional Arc**: Curiosity → Discovery → Suspicion  

## Visual Environment
- **Setting**: Eleanor's desk area with warm lamp lighting
- **Atmosphere**: Intimate, nostalgic, slightly melancholic
- **Color Palette**: Dusty browns, faded blues, warm amber highlights
- **Key Props**: Empty photo frame, scattered fragments, desk lamp

## Sokoban Mechanics

### Grid Layout
```
[W] [W] [W] [W] [W]
[W] [.] [.] [.] [F] <- Photo frame (target area)
[W] [.] [C] [.] [.]
[W] [.] [.] [B] [.]
[W] [W] [W] [W] [W]

W = Wall/Obstacle (desk edges, chair, books)
. = Empty floor space
C = Player character (detective)
F = Photo frame (target zone)
B = Book stack (immovable obstacle)
```

### Photo Fragments (Pushable Objects)
**5 fragments total**, each revealing part of the story:

1. **Fragment A**: Eleanor's face (smiling, happy)
2. **Fragment B**: Eleanor's shoulder/arm
3. **Fragment C**: Man's hand on Eleanor's shoulder
4. **Fragment D**: Man's torso/shirt
5. **Fragment E**: Man's face (the key revelation)

### Puzzle Mechanics
- **Movement**: Standard Sokoban - push objects, can't pull
- **Target Zone**: 2x3 area representing the photo frame
- **Win Condition**: All 5 fragments arranged in correct positions within frame
- **Difficulty**: Introductory - focuses on basic mechanics and story setup

### Fragment Placement Strategy
**Starting positions** (scattered around room):
- Fragment A: Near lamp (well-lit, draws attention first)
- Fragment B: Under chair (requires moving chair obstacle)
- Fragment C: Corner position (easy to access)
- Fragment D: Behind book stack (requires navigation)
- Fragment E: Furthest from frame (saved for last, builds suspense)

### Red Herrings & Storytelling Elements
1. **Decoy Objects**: 
   - Old newspaper clipping (pushable but not needed)
   - Coffee cup (immovable, adds atmosphere)
   - Pen (pushable, red herring)

2. **Environmental Storytelling**:
   - Dust patterns show where photo originally sat
   - Broken glass near frame suggests violence/anger
   - Lamp positioning creates dramatic lighting on completed photo

### Interactive Feedback
- **Fragment Hover**: Subtle highlight, shows partial image preview
- **Correct Placement**: Fragment snaps into position with soft click
- **Wrong Placement**: Fragment slides back slightly, no harsh rejection
- **Completion**: Warm light effect, photo becomes fully visible

### Win State Reveal
When puzzle completes:
1. **Visual**: Photo assembles with smooth animation
2. **Audio**: Soft camera shutter sound
3. **Lighting**: Lamp light intensifies on completed photo
4. **UI**: Magnifying glass cursor appears for closer inspection
5. **Narrative Trigger**: Click to examine reveals the man's face clearly

### Accessibility Features
- **Visual**: High contrast mode available
- **Motor**: Click-and-drag alternative to arrow keys
- **Cognitive**: Hint system shows fragment outlines in target positions
- **Progress**: Move counter and undo functionality

### Technical Specifications
- **Canvas Size**: 800x600 pixels (scales to fit 16:9 viewport)
- **Grid Cell Size**: 64x64 pixels
- **Animation Duration**: 300ms for smooth movement
- **Asset Requirements**: 
  - 5 photo fragment sprites (torn edges, weathered look)
  - Room background with lighting effects
  - Interactive object sprites (chair, books, lamp, etc.)
  - Particle effects for completion sequence

## Narrative Integration
- **Pre-puzzle**: Player examines empty frame, notices missing photo
- **During puzzle**: Each fragment placement reveals more of the relationship
- **Post-puzzle**: Full photo shows Eleanor with mysterious man
- **Transition**: Player's internal monologue questions who this man is