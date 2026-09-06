import { premiumCourseServerService } from '@/lib/services/premium-course-service.server';
import { A1CourseMetadata } from '@/types/premium-course';
import fs from 'fs';
import path from 'path';

describe('premiumCourseServerService - A1 Units with Metadata', () => {
  let courseMetadata: A1CourseMetadata;

  beforeAll(async () => {
    courseMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
  });

  describe('getA1UnitsWithMetadata', () => {
    it('should load all A1 units from the directory', async () => {
      const contentDir = path.join(process.cwd(), 'src/content/cursos/ingles-a1-narrative');
      const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.json'));
      
      expect(courseMetadata.totalUnits).toBe(files.length);
      expect(courseMetadata.units.length).toBe(files.length);
      expect(courseMetadata.totalUnits).toBeGreaterThan(0);
    });

    it('should return valid course metadata structure', () => {
      expect(courseMetadata).toHaveProperty('totalUnits');
      expect(courseMetadata).toHaveProperty('totalDuration');
      expect(courseMetadata).toHaveProperty('units');
      expect(Array.isArray(courseMetadata.units)).toBe(true);
    });

    it('should calculate total duration correctly', () => {
      const calculatedDuration = courseMetadata.units.reduce(
        (sum, unit) => sum + unit.estimatedDuration,
        0
      );
      expect(courseMetadata.totalDuration).toBe(calculatedDuration);
      expect(courseMetadata.totalDuration).toBeGreaterThan(0);
    });

    it('should sort units by unit number', () => {
      const unitNumbers = courseMetadata.units.map(u => u.unitNumber);
      const sortedNumbers = [...unitNumbers].sort((a, b) => a - b);
      expect(unitNumbers).toEqual(sortedNumbers);
    });

    it('should have valid metadata for unit 1', () => {
      const unit1 = courseMetadata.units.find(u => u.unitNumber === 1);
      
      expect(unit1).toBeDefined();
      expect(unit1?.unitId).toBe('unit1');
      expect(unit1?.title).toBe('Welcome to London: Heathrow Arrival');
      expect(unit1?.difficulty).toBe(1);
      expect(unit1?.exerciseCount).toBeGreaterThan(0);
      expect(unit1?.estimatedDuration).toBe(60);
      expect(Array.isArray(unit1?.topics)).toBe(true);
    });

    it('should have valid metadata for middle unit (if exists)', () => {
      if (courseMetadata.units.length >= 5) {
        const unit5 = courseMetadata.units.find(u => u.unitNumber === 5);
        
        expect(unit5).toBeDefined();
        expect(unit5?.unitId).toBe('unit5');
        expect(unit5?.difficulty).toBeGreaterThanOrEqual(1);
        expect(unit5?.difficulty).toBeLessThanOrEqual(5);
        expect(unit5?.exerciseCount).toBeGreaterThan(0);
      }
    });

    it('should have valid metadata for last unit', () => {
      const lastUnit = courseMetadata.units[courseMetadata.units.length - 1];
      
      expect(lastUnit).toBeDefined();
      expect(lastUnit.unitId).toBeTruthy();
      expect(lastUnit.unitNumber).toBeGreaterThan(0);
      expect(lastUnit.difficulty).toBeGreaterThanOrEqual(1);
      expect(lastUnit.difficulty).toBeLessThanOrEqual(5);
      expect(lastUnit.exerciseCount).toBeGreaterThan(0);
    });

    it('should have valid exercise breakdown for all units', () => {
      courseMetadata.units.forEach(unit => {
        expect(unit.exerciseBreakdown).toBeDefined();
        expect(unit.exerciseBreakdown.total).toBe(unit.exerciseCount);
        
        const sum = unit.exerciseBreakdown.multiple_choice +
                    unit.exerciseBreakdown.fill_in_the_blank +
                    unit.exerciseBreakdown.matching +
                    unit.exerciseBreakdown.drag_and_drop +
                    unit.exerciseBreakdown.categorization +
                    unit.exerciseBreakdown.short_answer +
                    unit.exerciseBreakdown.audio_matching +
                    unit.exerciseBreakdown.listening +
                    unit.exerciseBreakdown.video_narrative +
                    unit.exerciseBreakdown.flashcards +
                    unit.exerciseBreakdown.other;
        
        expect(sum).toBe(unit.exerciseBreakdown.total);
      });
    });

    it('should extract topics from all units', () => {
      courseMetadata.units.forEach(unit => {
        expect(Array.isArray(unit.topics)).toBe(true);
      });
    });

    it('should have unique unit IDs', () => {
      const unitIds = courseMetadata.units.map(u => u.unitId);
      const uniqueIds = new Set(unitIds);
      expect(uniqueIds.size).toBe(unitIds.length);
    });

    it('should have sequential unit numbers', () => {
      const unitNumbers = courseMetadata.units.map(u => u.unitNumber);
      const expectedNumbers = Array.from({ length: unitNumbers.length }, (_, i) => i + 1);
      expect(unitNumbers).toEqual(expectedNumbers);
    });

    it('should handle missing directory gracefully', async () => {
      const originalReaddir = fs.readdirSync;
      const originalExists = fs.existsSync;
      
      jest.spyOn(fs, 'existsSync').mockReturnValue(false);
      
      const emptyMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
      
      expect(emptyMetadata.totalUnits).toBe(0);
      expect(emptyMetadata.units.length).toBe(0);
      expect(emptyMetadata.totalDuration).toBe(0);
      
      jest.restoreAllMocks();
    });

    it('should handle malformed JSON gracefully', async () => {
      const originalReadFile = fs.readFileSync;
      let callCount = 0;
      
      jest.spyOn(fs, 'readFileSync').mockImplementation((filePath: any, encoding?: any) => {
        callCount++;
        if (callCount === 2 && filePath.toString().includes('unit2.json')) {
          throw new Error('Malformed JSON');
        }
        return originalReadFile(filePath, encoding);
      });
      
      const metadata = await premiumCourseServerService.getA1UnitsWithMetadata();
      
      expect(metadata.totalUnits).toBeLessThan(10);
      expect(metadata.totalUnits).toBeGreaterThanOrEqual(0);
      
      jest.restoreAllMocks();
    });
  });
});
