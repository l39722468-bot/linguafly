# Technical Specification - A1 Crossword Experience Improvements

## 1. Technical Context
- **Language**: TypeScript
- **Framework**: React (Next.js 15)
- **UI Library**: Tailwind CSS, Lucide Icons

## 2. Implementation Approach

### 2.1 State Management
We will enhance the state of `CrosswordExercise` to track the focused cell and direction:
- `focusedCell`: `{ r: number, c: number } | null`
- `direction`: `'across' | 'down'`
- `highlightedCells`: Computed from `focusedCell` and `direction`.

### 2.2 Navigation Logic
- Implement `onKeyDown` handler for the input cells:
    - **Arrows**: Update `focusedCell`.
    - **Backspace**: If current cell is empty, move to previous cell and clear it.
    - **Space**: Toggle `direction`.
- Enhance `handleInputChange`:
    - Auto-advance to next cell in current `direction`.

### 2.3 Clue Panel Synchronization
- Highlight the active clue by checking if any item matches the `focusedCell` and `direction`.
- Add `onClick` to clues to set `focusedCell` to the start of the word and set the `direction`.

### 2.4 Styling & Animations
- Use Tailwind classes for highlighting:
    - `bg-orange-500` for active cell.
    - `bg-orange-100` for active word.
    - `border-orange-500` for active clue.
- Ensure grid responsiveness using `aspect-square` or relative sizing if possible, or maintain `fit-content` with better overflow handling.

## 3. Source Code Changes

### `src/components/exercises/CrosswordExercise.tsx`
- Refactor state to include focus and direction.
- Add `useEffect` to handle keyboard events globally or per-input.
- Update render logic to apply conditional styles for highlighting.
- Update clue panel to handle clicks and highlight active clue.

## 4. Verification Approach
- **Manual Testing**: Verify navigation on desktop and mobile.
- **Linting**: Run `npm run lint`.
- **Type Checking**: Run `npm run typecheck` (if available) or rely on editor diagnostics.
- **Functionality**: Ensure "Comprobar", "Ver Solución", and "Reiniciar" still work correctly.

## 5. Delivery Phases
1. **Phase 1: Navigation & Focus**: Arrow keys, Backspace, and highlighting.
2. **Phase 2: Clue Interaction**: Clicking clues and syncing highlighting.
3. **Phase 3: Refinement & Mobile**: Polish styles and ensure mobile usability.
