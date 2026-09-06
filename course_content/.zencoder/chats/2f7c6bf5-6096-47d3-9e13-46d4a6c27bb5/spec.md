# Technical Specification: Fix Spanish words in A1 Course Units 40+

## Context
- **Language**: TypeScript
- **Framework**: Next.js
- **Content Format**: JSON-like arrays of `Exercise` objects in `.ts` files.
- **Rendering Component**: `TranslatedText.tsx` which parses `[[word|translation]]`.

## Implementation Approach
The correction will be performed by systematically reviewing each exercise in units 40-60. 

### Correction Logic
For each exercise:
1.  **Reference Transcript**: Use the `transcript` field as the source of truth for the full English sentence.
2.  **Analyze `question`**:
    - Identify segments wrapped in `[[...]]`.
    - If a segment is `[[Spanish]]` (no pipe), find the corresponding English part in the `transcript` and convert to `[[English|Spanish]]`.
    - If a segment is `[[English|Spanish]]`, verify it is correct.
    - If there is raw Spanish outside `[[...]]`, wrap it: `[[English|Spanish]]`.
3.  **Analyze `options`**:
    - For each option, ensure it follows `[[English|Spanish]]`.
    - Cross-reference with the `transcript` if the option is part of the sentence.
4.  **Special Case: `sentence-building`**:
    - Ensure `correctSentence` and `words` array follow the `[[English|Spanish]]` pattern.

### Tooling
I will use a combination of automated searching and manual editing to ensure quality. A script could be useful but might be risky due to the variety of sentence structures. I will proceed unit by unit.

## Verification Plan
1.  **Static Analysis**: Run `npm run lint` and `tsc` to ensure no syntax errors were introduced.
2.  **Visual Check**: Use the `browser` tool to visit `http://localhost:3000/debug/a1-preview/unit-40` and subsequent units to verify the fixes.
3.  **E2E (Optional)**: If approved, write a test that checks for the absence of specific Spanish keywords in the default state of these units.
