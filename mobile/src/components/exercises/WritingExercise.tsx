import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { CourseExercise } from '../../types/exercise';
import { getExerciseContent } from '../../utils/exercise-eval';
import { parseBilingual } from '../../utils/bilingual';
import { evaluateTextAnswer } from '../../api/evaluate';
import { shared, colors } from '../../theme';

type Props = {
  exercise: CourseExercise;
  onComplete: (success: boolean) => void;
};

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function WritingExercise({ exercise, onComplete }: Props) {
  const content = getExerciseContent(exercise);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const minWords = content.minWords ?? 3;

  async function handleSubmit() {
    const words = countWords(text);
    if (words < minWords) {
      setFeedback(`Escribe al menos ${minWords} palabras (llevas ${words}).`);
      return;
    }

    setLoading(true);
    try {
      const result = await evaluateTextAnswer({
        question: parseBilingual(content.prompt ?? content.instructions ?? 'Writing task'),
        userAnswer: text,
        level: exercise.level ?? 'A1',
      });
      setSubmitted(true);
      setFeedback(result.feedback);
      setTimeout(() => onComplete(result.isCorrect || result.score >= 60), 1600);
    } catch {
      setSubmitted(true);
      setFeedback('Respuesta enviada. ¡Buen trabajo!');
      setTimeout(() => onComplete(words >= minWords), 1200);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={shared.card}>
      <Text style={shared.instructions}>
        {parseBilingual(content.instructions ?? 'Escribe tu respuesta en inglés.')}
      </Text>
      {content.prompt ? (
        <Text style={styles.prompt}>{parseBilingual(content.prompt)}</Text>
      ) : null}

      <TextInput
        value={text}
        onChangeText={setText}
        editable={!submitted}
        multiline
        placeholder="Escribe aquí en inglés…"
        placeholderTextColor={colors.muted}
        style={styles.textarea}
        textAlignVertical="top"
      />

      <Text style={styles.counter}>
        {countWords(text)} / {minWords}+ palabras
      </Text>

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

      {!submitted ? (
        <Pressable
          style={[shared.primaryButton, loading && shared.disabledButton]}
          disabled={loading}
          onPress={handleSubmit}
        >
          <Text style={shared.primaryButtonText}>{loading ? 'Evaluando…' : 'Enviar respuesta'}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  prompt: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 24,
  },
  textarea: {
    minHeight: 140,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    fontSize: 16,
    color: colors.text,
    backgroundColor: '#fff',
  },
  counter: { fontSize: 12, color: colors.muted, textAlign: 'right' },
  feedback: { fontSize: 14, color: colors.muted, lineHeight: 20 },
});
