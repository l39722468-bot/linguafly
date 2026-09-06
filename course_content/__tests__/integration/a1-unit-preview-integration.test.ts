import { premiumCourseServerService } from '@/lib/services/premium-course-service.server';

describe('A1 Unit Preview Page Integration', () => {
  it('should load unit metadata for first unit', async () => {
    const courseMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
    const firstUnit = courseMetadata.units[0];
    
    expect(firstUnit).toBeDefined();
    expect(firstUnit.unitId).toBeTruthy();
    expect(firstUnit.title).toBeTruthy();
    expect(firstUnit.exerciseCount).toBeGreaterThan(0);
  });

  it('should have all required metadata fields for rendering', async () => {
    const courseMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
    const testUnit = courseMetadata.units[0];
    
    expect(testUnit.unitNumber).toBeGreaterThanOrEqual(1);
    expect(testUnit.topics).toBeDefined();
    expect(Array.isArray(testUnit.topics)).toBe(true);
    expect(testUnit.exerciseBreakdown).toBeDefined();
    expect(testUnit.difficulty).toBeGreaterThanOrEqual(1);
    expect(testUnit.difficulty).toBeLessThanOrEqual(5);
    expect(testUnit.estimatedDuration).toBeGreaterThan(0);
  });

  it('should support navigation between units', async () => {
    const courseMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
    
    expect(courseMetadata.units.length).toBeGreaterThan(1);
    
    const firstUnit = courseMetadata.units[0];
    const secondUnit = courseMetadata.units[1];
    
    expect(firstUnit.unitId).not.toBe(secondUnit.unitId);
    expect(firstUnit.unitNumber).toBe(secondUnit.unitNumber - 1);
  });

  it('should have overview header data for all units', async () => {
    const courseMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
    
    courseMetadata.units.forEach(unit => {
      expect(unit.unitNumber).toBeGreaterThan(0);
      expect(unit.title).toBeTruthy();
      expect(unit.estimatedDuration).toBeGreaterThan(0);
      expect(unit.exerciseCount).toBeGreaterThan(0);
    });
  });

  it('should have navigation bar data available', async () => {
    const courseMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
    
    const currentUnitId = courseMetadata.units[1].unitId;
    const currentIndex = courseMetadata.units.findIndex(u => u.unitId === currentUnitId);
    
    expect(currentIndex).toBeGreaterThan(0);
    expect(currentIndex).toBeLessThan(courseMetadata.units.length - 1);
    
    const prevUnit = courseMetadata.units[currentIndex - 1];
    const nextUnit = courseMetadata.units[currentIndex + 1];
    
    expect(prevUnit).toBeDefined();
    expect(nextUnit).toBeDefined();
  });

  it('should maintain existing exercise functionality', async () => {
    const courseMetadata = await premiumCourseServerService.getA1UnitsWithMetadata();
    const testUnit = courseMetadata.units[0];
    
    expect(testUnit.exerciseBreakdown.total).toBe(testUnit.exerciseCount);
  });
});
