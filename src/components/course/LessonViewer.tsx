'use client';

import Markdown from '@/components/course/Markdown';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, Target, BarChart3, Video, BookOpen, PencilLine, Headphones } from 'lucide-react';
import InteractiveTranscript from '@/components/course/InteractiveTranscript';
import EnhancedVoiceRecorder from '@/components/course/EnhancedVoiceRecorder';
import SmartPronunciationEvaluator from '@/components/course/SmartPronunciationEvaluator';
import PronunciationPractice from '@/components/course/PronunciationPractice';
import EnhancedFeedback from '@/components/course/EnhancedFeedback';
import SentenceBuilder from '@/components/course/SentenceBuilder';
import CelebrationModal from '@/components/course/CelebrationModal';
import RepairModeBanner from '@/components/course/RepairModeBanner';
import StreakBurst from '@/components/gamification/StreakBurst';
import SpeakingPart1 from '@/components/course/SpeakingPart1';
import SpeakingPart2 from '@/components/course/SpeakingPart2';
import SpeakingPart3 from '@/components/course/SpeakingPart3';
import SpeakingPart4 from '@/components/course/SpeakingPart4';
import EnhancedSpeakingExercise from '@/components/EnhancedSpeakingExercise';
import GappedTextExercise from '@/components/exercises/GappedTextExercise';
import MultipleMatchingExercise from '@/components/exercises/MultipleMatchingExercise';
import KeyWordTransformationExercise from '@/components/exercises/KeyWordTransformationExercise';
import MultipleChoiceClozeExercise from '@/components/exercises/MultipleChoiceClozeExercise';
import { GamificationWidget } from '@/components/gamification/GamificationPanel';
import { XPGainAnimation } from '@/components/gamification/XPDisplay';
import { BadgeNotification } from '@/components/gamification/BadgeDisplay';
import { useGamification } from '@/lib/hooks/use-gamification';
import GrammarVocabularyRenderer from '@/components/course/renderers/GrammarVocabularyRenderer';
import ListeningRenderer from '@/components/course/renderers/ListeningRenderer';
import ReadingRenderer from '@/components/course/renderers/ReadingRenderer';
import SpeakingRenderer from '@/components/course/renderers/SpeakingRenderer';
import PronunciationRenderer from '@/components/course/renderers/PronunciationRenderer';
import WritingRenderer from '@/components/course/renderers/WritingRenderer';
import TransformationRenderer from '@/components/course/renderers/TransformationRenderer';
import GapFillRenderer from '@/components/course/renderers/GapFillRenderer';
import MatchingRenderer from '@/components/course/renderers/MatchingRenderer';
import MiscRenderer from '@/components/course/renderers/MiscRenderer';
import TheorySlideViewer from '@/components/course/TheorySlideViewer';
import { stripBilingualMarkupEs } from '@/lib/premium-utils';
import type { 
  Lesson, 
  Exercise, 
  Question, 
  CaseStudy,
  TheorySlide,
  SentenceBuildingExercise,
  TextAnswerEvaluationResponse,
  WritingEvaluationResponse,
  MultipleChoiceEvaluationResponse,
  EvaluationResult,
  ReadingExercise,
  ListeningExercise,
  GrammarExercise,
  VoiceRecordingExercise,
  VocabularyExercise,
  WordFormationExercise
} from '@/lib/exercise-types';

interface LessonViewerProps {
  lesson: Lesson;
  onComplete: (lessonId: string, score: number) => void;
}

export default function LessonViewer({ lesson, onComplete }: LessonViewerProps) {
  const toSpanishText = (text: unknown): string => {
    if (typeof text !== 'string') return '';
    return stripBilingualMarkupEs(text);
  };

  // Detect lesson level from lesson ID (e.g., "a1-m1-l1" -> "A1", "b2-m1-l1" -> "B2", or "administracion-b1-..." -> "B1")
  const getLevel = () => {
    const parts = lesson.id.split('-');
    // Check if any part matches a level pattern
    const levelMatch = parts.find(p => /^[a-c][1-2]$/i.test(p));
    if (levelMatch) return levelMatch.toUpperCase() as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    return 'B1'; // Default fallback
  };
  
  const lessonLevel = getLevel();
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>(
    (lesson.theoryContent || (lesson.theorySlides && lesson.theorySlides.length > 0)) ? 'theory' : 'practice'
  );
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [exerciseScores, setExerciseScores] = useState<{ [exerciseId: string]: number }>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState<{ blob: Blob; transcript: string } | null>(null);
  const [pronunciationFeedback, setPronunciationFeedback] = useState<any>(null);
  const [pronunciationRecordings, setPronunciationRecordings] = useState<{ [index: number]: { blob: Blob; transcript: string; evaluation?: any } }>({});
  const [aiEvaluations, setAiEvaluations] = useState<{ [questionId: string]: EvaluationResult }>({});
  const [evaluating, setEvaluating] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [failCount, setFailCount] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showStreakBurst, setShowStreakBurst] = useState<number | null>(null);

  // Gamification hooks
  const gamification = useGamification();
  const [showXPGain, setShowXPGain] = useState(false);
  const [xpGained, setXPGained] = useState(0);
  const [newBadges, setNewBadges] = useState<any[]>([]);

  // Process slides to inject video if present
  const [processedSlides, setProcessedSlides] = useState<TheorySlide[]>(lesson.theorySlides || []);

  useEffect(() => {
    if (lesson.videoUrl && lesson.theorySlides && lesson.theorySlides.length > 0) {
      // Check if video is already injected to avoid duplicates
      if (!processedSlides.some(s => s.isVideoSlide)) {
        const videoSlide: TheorySlide = {
          title: "Video Lección",
          content: "Mira el video antes de continuar con la teoría y los ejercicios.",
          isVideoSlide: true,
          videoUrl: lesson.videoUrl
        };
        setProcessedSlides([videoSlide, ...lesson.theorySlides]);
      }
    } else {
      setProcessedSlides(lesson.theorySlides || []);
    }
  }, [lesson.videoUrl, lesson.theorySlides]);

  useEffect(() => {
    if (showFeedback) {
      if (currentScore >= 60) {
        setFailCount(0);
        setConsecutiveCorrect(prev => {
          const next = prev + 1;
          if (next === 3 || next === 5 || next === 10) {
            setShowStreakBurst(next);
          }
          return next;
        });
      } else {
        setFailCount(prev => prev + 1);
        setConsecutiveCorrect(0);
      }
    }
  }, [showFeedback, currentScore]);

  const currentExercise = lesson.exercises.length > 0 ? lesson.exercises[currentExerciseIndex] : null;
  const progress = lesson.exercises.length > 0 ? ((currentExerciseIndex + 1) / lesson.exercises.length) * 100 : 0;

  const handleEvaluatePronunciation = async () => {
    if (!currentExercise) return;
    const pronExercise = currentExercise as any;
    setEvaluating(true);
    
    try {
      const recordingsArray = Object.entries(pronunciationRecordings);
      if (recordingsArray.length === 0) {
        alert('Please record at least one sentence before evaluating.');
        setEvaluating(false);
        return;
      }

      // Evaluate each recording
      for (const [idxStr, recording] of recordingsArray) {
        const idx = parseInt(idxStr);
        const targetSentence = pronExercise.targetSentences[idx];
        
        if (!recording.evaluation) {
          const response = await fetch('/api/evaluate-speaking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              transcript: recording.transcript,
              expectedText: targetSentence.text || targetSentence.sentence,
              exerciseType: 'pronunciation',
              level: lessonLevel
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to evaluate pronunciation');
          }

          const data = await response.json();
          
          if (data.success && data.evaluation) {
            setPronunciationRecordings(prev => ({
              ...prev,
              [idx]: {
                ...prev[idx],
                evaluation: data.evaluation
              }
            }));
          }
        }
      }

      // Calculate overall pronunciation score
      const evaluatedRecordings = Object.values(pronunciationRecordings).filter(r => r.evaluation);
      if (evaluatedRecordings.length > 0) {
        const avgScore = evaluatedRecordings.reduce((sum, r) => sum + (r.evaluation?.overallScore || 0), 0) / evaluatedRecordings.length;
        setExerciseScores(prev => ({ ...prev, [currentExercise.id]: avgScore }));
      }

    } catch (error) {
      console.error('Error evaluating pronunciation:', error);
      alert('Error evaluating pronunciation. Please try again.');
    } finally {
      setEvaluating(false);
    }
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  // Function to evaluate pronunciation recordings
  const evaluatePronunciationRecordings = async () => {
    if (!currentExercise) return;
    setEvaluating(true);
    
    try {
      const recordingsArray = Object.entries(pronunciationRecordings);
      if (recordingsArray.length === 0) {
        alert('Please record at least one sentence before evaluating.');
        setEvaluating(false);
        return;
      }

      // We need the current exercise to get target sentences
      const pronExercise = currentExercise as any;

      // Evaluate each recording
      for (const [idxStr, recording] of recordingsArray) {
        const idx = parseInt(idxStr);
        const targetSentence = pronExercise.targetSentences[idx];
        
        if (!recording.evaluation) {
          const response = await fetch('/api/evaluate-speaking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              transcript: recording.transcript,
              expectedText: targetSentence.text || targetSentence.sentence,
              exerciseType: 'pronunciation',
              level: lessonLevel
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to evaluate pronunciation');
          }

          const data = await response.json();
          
          if (data.success && data.evaluation) {
            setPronunciationRecordings(prev => ({
              ...prev,
              [idx]: {
                ...prev[idx],
                evaluation: data.evaluation
              }
            }));
          }
        }
      }

      // Calculate overall pronunciation score
      const evaluatedRecordings = Object.values(pronunciationRecordings).filter(r => r.evaluation);
      if (evaluatedRecordings.length > 0) {
        const avgScore = evaluatedRecordings.reduce((sum, r) => sum + (r.evaluation?.overallScore || 0), 0) / evaluatedRecordings.length;
        setExerciseScores(prev => ({ ...prev, [currentExercise.id]: avgScore }));
      }

    } catch (error) {
      console.error('Error evaluating pronunciation:', error);
      alert('Error evaluating pronunciation. Please try again.');
    } finally {
      setEvaluating(false);
    }
  };

  const checkAnswers = async () => {
    if (!currentExercise) return;
    setEvaluating(true);
    
    if (currentExercise.type === 'grammar' || 
        currentExercise.type === 'reading' || 
        currentExercise.type === 'listening' || 
        currentExercise.type === 'vocabulary' ||
        currentExercise.type === 'multiple-choice-cloze' ||
        (currentExercise.type === 'pronunciation' && (currentExercise as any).exercises)) {
      
      let questions: Question[] = [];
      if ('questions' in currentExercise) {
        questions = currentExercise.questions as Question[];
      } else if (currentExercise.type === 'pronunciation' && (currentExercise as any).exercises) {
        questions = (currentExercise as any).exercises;
      }
      
      let totalPoints = 0;
      let earnedPoints = 0;
      const evaluations: { [questionId: string]: EvaluationResult } = {};

      for (const q of questions) {
        totalPoints += q.points;
        const userAnswer = answers[q.id];
        
        if (!userAnswer) {
          earnedPoints += 0;
          continue;
        }

        // MULTIPLE CHOICE - Use intelligent evaluation
        if (q.type === 'multiple-choice' && q.options) {
          try {
            const response = await fetch('/api/evaluate-multiple-choice', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                question: q.question,
                options: q.options,
                userAnswer: userAnswer,
                correctAnswer: Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer,
                context: currentExercise.type === 'reading' ? (currentExercise as any).text : '',
                level: lessonLevel
              })
            });

            if (response.ok) {
              const evaluation: MultipleChoiceEvaluationResponse = await response.json();
              evaluations[q.id] = evaluation;
              if (evaluation.isCorrect) {
                earnedPoints += q.points;
              }
            } else {
              // Fallback to string matching
              const correctAnswer = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
              if (userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
                earnedPoints += q.points;
              }
            }
          } catch (error) {
            console.error('Error evaluating multiple choice:', error);
            // Fallback
            const correctAnswer = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
            if (userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
              earnedPoints += q.points;
            }
          }
        }
        
        // SHORT ANSWER, FILL BLANK, or ESSAY - Use AI evaluation
        else if (q.type === 'short-answer' || q.type === 'fill-blank' || q.type === 'essay') {
          try {
            const response = await fetch('/api/evaluate-text-answer', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                question: q.question,
                userAnswer: userAnswer,
                correctAnswer: q.correctAnswer,
                expectedConcepts: (q as any).expectedConcepts || [],
                context: currentExercise.type === 'reading' ? (currentExercise as any).text?.substring(0, 2000) : '',
                level: lessonLevel,
                questionType: currentExercise.type === 'reading' ? 'comprehension' : 'general'
              })
            });

            if (response.ok) {
              const evaluation: TextAnswerEvaluationResponse = await response.json();
              evaluations[q.id] = evaluation;
              
              // Award points based on score (not just binary correct/incorrect)
              const percentageCorrect = evaluation.score / 100;
              earnedPoints += q.points * percentageCorrect;
            } else {
              // Fallback to basic string matching
              // Check acceptableAnswers first, then correctAnswer
              const acceptableAnswers = (q as any).acceptableAnswers;
              let answersToCheck: string[] = [];
              
              if (acceptableAnswers && Array.isArray(acceptableAnswers)) {
                answersToCheck = acceptableAnswers.map((a: string) => a.toLowerCase().trim());
              } else if (Array.isArray(q.correctAnswer)) {
                answersToCheck = (q.correctAnswer as string[]).map((a: string) => a.toLowerCase().trim());
              } else {
                answersToCheck = [(q.correctAnswer as string).toLowerCase().trim()];
              }
              
              const isCorrect = answersToCheck.some(ca => 
                userAnswer.toLowerCase().trim() === ca
              ) || 
              (q as any).acceptableAlternatives?.some((a: string) => a.toLowerCase().trim() === userAnswer.toLowerCase().trim()) ||
              (q as any).correctAnswers?.some((a: string) => a.toLowerCase().trim() === userAnswer.toLowerCase().trim());
              if (isCorrect) earnedPoints += q.points;
            }
          } catch (error) {
            console.error('Error evaluating text answer:', error);
            // Fallback
            // Check acceptableAnswers first, then correctAnswer
            const acceptableAnswers = (q as any).acceptableAnswers;
            let answersToCheck: string[] = [];
            
            if (acceptableAnswers && Array.isArray(acceptableAnswers)) {
              answersToCheck = acceptableAnswers.map((a: string) => a.toLowerCase().trim());
            } else if (Array.isArray(q.correctAnswer)) {
              answersToCheck = (q.correctAnswer as string[]).map((a: string) => a.toLowerCase().trim());
            } else {
              answersToCheck = [(q.correctAnswer as string).toLowerCase().trim()];
            }
            
            const isCorrect = answersToCheck.some(ca => 
              userAnswer.toLowerCase().trim() === ca
            );
            if (isCorrect) earnedPoints += q.points;
          }
        }
        
        // TRUE/FALSE or STRESS-IDENTIFICATION - Simple exact match
        else if (q.type === 'true-false' || q.type === 'stress-identification') {
          const correctAnswer = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
          if (userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
            earnedPoints += q.points;
          }
        }
        
        // MINIMAL-PAIRS - Informational only, give full points for completion
        else if (q.type === 'minimal-pairs') {
          earnedPoints += q.points;
        }
      }

      const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
      setExerciseScores(prev => ({ ...prev, [currentExercise.id]: score }));
      setAiEvaluations(evaluations);
      setCurrentScore(score);
      setShowFeedback(true);
      setShowCelebration(true);
      setEvaluating(false);
      
    } else if (currentExercise.type === 'key-word-transformation') {
      const transformations = currentExercise.transformations;
      let totalPoints = 0;
      let earnedPoints = 0;
      const evaluations: { [transformationId: string]: EvaluationResult } = {};

      for (const t of transformations) {
        totalPoints += t.points;
        const userAnswer = answers[t.id];
        
        if (!userAnswer) {
          earnedPoints += 0;
          continue;
        }

        // Use AI evaluation for key-word transformation
        try {
          const fullUserSentence = `${t.startOfAnswer} ${userAnswer}`.trim();
          const fullTargetSentence = `${t.startOfAnswer} ${t.correctAnswer}`.trim();
          
          const response = await fetch('/api/evaluate-sentence-building', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userSentence: fullUserSentence,
              targetSentence: fullTargetSentence,
              grammarFocus: 'key word transformation',
              words: [{ text: t.keyWord, type: 'key' }]
            })
          });

          if (response.ok) {
            const evaluation = await response.json();
            evaluations[t.id] = evaluation;
            // Award points based on AI score
            earnedPoints += t.points * (evaluation.score / 100);
          } else {
            // Fallback to simple matching
            const userAnswerNorm = userAnswer.toLowerCase().trim();
            const rawCorrectAnswers = [
              t.correctAnswer,
              ...( (t as any).acceptableAnswers || [] ),
              ...( (t as any).acceptableAlternatives || [] )
            ];
            const correctAnswers = rawCorrectAnswers.map(a => a.toLowerCase().trim());
            
            const isCorrect = correctAnswers.includes(userAnswerNorm);
            if (isCorrect) {
              earnedPoints += t.points;
            }

            evaluations[t.id] = {
              isCorrect,
              score: isCorrect ? 100 : 0,
              feedback: isCorrect ? '✓ ¡Correcto!' : '✗ Respuesta incorrecta',
              detailedExplanation: isCorrect 
                ? 'Tu respuesta es correcta.' 
                : `La respuesta correcta es: ${t.correctAnswer}`
            };
          }
        } catch (error) {
          console.error('Error evaluating key-word transformation:', error);
          // Fallback to simple matching
          const userAnswerNorm = userAnswer.toLowerCase().trim();
          const rawCorrectAnswers = [
            t.correctAnswer,
            ...( (t as any).acceptableAnswers || [] ),
            ...( (t as any).acceptableAlternatives || [] )
          ];
          const correctAnswers = rawCorrectAnswers.map(a => a.toLowerCase().trim());
          const isCorrect = correctAnswers.includes(userAnswerNorm);
          
          if (isCorrect) {
            earnedPoints += t.points;
          }

          evaluations[t.id] = {
            isCorrect,
            score: isCorrect ? 100 : 0,
            feedback: isCorrect ? '✓ ¡Correcto!' : '✗ Respuesta incorrecta',
            detailedExplanation: isCorrect 
              ? 'Tu respuesta es correcta.' 
              : `La respuesta correcta es: ${t.correctAnswer}`
          };
        }
      }

      const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
      setExerciseScores(prev => ({ ...prev, [currentExercise.id]: score }));
      setAiEvaluations(evaluations);
      setCurrentScore(score);
      setShowFeedback(true);
      setShowCelebration(true);
      setEvaluating(false);
      
    } else if (currentExercise.type === 'word-formation') {
      const questions = currentExercise.questions;
      let totalPoints = 0;
      let earnedPoints = 0;
      const newEvaluations: any = {};

      // Use AI evaluation for each word-formation question
      for (const q of questions) {
        totalPoints += q.points;
        const userAnswer = answers[q.id] || '';

        if (!userAnswer || userAnswer.trim() === '') {
          newEvaluations[q.id] = {
            isCorrect: false,
            score: 0,
            feedback: 'No se proporcionó respuesta',
            detailedExplanation: 'Por favor, proporciona una respuesta.'
          };
          continue;
        }

        try {
          const response = await fetch('/api/evaluate-text-answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              question: `Transform the word "${q.baseWord}" to complete the gap. ${q.hint ? 'Hint: ' + q.hint : ''}`,
              userAnswer: userAnswer,
              correctAnswer: q.acceptableAnswers || [q.correctAnswer],
              expectedConcepts: [q.wordType || 'word transformation', q.transformation || ''],
              context: currentExercise.text || '',
              level: lessonLevel,
              questionType: 'word-formation'
            })
          });

          if (response.ok) {
            const evaluation = await response.json();
            newEvaluations[q.id] = evaluation;
            
            if (evaluation.isCorrect) {
              earnedPoints += q.points;
            }
          } else {
            // Fallback to simple comparison
            const userAnswerLower = userAnswer.toLowerCase().trim();
            const isCorrect = userAnswerLower === q.correctAnswer?.toLowerCase().trim() ||
              (q.acceptableAnswers && q.acceptableAnswers.some((ans: string) => 
                userAnswerLower === ans.toLowerCase().trim()
              ));
            
            if (isCorrect) {
              earnedPoints += q.points;
            }
            
            newEvaluations[q.id] = {
              isCorrect,
              score: isCorrect ? 100 : 0,
              feedback: isCorrect ? '✓ ¡Correcto!' : '✗ Respuesta incorrecta',
              detailedExplanation: isCorrect 
                ? 'Tu respuesta es correcta.' 
                : `La respuesta correcta es: ${q.correctAnswer}`
            };
          }
        } catch (error) {
          console.error('Error evaluating word-formation:', error);
          // Fallback
          const userAnswerLower = userAnswer.toLowerCase().trim();
          const isCorrect = userAnswerLower === q.correctAnswer?.toLowerCase().trim() ||
            ( (q as any).acceptableAnswers && (q as any).acceptableAnswers.some((ans: string) => 
              userAnswerLower === ans.toLowerCase().trim()
            )) ||
            ( (q as any).acceptableAlternatives && (q as any).acceptableAlternatives.some((ans: string) => 
              userAnswerLower === ans.toLowerCase().trim()
            ));
          
          if (isCorrect) {
            earnedPoints += q.points;
          }
          
          newEvaluations[q.id] = {
            isCorrect,
            score: isCorrect ? 100 : 0,
            feedback: isCorrect ? '✓ ¡Correcto!' : '✗ Respuesta incorrecta',
            detailedExplanation: isCorrect 
              ? 'Tu respuesta es correcta.' 
              : `La respuesta correcta es: ${q.correctAnswer}`
          };
        }
      }

      setAiEvaluations(newEvaluations);
      const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
      setExerciseScores(prev => ({ ...prev, [currentExercise.id]: score }));
      setCurrentScore(score);
      setShowFeedback(true);
      setShowCelebration(true);
      setEvaluating(false);
      
    } else if (currentExercise.type === 'gap-fill-text') {
      const gaps = (currentExercise as any).gaps;
      let totalPoints = 0;
      let earnedPoints = 0;
      const evaluations: { [gapId: string]: EvaluationResult } = {};

      for (const gap of gaps) {
        totalPoints += gap.points;
        const userAnswer = answers[gap.id];
        
        if (!userAnswer || userAnswer.trim() === '') {
          earnedPoints += 0;
          evaluations[gap.id] = {
            isCorrect: false,
            score: 0,
            feedback: 'No se proporcionó respuesta',
            detailedExplanation: gap.explanation || ''
          } as any;
          continue;
        }

        // Use AI evaluation for gap-fill answers
        try {
          const context = (currentExercise as any).text || '';
          const acceptableAnswers = [gap.correctAnswer];
          if (gap.acceptableAlternatives) {
            acceptableAnswers.push(...gap.acceptableAlternatives);
          }

          const response = await fetch('/api/evaluate-text-answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              question: `Fill in gap ${gap.gapNumber}`,
              userAnswer: userAnswer,
              correctAnswer: acceptableAnswers,
              expectedConcepts: [(currentExercise as any).title || 'grammar'],
              context: context.substring(0, 2000),
              level: lessonLevel,
              questionType: 'gap-fill'
            })
          });

          if (response.ok) {
            const evaluation: TextAnswerEvaluationResponse = await response.json();
            evaluations[gap.id] = evaluation;
            
            // Award full or partial points based on AI score
            if (evaluation.isCorrect) {
              earnedPoints += gap.points;
            } else if (evaluation.score >= 70) {
              // Partial credit for close answers
              earnedPoints += gap.points * (evaluation.score / 100);
            }
          } else {
            // Fallback to simple string matching
            const userAnswerNorm = userAnswer.toLowerCase().trim();
            const isCorrect = acceptableAnswers.some(ans => 
              userAnswerNorm === ans.toLowerCase().trim()
            );
            
            if (isCorrect) {
              earnedPoints += gap.points;
            }
            
            evaluations[gap.id] = {
              isCorrect,
              score: isCorrect ? 100 : 0,
              feedback: isCorrect ? '✓ ¡Correcto!' : '✗ Respuesta incorrecta',
              detailedExplanation: gap.explanation || (isCorrect ? 'Tu respuesta es correcta.' : `La respuesta correcta es: ${gap.correctAnswer}`)
            } as any;
          }
        } catch (error) {
          console.error('Error evaluating gap-fill answer:', error);
          // Fallback to simple matching
          const userAnswerNorm = userAnswer.toLowerCase().trim();
          const acceptableAnswers = [gap.correctAnswer];
          if (gap.acceptableAlternatives) {
            acceptableAnswers.push(...gap.acceptableAlternatives);
          }
          const isCorrect = acceptableAnswers.some(ans => 
            userAnswerNorm === ans.toLowerCase().trim()
          );
          
          if (isCorrect) {
            earnedPoints += gap.points;
          }
          
          evaluations[gap.id] = {
            isCorrect,
            score: isCorrect ? 100 : 0,
            feedback: isCorrect ? '✓ ¡Correcto!' : '✗ Respuesta incorrecta',
            detailedExplanation: gap.explanation || (isCorrect ? 'Tu respuesta es correcta.' : `La respuesta correcta es: ${gap.correctAnswer}`)
          } as any;
        }
      }

      const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
      setExerciseScores(prev => ({ ...prev, [currentExercise.id]: score }));
      setAiEvaluations(evaluations);
      setCurrentScore(score);
      setShowFeedback(true);
      setShowCelebration(true);
      setEvaluating(false);
      
    } else if (currentExercise.type === 'error-identification' ||
               currentExercise.type === 'collocation-matching' ||
               currentExercise.type === 'phrasal-verbs' ||
               currentExercise.type === 'idioms-expressions' ||
               currentExercise.type === 'key-word-transformations' ||
               currentExercise.type === 'sentence-completion' ||
               currentExercise.type === 'matching') {
      
      const exercise = currentExercise as any;
      const items = exercise.sentences || exercise.pairs || exercise.items || exercise.transformations || [];
      let totalPoints = 0;
      let earnedPoints = 0;
      const evaluations: { [id: string]: EvaluationResult } = {};

      for (const item of items) {
        const itemId = item.id || item.idiom;
        totalPoints += item.points || 1;
        const userAnswer = answers[itemId] || '';
        
        if (!userAnswer || userAnswer.trim() === '') {
          evaluations[itemId] = {
            isCorrect: false,
            score: 0,
            feedback: 'No se proporcionó respuesta',
            detailedExplanation: item.explanation || ''
          } as any;
          continue;
        }

        const correctAnswer = item.correctAnswer || item.correctMatch || item.correctUsage || item.meaning || '';
        
        if (currentExercise.type === 'error-identification') {
          const isCorrect = item.hasError ? userAnswer === 'error' : userAnswer === 'correct';
          if (isCorrect) earnedPoints += item.points || 1;
          evaluations[itemId] = {
            isCorrect,
            score: isCorrect ? 100 : 0,
            feedback: isCorrect ? '✓ ¡Correcto!' : '✗ Respuesta incorrecta',
            detailedExplanation: item.explanation || ''
          } as any;
        } else {
          const userAnswerNorm = userAnswer.toLowerCase().trim();
          const correctAnswerNorm = correctAnswer.toLowerCase().trim();
          const isCorrect = userAnswerNorm === correctAnswerNorm ||
            (item.alternatives && item.alternatives.some((alt: string) => 
              userAnswerNorm === alt.toLowerCase().trim()
            )) ||
            (item.acceptableAnswers && item.acceptableAnswers.some((ans: string) => 
              userAnswerNorm === ans.toLowerCase().trim()
            )) ||
            (item.acceptableAlternatives && item.acceptableAlternatives.some((alt: string) => 
              userAnswerNorm === alt.toLowerCase().trim()
            ));
          
          if (isCorrect) earnedPoints += item.points || 1;
          
          evaluations[itemId] = {
            isCorrect,
            score: isCorrect ? 100 : 0,
            feedback: isCorrect ? '✓ ¡Correcto!' : '✗ Respuesta incorrecta',
            detailedExplanation: item.explanation || (isCorrect ? '¡Correcto!' : `La respuesta correcta es: ${correctAnswer}`)
          } as any;
        }
      }

      const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
      setExerciseScores(prev => ({ ...prev, [currentExercise.id]: score }));
      setAiEvaluations(evaluations);
      setCurrentScore(score);
      setShowFeedback(true);
      setShowCelebration(true);
      setEvaluating(false);

    } else if (currentExercise.type === 'paraphrasing' || currentExercise.type === 'paraphrase') {
      const exercise = currentExercise as any;
      const items = exercise.items || exercise.sentences || [];
      let totalPoints = 0;
      let earnedPoints = 0;
      const evaluations: { [id: string]: EvaluationResult } = {};

      for (const item of items) {
        const itemId = item.id || `paraph-${items.indexOf(item)}`;
        totalPoints += item.points || 2;
        const userAnswer = answers[itemId] || '';
        
        if (!userAnswer || userAnswer.trim() === '') {
          evaluations[itemId] = {
            isCorrect: false,
            score: 0,
            feedback: 'No se proporcionó respuesta',
            detailedExplanation: ''
          } as any;
          continue;
        }

        try {
          const response = await fetch('/api/evaluate-text-answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              question: `Paraphrase: ${item.originalSentence || item.original}`,
              userAnswer: userAnswer,
              correctAnswer: [item.correctParaphrase || item.paraphrase],
              expectedConcepts: ['paraphrasing'],
              level: lessonLevel,
              questionType: 'paraphrase'
            })
          });

          if (response.ok) {
            const evaluation: TextAnswerEvaluationResponse = await response.json();
            evaluations[itemId] = evaluation;
            if (evaluation.isCorrect || evaluation.score >= 70) {
              earnedPoints += (item.points || 2) * (evaluation.score / 100);
            }
          } else {
            evaluations[itemId] = {
              isCorrect: false,
              score: 50,
              feedback: 'Partial credit',
              detailedExplanation: item.explanation || ''
            } as any;
            earnedPoints += (item.points || 2) * 0.5;
          }
        } catch (error) {
          console.error('Error evaluating paraphrase:', error);
          evaluations[itemId] = {
            isCorrect: false,
            score: 50,
            feedback: 'Partial credit',
            detailedExplanation: item.explanation || ''
          } as any;
          earnedPoints += (item.points || 2) * 0.5;
        }
      }

      const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
      setExerciseScores(prev => ({ ...prev, [currentExercise.id]: score }));
      setAiEvaluations(evaluations);
      setCurrentScore(score);
      setShowFeedback(true);
      setShowCelebration(true);
      setEvaluating(false);

    } else if (currentExercise.type === 'sentence-reordering' || currentExercise.type === 'sentence-ordering') {
      const exercise = currentExercise as any;
      const items = exercise.items || [{ sentences: exercise.sentences, correctOrder: exercise.correctOrder, id: 'single' }];
      let totalPoints = 0;
      let earnedPoints = 0;

      for (const item of items) {
        const sentences = item.shuffledSentences || item.sentences || [];
        const correctOrder = item.correctOrder || Array.from({length: sentences.length}, (_, i) => i);
        totalPoints += sentences.length;
        
        for (let idx = 0; idx < sentences.length; idx++) {
          const numberId = `${item.id || 'reorder-0'}-${idx}`;
          const userOrder = parseInt(answers[numberId] || '0');
          if (userOrder === correctOrder[idx] + 1) {
            earnedPoints += 1;
          }
        }
      }

      const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
      setExerciseScores(prev => ({ ...prev, [currentExercise.id]: score }));
      setCurrentScore(score);
      setShowFeedback(true);
      setShowCelebration(true);
      setEvaluating(false);

    } else if (currentExercise.type === 'gap-fill' || 
               currentExercise.type === 'extended-gap-fill' || 
               currentExercise.type === 'open-cloze') {
      const exercise = currentExercise as any;
      const gaps = exercise.gaps || [];
      let totalPoints = 0;
      let earnedPoints = 0;
      const evaluations: { [id: string]: EvaluationResult } = {};

      for (const gap of gaps) {
        const gapId = gap.id || `gap-${gaps.indexOf(gap) + 1}`;
        totalPoints += 1;
        const userAnswer = answers[gapId] || '';
        
        if (!userAnswer || userAnswer.trim() === '') {
          evaluations[gapId] = {
            isCorrect: false,
            score: 0,
            feedback: 'No se proporcionó respuesta',
            detailedExplanation: gap.explanation || ''
          } as any;
          continue;
        }

        const correctAnswers = [
          ...(gap.correctAnswers || []),
          ...(gap.acceptableAnswers || []),
          ...(gap.acceptableAlternatives || []),
          gap.correctAnswer
        ].filter(Boolean);
        const userAnswerNorm = userAnswer.toLowerCase().trim();
        const isCorrect = correctAnswers.some((ans: string) => 
          userAnswerNorm === ans.toLowerCase().trim()
        );
        
        if (isCorrect) earnedPoints += 1;
        
        evaluations[gapId] = {
          isCorrect,
          score: isCorrect ? 100 : 0,
          feedback: isCorrect ? '✓ ¡Correcto!' : '✗ Respuesta incorrecta',
          detailedExplanation: gap.explanation || ''
        } as any;
      }

      const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
      setExerciseScores(prev => ({ ...prev, [currentExercise.id]: score }));
      setAiEvaluations(evaluations);
      setCurrentScore(score);
      setShowFeedback(true);
      setShowCelebration(true);
      setEvaluating(false);

    } else if (currentExercise.type === 'summary-writing') {
      const exercise = currentExercise as any;
      const userSummary = answers[exercise.id] || '';

      if (!userSummary || userSummary.trim() === '') {
        setEvaluating(false);
        return;
      }

      try {
        const response = await fetch('/api/evaluate-writing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            writingText: userSummary,
            taskType: 'summary',
            sourceText: exercise.originalText || exercise.sourceText,
            level: lessonLevel,
            rubric: exercise.rubric || {
              content: 40,
              conciseness: 20,
              accuracy: 20,
              grammar: 20
            }
          })
        });

        if (response.ok) {
          const evaluation: WritingEvaluationResponse = await response.json();
          evaluation.isCorrect = evaluation.isAcceptable;
          setAiEvaluations({ [exercise.id]: evaluation });
          setExerciseScores(prev => ({ ...prev, [exercise.id]: evaluation.overallScore }));
          setCurrentScore(evaluation.overallScore);
        }
      } catch (error) {
        console.error('Error evaluating summary:', error);
      }

      setShowFeedback(true);
      setShowCelebration(true);
      setEvaluating(false);

    } else if (currentExercise.type === 'integrated-reading-writing') {
      const exercise = currentExercise as any;
      const questions = exercise.questions || [];
      let totalPoints = 0;
      let earnedPoints = 0;
      const evaluations: { [id: string]: EvaluationResult } = {};

      for (const q of questions) {
        totalPoints += q.points || 1;
        const userAnswer = answers[q.id] || '';
        
        if (!userAnswer) {
          evaluations[q.id] = {
            isCorrect: false,
            score: 0,
            feedback: 'No se proporcionó respuesta'
          } as TextAnswerEvaluationResponse;
          continue;
        }

        if (q.type === 'multiple-choice' && q.options) {
          const isCorrect = userAnswer === q.correctAnswer;
          if (isCorrect) earnedPoints += q.points || 1;
          evaluations[q.id] = {
            isCorrect,
            score: isCorrect ? 100 : 0,
            feedback: isCorrect ? '✓ ¡Correcto!' : '✗ Respuesta incorrecta',
            detailedExplanation: q.explanation || ''
          } as MultipleChoiceEvaluationResponse;
        } else {
          try {
            const response = await fetch('/api/evaluate-text-answer', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                question: q.question,
                userAnswer: userAnswer,
                correctAnswer: [q.correctAnswer],
                expectedConcepts: ['reading comprehension'],
                context: exercise.readingText,
                level: lessonLevel,
                questionType: 'short-answer'
              })
            });

            if (response.ok) {
              const evaluation: TextAnswerEvaluationResponse = await response.json();
              evaluations[q.id] = evaluation;
              if (evaluation.isCorrect || evaluation.score >= 70) {
                earnedPoints += (q.points || 1) * (evaluation.score / 100);
              }
            }
          } catch (error) {
            console.error('Error evaluating answer:', error);
          }
        }
      }

      const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
      setExerciseScores(prev => ({ ...prev, [currentExercise.id]: score }));
      setAiEvaluations(evaluations);
      setCurrentScore(score);
      setShowFeedback(true);
      setShowCelebration(true);
      setEvaluating(false);

    } else {
      setEvaluating(false);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      audioRef.current.play().catch(e => console.error("Error playing audio after seek:", e));
    }
  };

  const nextExercise = async () => {
    if (!currentExercise) {
      if (currentExerciseIndex < lesson.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
      }
      return;
    }

    // Award XP for completed exercise if it has a score
    if (exerciseScores[currentExercise.id] !== undefined) {
      const exerciseScore = exerciseScores[currentExercise.id];
      const maxScore = 100; // Assume 100 as max for percentage calculation
      
      const result = await gamification.completeExercise(
        currentExercise.id, 
        exerciseScore, 
        maxScore
      );
      
      if (result?.newBadges && result.newBadges.length > 0) {
        setNewBadges(result.newBadges);
      }
      
      // Show XP gain animation
      const xpAmount = Math.floor((exerciseScore / maxScore) * 20) + (exerciseScore === maxScore ? 10 : 0);
      setXPGained(xpAmount);
      setShowXPGain(true);
      
      setTimeout(() => setShowXPGain(false), 2000);
    }
    
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setShowFeedback(false);
      setAnswers({});
      setAiEvaluations({});
      setCurrentScore(0);
      setRecordedAudio(null);
      setPronunciationFeedback(null);
      setPronunciationRecordings({});
    } else {
      // Calcular puntuación total de la lección
      const totalScore = Object.values(exerciseScores).reduce((sum, score) => sum + score, 0) / Object.keys(exerciseScores).length;
      
      // Award XP for completing the lesson
      await gamification.completeLesson(lesson.id, totalScore, 100);
      
      onComplete(lesson.id, totalScore);
    }
  };

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      setShowFeedback(false);
    }
  };

  const handleVoiceRecordingComplete = (audioBlob: Blob, transcript: string) => {
    setRecordedAudio({ blob: audioBlob, transcript });
  };

  const handlePronunciationEvaluationComplete = (feedback: any) => {
    if (!currentExercise) return;
    setPronunciationFeedback(feedback);
    setExerciseScores(prev => ({ ...prev, [currentExercise.id]: feedback.score.overall }));
  };

  const handleTryAgain = () => {
    setAnswers({});
    setShowFeedback(false);
    setAiEvaluations({});
    setCurrentScore(0);
    setRecordedAudio(null);
    setPronunciationFeedback(null);
    setPronunciationRecordings({});
  };

  const handleNext = () => {
    nextExercise();
  };

  const renderExercise = () => {
    if (!currentExercise) return null;
    
    // Check if exercise has required content
    const ex = currentExercise as any;
    const hasContent = ex.questions || 
                      ex.grammarPoint || 
                      ex.text || 
                      ex.prompt ||
                      ex.audioUrl ||
                      ex.gaps ||
                      ex.challenges ||
                      ex.sentences ||
                      ex.items ||
                      ex.pairs ||
                      ex.transformations;

    // Render "Coming Soon" message for incomplete exercises
    if (!hasContent) {
      return (
        <div key={currentExercise.id} className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-3">
              Contenido en Desarrollo
            </h3>
            <p className="text-slate-700 mb-4">
              Esta lección está actualmente en desarrollo y estará disponible pronto.
            </p>
            <div className="bg-white rounded-lg p-4 border border-blue-300 max-w-md mx-auto">
              <p className="text-sm text-slate-600">
                <strong>Ejercicio:</strong> {currentExercise.title || 'Sin título'}
              </p>
              <p className="text-sm text-slate-600 mt-2">
                <strong>Tipo:</strong> {currentExercise.type}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={nextExercise}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg"
            >
              Continuar a Siguiente Ejercicio →
            </button>
          </div>
        </div>
      );
    }

    switch (currentExercise.type) {
      case 'grammar':
      case 'vocabulary':
        return (
          <GrammarVocabularyRenderer
            key={currentExercise.id}
            exercise={currentExercise as GrammarExercise | VocabularyExercise}
            answers={answers}
            onAnswer={handleAnswer}
            showFeedback={showFeedback}
            aiEvaluations={aiEvaluations}
            onCheck={checkAnswers}
            evaluating={evaluating}
          />
        );

      case 'reading':
        return (
          <ReadingRenderer
            key={currentExercise.id}
            exercise={currentExercise as ReadingExercise}
            answers={answers}
            onAnswer={handleAnswer}
            showFeedback={showFeedback}
            aiEvaluations={aiEvaluations}
            onCheck={checkAnswers}
            evaluating={evaluating}
            onNext={nextExercise}
          />
        );

      case 'pronunciation':
        return (
          <PronunciationRenderer
            key={currentExercise.id}
            exercise={currentExercise}
            answers={answers}
            onAnswer={handleAnswer}
            showFeedback={showFeedback}
            aiEvaluations={aiEvaluations}
            onCheck={checkAnswers}
            evaluating={evaluating}
            pronunciationRecordings={pronunciationRecordings}
            setPronunciationRecordings={setPronunciationRecordings}
            onEvaluateRecordings={handleEvaluatePronunciation}
            lessonLevel={lessonLevel}
          />
        );

      case 'speaking':
      case 'speaking-part1':
      case 'speaking-part2':
      case 'speaking-part3':
      case 'speaking-part4':
        return (
          <SpeakingRenderer
            key={currentExercise.id}
            exercise={currentExercise}
            lessonLevel={lessonLevel}
            onScoreUpdate={(id, score) => setExerciseScores(prev => ({ ...prev, [id]: score }))}
            onNext={nextExercise}
            setShowFeedback={setShowFeedback}
          />
        );

      case 'listening':
        return (
          <ListeningRenderer
            key={currentExercise.id}
            exercise={currentExercise as ListeningExercise}
            answers={answers}
            onAnswer={handleAnswer}
            showFeedback={showFeedback}
            aiEvaluations={aiEvaluations}
            onCheck={checkAnswers}
            evaluating={evaluating}
            onNext={nextExercise}
            currentTime={audioCurrentTime}
            onTimeUpdate={setAudioCurrentTime}
            onSeek={(time) => { if (audioRef.current) audioRef.current.currentTime = time; }}
            audioRef={audioRef}
            nextExerciseAudioUrl={(lesson.exercises[currentExerciseIndex + 1] as any)?.audioUrl}
          />
        );

      case 'writing':
        return (
          <div key={currentExercise.id} className="space-y-6">
            <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
              <h3 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
                <span>✍️</span>
                <span>Writing Exercise: {currentExercise.writingType}</span>
              </h3>
              <p className="text-slate-700 mb-4">{currentExercise.prompt}</p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded border border-amber-200">
                  <p className="font-semibold text-amber-800">Word Count:</p>
                  <p className="text-slate-700">{currentExercise.minWords}-{currentExercise.maxWords} words</p>
                </div>
                <div className="bg-white p-3 rounded border border-amber-200">
                  <p className="font-semibold text-amber-800">Type:</p>
                  <p className="text-slate-700 capitalize">{currentExercise.writingType}</p>
                </div>
              </div>
            </div>

            {currentExercise.tips && currentExercise.tips.length > 0 && (
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 className="font-bold text-coral-900 mb-2 flex items-center gap-2">
                  <span>💡</span>
                  <span>Writing Tips:</span>
                </h4>
                <ul className="space-y-1">
                  {currentExercise.tips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-coral-800 flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-900 mb-2">Your Response:</label>
              <textarea
                value={answers[currentExercise.id] || ''}
                onChange={(e) => handleAnswer(currentExercise.id, e.target.value)}
                placeholder="Start writing here..."
                rows={15}
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-orange-500 focus:outline-none font-mono text-sm"
              />
              <div className="flex justify-between items-center mt-2 text-sm text-slate-600">
                <span>
                  Word count: {(answers[currentExercise.id] || '').split(/\s+/).filter(w => w.length > 0).length} / {currentExercise.minWords}-{currentExercise.maxWords}
                </span>
                <span>Characters: {(answers[currentExercise.id] || '').length}</span>
              </div>
            </div>

            {currentExercise.exampleResponse && (
              <details>
                <summary className="cursor-pointer font-semibold text-coral-700 hover:text-coral-800">
                  📝 View Example Response
                </summary>
                <div className="mt-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-700 whitespace-pre-line">{currentExercise.exampleResponse}</p>
                </div>
              </details>
            )}

            <button
              onClick={async () => {
                setEvaluating(true);
                try {
                  const response = await fetch('/api/evaluate-writing', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      prompt: currentExercise.prompt,
                      essay: answers[currentExercise.id] || '',
                      writingType: currentExercise.writingType,
                      minWords: currentExercise.minWords,
                      maxWords: currentExercise.maxWords,
                      level: lessonLevel,
                      rubric: currentExercise.rubric
                    })
                  });

                  if (response.ok) {
                    const evaluation = await response.json();
                    setAiEvaluations(prev => ({ ...prev, [currentExercise.id]: evaluation }));
                    setExerciseScores(prev => ({ ...prev, [currentExercise.id]: evaluation.overallScore }));
                  } else {
                    // Fallback - mock score
                    setExerciseScores(prev => ({ ...prev, [currentExercise.id]: 75 }));
                  }
                } catch (error) {
                  console.error('Error evaluating writing:', error);
                  setExerciseScores(prev => ({ ...prev, [currentExercise.id]: 75 }));
                }
                setShowFeedback(true);
                setEvaluating(false);
              }}
              disabled={evaluating}
              className="w-full px-6 py-4 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {evaluating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Evaluating your writing with AI...</span>
                </>
              ) : (
                'Submit Writing for AI Evaluation'
              )}
            </button>

            {showFeedback && aiEvaluations[currentExercise.id] && (
              <EnhancedFeedback
                type="writing"
                evaluation={aiEvaluations[currentExercise.id]}
                userAnswer={answers[currentExercise.id] || ''}
              />
            )}
            {showFeedback && !aiEvaluations[currentExercise.id] && (
              <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
                <p className="text-amber-800 font-semibold mb-2">✓ Writing Submitted!</p>
                <p className="text-slate-700">Your writing has been evaluated. Check the score above.</p>
              </div>
            )}
          </div>
        );

      case 'key-word-transformation':
        return <KeyWordTransformationExercise key={currentExercise.id} exercise={currentExercise as any} onComplete={(score) => {
          setCurrentScore(score);
          setShowFeedback(true);
          setShowCelebration(true);
        }} />;

      case 'word-formation':
        const wfExercise = currentExercise as WordFormationExercise;
        return (
          <div key={wfExercise.id} className="space-y-6">
            {/* Instructions */}
            <div className="bg-peach-50 rounded-xl p-6 border-2 border-peach-200">
              <h3 className="text-xl font-bold text-peach-900 mb-3 flex items-center gap-2">
                <span>📝</span>
                <span>{wfExercise.title}</span>
              </h3>
              <div className="bg-peach-100 p-3 rounded-lg border border-peach-300">
                <p className="text-sm text-peach-900 font-semibold">💡 Instrucciones: Elige la forma correcta de la palabra indicada en mayúsculas para completar cada oración.</p>
              </div>
            </div>

            {/* Text with Gaps */}
            {wfExercise.text && (
              <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                <p className="text-slate-700 whitespace-pre-line leading-relaxed text-lg">
                  {wfExercise.text}
                </p>
              </div>
            )}

            {/* Questions */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900">Completa los huecos:</h4>
              {wfExercise.questions.map((question: any, idx: number) => (
                <div key={question.id} className="bg-white rounded-lg p-5 border-2 border-slate-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-900">
                        Hueco {question.gapNumber}: {question.baseWord}
                      </p>
                      <span className="text-sm text-coral-600">({question.points} {question.points === 1 ? 'point' : 'points'})</span>
                    </div>

                    {/* Hint */}
                    {question.hint && (
                      <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                        <p className="text-sm text-coral-800">
                          <span className="font-semibold">💡 Hint:</span> {question.hint}
                        </p>
                      </div>
                    )}

                    {/* Multiple Choice Options or Text Input */}
                    {question.options && question.options.length > 0 ? (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Elige la respuesta correcta:</label>
                        <div className="space-y-2">
                          {question.options.map((option: string, optIdx: number) => (
                            <label
                              key={optIdx}
                              className={`flex items-center gap-3 p-4 rounded-lg border-2 hover:bg-peach-50 cursor-pointer transition-all ${
                                answers[question.id] === option
                                  ? 'border-peach-500 bg-peach-50'
                                  : 'border-slate-200'
                              }`}
                            >
                              <input
                                type="radio"
                                name={question.id}
                                value={option}
                                checked={answers[question.id] === option}
                                onChange={(e) => handleAnswer(question.id, e.target.value)}
                                className="w-5 h-5 text-peach-600"
                              />
                              <span className="text-slate-900 font-medium">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Escribe tu respuesta:</label>
                        <input
                          type="text"
                          value={answers[question.id] || ''}
                          onChange={(e) => handleAnswer(question.id, e.target.value)}
                          placeholder={`Enter the correct form of "${question.baseWord}"...`}
                          disabled={showFeedback}
                          className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition-all ${
                            showFeedback
                              ? 'bg-gray-50 border-gray-300 cursor-not-allowed'
                              : 'border-slate-200 focus:border-peach-500'
                          }`}
                        />
                      </div>
                    )}

                    {/* Feedback - Enhanced with AI */}
                    {showFeedback && (
                      aiEvaluations[question.id] ? (
                        <EnhancedFeedback
                          type="text"
                          evaluation={aiEvaluations[question.id]}
                          userAnswer={answers[question.id]}
                          correctAnswer={question.correctAnswer}
                        />
                      ) : (
                        <div className={`p-3 rounded-lg ${
                          (answers[question.id]?.toLowerCase().trim() === question.correctAnswer?.toLowerCase().trim()) ||
                          (question.acceptableAnswers && question.acceptableAnswers.some((ans: string) => 
                            answers[question.id]?.toLowerCase().trim() === ans.toLowerCase().trim()
                          ))
                            ? 'bg-amber-50 border-2 border-amber-200'
                            : 'bg-red-50 border-2 border-red-200'
                        }`}>
                          <p className="font-semibold mb-1">
                            {(answers[question.id]?.toLowerCase().trim() === question.correctAnswer?.toLowerCase().trim()) ||
                            (question.acceptableAnswers && question.acceptableAnswers.some((ans: string) => 
                              answers[question.id]?.toLowerCase().trim() === ans.toLowerCase().trim()
                            ))
                              ? '✓ ¡Correcto!'
                              : '✗ Incorrecto'}
                          </p>
                          <p className="text-sm mb-2">
                            <span className="font-semibold">Respuesta correcta:</span>{' '}
                            <span className="text-amber-700 font-bold">{question.correctAnswer}</span>
                            {question.acceptableAnswers && question.acceptableAnswers.length > 1 && (
                              <span className="text-slate-600 text-xs ml-2">
                                (También aceptado: {question.acceptableAnswers.filter((a: string) => a !== question.correctAnswer).join(', ')})
                              </span>
                            )}
                          </p>
                          {question.wordType && (
                            <p className="text-sm text-slate-700 mb-1">
                              <span className="font-semibold">Tipo de palabra:</span> {question.wordType}
                            </p>
                          )}
                          {question.transformation && (
                            <p className="text-sm text-slate-700 mb-2">
                              <span className="font-semibold">Transformación:</span> {question.transformation}
                            </p>
                          )}
                          {question.explanation && (
                            <p className="text-sm text-slate-700">
                              <span className="font-semibold">Explicación:</span> {toSpanishText(question.explanation)}
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Check Answers Button */}
            {!showFeedback && (
              <div className="flex justify-center">
                <button
                  onClick={checkAnswers}
                  disabled={evaluating || Object.keys(answers).length === 0}
                  className="px-8 py-4 bg-peach-600 text-white rounded-xl hover:bg-peach-700 transition-colors font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {evaluating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Evaluating with AI...</span>
                    </>
                  ) : (
                    <>
                      <span>✓</span>
                      <span>Check Answers</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Try Again / Next Button */}
            {showFeedback && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleTryAgain}
                  className="px-8 py-4 bg-slate-200 text-slate-900 rounded-xl hover:bg-slate-300 transition-colors font-bold text-lg flex items-center justify-center gap-2"
                >
                  <span>↻</span>
                  <span>Try Again</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-bold text-lg flex items-center justify-center gap-2"
                >
                  <span>Next Exercise</span>
                  <span>→</span>
                </button>
              </div>
            )}

            {/* Focus Areas */}
            {wfExercise.focusAreas && wfExercise.focusAreas.length > 0 && (
              <div className="bg-peach-50 rounded-xl p-4 border-2 border-peach-200">
                <p className="font-semibold text-peach-900 mb-2">📌 Focus Areas:</p>
                <div className="flex flex-wrap gap-2">
                  {wfExercise.focusAreas.map((area: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-peach-100 text-peach-700 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'gapped-text':
        return <GappedTextExercise key={currentExercise.id} exercise={currentExercise as any} onComplete={(score) => {
          setCurrentScore(score);
          setShowFeedback(true);
          setShowCelebration(true);
        }} />;

      case 'multiple-matching':
        return <MultipleMatchingExercise key={currentExercise.id} exercise={currentExercise as any} onComplete={(score) => {
          setCurrentScore(score);
          setShowFeedback(true);
          setShowCelebration(true);
        }} />;

      case 'multiple-choice-cloze':
        return <MultipleChoiceClozeExercise key={currentExercise.id} exercise={currentExercise as any} onComplete={(score) => {
          setCurrentScore(score);
          setShowFeedback(true);
          setShowCelebration(true);
        }} />;

      case 'sentence-building':
        const sbExercise = currentExercise as SentenceBuildingExercise;
        return (
          <div key={currentExercise.id} className="space-y-6">
            {/* Exercise Description */}
            <div className="bg-coral-50 rounded-xl p-6 border-2 border-coral-200">
              <h3 className="text-xl font-bold text-coral-900 mb-2 flex items-center gap-2">
                <span>🏗️</span>
                <span>{sbExercise.title}</span>
              </h3>
              <p className="text-slate-700 mb-3">{sbExercise.description}</p>
              <div className="bg-coral-100 rounded-lg p-3 border border-coral-300">
                <p className="text-sm text-coral-900 font-semibold">📝 Instructions:</p>
                <p className="text-sm text-coral-800">{sbExercise.instructions}</p>
              </div>
            </div>

            {/* Challenges */}
            {sbExercise.challenges.map((challenge, idx) => (
              <div key={challenge.id}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-coral-600 text-white rounded-full font-bold">
                    {idx + 1} / {sbExercise.challenges.length}
                  </span>
                  <span className="text-sm text-slate-600">
                    Difficulty: <span className="font-semibold capitalize">{challenge.difficulty}</span>
                  </span>
                </div>

                <SentenceBuilder
                  key={challenge.id}
                  challenge={challenge}
                  showHints={sbExercise.showHints}
                  showTranslations={sbExercise.showTranslations}
                  onComplete={(isCorrect, userSentence, score) => {
                    // Update scores
                    const currentScores = exerciseScores[sbExercise.id] || 0;
                    const newScore = ((currentScores * idx) + score) / (idx + 1);
                    setExerciseScores(prev => ({ ...prev, [sbExercise.id]: newScore }));
                  }}
                />

                {idx < sbExercise.challenges.length - 1 && (
                  <hr className="my-8 border-slate-300" />
                )}
              </div>
            ))}
          </div>
        );

      case 'gap-fill-text':
        const gapFillExercise = currentExercise as any;
        return (
          <div key={currentExercise.id} className="space-y-6">
            {/* Instructions */}
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span>📝</span>
                <span>{gapFillExercise.title}</span>
              </h3>
              {gapFillExercise.instructions && (
                <p className="text-slate-700 mt-2">💡 {gapFillExercise.instructions}</p>
              )}
            </div>

            {/* Text with gaps */}
            <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
              <div className="text-lg leading-relaxed text-slate-800 whitespace-pre-line">
                {(gapFillExercise.text || '').split(/(\{\{\d+\}\})/).map((part: string, index: number) => {
                  const gapMatch = part.match(/\{\{(\d+)\}\}/);
                  if (gapMatch) {
                    const gapNum = parseInt(gapMatch[1]);
                    const gap = gapFillExercise.gaps.find((g: any) => g.gapNumber === gapNum);
                    if (!gap) return part;
                    
                    const isAnswered = !!answers[gap.id];
                    const userAnswer = answers[gap.id] || '';
                    const isCorrect = aiEvaluations[gap.id]?.isCorrect;
                    
                    return (
                      <span key={index} className="inline-block mx-1 align-bottom">
                        {gap.options && gap.options.length > 0 ? (
                          <select
                            value={userAnswer}
                            onChange={(e) => handleAnswer(gap.id, e.target.value)}
                            disabled={showFeedback}
                            className={`px-3 py-1 border-2 rounded-lg w-40 text-center font-semibold transition-all ${
                              showFeedback
                                ? isCorrect
                                  ? 'border-green-500 bg-green-50 text-green-900'
                                  : 'border-red-500 bg-red-50 text-red-900'
                                : isAnswered
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-300 hover:border-blue-400'
                            } disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400`}
                          >
                            <option value="">({gapNum})</option>
                            {gap.options.map((option: string, optIdx: number) => (
                              <option key={optIdx} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => handleAnswer(gap.id, e.target.value)}
                            disabled={showFeedback}
                            placeholder={`(${gapNum})`}
                            className={`px-3 py-1 border-2 rounded-lg w-40 text-center font-semibold transition-all ${
                              showFeedback
                                ? isCorrect
                                  ? 'border-green-500 bg-green-50 text-green-900'
                                  : 'border-red-500 bg-red-50 text-red-900'
                                : isAnswered
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-300 hover:border-blue-400'
                            } disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400`}
                          />
                        )}
                        {showFeedback && !isCorrect && (
                          <div className="block mt-1 text-xs text-green-700 font-semibold">
                            ✓ {gap.correctAnswer}
                          </div>
                        )}
                      </span>
                    );
                  }
                  return <span key={index}>{part}</span>;
                })}
              </div>
            </div>

            {/* Show feedback for each gap */}
            {showFeedback && (
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-slate-900">📊 Detailed Feedback:</h4>
                {gapFillExercise.gaps.map((gap: any) => {
                  const userAnswer = answers[gap.id] || '';
                  const evaluation = aiEvaluations[gap.id];
                  const isCorrect = evaluation?.isCorrect;
                  
                  return (
                    <div
                      key={gap.id}
                      className={`rounded-lg p-4 border-2 ${
                        isCorrect
                          ? 'bg-green-50 border-green-300'
                          : 'bg-red-50 border-red-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 mb-1">
                            Gap {gap.gapNumber}
                          </div>
                          <div className="text-sm space-y-1">
                            <div>
                              <span className="text-slate-600">Your answer:</span>{' '}
                              <span className={isCorrect ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                                {userAnswer || '(empty)'}
                              </span>
                            </div>
                            {!isCorrect && (
                              <div>
                                <span className="text-slate-600">Respuesta correcta:</span>{' '}
                                <span className="text-green-700 font-semibold">
                                  {gap.correctAnswer}
                                </span>
                                {gap.acceptableAlternatives && gap.acceptableAlternatives.length > 0 && (
                                  <span className="text-slate-500">
                                    {' '}(Also: {gap.acceptableAlternatives.join(', ')})
                                  </span>
                                )}
                              </div>
                            )}
                            {gap.explanation && (
                              <div className="mt-2 text-slate-700">
                                💡 <span className="italic">{toSpanishText(gap.explanation)}</span>
                              </div>
                            )}
                            {evaluation && evaluation.detailedExplanation && (
                              <div className="mt-2 bg-white/50 rounded p-2 text-slate-700">
                                <strong>Retroalimentación:</strong> {toSpanishText(evaluation.detailedExplanation)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Submit button */}
            {!showFeedback && (
              <button
                onClick={checkAnswers}
                disabled={evaluating || Object.keys(answers).length === 0}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {evaluating ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Evaluating...
                  </>
                ) : (
                  'Check Answers'
                )}
              </button>
            )}
          </div>
        );

      case 'sentence-completion':
        const scExercise = currentExercise as any;
        return (
          <div key={currentExercise.id} className="space-y-6">
            {/* Instructions */}
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-900 mb-2 flex items-center gap-2">
                <span>✏️</span>
                <span>{scExercise.title}</span>
              </h3>
              {scExercise.instructions && (
                <p className="text-slate-700 mt-2">💡 {scExercise.instructions}</p>
              )}
            </div>

            {/* Sentences */}
            <div className="space-y-4">
              {scExercise.sentences.map((sentence: any, idx: number) => {
                const sentenceId = sentence.id;
                const userAnswer = answers[sentenceId] || '';
                const evaluation = aiEvaluations[sentenceId];
                const isCorrect = evaluation?.isCorrect;

                return (
                  <div key={sentenceId} className="bg-white rounded-xl p-6 border-2 border-slate-200">
                    {/* Sentence prompt */}
                    <div className="mb-4">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm flex-shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-lg text-slate-800 flex-1">{sentence.prompt}</p>
                      </div>
                    </div>

                    {/* Multiple choice options */}
                    {sentence.options && sentence.options.length > 0 ? (
                      <div className="space-y-2">
                        {sentence.options.map((option: string, optIdx: number) => {
                          const isSelected = userAnswer === option;
                          const isCorrectOption = option === sentence.correctCompletion;
                          const showAsCorrect = showFeedback && isCorrectOption;
                          const showAsIncorrect = showFeedback && isSelected && !isCorrectOption;

                          return (
                            <button
                              key={optIdx}
                              onClick={() => !showFeedback && handleAnswer(sentenceId, option)}
                              disabled={showFeedback}
                              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                isSelected && !showFeedback
                                  ? 'border-purple-500 bg-purple-50'
                                  : 'border-slate-200 hover:border-purple-300 bg-white'
                              } ${
                                showAsCorrect
                                  ? 'border-green-500 bg-green-50'
                                  : ''
                              } ${
                                showAsIncorrect
                                  ? 'border-red-500 bg-red-50'
                                  : ''
                              } disabled:cursor-not-allowed`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`font-bold ${
                                  showAsCorrect ? 'text-green-600' : showAsIncorrect ? 'text-red-600' : 'text-slate-500'
                                }`}>
                                  {showAsCorrect && '✓'}
                                  {showAsIncorrect && '✗'}
                                  {!showFeedback && `${String.fromCharCode(65 + optIdx)}.`}
                                  {showFeedback && !showAsCorrect && !showAsIncorrect && `${String.fromCharCode(65 + optIdx)}.`}
                                </span>
                                <span className="text-slate-800">{option}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      /* Text input for open completion */
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => handleAnswer(sentenceId, e.target.value)}
                        disabled={showFeedback}
                        placeholder="Type your completion here..."
                        className={`w-full px-4 py-3 border-2 rounded-lg text-lg transition-all ${
                          showFeedback
                            ? isCorrect
                              ? 'border-green-500 bg-green-50 text-green-900'
                              : 'border-red-500 bg-red-50 text-red-900'
                            : userAnswer
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-slate-300 hover:border-purple-400'
                        } disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-400`}
                      />
                    )}

                    {/* Feedback */}
                    {showFeedback && (
                      <div className={`mt-4 p-4 rounded-lg border-2 ${
                        isCorrect
                          ? 'bg-green-50 border-green-300'
                          : 'bg-red-50 border-red-300'
                      }`}>
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
                          <div className="flex-1 space-y-2">
                            <div>
                              <span className="text-sm text-slate-600">Your answer:</span>{' '}
                              <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                {userAnswer || '(empty)'}
                              </span>
                            </div>
                            {!isCorrect && (
                              <div>
                                <span className="text-sm text-slate-600">Respuesta correcta:</span>{' '}
                                <span className="font-semibold text-green-700">
                                  {sentence.correctCompletion}
                                </span>
                              </div>
                            )}
                            {sentence.explanation && (
                              <div className="text-sm text-slate-700 mt-2">
                                💡 <span className="italic">{toSpanishText(sentence.explanation)}</span>
                              </div>
                            )}
                            {evaluation && evaluation.detailedExplanation && (
                              <div className="mt-2 bg-white/50 rounded p-2 text-sm text-slate-700">
                                <strong>Retroalimentación:</strong> {toSpanishText(evaluation.detailedExplanation)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit button */}
            {!showFeedback && (
              <button
                onClick={checkAnswers}
                disabled={evaluating || Object.keys(answers).length === 0}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {evaluating ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Evaluating...
                  </>
                ) : (
                  'Check Answers'
                )}
              </button>
            )}
          </div>
        );

      case 'error-identification':
        const eiExercise = currentExercise as any;
        return (
          <div key={currentExercise.id} className="space-y-6">
            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-900 mb-2 flex items-center gap-2">
                <span>🔍</span>
                <span>{eiExercise.title}</span>
              </h3>
              {eiExercise.instructions && (
                <p className="text-slate-700 mt-2">💡 {eiExercise.instructions}</p>
              )}
            </div>

            <div className="space-y-4">
              {eiExercise.sentences.map((item: any, idx: number) => {
                const userAnswer = answers[item.id] || '';
                const evaluation = aiEvaluations[item.id];
                
                return (
                  <div key={item.id} className="bg-white rounded-xl p-6 border-2 border-slate-200">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white font-bold text-sm flex-shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-lg text-slate-800 flex-1">{item.sentence || item.question}</p>
                    </div>

                    <div className="ml-11 space-y-3">
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={item.id}
                            value="correct"
                            checked={userAnswer === 'correct'}
                            onChange={() => handleAnswer(item.id, 'correct')}
                            disabled={showFeedback}
                            className="w-4 h-4 text-red-600"
                          />
                          <span>✓ Correct</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={item.id}
                            value="error"
                            checked={userAnswer === 'error'}
                            onChange={() => handleAnswer(item.id, 'error')}
                            disabled={showFeedback}
                            className="w-4 h-4 text-red-600"
                          />
                          <span>✗ Has Error</span>
                        </label>
                      </div>

                      {userAnswer === 'error' && (
                        <input
                          type="text"
                          placeholder="What's the error? (optional)"
                          value={answers[`${item.id}-detail`] || ''}
                          onChange={(e) => handleAnswer(`${item.id}-detail`, e.target.value)}
                          disabled={showFeedback}
                          className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-red-500 focus:outline-none"
                        />
                      )}

                      {showFeedback && (
                        <div className={`mt-3 p-4 rounded-lg border-2 ${
                          evaluation?.isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                        }`}>
                          <div className="flex items-start gap-2">
                            <span className="text-2xl">{evaluation?.isCorrect ? '✅' : '❌'}</span>
                            <div className="flex-1 space-y-2">
                              {item.hasError ? (
                                <>
                                  <p className="font-semibold text-red-700">Error: {toSpanishText(item.errorWord)}</p>
                                  {item.correction && (
                                    <p className="text-sm">
                                      <span className="font-semibold">Corrección:</span> {toSpanishText(item.correction)}
                                    </p>
                                  )}
                                  {item.explanation && (
                                    <p className="text-sm text-slate-700">💡 {toSpanishText(item.explanation)}</p>
                                  )}
                                </>
                              ) : (
                                <p className="font-semibold text-green-700">¡Esta oración es correcta!</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {!showFeedback && (
              <button
                onClick={checkAnswers}
                disabled={evaluating || Object.keys(answers).length === 0}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {evaluating ? 'Evaluating...' : 'Check Answers'}
              </button>
            )}
          </div>
        );

      case 'collocation-matching':
        const cmExercise = currentExercise as any;
        return (
          <div key={currentExercise.id} className="space-y-6">
            <div className="bg-indigo-50 rounded-xl p-6 border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <span>🔗</span>
                <span>{cmExercise.title}</span>
              </h3>
              {cmExercise.instructions && (
                <p className="text-slate-700 mt-2">💡 {cmExercise.instructions}</p>
              )}
            </div>

            <div className="space-y-4">
              {cmExercise.pairs.map((pair: any, idx: number) => {
                const userAnswer = answers[pair.id] || '';
                const isCorrect = aiEvaluations[pair.id]?.isCorrect;
                // Use a deterministic shuffle based on pair ID and option text to avoid hydration issues
                const allOptions = [pair.correctMatch, ...(pair.distractors || [])].sort((a, b) => {
                  const hash = (str: string) => {
                    let h = 0;
                    for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
                    return h;
                  };
                  return hash(pair.id + a) - hash(pair.id + b);
                });
                
                return (
                  <div key={pair.id} className="bg-white rounded-xl p-6 border-2 border-slate-200">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-indigo-900 mb-3">{pair.word}</p>
                        
                        <div className="space-y-2">
                          {allOptions.map((option: string) => {
                            const isSelected = userAnswer === option;
                            const isCorrectOption = option === pair.correctMatch;
                            const showAsCorrect = showFeedback && isCorrectOption;
                            const showAsIncorrect = showFeedback && isSelected && !isCorrectOption;
                            const optIdx = allOptions.indexOf(option);
                            
                            return (
                              <button
                                key={`${pair.id}-${option}`}
                                onClick={() => !showFeedback && handleAnswer(pair.id, option)}
                                disabled={showFeedback}
                                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                                  isSelected && !showFeedback
                                    ? 'border-indigo-500 bg-indigo-50'
                                    : 'border-slate-200 hover:border-indigo-300 bg-white'
                                } ${
                                  showAsCorrect ? 'border-green-500 bg-green-50' : ''
                                } ${
                                  showAsIncorrect ? 'border-red-500 bg-red-50' : ''
                                } disabled:cursor-not-allowed`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`font-bold ${
                                    showAsCorrect ? 'text-green-600' : showAsIncorrect ? 'text-red-600' : 'text-slate-500'
                                  }`}>
                                    {showAsCorrect && '✓'}
                                    {showAsIncorrect && '✗'}
                                    {!showFeedback && `${String.fromCharCode(65 + optIdx)}.`}
                                  </span>
                                  <span>{option}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {showFeedback && (
                          <div className={`mt-4 p-3 rounded-lg ${
                            isCorrect ? 'bg-green-50' : 'bg-amber-50'
                          }`}>
                            {!isCorrect && (
                              <p className="text-sm mb-2">
                                <span className="font-semibold">Correct:</span> {pair.word} + {pair.correctMatch}
                              </p>
                            )}
                            {pair.example && (
                              <p className="text-sm text-slate-700">
                                <span className="font-semibold">Example:</span> {pair.example}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!showFeedback && (
              <button
                onClick={checkAnswers}
                disabled={evaluating}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50"
              >
                {evaluating ? 'Evaluating...' : 'Check Answers'}
              </button>
            )}
          </div>
        );

      case 'paraphrasing':
      case 'paraphrase':
        const paraphExercise = currentExercise as any;
        return (
          <div key={currentExercise.id} className="space-y-6">
            <div className="bg-teal-50 rounded-xl p-6 border-2 border-teal-200">
              <h3 className="text-xl font-bold text-teal-900 mb-2 flex items-center gap-2">
                <span>🔄</span>
                <span>{paraphExercise.title}</span>
              </h3>
              {paraphExercise.instructions && (
                <p className="text-slate-700 mt-2">💡 {paraphExercise.instructions}</p>
              )}
            </div>

            <div className="space-y-4">
              {(paraphExercise.items || paraphExercise.sentences || []).map((item: any, idx: number) => {
                const originalSentence = item.originalSentence || item.original;
                const correctParaphrase = item.correctParaphrase || item.paraphrase;
                const userAnswer = answers[item.id || `paraph-${idx}`] || '';
                const evaluation = aiEvaluations[item.id || `paraph-${idx}`];
                const isCorrect = evaluation?.isCorrect;
                
                return (
                  <div key={item.id || `paraph-${idx}`} className="bg-white rounded-xl p-6 border-2 border-slate-200">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-sm flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <div className="mb-3 p-3 bg-slate-50 rounded-lg border-l-4 border-teal-500">
                          <p className="text-sm text-slate-600 font-semibold mb-1">Original:</p>
                          <p className="text-slate-800 italic">&quot;{originalSentence}&quot;</p>
                        </div>
                        
                        <textarea
                          value={userAnswer}
                          onChange={(e) => handleAnswer(item.id || `paraph-${idx}`, e.target.value)}
                          disabled={showFeedback}
                          placeholder="Write your paraphrase here..."
                          rows={3}
                          className={`w-full px-4 py-3 border-2 rounded-lg transition-all ${
                            showFeedback
                              ? isCorrect
                                ? 'border-green-500 bg-green-50'
                                : 'border-amber-500 bg-amber-50'
                              : userAnswer
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-slate-300 hover:border-teal-400'
                          } disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-400`}
                        />

                        {showFeedback && (
                          <div className={`mt-4 p-4 rounded-lg border-2 ${
                            isCorrect ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-300'
                          }`}>
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm text-slate-600 mb-1">Model Answer:</p>
                                <p className="font-semibold text-teal-700">{correctParaphrase}</p>
                              </div>
                              {item.explanation && (
                                <p className="text-sm text-slate-700 mt-2">
                                  💡 {toSpanishText(item.explanation)}
                                </p>
                              )}
                              {evaluation?.detailedExplanation && (
                                <div className="mt-2 bg-white/50 rounded p-2 text-sm text-slate-700">
                                  <strong>Retroalimentación:</strong> {toSpanishText(evaluation.detailedExplanation)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!showFeedback && (
              <button
                onClick={checkAnswers}
                disabled={evaluating}
                className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50"
              >
                {evaluating ? 'Evaluating...' : 'Check Answers'}
              </button>
            )}
          </div>
        );

      case 'sentence-reordering':
      case 'sentence-ordering':
        const srExercise = currentExercise as any;
        return (
          <div key={currentExercise.id} className="space-y-6">
            <div className="bg-pink-50 rounded-xl p-6 border-2 border-pink-200">
              <h3 className="text-xl font-bold text-pink-900 mb-2 flex items-center gap-2">
                <span>🔢</span>
                <span>{srExercise.title}</span>
              </h3>
              {srExercise.instructions && (
                <p className="text-slate-700 mt-2">💡 {srExercise.instructions}</p>
              )}
            </div>

            <div className="space-y-6">
              {(srExercise.items || [{ sentences: srExercise.sentences, correctOrder: srExercise.correctOrder, id: 'single' }]).map((item: any, itemIdx: number) => {
                const sentences = item.shuffledSentences || item.sentences || [];
                const correctOrder = item.correctOrder || Array.from({length: sentences.length}, (_, i) => i);
                const itemId = item.id || `reorder-${itemIdx}`;
                
                return (
                  <div key={itemId} className="bg-white rounded-xl p-6 border-2 border-slate-200">
                    {item.context && (
                      <div className="mb-4 p-3 bg-pink-50 rounded-lg">
                        <p className="text-sm text-slate-700">{item.context}</p>
                      </div>
                    )}

                    <div className="space-y-3">
                      {sentences.map((sentence: any, idx: number) => {
                        const numberId = `${itemId}-${idx}`;
                        const userOrder = answers[numberId] || '';
                        const sentenceText = typeof sentence === 'string' ? sentence : sentence.text;
                        
                        return (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                            <input
                              type="number"
                              min="1"
                              max={sentences.length}
                              value={userOrder}
                              onChange={(e) => handleAnswer(numberId, e.target.value)}
                              disabled={showFeedback}
                              placeholder="#"
                              className={`w-16 px-2 py-1 border-2 rounded text-center font-bold ${
                                showFeedback
                                  ? parseInt(userOrder) === correctOrder[idx] + 1
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-red-500 bg-red-50 text-red-700'
                                  : 'border-pink-300 focus:border-pink-500'
                              } disabled:cursor-not-allowed`}
                            />
                            <p className="flex-1 text-slate-800">{sentenceText}</p>
                            {showFeedback && (
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                parseInt(userOrder) === correctOrder[idx] + 1
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {correctOrder[idx] + 1}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {showFeedback && item.explanation && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-slate-700">💡 {toSpanishText(item.explanation)}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!showFeedback && (
              <button
                onClick={checkAnswers}
                disabled={evaluating}
                className="w-full py-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl hover:from-pink-700 hover:to-pink-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50"
              >
                {evaluating ? 'Evaluating...' : 'Check Answers'}
              </button>
            )}
          </div>
        );

      case 'phrasal-verbs':
        const pvExercise = currentExercise as any;
        
        // Handle nested exercises format (verbs + exercises array)
        if (pvExercise.verbs && pvExercise.exercises) {
          return (
            <div key={currentExercise.id} className="space-y-6">
              <div className="bg-cyan-50 rounded-xl p-6 border-2 border-cyan-200">
                <h3 className="text-xl font-bold text-cyan-900 mb-2 flex items-center gap-2">
                  <span>🚀</span>
                  <span>{pvExercise.title}</span>
                </h3>
                {pvExercise.instructions && (
                  <p className="text-slate-700 mt-2">💡 {pvExercise.instructions}</p>
                )}
              </div>

              {/* Reference section showing all phrasal verbs */}
              <div className="bg-white rounded-xl p-6 border-2 border-cyan-200">
                <h4 className="font-bold text-cyan-900 mb-4">📚 Phrasal Verbs Reference</h4>
                <div className="grid gap-4">
                  {pvExercise.verbs.map((verb: any, idx: number) => (
                    <div key={idx} className="p-4 bg-cyan-50 rounded-lg">
                      <p className="font-bold text-cyan-900 mb-1">{verb.verb}</p>
                      <p className="text-sm text-slate-700 mb-2">{verb.meaning}</p>
                      {verb.examples && verb.examples.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {verb.examples.map((ex: string, exIdx: number) => (
                            <p key={exIdx} className="text-xs italic text-slate-600">• {ex}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice exercises */}
              <div className="space-y-4">
                <h4 className="font-bold text-cyan-900">✏️ Practice Exercises</h4>
                {pvExercise.exercises.map((ex: any, idx: number) => {
                  const userAnswer = answers[ex.id] || '';
                  const isCorrect = userAnswer.toLowerCase().trim() === (ex.correctAnswer || '').toLowerCase().trim();
                  
                  return (
                    <div key={ex.id} className="bg-white rounded-lg p-5 border-2 border-slate-200">
                      <p className="text-slate-900 mb-3">
                        {idx + 1}. {ex.sentence || ex.question}
                      </p>
                      
                      {ex.options ? (
                        <div className="space-y-2">
                          {ex.options.map((opt: string, optIdx: number) => (
                            <label key={optIdx} className="flex items-center gap-3 p-3 rounded-lg border-2 border-slate-200 hover:bg-slate-50 cursor-pointer">
                              <input
                                type="radio"
                                name={ex.id}
                                value={opt}
                                checked={userAnswer === opt}
                                onChange={(e) => handleAnswer(ex.id, e.target.value)}
                                disabled={showFeedback}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => handleAnswer(ex.id, e.target.value)}
                          disabled={showFeedback}
                          placeholder="Type your answer..."
                          className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:border-cyan-500 focus:outline-none disabled:bg-slate-50"
                        />
                      )}
                      
                      {showFeedback && (
                        <div className={`mt-3 p-3 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-amber-50'}`}>
                          {!isCorrect && (
                            <p className="text-sm mb-1">
                              <strong>Correct:</strong> {ex.correctAnswer}
                            </p>
                          )}
                          {ex.explanation && (
                            <p className="text-sm text-slate-700">💡 {toSpanishText(ex.explanation)}</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!showFeedback && (
                <button
                  onClick={checkAnswers}
                  disabled={evaluating}
                  className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl hover:from-cyan-700 hover:to-cyan-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50"
                >
                  {evaluating ? 'Evaluating...' : 'Check Answers'}
                </button>
              )}
            </div>
          );
        }
        
        // Handle standard items format
        return (
          <div key={currentExercise.id} className="space-y-6">
            <div className="bg-cyan-50 rounded-xl p-6 border-2 border-cyan-200">
              <h3 className="text-xl font-bold text-cyan-900 mb-2 flex items-center gap-2">
                <span>🚀</span>
                <span>{pvExercise.title}</span>
              </h3>
              {pvExercise.instructions && (
                <p className="text-slate-700 mt-2">💡 {pvExercise.instructions}</p>
              )}
            </div>

            <div className="space-y-4">
              {(pvExercise.items || []).map((item: any, idx: number) => {
                const userAnswer = answers[item.id] || '';
                const evaluation = aiEvaluations[item.id];
                const hasOptions = item.options && item.options.length > 0;
                
                return (
                  <div key={item.id} className="bg-white rounded-xl p-6 border-2 border-slate-200">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-600 text-white font-bold text-sm flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <div className="mb-3 p-3 bg-cyan-50 rounded-lg">
                          <p className="text-sm text-cyan-800 font-semibold mb-1">
                            Phrasal Verb: <span className="text-cyan-900 text-base">{item.phrasalVerb}</span>
                          </p>
                          <p className="text-sm text-slate-600">Meaning: {item.meaning}</p>
                        </div>

                        <p className="text-lg text-slate-800 mb-3">{item.sentence}</p>

                        {hasOptions ? (
                          <div className="space-y-2">
                            {item.options.map((option: string, optIdx: number) => {
                              const isSelected = userAnswer === option;
                              const isCorrectOption = option === item.correctAnswer;
                              const showAsCorrect = showFeedback && isCorrectOption;
                              const showAsIncorrect = showFeedback && isSelected && !isCorrectOption;
                              
                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => !showFeedback && handleAnswer(item.id, option)}
                                  disabled={showFeedback}
                                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                                    isSelected && !showFeedback
                                      ? 'border-cyan-500 bg-cyan-50'
                                      : 'border-slate-200 hover:border-cyan-300 bg-white'
                                  } ${
                                    showAsCorrect ? 'border-green-500 bg-green-50' : ''
                                  } ${
                                    showAsIncorrect ? 'border-red-500 bg-red-50' : ''
                                  } disabled:cursor-not-allowed`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className={`font-bold ${
                                      showAsCorrect ? 'text-green-600' : showAsIncorrect ? 'text-red-600' : 'text-slate-500'
                                    }`}>
                                      {showAsCorrect && '✓'}
                                      {showAsIncorrect && '✗'}
                                      {!showFeedback && `${String.fromCharCode(65 + optIdx)}.`}
                                    </span>
                                    <span>{option}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => handleAnswer(item.id, e.target.value)}
                            disabled={showFeedback}
                            placeholder="Type your answer..."
                            className={`w-full px-4 py-3 border-2 rounded-lg ${
                              showFeedback
                                ? evaluation?.isCorrect
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-red-500 bg-red-50'
                                : 'border-cyan-300 focus:border-cyan-500'
                            } disabled:cursor-not-allowed`}
                          />
                        )}

                        {showFeedback && (
                          <div className={`mt-4 p-3 rounded-lg ${
                            evaluation?.isCorrect ? 'bg-green-50' : 'bg-amber-50'
                          }`}>
                            {!evaluation?.isCorrect && (
                              <p className="text-sm mb-2">
                                <span className="font-semibold">Correct:</span> {item.correctAnswer}
                              </p>
                            )}
                            {item.explanation && (
                              <p className="text-sm text-slate-700">💡 {toSpanishText(item.explanation)}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!showFeedback && (
              <button
                onClick={checkAnswers}
                disabled={evaluating}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl hover:from-cyan-700 hover:to-cyan-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50"
              >
                {evaluating ? 'Evaluating...' : 'Check Answers'}
              </button>
            )}
          </div>
        );

      case 'idioms-expressions':
        const ieExercise = currentExercise as any;
        
        // Handle nested exercises format (idioms + exercises array)
        if (ieExercise.idioms && ieExercise.exercises) {
          return (
            <div key={currentExercise.id} className="space-y-6">
              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-900 mb-2 flex items-center gap-2">
                  <span>💬</span>
                  <span>{ieExercise.title}</span>
                </h3>
                {ieExercise.instructions && (
                  <p className="text-slate-700 mt-2">💡 {ieExercise.instructions}</p>
                )}
              </div>

              {/* Reference section showing all idioms */}
              <div className="bg-white rounded-xl p-6 border-2 border-yellow-200">
                <h4 className="font-bold text-yellow-900 mb-4">📚 Idioms & Expressions Reference</h4>
                <div className="grid gap-4">
                  {ieExercise.idioms.map((idiom: any, idx: number) => (
                    <div key={idx} className="p-4 bg-yellow-50 rounded-lg">
                      <p className="font-bold text-yellow-900 mb-1">{idiom.expression || idiom.idiom}</p>
                      <p className="text-sm text-slate-700 mb-2">{idiom.meaning}</p>
                      {idiom.examples && idiom.examples.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {idiom.examples.map((ex: string, exIdx: number) => (
                            <p key={exIdx} className="text-xs italic text-slate-600">• {ex}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice exercises */}
              <div className="space-y-4">
                <h4 className="font-bold text-yellow-900">✏️ Practice Exercises</h4>
                {ieExercise.exercises.map((ex: any, idx: number) => {
                  const userAnswer = answers[ex.id] || '';
                  const isCorrect = userAnswer.toLowerCase().trim() === (ex.correctAnswer || '').toLowerCase().trim();
                  
                  return (
                    <div key={ex.id} className="bg-white rounded-lg p-5 border-2 border-slate-200">
                      <p className="text-slate-900 mb-3">
                        {idx + 1}. {ex.sentence || ex.question}
                      </p>
                      
                      {ex.options ? (
                        <div className="space-y-2">
                          {ex.options.map((opt: string, optIdx: number) => (
                            <label key={optIdx} className="flex items-center gap-3 p-3 rounded-lg border-2 border-slate-200 hover:bg-slate-50 cursor-pointer">
                              <input
                                type="radio"
                                name={ex.id}
                                value={opt}
                                checked={userAnswer === opt}
                                onChange={(e) => handleAnswer(ex.id, e.target.value)}
                                disabled={showFeedback}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => handleAnswer(ex.id, e.target.value)}
                          disabled={showFeedback}
                          placeholder="Type your answer..."
                          className="w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 focus:outline-none disabled:bg-slate-50"
                        />
                      )}
                      
                      {showFeedback && (
                        <div className={`mt-3 p-3 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-amber-50'}`}>
                          {!isCorrect && (
                            <p className="text-sm mb-1">
                              <strong>Correct:</strong> {ex.correctAnswer}
                            </p>
                          )}
                          {ex.explanation && (
                            <p className="text-sm text-slate-700">💡 {toSpanishText(ex.explanation)}</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!showFeedback && (
                <button
                  onClick={checkAnswers}
                  disabled={evaluating}
                  className="w-full py-4 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-xl hover:from-yellow-700 hover:to-yellow-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50"
                >
                  {evaluating ? 'Evaluating...' : 'Check Answers'}
                </button>
              )}
            </div>
          );
        }
        
        // Handle standard items format
        return (
          <div key={currentExercise.id} className="space-y-6">
            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-xl font-bold text-yellow-900 mb-2 flex items-center gap-2">
                <span>💬</span>
                <span>{ieExercise.title}</span>
              </h3>
              {ieExercise.instructions && (
                <p className="text-slate-700 mt-2">💡 {ieExercise.instructions}</p>
              )}
            </div>

            <div className="space-y-4">
              {(ieExercise.items || []).map((item: any, idx: number) => {
                const userAnswer = answers[item.id] || '';
                const evaluation = aiEvaluations[item.id];
                const hasOptions = item.options && item.options.length > 0;
                
                return (
                  <div key={item.id} className="bg-white rounded-xl p-6 border-2 border-slate-200">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600 text-white font-bold text-sm flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <div className="mb-3 p-3 bg-yellow-50 rounded-lg">
                          <p className="text-sm text-yellow-800 font-semibold mb-1">
                            Idiom: <span className="text-yellow-900 text-base">&quot;{item.idiom}&quot;</span>
                          </p>
                          <p className="text-sm text-slate-600">Meaning: {item.meaning}</p>
                        </div>

                        <p className="text-lg text-slate-800 mb-3">{item.context}</p>

                        {hasOptions ? (
                          <div className="space-y-2">
                            {item.options.map((option: string, optIdx: number) => {
                              const isSelected = userAnswer === option;
                              const isCorrectOption = option === item.correctUsage;
                              const showAsCorrect = showFeedback && isCorrectOption;
                              const showAsIncorrect = showFeedback && isSelected && !isCorrectOption;
                              
                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => !showFeedback && handleAnswer(item.id, option)}
                                  disabled={showFeedback}
                                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                                    isSelected && !showFeedback
                                      ? 'border-yellow-500 bg-yellow-50'
                                      : 'border-slate-200 hover:border-yellow-300 bg-white'
                                  } ${
                                    showAsCorrect ? 'border-green-500 bg-green-50' : ''
                                  } ${
                                    showAsIncorrect ? 'border-red-500 bg-red-50' : ''
                                  } disabled:cursor-not-allowed`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className={`font-bold ${
                                      showAsCorrect ? 'text-green-600' : showAsIncorrect ? 'text-red-600' : 'text-slate-500'
                                    }`}>
                                      {showAsCorrect && '✓'}
                                      {showAsIncorrect && '✗'}
                                      {!showFeedback && `${String.fromCharCode(65 + optIdx)}.`}
                                    </span>
                                    <span>{option}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => handleAnswer(item.id, e.target.value)}
                            disabled={showFeedback}
                            placeholder="Type your answer..."
                            className={`w-full px-4 py-3 border-2 rounded-lg ${
                              showFeedback
                                ? evaluation?.isCorrect
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-red-500 bg-red-50'
                                : 'border-yellow-300 focus:border-yellow-500'
                            } disabled:cursor-not-allowed`}
                          />
                        )}

                        {showFeedback && (
                          <div className={`mt-4 p-3 rounded-lg ${
                            evaluation?.isCorrect ? 'bg-green-50' : 'bg-amber-50'
                          }`}>
                            {!evaluation?.isCorrect && (
                              <p className="text-sm mb-2">
                                <span className="font-semibold">Correct:</span> {item.correctUsage}
                              </p>
                            )}
                            {item.explanation && (
                              <p className="text-sm text-slate-700">💡 {toSpanishText(item.explanation)}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!showFeedback && (
              <button
                onClick={checkAnswers}
                disabled={evaluating}
                className="w-full py-4 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-xl hover:from-yellow-700 hover:to-yellow-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50"
              >
                {evaluating ? 'Evaluating...' : 'Check Answers'}
              </button>
            )}
          </div>
        );

      case 'gap-fill':
      case 'extended-gap-fill':
      case 'open-cloze':
        const gapExercise = currentExercise as any;
        
        // Handle gap-fill exercises with sentences format (not text-based)
        if (gapExercise.sentences && !gapExercise.text) {
          return (
            <div key={currentExercise.id} className="space-y-6">
              <div className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-200">
                <h3 className="text-xl font-bold text-emerald-900 mb-2 flex items-center gap-2">
                  <span>📋</span>
                  <span>{gapExercise.title}</span>
                </h3>
                {gapExercise.instructions && (
                  <p className="text-slate-700 mt-2">💡 {gapExercise.instructions}</p>
                )}
              </div>

              <div className="space-y-4">
                {gapExercise.sentences.map((item: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-lg p-5 border-2 border-slate-200">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <div className="flex-1 space-y-2">
                        <p className="text-slate-900">{item.sentence}</p>
                        <input
                          type="text"
                          value={answers[`gap-${idx}`] || ''}
                          onChange={(e) => handleAnswer(`gap-${idx}`, e.target.value)}
                          disabled={showFeedback}
                          placeholder="Your answer..."
                          className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none disabled:bg-slate-50"
                        />
                        {showFeedback && (
                          <div className={`p-3 rounded-lg ${
                            (answers[`gap-${idx}`] || '').toLowerCase().trim() === item.correctAnswer.toLowerCase().trim() ||
                            (item.acceptableAnswers && item.acceptableAnswers.some((a: string) => 
                              a.toLowerCase().trim() === (answers[`gap-${idx}`] || '').toLowerCase().trim()
                            ))
                              ? 'bg-green-50 border-2 border-green-200'
                              : 'bg-red-50 border-2 border-red-200'
                          }`}>
                            <p className="font-semibold mb-1">
                              {(answers[`gap-${idx}`] || '').toLowerCase().trim() === item.correctAnswer.toLowerCase().trim() ||
                              (item.acceptableAnswers && item.acceptableAnswers.some((a: string) => 
                                a.toLowerCase().trim() === (answers[`gap-${idx}`] || '').toLowerCase().trim()
                              ))
                                ? '✓ ¡Correcto!'
                                : '✗ Incorrecto'}
                            </p>
                            <p className="text-sm">
                              <strong>Respuesta correcta:</strong> {item.correctAnswer}
                              {item.acceptableAnswers && item.acceptableAnswers.length > 0 && (
                                <span> (also acceptable: {item.acceptableAnswers.join(', ')})</span>
                              )}
                            </p>
                            {item.explanation && (
                              <p className="text-sm mt-1 text-slate-700">💡 {toSpanishText(item.explanation)}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!showFeedback && (
                <button
                  onClick={checkAnswers}
                  disabled={evaluating}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50"
                >
                  {evaluating ? 'Evaluating...' : 'Check Answers'}
                </button>
              )}
            </div>
          );
        }
        
        // Handle text-based gap-fill exercises (open-cloze format)
        return (
          <div key={currentExercise.id} className="space-y-6" data-testid="open-cloze-exercise">
            <div className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-200" data-testid="exercise-header">
              <h3 className="text-xl font-bold text-emerald-900 mb-2 flex items-center gap-2" data-testid="exercise-title">
                <span>📋</span>
                <span>{gapExercise.title}</span>
              </h3>
              {gapExercise.instructions && (
                <p className="text-slate-700 mt-2">💡 {gapExercise.instructions}</p>
              )}
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
              <div className="text-lg leading-relaxed text-slate-800 whitespace-pre-wrap">
                {(gapExercise.text || '').split(/(\[\d+\]|\(\d+\)___+|___+)/).map((part: string, index: number) => {
                  // Support both [1], [2] and (1)___ patterns
                  const gapMatch = part.match(/\[(\d+)\]/) || part.match(/\((\d+)\)___+/);
                  if (gapMatch) {
                    const gapNum = parseInt(gapMatch[1]);
                    const gap = gapExercise.gaps?.find((g: any) => (g.number === gapNum || g.id === gapNum || g.id === `gap${gapNum}`));
                    const gapId = gap ? `gap-${gapNum}` : `gap-${gapNum}`;
                    const userAnswer = answers[gapId] || '';
                    const correctAnswer = gap?.correctAnswer || '';
                    const acceptableAnswers = gap?.acceptableAnswers || [];
                    
                    // Check if answer is correct
                    const isCorrect = showFeedback && (
                      userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim() ||
                      acceptableAnswers.some((a: string) => a.toLowerCase().trim() === userAnswer.toLowerCase().trim())
                    );
                    
                    return (
                      <span key={index} className="inline-block mx-1 align-bottom">
                        <span className="text-sm text-slate-500 mr-1">[{gapNum}]</span>
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => handleAnswer(gapId, e.target.value)}
                          disabled={showFeedback}
                          placeholder="..."
                          className={`px-3 py-1 border-2 rounded-lg w-32 text-center font-semibold transition-all ${
                            showFeedback
                              ? isCorrect
                                ? 'border-green-500 bg-green-50 text-green-900'
                                : 'border-red-500 bg-red-50 text-red-900'
                              : userAnswer
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-slate-300 hover:border-emerald-400'
                          } disabled:cursor-not-allowed`}
                        />
                      </span>
                    );
                  }
                  return <span key={index}>{part}</span>;
                })}
              </div>

              {showFeedback && gapExercise.gaps && (
                <div className="mt-6 space-y-3">
                  {gapExercise.gaps.map((gap: any, idx: number) => {
                    const gapNum = gap.number || (idx + 1);
                    const gapId = `gap-${gapNum}`;
                    const userAnswer = answers[gapId] || '';
                    const correctAnswer = gap.correctAnswer || '';
                    const acceptableAnswers = gap.acceptableAnswers || [];
                    const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim() ||
                      acceptableAnswers.some((a: string) => a.toLowerCase().trim() === userAnswer.toLowerCase().trim());
                    
                    return (
                      <div key={gapId} className={`p-3 rounded-lg border ${
                        isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                      }`}>
                        <p className="font-semibold mb-1">
                          <span className="text-slate-600">Gap {gapNum}:</span>{' '}
                          {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                        </p>
                        <p className="text-sm">
                          <strong>Your answer:</strong> {userAnswer || '(no answer)'}
                        </p>
                        <p className="text-sm">
                          <strong>Respuesta correcta:</strong> {correctAnswer}
                          {acceptableAnswers.length > 0 && (
                            <span className="text-slate-600"> (also: {acceptableAnswers.join(', ')})</span>
                          )}
                        </p>
                        {gap.explanation && (
                          <p className="text-sm mt-1 text-slate-700">
                            💡 <strong>Explicación:</strong> {toSpanishText(gap.explanation)}
                          </p>
                        )}
                        {gap.category && (
                          <p className="text-xs mt-1 text-slate-500">
                            Category: {gap.category}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {!showFeedback && (
              <button
                onClick={checkAnswers}
                disabled={evaluating}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50"
              >
                {evaluating ? 'Evaluating...' : 'Check Answers'}
              </button>
            )}
          </div>
        );


      case 'summary-writing':
        const swExercise = currentExercise as any;
        const wordCount = (answers[swExercise.id] || '').trim().split(/\s+/).filter(w => w.length > 0).length;
        const targetMin = swExercise.minWords || swExercise.summaryTargetRange?.min || swExercise.summaryTargetWords - 10;
        const targetMax = swExercise.maxWords || swExercise.summaryTargetRange?.max || swExercise.summaryTargetWords + 10;
        const isWithinRange = wordCount >= targetMin && wordCount <= targetMax;
        
        return (
          <div key={currentExercise.id} className="space-y-6">
            <div className="bg-violet-50 rounded-xl p-6 border-2 border-violet-200">
              <h3 className="text-xl font-bold text-violet-900 mb-2 flex items-center gap-2">
                <span>✍️</span>
                <span>{swExercise.title}</span>
              </h3>
              {swExercise.instructions && (
                <p className="text-slate-700 mt-2">💡 {swExercise.instructions}</p>
              )}
              <div className="mt-3 flex gap-4 text-sm">
                <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full">
                  Target: {swExercise.summaryTargetWords || swExercise.targetWordCount} words
                </span>
                <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full">
                  Range: {targetMin}-{targetMax} words
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3">Source Text:</h4>
              <div className="p-4 bg-slate-50 rounded-lg max-h-96 overflow-y-auto">
                <p className="text-slate-700 whitespace-pre-line">{swExercise.originalText || swExercise.sourceText}</p>
              </div>
            </div>

            {swExercise.keyPoints && (
              <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
                <p className="font-semibold text-violet-900 mb-2">Key Points to Include:</p>
                <ul className="space-y-1">
                  {swExercise.keyPoints.map((point: string, idx: number) => (
                    <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-violet-600">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-slate-900">Your Summary:</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  isWithinRange
                    ? 'bg-green-100 text-green-700'
                    : wordCount < targetMin
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {wordCount} / {swExercise.summaryTargetWords || swExercise.targetWordCount} words
                </span>
              </div>
              
              <textarea
                value={answers[swExercise.id] || ''}
                onChange={(e) => handleAnswer(swExercise.id, e.target.value)}
                disabled={showFeedback}
                placeholder="Write your summary here..."
                rows={8}
                className={`w-full px-4 py-3 border-2 rounded-lg resize-none ${
                  showFeedback
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-slate-300 focus:border-violet-500'
                } focus:outline-none disabled:cursor-not-allowed`}
              />

              {showFeedback && aiEvaluations[swExercise.id] && (
                <div className="mt-4 p-4 rounded-lg bg-violet-50 border border-violet-200">
                  <p className="font-semibold text-violet-900 mb-2">
                    Score: {aiEvaluations[swExercise.id].score}/100
                  </p>
                  {aiEvaluations[swExercise.id].detailedExplanation && (
                    <p className="text-sm text-slate-700">
                      {aiEvaluations[swExercise.id].detailedExplanation}
                    </p>
                  )}
                </div>
              )}
            </div>

            {!showFeedback && (
              <button
                onClick={checkAnswers}
                disabled={evaluating || !isWithinRange}
                className="w-full py-4 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-xl hover:from-violet-700 hover:to-violet-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50"
              >
                {evaluating ? 'Evaluating...' : 'Submit Summary'}
              </button>
            )}
          </div>
        );

      case 'key-word-transformations':
        const kwtExercise = currentExercise as any;
        return (
          <div key={currentExercise.id} className="space-y-6">
            <div className="bg-rose-50 rounded-xl p-6 border-2 border-rose-200">
              <h3 className="text-xl font-bold text-rose-900 mb-2 flex items-center gap-2">
                <span>🔑</span>
                <span>{kwtExercise.title}</span>
              </h3>
              {kwtExercise.instructions && (
                <p className="text-slate-700 mt-2">💡 {kwtExercise.instructions}</p>
              )}
            </div>

            <div className="space-y-4">
              {kwtExercise.transformations.map((t: any, idx: number) => {
                const userAnswer = answers[t.id] || '';
                const evaluation = aiEvaluations[t.id];
                
                return (
                  <div key={t.id} className="bg-white rounded-xl p-6 border-2 border-slate-200">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-600 text-white font-bold text-sm flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1 space-y-3">
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-slate-800">{t.sentence}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <p className="text-slate-600">{t.startOfAnswer}</p>
                          <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded font-bold text-sm">
                            {t.keyWord}
                          </span>
                        </div>

                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => handleAnswer(t.id, e.target.value)}
                          disabled={showFeedback}
                          placeholder="Complete the transformation..."
                          className={`w-full px-4 py-3 border-2 rounded-lg ${
                            showFeedback
                              ? evaluation?.isCorrect
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                              : 'border-rose-300 focus:border-rose-500'
                          } disabled:cursor-not-allowed`}
                        />

                        {showFeedback && (
                          <div className={`p-3 rounded-lg ${
                            evaluation?.isCorrect ? 'bg-green-50' : 'bg-amber-50'
                          }`}>
                            {!evaluation?.isCorrect && (
                              <p className="text-sm mb-2">
                                <span className="font-semibold">Correct:</span> {t.correctAnswer}
                              </p>
                            )}
                            {t.explanation && (
                              <p className="text-sm text-slate-700">💡 {toSpanishText(t.explanation)}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!showFeedback && (
              <button
                onClick={checkAnswers}
                disabled={evaluating}
                className="w-full py-4 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-xl hover:from-rose-700 hover:to-rose-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50"
              >
                {evaluating ? 'Evaluating...' : 'Check Answers'}
              </button>
            )}
          </div>
        );

      case 'pronunciation-practice':
        const ppExercise = currentExercise as any;
        return (
          <div key={currentExercise.id} className="space-y-6">
            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-xl font-bold text-orange-900 mb-2 flex items-center gap-2">
                <span>🗣️</span>
                <span>{ppExercise.title}</span>
              </h3>
              {ppExercise.instructions && (
                <p className="text-slate-700 mt-2">💡 {ppExercise.instructions}</p>
              )}
              {ppExercise.focusPoints && (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-orange-800 mb-2">Focus Points:</p>
                  <div className="flex flex-wrap gap-2">
                    {ppExercise.focusPoints.map((point: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {ppExercise.targetSentences.map((item: any, idx: number) => (
                <div key={idx} className="bg-white rounded-xl p-6 border-2 border-slate-200">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-600 text-white font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex-1 space-y-3">
                      <p className="text-lg font-semibold text-slate-900">{item.sentence}</p>
                      {item.translation && (
                        <p className="text-sm text-slate-600 italic">{item.translation}</p>
                      )}
                      {item.phonetic && (
                        <p className="text-sm text-orange-700 font-mono">/{item.phonetic}/</p>
                      )}
                      {item.audioUrl && (
                        <audio 
                          controls 
                          className="w-full mt-2"
                          preload="metadata"
                          controlsList="nodownload"
                        >
                          <source src={item.audioUrl} type="audio/mpeg" />
                        </audio>
                      )}
                      <div className="pt-2">
                        <EnhancedVoiceRecorder
                          key={`${currentExercise.id}-pron-sent-${idx}`}
                          exerciseId={`${currentExercise.id}-pron-sent-${idx}`}
                          prompt="Read the sentence aloud to practice your pronunciation."
                          targetText={item.sentence}
                          onComplete={(blob, transcript) => {
                            setRecordedAudio({ blob, transcript });
                            handleAnswer(`pronunciation-${idx}`, transcript);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'integrated-reading-writing':
        const irwExercise = currentExercise as any;
        return (
          <div key={currentExercise.id} className="space-y-6">
            <div className="bg-fuchsia-50 rounded-xl p-6 border-2 border-fuchsia-200">
              <h3 className="text-xl font-bold text-fuchsia-900 mb-2 flex items-center gap-2">
                <span>📖✍️</span>
                <span>{irwExercise.title}</span>
              </h3>
              <div className="flex gap-3 text-sm mt-2">
                <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full">
                  {irwExercise.wordCount} words
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3">Reading Text:</h4>
              <div className="prose max-w-none">
                <div className="text-slate-700 whitespace-pre-line">{irwExercise.readingText}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-900">Questions:</h4>
              {irwExercise.questions.map((q: any, idx: number) => {
                const userAnswer = answers[q.id] || '';
                const evaluation = aiEvaluations[q.id];
                
                return (
                  <div key={q.id} className="bg-white rounded-xl p-6 border-2 border-slate-200">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-fuchsia-600 text-white font-bold text-sm flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-lg text-slate-800 mb-3">{q.question}</p>

                        {q.type === 'multiple-choice' && q.options ? (
                          <div className="space-y-2">
                            {q.options.map((option: string, optIdx: number) => {
                              const isSelected = userAnswer === option;
                              const isCorrectOption = option === q.correctAnswer;
                              const showAsCorrect = showFeedback && isCorrectOption;
                              const showAsIncorrect = showFeedback && isSelected && !isCorrectOption;
                              
                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => !showFeedback && handleAnswer(q.id, option)}
                                  disabled={showFeedback}
                                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                                    isSelected && !showFeedback
                                      ? 'border-fuchsia-500 bg-fuchsia-50'
                                      : 'border-slate-200 hover:border-fuchsia-300 bg-white'
                                  } ${
                                    showAsCorrect ? 'border-green-500 bg-green-50' : ''
                                  } ${
                                    showAsIncorrect ? 'border-red-500 bg-red-50' : ''
                                  } disabled:cursor-not-allowed`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className={`font-bold ${
                                      showAsCorrect ? 'text-green-600' : showAsIncorrect ? 'text-red-600' : 'text-slate-500'
                                    }`}>
                                      {showAsCorrect && '✓'}
                                      {showAsIncorrect && '✗'}
                                      {!showFeedback && `${String.fromCharCode(65 + optIdx)}.`}
                                    </span>
                                    <span>{option}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <textarea
                            value={userAnswer}
                            onChange={(e) => handleAnswer(q.id, e.target.value)}
                            disabled={showFeedback}
                            placeholder="Type your answer..."
                            rows={4}
                            className={`w-full px-4 py-3 border-2 rounded-lg ${
                              showFeedback
                                ? evaluation?.isCorrect
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-amber-500 bg-amber-50'
                                : 'border-fuchsia-300 focus:border-fuchsia-500'
                            } disabled:cursor-not-allowed`}
                          />
                        )}

                        {showFeedback && q.explanation && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-slate-700">💡 {toSpanishText(q.explanation)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!showFeedback && (
              <button
                onClick={checkAnswers}
                disabled={evaluating}
                className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white rounded-xl hover:from-fuchsia-700 hover:to-fuchsia-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50"
              >
                {evaluating ? 'Evaluating...' : 'Submit Answers'}
              </button>
            )}
          </div>
        );

      case 'matching':
      case 'vocabulary-match':
      case 'collocation-matching':
      case 'idioms-expressions':
        return (
          <MatchingRenderer
            key={currentExercise.id}
            exercise={currentExercise}
            answers={answers}
            onAnswer={handleAnswer}
            showFeedback={showFeedback}
            aiEvaluations={aiEvaluations}
            onCheck={checkAnswers}
            evaluating={evaluating}
          />
        );

      default:
        return <p>Unknown exercise type</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950/20 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Gamification Widgets and Animations */}
        {showXPGain && <XPGainAnimation amount={xpGained} />}
        
        {newBadges.map((badge) => (
          <BadgeNotification
            key={badge.badge_id}
            badge={badge}
            onClose={() => setNewBadges(prev => prev.filter(b => b.badge_id !== badge.badge_id))}
          />
        ))}

        {/* Streak Burst Overlay */}
        {showStreakBurst !== null && (
          <StreakBurst
            consecutiveCount={showStreakBurst}
            onComplete={() => setShowStreakBurst(null)}
          />
        )}

        {/* Gamification Widget */}
        {!gamification.isLoading && (
          <div className="mb-6">
            <GamificationWidget variant="compact" />
          </div>
        )}

        {/* Repair Mode Banner */}
        {failCount >= 2 && (
          <RepairModeBanner remainingCount={lesson.exercises.length - currentExerciseIndex} />
        )}

        {/* Enhanced Header with Visual Stats */}
        <div className="bg-gradient-to-br from-white to-orange-50 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl shadow-2xl p-8 mb-6 border-2 border-orange-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">{lesson.title}</h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">{lesson.description}</p>
            </div>
          </div>

          {/* Visual Statistics Row */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            
            <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl p-4 border-2 border-amber-300 shadow-md">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🎯</div>
                <div>
                  <div className="text-2xl font-black text-amber-900">{Math.round(progress)}%</div>
                  <div className="text-xs font-semibold text-amber-700">Progress</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-100 to-red-50 rounded-xl p-4 border-2 border-red-300 shadow-md">
              <div className="flex items-center gap-3">
                <div className="text-3xl">⭐</div>
                <div>
                  <div className="text-2xl font-black text-red-900">
                    {Object.keys(exerciseScores).length > 0 
                      ? Math.round(Object.values(exerciseScores).reduce((sum, score) => sum + score, 0) / Object.keys(exerciseScores).length)
                      : 0}%
                  </div>
                  <div className="text-xs font-semibold text-red-700">Avg Score</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-black text-slate-800 text-base">
                Current Progress
              </span>
              <span className="text-slate-600 font-bold">{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-4 shadow-inner overflow-hidden">
              <div
                className={`${failCount >= 2 ? 'bg-amber-500' : 'bg-gradient-to-r from-orange-500 via-amber-500 to-red-500'} h-4 rounded-full transition-all duration-500 shadow-lg relative`}
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          {lesson.objectives && lesson.objectives.length > 0 && (
            <details className="mt-4">
              <summary className="cursor-pointer font-semibold text-coral-700 hover:text-coral-800">
                🎯 Learning Objectives
              </summary>
              <ul className="mt-2 space-y-1">
                {lesson.objectives.map((objective, idx) => (
                  <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">✓</span>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>

        {/* Navigation Tabs - Hidden for Travel course for a more fluid experience */}
        {!lesson.id.startsWith('travel-') && (
          <div className="flex border-b-2 border-slate-200 dark:border-slate-800 mb-6 bg-white dark:bg-slate-900 rounded-t-2xl px-4 transition-colors">
            <button
              onClick={() => setActiveTab('theory')}
              className={`px-6 py-4 font-bold text-lg transition-all border-b-4 -mb-0.5 ${
                activeTab === 'theory' 
                  ? 'border-orange-500 text-orange-600 dark:text-orange-500' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              📚 Teoría
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-6 py-4 font-bold text-lg transition-all border-b-4 -mb-0.5 ${
                activeTab === 'practice' 
                  ? 'border-orange-500 text-orange-600 dark:text-orange-500' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              ✍️ Práctica
            </button>
          </div>
        )}

        {activeTab === 'theory' ? (
          <div className="animate-fadeIn space-y-6">
            {lesson.videoUrl && (!lesson.theorySlides || lesson.theorySlides.length === 0) && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-slate-200">
                <div className="aspect-video bg-black">
                  {lesson.videoUrl.includes('youtube.com') || lesson.videoUrl.includes('youtu.be') ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={lesson.videoUrl?.replace('watch?v=', 'embed/')}
                      title={lesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      width="100%"
                      height="100%"
                      controls
                      className="w-full h-full"
                      poster={lesson.theorySlides?.[0]?.imageUrl}
                    >
                      <source src={lesson.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-200">
                  <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <span>📹</span> Video Lección: {lesson.title}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 border-2 border-slate-200 dark:border-slate-700 transition-colors">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Contenido de la Lección</h2>
              
              {processedSlides && processedSlides.length > 0 ? (
                <div className="mb-12">
                  <TheorySlideViewer 
                    slides={processedSlides} 
                    onComplete={() => setActiveTab('practice')} 
                    lessonTitle={lesson.title}
                  />
                </div>
              ) : lesson.theoryContent ? (
                <div className="text-slate-800 dark:text-slate-200">
                  <Markdown content={lesson.theoryContent} />
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-bold text-slate-800">Esta lección es eminentemente práctica</h3>
                  <p className="text-slate-600 mt-2">Haz clic en la pestaña de &quot;Práctica&quot; para comenzar los ejercicios.</p>
                </div>
              )}

              {lesson.objectives && lesson.objectives.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-orange-500">🎯</span> Objetivos de Aprendizaje
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {lesson.objectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-3 bg-orange-50/50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-900/30">
                        <span className="text-green-500 font-bold mt-0.5">✓</span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Studies Display */}
              {lesson.caseStudies && lesson.caseStudies.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-3xl">🏢</span> Case Studies
                  </h3>
                  <div className="space-y-8">
                    {lesson.caseStudies.map((cs: CaseStudy, idx: number) => (
                      <div key={idx} className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 rounded-2xl p-6 border-2 border-indigo-100 dark:border-indigo-900/30 shadow-sm">
                        <h4 className="text-xl font-bold text-indigo-900 dark:text-indigo-400 mb-4 flex items-center gap-2">
                          <span className="bg-indigo-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">{idx + 1}</span>
                          {cs.title}
                        </h4>
                        
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 mb-4">
                          <p className="text-slate-700 dark:text-slate-300 italic">&quot;{cs.scenario}&quot;</p>
                        </div>
                        
                        {cs.objectives && (
                          <div className="space-y-2">
                            <p className="text-sm font-bold text-indigo-800 dark:text-indigo-400 uppercase tracking-wider">Misión:</p>
                            <ul className="space-y-1">
                              {cs.objectives.map((obj: string, i: number) => (
                                <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                  <span className="text-indigo-500">•</span>
                                  {obj}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setActiveTab('practice')}
                  className="px-10 py-5 bg-gradient-to-r from-orange-600 to-coral-600 text-white rounded-2xl hover:from-orange-700 hover:to-coral-700 transition-all font-black text-xl shadow-xl transform hover:-translate-y-1 flex items-center gap-3"
                >
                  ¡Empezar Práctica!
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn space-y-6">
            {lesson.id.startsWith('travel-') && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-orange-500 to-amber-600 p-8 rounded-3xl text-white shadow-xl mb-6 flex items-center justify-between"
              >
                <div>
                  <h2 className="text-3xl font-black mb-2">¡Hora de practicar!</h2>
                  <p className="text-orange-50 font-medium text-lg">Pon a prueba lo que has aprendido en la teoría.</p>
                </div>
                <div className="hidden md:block text-6xl opacity-20">✍️</div>
              </motion.div>
            )}
            {currentExercise ? (
              <>
                {/* Exercise Content */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 mb-6 border-2 border-slate-200 dark:border-slate-700 transition-colors">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Ejercicio {currentExerciseIndex + 1}: {currentExercise.type.charAt(0).toUpperCase() + currentExercise.type.slice(1)}
                    </h2>
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-coral-700 dark:text-coral-400 rounded-full text-sm font-semibold">
                      {currentExercise.type}
                    </span>
                  </div>

                  <div className="text-slate-800 dark:text-slate-200">
                    {renderExercise()}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between gap-4">
                  <button
                    onClick={previousExercise}
                    disabled={currentExerciseIndex === 0}
                    className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Anterior
                  </button>

                  <div className="flex gap-3">
                    {/* Skip button (always visible) */}
                    {!showFeedback && !recordedAudio && currentExercise.type !== 'writing' && (
                      <button
                        onClick={nextExercise}
                        className="px-6 py-3 bg-slate-300 text-slate-700 rounded-xl hover:bg-slate-400 transition-colors font-bold"
                      >
                        Saltar Ejercicio →
                      </button>
                    )}
                    
                    {/* Next button (after completing exercise) */}
                    {(showFeedback || recordedAudio || currentExercise.type === 'writing') && (
                      <button
                        onClick={nextExercise}
                        className="px-6 py-3 bg-gradient-to-r from-coral-600 to-peach-600 text-white rounded-xl hover:from-coral-700 hover:to-peach-700 transition-all font-bold shadow-lg"
                      >
                        {currentExerciseIndex === lesson.exercises.length - 1 ? 'Finalizar Lección' : 'Siguiente Ejercicio →'}
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg border-2 border-slate-200">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-slate-800">Esta lección solo contiene teoría</h3>
                <p className="text-slate-600 mt-2 mb-6">Revisa el contenido en la pestaña de &quot;Teoría&quot;.</p>
                <button
                  onClick={() => setActiveTab('theory')}
                  className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
                >
                  Volver a Teoría
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Celebration Modal */}
      <CelebrationModal 
        show={showCelebration} 
        score={currentScore} 
        onClose={() => setShowCelebration(false)}
        language={lessonLevel.toLowerCase().startsWith('a') ? 'es' : 'en'}
      />
    </div>
  );
}
