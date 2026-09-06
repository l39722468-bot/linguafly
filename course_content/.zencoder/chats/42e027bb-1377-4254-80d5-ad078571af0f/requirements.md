# Product Requirements Document (PRD)
## Feature: Word-Level Translations with Hover Tooltips in Course Content

### Overview
Enable interactive word-level translations in course content by underlining English words with dotted lines and displaying Spanish translations on hover. This provides learners with immediate vocabulary support without disrupting reading flow.

---

## Feature Description

### User Story
**As a learner**, I want to see translations of English words by hovering over them in course content, so that I can learn vocabulary in context without breaking my reading rhythm.

### Scope
- **URL**: https://www.focus-on-english.com/debug/a1-preview/unit-1 (and similar debug preview pages)
- **Content Type**: All textual course content that learners encounter
- **Initial Phase**: A1 Module 1 Unit 1
- **Lexicon**: Use existing A1_LEXICON vocabulary with Spanish translations
- **Component**: Leverage and extend existing `TranslatedText` component

---

## Functional Requirements

### 1. Visual Presentation
- **Underline Style**: Dotted underline (border-bottom: 2px dotted)
- **Color**: Indigo-300 (baseline), Indigo-500 (hover state)
- **Target Elements**: All English words in course reading content

### 2. Tooltip Interaction
- **Trigger**: Hover over underlined word
- **Content**: 
  - Word (uppercase, small font)
  - Spanish translation
- **Position**: Appears above the word with arrow pointer
- **Background**: Dark slate (slate-900) with white text
- **Appearance**: Smooth opacity transition on hover
- **Z-index**: 100 (ensures visibility over other content)

### 3. Scope of Application
**Apply to these content areas:**
- Reading comprehension passages
- Lesson text
- Exercise instructions (optional, for Phase 2)
- Answer explanations

**Do NOT apply to:**
- HTML attributes
- Proper nouns that are names (already in lexicon)
- Code or technical terms outside the lexicon

### 4. Data Source
- **Lexicon**: Existing `A1_LEXICON` from `/src/lib/course/engine/lexicon.ts`
- **Fallback**: If word not in lexicon, display word without translation
- **Custom Translations**: Support explicit `[[word|translation]]` syntax for edge cases

---

## Technical Context

### Existing Infrastructure
- **Component**: `TranslatedText` component already exists at `/src/components/course/exercises/TranslatedText.tsx`
  - Handles explicit `[[word|translation]]` syntax
  - Integrates with GLOBAL_LEXICON
  - Provides tooltip UI with dotted underline
  
- **Lexicon**: `A1_LEXICON` at `/src/lib/course/engine/lexicon.ts`
  - Contains unit-based vocabulary
  - 50+ words for Unit 1 with Spanish translations
  
- **Content Rendering**: 
  - `ExerciseRenderer` component renders exercises
  - Currently uses `Markdown` component for text
  - Reading comprehension uses `transcript` field

### Current Gaps
1. **TranslatedText component not used in reading passages** - currently reading text renders as plain string
2. **GLOBAL_LEXICON not populated** - unclear if it's being set from A1_LEXICON
3. **Reading text in exercises** - not wrapped with TranslatedText component

---

## Acceptance Criteria

### Phase 1: Core Feature (MVP)
- [ ] Reading comprehension passages in A1 Unit 1 display word-level translations with hover tooltips
- [ ] All Unit 1 vocabulary from A1_LEXICON shows translations when hovered
- [ ] Dotted underline is visible and styled correctly
- [ ] Tooltip appears above word with proper formatting
- [ ] Feature works on desktop (hover) and mobile (touch/tap)
- [ ] No breaking changes to existing functionality
- [ ] Tests verify tooltip functionality and content accuracy

### Phase 2: Expansion (Future)
- [ ] Apply to all exercise questions and instructions
- [ ] Extend to all A1 units
- [ ] Support other difficulty levels (A2, B1, B2, C1, C2)

---

## Assumptions & Constraints

### Assumptions
1. Spanish is the target translation language (based on existing lexicon)
2. Hover interaction is primary; mobile tap support is secondary
3. All words in GLOBAL_LEXICON should be automatically underlined and translated
4. The `[[word|translation]]` syntax will be used for edge cases and overrides

### Constraints
- Must not impact page load performance
- Must preserve existing text selection behavior
- Must be accessible (proper ARIA attributes)
- Must work with existing Tailwind CSS styling

---

## Success Metrics
- ✅ 100% of Unit 1 reading passages display translations
- ✅ Zero console errors related to translation rendering
- ✅ Tooltip appears within 100ms of hover
- ✅ All existing tests pass
- ✅ New tests provide >80% code coverage for translation feature

---

## Clarifications & Decisions

### Decision 1: Lexicon Integration
**Decision**: Use existing `A1_LEXICON` and ensure it's exported as `GLOBAL_LEXICON`.
**Reasoning**: Avoids data duplication and maintains single source of truth.

### Decision 2: Scope Priority
**Decision**: Start with reading comprehension text only (Phase 1), expand to questions in Phase 2.
**Reasoning**: Reading text is the primary learning material; questions are less critical for vocabulary support.

### Decision 3: Mobile Handling
**Decision**: Use CSS `:hover` for desktop; add touch event listeners for mobile if needed.
**Reasoning**: CSS hover is performant; touch support can be added iteratively based on user feedback.

---

## Open Questions (If Any)
1. Should proper nouns (names) be translated? → **No, they're not translated in lexicon**
2. Should special words like "am", "is", "are" show conjugation info? → **Standard translation is sufficient**
3. Mobile interaction pattern? → **Standard tooltip on tap; can iterate**

