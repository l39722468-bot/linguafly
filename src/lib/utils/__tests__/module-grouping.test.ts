import { groupUnitsIntoModules } from '../module-grouping';
import { UnitMetadata } from '@/types/premium-course';

const createMockUnit = (unitNumber: number): UnitMetadata => ({
  unitId: `unit-${unitNumber}`,
  unitNumber,
  title: `Unit ${unitNumber} Title`,
  topics: ['Grammar', 'Vocabulary'],
  exerciseCount: 10,
  exerciseBreakdown: {
    multiple_choice: 5,
    fill_in_the_blank: 2,
    matching: 1,
    drag_and_drop: 1,
    categorization: 0,
    short_answer: 1,
    audio_matching: 0,
    listening: 0,
    video_narrative: 0,
    flashcards: 0,
    other: 0,
    total: 10
  },
  difficulty: Math.min(5, Math.ceil(unitNumber / 12)),
  estimatedDuration: 30,
  learningOutcomes: ['Learning outcome 1', 'Learning outcome 2'],
  masteryTags: ['grammar.present_simple', 'vocabulary.greetings']
});

describe('groupUnitsIntoModules', () => {
  it('should correctly group 60 units into 6 modules', () => {
    const units = Array.from({ length: 60 }, (_, i) => createMockUnit(i + 1));
    const modules = groupUnitsIntoModules(units);

    expect(modules).toHaveLength(6);
    
    modules.forEach((module, index) => {
      expect(module.moduleNumber).toBe(index + 1);
      expect(module.units).toHaveLength(10);
      expect(module.unitCount).toBe(10);
    });
  });

  it('should calculate total duration correctly for each module', () => {
    const units = Array.from({ length: 60 }, (_, i) => createMockUnit(i + 1));
    const modules = groupUnitsIntoModules(units);

    modules.forEach(module => {
      expect(module.totalDuration).toBe(300);
    });
  });

  it('should assign correct module titles', () => {
    const units = Array.from({ length: 60 }, (_, i) => createMockUnit(i + 1));
    const modules = groupUnitsIntoModules(units);

    expect(modules[0].title).toBe('Module 1: Basics & Greetings');
    expect(modules[1].title).toBe('Module 2: Daily Life & Routines');
    expect(modules[2].title).toBe('Module 3: People & Relationships');
    expect(modules[3].title).toBe('Module 4: Shopping & Services');
    expect(modules[4].title).toBe('Module 5: Travel & Directions');
    expect(modules[5].title).toBe('Module 6: Food & Leisure');
  });

  it('should assign correct module descriptions', () => {
    const units = Array.from({ length: 60 }, (_, i) => createMockUnit(i + 1));
    const modules = groupUnitsIntoModules(units);

    expect(modules[0].description).toContain('essential greetings');
    expect(modules[1].description).toContain('daily activities');
    expect(modules[5].description).toContain('dining, entertainment');
  });

  it('should handle fewer than 60 units', () => {
    const units = Array.from({ length: 25 }, (_, i) => createMockUnit(i + 1));
    const modules = groupUnitsIntoModules(units);

    expect(modules).toHaveLength(3);
    expect(modules[0].units).toHaveLength(10);
    expect(modules[1].units).toHaveLength(10);
    expect(modules[2].units).toHaveLength(5);
    expect(modules[2].unitCount).toBe(5);
  });

  it('should handle empty units array', () => {
    const modules = groupUnitsIntoModules([]);

    expect(modules).toHaveLength(0);
  });

  it('orders modules by unit number even if the list arrives scrambled', () => {
    const units = Array.from({ length: 12 }, (_, index) => createMockUnit(12 - index));
    const modules = groupUnitsIntoModules(units);

    expect(modules[0].units.map((unit) => unit.unitNumber)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(modules[1].units.map((unit) => unit.unitNumber)).toEqual([11, 12]);
  });

  it('should maintain unit order within modules', () => {
    const units = Array.from({ length: 30 }, (_, i) => createMockUnit(i + 1));
    const modules = groupUnitsIntoModules(units);

    expect(modules[0].units[0].unitNumber).toBe(1);
    expect(modules[0].units[9].unitNumber).toBe(10);
    expect(modules[1].units[0].unitNumber).toBe(11);
    expect(modules[1].units[9].unitNumber).toBe(20);
    expect(modules[2].units[0].unitNumber).toBe(21);
    expect(modules[2].units[9].unitNumber).toBe(30);
  });
});
