import { Pressable, StyleSheet, Text, View } from 'react-native';
import { parseBilingual, optionLabel } from '../utils/bilingual';
import type { ExerciseQuestion } from '../types/exercise';
import { shared } from '../theme';

type Props = {
  question: ExerciseQuestion;
  selectedIndex: number | null;
  submitted: boolean;
  onSelect: (index: number) => void;
  onSubmit: () => void;
};

export function MultipleChoiceExercise({
  question,
  selectedIndex,
  submitted,
  onSelect,
  onSubmit,
}: Props) {
  const options = question.options ?? [];
  const correctIndex =
    typeof question.correctAnswer === 'number'
      ? question.correctAnswer
      : typeof question.answer === 'number'
      ? question.answer
      : -1;

  return (
    <View style={shared.card}>
      <Text style={shared.question}>
        {parseBilingual(question.question ?? question.text ?? '')}
      </Text>
      <View style={styles.options}>
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = submitted && index === correctIndex;
          const isWrong = submitted && isSelected && !isCorrect;

          return (
            <Pressable
              key={index}
              disabled={submitted}
              onPress={() => onSelect(index)}
              style={[
                shared.option,
                isSelected && !submitted && shared.optionSelected,
                isCorrect && shared.optionCorrect,
                isWrong && shared.optionWrong,
              ]}
            >
              <Text style={shared.optionText}>{optionLabel(option)}</Text>
            </Pressable>
          );
        })}
      </View>
      {!submitted ? (
        <Pressable
          style={[shared.primaryButton, selectedIndex === null && shared.disabledButton]}
          disabled={selectedIndex === null}
          onPress={onSubmit}
        >
          <Text style={shared.primaryButtonText}>Comprobar</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  options: { gap: 10 },
});
