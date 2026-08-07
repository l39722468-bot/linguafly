import type { Exercise } from '../exercise-types';
import { UnitData, PremiumInteraction } from '../../types/premium-course';

/**
 * Helper to generate a unique ID for TOEFL exercises
 */
export function genId(level: string, unit: number, block: string, q: number): string {
  return `toefl-${level}-u${unit}-${block}-q${q}`;
}

/**
 * Ensures a TOEFL unit has the correct structure (Premium UnitData).
 */
export function createToeflUnit(
  id: string,
  title: string,
  description: string,
  objectives: string[],
  exerciseBlocks: Exercise[]
): any { // Using any to avoid complex type issues with existing files
  const level = id.split('-')[1]?.toUpperCase() || 'B1';
  
  const interactions: any[] = [];

  // Speaking eliminado de todos los cursos (incl. TOEFL).
  const nonSpeakingBlocks = (exerciseBlocks as any[]).filter(
    (block) => block?.type !== 'speaking' && block?.type !== 'speaking-analysis'
  );

  nonSpeakingBlocks.forEach((block: any) => {
    // Add block title/explanation as a header interaction if needed
    
    if (block.questions) {
      block.questions.forEach((q: any) => {
        const interaction: any = {
          interaction_id: q.id,
          type: q.type === 'multiple-choice' ? 'multiple_choice' : q.type,
          block_type: block.type, // Preserve original shard type
          prompt_es: q.question,
          mastery_tag: 'toefl_prep',
          explanation_es: q.explanation || block.explanation,
          points: q.points || 1
        };

        if (q.options) {
          interaction.options = q.options.map((opt: string, i: number) => ({
            id: `o${i}`,
            text: opt
          }));

          const correctIdx = q.options.indexOf(q.correctAnswer);
          if (correctIdx !== -1) {
            interaction.correct_answer = `o${correctIdx}`;
          } else {
            interaction.correct_answer = q.correctAnswer;
          }
        }

        if (q.context || block.transcript) {
          interaction.stimulus_en = q.context || block.transcript;
        }

        interactions.push(interaction);
      });
    } else {
        // Handle blocks without direct questions (e.g. just info)
        interactions.push({
            interaction_id: block.id,
            type: 'info',
            title: block.title,
            prompt_es: block.explanation || '',
            content_en: block.transcript || '',
            mastery_tag: 'toefl_info'
        });
    }
  });

  return {
    course: {
      unit_id: id,
      unit_title: title,
      level: level,
      total_duration_minutes: 150,
      language_ui: 'es-ES',
      target_language: 'en'
    },
    learning_outcomes: objectives,
    blocks: [
      {
        block_id: 'main',
        title: 'Contenido de la Semana',
        duration_minutes: 150,
        content: interactions
      }
    ]
  };
}

/**
 * Creates a large TOEFL unit from multiple shards (blocks).
 * Useful for 100+ exercises per week.
 */
export function createShardedToeflUnit(
  id: string,
  title: string,
  description: string,
  objectives: string[],
  shards: any[]
): any {
  return createToeflUnit(id, title, description, objectives, shards);
}
