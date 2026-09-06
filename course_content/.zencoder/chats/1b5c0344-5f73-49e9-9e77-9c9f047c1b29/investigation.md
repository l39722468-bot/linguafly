# Investigation and Planning - Bug Fix

## Bug Summary
The deployment fails due to three main issues:
1.  **Module Resolution Error**: `src/app/curso-a2/[unitId]/page.tsx` fails to resolve `lib/course/a2` during build.
2.  **OpenAI Quota Exceeded**: Exercise pre-generation is auto-starting during the build phase, exhausting the OpenAI quota.
3.  **Dynamic Rendering Warning**: `MisionesPage` catches a `Dynamic server usage` error when using `cookies()` in a page that Next.js attempts to prerender.

## Root Cause Analysis
1.  **Module Resolution**: The dynamic import in `src/app/curso-a2/[unitId]/page.tsx` uses both an alias and a relative path. The relative path fallback `../../../lib/course/a2` might be problematic during static analysis by Next.js/Webpack if it's somehow misinterpreted as `../../../../`.
2.  **OpenAI Quota**: In `src/lib/ai/exercise-pre-generator.ts`, the auto-start logic at the bottom of the file only checks for `!process.env.CI`. In some build environments, `CI` might not be enough, or it should also check for `NEXT_PHASE === 'phase-production-build'`.
3.  **Dynamic Rendering**: `MisionesPage` uses `cookies()` inside a `try-catch` block. Even with `force-dynamic`, Next.js 15 might try to prerender it during build, which triggers the error.

## Affected Components
- `src/app/curso-a2/[unitId]/page.tsx`
- `src/lib/ai/exercise-pre-generator.ts`
- `src/app/misiones/page.tsx`

## Proposed Solution
1.  **Fix Dynamic Imports**: Use `@/lib/...` consistently and remove the fallback if possible, or ensure it's correct.
2.  **Prevent Pre-generation during Build**: Update the auto-start check to include `process.env.NEXT_PHASE !== 'phase-production-build'` and `!process.env.VERCEL`.
3.  **Handle Dynamic Rendering Error**: Silent the warning in `MisionesPage` if it's a `DYNAMIC_SERVER_USAGE` error during build.
