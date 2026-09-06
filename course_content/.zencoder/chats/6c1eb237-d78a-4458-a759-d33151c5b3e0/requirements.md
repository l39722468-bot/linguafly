# Product Requirements Document (PRD) - Course-wide English Word Translation

## 1. Overview
The goal is to implement a course-wide translation feature that automatically identifies English words in course content and provides their Spanish translation on hover.

## 2. Features
- **Automatic English Word Detection**: Identify English words within the text rendered in the course.
- **Visual Cues**: Underline detected English words with a dotted line.
- **Hover Translation**: Display a tooltip with the Spanish translation when the user hovers over an underlined word.
- **Lexicon Integration**: Use the existing `GLOBAL_LEXICON` (and any other available lexicons) as the source of truth for translations.
- **Course-wide Coverage**: Apply this behavior to all course components, specifically those using the `Markdown` and `TranslatedText` components.

## 3. User Experience
- When a user views course content, English words should be visually distinguished by a dotted underline.
- Upon hovering over an underlined word, a small, elegant tooltip appears showing the translation.
- The behavior should be non-intrusive and fast.

## 4. Technical Requirements
- Update `TranslatedText.tsx` to handle automatic translation of words found in the lexicon.
- Ensure that explicit translations (using `[[word|translation]]` syntax) still take precedence.
- Implement efficient word matching to avoid performance issues during rendering.
- Maintain existing styling and animations for tooltips.

## 5. Constraints & Assumptions
- We will use the `GLOBAL_LEXICON` available in the codebase.
- We assume that words in the lexicon are the primary targets for translation.
- If a word has multiple translations or meanings, we might need a way to choose the most appropriate one (or show all). For now, we'll use the primary translation from the lexicon.
- We will focus on `TranslatedText` as the primary vehicle for this feature since it's already used in `Markdown` components across the course.
