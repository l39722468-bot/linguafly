import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { SocialLoginButtons } from '../components/SocialLoginButtons';
import { colors, shared } from '../theme';

type Props = {
  onGoRegister: () => void;
  onSuccess: () => void;
  onGuest?: () => void;
};

export function LoginScreen({ onGoRegister, onSuccess, onGuest }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setLoading(true);
    setError(null);
    try {
      await signIn(email.trim(), password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.brand}>FOCUS ENGLISH</Text>
          <Text style={styles.heading}>Inicia sesión</Text>
          <Text style={styles.subtitle}>Accede a tu curso y sincroniza tu progreso.</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              placeholder="tu@email.com"
              placeholderTextColor={colors.muted}
              style={styles.input}
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              placeholder="••••••••"
              placeholderTextColor={colors.muted}
              style={styles.input}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable
              style={[shared.primaryButton, loading && shared.disabledButton]}
              disabled={loading || !email || !password}
              onPress={handleLogin}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={shared.primaryButtonText}>Entrar</Text>
              )}
            </Pressable>

            <Pressable onPress={onGoRegister} style={styles.linkBtn}>
              <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
            </Pressable>

            <SocialLoginButtons onSuccess={onSuccess} disabled={loading} />

            {onGuest ? (
              <Pressable onPress={onGuest} style={styles.guestBtn}>
                <Text style={styles.guestText}>Probar unidad 1 gratis sin cuenta</Text>
              </Pressable>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  container: { padding: 24, gap: 8 },
  brand: { color: colors.primary, fontWeight: '800', fontSize: 13, letterSpacing: 2 },
  heading: { fontSize: 30, fontWeight: '900', color: colors.text },
  subtitle: { fontSize: 15, color: colors.muted, marginBottom: 16, lineHeight: 22 },
  form: { gap: 10 },
  label: { fontSize: 13, fontWeight: '700', color: colors.muted, marginTop: 4 },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
    backgroundColor: '#fff',
  },
  error: { color: colors.error, fontSize: 14 },
  linkBtn: { paddingVertical: 12, alignItems: 'center' },
  linkText: { color: colors.primary, fontWeight: '700', fontSize: 15 },
  guestBtn: { paddingVertical: 8, alignItems: 'center' },
  guestText: { color: colors.muted, fontSize: 14, fontWeight: '600' },
});
