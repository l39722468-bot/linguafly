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
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { SocialLoginButtons } from '../components/SocialLoginButtons';
import { colors, shared } from '../theme';

type Props = {
  onGoLogin: () => void;
  onSuccess: () => void;
};

export function RegisterScreen({ onGoLogin, onSuccess }: Props) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleRegister() {
    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      await signUp(email.trim(), password);
      setInfo('Cuenta creada. Revisa tu email si se requiere confirmación y luego inicia sesión.');
      setTimeout(onSuccess, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la cuenta');
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
          <Text style={styles.heading}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Empieza tu camino hacia el inglés fluido.</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="tu@email.com"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />

          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            placeholder="Repite la contraseña"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {info ? <Text style={styles.info}>{info}</Text> : null}

          <Pressable
            style={[shared.primaryButton, loading && shared.disabledButton, { marginTop: 8 }]}
            disabled={loading || !email || !password}
            onPress={handleRegister}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={shared.primaryButtonText}>Registrarme</Text>
            )}
          </Pressable>

          <Pressable onPress={onGoLogin} style={styles.linkBtn}>
            <Text style={styles.linkText}>Ya tengo cuenta</Text>
          </Pressable>

          <SocialLoginButtons onSuccess={onSuccess} disabled={loading} />
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
  subtitle: { fontSize: 15, color: colors.muted, marginBottom: 16 },
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
  info: { color: '#059669', fontSize: 14, lineHeight: 20 },
  linkBtn: { paddingVertical: 16, alignItems: 'center' },
  linkText: { color: colors.primary, fontWeight: '700', fontSize: 15 },
});
