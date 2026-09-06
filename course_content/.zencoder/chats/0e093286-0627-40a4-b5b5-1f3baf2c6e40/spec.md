# Technical Specification - Fun & Stimulating A1 Course

## 1. Technical Context
- **Language**: Python (for generation), TypeScript (for frontend).
- **Framework**: Next.js 15 (App Router).
- **Storage**: JSON files in `src/content/cursos/ingles-a1/`.
- **Audio**: MP3 files generated via OpenAI/ElevenLabs TTS.
- **Data Model**: `UnitData` from `src/types/premium-course.ts`.

## 2. Implementation Approach

### A. Content Generation Script (`scripts/generate-fun-a1.py`)
A Python script will be created to generate the 100 units.
- **Thematic Database**: A dictionary mapping 100 unit IDs to themes, core vocabulary, and grammar points.
- **Exercise Factory**: A set of functions to generate different interaction types (`multiple_choice`, `matching`, `reorder_words`, etc.) with a "fun" twist (e.g., using emojis, funny prompts).
- **Batch Processing**: Generating 20,000 exercises is memory-intensive. The script will process one unit at a time and write to disk.

### B. Audio Generation Pipeline (`scripts/generate-fun-a1-audio.ts`)
A TypeScript script using the existing `generate-course-audio.ts` logic but adapted for the high volume.
- **Caching**: Check for existing audio files to avoid redundant API calls and costs.
- **Concurrency**: Process audios in parallel with rate limiting to avoid API throttling.
- **Structure**: Audios will be stored in `public/audio/courses/ingles-a1/U{id}/`.

### C. Frontend Enhancements
The `PremiumSession.tsx` already supports most needed interaction types. However, we may need to ensure it handles:
- **Large Units**: Verify that loading a JSON with 200 interactions doesn't crash the browser or cause UI jank during the session.
- **Asset Loading**: Efficient prefetching of the next exercise's audio.

## 3. Source Code Structure Changes
- `src/content/cursos/ingles-a1/`: All existing files will be replaced by `unit1.json` through `unit100.json`.
- `scripts/generate-fun-a1.py`: New generation script.
- `scripts/generate-fun-a1-audio.ts`: New audio generation management script.

## 4. Delivery Phases

### Phase 1: Prototype & Schema (Milestone 1)
- Create `generate-fun-a1.py` with 1 unit and 200 exercises.
- Validate JSON against `UnitData` type.
- Manually test in `PremiumUnitViewer`.

### Phase 2: Full Content Generation (Milestone 2)
- Define all 100 themes and pedagogical content.
- Run the full generation script.
- Audit a random sample of units for quality and level accuracy (A1).

### Phase 3: Audio Generation (Milestone 3)
- Run the audio batch script for all units.
- Verify audio paths in JSON point to the correct files.

### Phase 4: Verification & Linting (Milestone 4)
- Run `npm run lint` and `npm run typecheck`.
- Run `npm run validate-exercises`.

## 5. Verification Approach
- **Lint/Typecheck**: Standard project commands.
- **JSON Validation**: Use `scripts/audit-generic.mjs` or similar to ensure JSON integrity.
- **Manual QA**: Navigate through several units to ensure the "fun" tone is consistent and exercises work as expected.
