import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { parseBilingual } from '../../utils/bilingual';
import type { CourseExercise, ExerciseQuestion } from '../../types/exercise';
import { getExerciseContent } from '../../utils/exercise-eval';
import { MultipleChoiceExercise } from './MultipleChoiceExercise';
import { shared, colors } from '../../theme';

type Props = {
  exercise: CourseExercise;
  question: ExerciseQuestion;
  audioUrl: string | null;
  selectedIndex: number | null;
  submitted: boolean;
  onSelect: (index: number) => void;
  onSubmit: () => void;
};

export function ListeningExercise(props: Props) {
  const { exercise, question, audioUrl, selectedIndex, submitted, onSelect, onSubmit } = props;
  const content = getExerciseContent(exercise);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      Audio.setAudioModeAsync({ playsInSilentModeIOS: false }).catch(() => {});
    };
  }, []);

  async function playAudio() {
    if (!audioUrl) return;
    try {
      setPlaying(true);
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        if (status.didJustFinish) {
          setPlaying(false);
          sound.unloadAsync().catch(() => {});
        }
      });
      await sound.playAsync();
    } catch {
      setPlaying(false);
    }
  }

  const passage = content.transcript || content.text || exercise.transcript;

  return (
    <View style={styles.wrap}>
      <View style={shared.card}>
        <Text style={shared.instructions}>
          {parseBilingual(content.instructions ?? 'Escucha y responde.')}
        </Text>
        {audioUrl ? (
          <Pressable style={styles.audioButton} onPress={playAudio} disabled={playing}>
            <Text style={styles.audioButtonText}>
              {playing ? 'Reproduciendo…' : '▶ Escuchar audio'}
            </Text>
          </Pressable>
        ) : passage ? (
          <View style={styles.passageBox}>
            <Text style={styles.passageLabel}>Transcripción</Text>
            <Text style={styles.passage}>{parseBilingual(passage, 'en')}</Text>
          </View>
        ) : (
          <Text style={shared.instructions}>Audio no disponible en esta unidad.</Text>
        )}
      </View>

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
  audioButton: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  audioButtonText: { color: '#1d4ed8', fontWeight: '800', fontSize: 16 },
  passageBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  passageLabel: { fontSize: 12, fontWeight: '800', color: colors.muted, textTransform: 'uppercase' },
  passage: { fontSize: 15, lineHeight: 22, color: colors.text },
});
