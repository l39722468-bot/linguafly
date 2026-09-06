import { 
  calculateUnitProgress, 
  calculateStarRating, 
  isReviewUnit, 
  calculateStreakBonusXP,
  type StarRating 
} from '@/lib/progress';

describe('Progress Calculation', () => {
  describe('calculateUnitProgress', () => {
    it('should calculate progress with no completed exercises', () => {
      const allIds = ['ex1', 'ex2', 'ex3', 'ex4', 'ex5'];
      const completedIds: string[] = [];
      
      const result = calculateUnitProgress(allIds, completedIds);
      
      expect(result).toEqual({
        total: 5,
        completed: 0,
        percentage: 0
      });
    });

    it('should calculate progress with all exercises completed', () => {
      const allIds = ['ex1', 'ex2', 'ex3', 'ex4', 'ex5'];
      const completedIds = ['ex1', 'ex2', 'ex3', 'ex4', 'ex5'];
      
      const result = calculateUnitProgress(allIds, completedIds);
      
      expect(result).toEqual({
        total: 5,
        completed: 5,
        percentage: 100
      });
    });

    it('should calculate progress with partial completion', () => {
      const allIds = ['ex1', 'ex2', 'ex3', 'ex4', 'ex5'];
      const completedIds = ['ex1', 'ex3'];
      
      const result = calculateUnitProgress(allIds, completedIds);
      
      expect(result).toEqual({
        total: 5,
        completed: 2,
        percentage: 40
      });
    });

    it('should round percentage to nearest integer', () => {
      const allIds = ['ex1', 'ex2', 'ex3'];
      const completedIds = ['ex1'];
      
      const result = calculateUnitProgress(allIds, completedIds);
      
      expect(result).toEqual({
        total: 3,
        completed: 1,
        percentage: 33
      });
    });

    it('should handle empty exercise list', () => {
      const allIds: string[] = [];
      const completedIds: string[] = [];
      
      const result = calculateUnitProgress(allIds, completedIds);
      
      expect(result).toEqual({
        total: 0,
        completed: 0,
        percentage: 0
      });
    });

    it('should ignore completed IDs not in the exercise list', () => {
      const allIds = ['ex1', 'ex2', 'ex3'];
      const completedIds = ['ex1', 'ex2', 'ex999', 'ex_other'];
      
      const result = calculateUnitProgress(allIds, completedIds);
      
      expect(result).toEqual({
        total: 3,
        completed: 2,
        percentage: 67
      });
    });

    it('should handle duplicate completed IDs', () => {
      const allIds = ['ex1', 'ex2', 'ex3'];
      const completedIds = ['ex1', 'ex1', 'ex2', 'ex2'];
      
      const result = calculateUnitProgress(allIds, completedIds);
      
      expect(result).toEqual({
        total: 3,
        completed: 2,
        percentage: 67
      });
    });

    it('should calculate progress for large number of exercises', () => {
      const allIds = Array.from({ length: 50 }, (_, i) => `ex${i + 1}`);
      const completedIds = Array.from({ length: 25 }, (_, i) => `ex${i + 1}`);
      
      const result = calculateUnitProgress(allIds, completedIds);
      
      expect(result).toEqual({
        total: 50,
        completed: 25,
        percentage: 50
      });
    });

    it('should handle single exercise', () => {
      const allIds = ['ex1'];
      const completedIds = ['ex1'];
      
      const result = calculateUnitProgress(allIds, completedIds);
      
      expect(result).toEqual({
        total: 1,
        completed: 1,
        percentage: 100
      });
    });

    describe('Real unit data examples', () => {
      it('should calculate progress for Unit 1 with 15 exercises', () => {
        const unit1Ids = [
          'U1_I1', 'U1_I2', 'U1_I3', 'U1_I4', 'U1_I5',
          'U1_I6', 'U1_I7', 'U1_I8', 'U1_I9', 'U1_I10',
          'U1_I11', 'U1_I12', 'U1_I13', 'U1_I14', 'U1_I15'
        ];
        const completedIds = ['U1_I1', 'U1_I2', 'U1_I3', 'U1_I4', 'U1_I5'];
        
        const result = calculateUnitProgress(unit1Ids, completedIds);
        
        expect(result).toEqual({
          total: 15,
          completed: 5,
          percentage: 33
        });
      });

      it('should handle partially completed unit', () => {
        const allIds = ['U2_I1', 'U2_I2', 'U2_I3', 'U2_I4', 'U2_I5', 'U2_I6', 'U2_I7', 'U2_I8'];
        const completedIds = ['U2_I1', 'U2_I3', 'U2_I5', 'U2_I7'];
        
        const result = calculateUnitProgress(allIds, completedIds);
        
        expect(result).toEqual({
          total: 8,
          completed: 4,
          percentage: 50
        });
      });
    });

    describe('Edge cases', () => {
      it('should handle case-sensitive IDs', () => {
        const allIds = ['EX1', 'EX2', 'EX3'];
        const completedIds = ['ex1', 'EX2'];
        
        const result = calculateUnitProgress(allIds, completedIds);
        
        expect(result).toEqual({
          total: 3,
          completed: 1,
          percentage: 33
        });
      });

      it('should handle IDs with special characters', () => {
        const allIds = ['ex-1', 'ex_2', 'ex.3'];
        const completedIds = ['ex-1', 'ex_2'];
        
        const result = calculateUnitProgress(allIds, completedIds);
        
        expect(result).toEqual({
          total: 3,
          completed: 2,
          percentage: 67
        });
      });
    });
  });

  describe('calculateStarRating', () => {
    it('should return gold for 95% or higher accuracy', () => {
      expect(calculateStarRating(95)).toBe('gold');
      expect(calculateStarRating(96)).toBe('gold');
      expect(calculateStarRating(100)).toBe('gold');
    });

    it('should return silver for 80-94% accuracy', () => {
      expect(calculateStarRating(80)).toBe('silver');
      expect(calculateStarRating(85)).toBe('silver');
      expect(calculateStarRating(94)).toBe('silver');
    });

    it('should return bronze for 60-79% accuracy', () => {
      expect(calculateStarRating(60)).toBe('bronze');
      expect(calculateStarRating(70)).toBe('bronze');
      expect(calculateStarRating(79)).toBe('bronze');
    });

    it('should return null for less than 60% accuracy', () => {
      expect(calculateStarRating(59)).toBe(null);
      expect(calculateStarRating(50)).toBe(null);
      expect(calculateStarRating(0)).toBe(null);
    });

    it('should handle edge cases correctly', () => {
      expect(calculateStarRating(59.9)).toBe(null);
      expect(calculateStarRating(79.9)).toBe('bronze');
      expect(calculateStarRating(94.9)).toBe('silver');
    });

    it('should handle extreme values', () => {
      expect(calculateStarRating(0)).toBe(null);
      expect(calculateStarRating(100)).toBe('gold');
      expect(calculateStarRating(150)).toBe('gold'); // Should handle > 100%
    });

    describe('Real performance scenarios', () => {
      it('should calculate stars for perfect performance', () => {
        const accuracy = Math.round((20 / 20) * 100); // 100%
        expect(calculateStarRating(accuracy)).toBe('gold');
      });

      it('should calculate stars for near-perfect performance', () => {
        const accuracy = Math.round((19 / 20) * 100); // 95%
        expect(calculateStarRating(accuracy)).toBe('gold');
      });

      it('should calculate stars for good performance', () => {
        const accuracy = Math.round((17 / 20) * 100); // 85%
        expect(calculateStarRating(accuracy)).toBe('silver');
      });

      it('should calculate stars for decent performance', () => {
        const accuracy = Math.round((14 / 20) * 100); // 70%
        expect(calculateStarRating(accuracy)).toBe('bronze');
      });

      it('should calculate no stars for poor performance', () => {
        const accuracy = Math.round((10 / 20) * 100); // 50%
        expect(calculateStarRating(accuracy)).toBe(null);
      });

      it('should handle boundary at 60%', () => {
        const accuracy59 = Math.round((11.8 / 20) * 100); // 59%
        const accuracy60 = Math.round((12 / 20) * 100); // 60%
        expect(calculateStarRating(accuracy59)).toBe(null);
        expect(calculateStarRating(accuracy60)).toBe('bronze');
      });

      it('should handle boundary at 80%', () => {
        const accuracy79 = Math.round((15.8 / 20) * 100); // 79%
        const accuracy80 = Math.round((16 / 20) * 100); // 80%
        expect(calculateStarRating(accuracy79)).toBe('bronze');
        expect(calculateStarRating(accuracy80)).toBe('silver');
      });

      it('should handle boundary at 95%', () => {
        const accuracy94 = Math.round((18.8 / 20) * 100); // 94%
        const accuracy95 = Math.round((19 / 20) * 100); // 95%
        expect(calculateStarRating(accuracy94)).toBe('silver');
        expect(calculateStarRating(accuracy95)).toBe('gold');
      });
    });

    describe('Edge cases with rounding', () => {
      it('should handle decimal accuracies correctly', () => {
        // Testing with decimal accuracies
        expect(calculateStarRating(59.4)).toBe(null);
        expect(calculateStarRating(59.5)).toBe(null);
        expect(calculateStarRating(60.0)).toBe('bronze');
      });

      it('should match real calculation from exercises', () => {
        // Simulate what happens in component: Math.round((correct / total) * 100)
        const correct = 12;
        const total = 20;
        const accuracy = Math.round((correct / total) * 100); // 60%
        expect(calculateStarRating(accuracy)).toBe('bronze');
      });
    });
  });

  describe('isReviewUnit', () => {
    it('should identify review units ending in 0', () => {
      expect(isReviewUnit('unit10')).toBe(true);
      expect(isReviewUnit('unit20')).toBe(true);
      expect(isReviewUnit('unit30')).toBe(true);
      expect(isReviewUnit('unit40')).toBe(true);
      expect(isReviewUnit('unit50')).toBe(true);
      expect(isReviewUnit('unit60')).toBe(true);
    });

    it('should not identify non-review units', () => {
      expect(isReviewUnit('unit1')).toBe(false);
      expect(isReviewUnit('unit5')).toBe(false);
      expect(isReviewUnit('unit11')).toBe(false);
      expect(isReviewUnit('unit25')).toBe(false);
      expect(isReviewUnit('unit37')).toBe(false);
    });

    it('should handle different unit ID formats', () => {
      expect(isReviewUnit('10')).toBe(true);
      expect(isReviewUnit('20')).toBe(true);
      expect(isReviewUnit('U10')).toBe(true);
      expect(isReviewUnit('U_20')).toBe(true);
      expect(isReviewUnit('unit-30')).toBe(true);
    });

    it('should handle edge cases', () => {
      expect(isReviewUnit('0')).toBe(true);
      expect(isReviewUnit('100')).toBe(true);
      expect(isReviewUnit('abc')).toBe(false);
      expect(isReviewUnit('')).toBe(false);
    });
  });

  describe('calculateStreakBonusXP', () => {
    describe('for review units', () => {
      it('should award 30 XP for streak >= 30 days', () => {
        expect(calculateStreakBonusXP(30, true)).toBe(30);
        expect(calculateStreakBonusXP(35, true)).toBe(30);
        expect(calculateStreakBonusXP(100, true)).toBe(30);
      });

      it('should award 20 XP for streak >= 20 days', () => {
        expect(calculateStreakBonusXP(20, true)).toBe(20);
        expect(calculateStreakBonusXP(25, true)).toBe(20);
        expect(calculateStreakBonusXP(29, true)).toBe(20);
      });

      it('should award 10 XP for streak >= 10 days', () => {
        expect(calculateStreakBonusXP(10, true)).toBe(10);
        expect(calculateStreakBonusXP(15, true)).toBe(10);
        expect(calculateStreakBonusXP(19, true)).toBe(10);
      });

      it('should award 5 XP for streak >= 3 days', () => {
        expect(calculateStreakBonusXP(3, true)).toBe(5);
        expect(calculateStreakBonusXP(5, true)).toBe(5);
        expect(calculateStreakBonusXP(9, true)).toBe(5);
      });

      it('should award 0 XP for streak < 3 days', () => {
        expect(calculateStreakBonusXP(0, true)).toBe(0);
        expect(calculateStreakBonusXP(1, true)).toBe(0);
        expect(calculateStreakBonusXP(2, true)).toBe(0);
      });
    });

    describe('for non-review units', () => {
      it('should award 0 XP regardless of streak', () => {
        expect(calculateStreakBonusXP(0, false)).toBe(0);
        expect(calculateStreakBonusXP(3, false)).toBe(0);
        expect(calculateStreakBonusXP(10, false)).toBe(0);
        expect(calculateStreakBonusXP(20, false)).toBe(0);
        expect(calculateStreakBonusXP(30, false)).toBe(0);
        expect(calculateStreakBonusXP(100, false)).toBe(0);
      });
    });

    describe('real-world scenarios', () => {
      it('should calculate bonus for 7-day streak on review unit', () => {
        const streak = 7;
        const isReview = isReviewUnit('unit10');
        const bonus = calculateStreakBonusXP(streak, isReview);
        expect(bonus).toBe(5);
      });

      it('should calculate bonus for 14-day streak on review unit', () => {
        const streak = 14;
        const isReview = isReviewUnit('unit20');
        const bonus = calculateStreakBonusXP(streak, isReview);
        expect(bonus).toBe(10);
      });

      it('should calculate no bonus for 30-day streak on non-review unit', () => {
        const streak = 30;
        const isReview = isReviewUnit('unit15');
        const bonus = calculateStreakBonusXP(streak, isReview);
        expect(bonus).toBe(0);
      });

      it('should calculate bonus for perfect month on review unit', () => {
        const streak = 30;
        const isReview = isReviewUnit('unit30');
        const bonus = calculateStreakBonusXP(streak, isReview);
        expect(bonus).toBe(30);
      });
    });

    describe('edge cases', () => {
      it('should handle boundary at 3 days', () => {
        expect(calculateStreakBonusXP(2, true)).toBe(0);
        expect(calculateStreakBonusXP(3, true)).toBe(5);
      });

      it('should handle boundary at 10 days', () => {
        expect(calculateStreakBonusXP(9, true)).toBe(5);
        expect(calculateStreakBonusXP(10, true)).toBe(10);
      });

      it('should handle boundary at 20 days', () => {
        expect(calculateStreakBonusXP(19, true)).toBe(10);
        expect(calculateStreakBonusXP(20, true)).toBe(20);
      });

      it('should handle boundary at 30 days', () => {
        expect(calculateStreakBonusXP(29, true)).toBe(20);
        expect(calculateStreakBonusXP(30, true)).toBe(30);
      });
    });
  });
});
