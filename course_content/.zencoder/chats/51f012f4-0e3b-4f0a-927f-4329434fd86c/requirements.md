# Product Requirements Document (PRD) - Travel English A1 Pilot Week Improvements

## 1. Problem Statement
The current pilot week (Semana 01) of the Travel English A1 course has several critical issues:
- **Broken Visuals**: Multiple 404 errors for key educational images.
- **Limited Scope**: The alphabet theory is restricted to vowels, leaving out complex consonants essential for A1 learners (G, J, H, Y, R).
- **Basic Engagement**: Exercise variety is low, relying mostly on simple multiple-choice questions.

## 2. Goals
- **Fix Visual Integrity**: Restore or provide placeholders for all missing course assets.
- **Content Enrichment**: Expand the pedagogical value of the pilot week by including critical pronunciation and vocabulary.
- **Interaction Quality**: Increase student engagement through more diverse exercise types.

## 3. Scope of Improvements

### Phase 1: Asset Fixes
- Identify all missing files in `src/content/cursos/viajes/a1/trimestre1/semana01/`.
- Ensure `public/assets/courses/travel-a1/images/` contains at least placeholder versions of:
  - `airport_discovery.png`
  - `alphabet_theory.png`
  - `greetings_clock.png`
  - `info_desk_zoom.png`
  - `introduction_lesson.png`
  - `cafe_counter.png`
  - `courtesy_lesson.png`
- Fix the missing `favicon.ico` at the root.

### Phase 2: Content Expansion
- **Theory Update**: Add "Tricky Consonants" (G, J, H, Y, R) to `theory.json`.
- **Lesson 2 Update**: Add more spelling practice specifically for these consonants.
- **Lesson 3 Update**: Add "Dialogue Ordering" exercise to simulate ordering at a café.

### Phase 3: Technical Standardization
- Standardize IDs in JSON files to avoid collisions (e.g., `q-v2-3`).
- Add difficulty metadata (`level: "beginner"`) to exercises.

## 4. Constraints & Assumptions
- Assets will be generated using existing project scripts or provided as descriptive placeholders if no graphic designer is available.
- The existing Next.js frontend handles the JSON content correctly once paths and files are fixed.
