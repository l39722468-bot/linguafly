import { Pressable, StyleSheet, Text, View } from 'react-native';
import { parseBilingual } from '../../utils/bilingual';
import type { ExerciseQuestion } from '../../types/exercise';
import { shared } from '../../theme';

type Props = {
  question: ExerciseQuestion;
  selected: boolean | null;
  submitted: boolean;
  correctValue: boolean | null;
  onSelect: (value: boolean) => void;
  onSubmit: () => void;
};

export function TrueFalseExercise({
  question,
  selected,
  submitted,
  correctValue,
  onSelect,
  onSubmit,
}: Props) {
  const choices: Array<{ label: string; value: boolean }> = [
    { label: 'Verdadero', value: true },
    { label: 'Falso', value: false },
  ];

  return (
    <View style={shared.card}>
      <Text style={shared.question}>
        {parseBilingual(question.question ?? question.text ?? '')}
      </Text>
      <View style={styles.row}>
        {choices.map((choice) => {
          const isSelected = selected === choice.value;
          const isCorrect = submitted && correctValue === choice.value;
          const isWrong = submitted && isSelected && correctValue !== choice.value;

          return (
            <Pressable
              key={choice.label}
              disabled={submitted}
              onPress={() => onSelect(choice.value)}
              style={[
                styles.choice,
                isSelected && !submitted && shared.optionSelected,
                isCorrect && shared.optionCorrect,
                isWrong && shared.optionWrong,
              ]}
            >
              <Text style={styles.choiceText}>{choice.label}</Text>
            </Pressable>
          );
        })}
      </View>
      {!submitted ? (
        <Pressable
          style={[shared.primaryButton, selected === null && shared.disabledButton]}
          disabled={selected === null}
          onPress={onSubmit}
        >
          <Text style={shared.primaryButtonText}>Comprobar</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12 },
  choice: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  choiceText: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
});
