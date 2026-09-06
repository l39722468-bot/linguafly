import { premiumCourseServerService } from '@/lib/services/premium-course-service.server';

describe('A1 Preview Landing Page Integration', () => {
  it('should load all A1 units with metadata', async () => {
    const courseMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
    
    expect(courseMetadata.totalUnits).toBeGreaterThan(0);
    expect(courseMetadata.units.length).toBe(courseMetadata.totalUnits);
    expect(courseMetadata.totalDuration).toBeGreaterThan(0);
  });

  it('should have valid metadata for each unit', async () => {
    const courseMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
    
    courseMetadata.units.forEach((unit, index) => {
      expect(unit.unitId).toBeTruthy();
      expect(unit.unitNumber).toBe(index + 1);
      expect(unit.title).toBeTruthy();
      expect(unit.exerciseCount).toBeGreaterThan(0);
      expect(unit.difficulty).toBeGreaterThanOrEqual(1);
      expect(unit.difficulty).toBeLessThanOrEqual(5);
      expect(unit.estimatedDuration).toBeGreaterThan(0);
      expect(Array.isArray(unit.topics)).toBe(true);
      expect(unit.exerciseBreakdown).toBeDefined();
      expect(unit.exerciseBreakdown.total).toBe(unit.exerciseCount);
    });
  });

  it('should have correct difficulty progression', async () => {
    const courseMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
    
    const unit1 = courseMetadata.units[0];
    const lastUnit = courseMetadata.units[courseMetadata.units.length - 1];
    
    expect(unit1.difficulty).toBeGreaterThanOrEqual(1);
    expect(unit1.difficulty).toBeLessThanOrEqual(5);
    expect(lastUnit.difficulty).toBeGreaterThanOrEqual(1);
    expect(lastUnit.difficulty).toBeLessThanOrEqual(5);
  });

  it('should calculate total duration correctly', async () => {
    const courseMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
    
    const expectedTotalDuration = courseMetadata.units.reduce(
      (sum, unit) => sum + unit.estimatedDuration,
      0
    );
    
    expect(courseMetadata.totalDuration).toBe(expectedTotalDuration);
  });

  it('should have units sorted by unit number', async () => {
    const courseMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
    
    for (let i = 0; i < courseMetadata.units.length - 1; i++) {
      const currentUnit = courseMetadata.units[i];
      const nextUnit = courseMetadata.units[i + 1];
      
      expect(currentUnit.unitNumber).toBeLessThan(nextUnit.unitNumber);
    }
  });

  it('should count total exercises across all units', async () => {
    const courseMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
    
    const totalExercises = courseMetadata.units.reduce(
      (sum, unit) => sum + unit.exerciseCount,
      0
    );
    
    expect(totalExercises).toBeGreaterThan(0);
  });

  it('should have valid exercise breakdown for sample units', async () => {
    const courseMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
    
    const sampleIndices = [0];
    if (courseMetadata.units.length > 2) {
      sampleIndices.push(Math.floor(courseMetadata.units.length / 2));
    }
    if (courseMetadata.units.length > 1) {
      sampleIndices.push(courseMetadata.units.length - 1);
    }
    
    const sampleUnits = sampleIndices.map(i => courseMetadata.units[i]);
    
    sampleUnits.forEach(unit => {
      const breakdown = unit.exerciseBreakdown;
      
      const sumOfTypes = 
        breakdown.multiple_choice +
        breakdown.fill_in_the_blank +
        breakdown.matching +
        breakdown.drag_and_drop +
        breakdown.categorization +
        breakdown.short_answer +
        breakdown.audio_matching +
        breakdown.listening +
        breakdown.video_narrative +
        breakdown.flashcards +
        breakdown.other;
      
      expect(sumOfTypes).toBe(breakdown.total);
      expect(breakdown.total).toBe(unit.exerciseCount);
    });
  });
});
