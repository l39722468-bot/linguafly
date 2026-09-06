# Technical Specification - A1 Visual Exercises

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Components**: Tailwind CSS, Framer Motion, Radix UI
- **Engine**: Custom Adaptive Engine (`UltraAdaptiveEngine`, `GlobalContentProvider`)

## Implementation Approach

### 1. Data Expansion (`src/lib/a1-visual-exercises.ts`)
- Add new categories to `A1_IMAGE_BANK`: `household`, `transport`, `nature`, `actions`.
- Expand `A1_KIDS_EXERCISES` to include ~40 new questions using these categories.
- Normalize exercise structure:
  - Rename `imageUrl` to `image_url`.
  - Add `interaction_id`.
  - Map `correctAnswer` to `correct_answer`.
  - Ensure `options` are converted to `PremiumOption` format or handled by the normalize function in `PremiumSession`.

### 2. Global Content Integration (`src/lib/course-engine/global-content-provider.ts`)
- Import `A1_KIDS_EXERCISES` from `src/lib/a1-visual-exercises.ts`.
- In `loadAllContent`, append these exercises to the `interactions` array.
- Map them to level `A1` and specialization `generic`.

### 3. UI Enhancements
- **`PremiumSession.tsx`**: Add rendering for `image_url` within the `multiple_choice` case. Use a consistent layout (image on top, question below, options in grid).
- **`PracticaInteligenteClient.tsx`**:
  - Add `Nivel A1` to `LEARNING_PATHS` array.
  - Use `Sparkles` or a new icon (e.g., `Baby` or `Stars`) for A1.
  - Description: "Ejercicios visuales y sencillos para principiantes."

### 4. Data Model Changes
No changes to Supabase schema required as we are using the existing `PremiumInteraction` structure and injecting data at runtime into the memory-based provider.

## Delivery Phases
1.  **Phase 1: Data Expansion**: Add new images and exercises to `a1-visual-exercises.ts`.
2.  **Phase 2: UI Support**: Enable image rendering in `multiple_choice` and add A1 path to the dashboard.
3.  **Phase 3: Integration**: Connect the data to `GlobalContentProvider`.
4.  **Phase 4: Verification**: Browser testing and E2E tests.

## Verification Approach
- **Linting**: `npm run lint`
- **Manual Verification**: Open `/practica-inteligente`, select "Nivel A1", and verify exercises appear with images and work correctly.
- **Automated Testing**: Playwright E2E test to verify the A1 flow.
