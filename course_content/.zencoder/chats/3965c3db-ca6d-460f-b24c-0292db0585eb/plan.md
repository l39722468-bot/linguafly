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

Save the output to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/3965c3db-ca6d-460f-b24c-0292db0585eb/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach
- Source code structure changes
- Data model / API / interface changes
- Verification approach

If the task is complex enough, create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/3965c3db-ca6d-460f-b24c-0292db0585eb/spec.md`:

- Break down the work into concrete tasks (incrementable, testable milestones)
- Each task should reference relevant contracts and include verification steps
- Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function).

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/3965c3db-ca6d-460f-b24c-0292db0585eb/plan.md`. If the feature is trivial and doesn't warrant this breakdown, keep the Implementation step below as is.

---

### [x] Step: Implementation

1. [x] Translate `GRAMMAR_QUESTIONS` in `src/lib/a1-m1-l2-detailed.ts`.
2. [x] Translate `READING_EXERCISES` in `src/lib/a1-m1-l2-detailed.ts`.
3. [x] Run `npm run lint`.
4. [x] Manually verify on `/debug/a1-preview/unit-2`.
5. [x] Write E2E test to verify translations.
6. [x] Run E2E test and verify output.

7. After completion, write a report to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/3965c3db-ca6d-460f-b24c-0292db0585eb/report.md` describing:
   - What was implemented
   - How the solution was tested
   - The biggest issues or challenges encountered
