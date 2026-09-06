# PRD - Visual Exercises for A1 Level in Practica Inteligente

## Overview
Introduce visual exercises specifically designed for A1 level students in the "Práctica Inteligente" (Adaptive Practice) section of the Focus English platform. These exercises will focus on basic vocabulary (colors, animals, fruits, numbers, etc.) using high-quality images to facilitate learning for beginners.

## Target Audience
- A1 level English learners.
- Students who prefer visual learning.
- Beginners who need clear, non-ambiguous context for new vocabulary.

## User Stories
- As an A1 student, I want to see images associated with words so I can learn vocabulary more intuitively.
- As a student in "Práctica Inteligente", I want the system to show me A1-appropriate visual exercises when my level is detected as A1 or when I specifically choose the A1 path.

## Feature Requirements
1.  **Exercise Library Expansion**:
    -   Leverage and expand the existing `A1_IMAGE_BANK` and `A1_KIDS_EXERCISES` in `src/lib/a1-visual-exercises.ts`.
    -   Add more categories: emotions, clothes, body parts, household objects, etc.
    -   Ensure images are high-quality and unambiguously represent the target word.
2.  **Adaptive Practice Integration**:
    -   Add "Nivel A1" as a selectable path in `/practica-inteligente`.
    -   Integrate these visual exercises into the `GlobalContentProvider` so they can be served by the `UltraAdaptiveEngine`.
3.  **UI/UX**:
    -   Visual exercises should clearly display the image alongside the question.
    -   Audio support: Each exercise should have an "audio hint" or TTS for the target word.
    -   Clear feedback in Spanish for A1 learners.

## Scope
-   Creation of at least 10 new sets of visual exercises (approx. 40-50 questions).
-   Integration into the `UltraAdaptiveEngine` and `GlobalContentProvider`.
-   Update of the UI to allow selecting A1 level in the Practice section.

## Success Criteria
-   A1 students can complete visual exercises in the "Práctica Inteligente" section.
-   The "Nivel A1" option is visible and functional in the UI.
-   Exercises correctly track performance and adapt as expected.
