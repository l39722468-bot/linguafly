import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { parseBilingual, optionLabel } from '../../utils/bilingual';
import type { ExerciseQuestion } from '../../types/exercise';
import { shared, colors } from '../../theme';

type Props = {
  question: ExerciseQuestion;
  answer: string;
  selectedIndex: number | null;
  submitted: boolean;
  onChangeText: (value: string) => void;
  onSelectOption: (index: number) => void;
  onSubmit: () => void;
};

export function FillBlankExercise({
  question,
  answer,
  selectedIndex,
  submitted,
  onChangeText,
  onSelectOption,
  onSubmit,
}: Props) {
  const hasOptions = Array.isArray(question.options) && question.options.length > 0;

  return (
    <View style={shared.card}>
      <Text style={shared.question}>
        {parseBilingual(question.question ?? question.text ?? '')}
      </Text>

      {hasOptions ? (
        <View style={styles.options}>
          {question.options!.map((option, index) => (
            <Pressable
              key={index}
              disabled={submitted}
              onPress={() => onSelectOption(index)}
              style={[
                shared.option,
                selectedIndex === index && !submitted && shared.optionSelected,
              ]}
            >
              <Text style={shared.optionText}>{optionLabel(option)}</Text>
            </Pressable>
          ))}
        </View>
      ) : (
        <TextInput
          value={answer}
          editable={!submitted}
          onChangeText={onChangeText}
          placeholder="Escribe tu respuesta"
          placeholderTextColor={colors.muted}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}

      {!submitted ? (
        <Pressable
          style={[
            shared.primaryButton,
            (hasOptions ? selectedIndex === null : !answer.trim()) && shared.disabledButton,
          ]}
          disabled={hasOptions ? selectedIndex === null : !answer.trim()}
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
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
    backgroundColor: '#fff',
  },
});
