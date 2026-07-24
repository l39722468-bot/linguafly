import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ExerciseRenderer } from '../components/ExerciseRenderer';
import { FeedbackBar } from '../components/FeedbackBar';
import { FocusEnglishApi } from '../api/client';
import { DEFAULT_COURSE_ID } from '../config';
import { getAccessToken } from '../supabase';
import type { CourseExercise } from '../types/exercise';
import {
  buildLessonKeyCounts,
  getLessonKeyForExercise,
  getLessonLabel,
} from '../utils/lesson-progress';
import { colors, shared } from '../theme';

const api = new FocusEnglishApi(getAccessToken);

type Props = {
  onExit: () => void;
  guestUnit1?: boolean;
};

export function UnitPlayerScreen({ onExit, guestUnit1 = false }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unitTitle, setUnitTitle] = useState('');
  const [unitId, setUnitId] = useState('');
  const [exercises, setExercises] = useState<CourseExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ visible: boolean; success: boolean }>({
    visible: false,
    success: false,
  });
  const [totalUnits, setTotalUnits] = useState(60);

  const lessonKeyCounts = useMemo(() => buildLessonKeyCounts(exercises), [exercises]);
  const currentExercise = exercises[currentIndex];
  const progressPct = exercises.length ? ((currentIndex + 1) / exercises.length) * 100 : 0;

  const loadUnit = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (guestUnit1) {
        const unit = await api.getUnit(DEFAULT_COURSE_ID, 'unit-1');
        setTotalUnits(60);
        setUnitId('unit-1');
        setUnitTitle(unit.title);
        setExercises(unit.exercises as CourseExercise[]);
        setCurrentIndex(0);
        setCompleted(false);
        return;
      }

      const catalog = await api.getCourseCatalog(DEFAULT_COURSE_ID);
      const activeUnitId = `unit-${catalog.sequential.currentUnitNumber}`;
      const unit = await api.getUnit(DEFAULT_COURSE_ID, activeUnitId);
      setTotalUnits(catalog.totalUnits);
      setUnitId(unit.unitId);
      setUnitTitle(unit.title);
      setExercises(unit.exercises as CourseExercise[]);
      setCurrentIndex(0);
      setCompleted(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar la unidad');
    } finally {
      setLoading(false);
    }
  }, [guestUnit1]);

  useEffect(() => {
    loadUnit();
  }, [loadUnit]);

  async function recordProgress(exercise: CourseExercise, isCorrect: boolean) {
    const unitNumber = parseInt(unitId.replace('unit-', ''), 10);
    if (!Number.isFinite(unitNumber)) return;

    const lessonKey = getLessonKeyForExercise(exercise);
    try {
      await api.recordProgress({
        courseId: DEFAULT_COURSE_ID,
        unitId: unitNumber,
        lessonKey,
        exerciseId: exercise.id,
        exerciseType: exercise.type,
        isCorrect,
        expectedExercisesTotal: lessonKeyCounts[lessonKey] ?? 1,
      });
    } catch {
      // No bloquear la UX si falla el guardado
    }
  }

  async function handleExerciseComplete(result: { success: boolean }) {
    if (!currentExercise) return;
    setFeedback({ visible: true, success: result.success });
    await recordProgress(currentExercise, result.success);

    setTimeout(() => {
      setFeedback({ visible: false, success: result.success });
      if (currentIndex >= exercises.length - 1) {
        setCompleted(true);
        return;
      }
      setCurrentIndex((prev) => prev + 1);
    }, 1200);
  }

  async function goToNextUnit() {
    const nextNumber = parseInt(unitId.replace('unit-', ''), 10) + 1;
    if (!Number.isFinite(nextNumber) || nextNumber > totalUnits) {
      onExit();
      return;
    }
    setLoading(true);
    try {
      const nextUnitId = `unit-${nextNumber}`;
      const unit = await api.getUnit(DEFAULT_COURSE_ID, nextUnitId);
      setUnitId(unit.unitId);
      setUnitTitle(unit.title);
      setExercises(unit.exercises as CourseExercise[]);
      setCurrentIndex(0);
      setCompleted(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cargar la siguiente unidad');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Preparando tu lección…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centered}>
          <Text style={styles.error}>{error}</Text>
          <Pressable style={shared.primaryButton} onPress={loadUnit}>
            <Text style={shared.primaryButtonText}>Reintentar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (completed) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.completeWrap}>
          <Text style={styles.completeEmoji}>🏆</Text>
          <Text style={styles.completeTitle}>¡Unidad completada!</Text>
          <Text style={styles.completeSubtitle}>{unitTitle}</Text>
          <Pressable style={styles.nextButton} onPress={goToNextUnit}>
            <Text style={styles.nextButtonText}>Siguiente unidad</Text>
          </Pressable>
          <Pressable style={styles.exitButton} onPress={onExit}>
            <Text style={styles.exitButtonText}>Volver al inicio</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={onExit} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{unitTitle}</Text>
          <Text style={styles.headerMeta}>
            {getLessonLabel(currentExercise)} · {currentIndex + 1}/{exercises.length}
          </Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {currentExercise ? (
          <ExerciseRenderer
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        ) : null}
      </ScrollView>

      <FeedbackBar visible={feedback.visible} success={feedback.success} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  loadingText: { color: colors.muted, fontWeight: '600' },
  error: { color: colors.error, textAlign: 'center', fontSize: 15 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { fontSize: 20, color: colors.text },
  headerCenter: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: colors.text },
  headerMeta: { fontSize: 12, color: colors.muted, marginTop: 2 },
  progressTrack: {
    height: 4,
    backgroundColor: '#e2e8f0',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  content: { padding: 16, paddingBottom: 120 },
  completeWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  completeEmoji: { fontSize: 64 },
  completeTitle: { fontSize: 28, fontWeight: '900', color: colors.text },
  completeSubtitle: { fontSize: 16, color: colors.muted, textAlign: 'center' },
  nextButton: {
    marginTop: 16,
    width: '100%',
    backgroundColor: colors.dark,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  exitButton: { paddingVertical: 12 },
  exitButtonText: { color: colors.muted, fontWeight: '700' },
});
