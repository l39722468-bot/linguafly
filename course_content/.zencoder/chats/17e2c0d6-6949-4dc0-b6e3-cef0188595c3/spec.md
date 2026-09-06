# Technical Specification: Fix Client-Side Error Preventing App Load

## Problem Statement
The application is showing a client-side error: "Application error: a client-side exception has occurred while loading www.focus-on-english.com (see the browser console for more information)."

## Root Cause Analysis
TypeScript compilation errors are preventing proper builds:
- **Missing exports**: Modules referenced in components don't export expected members (e.g., `CEFRLevel` from `cambridge-curriculum`)
- **Type mismatches**: Exercise dispatcher components have misaligned type definitions
- **Unresolved imports**: Missing component files (e.g., `MultipleChoiceExercise`)
- **Invalid property access**: Components trying to access properties that don't exist on union types

## Difficulty Level
**MEDIUM** - Multiple scattered TypeScript errors across different components and files, but all are fixable through:
- Correcting type definitions
- Adding missing exports
- Creating missing components
- Fixing property access patterns

## Technical Context
- **Language**: TypeScript 5.7.2
- **Framework**: Next.js 15.5.11 with App Router
- **Build Verification**: `npm run type-check` (should pass with no errors)
- **Dependencies**: All relevant dependencies are already in package.json

## Implementation Approach

### Phase 1: Fix Core Export Issues
1. Fix `cambridge-curriculum.ts` - ensure `CEFRLevel` is exported
2. Fix `course-data-b2.ts` - ensure `MODULE_1_LESSONS` is exported if needed
3. Check other module exports referenced in imports

### Phase 2: Fix Component Type Issues
1. Fix `B2ExerciseDispatcher.tsx` - resolve union type property access
2. Fix `C1ExerciseDispatcher.tsx` - resolve missing component import and type issues
3. Add type guards where needed

### Phase 3: Handle Missing Components
1. Create missing `MultipleChoiceExercise` component or fix the import
2. Verify all component imports resolve correctly

### Phase 4: Fix Test Files
1. Update test files to match new exports
2. Fix implicit `any` type errors in test parameters

## Source Files to Modify
- `src/lib/cambridge-curriculum.ts` - export `CEFRLevel`
- `src/lib/course-data-b2.ts` - export `MODULE_1_LESSONS` or remove if unused
- `src/components/course/B2ExerciseDispatcher.tsx` - fix type issues
- `src/components/course/C1ExerciseDispatcher.tsx` - fix imports and types
- `src/components/ContinuousPractice.tsx` - fix import
- Various test files - fix type errors
- Scripts files - fix type issues

## Verification Approach
1. Run `npm run type-check` - should complete with zero errors
2. Run `npm run lint` - should complete with zero errors
3. Run `npm run build` - should complete successfully
4. Verify app loads in browser without error
5. Run `npm run test` to ensure no regression

## Success Criteria
- ✅ `npm run type-check` passes (0 errors)
- ✅ `npm run lint` passes (0 errors)
- ✅ `npm run build` completes successfully
- ✅ Application loads in browser without client-side error
- ✅ No test regressions

## Estimated Effort
~2-3 hours for full resolution including testing and verification.
