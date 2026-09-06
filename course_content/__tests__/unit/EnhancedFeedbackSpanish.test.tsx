import { render, screen } from '@testing-library/react';
import EnhancedFeedback from '@/components/course/EnhancedFeedback';
import type { MultipleChoiceEvaluationResponse, TextAnswerEvaluationResponse } from '@/lib/exercise-types';

describe('EnhancedFeedback', () => {
  it('shows bilingual multiple-choice feedback in Spanish', () => {
    const evaluation: MultipleChoiceEvaluationResponse = {
      isCorrect: false,
      score: 0,
      confidence: 100,
      userAnswerIndex: 1,
      correctAnswerIndex: 0,
      feedback: '✗ [[Not quite right.|No del todo correcto.]]',
      explanation: '[[With "I" we use "am".|Con "I" usamos "am".]]',
      whyWrong: '[[Use "is" with he, she or it.|Usa "is" con he, she o it.]]',
      conceptTested: 'grammar',
      possibleTypo: false,
    };

    render(
      <EnhancedFeedback
        type="multiple-choice"
        evaluation={evaluation}
        userAnswer="is"
        correctAnswer="am"
      />
    );

    expect(screen.getByText(/Con "I" usamos "am"\./)).toBeInTheDocument();
    expect(screen.getByText(/Usa "is" con he, she o it\./)).toBeInTheDocument();
    expect(screen.queryByText(/With "I" we use "am"\./)).not.toBeInTheDocument();
  });

  it('shows bilingual text feedback in Spanish', () => {
    const evaluation: TextAnswerEvaluationResponse = {
      isCorrect: false,
      score: 20,
      feedback: '[[Your answer is too short.|Tu respuesta es demasiado corta.]]',
      detailedAnalysis: {
        semanticMatch: 20,
        grammaticalAccuracy: 20,
        vocabularyLevel: 20,
        completeness: 20,
      },
      conceptsCovered: [],
      missingConcepts: [],
      suggestions: ['[[Try the verb "am".|Prueba con el verbo "am".]]'],
      grammarErrors: [],
      vocabularyFeedback: {
        level: 'adecuado',
        appropriateWords: [],
      },
      overallAssessment: 'incorrect',
    };

    render(
      <EnhancedFeedback
        type="text"
        evaluation={evaluation}
        userAnswer="is"
        correctAnswer="am"
      />
    );

    expect(screen.getByText(/Tu respuesta es demasiado corta\./)).toBeInTheDocument();
    expect(screen.getByText(/Prueba con el verbo "am"\./)).toBeInTheDocument();
    expect(screen.queryByText(/Your answer is too short\./)).not.toBeInTheDocument();
  });
});
