# Technical Specification - Reading Exercise Fix

## Context
- **Frontend**: Next.js 15, React, TypeScript.
- **Data**: JSON files in `src/content/cursos/`.
- **Rendering Component**: `src/components/course/exercises/PremiumSession.tsx`.

## Implementation Approach
1. **Block Stimulus Propagation**: `PremiumSession.tsx` has logic to capture a stimulus from an interaction within a block and propagate it to subsequent interactions that have the `reading` tag.
2. **Missing Text Generation**: For each affected block, we will add a new interaction at the beginning of the block content.
   - **Type**: `audio_player` or a new hidden type if we just want the text. 
   - **Fields**: `stimulus_en` (The story), `concept_tags`: ["reading"], `mastery_tag`: "reading".
3. **Alternative**: Directly add `stimulus_en` to the existing multiple-choice interaction if it's the only one in the block.

## Source Code Changes
- Modify `src/content/cursos/**/*.json` files.
- No changes required to `PremiumSession.tsx` as it already supports `blockStimulus` propagation.

## Verification
- Use `browser` tool to verify Unit 39.
- Use `npm run validate-exercises` (if available) to ensure JSON integrity.
- Automated E2E test with Playwright to verify text visibility.
