import { Pressable, StyleSheet, Text, View } from 'react-native';
import { parseBilingual } from '../../utils/bilingual';
import type { CourseExercise } from '../../types/exercise';
import { getExerciseContent, getPrimaryQuestion } from '../../utils/exercise-eval';
import { shared } from '../../theme';

type Props = {
  exercise: CourseExercise;
  onSkip?: () => void;
};

export function FallbackExercise({ exercise, onSkip }: Props) {
  const content = getExerciseContent(exercise);
  const question = getPrimaryQuestion(exercise);

  return (
    <View style={shared.card}>
      <Text style={styles.badge}>Próximamente en la app</Text>
      <Text style={shared.title}>
        {parseBilingual(content.title ?? exercise.topicName ?? 'Ejercicio')}
      </Text>
      <Text style={shared.instructions}>
        Tipo: {exercise.type}. Este formato se implementará en la siguiente versión.
      </Text>
      {question?.question ? (
        <Text style={shared.question}>{parseBilingual(question.question)}</Text>
      ) : null}
      {onSkip ? (
        <Pressable style={shared.primaryButton} onPress={onSkip}>
          <Text style={shared.primaryButtonText}>Saltar por ahora</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    fontWeight: '800',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
