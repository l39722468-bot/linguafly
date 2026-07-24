import { useEffect, useState } from 'react';
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
import { getAccessToken } from './src/supabase';

const api = new FocusEnglishApi(getAccessToken);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('Focus English');
  const [subtitle, setSubtitle] = useState('Preparando tu lección…');
  const [exerciseCount, setExerciseCount] = useState(0);

  async function loadCurrentUnit() {
    setLoading(true);
    setError(null);
    try {
      const catalog = await api.getCourseCatalog(DEFAULT_COURSE_ID);
      const unitId = `unit-${catalog.sequential.currentUnitNumber}`;
      const unit = await api.getUnit(DEFAULT_COURSE_ID, unitId);
      setTitle(unit.title);
      setSubtitle(`Unidad ${catalog.sequential.currentUnitNumber} · ${catalog.totalUnits} en total`);
      setExerciseCount(unit.exerciseCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el curso');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCurrentUnit();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>Focus English</Text>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#FF6B6B" style={styles.loader} />
        ) : error ? (
          <View style={styles.card}>
            <Text style={styles.error}>{error}</Text>
            <Pressable style={styles.button} onPress={loadCurrentUnit}>
              <Text style={styles.buttonText}>Reintentar</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>API móvil conectada</Text>
            <Text style={styles.cardBody}>
              {exerciseCount} ejercicios listos para el reproductor nativo.
            </Text>
            <Text style={styles.hint}>
              Siguiente paso: implementar pantallas de ejercicios en React Native.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  container: { padding: 24, gap: 12 },
  brand: { color: '#FF6B6B', fontWeight: '800', fontSize: 14, letterSpacing: 1 },
  heading: { fontSize: 28, fontWeight: '900', color: '#0f172a' },
  subtitle: { fontSize: 16, color: '#64748b', marginBottom: 12 },
  loader: { marginTop: 24 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 10,
  },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  cardBody: { fontSize: 15, color: '#334155', lineHeight: 22 },
  hint: { fontSize: 13, color: '#94a3b8' },
  error: { color: '#dc2626', fontSize: 15 },
  button: {
    marginTop: 8,
    backgroundColor: '#0f172a',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '800' },
});
