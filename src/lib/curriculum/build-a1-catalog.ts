import { A1_SKILLS, type Skill } from '@/lib/course/engine/skills';
import type {
  CurriculumUnitRecord,
  CurriculumVersionId,
  LearningObjectiveRecord,
  LevelContentCatalog,
} from './content-types';
import { conceptPatternsForSkill } from './a1-skill-tag-patterns';

export const A1_CURRICULUM_VERSION: CurriculumVersionId = 'a1-1.0.0';

function skillToObjective(skill: Skill, unitOrder: number): LearningObjectiveRecord {
  const patterns = conceptPatternsForSkill(skill);
  return {
    id: `obj-${skill.id.toLowerCase()}`,
    unitOrder,
    title: skill.name,
    titleEs: skill.name,
    summaryEs: skill.description,
    skillIds: [skill.id],
    conceptTagPatterns: patterns,
    measurableOutcomesEs: [
      `Reconocer y aplicar "${skill.name}" en contextos A1 (${skill.description}).`,
      'Usar formas cortas y naturales en interacciones sencillas.',
    ],
  };
}

function groupSkillsByUnit(): Map<number, Skill[]> {
  const map = new Map<number, Skill[]>();
  for (const skill of Object.values(A1_SKILLS)) {
    if (skill.id === 'A1-UNIVERSAL') continue;
    const u = skill.unit;
    if (!map.has(u)) map.set(u, []);
    map.get(u)!.push(skill);
  }
  for (const [, list] of map) {
    list.sort((a, b) => a.id.localeCompare(b.id));
  }
  return map;
}

/**
 * Catálogo A1: unidades = números de unidad del skill registry; objetivos = skills agrupados.
 */
export function buildA1ContentCatalog(): LevelContentCatalog {
  const byUnit = groupSkillsByUnit();
  const unitOrderList = [...byUnit.keys()].sort((a, b) => a - b);

  const units: CurriculumUnitRecord[] = unitOrderList.map((order, idx) => {
    const skills = byUnit.get(order)!;
    const unitId = `a1-u${order}`;
    const prerequisiteUnitIds = order > 1 ? [`a1-u${order - 1}`] : [];

    const title = `Unit ${order}`;
    const titleEs = `Unidad ${order}`;

    return {
      id: unitId,
      version: A1_CURRICULUM_VERSION,
      order,
      title,
      titleEs,
      prerequisiteUnitIds,
      objectives: skills.map((s) => skillToObjective(s, order)),
    };
  });

  return {
    cefrLevel: 'A1',
    version: A1_CURRICULUM_VERSION,
    label: 'Linguafly · A1 · v1.0.0',
    effectiveFrom: '2025-01-01',
    units,
  };
}
