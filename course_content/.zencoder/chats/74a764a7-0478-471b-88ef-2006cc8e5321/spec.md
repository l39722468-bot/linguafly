# Technical Specification: A1 English Course "Fun" Upgrade

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State Management**: React `useState`, `useEffect`
- **UI Components**: Tailwind CSS, Framer Motion, Lucide React
- **Data Storage**: Static TypeScript files in `src/lib/`

## Implementation Approach

### 1. Reusable Components
We will use and potentially extend the following existing components in `src/components/exercises/`:
- `WordSearchExercise.tsx`
- `CrosswordExercise.tsx`
- `DragDropExercise.tsx` (for sentence reordering)
- `FlashcardExercise.tsx`
- `MultipleChoiceClozeExercise.tsx`
- `MultipleMatchingExercise.tsx`

### 2. Data Structure Definitions

#### Word Search
```typescript
{
  type: 'word-search',
  content: {
    title: string,
    instructions: string,
    words: string[],
    gridSize: number,
    clues?: string[]
  }
}
```

#### Crossword
```typescript
{
  type: 'crossword',
  content: {
    title: string,
    instructions: string,
    items: {
      answer: string,
      clue: string,
      row: number,
      col: number,
      direction: 'across' | 'down'
    }[]
  }
}
```

#### Drag & Drop (Sentence Building)
```typescript
{
  type: 'drag-drop',
  content: {
    title: string,
    instructions: string,
    correctSentence: string,
    shuffledWords?: string[],
    translation?: string,
    hint?: string
  }
}
```

#### Flashcards
```typescript
{
  type: 'flashcard',
  content: {
    title: string,
    instructions: string,
    items: {
      front: { text: string, image?: string, audio?: string, phonetic?: string },
      back: { text: string, translation: string, explanation?: string, example?: string }
    }[]
  }
}
```

### 3. Curriculum Populating Strategy

We will create/update the following files to include a varied mix of exercises:
- `src/lib/a1-m1-l1-detailed.ts` to `src/lib/a1-m3-l1-detailed.ts` (Upgrade existing)
- `src/lib/a1-m4-l1-detailed.ts` to `src/lib/a1-m9-l4-detailed.ts` (Create new)

Each lesson will follow this "Fun" template:
1. **Introduction**: 1-2 Flashcard exercises for vocabulary.
2. **Practice**: 1-2 standard exercises (Multiple Choice / Fill Blank).
3. **Engagement**: 1 "Fun" exercise (Word Search / Crossword / Drag & Drop).
4. **Production**: 1 Speaking/Writing exercise.

### 4. Course Data Integration
Update `src/lib/course-data-a1.ts` to:
- Map correct exercise sets to each lesson.
- Ensure modules 4-9 are fully populated.
- Fix any incorrect mappings (e.g., Lesson 1 mapping to L7 exercises).

## Verification Plan

### Automated Verification
- **Linting**: Run `npm run lint` to ensure code quality.
- **Type Checking**: Run `npm run typecheck` (or `tsc`) to ensure data structures match expected types.
- **Validation Script**: Use/Update `scripts/validate-exercises.mjs` to verify all new exercises have required fields.

### Manual Verification
- Navigate through the A1 course in the browser.
- Verify each new exercise type renders correctly.
- Verify that completing an exercise grants XP/rewards (handled by existing `ExerciseRenderer`).
