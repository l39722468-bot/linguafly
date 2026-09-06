# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/426926dc-b9e2-4685-87dd-8e4822f887f1/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/426926dc-b9e2-4685-87dd-8e4822f887f1/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/426926dc-b9e2-4685-87dd-8e4822f887f1/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/426926dc-b9e2-4685-87dd-8e4822f887f1/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

### [ ] Step: Implementation

1. [x] **Limpiar entorno local**: Eliminar la carpeta `public/docs` creada anteriormente.
2. [x] **Actualizar contenido del artículo (B1-C1)**: Modificar `src/content/blog/metodos/reported-speech-ejercicios-pdf.md` para usar la URL de Supabase.
3. [ ] **Actualizar contenido del artículo (B1-C2)**: Ajustar niveles y textos de B1-C1 a B1-C2.
4. [ ] **Verificación**: Comprobar que los enlaces en el blog apuntan a la URL de Supabase y mencionan B1-C2.
5. [ ] **Validación final**: Ejecutar `npm run lint`.
