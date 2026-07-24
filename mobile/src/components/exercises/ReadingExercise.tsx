import { StyleSheet, Text, View } from 'react-native';
import { parseBilingual } from '../../utils/bilingual';
import type { CourseExercise, ExerciseQuestion } from '../../types/exercise';
import { getExerciseContent } from '../../utils/exercise-eval';
import { MultipleChoiceExercise } from './MultipleChoiceExercise';
import { shared } from '../../theme';

type Props = {
  exercise: CourseExercise;
  question: ExerciseQuestion;
  selectedIndex: number | null;
  submitted: boolean;
  onSelect: (index: number) => void;
  onSubmit: () => void;
};

export function ReadingExercise({
  exercise,
  question,
  selectedIndex,
  submitted,
  onSelect,
  onSubmit,
}: Props) {
  const content = getExerciseContent(exercise);
  const passage =
    content.text || content.passage || content.transcript || exercise.transcript || '';

  return (
    <View style={styles.wrap}>
      {passage ? (
        <View style={shared.card}>
          <Text style={shared.instructions}>
            {parseBilingual(content.instructions ?? 'Lee el texto y responde.')}
          </Text>
          <Text style={styles.passage}>{parseBilingual(passage, 'en')}</Text>
        </View>
      ) : null}
      <MultipleChoiceExercise
        question={question}
        selectedIndex={selectedIndex}
        submitted={submitted}
        onSelect={onSelect}
        onSubmit={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  passage: { fontSize: 16, lineHeight: 24, color: '#0f172a' },
});
