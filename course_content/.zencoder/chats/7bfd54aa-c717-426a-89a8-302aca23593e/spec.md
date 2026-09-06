# Technical Specification - A1 Course Redesign & Exercise Variety

## 1. Technical Context
- **Language**: TypeScript / Node.js
- **Framework**: Next.js 15 (App Router)
- **AI**: OpenAI (GPT-4o)
- **Data Format**: JSON (Course Units)

## 2. Implementation Approach

### 2.1 Curriculum Mapping
We will create a new curriculum definition for the A1 redesign that maps the 12 user-requested units to specific grammar and vocabulary topics. This will be stored in a new file `src/lib/a1-redesign-curriculum.ts` to avoid modifying the core `cambridge-curriculum.ts` during development.

### 2.2 Batch Generation System
We will develop a specialized script `scripts/generate-a1-varied-course.ts` that:
1. Iterates through the 12 units.
2. For each unit, calls `generateMixedExerciseSpecs` to create 500 unique specifications.
3. Uses `ExerciseGenerator` to fulfill these specifications with high-quality, non-repetitive content.
4. Implements a local "Global Vocabulary Tracker" during the generation process to ensure that once a word (e.g., "Apple") is used a certain number of times, it's deprioritized in subsequent prompts.

### 2.3 Mixing Algorithm
The `MixedExerciseGenerator` will be used with `ensureVariety: true`. We will also add a "shuffle" step after generation to ensure that similar exercise types are not clumped together within a unit.

### 2.4 Verification Tool
A new script `scripts/verify-a1-mixing.ts` will be created to:
- **Type Distribution**: Calculate the percentage of each exercise type per unit.
- **Topic Coverage**: Check if all syllabus topics for a unit are present.
- **Repetition Audit**: Identify the most frequent 20 words across the entire 6000 exercises to detect over-used vocabulary.

## 3. Data Model Changes
The output will be 12 JSON files in `src/content/cursos/ingles-a1/` named `unit1.json` through `unit12.json`.
Existing units (13-34) will be archived or moved to a backup directory.

## 4. Delivery Phases
1. **Phase 1: Curriculum & Tooling**: Define the 12-unit curriculum and the generation script.
2. **Phase 2: Pilot Generation**: Generate Units 1-3 and verify quality.
3. **Phase 3: Mass Generation**: Generate Units 4-12.
4. **Phase 4: Final Verification**: Run the audit script and make adjustments if necessary.

## 5. Verification Approach
- Run `npm run validate-exercises` to ensure JSON structure is correct.
- Manual review of a random sample (10 exercises per unit).
- Execution of `scripts/verify-a1-mixing.ts`.
