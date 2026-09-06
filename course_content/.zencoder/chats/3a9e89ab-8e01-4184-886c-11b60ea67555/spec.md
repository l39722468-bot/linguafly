# Technical Specification - Fix Missing Translations in Units 30-60

## Context
The application uses a `TranslatedText` component that relies on the `[[English|Spanish]]` format to provide bilingual support.
Units 30 through 60 have incomplete or missing translation tags, breaking this feature.

## Proposed Solution
We will process each unit file from `unit-30.ts` to `unit-60.ts` and apply the following transformations:

### 1. Title and Instructions Wrapping
- Find `title: "Some Text"` and change to `title: "[[English|Spanish]]"`.
- Find `instructions: "Some Text"` and change to `instructions: "[[English|Spanish]]"`.

### 2. Question and Option Completion
- Find `"question": "English Word"` and change to `"question": "[[English|Spanish]]"`.
- Find `"[[Spanish|]]"` in options and change to `[[English|Spanish]]`.
- Find plain strings in options and wrap them.

### 3. Automated Processing with AI
Since the translations require context and accuracy, we will use the Zencoder agent (me) to process these files. 
We will process them in smaller batches or unit by unit to ensure quality and stay within token limits.

## Implementation Steps

### Phase 1: Assessment and Tooling
- Identify all affected files (Done: `unit-30.ts` to `unit-60.ts`).
- Verify the regex patterns for detection.

### Phase 2: Execution (Unit by Unit)
For each unit:
1. Read the file.
2. Identify untranslated or partially translated strings.
3. Apply translations using AI knowledge.
4. Overwrite the file.
5. Verify syntax correctness.

### Phase 3: Validation
- Run `npm run validate-exercises` to ensure no JSON or TypeScript errors were introduced.
- Run `npm run type-check`.

## Verification Approach
- **Visual**: Check Unit 30 in the browser to see if "Translate" toggle works.
- **Automated**: Run existing validation scripts.
