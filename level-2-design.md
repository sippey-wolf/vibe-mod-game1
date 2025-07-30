# Level 2: The Shredded Letter - Detailed Design

## Overview
**Grid Size**: 6x6  
**Theme**: Letter reconstruction in evidence storage room  
**Narrative Goal**: Reveal Eleanor's fear and the threat from "D"  
**Emotional Arc**: Investigation → Tension → Dread  

## Visual Environment
- **Setting**: Cold, institutional evidence storage room
- **Atmosphere**: Clinical, sterile, slightly ominous
- **Color Palette**: Cool grays, blues, stark white light table
- **Key Props**: Metal shelves, evidence boxes, glowing light table

## Sokoban Mechanics

### Grid Layout
```
[W] [W] [W] [W] [W] [W]
[W] [S] [.] [.] [S] [W]
[W] [.] [.] [.] [.] [W]
[W] [.] [C] [.] [.] [W]
[W] [S] [.] [.] [S] [W]
[W] [W] [L] [L] [W] [W]

W = Wall/Metal shelving
S = Storage boxes (immovable obstacles)
C = Player character (detective)
L = Light table (target zone - 2x1 area)
. = Empty floor space
```

### Letter Strips (Pushable Objects)
**7 strips total**, representing torn letter pieces:

1. **Strip A**: "If you come near me"
2. **Strip B**: "again, I'll go to"
3. **Strip C**: "the police. You don't"
4. **Strip D**: "control me anymore."
5. **Strip E**: "I'm done being"
6. **Strip F**: "afraid of you."
7. **Strip G**: "Signed: E" + envelope with "D"

### Advanced Mechanics
- **Sequential Ordering**: Strips must be placed in correct reading order
- **Orientation Matters**: Some strips may need to be "rotated" (different push directions)
- **Light Table Constraint**: Only 3 strips fit on light table at once
- **Reading Mechanic**: Player must arrange strips, read partial message, then rearrange

### Puzzle Complexity Features
1. **Multi-Stage Assembly**: 
   - Stage 1: Arrange first 3 strips to read opening
   - Stage 2: Move completed strips aside, arrange next 3
   - Stage 3: Final strip + signature reveals "D" initial

2. **Decoy Strips**: 
   - False strip with different handwriting
   - Blank strip (red herring)
   - Strip from different letter (wrong case)

3. **Storage Box Obstacles**:
   - Some boxes can be pushed to create paths
   - Others are immovable (too heavy)
   - Creates navigation puzzles within the letter assembly

### Interactive Storytelling Elements
1. **Evidence Tags**: Each strip has a small evidence tag number
2. **Handwriting Analysis**: Strips show different ink colors/pen types
3. **Paper Aging**: Some strips more yellowed/damaged than others
4. **Forensic Details**: Fingerprint dust residue on certain strips

### Red Herrings & Misdirection
1. **Wrong Letter Fragments**:
   - Strip from Eleanor's grocery list
   - Fragment of love letter (different relationship)
   - Official document piece (lease agreement)

2. **Environmental Distractions**:
   - Other case files visible on shelves
   - Evidence from different crimes
   - Red herring "D" names on other case labels

### Win Condition Mechanics
**Three-Phase Victory**:
1. **Phase 1**: Arrange strips 1-3, read partial threat
2. **Phase 2**: Rearrange for strips 4-6, escalation revealed
3. **Phase 3**: Final strip placement reveals signature and "D" initial

### Interactive Feedback System
- **Strip Hover**: Shows faint text preview
- **Correct Sequence**: Strips align with subtle magnetic effect
- **Wrong Order**: Text appears jumbled/unreadable
- **Light Table**: Illuminates text more clearly when properly placed
- **Completion**: Dramatic lighting change, letter becomes fully legible

### Technical Specifications
- **Canvas Size**: 900x600 pixels
- **Grid Cell Size**: 60x60 pixels (slightly smaller for 6x6 fit)
- **Text Rendering**: High-contrast fonts for readability
- **Animation**: Smooth strip sliding with paper texture effects
- **Asset Requirements**:
  - 7 letter strip sprites with handwritten text
  - 3 decoy strip sprites
  - Evidence storage room background
  - Light table glow effects
  - Metal shelf and box sprites

### Accessibility Features
- **Text Size**: Scalable font options for letter content
- **High Contrast**: Enhanced text visibility mode
- **Audio**: Text-to-speech for letter content when assembled
- **Navigation**: Tab-order support for keyboard users
- **Hints**: Outline system shows correct strip positions

### Narrative Integration
- **Pre-puzzle**: Player discovers hidden evidence envelope
- **During puzzle**: Growing tension as threat becomes clear
- **Mid-puzzle**: Realization that Eleanor was being stalked/threatened
- **Post-puzzle**: Full letter reveals fear and "D" initial
- **Transition**: Player connects this to the photo's mysterious man

### Emotional Pacing
- **Opening**: Clinical, procedural feeling
- **Middle**: Growing unease as threat emerges
- **Climax**: Shock at the direct threat language
- **Resolution**: Grim determination to find "D"

## Advanced Features
### Forensic Mode Toggle
- **Normal View**: Standard letter reconstruction
- **UV Light Mode**: Reveals additional details (fingerprints, ink analysis)
- **Magnification**: Zoom feature for examining handwriting details

### Evidence Chain Integration
- **Photo Connection**: Subtle visual callback to Level 1's mysterious man
- **Foreshadowing**: Hints about Level 3's crime scene staging
- **Case File Updates**: Player's notebook automatically records findings