# Spec and build

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:

- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [x] Step: Technical Specification (Analizando integración de AI Gateway)

Assess the task's difficulty, as underestimating it leads to poor outcomes.

- **Complexity**: medium (Requiere migrar clientes de IA y asegurar que el streaming siga funcionando)

**Proposed Approach**:
1. Identificar archivos que usan `openai` (ej. `scripts/generate-course-audio.ts`, componentes de chat o feedback).
2. Configurar las variables de entorno para el Gateway en Vercel.
3. Actualizar la implementación para usar el endpoint del Gateway.

---

### [ ] Step: Implementation (Configuración y Migración)

1. **Setup**: Configurar el endpoint centralizado del AI Gateway.
2. **Migration**: Actualizar `src/app/api/evaluate-*` para usar el Gateway.
3. **Verification**: Validar el streaming en el AI Tutor.
4. **Testing**: Verificar que los reportes de tokens aparezcan en el dashboard de Vercel.
