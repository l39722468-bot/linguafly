# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements
...
### [x] Step: Technical Specification
...
### [x] Step: Planning
...
### [x] Step: Implementation

#### Phase 1: Navigation & Focus
- [x] Add `focusedCell` and `direction` state to `CrosswordExercise.tsx`
- [x] Implement keyboard navigation (Arrow keys, Backspace, Space)
- [x] Implement active cell and active word highlighting in the grid

#### Phase 2: Clue Interaction
- [x] Implement active clue highlighting in the clues panel
- [x] Add click handlers to clues to focus corresponding grid cells
- [x] Ensure two-way sync between grid focus and clue panel

#### Phase 3: UX Refinement & Mobile
- [x] Improve responsiveness of the grid on small screens
- [x] Add smooth transitions for highlights
- [x] Verify overall experience and run lint/tests
- [x] Adjust vertical positioning of the crossword (subirlo)
- [x] Reduce cell size to fit entire crossword on screen
