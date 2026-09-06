# Technical Specification: Audio Verification for English A1 Course

## Technical Context
- **Language**: Node.js (JavaScript/ESM or CJS)
- **Dependencies**: `fs`, `path` (native)
- **Target Files**: `src/content/cursos/ingles-a1/*.json`
- **Audio Root**: `public/`

## Implementation Approach
We will create a script `scripts/verify-a1-audio.mjs` (using ESM) that:
1. Iterates through all `.json` files in `src/content/cursos/ingles-a1/`.
2. For each file, parses the JSON and recursively searches for the `audioUrl` key.
3. Collects all unique audio URLs.
4. For each URL, checks if the file exists in the `public` directory.
5. Outputs a report of:
   - Total JSON files scanned.
   - Total unique audio references found.
   - List of missing audio files (if any).
   - List of existing audio files found.

## Source Code Structure Changes
- **New File**: `scripts/verify-a1-audio.mjs`

## Verification Approach
- Run the script manually using `node scripts/verify-a1-audio.mjs`.
- The script should provide clear console output.

## Delivery Phases
- **Phase 1**: Implement the verification script logic.
- **Phase 2**: Run the verification and present results.
