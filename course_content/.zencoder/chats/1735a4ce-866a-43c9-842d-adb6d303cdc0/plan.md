# Spec and build

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:

- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [x] Step: Technical Specification

Assess the task's difficulty: **medium**

Create a technical specification for the task:
- Reviewed codebase and identified `ExerciseRenderer` and `UnitPreviewContent`.
- Defined implementation for audio, images, and chunking.
- Identified files to modify.
- Verification approach defined.

Save the output to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/1735a4ce-866a-43c9-842d-adb6d303cdc0/spec.md`.

---

### [x] Step: Implementation

Implement the task according to the technical specification.

1. **[x] Audio Support**: Integrated audio playback into `ExerciseRenderer`. Added play buttons to questions and reading transcripts.
2. **[x] Image Support**: Added image rendering to `ExerciseRenderer`. Verified with placeholder images in Unit 1.
3. **[x] Content Chunking**: Implemented lesson batching (15 exercises per lesson) in `UnitPreviewContent`.
4. **[x] Feedback & Summary**: Enhanced visual feedback and added a "Lesson Completed" screen and a final "Unit Completed" summary screen.
5. **[x] Testing & Linting**: Verified with Playwright E2E tests.

5. After completion, write a report to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/1735a4ce-866a-43c9-842d-adb6d303cdc0/report.md`.

---

### [ ] Step: Global Translation Standardization

Standardize the translation format across all course units.

1. **[ ] Audit**: Identify all files using word-by-word translations.
2. **[ ] Migration Script**: Create a script to merge adjacent `[[word|trad]]` tags into a single `[[Full Sentence|Full Translation]]` tag.
3. **[ ] Execution**: Run the script on all units.
4. **[ ] Verification**: Verify that the translation tooltips still work correctly.
5. **[ ] Manual Fixes**: Fix any cases that the script couldn't handle automatically.
