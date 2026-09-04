/**
 * Modelo de contenido: qué se estudia, en qué orden y cómo se enlaza con tags del sistema.
 * Las etiquetas `concept_tag` / `mastery_tag` del catálogo y de `user_mastery` deben poder
 * resolverse a objetivos mediante `conceptTagPatterns` (prefijos o coincidencia parcial).
 */

export type CefrLevelCode = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

/** Versión semántica del currículo (p. ej. alinear prompts y auditorías). */
export type CurriculumVersionId = string;

/**
 * Un resultado de aprendizaje atómico dentro de una unidad.
 * Vinculado a IDs del registro de skills (`A1_SKILLS`, etc.) y a patrones de tag.
 */
export interface LearningObjectiveRecord {
  id: string;
  /** Orden dentro del nivel (1 = primera unidad pedagógica). */
  unitOrder: number;
  title: string;
  titleEs: string;
  /** Resumen para prompts de IA y documentación interna. */
  summaryEs: string;
  /** IDs del skill registry (p. ej. A1-GREET-01). */
  skillIds: string[];
  /**
   * Patrones para enlazar con `mastery_tag` / `concept_tag` del contenido.
   * Regla: se considera match si el tag del ítem empieza por el patrón o es igual.
   * Ej.: `grammar/be` casa con patrón `grammar/be`.
   */
  conceptTagPatterns: string[];
  /** Criterios observables en A1 (metas medibles). */
  measurableOutcomesEs: string[];
}

/**
 * Unidad didáctica versionada (bloque secuencial dentro del nivel).
 */
export interface CurriculumUnitRecord {
  id: string;
  version: CurriculumVersionId;
  /** 1-based order dentro del nivel. */
  order: number;
  title: string;
  titleEs: string;
  /** IDs de unidades que deben abordarse antes (vacío en la primera). */
  prerequisiteUnitIds: string[];
  objectives: LearningObjectiveRecord[];
}

/**
 * Catálogo completo de un nivel CEFR (fuente de verdad para “qué enseñar”).
 */
export interface LevelContentCatalog {
  cefrLevel: CefrLevelCode;
  version: CurriculumVersionId;
  /** Etiqueta legible: "A1 Linguafly v1.0". */
  label: string;
  /** Fecha ISO a partir de la cual aplica esta versión. */
  effectiveFrom: string;
  units: CurriculumUnitRecord[];
}
