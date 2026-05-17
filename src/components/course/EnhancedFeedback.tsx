'use client';

import React from 'react';
import { stripBilingualMarkupEs } from '@/lib/premium-utils';
import { 
  TextAnswerEvaluationResponse, 
  WritingEvaluationResponse, 
  MultipleChoiceEvaluationResponse 
} from '@/lib/exercise-types';

interface EnhancedFeedbackProps {
  type: 'text' | 'writing' | 'multiple-choice';
  evaluation: TextAnswerEvaluationResponse | WritingEvaluationResponse | MultipleChoiceEvaluationResponse | null;
  userAnswer: string;
  correctAnswer?: string;
  loading?: boolean;
}

export default function EnhancedFeedback({ type, evaluation, userAnswer, correctAnswer, loading }: EnhancedFeedbackProps) {
  const toSpanishText = (text: unknown): string => {
    if (typeof text !== 'string') return '';
    return stripBilingualMarkupEs(text);
  };

  const analysisLabel: Record<string, string> = {
    semanticMatch: 'Coincidencia semántica',
    grammaticalAccuracy: 'Precisión gramatical',
    vocabularyLevel: 'Nivel de vocabulario',
    completeness: 'Completitud'
  };

  if (loading) {
    return (
      <div className="mt-4 p-4 sm:p-6 bg-orange-50 border-2 border-orange-200 rounded-lg animate-pulse">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-coral-600"></div>
          <p className="text-coral-800 font-semibold">Evaluando tu respuesta...</p>
        </div>
      </div>
    );
  }

  if (!evaluation) return null;

  // TEXT ANSWER FEEDBACK
  if (type === 'text' && 'detailedAnalysis' in evaluation) {
    const textEval = evaluation as TextAnswerEvaluationResponse;
    
    return (
      <div className={`mt-4 p-4 sm:p-6 rounded-xl border-2 ${
        textEval.isCorrect ? 'bg-amber-50 border-amber-300' : 
        textEval.score >= 60 ? 'bg-yellow-50 border-yellow-300' : 
        'bg-red-50 border-red-300'
      }`}>
        {/* Header with Score */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {textEval.isCorrect ? '✓' : textEval.score >= 60 ? '⚠️' : '✗'}
            </span>
            <div>
              <p className="font-bold text-lg">
                {textEval.overallAssessment === 'excellent' && '¡Excelente!'}
                {textEval.overallAssessment === 'good' && '¡Buen trabajo!'}
                {textEval.overallAssessment === 'fair' && 'Bien'}
                {textEval.overallAssessment === 'needs-improvement' && 'Puede mejorar'}
                {textEval.overallAssessment === 'incorrect' && 'Incorrecto'}
              </p>
              <p className="text-sm text-slate-600">Evaluación</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-coral-600">{textEval.score}</div>
            <div className="text-xs text-slate-600">/ 100</div>
          </div>
        </div>

        {/* Your Answer */}
        <div className="mb-4 p-4 bg-white rounded-lg border border-slate-200">
          <p className="text-sm font-semibold text-slate-700 mb-1">Tu respuesta:</p>
          <p className="text-slate-800 italic">&quot;{userAnswer}&quot;</p>
        </div>

        {/* Main Feedback */}
        <div className="mb-4 p-4 bg-white rounded-lg border border-slate-200">
          <p className="text-sm font-semibold text-slate-700 mb-2">📝 Retroalimentación:</p>
          <p className="text-slate-800">{toSpanishText(textEval.feedback)}</p>
        </div>

        {/* Detailed Analysis Bars */}
        <div className="mb-4 space-y-2">
          <p className="text-sm font-semibold text-slate-700 mb-3">📊 Análisis detallado:</p>
          
          {Object.entries(textEval.detailedAnalysis).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <div className="w-32 text-sm font-medium text-slate-700 capitalize">
                {(analysisLabel[key] || key.replace(/([A-Z])/g, ' $1').trim())}:
              </div>
              <div className="flex-1 bg-slate-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    value >= 80 ? 'bg-amber-500' : 
                    value >= 60 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${value}%` }}
                />
              </div>
              <div className="w-12 text-sm font-bold text-slate-700">{value}%</div>
            </div>
          ))}
        </div>

        {/* Concepts Covered */}
        {textEval.conceptsCovered.length > 0 && (
          <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm font-semibold text-amber-900 mb-2">✓ Conceptos que cubriste:</p>
            <div className="flex flex-wrap gap-2">
              {textEval.conceptsCovered.map((concept, i) => (
                <span key={i} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Missing Concepts */}
        {textEval.missingConcepts.length > 0 && (
          <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm font-semibold text-orange-900 mb-2">⚠️ Conceptos faltantes:</p>
            <div className="flex flex-wrap gap-2">
              {textEval.missingConcepts.map((concept, i) => (
                <span key={i} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Grammar Errors */}
        {textEval.grammarErrors.length > 0 && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm font-semibold text-red-900 mb-3">📝 Mejoras gramaticales:</p>
            <div className="space-y-3">
              {textEval.grammarErrors.slice(0, 5).map((error, i) => (
                <div key={i} className="bg-white p-3 rounded border border-red-200">
                  <p className="text-sm text-red-800"><span className="font-semibold">Error:</span> {toSpanishText(error.error)}</p>
                  <p className="text-sm text-amber-800"><span className="font-semibold">Corrección:</span> {toSpanishText(error.correction)}</p>
                  <p className="text-xs text-slate-600 mt-1">{toSpanishText(error.explanation)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {textEval.suggestions.length > 0 && (
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm font-semibold text-coral-900 mb-2">💡 Sugerencias de mejora:</p>
            <ul className="space-y-1">
              {textEval.suggestions.map((suggestion, i) => (
                <li key={i} className="text-sm text-coral-800 flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span>{toSpanishText(suggestion)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Vocabulary Feedback */}
        {textEval.vocabularyFeedback.appropriateWords.length > 0 && (
          <div className="mt-4 p-4 bg-peach-50 rounded-lg border border-peach-200">
            <p className="text-sm font-semibold text-peach-900 mb-2">⭐ Buen vocabulario usado:</p>
            <div className="flex flex-wrap gap-2">
              {textEval.vocabularyFeedback.appropriateWords.map((word, i) => (
                <span key={i} className="px-3 py-1 bg-peach-100 text-peach-800 rounded-full text-sm font-medium">
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // WRITING FEEDBACK
  if (type === 'writing' && 'wordCount' in evaluation) {
    const writingEval = evaluation as WritingEvaluationResponse;
    
    return (
      <div className={`mt-4 p-4 sm:p-6 rounded-xl border-2 ${
        writingEval.isAcceptable ? 'bg-amber-50 border-amber-300' : 'bg-yellow-50 border-yellow-300'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-bold text-xl">Evaluación de escritura</p>
            <p className="text-sm text-slate-600">Evaluación completa</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black text-coral-600">{writingEval.overallScore}</div>
            <div className="text-xs text-slate-600">/ 100</div>
            <div className="text-xs text-slate-500 mt-1">IELTS: {writingEval.bandScore?.toFixed(1)}</div>
          </div>
        </div>

        {/* Word Count */}
        <div className={`mb-4 p-4 rounded-lg ${
          writingEval.wordCountFeedback.toLowerCase().includes('good') ? 'bg-amber-100' : 'bg-yellow-100'
        }`}>
          <p className="text-sm font-semibold mb-1">📏 Conteo de palabras:</p>
          <p className="text-sm">{toSpanishText(writingEval.wordCountFeedback)}</p>
        </div>

        {/* Score Breakdown */}
        <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(writingEval.scores).map(([category, score]) => (
            <div key={category} className="p-3 bg-white rounded-lg border border-slate-200 text-center">
              <div className="text-2xl font-bold text-coral-600">{score}</div>
              <div className="text-xs text-slate-600 capitalize mt-1">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>

        {/* Strengths */}
        {writingEval.strengths.length > 0 && (
          <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm font-semibold text-amber-900 mb-2">✓ Fortalezas:</p>
            <ul className="space-y-1">
              {writingEval.strengths.map((strength, i) => (
                <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">✓</span>
                  <span>{toSpanishText(strength)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weaknesses */}
        {writingEval.weaknesses.length > 0 && (
          <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm font-semibold text-orange-900 mb-2">⚠️ Áreas de mejora:</p>
            <ul className="space-y-1">
              {writingEval.weaknesses.map((weakness, i) => (
                <li key={i} className="text-sm text-orange-800 flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">→</span>
                  <span>{toSpanishText(weakness)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Grammar Errors */}
        {writingEval.grammarErrors.length > 0 && (
          <details className="mb-4">
            <summary className="cursor-pointer font-semibold text-red-700 hover:text-red-800 mb-2">
              📝 Correcciones gramaticales ({writingEval.grammarErrors.length})
            </summary>
            <div className="space-y-3 mt-3">
              {writingEval.grammarErrors.map((error, i) => (
                <div key={i} className="bg-white p-3 rounded border border-red-200">
                  <p className="text-xs text-slate-500 mb-1">{error.category.toUpperCase()}</p>
                  <p className="text-sm text-red-800 mb-1"><span className="font-semibold">❌</span> {error.sentence}</p>
                  <p className="text-sm text-amber-800 mb-1"><span className="font-semibold">✓</span> {error.correction}</p>
                  <p className="text-xs text-slate-600">{toSpanishText(error.explanation)}</p>
                </div>
              ))}
            </div>
          </details>
        )}

        {/* Recommendations */}
        {writingEval.recommendations.length > 0 && (
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm font-semibold text-coral-900 mb-2">💡 Recomendaciones:</p>
            <ul className="space-y-1">
              {writingEval.recommendations.map((rec, i) => (
                <li key={i} className="text-sm text-coral-800 flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span>{toSpanishText(rec)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // MULTIPLE CHOICE FEEDBACK
  if (type === 'multiple-choice' && 'confidence' in evaluation) {
    const mcEval = evaluation as MultipleChoiceEvaluationResponse;
    
    return (
      <div className={`mt-4 p-3 sm:p-4 rounded-lg border-2 ${
        mcEval.isCorrect ? 'bg-amber-50 border-amber-300' : 'bg-red-50 border-red-300'
      }`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{mcEval.isCorrect ? '✓' : '✗'}</span>
          <div className="flex-1">
            <p className="font-semibold">
              {mcEval.isCorrect ? '¡Correcto!' : 'No del todo correcto'}
              {mcEval.possibleTypo && ' (error tipográfico detectado, se otorga crédito)'}
            </p>
          </div>
          {mcEval.confidence && (
            <span className="text-xs text-slate-500">
              {mcEval.confidence}% de confianza
            </span>
          )}
        </div>

        {mcEval.explanation && (
          <div className="mb-3 p-3 bg-white rounded border border-slate-200">
            <p className="text-sm"><span className="font-semibold">Explicación:</span> {toSpanishText(mcEval.explanation)}</p>
          </div>
        )}

        {mcEval.whyWrong && (
          <div className="mb-3 p-3 bg-red-100 rounded border border-red-200">
            <p className="text-sm text-red-900"><span className="font-semibold">Por qué está mal:</span> {toSpanishText(mcEval.whyWrong)}</p>
          </div>
        )}

        {correctAnswer && !mcEval.isCorrect && (
          <div className="p-3 bg-amber-100 rounded border border-amber-200">
            <p className="text-sm text-amber-900"><span className="font-semibold">Respuesta correcta:</span> {correctAnswer}</p>
          </div>
        )}
      </div>
    );
  }

  return null;
}
