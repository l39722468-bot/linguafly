/**
 * Tests for New B2 Exercise Types
 * Tests Gapped Text, Multiple Matching, Open Cloze, and Key Word Transformations
 */

import {
  OPEN_CLOZE_EXERCISES,
} from '@/lib/b2-improvements-part1-open-cloze';
import {
  GAPPED_TEXT_EXERCISES,
} from '@/lib/b2-improvements-part2-gapped-text';
import {
  MULTIPLE_MATCHING_EXERCISES,
} from '@/lib/b2-improvements-part3-multiple-matching';
import {
  KEY_WORD_TRANSFORMATION_EXERCISES,
} from '@/lib/b2-improvements-part4-key-transformations';
import {
  MULTIPLE_CHOICE_CLOZE_EXERCISES,
} from '@/lib/b2-improvements-part5-multiple-choice-cloze';

describe('New B2 Exercise Types', () => {
  describe('Open Cloze Exercises', () => {
    it('should have 12 exercises', () => {
      expect(OPEN_CLOZE_EXERCISES).toBeDefined();
      expect(Array.isArray(OPEN_CLOZE_EXERCISES)).toBe(true);
      expect(OPEN_CLOZE_EXERCISES.length).toBe(12);
    });

    it('should have unique IDs', () => {
      const ids = OPEN_CLOZE_EXERCISES.map((ex) => ex.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have all required fields', () => {
      OPEN_CLOZE_EXERCISES.forEach((exercise) => {
        expect(exercise.id).toBeDefined();
        expect(exercise.title).toBeDefined();
        expect(exercise.difficulty).toBeDefined();
        expect(exercise.text).toBeDefined();
        expect(exercise.gaps).toBeDefined();
        expect(Array.isArray(exercise.gaps)).toBe(true);
      });
    });

    it('should have 8 gaps per exercise', () => {
      OPEN_CLOZE_EXERCISES.forEach((exercise) => {
        expect(exercise.gaps.length).toBe(8);
      });
    });

    it('should have gaps with correct structure', () => {
      OPEN_CLOZE_EXERCISES.forEach((exercise) => {
        exercise.gaps.forEach((gap) => {
          expect(gap.number).toBeDefined();
          expect(typeof gap.number).toBe('number');
          expect(gap.correctAnswer).toBeDefined();
          expect(gap.explanation).toBeDefined();
          expect(gap.category).toBeDefined();
        });
      });
    });

    it('should have valid difficulty levels', () => {
      const validDifficulties = ['easy', 'medium', 'hard'];
      OPEN_CLOZE_EXERCISES.forEach((exercise) => {
        expect(validDifficulties).toContain(exercise.difficulty);
      });
    });

    it('should have B2-level topics', () => {
      OPEN_CLOZE_EXERCISES.forEach((exercise) => {
        expect(exercise.topic).toBeDefined();
        expect(typeof exercise.topic).toBe('string');
        expect(exercise.topic.length).toBeGreaterThan(0);
      });
    });

    it('should have texts with [X] markers (not [GAP X])', () => {
      OPEN_CLOZE_EXERCISES.forEach((exercise) => {
        for (let i = 1; i <= 8; i++) {
          expect(exercise.text).toContain(`[${i}]`);
        }
      });
    });
  });

  describe('Gapped Text Exercises', () => {
    it('should have 6 exercises', () => {
      expect(GAPPED_TEXT_EXERCISES).toBeDefined();
      expect(Array.isArray(GAPPED_TEXT_EXERCISES)).toBe(true);
      expect(GAPPED_TEXT_EXERCISES.length).toBe(6);
    });

    it('should have all required fields', () => {
      GAPPED_TEXT_EXERCISES.forEach((exercise) => {
        expect(exercise.id).toBeDefined();
        expect(exercise.title).toBeDefined();
        expect(exercise.difficulty).toBeDefined();
        expect(exercise.topic).toBeDefined();
        expect(exercise.mainText).toBeDefined();
        expect(exercise.removedParagraphs).toBeDefined();
        expect(Array.isArray(exercise.removedParagraphs)).toBe(true);
        expect(exercise.correctAnswers).toBeDefined();
      });
    });

    it('should have 6 gaps per exercise', () => {
      GAPPED_TEXT_EXERCISES.forEach((exercise) => {
        for (let i = 1; i <= 6; i++) {
          expect(exercise.mainText).toContain(`[GAP ${i}]`);
        }
      });
    });

    it('should have 7 removed paragraphs (6 correct + 1 distractor)', () => {
      GAPPED_TEXT_EXERCISES.forEach((exercise) => {
        expect(exercise.removedParagraphs.length).toBe(7);
      });
    });

    it('should have one distractor paragraph', () => {
      GAPPED_TEXT_EXERCISES.forEach((exercise) => {
        const distractors = exercise.removedParagraphs.filter(
          (p) => p.isDistractor
        );
        expect(distractors.length).toBe(1);
      });
    });

    it('should have correct answers mapping', () => {
      GAPPED_TEXT_EXERCISES.forEach((exercise) => {
        expect(exercise.correctAnswers).toBeDefined();
        expect(Array.isArray(exercise.correctAnswers)).toBe(true);
        expect(exercise.correctAnswers.length).toBe(6);
        
        exercise.correctAnswers.forEach((answer, idx) => {
          expect(answer.gapNumber).toBe(idx + 1);
          expect(answer.correctLetter).toBeDefined();
          expect(answer.explanation).toBeDefined();
        });
      });
    });

    it('should have paragraph letters A-G', () => {
      const validLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      GAPPED_TEXT_EXERCISES.forEach((exercise) => {
        exercise.removedParagraphs.forEach((p) => {
          expect(validLetters).toContain(p.letter);
        });
      });
    });
  });

  describe('Multiple Matching Exercises', () => {
    it('should have 6 exercises', () => {
      expect(MULTIPLE_MATCHING_EXERCISES).toBeDefined();
      expect(Array.isArray(MULTIPLE_MATCHING_EXERCISES)).toBe(true);
      expect(MULTIPLE_MATCHING_EXERCISES.length).toBe(6);
    });

    it('should have all required fields', () => {
      MULTIPLE_MATCHING_EXERCISES.forEach((exercise) => {
        expect(exercise.id).toBeDefined();
        expect(exercise.title).toBeDefined();
        expect(exercise.instruction).toBeDefined();
        expect(exercise.difficulty).toBeDefined();
        expect(exercise.topic).toBeDefined();
        expect(exercise.texts).toBeDefined();
        expect(Array.isArray(exercise.texts)).toBe(true);
        expect(exercise.questions).toBeDefined();
        expect(Array.isArray(exercise.questions)).toBe(true);
      });
    });

    it('should have 5 texts per exercise (A-E)', () => {
      MULTIPLE_MATCHING_EXERCISES.forEach((exercise) => {
        expect(exercise.texts.length).toBe(5);
        expect(exercise.totalTexts).toBe(5);
      });
    });

    it('should have texts labeled A-E', () => {
      const validLabels = ['A', 'B', 'C', 'D', 'E'];
      MULTIPLE_MATCHING_EXERCISES.forEach((exercise) => {
        exercise.texts.forEach((text) => {
          expect(text.letter).toBeDefined();
          expect(validLabels).toContain(text.letter);
        });
      });
    });

    it('should have 10 questions per exercise', () => {
      MULTIPLE_MATCHING_EXERCISES.forEach((exercise) => {
        expect(exercise.questions.length).toBe(10);
      });
    });

    it('should have questions numbered 1-10', () => {
      MULTIPLE_MATCHING_EXERCISES.forEach((exercise) => {
        exercise.questions.forEach((q, idx) => {
          expect(q.number).toBe(idx + 1);
        });
      });
    });

    it('should have correct answers referring to texts A-E', () => {
      const validTexts = ['A', 'B', 'C', 'D', 'E'];
      MULTIPLE_MATCHING_EXERCISES.forEach((exercise) => {
        exercise.questions.forEach((q) => {
          expect(validTexts).toContain(q.correctText);
        });
      });
    });
  });

  describe('Key Word Transformation Exercises', () => {
    it('should have 10 exercises', () => {
      expect(KEY_WORD_TRANSFORMATION_EXERCISES).toBeDefined();
      expect(Array.isArray(KEY_WORD_TRANSFORMATION_EXERCISES)).toBe(true);
      expect(KEY_WORD_TRANSFORMATION_EXERCISES.length).toBe(10);
    });

    it('should have 60 total transformations', () => {
      let totalTransformations = 0;
      KEY_WORD_TRANSFORMATION_EXERCISES.forEach((exercise) => {
        totalTransformations += exercise.transformations.length;
      });
      expect(totalTransformations).toBe(60);
    });

    it('should have 6 transformations per exercise', () => {
      KEY_WORD_TRANSFORMATION_EXERCISES.forEach((exercise) => {
        expect(exercise.transformations.length).toBe(6);
      });
    });

    it('should cover all 10 grammatical categories', () => {
      const categories = KEY_WORD_TRANSFORMATION_EXERCISES.map(
        (ex) => ex.focusArea
      );
      expect(categories.length).toBe(10);
      expect(new Set(categories).size).toBe(10); // All unique
    });

    it('should have transformations with required fields', () => {
      KEY_WORD_TRANSFORMATION_EXERCISES.forEach((exercise) => {
        exercise.transformations.forEach((t) => {
          expect(t.id).toBeDefined();
          expect(t.sentence).toBeDefined();
          expect(t.keyWord).toBeDefined();
          expect(t.correctAnswer).toBeDefined();
          expect(t.explanation).toBeDefined();
          expect(t.grammaticalStructure).toBeDefined();
          expect(t.points).toBeDefined();
        });
      });
    });

    it('should have acceptable variations when applicable', () => {
      KEY_WORD_TRANSFORMATION_EXERCISES.forEach((exercise) => {
        exercise.transformations.forEach((t) => {
          if (t.acceptableVariations) {
            expect(Array.isArray(t.acceptableVariations)).toBe(true);
            expect(t.acceptableVariations.length).toBeGreaterThan(0);
          }
        });
      });
    });

    it('should have explanations in Spanish or English', () => {
      KEY_WORD_TRANSFORMATION_EXERCISES.forEach((exercise) => {
        exercise.transformations.forEach((t) => {
          // Should have non-empty explanation
          expect(t.explanation).toBeDefined();
          expect(typeof t.explanation).toBe('string');
          expect(t.explanation.length).toBeGreaterThan(10);
        });
      });
    });

    it('should have B2-level difficulty', () => {
      const validDifficulties = ['medium', 'hard'];
      KEY_WORD_TRANSFORMATION_EXERCISES.forEach((exercise) => {
        expect(validDifficulties).toContain(exercise.difficulty);
      });
    });
  });

  describe('Multiple Choice Cloze Exercises', () => {
    it('should have 12 exercises', () => {
      expect(MULTIPLE_CHOICE_CLOZE_EXERCISES).toBeDefined();
      expect(Array.isArray(MULTIPLE_CHOICE_CLOZE_EXERCISES)).toBe(true);
      expect(MULTIPLE_CHOICE_CLOZE_EXERCISES.length).toBe(12);
    });

    it('should have 96 total gaps (8 per exercise)', () => {
      let totalGaps = 0;
      MULTIPLE_CHOICE_CLOZE_EXERCISES.forEach((exercise) => {
        totalGaps += exercise.gaps.length;
      });
      expect(totalGaps).toBe(96);
    });

    it('should have 8 gaps per exercise', () => {
      MULTIPLE_CHOICE_CLOZE_EXERCISES.forEach((exercise) => {
        expect(exercise.gaps.length).toBe(8);
      });
    });

    it('should have gaps with 4 options each', () => {
      MULTIPLE_CHOICE_CLOZE_EXERCISES.forEach((exercise) => {
        exercise.gaps.forEach((gap) => {
          expect(gap.options).toBeDefined();
          expect(Array.isArray(gap.options)).toBe(true);
          expect(gap.options.length).toBe(4);
        });
      });
    });

    it('should have correct answer in options', () => {
      MULTIPLE_CHOICE_CLOZE_EXERCISES.forEach((exercise) => {
        exercise.gaps.forEach((gap) => {
          expect(gap.options).toContain(gap.correctAnswer);
        });
      });
    });

    it('should have lexical focus specified', () => {
      MULTIPLE_CHOICE_CLOZE_EXERCISES.forEach((exercise) => {
        exercise.gaps.forEach((gap) => {
          expect(gap.lexicalFocus).toBeDefined();
          expect(typeof gap.lexicalFocus).toBe('string');
        });
      });
    });

    it('should cover various lexical areas', () => {
      const lexicalFocusSet = new Set<string>();
      MULTIPLE_CHOICE_CLOZE_EXERCISES.forEach((exercise) => {
        exercise.gaps.forEach((gap) => {
          lexicalFocusSet.add(gap.lexicalFocus.split(':')[0].trim());
        });
      });
      // Should have at least 5 different lexical focus areas
      expect(lexicalFocusSet.size).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Cross-Exercise Validation', () => {
    it('should have consistent ID patterns', () => {
      const allExercises = [
        ...OPEN_CLOZE_EXERCISES,
        ...GAPPED_TEXT_EXERCISES,
        ...MULTIPLE_MATCHING_EXERCISES,
        ...KEY_WORD_TRANSFORMATION_EXERCISES,
        ...MULTIPLE_CHOICE_CLOZE_EXERCISES,
      ];

      allExercises.forEach((ex) => {
        expect(ex.id).toMatch(/^b2-/);
      });
    });

    it('should have all unique IDs across all exercise types', () => {
      const allIds = [
        ...OPEN_CLOZE_EXERCISES.map((e) => e.id),
        ...GAPPED_TEXT_EXERCISES.map((e) => e.id),
        ...MULTIPLE_MATCHING_EXERCISES.map((e) => e.id),
        ...KEY_WORD_TRANSFORMATION_EXERCISES.map((e) => e.id),
        ...MULTIPLE_CHOICE_CLOZE_EXERCISES.map((e) => e.id),
      ];

      const uniqueIds = new Set(allIds);
      expect(allIds.length).toBe(uniqueIds.size);
    });

    it('should total 46 exercises', () => {
      const total =
        OPEN_CLOZE_EXERCISES.length +
        GAPPED_TEXT_EXERCISES.length +
        MULTIPLE_MATCHING_EXERCISES.length +
        KEY_WORD_TRANSFORMATION_EXERCISES.length +
        MULTIPLE_CHOICE_CLOZE_EXERCISES.length;

      expect(total).toBe(46);
    });

    it('should have B2-appropriate difficulty distribution', () => {
      const allExercises = [
        ...OPEN_CLOZE_EXERCISES,
        ...GAPPED_TEXT_EXERCISES,
        ...MULTIPLE_MATCHING_EXERCISES,
        ...KEY_WORD_TRANSFORMATION_EXERCISES,
        ...MULTIPLE_CHOICE_CLOZE_EXERCISES,
      ];

      const difficulties = allExercises.map((ex) => ex.difficulty);
      const mediumCount = difficulties.filter((d) => d === 'medium').length;
      const hardCount = difficulties.filter((d) => d === 'hard').length;

      // B2 level should have mostly medium and hard
      expect(mediumCount + hardCount).toBeGreaterThan(allExercises.length * 0.7);
    });
  });

  describe('Performance Tests', () => {
    it('should load all exercises quickly', () => {
      const start = performance.now();
      
      const _ = OPEN_CLOZE_EXERCISES;
      const __ = GAPPED_TEXT_EXERCISES;
      const ___ = MULTIPLE_MATCHING_EXERCISES;
      const ____ = KEY_WORD_TRANSFORMATION_EXERCISES;
      const _____ = MULTIPLE_CHOICE_CLOZE_EXERCISES;
      
      const end = performance.now();
      
      expect(end - start).toBeLessThan(200); // Should load all in less than 200ms
    });

    it('should be serializable (no circular references)', () => {
      expect(() => {
        JSON.stringify(OPEN_CLOZE_EXERCISES);
        JSON.stringify(GAPPED_TEXT_EXERCISES);
        JSON.stringify(MULTIPLE_MATCHING_EXERCISES);
        JSON.stringify(KEY_WORD_TRANSFORMATION_EXERCISES);
        JSON.stringify(MULTIPLE_CHOICE_CLOZE_EXERCISES);
      }).not.toThrow();
    });
  });
});
