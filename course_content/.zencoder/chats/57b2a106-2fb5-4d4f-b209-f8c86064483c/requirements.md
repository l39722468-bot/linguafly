# Product Requirements Document (PRD) - A1 Crossword Experience Improvements

## 1. Goal
The objective is to upgrade the current crossword exercise component to provide an "excellent user experience" for students in the A1 English course. This includes better navigation, visual feedback, and responsiveness.

## 2. User Stories
- As a student, I want to easily navigate the crossword grid using my keyboard (arrows, backspace).
- As a student, I want to see which word I am currently filling in and which clue it corresponds to.
- As a student, I want to click on a clue and have the grid focus on the correct starting cell.
- As a student, I want the crossword to look good and be easy to use on my mobile device.
- As a student, I want clear feedback when I enter a correct or incorrect letter (if I choose to check).

## 3. Functional Requirements

### 3.1 Grid Navigation
- **Arrow Keys**: Navigate up, down, left, right within the grid.
- **Backspace**: Delete the current cell's content and move to the previous cell in the current word's direction.
- **Auto-Advance**: Automatically move to the next cell in the word after typing a letter.
- **Direction Toggle**: If a cell belongs to both a horizontal and vertical word, allow toggling direction (e.g., by clicking the cell again or pressing Space).

### 3.2 Visual Feedback
- **Active Cell Highlighting**: The cell currently focused should have a distinct highlight.
- **Active Word Highlighting**: All cells in the word currently being filled should have a subtle background highlight.
- **Clue Synchronization**: The clue corresponding to the active word should be highlighted in the clues panel.
- **Error/Success States**: Improve the visual representation of correct/incorrect cells when "Comprobar" is clicked.

### 3.3 Clue Panel Interactions
- Clicking a clue should:
    - Focus the first empty cell of that word (or the first cell if all are filled).
    - Set the current direction to match the clue (Across or Down).

### 3.4 Responsiveness
- The grid should scale down for smaller screens without breaking the layout.
- Clues should remain accessible even on mobile (perhaps a scrollable area or a different layout).

## 4. Non-Functional Requirements
- **Performance**: Smooth transitions and no lag during typing.
- **Accessibility**: Ensure inputs are properly labeled for screen readers.

## 5. UI/UX Design (Proposed)
- Use a "Focus English" theme colors (Orange/Blue).
- Smooth animations for highlighting transitions.
- Better spacing and typography for clues.
