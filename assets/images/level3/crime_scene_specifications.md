# Crime Scene Visual Specifications - Level 3

## Overview
Level 3 presents Eleanor's apartment as a crime scene where players must reconstruct the true events by repositioning evidence objects. The visual design must clearly show contradictions between the "official" staged suicide scene and the actual murder scene.

## Crime Scene Environment

### Eleanor's 1940s Apartment Layout
**Room Dimensions**: 8x8 grid (448x392 pixels at 56px per cell)
**Setting**: Eleanor's bedroom/sitting area, frozen as crime scene
**Time Period**: 1940s interior design with period-accurate furnishings
**Atmosphere**: Clinical, haunting, with harsh police lighting

### Color Palette
- **Primary**: Muted grays (#4a4a4a, #6a6a6a, #8a8a8a)
- **Secondary**: Faded browns (#8b4513, #a0522d, #cd853f)
- **Accent**: Cold blue-grays (#708090, #778899, #b0c4de)
- **Evidence**: Bright red (#dc143c) for blood, yellow (#ffd700) for markers
- **Lighting**: Harsh white (#f5f5f5) with deep shadows (#1a1a1a)

## Moveable Evidence Objects

### 1. Chair Evidence
**Purpose**: Shows Eleanor tried to escape vs. staged "accident"

#### Chair - Wrong Position (Staged)
- **Filename**: `evidence_chair_knocked.png`
- **Description**: Wooden 1940s chair "accidentally" knocked over near window
- **Position**: Suggests Eleanor fell while attempting suicide
- **Visual Details**: 
  - Dark oak wood with period-appropriate design
  - Positioned as if knocked over during "suicide attempt"
  - No signs of struggle, clean positioning
  - Subtle dust patterns suggesting recent placement

#### Chair - Correct Position (Murder)
- **Filename**: `evidence_chair_correct.png`
- **Description**: Same chair positioned near door, showing escape attempt
- **Position**: Reveals Eleanor was trying to flee when attacked
- **Visual Details**:
  - Same chair but positioned near apartment door
  - Scuff marks on floor showing dragged movement
  - One leg slightly damaged from struggle
  - Blood spatter pattern consistent with attack location

### 2. Gun Evidence
**Purpose**: Proves gun was placed in wrong hand post-mortem

#### Gun - Wrong Hand (Staged)
- **Filename**: `evidence_gun_wrong_hand.png`
- **Description**: 1940s revolver placed in Eleanor's non-dominant hand
- **Visual Details**:
  - Period-accurate .38 caliber revolver
  - Positioned in left hand (Eleanor was right-handed)
  - Clean placement, no struggle indicators
  - Fingerprints only on grip (staged)

#### Gun - Correct Position (Murder)
- **Filename**: `evidence_gun_correct.png`
- **Description**: Gun showing actual position after struggle
- **Visual Details**:
  - Same revolver but dropped/thrown position
  - Located away from body, consistent with attacker dropping it
  - Fingerprints smudged from struggle
  - Slight blood spatter on barrel

### 3. Blood Evidence
**Purpose**: Shows actual location of attack vs. staged scene

#### Blood - Official Location (Staged)
- **Filename**: `evidence_blood_official.png`
- **Description**: Blood spatter marker in "suicide" location
- **Visual Details**:
  - Small, contained blood pool near window
  - Pattern consistent with self-inflicted wound
  - Clean, minimal spatter
  - Police evidence marker #1

#### Blood - Actual Location (Murder)
- **Filename**: `evidence_blood_actual.png`
- **Description**: True blood spatter showing struggle location
- **Visual Details**:
  - Larger blood spatter pattern near door
  - Multiple impact points showing struggle
  - Drag marks toward staged location
  - Evidence of cleanup attempt

### 4. Body Outline Evidence
**Purpose**: Shows true position vs. staged position

#### Body Outline - Staged (Official)
- **Filename**: `evidence_body_outline_staged.png`
- **Description**: Chalk outline in "suicide" position
- **Visual Details**:
  - Clean chalk outline near window
  - Position suggests self-inflicted wound
  - Arms positioned to hold gun
  - No signs of struggle in positioning

#### Body Outline - Murder (Actual)
- **Filename**: `evidence_body_outline_murder.png`
- **Description**: True body position showing murder
- **Visual Details**:
  - Chalk outline near door/chair
  - Defensive wounds position indicated
  - Arms positioned showing struggle
  - Angle inconsistent with suicide

### 5. Window Evidence
**Purpose**: Shows killer's escape route vs. staged suicide method

#### Window - Closed (Staged)
- **Filename**: `evidence_window_closed.png`
- **Description**: Window closed to suggest Eleanor didn't jump
- **Visual Details**:
  - 1940s apartment window, fully closed
  - Clean glass, no disturbance
  - Curtains neatly arranged
  - No evidence of opening

#### Window - Open (Escape Route)
- **Filename**: `evidence_window_open.png`
- **Description**: Window showing killer's actual escape route
- **Visual Details**:
  - Same window but partially open
  - Disturbed curtains showing recent movement
  - Slight scuff marks on windowsill
  - Fire escape visible outside

### 6. Lamp Evidence
**Purpose**: Shows struggle damage vs. staged "accident"

#### Lamp - Broken (Struggle)
- **Filename**: `evidence_lamp_broken.png`
- **Description**: Table lamp broken during actual struggle
- **Visual Details**:
  - 1940s art deco table lamp
  - Shade torn and base cracked
  - Positioned showing impact from struggle
  - Glass fragments scattered realistically
  - Electrical cord pulled from wall

## Evidence Markers and Tags

### Police Evidence Markers
**Purpose**: Numbered markers that must be repositioned to show true sequence

#### Marker Set (1-6)
- **Filenames**: `evidence_marker_1.png` through `evidence_marker_6.png`
- **Description**: Official police evidence markers
- **Visual Details**:
  - Yellow triangular markers with black numbers
  - Period-accurate 1940s police evidence style
  - Weathered appearance from age
  - Each marker 28x28 pixels (half cell size)

### Crime Scene Tape
- **Filename**: `police_tape.png`
- **Description**: Yellow police tape overlay
- **Visual Details**:
  - "POLICE LINE DO NOT CROSS" text
  - Slightly torn and aged appearance
  - Semi-transparent overlay effect
  - Can be moved to reveal hidden evidence

## Static Furniture Objects

### Bed
- **Filename**: `apartment_bed.png`
- **Description**: Eleanor's 1940s bed (immovable)
- **Visual Details**:
  - Dark wood frame with period-appropriate design
  - Rumpled bedding suggesting disturbance
  - One pillow on floor (sign of struggle)
  - Nightgown laid out (Eleanor was dressed when killed)

### Nightstand
- **Filename**: `apartment_nightstand.png`
- **Description**: Bedside table with evidence
- **Visual Details**:
  - Matching dark wood to bed
  - Drawer slightly open showing contents
  - Water glass knocked over
  - Book open to specific page (potential clue)

### Dresser
- **Filename**: `apartment_dresser.png`
- **Description**: Large dresser with mirror
- **Visual Details**:
  - Heavy 1940s furniture piece
  - Mirror cracked from impact
  - Top drawer pulled out
  - Personal items scattered

### Bookshelf
- **Filename**: `apartment_bookshelf.png`
- **Description**: Wall bookshelf with displaced items
- **Visual Details**:
  - Built-in shelving with books and personal items
  - Several books knocked to floor
  - Empty spaces showing removed items
  - Dust patterns revealing recent disturbance

## Atmospheric Elements

### Lighting Effects
- **Filename**: `crime_scene_lighting.png`
- **Description**: Harsh institutional lighting overlay
- **Visual Details**:
  - Cold, bright white light from multiple sources
  - Sharp shadows creating dramatic contrast
  - Light beams visible through dust particles
  - Clinical, sterile atmosphere

### Shadow Overlay
- **Filename**: `shadow_overlay.png`
- **Description**: Dramatic noir shadows
- **Visual Details**:
  - Deep black shadows in corners
  - Venetian blind light patterns
  - Creates claustrophobic atmosphere
  - Highlights evidence through contrast

### Investigation Tools
- **Filename**: `investigation_tools.png`
- **Description**: Detective's equipment scattered around
- **Visual Details**:
  - Magnifying glass, measuring tape, camera
  - Evidence collection bags
  - Notebook with sketches
  - Fingerprint powder and brush

## Technical Requirements

### Resolution and Format
- **Scene Background**: 1000x700 pixels (full 8x8 grid)
- **Individual Objects**: 56x56 pixels (single cell)
- **Large Objects**: 112x56 or 56x112 pixels (multi-cell)
- **Format**: PNG with alpha transparency
- **Color Depth**: 32-bit RGBA

### Animation States
Each moveable object requires two states:
1. **Staged State**: Official crime scene positioning
2. **Truth State**: Actual murder scene positioning

### Layering System
1. **Background Layer**: Apartment interior
2. **Static Objects Layer**: Immovable furniture
3. **Evidence Layer**: Moveable evidence objects
4. **Overlay Layer**: Lighting, shadows, tape
5. **UI Layer**: Evidence markers, tooltips

## Gameplay Integration

### Visual Feedback
- **Correct Placement**: Subtle green glow around properly positioned evidence
- **Incorrect Placement**: Red outline for misplaced objects
- **Contradiction Revealed**: Flash effect when truth is uncovered
- **Timeline Animation**: Objects show movement arrows when correctly placed

### Progressive Revelation
1. **Stage 1**: Player sees "official" staged scene
2. **Stage 2**: Moving objects reveals inconsistencies
3. **Stage 3**: Correct positioning shows true crime sequence
4. **Stage 4**: Complete reconstruction reveals murder timeline
5. **Stage 5**: Final animation shows actual events

### Emotional Impact
The visual design must deliver the emotional punch of discovering that Eleanor was murdered and the scene was carefully staged to cover up the crime. The contrast between the staged and actual scenes should be visually striking and narratively satisfying.