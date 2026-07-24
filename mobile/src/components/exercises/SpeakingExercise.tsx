import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import type { CourseExercise } from '../../types/exercise';
import { getExerciseContent } from '../../utils/exercise-eval';
import { parseBilingual } from '../../utils/bilingual';
import { evaluateSpeaking } from '../../api/evaluate';
import { shared, colors } from '../../theme';

type Props = {
  exercise: CourseExercise;
  onComplete: (success: boolean) => void;
};

export function SpeakingExercise({ exercise, onComplete }: Props) {
  const content = getExerciseContent(exercise);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const targetText = parseBilingual(content.targetText ?? content.expectedResponse ?? '', 'en');
  const prompt = parseBilingual(content.instructions ?? 'Repite la frase en voz alta.');

  useEffect(() => {
    return () => {
      recordingRef.current?.stopAndUnloadAsync().catch(() => {});
    };
  }, []);

  async function startRecording() {
    const permission = await Audio.requestPermissionsAsync();
    if (!permission.granted) {
      setFeedback('Necesitamos permiso de micrófono para este ejercicio.');
      return;
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const rec = new Audio.Recording();
    await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    await rec.startAsync();
    recordingRef.current = rec;
    setRecording(true);
    setFeedback(null);
  }

  async function stopRecording() {
    const rec = recordingRef.current;
    if (!rec) return;

    setRecording(false);
    setLoading(true);
    try {
      await rec.stopAndUnloadAsync();
      const uri = rec.getURI();
      if (!uri) throw new Error('No se pudo guardar el audio');

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const result = await evaluateSpeaking({
        audioBase64: base64,
        prompt: targetText,
        expectedResponse: content.expectedResponse ?? targetText,
        level: exercise.level ?? 'A1',
      });

      setSubmitted(true);
      setFeedback(`${result.feedback}\n\nTranscripción: ${result.transcription}`);
      const success = result.overallScore >= 60;
      setTimeout(() => onComplete(success), 1800);
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : 'Error al evaluar el audio');
      setTimeout(() => onComplete(true), 1200);
    } finally {
      setLoading(false);
      recordingRef.current = null;
    }
  }

  return (
    <View style={shared.card}>
      <Text style={shared.instructions}>{prompt}</Text>

      <View style={styles.targetBox}>
        <Text style={styles.targetLabel}>Frase objetivo</Text>
        <Text style={styles.targetText}>{targetText}</Text>
      </View>

      <Pressable
        style={[styles.micButton, recording && styles.micButtonActive]}
        onPress={recording ? stopRecording : startRecording}
        disabled={loading || submitted}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.micButtonText}>
            {recording ? '■ Detener y enviar' : '🎤 Mantén pulsado para grabar'}
          </Text>
        )}
      </Pressable>

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  targetBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  targetLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.muted,
    textTransform: 'uppercase',
  },
  targetText: { fontSize: 20, fontWeight: '800', color: colors.text, lineHeight: 28 },
  micButton: {
    backgroundColor: colors.dark,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  micButtonActive: { backgroundColor: colors.error },
  micButtonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  feedback: { fontSize: 14, color: colors.muted, lineHeight: 20 },
});
