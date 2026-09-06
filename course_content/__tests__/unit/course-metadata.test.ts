import { 
  extractUnitMetadata, 
  extractTopicsFromMasteryTags, 
  calculateDifficulty 
} from '@/lib/utils/course-metadata';
import { UnitData } from '@/types/premium-course';

describe('course-metadata utilities', () => {
  describe('extractTopicsFromMasteryTags', () => {
    it('should extract topics from mastery tags with categories', () => {
      const tags = ['vocabulary:airport', 'grammar:present_simple', 'listening:comprehension'];
      const topics = extractTopicsFromMasteryTags(tags);
      
      expect(topics).toContain('Vocabulary');
      expect(topics).toContain('Grammar');
      expect(topics).toContain('Listening');
      expect(topics).toHaveLength(3);
    });

    it('should extract topics from mastery tags without categories', () => {
      const tags = ['intro', 'review', 'practice'];
      const topics = extractTopicsFromMasteryTags(tags);
      
      expect(topics).toContain('Intro');
      expect(topics).toContain('Review');
      expect(topics).toContain('Practice');
      expect(topics).toHaveLength(3);
    });

    it('should handle mixed format mastery tags', () => {
      const tags = ['vocabulary:food', 'intro', 'grammar:verb_to_be'];
      const topics = extractTopicsFromMasteryTags(tags);
      
      expect(topics).toContain('Vocabulary');
      expect(topics).toContain('Intro');
      expect(topics).toContain('Grammar');
      expect(topics).toHaveLength(3);
    });

    it('should deduplicate topics', () => {
      const tags = ['vocabulary:food', 'vocabulary:kitchen', 'grammar:simple'];
      const topics = extractTopicsFromMasteryTags(tags);
      
      expect(topics.filter(t => t === 'Vocabulary')).toHaveLength(1);
      expect(topics.filter(t => t === 'Grammar')).toHaveLength(1);
    });

    it('should handle empty array', () => {
      const topics = extractTopicsFromMasteryTags([]);
      expect(topics).toEqual([]);
    });

    it('should format multi-word topics correctly', () => {
      const tags = ['reading_comprehension:advanced', 'speaking_practice'];
      const topics = extractTopicsFromMasteryTags(tags);
      
      expect(topics).toContain('Reading Comprehension');
      expect(topics).toContain('Speaking Practice');
    });

    it('should sort topics alphabetically', () => {
      const tags = ['vocabulary:food', 'grammar:verbs', 'listening:basic'];
      const topics = extractTopicsFromMasteryTags(tags);
      
      expect(topics[0]).toBe('Grammar');
      expect(topics[1]).toBe('Listening');
      expect(topics[2]).toBe('Vocabulary');
    });
  });

  describe('calculateDifficulty', () => {
    it('should return 1 for units 1-12 (first 20%)', () => {
      expect(calculateDifficulty(1)).toBe(1);
      expect(calculateDifficulty(6)).toBe(1);
      expect(calculateDifficulty(12)).toBe(1);
    });

    it('should return 2 for units 13-24 (20-40%)', () => {
      expect(calculateDifficulty(13)).toBe(2);
      expect(calculateDifficulty(18)).toBe(2);
      expect(calculateDifficulty(24)).toBe(2);
    });

    it('should return 3 for units 25-36 (40-60%)', () => {
      expect(calculateDifficulty(25)).toBe(3);
      expect(calculateDifficulty(30)).toBe(3);
      expect(calculateDifficulty(36)).toBe(3);
    });

    it('should return 4 for units 37-48 (60-80%)', () => {
      expect(calculateDifficulty(37)).toBe(4);
      expect(calculateDifficulty(42)).toBe(4);
      expect(calculateDifficulty(48)).toBe(4);
    });

    it('should return 5 for units 49-60 (80-100%)', () => {
      expect(calculateDifficulty(49)).toBe(5);
      expect(calculateDifficulty(54)).toBe(5);
      expect(calculateDifficulty(60)).toBe(5);
    });

    it('should handle custom total units', () => {
      expect(calculateDifficulty(5, 50)).toBe(1);
      expect(calculateDifficulty(15, 50)).toBe(2);
      expect(calculateDifficulty(25, 50)).toBe(3);
      expect(calculateDifficulty(35, 50)).toBe(4);
      expect(calculateDifficulty(45, 50)).toBe(5);
    });
  });

  describe('extractUnitMetadata', () => {
    const createMockUnitData = (overrides?: Partial<UnitData>): UnitData => ({
      course: {
        unit_id: 'unit1',
        unit_title: 'Welcome to London',
        level: 'A1-Narrative',
        total_duration_minutes: 60,
        language_ui: 'es-ES',
        target_language: 'en',
      },
      learning_outcomes: ['Identify airport essentials', 'Master basic greetings'],
      mastery_tags: ['vocabulary:airport', 'grammar:greetings'],
      blocks: [
        {
          block_id: 'intro',
          title: 'Introduction',
          duration_minutes: 10,
          content: [
            {
              interaction_id: 'u1_i1',
              type: 'multiple_choice',
              prompt_es: 'Question 1',
              mastery_tag: 'vocabulary:airport',
              correct_answer: 'a',
            },
            {
              interaction_id: 'u1_i2',
              type: 'fill_in_the_blank',
              prompt_es: 'Question 2',
              mastery_tag: 'grammar:greetings',
              correct_answer: 'hello',
            },
          ],
        },
      ],
      ...overrides,
    });

    it('should extract basic unit metadata correctly', () => {
      const unitData = createMockUnitData();
      const metadata = extractUnitMetadata(unitData);

      expect(metadata.unitId).toBe('unit1');
      expect(metadata.unitNumber).toBe(1);
      expect(metadata.title).toBe('Welcome to London');
      expect(metadata.estimatedDuration).toBe(60);
    });

    it('should extract learning outcomes', () => {
      const unitData = createMockUnitData();
      const metadata = extractUnitMetadata(unitData);

      expect(metadata.learningOutcomes).toEqual(['Identify airport essentials', 'Master basic greetings']);
    });

    it('should extract and format topics from mastery tags', () => {
      const unitData = createMockUnitData();
      const metadata = extractUnitMetadata(unitData);

      expect(metadata.topics).toContain('Vocabulary');
      expect(metadata.topics).toContain('Grammar');
    });

    it('should count exercises correctly', () => {
      const unitData = createMockUnitData();
      const metadata = extractUnitMetadata(unitData);

      expect(metadata.exerciseCount).toBe(2);
      expect(metadata.exerciseBreakdown.total).toBe(2);
    });

    it('should count exercise types correctly', () => {
      const unitData = createMockUnitData({
        blocks: [
          {
            block_id: 'practice',
            title: 'Practice',
            duration_minutes: 20,
            content: [
              { interaction_id: 'i1', type: 'multiple_choice', prompt_es: 'Q1', mastery_tag: 'v1', correct_answer: 'a' },
              { interaction_id: 'i2', type: 'multiple_choice', prompt_es: 'Q2', mastery_tag: 'v2', correct_answer: 'b' },
              { interaction_id: 'i3', type: 'fill_in_the_blank', prompt_es: 'Q3', mastery_tag: 'g1', correct_answer: 'x' },
              { interaction_id: 'i4', type: 'matching', prompt_es: 'Q4', mastery_tag: 'v3', correct_answer: {} },
              { interaction_id: 'i5', type: 'listening', prompt_es: 'Q5', mastery_tag: 'l1', correct_answer: 'c' },
            ],
          },
        ],
      });
      const metadata = extractUnitMetadata(unitData);

      expect(metadata.exerciseBreakdown.multiple_choice).toBe(2);
      expect(metadata.exerciseBreakdown.fill_in_the_blank).toBe(1);
      expect(metadata.exerciseBreakdown.matching).toBe(1);
      expect(metadata.exerciseBreakdown.listening).toBe(1);
      expect(metadata.exerciseBreakdown.total).toBe(5);
    });

    it('should calculate difficulty based on unit number', () => {
      const unit1 = createMockUnitData({ course: { ...createMockUnitData().course, unit_id: 'unit1' } });
      const unit30 = createMockUnitData({ course: { ...createMockUnitData().course, unit_id: 'unit30' } });
      const unit60 = createMockUnitData({ course: { ...createMockUnitData().course, unit_id: 'unit60' } });

      expect(extractUnitMetadata(unit1).difficulty).toBe(1);
      expect(extractUnitMetadata(unit30).difficulty).toBe(3);
      expect(extractUnitMetadata(unit60).difficulty).toBe(5);
    });

    it('should handle units with no learning outcomes', () => {
      const unitData = createMockUnitData({ learning_outcomes: undefined });
      const metadata = extractUnitMetadata(unitData);

      expect(metadata.learningOutcomes).toBeUndefined();
    });

    it('should handle units with no mastery tags', () => {
      const unitData = createMockUnitData({ mastery_tags: undefined });
      const metadata = extractUnitMetadata(unitData);

      expect(metadata.topics).toEqual([]);
      expect(metadata.masteryTags).toBeUndefined();
    });

    it('should handle empty blocks array', () => {
      const unitData = createMockUnitData({ blocks: [] });
      const metadata = extractUnitMetadata(unitData);

      expect(metadata.exerciseCount).toBe(0);
      expect(metadata.exerciseBreakdown.total).toBe(0);
    });

    it('should handle blocks with empty content', () => {
      const unitData = createMockUnitData({
        blocks: [
          {
            block_id: 'empty',
            title: 'Empty Block',
            duration_minutes: 5,
            content: [],
          },
        ],
      });
      const metadata = extractUnitMetadata(unitData);

      expect(metadata.exerciseCount).toBe(0);
    });

    it('should extract unit number from various unit_id formats', () => {
      const unit5 = createMockUnitData({ course: { ...createMockUnitData().course, unit_id: 'unit5' } });
      const unit42 = createMockUnitData({ course: { ...createMockUnitData().course, unit_id: 'unit42' } });
      const unit100 = createMockUnitData({ course: { ...createMockUnitData().course, unit_id: 'unit100' } });

      expect(extractUnitMetadata(unit5).unitNumber).toBe(5);
      expect(extractUnitMetadata(unit42).unitNumber).toBe(42);
      expect(extractUnitMetadata(unit100).unitNumber).toBe(100);
    });

    it('should handle unit_id without number', () => {
      const unitData = createMockUnitData({ course: { ...createMockUnitData().course, unit_id: 'intro' } });
      const metadata = extractUnitMetadata(unitData);

      expect(metadata.unitNumber).toBe(0);
    });

    it('should use the specified duration from course data', () => {
      const unitData = createMockUnitData({
        course: { ...createMockUnitData().course, total_duration_minutes: 45 },
      });
      const metadata = extractUnitMetadata(unitData);

      expect(metadata.estimatedDuration).toBe(45);
    });

    it('should handle exercise type aliases', () => {
      const unitData = createMockUnitData({
        blocks: [
          {
            block_id: 'practice',
            title: 'Practice',
            duration_minutes: 15,
            content: [
              { interaction_id: 'i1', type: 'fill_in', prompt_es: 'Q1', mastery_tag: 'v1', correct_answer: 'x' },
              { interaction_id: 'i2', type: 'match_pairs', prompt_es: 'Q2', mastery_tag: 'v2', correct_answer: {} },
              { interaction_id: 'i3', type: 'drag_drop', prompt_es: 'Q3', mastery_tag: 'v3', correct_answer: {} },
            ],
          },
        ],
      });
      const metadata = extractUnitMetadata(unitData);

      expect(metadata.exerciseBreakdown.fill_in_the_blank).toBe(1);
      expect(metadata.exerciseBreakdown.matching).toBe(1);
      expect(metadata.exerciseBreakdown.drag_and_drop).toBe(1);
    });

    it('should categorize unknown exercise types as other', () => {
      const unitData = createMockUnitData({
        blocks: [
          {
            block_id: 'practice',
            title: 'Practice',
            duration_minutes: 10,
            content: [
              { interaction_id: 'i1', type: 'unknown_type', prompt_es: 'Q1', mastery_tag: 'v1', correct_answer: 'x' },
              { interaction_id: 'i2', type: 'custom_exercise', prompt_es: 'Q2', mastery_tag: 'v2', correct_answer: 'y' },
            ],
          },
        ],
      });
      const metadata = extractUnitMetadata(unitData);

      expect(metadata.exerciseBreakdown.other).toBe(2);
      expect(metadata.exerciseBreakdown.total).toBe(2);
    });
  });
});
