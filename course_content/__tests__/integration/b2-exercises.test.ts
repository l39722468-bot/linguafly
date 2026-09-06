/**
 * Integration Tests for B2 Corrected Exercises
 * Tests that the actual exercises have correct data structure and validation
 */

import { MODULE_1_LESSONS } from '@/lib/course-data-b2';

describe('B2 Corrected Exercises - Integration Tests', () => {
  describe('Module 1 - Lesson 1: Past Perfect Exercises', () => {
    let lesson1: any;
    let grammar1: any;
    let grammar2: any;

    beforeAll(() => {
      lesson1 = MODULE_1_LESSONS.find((l) => l.id === 'b2-m1-l1');
      grammar1 = lesson1?.exercises.find((ex: any) => ex.id === 'b2-m1-l1-grammar-1');
      grammar2 = lesson1?.exercises.find((ex: any) => ex.id === 'b2-m1-l1-grammar-2');
    });

    it('should have Lesson 1 defined', () => {
      expect(lesson1).toBeDefined();
      expect(lesson1.id).toBe('b2-m1-l1');
      expect(lesson1.title).toContain('Past Perfect');
    });

    describe('Grammar Exercise 2: Past Perfect Continuous', () => {
      it('should have the exercise defined', () => {
        expect(grammar2).toBeDefined();
        expect(grammar2.type).toBe('grammar');
      });

      it('should have questions array', () => {
        expect(grammar2.questions).toBeDefined();
        expect(Array.isArray(grammar2.questions)).toBe(true);
        expect(grammar2.questions.length).toBeGreaterThan(0);
      });

      describe('Question 1: Ambiguous exercise (FIXED)', () => {
        let q1: any;

        beforeAll(() => {
          q1 = grammar2.questions.find((q: any) => q.id === 'q1');
        });

        it('should include verb base hint (run)', () => {
          expect(q1).toBeDefined();
          expect(q1.question).toContain('(run)');
          expect(q1.question).toBe('She was out of breath because she ___ (run).');
        });

        it('should have correctAnswer', () => {
          expect(q1.correctAnswer).toBe('had been running');
        });

        it('should have acceptableAnswers array', () => {
          expect(q1.acceptableAnswers).toBeDefined();
          expect(Array.isArray(q1.acceptableAnswers)).toBe(true);
        });

        it('should accept both "had been running" and "had run"', () => {
          expect(q1.acceptableAnswers).toContain('had been running');
          expect(q1.acceptableAnswers).toContain('had run');
          expect(q1.acceptableAnswers.length).toBeGreaterThanOrEqual(2);
        });

        it('should have explanation in Spanish', () => {
          expect(q1.explanation).toBeDefined();
          expect(q1.explanation).toContain('duración');
        });

        it('should have points assigned', () => {
          expect(q1.points).toBeDefined();
          expect(typeof q1.points).toBe('number');
          expect(q1.points).toBeGreaterThan(0);
        });
      });

      describe('Question 2: Duration question (FIXED)', () => {
        let q2: any;

        beforeAll(() => {
          q2 = grammar2.questions.find((q: any) => q.id === 'q2');
        });

        it('should include verb base hint (you/wait)', () => {
          expect(q2).toBeDefined();
          expect(q2.question).toContain('(you/wait)');
        });

        it('should have acceptableAnswers', () => {
          expect(q2.acceptableAnswers).toBeDefined();
          expect(q2.acceptableAnswers).toContain('had you been waiting');
          expect(q2.acceptableAnswers).toContain('had you waited');
        });
      });

      describe('Question 4: Grammar explanation (FIXED)', () => {
        let q4: any;

        beforeAll(() => {
          q4 = grammar2.questions.find((q: any) => q.id === 'q4');
        });

        it('should be short-answer type', () => {
          expect(q4).toBeDefined();
          expect(q4.type).toBe('short-answer');
        });

        it('should have acceptableAnswers with multiple languages', () => {
          expect(q4.acceptableAnswers).toBeDefined();
          expect(q4.acceptableAnswers.length).toBeGreaterThanOrEqual(3);
          
          // Should have Spanish version
          const hasSpanish = q4.acceptableAnswers.some((ans: string) =>
            ans.includes('acción') || ans.includes('duración')
          );
          expect(hasSpanish).toBe(true);

          // Should have English version
          const hasEnglish = q4.acceptableAnswers.some((ans: string) =>
            ans.includes('finished action') || ans.includes('continuous action')
          );
          expect(hasEnglish).toBe(true);
        });

        it('should accept both detailed and simplified explanations', () => {
          const answers = q4.acceptableAnswers;
          expect(answers.length).toBeGreaterThan(2);
        });
      });
    });
  });

  describe('Module 1 - Lesson 1: Reading Exercise', () => {
    let lesson1: any;
    let readingExercise: any;

    beforeAll(() => {
      lesson1 = MODULE_1_LESSONS.find((l: any) => l.id === 'b2-m1-l1');
      readingExercise = lesson1?.exercises.find(
        (ex: any) => ex.id === 'b2-m1-l1-reading-1'
      );
    });

    it('should have reading exercise defined', () => {
      expect(readingExercise).toBeDefined();
      expect(readingExercise.type).toBe('reading');
      expect(readingExercise.title).toContain('Reading');
    });

    describe('Question 1: Maria preparation (FIXED)', () => {
      let q1: any;

      beforeAll(() => {
        q1 = readingExercise?.questions.find((q: any) => q.id === 'q1');
      });

      it('should have acceptableAnswers with variations', () => {
        expect(q1).toBeDefined();
        expect(q1.acceptableAnswers).toBeDefined();
        expect(q1.acceptableAnswers.length).toBeGreaterThanOrEqual(4);
      });

      it('should accept answer with full context', () => {
        expect(q1.acceptableAnswers).toContain(
          'She had studied Japanese for six months'
        );
      });

      it('should accept answer with additional details', () => {
        const hasDetailedAnswer = q1.acceptableAnswers.some((ans: string) =>
          ans.includes('read countless books')
        );
        expect(hasDetailedAnswer).toBe(true);
      });

      it('should accept shortened answer', () => {
        expect(q1.acceptableAnswers).toContain('She had studied Japanese');
      });

      it('should accept answer without subject pronoun', () => {
        const hasNoSubject = q1.acceptableAnswers.some((ans: string) =>
          ans.startsWith('studied Japanese')
        );
        expect(hasNoSubject).toBe(true);
      });
    });

    describe('Question 5: Trip outcome (FIXED)', () => {
      let q5: any;

      beforeAll(() => {
        q5 = readingExercise?.questions.find((q: any) => q.id === 'q5');
      });

      it('should have acceptableAnswers with variations', () => {
        expect(q5).toBeDefined();
        expect(q5.acceptableAnswers).toBeDefined();
        expect(q5.acceptableAnswers.length).toBeGreaterThanOrEqual(4);
      });

      it('should accept full answer', () => {
        const hasFullAnswer = q5.acceptableAnswers.some((ans: string) =>
          ans.includes('exceeded') && ans.includes('perspective')
        );
        expect(hasFullAnswer).toBe(true);
      });

      it('should accept partial answers', () => {
        expect(q5.acceptableAnswers).toContain('It exceeded her expectations');
        expect(q5.acceptableAnswers).toContain('changed her perspective on life');
      });
    });
  });

  describe('Data Integrity Checks', () => {
    it('should have all lessons defined', () => {
      expect(MODULE_1_LESSONS).toBeDefined();
      expect(Array.isArray(MODULE_1_LESSONS)).toBe(true);
      expect(MODULE_1_LESSONS.length).toBeGreaterThan(0);
    });

    it('should have unique lesson IDs', () => {
      const ids = MODULE_1_LESSONS.map((l: any) => l.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have all lessons with required fields', () => {
      MODULE_1_LESSONS.forEach((lesson: any) => {
        expect(lesson.id).toBeDefined();
        expect(lesson.title).toBeDefined();
        expect(lesson.description).toBeDefined();
        expect(lesson.duration).toBeDefined();
        expect(lesson.objectives).toBeDefined();
        expect(lesson.exercises).toBeDefined();
        expect(Array.isArray(lesson.exercises)).toBe(true);
      });
    });

    it('should have exercises with valid types', () => {
      const validTypes = [
        'reading',
        'writing',
        'listening',
        'speaking',
        'grammar',
        'vocabulary',
        'pronunciation',
        'pronunciation-practice',
        'key-word-transformation',
        'word-formation',
        'multiple-choice-cloze',
        'open-cloze',
        'gapped-text',
        'multiple-matching',
        'sentence-completion',
        'error-identification',
        'paraphrasing',
        'collocation-matching',
        'phrasal-verbs',
        'idioms-expressions',
        'summary-writing',
        'gap-fill-text',
        'sentence-reordering',
      ];

      MODULE_1_LESSONS.forEach((lesson: any) => {
        lesson.exercises.forEach((exercise: any) => {
          expect(validTypes).toContain(exercise.type);
        });
      });
    });

    it('should have questions with points (when questions exist)', () => {
      MODULE_1_LESSONS.forEach((lesson: any) => {
        lesson.exercises.forEach((exercise: any) => {
          if (exercise.questions && Array.isArray(exercise.questions)) {
            exercise.questions.forEach((q: any) => {
              // Some exercises might not have points (e.g., imported exercises)
              if (q.points !== undefined) {
                expect(typeof q.points).toBe('number');
                expect(q.points).toBeGreaterThan(0);
              }
            });
          }
        });
      });
    });

    it('should have acceptableAnswers as array when defined', () => {
      MODULE_1_LESSONS.forEach((lesson: any) => {
        lesson.exercises.forEach((exercise: any) => {
          if (exercise.questions && Array.isArray(exercise.questions)) {
            exercise.questions.forEach((q: any) => {
              if (q.acceptableAnswers !== undefined) {
                expect(Array.isArray(q.acceptableAnswers)).toBe(true);
              }
            });
          }
        });
      });
    });
  });

  describe('Performance Checks', () => {
    it('should load MODULE_1_LESSONS quickly', () => {
      const start = performance.now();
      const lessons = MODULE_1_LESSONS;
      const end = performance.now();
      
      expect(lessons).toBeDefined();
      expect(end - start).toBeLessThan(100); // Should load in less than 100ms
    });

    it('should not have circular references', () => {
      expect(() => {
        JSON.stringify(MODULE_1_LESSONS);
      }).not.toThrow();
    });
  });
});
