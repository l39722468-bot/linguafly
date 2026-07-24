import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { CourseExercise } from '../../types/exercise';
import { getExerciseContent } from '../../utils/exercise-eval';
import { parseBilingual } from '../../utils/bilingual';
import { evaluateSentenceBuilding } from '../../api/evaluate';
import { shared, colors } from '../../theme';

type Props = {
  exercise: CourseExercise;
  onComplete: (success: boolean) => void;
};

function normalizeSentence(value: string) {
  return parseBilingual(value)
    .toLowerCase()
    .replace(/[^\w\s'?]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function SentenceBuildingExercise({ exercise, onComplete }: Props) {
  const content = getExerciseContent(exercise);
  const words = useMemo(
    () => (content.words ?? []).map((w) => parseBilingual(w)),
    [content.words]
  );
  const [pool, setPool] = useState<string[]>(words);
  const [answer, setAnswer] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function pickWord(word: string, index: number) {
    if (submitted) return;
    setPool((prev) => prev.filter((_, i) => i !== index));
    setAnswer((prev) => [...prev, word]);
  }

  function removeWord(word: string, index: number) {
    if (submitted) return;
    setAnswer((prev) => prev.filter((_, i) => i !== index));
    setPool((prev) => [...prev, word]);
  }

  async function handleSubmit() {
    const userSentence = answer.join(' ');
    const target = content.correctSentence ?? '';
    setLoading(true);
    try {
      const result = await evaluateSentenceBuilding({
        userSentence,
        targetSentence: parseBilingual(target, 'en'),
        grammarFocus: exercise.topic ?? 'grammar',
        words: words.map((text) => ({ text, type: 'word' })),
      });
      setSubmitted(true);
      setFeedback(result.feedback);
      setTimeout(() => onComplete(result.isCorrect || result.score >= 70), 1400);
    } catch {
      const ok = normalizeSentence(userSentence) === normalizeSentence(target);
      setSubmitted(true);
      setFeedback(ok ? '¡Frase correcta!' : `Solución: ${parseBilingual(target, 'en')}`);
      setTimeout(() => onComplete(ok), 1400);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={shared.card}>
      <Text style={shared.instructions}>
        {parseBilingual(content.instructions ?? 'Ordena las palabras para formar una frase.')}
      </Text>

      <View style={styles.answerBox}>
        {answer.length === 0 ? (
          <Text style={styles.placeholder}>Toca las palabras para construir la frase</Text>
        ) : (
          <View style={styles.chipRow}>
            {answer.map((word, index) => (
              <Pressable key={`${word}-${index}`} onPress={() => removeWord(word, index)} style={styles.answerChip}>
                <Text style={styles.chipText}>{word}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={styles.chipRow}>
        {pool.map((word, index) => (
          <Pressable key={`${word}-pool-${index}`} onPress={() => pickWord(word, index)} style={styles.poolChip}>
            <Text style={styles.chipText}>{word}</Text>
          </Pressable>
        ))}
      </View>

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

      {!submitted ? (
        <Pressable
          style={[shared.primaryButton, (answer.length === 0 || loading) && shared.disabledButton]}
          disabled={answer.length === 0 || loading}
          onPress={handleSubmit}
        >
          <Text style={shared.primaryButtonText}>{loading ? 'Comprobando…' : 'Comprobar'}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  answerBox: {
    minHeight: 72,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#f8fafc',
  },
  placeholder: { color: colors.muted, fontSize: 14 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  poolChip: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  answerChip: {
    backgroundColor: '#fff5f5',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: { fontSize: 15, color: colors.text, fontWeight: '600' },
  feedback: { fontSize: 14, color: colors.muted, lineHeight: 20 },
});
