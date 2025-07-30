# Level 3: Crime Scene Reenactment - Detailed Design

## Overview
**Grid Size**: 8x8  
**Theme**: Crime scene reconstruction in Eleanor's bedroom  
**Narrative Goal**: Prove the suicide was staged, reveal murder  
**Emotional Arc**: Determination → Revelation → Justice  

## Visual Environment
- **Setting**: Eleanor's bedroom, frozen in time as crime scene
- **Atmosphere**: Eerie, clinical, haunting
- **Color Palette**: Muted with dark reds, faded browns, cold blue-grays
- **Key Props**: Chalk outline, evidence markers, overturned furniture

## Sokoban Mechanics

### Grid Layout
```
[W] [W] [W] [W] [W] [W] [W] [W]
[W] [.] [.] [.] [.] [.] [N] [W]
[W] [.] [B] [.] [.] [.] [.] [W]
[W] [.] [.] [O] [.] [.] [.] [W]
[W] [.] [.] [.] [C] [.] [.] [W]
[W] [.] [.] [.] [.] [D] [.] [W]
[W] [.] [.] [.] [.] [.] [.] [W]
[W] [W] [W] [W] [W] [W] [W] [W]

W = Walls/Room boundaries
B = Bed (immovable)
N = Nightstand (immovable)
D = Dresser (immovable)
O = Original chalk outline (reference)
C = Player character (detective)
. = Floor space
```

### Moveable Evidence Objects
**Primary Objects** (must be repositioned):
1. **Chair**: Knocked over, wrong position in official scene
2. **Wine Bottle**: Placed to suggest suicide, actually murder weapon
3. **Lamp**: Broken, positioned to hide struggle evidence
4. **Blood Marker**: Shows where blood actually was vs. official report
5. **Body Outline Chalk**: New outline showing actual death position
6. **Evidence Tags**: Numbered markers that need repositioning

### Complex Mechanics
**Contradiction System**:
- **Official Scene**: Objects in "suicide" positions (wrong)
- **True Scene**: Objects in actual murder positions (correct)
- **Player Task**: Move objects to contradict official story

**Multi-Object Coordination**:
- Some objects must be moved in sequence
- Chair position affects lamp placement
- Blood marker reveals true struggle location
- Body outline changes based on other evidence

### Advanced Puzzle Elements
1. **Forensic Logic**:
   - Blood spatter patterns guide object placement
   - Furniture damage indicates struggle direction
   - Window vs. door positioning reveals escape route

2. **Timeline Reconstruction**:
   - Objects show sequence of events
   - Each correct placement reveals part of the timeline
   - Final arrangement tells complete murder story

3. **Evidence Chain Validation**:
   - Placement must be consistent with Levels 1 & 2
   - Photo man's height affects body outline
   - Letter threat connects to struggle evidence

### Red Herrings & Misdirection
1. **False Evidence**:
   - Suicide note (planted, wrong handwriting)
   - Pills bottle (red herring, Eleanor wasn't depressed)
   - Window positioning (suggests suicide jump, actually escape route)

2. **Staged Elements**:
   - Chair "accidentally" knocked over (actually moved post-mortem)
   - Wine bottle positioned for "last drink" (actually murder weapon)
   - Lamp broken "in fall" (actually broken in struggle)

### Win Condition: Contradiction Proof
**Three-Stage Victory**:
1. **Stage 1**: Reposition furniture to show struggle occurred
2. **Stage 2**: Move blood evidence to contradict official report
3. **Stage 3**: Place new body outline showing actual death position

**Victory Requirements**:
- Chair positioned near door (Eleanor tried to escape)
- Wine bottle shows impact pattern (murder weapon)
- Blood marker shows struggle location (not suicide spot)
- Body outline contradicts official positioning
- Evidence tags renumbered to show true sequence

### Interactive Storytelling Features
1. **Forensic Overlay Mode**:
   - Toggle between "Official Scene" and "True Scene"
   - Shows contradictions in real-time
   - Highlights inconsistencies as player progresses

2. **Evidence Photography**:
   - Player can "photograph" corrected scene
   - Before/after comparison with official photos
   - Creates evidence for final case presentation

3. **Timeline Visualization**:
   - Objects show movement arrows when correctly placed
   - Sequence of events becomes clear through positioning
   - Final timeline animation shows the actual murder

### Technical Specifications
- **Canvas Size**: 1000x700 pixels (larger for 8x8 complexity)
- **Grid Cell Size**: 56x56 pixels
- **Layered Rendering**: Multiple evidence layers (blood, chalk, objects)
- **Animation System**: Complex multi-object movement sequences
- **Asset Requirements**:
  - Detailed bedroom background with crime scene elements
  - Multiple furniture sprites with damage states
  - Blood spatter and chalk outline graphics
  - Evidence marker and tag sprites
  - Before/after comparison UI elements

### Accessibility Features
- **Forensic Mode**: High contrast evidence highlighting
- **Audio Cues**: Different sounds for correct vs. incorrect placement
- **Hint System**: Shows contradiction points when stuck
- **Simplified Mode**: Reduces visual complexity while maintaining logic

### Emotional Impact Design
1. **Atmosphere Building**:
   - Subtle audio: clock ticking, distant traffic
   - Lighting shifts as truth emerges
   - Temperature change (cold to warm) as justice approaches

2. **Revelation Moments**:
   - Each correct placement triggers realization
   - Visual effects emphasize contradictions
   - Final arrangement creates powerful "aha" moment

### Narrative Integration
- **Pre-puzzle**: Player reviews official crime scene photos
- **During puzzle**: Growing certainty that scene was staged
- **Mid-puzzle**: Connections to photo man and threatening letter
- **Post-puzzle**: Complete contradiction of suicide ruling
- **Transition**: Evidence package ready for district attorney

### Advanced Features
**Case File Integration**:
- **Photo Evidence**: Level 1 photo appears as reference
- **Letter Evidence**: Level 2 letter connects to struggle
- **Timeline Sync**: All three levels create coherent murder timeline

**Multiple Solutions**:
- **Primary Solution**: Standard contradiction proof
- **Expert Solution**: Additional evidence placement for stronger case
- **Perfect Solution**: All evidence perfectly aligned with true timeline

### Difficulty Scaling
1. **Guided Mode**: Hints show where objects should go
2. **Detective Mode**: Standard puzzle with minimal hints
3. **Expert Mode**: No hints, must deduce from evidence alone
4. **Master Detective**: Time pressure, perfect accuracy required

## Victory Sequence
**Final Revelation Animation**:
1. **Scene Transformation**: Room shifts from "official" to "true" scene
2. **Timeline Playback**: Shows actual murder sequence
3. **Evidence Compilation**: All three levels' evidence combines
4. **Case Closed**: Transition to final narrative conclusion

### Connection to Overall Game
- **Completes Evidence Triangle**: Photo + Letter + Scene = Murder Case
- **Satisfies Player Agency**: Player actively proves the truth
- **Emotional Payoff**: Justice for Eleanor through player's detective work
- **Narrative Closure**: Sets up final confrontation with "D"