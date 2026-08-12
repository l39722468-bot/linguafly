'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Clock, Layers } from 'lucide-react';

interface CourseWelcomeScreenProps {
  courseId: string;
  userId: string;
  modulesCount: number;
  lessonsCount: number;
  firstLessonId: string;
  firstLessonHref?: string;
  onDismiss: () => void;
}

export default function CourseWelcomeScreen({
  courseId,
  userId,
  modulesCount,
  lessonsCount,
  firstLessonId,
  firstLessonHref,
  onDismiss,
}: CourseWelcomeScreenProps) {
  const shouldReduceMotion = useReducedMotion();
  const href = firstLessonHref ?? `/practice/${firstLessonId}`;

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`course_welcome_${courseId}_shown`, 'true');
    }
    onDismiss();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        <div className="bg-gradient-to-br from-[#FF6B6B] to-[#1A237E] p-8 text-white text-center">
          <div className="text-5xl mb-3">🎯</div>
          <h2 className="text-2xl font-black mb-2">¡Bienvenido al Curso!</h2>
          <p className="text-white/90 text-sm font-medium">
            Aprenderás inglés básico para el trabajo en 90 días
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center bg-slate-50 rounded-2xl p-4">
              <Layers className="mx-auto mb-1 text-[#FF6B6B]" size={22} />
              <p className="text-2xl font-black text-slate-900">{modulesCount}</p>
              <p className="text-xs text-slate-500 font-bold uppercase mt-1">Módulos</p>
            </div>
            <div className="text-center bg-slate-50 rounded-2xl p-4">
              <BookOpen className="mx-auto mb-1 text-[#FF6B6B]" size={22} />
              <p className="text-2xl font-black text-slate-900">{lessonsCount}</p>
              <p className="text-xs text-slate-500 font-bold uppercase mt-1">Lecciones</p>
            </div>
            <div className="text-center bg-slate-50 rounded-2xl p-4">
              <Clock className="mx-auto mb-1 text-[#FF6B6B]" size={22} />
              <p className="text-2xl font-black text-slate-900">15</p>
              <p className="text-xs text-slate-500 font-bold uppercase mt-1">Min/sesión</p>
            </div>
          </div>

          <Link
            href={href}
            onClick={handleDismiss}
            className="block w-full text-center bg-gradient-to-r from-[#FF6B6B] to-[#ff5252] text-white px-6 py-4 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all mb-3"
          >
            Comenzar ahora →
          </Link>

          <button
            onClick={handleDismiss}
            className="block w-full text-center text-slate-400 text-sm font-semibold hover:text-slate-600 transition-colors py-2"
          >
            Ver el curso primero
          </button>
        </div>
      </motion.div>
    </div>
  );
}
