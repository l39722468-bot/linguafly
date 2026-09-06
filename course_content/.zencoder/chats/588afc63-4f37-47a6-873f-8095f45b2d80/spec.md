# Technical Specification - A1 Course Rebuild

## 1. Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Content Format**: JSON files in `src/content/cursos/ingles-a1/`
- **Validation**: JSON Schema (implicitly via TypeScript types and potential scripts)

## 2. Implementation Approach
- We will generate new JSON units that follow the structure found in `src/content/cursos/ingles-a1/unit5.json`.
- Each unit will include:
    - `course` metadata.
    - `learning_outcomes`.
    - `blocks` containing multiple `interaction` objects.
- We will intermix exercise types (`multiple_choice`, `matching`, `reorder_words`, etc.) to maintain engagement.
- Vocabulary from different sections of the source material will be blended across units.

## 3. Proposed Unit Structure
Based on the provided material, we will define the following units:

1. **Unit 1: Describing Things & People** (Adjectives position, Singular/Plural, Common Mistakes: 'a'/'an', 'information').
2. **Unit 2: How We Do Things** (Adverbs vs Adjectives, Regular/Irregular adverbs, 'well' vs 'good').
3. **Unit 3: Routines & Frequency** (Frequency Adverbs Group 1 & 2, Days of the week, Capital Letters).
4. **Unit 4: Sequence & Time** (After, Then, Afterwards, Ordinals, Dates, Months).
5. **Unit 5: Belonging & Possession** (Saxon Genitive 's vs 'of', Family vocabulary, 'much' vs 'a lot of').
6. **Unit 6: Moving Around** (Transport, Prepositions 'by/on/in/on foot', Verbs get on/off/into/out of).
7. **Unit 7: Location & Directions** (Prepositions of Place: near, close to, next to, opposite, in front of).

## 4. Source Code Structure Changes
- Files in `src/content/cursos/ingles-a1/` will be updated/overwritten with the new content.
- We will start with `unit1.json` through `unit7.json`.

## 5. Verification Plan
- **Linting**: Run `npm run lint` (or equivalent found in `package.json`).
- **Validation**: Use `npm run validate-exercises` (as mentioned in `auto-applied-rule`).
- **Manual Review**: Verify the JSON structure matches the required fields for the frontend components.

## 6. Delivery Phases
- **Phase 1**: Unit 1 & 2 (Adjectives & Adverbs).
- **Phase 2**: Unit 3 & 4 (Frequency, Sequence & Dates).
- **Phase 3**: Unit 5, 6 & 7 (Possession, Transport & Location).
