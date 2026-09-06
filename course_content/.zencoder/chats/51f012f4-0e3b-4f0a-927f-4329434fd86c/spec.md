# Technical Specification - Travel English A1 Pilot Week Improvements

## 1. Technical Context
- **Language**: TypeScript (JSON for content).
- **Assets**: PNG images for slides and discovery points.
- **Audio**: MP3 files (assumed available or to be generated later).
- **Testing**: JSON schema validation and visual check.

## 2. Implementation Approach

### 2.1 Content Updates (JSON)
We will modify the following files in `src/content/cursos/viajes/a1/trimestre1/semana01/`:
- `theory.json`: 
    - Update `theorySlides` to include "Tricky Consonants" (G, J, H, Y, R).
    - Fix missing image paths if necessary.
- `lesson2.json`:
    - Add exercises focused on spelling with these new consonants.
- `lesson3.json`:
    - Add a new exercise type: `dialogue-ordering` for ordering at the café.
- **Standardization**:
    - Ensure all `id` fields are unique across the week.
    - Add `difficulty: "beginner"` to all exercise objects.

### 2.2 Asset Restoration
- We will create a new script `scripts/generate-travel-placeholders.py` based on `scripts/create_placeholders.py`.
- This script will generate 1280x720 PNG placeholders for:
    - `airport_discovery.png`
    - `alphabet_theory.png`
    - `greetings_clock.png`
    - `info_desk_zoom.png`
    - `introduction_lesson.png`
    - `cafe_counter.png`
    - `courtesy_lesson.png`
- We will place these in `public/assets/courses/travel-a1/images/`.
- We will ensure `public/favicon.ico` exists (copying an existing icon or creating a basic one).

### 2.3 New Exercise Type: Dialogue Ordering
While the frontend already supports several exercise types, we need to ensure the JSON structure for `dialogue-ordering` is correct:
```json
{
  "id": "trv-a1-s1-l3-ex-dialogue",
  "type": "dialogue-ordering",
  "title": "Order your Coffee",
  "instructions": "Put the conversation in the correct order.",
  "questions": [
    {
      "id": "q-d1",
      "sentences": [
        "Hello, a coffee, please.",
        "Sure! Anything else?",
        "No, thank you.",
        "That's $3.00, please."
      ],
      "correctOrder": [0, 1, 2, 3]
    }
  ]
}
```
*Note: I will verify if the frontend supports `dialogue-ordering`. If not, I will use `multiple-choice` to simulate it or stick to existing supported types.*

## 3. Source Code Structure Changes
- `src/content/cursos/viajes/a1/trimestre1/semana01/*.json` (Updated)
- `public/assets/courses/travel-a1/images/*.png` (New placeholders)
- `scripts/generate-travel-placeholders.py` (New script)

## 4. Delivery Phases
1. **Phase 1: Asset Generation**: Run script to fix 404s.
2. **Phase 2: Theory Expansion**: Update `theory.json` with consonants.
3. **Phase 3: Exercise Enhancement**: Update lessons with new exercises and IDs.
4. **Phase 4: Validation**: Run `npm run validate-exercises`.

## 5. Verification Approach
- **Validation**: `npm run validate-exercises` (if it covers the new course).
- **Manual Check**: Verify image existence in `public/assets`.
- **Linting**: Ensure JSON remains valid.
