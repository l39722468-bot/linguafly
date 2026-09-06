# Requirements: Audio Verification for English A1 Course

## Overview
The goal is to ensure that all listening exercises in the `ingles-a1` course have their corresponding audio files present in the `public` directory.

## Scope
- Course: `ingles-a1`
- Content Location: `src/content/cursos/ingles-a1/*.json`
- Audio Location: `public/audio/courses/ingles-a1/shared/` (and potentially others referenced in JSON)

## Requirements
1. Identify all `unit*.json` files for the A1 course.
2. Parse each JSON file to find all occurrences of `audioUrl`.
3. Verify that each `audioUrl` points to a file that actually exists in the `public` folder.
4. Generate a list of all referenced audio files and their status (Found/Missing).
5. Provide a summary of the verification results.
