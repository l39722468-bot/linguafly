# Technical Specification: Exhaustive English Exercise Database

## 1. Technical Context
- **Language**: TypeScript
- **Framework**: Next.js 15 (App Router)
- **Data Storage**: JSON-based filesystem (`src/content/cursos/`) with Supabase as the eventual source of truth for dynamic/expanded content.
- **Validation**: Zod (`src/lib/course-engine/schema.ts`).
- **Engine**: `UltraAdaptiveEngine` and `GlobalContentProvider`.

## 2. Implementation Approach

### 2.1. Content Organization
The database will be organized by CEFR level within the `src/content/cursos/` directory. Each level will have its own subdirectory containing multiple JSON files (units).

```bash
src/content/cursos/
├── ingles-a1/
├── ingles-a2/
├── ingles-b1/
├── ingles-b2/
├── ingles-c1/  # New/Expanded
└── ingles-c2/  # New/Expanded
```

### 2.2. Data Model
Exercises must strictly follow the `InteractionSchema`.
- **Primary storage**: JSON files for static curriculum.
- **Dynamic storage**: `course_exercises` table in Supabase for user-specific or newly generated content.

### 2.3. GlobalContentProvider Integration
The `GlobalContentProvider` will be updated (if necessary) to ensure it indexes:
1. All JSON files in `src/content/cursos/`.
2. Specializations (generic, travel, it, finance, etc.) based on `unit_title` or specific flags.

## 3. Source Code Structure Changes
- **Content Expansion**: Create missing directories for `ingles-c1` and `ingles-c2`.
- **Validation Scripts**: Use or update existing scripts to ensure all new content is valid JSON and follows the `InteractionSchema`.

## 4. Delivery Phases

### Phase 1: Infrastructure & A1-B2 Audit
- Verify existing content for schema compliance.
- Standardize metadata (`concept_tags`, `complexity`).

### Phase 2: C1 & C2 Seed
- Generate 5-10 units per level for C1 and C2.
- Focus on advanced grammar (inversion, cleft sentences) and high-level vocabulary.

### Phase 3: Specialization Injection
- Add specific tags for Professional paths (IT, Finance) across relevant levels.

## 5. Verification Approach
- **Linting**: `npm run lint`
- **Validation**: Run `npm run validate-exercises` (if exists) or a custom script using the `InteractionSchema`.
- **Manual Verification**: Test the `/practica-inteligente` page with forced levels to ensure content loads correctly.
