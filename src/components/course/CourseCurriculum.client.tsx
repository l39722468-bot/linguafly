"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Target, Clock, Trophy, List, Map } from "lucide-react";
import { Module } from "@/lib/exercise-types";
import { premiumCourseService } from "@/lib/services/premium-course-service";
import NextActionCard from "@/components/course/NextActionCard";
import StreakRiskBanner from "@/components/gamification/StreakRiskBanner";
import CourseWelcomeScreen from "@/components/course/CourseWelcomeScreen";
import CourseRoadmap from "@/components/course/CourseRoadmap";

interface CourseCurriculumProps {
  goal: string;
  level: string;
  modules: Module[];
  userId: string;
}

export default function CourseCurriculum({
  goal,
  level,
  modules,
  userId
}: CourseCurriculumProps) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [streakDays, setStreakDays] = useState(0);
  const [showStreakRisk, setShowStreakRisk] = useState(false);
  const [srsReviewCount, setSrsReviewCount] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  useEffect(() => {
    async function loadProgress() {
      if (!userId || userId === 'anonymous') {
        setLoading(false);
        return;
      }

      const [progress] = await Promise.all([
        premiumCourseService.getProgress(userId, level as any),
      ]);
      setCompletedIds(progress);

      const allInteractionIds = modules.flatMap(m =>
        m.lessons.flatMap(l => (l.exercises || []).map(ex => ex.id))
      );
      if (allInteractionIds.length > 0) {
        const srsData = await premiumCourseService.getSRSPerformance(userId, allInteractionIds);
        const now = new Date();
        const reviewCount = srsData.filter(item => new Date(item.next_review_at) <= now).length;
        setSrsReviewCount(reviewCount);
      }

      setLoading(false);
    }
    loadProgress();

    if (typeof window !== 'undefined') {
      const welcomeKey = `course_welcome_${level}_shown`;
      if (!localStorage.getItem(welcomeKey)) {
        setShowWelcome(true);
      }
    }
  }, [userId, level, modules]);

  const completedSet = new Set(completedIds);

  // Stats calculation
  const totalExercises = modules.reduce((acc, m) => 
    acc + m.lessons.reduce((lAcc, l) => lAcc + (l.exercises?.length || 0), 0), 0
  );
  
  const completedExercises = modules.reduce((acc, m) => 
    acc + m.lessons.reduce((lAcc, l) => {
      const lessonExercises = l.exercises || [];
      const completedInLesson = lessonExercises.filter(ex => completedSet.has(ex.id)).length;
      return lAcc + completedInLesson;
    }, 0), 0
  );

  const progressPercentage = totalExercises > 0 
    ? Math.round((completedExercises / totalExercises) * 100) 
    : 0;

  const allLessons = modules.flatMap(m => m.lessons);
  const firstLesson = allLessons[0] ?? null;
  const nextLessonHref = firstLesson ? `/practice/${firstLesson.id}` : '/practica';
  const lessonsCount = allLessons.length;

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-600"></div>
      </div>
    );
  }

  return (
    <div>
      {showWelcome && firstLesson && (
        <CourseWelcomeScreen
          courseId={level}
          userId={userId}
          modulesCount={modules.length}
          lessonsCount={lessonsCount}
          firstLessonId={firstLesson.id}
          onDismiss={() => setShowWelcome(false)}
        />
      )}
      {showStreakRisk && (
        <StreakRiskBanner streakDays={streakDays} nextLessonHref={nextLessonHref} />
      )}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
      {/* Main Stats and Units Card */}
      <div className="lg:col-span-2 space-y-12">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Trophy size={160} className="text-coral-600" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Target className="text-coral-500" />
              Tu Progreso en el Curso
            </h2>
            
            <div className="flex items-end gap-4 mb-4">
              <span className="text-7xl font-black text-coral-600 leading-none">
                {progressPercentage}%
              </span>
              <span className="text-slate-400 font-bold mb-2">Completado</span>
            </div>

            <div className="w-full h-4 bg-slate-100 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-coral-500 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Ejercicios</p>
                <p className="text-xl font-black text-slate-900">{totalExercises}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Completados</p>
                <p className="text-xl font-black text-slate-900">{completedExercises}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Módulos</p>
                <p className="text-xl font-black text-slate-900">{modules.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-black text-slate-700">Contenido del Curso</h3>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('list')}
              aria-label="Vista en lista"
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('map')}
              aria-label="Vista en mapa"
              className={`p-2 rounded-lg transition-colors ${viewMode === 'map' ? 'bg-white shadow text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Map size={16} />
            </button>
          </div>
        </div>

        {/* Map view */}
        {viewMode === 'map' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <CourseRoadmap
              modules={modules}
              completedIds={completedSet}
              currentLessonId={null}
            />
          </div>
        )}

        {/* Modules and Lessons */}
        {viewMode === 'list' && modules.map((module, mIdx) => (
          <div key={module.id} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#FF6B6B] text-white w-10 h-10 rounded-xl flex items-center justify-center font-black shadow-lg">
                {mIdx + 1}
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900">{module.title}</h2>
                <p className="text-slate-500 text-sm">{module.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {module.lessons.map((lesson, lIdx) => {
                const lessonExercises = lesson.exercises || [];
                const lessonCompletedCount = lessonExercises.filter(ex => completedSet.has(ex.id)).length;
                const lessonProgress = lessonExercises.length > 0 
                  ? Math.round((lessonCompletedCount / lessonExercises.length) * 100) 
                  : 0;
                const isCompleted = lessonProgress === 100 && lessonExercises.length > 0;

                return (
                  <Link 
                    key={lesson.id}
                    href={`/practice/${lesson.id}`}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-coral-200 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-coral-50 rounded-bl-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-black text-coral-500 uppercase tracking-wider">
                          Lección {lIdx + 1}
                        </span>
                        {isCompleted && (
                          <CheckCircle2 size={20} className="text-green-500" />
                        )}
                      </div>
                      
                      <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-coral-600 transition-colors line-clamp-1">
                        {lesson.title}
                      </h3>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-coral-500'}`}
                            style={{ width: `${lessonProgress}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                          {lessonProgress}%
                        </span>
                      </div>
                      
                      <p className="text-xs text-slate-400 mt-2 font-medium">
                        {lessonCompletedCount}/{lessonExercises.length} Ejercicios
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar / Info */}
      <div className="space-y-6">
        <NextActionCard
          userId={userId}
          level={level}
          modules={modules}
          completedIds={completedSet}
          srsReviewCount={srsReviewCount}
        />

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            <Clock className="text-slate-400" size={20} />
            Estructura del Curso
          </h4>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="mt-1"><CheckCircle2 size={18} className="text-green-500" /></div>
              <p className="text-slate-600 text-sm">
                Objetivos alineados con el nivel <strong>{level}</strong>.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="mt-1"><CheckCircle2 size={18} className="text-green-500" /></div>
              <p className="text-slate-600 text-sm">
                Material actualizado para el año 2026.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}
