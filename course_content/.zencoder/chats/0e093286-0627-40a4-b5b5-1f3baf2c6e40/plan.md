# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements
### [x] Step: Technical Specification
### [x] Step: Planning

### [x] Step: Implementation

#### Phase 1: Preparation & Scripting
1. [x] **Thematic Database**: Define all 100 thematic unit titles and their core A1 pedagogical focus (vocabulary/grammar).
2. [x] **Generation Script**: Develop `scripts/generate-fun-a1.py` with the "fun" exercise factory.
    - *Verification*: Generate `unit1.json` and check if it has 200 diverse exercises.

#### Phase 2: Content Generation
3. [x] **Initial Batch**: Generate units 1-10 and verify they load correctly in `src/app/curso/ingles-a1/[unitId]/page.tsx`.
4. [x] **Full Batch**: Generate units 11-100.
    - *Verification*: Ensure 100 JSON files exist in `src/content/cursos/ingles-a1/`.

#### Phase 3: Audio Generation
5. [x] **Audio Management Script**: Develop `scripts/generate-fun-a1-audio.ts` to process all units.
6. [x] **Run Audio Pipeline**: Batch generate audios for all 20,000 interactions.
    - *Verification*: Sample checks of audio files in `public/audio/courses/ingles-a1/`.

#### Phase 4: Verification & Final Polish
7. [x] **Validation**: Run `npm run validate-exercises` (if exists) or a custom audit script to ensure JSON structure integrity.
8. [x] **Lint & Typecheck**: Run `npm run lint` and `npm run typecheck`.
    - *Verification*: No errors reported (ignored pre-existing project errors).
