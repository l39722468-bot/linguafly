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
import { FocusEnglishApi } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { DEFAULT_COURSE_ID } from '../config';
import { getAccessToken } from '../supabase';
import { colors, shared } from '../theme';

const api = new FocusEnglishApi(getAccessToken);

type Props = {
  onStart: (options?: { guestUnit1?: boolean }) => void;
  onLogin: () => void;
};

export function HomeScreen({ onStart, onLogin }: Props) {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(!!user);
  const [error, setError] = useState<string | null>(null);
  const [entitlements, setEntitlements] = useState<{
    isPaid: boolean;
    tier: string;
  } | null>(null);
  const [catalog, setCatalog] = useState<{
    currentUnit: number;
    totalUnits: number;
    title?: string;
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadProfile() {
      if (!user) {
        setProfileLoading(false);
        return;
      }
      try {
        const me = await api.getMe();
        if (!mounted) return;
        setEntitlements({
          isPaid: me.entitlements.isPaid,
          tier: me.entitlements.tier,
        });
        const cat = await api.getCourseCatalog(DEFAULT_COURSE_ID);
        if (!mounted) return;
        setCatalog({
          currentUnit: cat.sequential.currentUnitNumber,
          totalUnits: cat.totalUnits,
        });
      } catch {
        /* perfil opcional */
      } finally {
        if (mounted) setProfileLoading(false);
      }
    }
    loadProfile();
    return () => {
      mounted = false;
    };
  }, [user]);

  async function handleStart() {
    setLoading(true);
    setError(null);
    try {
      onStart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.brand}>FOCUS ENGLISH</Text>
          {user ? (
            <Pressable onPress={() => signOut()} style={styles.logoutBtn}>
              <Text style={styles.logoutText}>Salir</Text>
            </Pressable>
          ) : null}
        </View>

        <Text style={styles.heading}>Tu curso de inglés</Text>
        <Text style={styles.subtitle}>
          Aprende unidad a unidad con ejercicios interactivos en tu móvil.
        </Text>

        {user ? (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Sesión activa</Text>
            <Text style={styles.cardTitle}>{user.email}</Text>
            {profileLoading ? (
              <ActivityIndicator color={colors.primary} style={{ marginTop: 8 }} />
            ) : (
              <>
                <Text style={styles.cardMeta}>
                  {entitlements?.isPaid ? 'Suscripción activa' : 'Plan gratuito · Unidad 1'}
                </Text>
                {catalog ? (
                  <Text style={styles.cardMeta}>
                    Unidad {catalog.currentUnit} de {catalog.totalUnits}
                  </Text>
                ) : null}
              </>
            )}
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Inicia sesión para guardar tu progreso</Text>
            <Pressable style={styles.secondaryBtn} onPress={onLogin}>
              <Text style={styles.secondaryBtnText}>Iniciar sesión</Text>
            </Pressable>
          </View>
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={[shared.primaryButton, loading && shared.disabledButton]}
          disabled={loading}
          onPress={handleStart}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={shared.primaryButtonText}>Continuar aprendiendo</Text>
          )}
        </Pressable>

        <View style={styles.features}>
          <Text style={styles.feature}>✓ Opción múltiple, huecos y ordenar frases</Text>
          <Text style={styles.feature}>✓ Escritura y pronunciación con IA</Text>
          <Text style={styles.feature}>✓ Progreso sincronizado con la web</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: 24, gap: 14 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: colors.primary, fontWeight: '800', fontSize: 13, letterSpacing: 2 },
  logoutBtn: { padding: 8 },
  logoutText: { color: colors.muted, fontWeight: '700', fontSize: 14 },
  heading: { fontSize: 32, fontWeight: '900', color: colors.text },
  subtitle: { fontSize: 16, color: colors.muted, lineHeight: 24 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  cardLabel: { fontSize: 12, fontWeight: '800', color: colors.muted, textTransform: 'uppercase' },
  cardTitle: { fontSize: 17, fontWeight: '800', color: colors.text },
  cardMeta: { fontSize: 14, color: colors.muted },
  secondaryBtn: {
    marginTop: 8,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryBtnText: { fontWeight: '800', color: colors.text },
  error: { color: colors.error, fontSize: 14 },
  guestBtn: { alignItems: 'center', paddingVertical: 8 },
  guestText: { color: colors.primary, fontWeight: '700', fontSize: 15 },
  features: { marginTop: 8, gap: 8 },
  feature: { fontSize: 14, color: '#334155' },
});
