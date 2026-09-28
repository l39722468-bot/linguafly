import { UnitMetadata, ModuleMetadata } from '@/types/premium-course';
import { C1_UI_MODULES } from '../course/c1/c1-curriculum';

const MODULE_TITLES = [
  'Basics & Greetings',
  'Daily Life & Routines',
  'People & Relationships',
  'Shopping & Services',
  'Travel & Directions',
  'Food & Leisure',
];

const MODULE_DESCRIPTIONS = [
  'Learn essential greetings, introductions, and basic conversational phrases to start your English journey.',
  'Master vocabulary and grammar for talking about your daily activities, routines, and schedules.',
  'Describe yourself and others, talk about family, friends, and build social connections in English.',
  'Navigate shopping situations, handle transactions, and interact with various service providers.',
  'Get around confidently by asking for directions, booking accommodations, and traveling independently.',
  'Explore dining, entertainment, hobbies, and cultural topics to enrich your English experience.',
];

export interface GroupUnitsOptions {
  /** Cuando es `ingles-c1`, se usan módulos definidos en `c1-curriculum.ts`, no trozos genéricos de 10. */
  courseId?: string;
}

function groupC1UnitsIntoModules(units: UnitMetadata[]): ModuleMetadata[] {
  const sorted = [...units].sort((a, b) => a.unitNumber - b.unitNumber);
  const modules: ModuleMetadata[] = [];

  C1_UI_MODULES.forEach((def, idx) => {
    const [from, to] = def.unitRange;
    const moduleUnits = sorted.filter((u) => u.unitNumber >= from && u.unitNumber <= to);
    if (moduleUnits.length === 0) return;

    const totalDuration = moduleUnits.reduce((sum, unit) => sum + unit.estimatedDuration, 0);
    modules.push({
      moduleNumber: idx + 1,
      title: def.titleEs,
      unitCount: moduleUnits.length,
      totalDuration,
      description: def.descriptionEs,
      units: moduleUnits,
    });
  });

  return modules;
}

/** Agrupa unidades en módulos para la vista del selector. C1 usa estructura propia; el resto, bloques de 10 (A1). */
export function groupUnitsIntoModules(units: UnitMetadata[], options?: GroupUnitsOptions): ModuleMetadata[] {
  if (options?.courseId === 'ingles-c1') {
    return groupC1UnitsIntoModules(units);
  }

  const orderedUnits = [...units].sort((a, b) => a.unitNumber - b.unitNumber);
  const unitsPerModule = 10;
  const moduleCount = Math.ceil(orderedUnits.length / unitsPerModule);
  const modules: ModuleMetadata[] = [];

  for (let i = 0; i < moduleCount; i++) {
    const moduleNumber = i + 1;
    const startIndex = i * unitsPerModule;
    const endIndex = Math.min(startIndex + unitsPerModule, orderedUnits.length);
    const moduleUnits = orderedUnits.slice(startIndex, endIndex);

    const totalDuration = moduleUnits.reduce((sum, unit) => sum + unit.estimatedDuration, 0);

    modules.push({
      moduleNumber,
      title: `Module ${moduleNumber}: ${MODULE_TITLES[i] || 'Advanced Topics'}`,
      unitCount: moduleUnits.length,
      totalDuration,
      description: MODULE_DESCRIPTIONS[i] || 'Continue advancing your English skills with engaging topics.',
      units: moduleUnits,
    });
  }

  return modules;
}
