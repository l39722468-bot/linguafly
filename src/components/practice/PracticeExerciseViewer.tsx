'use client';

import { useState } from 'react';
import { stripBilingualMarkupEs } from '@/lib/premium-utils';

interface Question {
  id: string;
  number?: number; // For cloze/formation
  question: string;
  baseWord?: string; // For word-formation
  keyWord?: string; // For key-word-transformation
  startOfAnswer?: string; // For key-word-transformation
  type?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

interface Exercise {
  id: string;
  type: string;
  title: string;
  instructions?: string;
  text?: string; // For reading comprehension passages
  questions?: Question[];
  transformations?: any[];
  sections?: { id: string; content: string }[]; // For multiple-matching
  options?: string[]; // For gapped-text
}

interface PracticeExerciseViewerProps {
  exercise: Exercise;
  onComplete: (score: number) => void;
  onSkip: () => void;
  currentNumber: number;
  totalExercises: number;
  showNextButton?: boolean;
  onNextExercise?: () => void;
}

export default function PracticeExerciseViewer({
  exercise,
  onComplete,
  onSkip,
  currentNumber,
  totalExercises,
  showNextButton = false,
  onNextExercise
}: PracticeExerciseViewerProps) {
  const toSpanishText = (text: unknown): string => {
    if (typeof text !== 'string') return '';
    return stripBilingualMarkupEs(text);
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  const questions = exercise.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((answeredQuestions) / totalQuestions) * 100 : 0;

  const checkAnswer = () => {
    if (!currentQuestion) return;

    const userAnswer = answer.trim().toLowerCase();
    const q = currentQuestion as any;
    const correctAnswers = [
      ...(Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer]),
      ...(Array.isArray(q.acceptableAnswers) ? q.acceptableAnswers : (q.acceptableAnswers ? [q.acceptableAnswers] : [])),
      ...(Array.isArray(q.acceptableAlternatives) ? q.acceptableAlternatives : (q.acceptableAlternatives ? [q.acceptableAlternatives] : []))
    ].filter(Boolean).map(a => a.toLowerCase().trim());

    console.log('DEBUG - User answer:', userAnswer);
    console.log('DEBUG - Correct answers:', correctAnswers);
    console.log('DEBUG - Has options:', currentQuestion.options ? 'YES' : 'NO');
    if (currentQuestion.options) {
      console.log('DEBUG - Options:', currentQuestion.options);
    }

    // Direct match check
    let correct = correctAnswers.some(ca => userAnswer === ca);
    
    console.log('DEBUG - Direct match:', correct);
    
    // If not correct and has options, check against option text or letter
    if (!correct && currentQuestion.options && currentQuestion.options.length > 0) {
      currentQuestion.options.forEach((opt, idx) => {
        // Generate letter for this option (0=a, 1=b, 2=c, 3=d)
        const optionLetter = String.fromCharCode(97 + idx);
        const optionText = opt.toLowerCase().trim();
        
        // Check if this option is the correct one
        const isCorrectOption = correctAnswers.some(ca => ca === optionLetter);
        
        if (isCorrectOption) {
          console.log(`DEBUG - Option ${idx} (${optionLetter}) is the correct one:`, opt);
          // Check if user wrote the text of this option
          if (userAnswer === optionText) {
            console.log('DEBUG - User answer matches the text of correct option!');
            correct = true;
          }
        }
      });
    }

    console.log('DEBUG - Final result:', correct ? 'CORRECT' : 'INCORRECT');

    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + currentQuestion.points);
    }
    setAnsweredQuestions(answeredQuestions + 1);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer('');
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      // Ejercicio completado - calcular puntuación y marcar como completado
      const finalScore = totalQuestions > 0 ? (score / (totalQuestions * (currentQuestion?.points || 1))) * 100 : 0;
      setExerciseCompleted(true);
      onComplete(finalScore);
    }
  };

  // Helper to highlight current gap in text
  const renderTextWithHighlights = (text: string, currentGap: number) => {
    if (!text) return null;
    
    // Split by bracketed numbers like [1], [2], etc.
    const parts = text.split(/(\[\d+\])/g);
    
    return parts.map((part, i) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const gapNum = parseInt(match[1]);
        const isActive = gapNum === currentGap;
        return (
          <span 
            key={i} 
            className={`inline-flex items-center justify-center w-8 h-8 mx-1 rounded-full font-bold transition-all ${
              isActive 
                ? 'bg-coral-600 text-white scale-125 shadow-md' 
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {gapNum}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-peach-50">
        <div className="text-center">
          <p className="text-xl text-gray-600">No hay preguntas disponibles</p>
          <button
            onClick={onSkip}
            className="mt-4 px-6 py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors font-bold"
          >
            Saltar ejercicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-peach-50 flex flex-col">
      {/* Header simple - sin progreso ya que es 1 pregunta */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onSkip}
              className="text-gray-600 hover:text-gray-800 font-semibold flex items-center gap-2"
            >
              <span>✕</span>
              <span className="hidden sm:inline">Salir</span>
            </button>
            <div className="text-sm font-semibold text-gray-700">
              Ejercicio #{currentNumber}
            </div>
            <div className="w-8"></div> {/* Spacer para centrar */}
          </div>
        </div>
      </div>

      {/* Contenido principal - tipo Premium */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Título del ejercicio */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{exercise.title}</h2>
            {exercise.instructions && (
              <p className="text-gray-600">{exercise.instructions}</p>
            )}
          </div>

          {/* Reading passage / Gapped Text Passage */}
          {(exercise.text || exercise.type === 'gapped-text') && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{exercise.type === 'gapped-text' ? '🧩' : '📖'}</span>
                <h3 className="text-lg font-bold text-gray-900">
                  {exercise.type === 'gapped-text' ? 'Complete the Text' : 'Reading Passage'}
                </h3>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {exercise.type === 'gapped-text' 
                    ? renderTextWithHighlights(exercise.text || '', currentQuestion.number || (currentQuestionIndex + 1))
                    : exercise.text}
                </p>
              </div>
            </div>
          )}

          {/* Multiple Matching Sections */}
          {exercise.sections && exercise.type === 'multiple-matching' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {exercise.sections.map((section) => (
                <div key={section.id} className="bg-white rounded-xl shadow-sm p-5 border-t-4 border-coral-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 bg-coral-100 text-coral-700 rounded-lg flex items-center justify-center font-bold">
                      {section.id}
                    </span>
                    <h4 className="font-bold text-gray-900">Section {section.id}</h4>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-4 hover:line-clamp-none transition-all cursor-pointer">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Pregunta */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              {currentQuestion.number && (
                <span className="flex-shrink-0 w-10 h-10 bg-coral-100 text-coral-700 rounded-full flex items-center justify-center font-bold text-lg">
                  {currentQuestion.number}
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Special display for Key Word Transformation */}
            {currentQuestion.keyWord && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 text-center">
                <span className="text-sm uppercase tracking-widest text-gray-500 font-bold block mb-1">Key Word</span>
                <span className="text-2xl font-black text-coral-600">{currentQuestion.keyWord}</span>
              </div>
            )}

            {/* Special display for Word Formation */}
            {currentQuestion.baseWord && (
              <div className="mb-6 p-4 bg-orange-50 rounded-xl border-2 border-orange-200 flex items-center justify-between">
                <span className="text-sm font-bold text-orange-700 uppercase">Base Word:</span>
                <span className="text-xl font-black text-orange-900 tracking-wider">{currentQuestion.baseWord}</span>
              </div>
            )}

            {/* Display Start of Answer for transformations */}
            {currentQuestion.startOfAnswer && (
              <div className="mb-4 text-lg font-medium text-gray-700">
                {currentQuestion.startOfAnswer} ...
              </div>
            )}

            {/* Campo de respuesta para fill-blank - SOLO si NO hay opciones */}
            {!currentQuestion.options && !showFeedback && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && answer && checkAnswer()}
                  placeholder="Escribe tu respuesta..."
                  className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                  autoFocus
                  disabled={showFeedback}
                />
                <p className="text-sm text-gray-500">Pulsa Enter para enviar</p>
              </div>
            )}

            {/* Opciones múltiples */}
            {(currentQuestion.options || exercise.options) && (currentQuestion.options || exercise.options || []).length > 0 && !showFeedback && (
              <div className="space-y-3">
                {(currentQuestion.options || exercise.options || []).map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const selectedOption = option;
                      setAnswer(selectedOption);
                      
                      console.log('=== CLICK ON OPTION ===');
                      console.log('Option index:', idx);
                      console.log('Selected option:', selectedOption);
                      
                      // Determine the option letter
                      let optionLetter: string;
                      
                      // Check if option has format "A) text" or just "text"
                      if (selectedOption.includes(')')) {
                        // Format: "A) text"
                        optionLetter = selectedOption.split(')')[0].trim().toLowerCase();
                      } else {
                        // Format: just "text" - use index (0=a, 1=b, 2=c, 3=d)
                        optionLetter = String.fromCharCode(97 + idx); // 97 is 'a'
                      }
                      
                      console.log('Option letter:', optionLetter);
                      
                      // Get correct answers
                      const q_alt = currentQuestion as any;
                      const correctAnswers = [
                        ...(Array.isArray(q_alt.correctAnswer) ? q_alt.correctAnswer : [q_alt.correctAnswer]),
                        ...(Array.isArray(q_alt.acceptableAnswers) ? q_alt.acceptableAnswers : (q_alt.acceptableAnswers ? [q_alt.acceptableAnswers] : [])),
                        ...(Array.isArray(q_alt.acceptableAlternatives) ? q_alt.acceptableAlternatives : (q_alt.acceptableAlternatives ? [q_alt.acceptableAlternatives] : []))
                      ].filter(Boolean).map(a => a.toLowerCase().trim());
                      
                      console.log('Correct answers:', correctAnswers);
                      
                      // Check if answer is correct
                      // Accept both: the letter (a, b, c, d) OR the text content
                      const userAnswerLetter = optionLetter;
                      const userAnswerText = selectedOption.toLowerCase().trim();
                      
                      const correct = correctAnswers.some(ca => {
                        const matchLetter = userAnswerLetter === ca;
                        const matchText = userAnswerText === ca;
                        console.log(`Checking "${userAnswerLetter}" or "${userAnswerText}" vs "${ca}":`, matchLetter || matchText);
                        return matchLetter || matchText;
                      });
                      
                      console.log('Final result:', correct ? 'CORRECT ✓' : 'INCORRECT ✗');
                      console.log('======================');
                      
                      setIsCorrect(correct);
                      setShowFeedback(true);
                      
                      if (correct) {
                        setScore(score + currentQuestion.points);
                      }
                      setAnsweredQuestions(answeredQuestions + 1);
                    }}
                    className="w-full p-4 text-left border-2 border-gray-300 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all font-medium text-gray-900"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Feedback */}
            {showFeedback && (
              <div className={`mt-6 p-6 rounded-xl ${isCorrect ? 'bg-amber-50 border-2 border-amber-300' : 'bg-red-50 border-2 border-red-300'}`}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{isCorrect ? '✓' : '✗'}</span>
                  <div className="flex-1">
                    <h4 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-amber-800' : 'text-red-800'}`}>
                      {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </h4>
                    {!isCorrect && (
                      <p className="text-gray-700 mb-2">
                        <strong>Respuesta correcta:</strong>{' '}
                        {currentQuestion.startOfAnswer && <span className="text-gray-500 italic">{currentQuestion.startOfAnswer} </span>}
                        <span className="font-bold">
                          {Array.isArray(currentQuestion.correctAnswer)
                            ? currentQuestion.correctAnswer.join(' / ')
                            : currentQuestion.correctAnswer}
                        </span>
                      </p>
                    )}
                    {currentQuestion.explanation && (
                      <p className="text-gray-700 text-sm mt-2">
                        <strong>Explicación:</strong> {toSpanishText(currentQuestion.explanation)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botón de continuar */}
          {showFeedback && !exerciseCompleted && (
            <button
              onClick={nextQuestion}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-colors shadow-lg ${
                isCorrect
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
                  : 'bg-gradient-to-r from-orange-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white'
              }`}
            >
              {currentQuestionIndex < totalQuestions - 1 ? 'Continuar' : 'Finalizar ejercicio'}
            </button>
          )}

          {/* Botón "Next Exercise" después de completar */}
          {exerciseCompleted && showNextButton && onNextExercise && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <div className="text-center">
                  <span className="text-4xl mb-3 block">🎉</span>
                  <h3 className="text-2xl font-black text-green-800 mb-2">¡Ejercicio completado!</h3>
                  <p className="text-green-700">¿Quieres practicar con otro ejercicio?</p>
                </div>
              </div>
              <button
                onClick={onNextExercise}
                className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg"
              >
                Siguiente Ejercicio →
              </button>
              <button
                onClick={onSkip}
                className="w-full py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Terminar Sesión
              </button>
            </div>
          )}

          {/* Botón de verificar */}
          {!showFeedback && answer && (
            <button
              onClick={checkAnswer}
              className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-peach-500 text-white rounded-xl font-bold text-lg hover:from-coral-600 hover:to-peach-600 transition-all shadow-lg"
            >
              Verificar
            </button>
          )}

          {/* Botón de saltar (solo si no ha respondido) */}
          {!showFeedback && !answer && (
            <button
              onClick={onSkip}
              className="w-full mt-3 py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Saltar ejercicio
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
