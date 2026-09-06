# PRD - Translation Review for Unit 1 (A1 Preview)

## Description
Review the content of A1 Unit 1 (Greetings & Goodbyes) to ensure all English words used in exercises, questions, options, and reading transcripts have corresponding Spanish translations.

## Objectives
- All English words should have a tooltip translation.
- Use `GLOBAL_LEXICON` for common reusable words.
- Use explicit `[[English|Spanish]]` formatting for context-specific or less common words.

## Scope
- `src/lib/a1-m1-l1-detailed.ts` (Core content for Unit 1)
- `src/lib/course/engine/lexicon.ts` (Lexicon for common words)

## Unclear Aspects
- Should instruction text in questions be in English or Spanish? (Currently Spanish, which is fine for A1).
- Should proper nouns (names like Alex, Sarah) be translated? (Usually yes, e.g., Sarah -> Sara, Alex -> Álex, or kept as is but marked).

## Decisions
- Proper names will be kept but marked in lexicon or explicitly if they have a standard Spanish equivalent (e.g., Sarah -> Sara).
- I will prioritize adding core vocabulary to `lexicon.ts` to make it reusable for other units.
- Complex sentences in transcripts might be better handled by translating key phrases or using the explicit format.
