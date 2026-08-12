'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Video, Mic, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import PilotVideoPlayer from './PilotVideoPlayer';
import PilotSpeakingExercise from './PilotSpeakingExercise';

interface PilotLessonPlayerProps {
  unit: any;
  userId: string;
  initialProgress?: any;
}

export default function PilotLessonPlayer({ unit, userId, initialProgress }: PilotLessonPlayerProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>(initialProgress?.completed_lessons || []);
  const [lessonScores, setLessonScores] = useState<Record<string, number>>(initialProgress?.scores || {});
  const [showCompletion, setShowCompletion] = useState(false);
  const [canContinue, setCanContinue] = useState(true);

  const currentLesson = unit.lessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === unit.lessons.length - 1;

  // Reset canContinue when lesson changes, unless it's vocab/video which are always continuable for now
  useEffect(() => {
    const hasSpeaking = currentLesson.segments.some((s: any) => s.type === 'speaking');
    setCanContinue(!hasSpeaking);
  }, [currentLessonIndex]);

  const handleNext = async () => {
    // Save completion of current lesson
    const newCompleted = [...new Set([...completedLessons, currentLesson.lessonId])];
    setCompletedLessons(newCompleted);

    if (userId !== 'guest-user') {
      /* progress local-only */;
    }

    if (isLastLesson) {
      setShowCompletion(true);
    } else {
      setCurrentLessonIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
    }
  };

  const handleSpeakingSuccess = (score: number) => {
    setLessonScores(prev => ({ ...prev, [currentLesson.lessonId]: score }));
    setCanContinue(true);
  };

  const renderSegment = (segment: any) => {
    switch (segment.type) {
      case 'vocabulary':
        return (
          <div className="grid md:grid-cols-2 gap-4">
            {segment.items.map((item: any, idx: number) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between group hover:border-orange-500 transition-all">
                <div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white capitalize">{item.word}</h4>
                  <p className="text-slate-500 dark:text-slate-400 italic">{item.translation}</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'video':
        return (
          <PilotVideoPlayer
            streamVideoId={segment.streamVideoId}
            interactions={segment.interactions}
          />
        );
      case 'speaking':
        return (
          <PilotSpeakingExercise
            prompt={segment.prompt}
            referenceText={segment.referenceText}
            maxAttempts={segment.maxAttempts}
            onSuccess={handleSpeakingSuccess}
          />
        );
      default:
        return null;
    }
  };

  if (showCompletion) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in duration-500">
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8 shadow-xl">
          <CheckCircle2 className="w-20 h-20" />
        </div>
        <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-4">¡Unidad completada!</h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-lg">
          Has completado la unidad "{unit.title}". Estás listo para tu viaje.
        </p>
        <button 
          onClick={() => window.location.href = '/mi-panel'}
          className="px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 transition-all"
        >
          Volver al panel
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header / Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">{currentLesson.title}</h2>
          <span className="text-sm font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
            Lesson {currentLessonIndex + 1} of {unit.lessons.length}
          </span>
        </div>
        <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentLessonIndex + 1) / unit.lessons.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLesson.lessonId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentLesson.segments.map((segment: any, idx: number) => (
              <div key={idx}>{renderSegment(segment)}</div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleBack}
          disabled={currentLessonIndex === 0}
          className="flex items-center gap-2 px-8 py-4 text-slate-600 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Anterior
        </button>

        <button
          onClick={handleNext}
          disabled={!canContinue}
          className="group relative flex items-center gap-3 px-12 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastLesson ? 'Complete Mission' : 'Continue Mission'}
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
