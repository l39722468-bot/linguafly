import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FocusEnglishApi } from './src/api/client';
import { DEFAULT_COURSE_ID } from './src/config';
import { UnitPlayerScreen } from './src/screens/UnitPlayerScreen';
import { getAccessToken } from './src/supabase';
import { colors, shared } from './src/theme';

const api = new FocusEnglishApi(getAccessToken);

type Screen = 'home' | 'player';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<{
    title: string;
    unitNumber: number;
    totalUnits: number;
    exerciseCount: number;
  } | null>(null);

  async function prepareSession() {
    setLoading(true);
    setError(null);
    try {
      const catalog = await api.getCourseCatalog(DEFAULT_COURSE_ID);
      const unitId = `unit-${catalog.sequential.currentUnitNumber}`;
      const unit = await api.getUnit(DEFAULT_COURSE_ID, unitId);
      setPreview({
        title: unit.title,
        unitNumber: catalog.sequential.currentUnitNumber,
        totalUnits: catalog.totalUnits,
        exerciseCount: unit.exerciseCount,
      });
      setScreen('player');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el curso');
    } finally {
      setLoading(false);
    }
  }

  if (screen === 'player') {
    return <UnitPlayerScreen onExit={() => setScreen('home')} />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>FOCUS ENGLISH</Text>
        <Text style={styles.heading}>Tu curso de inglés</Text>
        <Text style={styles.subtitle}>
          Aprende unidad a unidad con ejercicios interactivos en tu móvil.
        </Text>

        {preview ? (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Última sesión</Text>
            <Text style={styles.cardTitle}>{preview.title}</Text>
            <Text style={styles.cardMeta}>
              Unidad {preview.unitNumber} · {preview.exerciseCount} ejercicios
            </Text>
          </View>
        ) : null}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={[shared.primaryButton, loading && shared.disabledButton]}
          disabled={loading}
          onPress={prepareSession}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={shared.primaryButtonText}>Empezar a aprender</Text>
          )}
        </Pressable>

        <View style={styles.features}>
          <Text style={styles.feature}>✓ Opción múltiple y completar huecos</Text>
          <Text style={styles.feature}>✓ Lectura y escucha</Text>
          <Text style={styles.feature}>✓ Progreso sincronizado con la web</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: 24, gap: 16 },
  brand: { color: colors.primary, fontWeight: '800', fontSize: 13, letterSpacing: 2 },
  heading: { fontSize: 32, fontWeight: '900', color: colors.text },
  subtitle: { fontSize: 16, color: colors.muted, lineHeight: 24, marginBottom: 8 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  cardLabel: { fontSize: 12, fontWeight: '800', color: colors.muted, textTransform: 'uppercase' },
  cardTitle: { fontSize: 18, fontWeight: '800', color: colors.text },
  cardMeta: { fontSize: 14, color: colors.muted },
  error: { color: colors.error, fontSize: 14 },
  features: { marginTop: 8, gap: 8 },
  feature: { fontSize: 14, color: '#334155' },
});
