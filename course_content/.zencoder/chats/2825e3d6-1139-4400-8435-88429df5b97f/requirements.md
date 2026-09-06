# Requirements - Reading Exercise Fix

## Problem Statement
Various reading exercises in the A1 English course reference a text ("según el texto", "según la historia") that is not visible to the user. This makes the exercises unsolvable.

## Goal
Ensure every exercise tagged with "reading" or of type "reading-comprehension" has an associated text visible to the student.

## Scope
- Audit all course JSON files in `src/content/cursos/`.
- Identify exercises missing the reference text.
- Provide a coherent English text for each affected exercise/block.
- Update JSON files to include the text in a way that `PremiumSession.tsx` can render it.

## Expected Behavior
When a student reaches a reading question, a text box with the relevant story/passage should appear above the question.
