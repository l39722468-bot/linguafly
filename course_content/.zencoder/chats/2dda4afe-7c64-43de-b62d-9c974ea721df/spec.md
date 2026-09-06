# A2 Grammar Content Display - Chat Documentation

## Objective
Display the grammatical content of all 60 A2 units in a clear, organized format in the chat.

**Scope**: Chat-only display (no web implementation)

---

## Data Source
`src/lib/a2-syllabus.ts` contains `A2_FULL_SYLLABUS` array with all 60 units, structured as:
```ts
{
  id: number;
  module: number;
  title: string;
  theme: string;
  grammar: string[];
  vocabulary: string[];
}
```

---

## Output Format
Present all 60 A2 units organized by:
- **Module** (1-10, 6 units each)
- **Unit ID & Title**
- **Theme**
- **Grammar Topics** (each unit's grammar topics listed)
- **Vocabulary** (quick reference)

---

## No Implementation Tasks
This is documentation/reference only. No code changes required.  
