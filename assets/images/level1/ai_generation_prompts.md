# AI Image Generation Prompts for The Torn Photograph

## Master Prompt for Complete Photograph

### Primary Prompt
```
A 1940s noir-style black and white photograph showing an intimate moment between Eleanor Ash, a woman in her early 30s with shoulder-length hair and a genuine smile, wearing a casual 1940s dress or blouse, positioned center-left in the frame. Behind her stands a mystery man in his mid-30s with a confident smile, wearing a dark shirt or suit jacket, his hand possessively placed on Eleanor's shoulder. The photograph has dramatic noir lighting with high contrast, single strong light source creating deep shadows, shallow depth of field, film grain texture, and slight sepia undertones. The image should appear aged with minor scratches and soft edges, captured as an intimate portrait with authentic 1940s photography techniques.
```

### Style Modifiers
- `--style noir photography, 1940s vintage, high contrast black and white`
- `--lighting dramatic directional lighting, single light source, deep shadows`
- `--mood intimate candid moment, underlying tension, authentic vintage`
- `--quality film grain, aged photograph, sepia undertones, authentic wear`

## Individual Fragment Prompts

### Fragment A: Eleanor's Face
```
Close-up of Eleanor Ash's face from a 1940s noir photograph, woman in early 30s with genuine warm smile, bright eyes, natural makeup, shoulder-length period hairstyle, high contrast black and white photography with dramatic lighting, film grain texture, aged vintage photograph with irregular torn edges along jawline and temple, sepia undertones
```

### Fragment B: Eleanor's Shoulder
```
Fragment of 1940s photograph showing woman's shoulder and upper arm in period-appropriate dress or blouse, fabric texture clearly visible, moderate noir lighting with some shadows, black and white vintage photography with film grain, torn edges along shoulder line, aged photograph fragment
```

### Fragment C: Man's Hand (Key Evidence)
```
Isolated fragment of 1940s noir photograph showing masculine hand resting possessively on woman's shoulder, dramatic shadow casting, high contrast black and white, possibly wearing ring, intimate gesture, torn edges isolating just hand and wrist, aged vintage photograph fragment with film grain
```

### Fragment D: Man's Torso
```
Fragment of 1940s photograph showing man's chest and upper torso in dark shirt or suit jacket, quality period clothing, partially in shadow, noir lighting, black and white vintage photography, vertical torn edges, aged photograph fragment with authentic wear
```

### Fragment E: Man's Face (The Revelation)
```
Fragment of 1940s noir photograph showing man's face, mid-30s with confident slightly possessive smile, strong jawline, period hairstyle, well-groomed, dramatic noir lighting on facial features, high contrast black and white, torn edges preserving facial features, aged vintage photograph fragment
```

## Alternative Prompt Approaches

### Cinematic Style Prompts
For more dramatic noir effect:
```
Film still from 1940s noir movie, intimate scene between Eleanor and mystery man, dramatic chiaroscuro lighting, high contrast cinematography, aged photograph aesthetic, torn and weathered
```

### Photography-Focused Prompts
For authentic vintage photography:
```
Authentic 1940s portrait photography, studio lighting setup, period-accurate clothing and hairstyles, genuine vintage camera techniques, aged silver gelatin print, naturally torn photograph
```

### Emotional Context Prompts
For narrative weight:
```
Secret relationship photograph from 1940s, hidden romance, intimate moment captured, evidence of Eleanor's secret life, noir atmosphere, dramatic revelation, torn apart to hide evidence
```

## Technical Generation Settings

### Recommended Parameters
- **Aspect Ratio**: 4:3 or 3:4 for portrait orientation
- **Resolution**: High (1024x1024 minimum)
- **Style Weight**: Medium to High for noir characteristics
- **Seed Consistency**: Use same seed for fragment variations
- **Negative Prompts**: "modern clothing, digital photography, color, clean edges, perfect condition"

### Quality Enhancers
- `photorealistic, highly detailed, professional photography`
- `authentic vintage, period accurate, historical accuracy`
- `dramatic lighting, professional portrait, studio quality`
- `aged photograph, vintage patina, authentic wear patterns`

## Fragment-Specific Generation Strategy

### Step 1: Generate Complete Image
1. Use master prompt to create full photograph
2. Ensure both characters are clearly visible
3. Verify noir lighting and period accuracy
4. Check that composition allows for fragment division

### Step 2: Create Fragment Masks
1. Manually mark tear lines on complete image
2. Ensure fragments will fit together logically
3. Plan overlap areas for puzzle mechanics
4. Consider gameplay visibility requirements

### Step 3: Generate Individual Fragments
1. Use fragment-specific prompts
2. Maintain lighting consistency with master image
3. Add realistic torn edge effects
4. Apply appropriate aging to each piece

## Post-Generation Processing

### Required Edits
1. **Torn Edges**: Add realistic paper tear textures
2. **Aging Effects**: Apply consistent vintage patina
3. **Fragment Fitting**: Ensure pieces align properly
4. **Size Optimization**: Scale for game requirements
5. **Transparency**: Add alpha channel for torn edges

### Quality Checklist
- [ ] Period accuracy (clothing, hair, photography style)
- [ ] Noir lighting consistency across all fragments
- [ ] Realistic torn edge patterns
- [ ] Proper contrast for gameplay visibility
- [ ] Emotional impact of complete reconstruction
- [ ] Technical compatibility with game engine

## Backup Prompt Variations

### If Initial Results Need Adjustment

**More Dramatic Noir:**
```
High contrast film noir photograph, 1940s detective story aesthetic, dramatic shadows, venetian blind lighting effects, mystery and intrigue
```

**More Intimate/Personal:**
```
Private personal photograph, candid moment, genuine emotion, intimate lighting, secret relationship, hidden from public view
```

**More Aged/Weathered:**
```
Heavily aged photograph, decades old, multiple tear marks, faded edges, historical document, evidence from cold case
```

## Usage Instructions

1. **Start with Master Prompt**: Generate the complete photograph first
2. **Iterate for Quality**: Adjust prompts based on initial results
3. **Maintain Consistency**: Use similar parameters for all fragments
4. **Test Fragment Assembly**: Verify pieces fit together logically
5. **Apply Post-Processing**: Add final aging and edge effects
6. **Integrate with Game**: Test visibility and impact in game context

## Expected Emotional Journey

When players reconstruct the photograph:
1. **Fragment A**: "Eleanor looks happy, not depressed"
2. **Fragment B**: "She's well-dressed, not preparing for suicide"
3. **Fragment C**: "Someone else was there with her"
4. **Fragment D**: "A man, well-dressed, significant relationship"
5. **Fragment E**: "His face - who is this man? Why was this hidden?"

The complete reconstruction should deliver the narrative punch: Eleanor wasn't alone and wasn't suicidal - someone was with her, and someone tried to destroy this evidence.