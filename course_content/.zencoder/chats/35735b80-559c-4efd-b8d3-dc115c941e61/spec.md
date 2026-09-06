# Technical Specification - Translation Review for Unit 1

## Technical Context
- Language: TypeScript
- Data Files: `src/lib/a1-m1-l1-detailed.ts`, `src/lib/course/engine/lexicon.ts`
- Rendering: `TranslatedText` component (automatic lexicon matching + explicit `[[en|es]]`).

## Implementation Approach
1. **Lexicon Update**: Add core Unit 1 words to `A1_LEXICON` in `lexicon.ts`. This ensures they are translated everywhere in the app when they appear as single words.
2. **Content Enhancement**: Update `a1-m1-l1-detailed.ts` to wrap words or phrases in `[[word|translation]]` if they are not suitable for the global lexicon (e.g., specific full sentences, or words with multiple context-dependent translations).
3. **Reading Transcripts**: Reading transcripts in `a1-m1-l1-detailed.ts` will be updated to ensure all sentences provide tooltips.

## Source Code Changes
- `src/lib/course/engine/lexicon.ts`: Add lemmas for Unit 1.
- `src/lib/a1-m1-l1-detailed.ts`: Update question and transcript strings.

## Delivery Phases
- Phase 1: Update `lexicon.ts` with common Unit 1 words.
- Phase 2: Update `a1-m1-l1-detailed.ts` with explicit translations where needed.

## Verification
- Run `npm run lint` to ensure no syntax errors.
- Visual verification via `browser` tool on `http://localhost:3000/debug/a1-preview/unit-1`.
