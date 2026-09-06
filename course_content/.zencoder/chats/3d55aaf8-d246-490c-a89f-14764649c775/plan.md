# Spec and build

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:

- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [ ] Step: Technical Specification

Assess the task's difficulty, as underestimating it leads to poor outcomes.

- easy: Straightforward implementation, trivial bug fix or feature
- medium: Moderate complexity, some edge cases or caveats to consider
- hard: Complex logic, many caveats, architectural considerations, or high-risk changes

Create a technical specification for the task that is appropriate for the complexity level:

- Review the existing codebase architecture and identify reusable components.
- Define the implementation approach based on established patterns in the project.
- Identify all source code files that will be created or modified.
- Define any necessary data model, API, or interface changes.
- Describe verification steps using the project's test and lint commands.

Save the output to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/3d55aaf8-d246-490c-a89f-14764649c775/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach
- Source code structure changes
- Data model / API / interface changes
- Verification approach

If the task is complex enough, create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/3d55aaf8-d246-490c-a89f-14764649c775/spec.md`:

- Break down the work into concrete tasks (incrementable, testable milestones)
- Each task should reference relevant contracts and include verification steps
- Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function).

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/3d55aaf8-d246-490c-a89f-14764649c775/plan.md`. If the feature is trivial and doesn't warrant this breakdown, keep the Implementation step below as is.

---

### [x] Step: Implementation

Implement the task according to the technical specification and general engineering best practices.

1. [x] Break the task into steps where possible.
2. [x] Implement the required changes in the codebase.
3. [x] Add and run relevant tests and linters.
4. [x] Perform basic manual verification if applicable.
5. [x] After completion, write a report to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/3d55aaf8-d246-490c-a89f-14764649c775/report.md` describing:
   - What was implemented
   - How the solution was tested
   - The biggest issues or challenges encountered

---

### [x] Phase 4: Enhance Fill-blank Exercises with Guidance Options

1. [x] Modify `ExerciseRenderer.tsx` to support clickable options in `fill-blank` exercises.
2. [x] Update Unit 1 exercises with at least two options for each `fill-blank` task.
3. [x] Update Unit 2 exercises with at least two options for each `fill-blank` task.
4. [x] Verify UI/UX behavior and push changes.

---

### [x] Phase 5: Exhaustive Audit and Pedagogical Refinement of Unit 1

1. [x] Audit all 60 exercises in Unit 1 for pedagogical logic and progression.
2. [x] Ensure all English text has its corresponding `[[English|Spanish]]` translation.
3. [x] Verify that no exercises are repeated.
4. [x] Replace generic explanations with specific, translated linguistic rules.
5. [x] Verify implementation in the browser.
6. [x] Push changes and provide commit hash. (Commit: 32be321a)
