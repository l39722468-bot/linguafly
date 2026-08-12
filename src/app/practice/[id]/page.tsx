'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { courseService } from '@/lib/services/course-service';
import LessonPlayer from '@/components/course/LessonPlayer';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Lesson } from '@/lib/exercise-types';

export default function PracticePage() {
  const { id } = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLesson() {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await courseService.getLesson(id as string);
        if (data) {
          setLesson(data as any);
        } else {
          setError('No se pudo encontrar la lección.');
        }
      } catch (err) {
        console.error('Error loading lesson:', err);
        setError('Ocurrió un error al cargar la lección.');
      } finally {
        setLoading(false);
      }
    }

    loadLesson();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <p className="text-gray-600 font-medium animate-pulse">Cargando tu lección...</p>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-gray-900 mb-2">¡Ups! Algo salió mal</h1>
          <p className="text-gray-600 mb-8">{error || 'No pudimos cargar la lección en este momento.'}</p>
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-gray-800 transition-all w-full"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  return <LessonPlayer lesson={lesson} />;
}
