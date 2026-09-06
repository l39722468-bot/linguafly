import { extractUnitMetadata } from '@/lib/utils/course-metadata';
import { UnitData } from '@/types/premium-course';
import fs from 'fs';
import path from 'path';

describe('course-metadata integration tests', () => {
  it('should extract metadata from actual unit1.json', () => {
    const unitPath = path.join(process.cwd(), 'src/content/cursos/ingles-a1-narrative/unit1.json');
    const unitData: UnitData = JSON.parse(fs.readFileSync(unitPath, 'utf-8'));
    
    const metadata = extractUnitMetadata(unitData);

    expect(metadata.unitId).toBe('unit1');
    expect(metadata.unitNumber).toBe(1);
    expect(metadata.title).toBe('Welcome to London: Heathrow Arrival');
    expect(metadata.difficulty).toBe(1);
    expect(metadata.estimatedDuration).toBe(60);
    expect(metadata.exerciseCount).toBeGreaterThan(0);
  });

  it('should extract metadata from actual unit5.json', () => {
    const unitPath = path.join(process.cwd(), 'src/content/cursos/ingles-a1-narrative/unit5.json');
    const unitData: UnitData = JSON.parse(fs.readFileSync(unitPath, 'utf-8'));
    
    const metadata = extractUnitMetadata(unitData);

    expect(metadata.unitId).toBe('unit5');
    expect(metadata.unitNumber).toBe(5);
    expect(metadata.difficulty).toBe(1);
    expect(metadata.exerciseCount).toBeGreaterThan(0);
  });

  it('should extract metadata from actual unit10.json', () => {
    const unitPath = path.join(process.cwd(), 'src/content/cursos/ingles-a1-narrative/unit10.json');
    const unitData: UnitData = JSON.parse(fs.readFileSync(unitPath, 'utf-8'));
    
    const metadata = extractUnitMetadata(unitData);

    expect(metadata.unitId).toBe('unit10');
    expect(metadata.unitNumber).toBe(10);
    expect(metadata.difficulty).toBe(1);
    expect(metadata.exerciseCount).toBeGreaterThan(0);
  });

  it('should extract valid exercise breakdown from actual unit files', () => {
    const unitPath = path.join(process.cwd(), 'src/content/cursos/ingles-a1-narrative/unit1.json');
    const unitData: UnitData = JSON.parse(fs.readFileSync(unitPath, 'utf-8'));
    
    const metadata = extractUnitMetadata(unitData);

    expect(metadata.exerciseBreakdown.total).toBe(metadata.exerciseCount);
    expect(metadata.exerciseBreakdown.total).toBeGreaterThan(0);
    
    const sum = metadata.exerciseBreakdown.multiple_choice +
                metadata.exerciseBreakdown.fill_in_the_blank +
                metadata.exerciseBreakdown.matching +
                metadata.exerciseBreakdown.drag_and_drop +
                metadata.exerciseBreakdown.categorization +
                metadata.exerciseBreakdown.short_answer +
                metadata.exerciseBreakdown.audio_matching +
                metadata.exerciseBreakdown.listening +
                metadata.exerciseBreakdown.video_narrative +
                metadata.exerciseBreakdown.flashcards +
                metadata.exerciseBreakdown.other;
    
    expect(sum).toBe(metadata.exerciseBreakdown.total);
  });
});
