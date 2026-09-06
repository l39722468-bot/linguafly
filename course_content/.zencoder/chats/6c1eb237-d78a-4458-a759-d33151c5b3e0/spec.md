# Technical Specification - Course-wide English Word Translation

## 1. Technical Context
- **Framework**: Next.js, React, TypeScript.
- **Styling**: Tailwind CSS.
- **Content Rendering**: `react-markdown`.
- **Lexicon**: `src/lib/course/engine/lexicon.ts`.

## 2. Implementation Approach
The implementation will focus on updating the `TranslatedText` component to automatically scan text for words present in the `GLOBAL_LEXICON`.

### 2.1 Lexicon Processing
- Import `GLOBAL_LEXICON` from `src/lib/course/engine/lexicon.ts`.
- Pre-process the lexicon into a Map for O(1) lookups: `Map<string, string>` where key is the English word (lowercase) and value is its translation.
- Include plurals and lemmas if available.

### 2.2 Component Update (`TranslatedText.tsx`)
- Modify `TranslatedText` to:
    1. First, handle explicit tags `[[word|translation]]` as it does currently.
    2. For the remaining text parts, split them into words (respecting boundaries).
    3. Check each word against the pre-processed lexicon.
    4. If a match is found, wrap it in the same hover-able `span` structure used for explicit translations.
    5. Ensure we don't double-process words or break existing tags.

### 2.3 Performance Optimization
- Use `useMemo` to pre-calculate the lexicon map.
- Use a single regular expression to find all lexicon words in one pass, or use a trie/efficient string matching if the lexicon grows very large. For the current size (~300-500 words), a regex might suffice.

## 3. Source Code Structure Changes
- **Modified File**: `src/components/course/exercises/TranslatedText.tsx`.

## 4. Delivery Phases
1. **Phase 1**: Pre-process lexicon and update `TranslatedText` with basic matching.
2. **Phase 2**: Refine matching (case sensitivity, punctuation, plurals).
3. **Phase 3**: Verification and testing.

## 5. Verification Approach
- **Manual Verification**: Use the `/test-translation` page to verify that words from the lexicon are automatically underlined and show translations.
- **Automated Testing**: Write a Playwright test to verify that specific English words are rendered with the correct CSS classes and show tooltips on hover.
- **Linting**: Run `npm run lint` to ensure code quality.
