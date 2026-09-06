# Technical Specification
## Word-Level Translations with Hover Tooltips in Course Content

### Technical Context

**Language & Runtime**
- **Language**: TypeScript with React 19.0.0
- **Framework**: Next.js 15.1.3 with App Router
- **Styling**: Tailwind CSS 3.x
- **Testing**: Jest + Testing Library (unit), Playwright (E2E)

**Key Dependencies**
- `@supabase/supabase-js`: Data persistence (course exercises)
- `react-markdown` + `remark-gfm`: Markdown parsing and rendering
- Lucide React: Icons

---

## Existing Infrastructure (Ready to Use)

### 1. TranslatedText Component
**File**: `/src/components/course/exercises/TranslatedText.tsx`

**Capabilities**:
- Parses explicit `[[word|translation]]` syntax
- Matches words against GLOBAL_LEXICON using case-insensitive regex
- Renders `<Tooltip>` wrapper with dotted underline styling
- **Styling**:
  - Underline: 2px dotted border-indigo-300 (hover → border-indigo-500)
  - Tooltip: dark slate-900 background, white text
  - Animation: opacity transition on hover

**Current Implementation**:
```tsx
<span className="group relative inline-block border-b-2 border-dotted border-indigo-300 hover:border-indigo-500 cursor-help mx-0.5 transition-colors">
  <span className="font-bold text-indigo-700">{word}</span>
  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-[200px] p-3 bg-slate-900 text-white text-xs rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
    {translation}
  </span>
</span>
```

### 2. Markdown Component Integration
**File**: `/src/components/course/Markdown.tsx` (lines 129-136)

**Current Behavior**:
- Already applies TranslatedText to all string parts in rendered markdown
- **Code location**:
  ```tsx
  return (
    <>
      {finalParts.map((p, i) => (
        typeof p === 'string' ? <TranslatedText key={i} text={p} /> : p
      ))}
    </>
  );
  ```
- This means **TranslatedText is already active in reading content**

### 3. Lexicon Data
**File**: `/src/lib/course/engine/lexicon.ts` (lines 532)

**Structure**:
- `A1_LEXICON`: 53+ entries for Unit 1 with Spanish translations
- `B1_LEXICON`: Additional vocabulary
- `GLOBAL_LEXICON`: Exported as `[...A1_LEXICON, ...B1_LEXICON]`

**Entry Format**:
```ts
{
  lemma: 'hello',
  pos: 'noun',
  translation: 'hola (formal)',
  tags: ['greeting', 'formal', 'A1'],
  unit: 1
}
```

### 4. Exercise Renderer
**File**: `/src/components/ExerciseRenderer.tsx` (lines 365-369)

**Reading Exercise Handling**:
```tsx
{isReadingExercise && showReadingText ? (
  <div className="p-10 bg-white border-l-8 border-purple-500">
    <Markdown content={exercise.transcript!} />
  </div>
)
```

---

## Implementation Approach

### Root Cause Analysis
The feature is **functionally complete** but needs verification:
1. ✅ TranslatedText component exists and has correct styling
2. ✅ Markdown component already applies TranslatedText to content
3. ✅ GLOBAL_LEXICON is exported from lexicon.ts
4. ⚠️ **Unknown**: Whether GLOBAL_LEXICON is actually being populated and used

### Implementation Phases

#### Phase 1: Verify & Debug (Prerequisite)
**Goal**: Confirm TranslatedText is working end-to-end

**Tasks**:
1. Start dev server and navigate to `/debug/a1-preview/unit-1`
2. Check browser console for any errors related to translation rendering
3. Hover over words in reading content to verify tooltips appear
4. If working: **Mark feature as complete** (no code changes needed)
5. If not working: Proceed to Phase 2

**Verification**:
- Visual inspection: See dotted underline on words
- Console: No errors
- Tooltip: Displays on hover

#### Phase 2: Fix Integration (If Needed)
**Goal**: Ensure GLOBAL_LEXICON is properly passed to TranslatedText

**Changes** (only if Phase 1 shows issues):
1. Verify GLOBAL_LEXICON export in `/src/lib/course/engine/lexicon.ts`
2. Confirm TranslatedText imports and uses GLOBAL_LEXICON correctly
3. Add debug logging if needed to track lexicon matching
4. Ensure Markdown component correctly passes text to TranslatedText

**Files to Modify** (if needed):
- `/src/components/course/exercises/TranslatedText.tsx` - Add debug logging
- `/src/lib/course/engine/lexicon.ts` - Verify exports

**No Breaking Changes**: All modifications are additive or internal

#### Phase 3: E2E Testing (Mandatory)
**Goal**: Verify feature works across the application

**Test Coverage**:
- ✅ Reading passage renders with dotted underlines on vocabulary
- ✅ Hovering shows correct Spanish translation
- ✅ Multiple words in a sentence each have tooltips
- ✅ Custom `[[word|translation]]` syntax works correctly
- ✅ Non-vocabulary words remain undecorated

**Test File**: `/e2e/a1-unit-1-translations.spec.ts`

**Framework**: Playwright (already configured)

---

## Source Code Structure

### No New Files Required
All components already exist:
- `TranslatedText.tsx` - ✅ Exists, handles rendering
- `Markdown.tsx` - ✅ Exists, integrates TranslatedText
- `lexicon.ts` - ✅ Exists, provides vocabulary data

### Potential Modifications
If debugging reveals issues:
- Minor updates to logging/error handling in TranslatedText
- Possible GLOBAL_LEXICON export verification in lexicon.ts

---

## Data Model / Interface Changes

**No changes required** - all data structures are in place:

### TranslatedText Props (Existing)
```ts
interface TranslatedTextProps {
  text: string;
  className?: string;
  useStrong?: boolean; // Controls font-weight in tooltip
}
```

### LexicalItem (Existing)
```ts
interface LexicalItem {
  lemma: string;
  pos: 'noun' | 'verb' | 'adjective' | 'preposition' | 'adverb';
  translation: string;
  tags: string[];
  unit: number;
  // ... additional fields for conjugation, gender, etc.
}
```

---

## Verification Approach

### Pre-Implementation Check
```bash
# 1. Verify GLOBAL_LEXICON is exported
grep -n "export const GLOBAL_LEXICON" src/lib/course/engine/lexicon.ts

# 2. Verify TranslatedText imports GLOBAL_LEXICON
grep -n "GLOBAL_LEXICON" src/components/course/exercises/TranslatedText.tsx

# 3. Verify Markdown applies TranslatedText
grep -n "TranslatedText" src/components/course/Markdown.tsx
```

### Runtime Verification
```bash
# Start dev server
npm run dev

# Navigate to reading exercise
# URL: http://localhost:3000/debug/a1-preview/unit-1

# Expected: Words have dotted underlines, tooltips on hover
```

### Testing Commands
```bash
# Run E2E tests
npm run test:e2e

# Run unit tests
npm test

# Run linting
npm run lint

# Run type checking
npm run typecheck
```

---

## Delivery Phases (Testable Milestones)

### Phase 1: Verification (0 code changes expected)
- Navigate to debug page
- Visually confirm tooltips appear on hover
- Record findings

### Phase 2: Debugging & Fixes (If needed)
- Add logging to TranslatedText if lexicon not matching
- Verify GLOBAL_LEXICON export and import chain
- Test after each fix

### Phase 3: E2E Tests
- Write comprehensive test suite
- Verify all 53 Unit 1 vocabulary items have translations
- Test edge cases (proper nouns, contractions, etc.)
- All tests pass

### Phase 4: Final Verification
- Run full test suite: `npm test && npm run test:e2e`
- Run linting: `npm run lint`
- Run type checking: `npm run typecheck`
- Deploy to staging for manual QA

---

## Assumptions

1. **GLOBAL_LEXICON is properly exported** from `lexicon.ts` and imported by `TranslatedText`
2. **Markdown component correctly passes text** to TranslatedText component
3. **Reading exercises** use the `transcript` field which is parsed by Markdown
4. **Tailwind CSS** is properly configured in the project (it is)
5. **Browser supports CSS :hover** (desktop-first approach)

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| GLOBAL_LEXICON not populated | Add debug logging, verify export chain |
| TranslatedText not applied to all text | Check Markdown component text handling |
| Performance impact from regex matching | Component already has caching mechanisms |
| Mobile hover not working | Add touch event support in Phase 2 |
| Tooltip obscured by other elements | Verify z-index (100) is sufficient |

---

## Success Criteria

- ✅ All Unit 1 reading passages display word-level translations on hover
- ✅ Dotted underlines visible and properly styled
- ✅ Tooltips appear within 100ms of hover
- ✅ No console errors
- ✅ All existing tests pass
- ✅ New E2E tests provide >85% coverage of translation feature
- ✅ No performance degradation (Lighthouse score maintained)

