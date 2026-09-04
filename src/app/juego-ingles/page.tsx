import { getFirst10LessonsExercises, getFirst10LessonsMeta, FIRST_10_LESSON_NAMES } from '@/lib/course/a1/first-10-lessons';
import GameClient from './GameClient';

export const metadata = {
  title: 'Juego de inglés | Linguafly',
  description: 'Prueba las 10 primeras lecciones del curso A1 en modo juego. Ideal para niños y principiantes.',
};

export default function JuegoInglesPage() {
  const exercises = getFirst10LessonsExercises();
  const meta = getFirst10LessonsMeta();

  return (
    <GameClient
      exercises={exercises}
      lessonNames={FIRST_10_LESSON_NAMES}
      exercisesPerLesson={meta.exercisesPerLesson}
    />
  );
}
