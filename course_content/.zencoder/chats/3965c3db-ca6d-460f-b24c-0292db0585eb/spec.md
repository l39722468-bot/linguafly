# Technical Specification - Translate Unit 2 Content

## Technical Context
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Content Storage**: Static TypeScript files in `src/lib/`
- **Target File**: `src/lib/a1-m1-l2-detailed.ts` (which contains the content for Unit 2)

## Implementation Approach
1.  **Identify Content**: The English content for Unit 2 is located in `src/lib/a1-m1-l2-detailed.ts`.
2.  **Translate Content**: Translate all English strings (questions, reading transcripts, titles) in `src/lib/a1-m1-l2-detailed.ts` to include Spanish translations using the `[[English|Spanish]]` format where applicable, or simply translating the descriptive text if it's for the instructor/internal use (though the request implies translating the content shown to the user).
3.  **Apply Translations**: 
    - Questions in `GRAMMAR_QUESTIONS` will have their `question` field translated if needed, or options translated.
    - `READING_EXERCISES` will have `transcript`, `title`, and `question` translated.
    - Note: The `[[English|Spanish]]` format seems to be the convention for showing translations in the UI for this project.

## Source Code Structure Changes
- No new files.
- Modification of `src/lib/a1-m1-l2-detailed.ts`.

## Data Model / API / Interface Changes
- None.

## Verification Approach
- Manual inspection of the code.
- Run `npm run lint` to ensure no syntax errors were introduced.
- (Optional) Use `browser` tool to verify the translations appear correctly in the `/debug/a1-preview/unit-2` route.
