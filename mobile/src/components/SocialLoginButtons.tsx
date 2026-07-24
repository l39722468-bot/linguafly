import { useState } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { signInWithApple, signInWithGoogle } from '../lib/oauth';
import { colors } from '../theme';

type Props = {
  onSuccess: () => void;
  disabled?: boolean;
};

export function SocialLoginButtons({ onSuccess, disabled }: Props) {
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'apple' | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSocial(provider: 'google' | 'apple') {
    setLoadingProvider(provider);
    setError(null);
    try {
      if (provider === 'google') await signInWithGoogle();
      else await signInWithApple();
      onSuccess();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      if (message !== 'Inicio de sesión cancelado') {
        setError(message);
      }
    } finally {
      setLoadingProvider(null);
    }
  }

  const busy = disabled || loadingProvider !== null;

  return (
    <View style={styles.wrap}>
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>o continúa con</Text>
        <View style={styles.dividerLine} />
      </View>

      <Pressable
        style={[styles.socialBtn, styles.googleBtn, busy && styles.disabled]}
        disabled={busy}
        onPress={() => handleSocial('google')}
      >
        {loadingProvider === 'google' ? (
          <ActivityIndicator color={colors.text} />
        ) : (
          <>
            <Text style={styles.socialIcon}>G</Text>
            <Text style={styles.socialText}>Google</Text>
          </>
        )}
      </Pressable>

      {(Platform.OS === 'ios' || Platform.OS === 'android') && (
        <Pressable
          style={[styles.socialBtn, styles.appleBtn, busy && styles.disabled]}
          disabled={busy}
          onPress={() => handleSocial('apple')}
        >
          {loadingProvider === 'apple' ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={[styles.socialIcon, styles.appleIcon]}></Text>
              <Text style={[styles.socialText, styles.appleText]}>Apple</Text>
            </>
          )}
        </Pressable>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10, marginTop: 4 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 8 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { fontSize: 13, color: colors.muted, fontWeight: '600' },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 2,
  },
  googleBtn: {
    backgroundColor: '#fff',
    borderColor: colors.border,
  },
  appleBtn: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  socialIcon: { fontSize: 18, fontWeight: '900', color: colors.text },
  appleIcon: { color: '#fff' },
  socialText: { fontSize: 16, fontWeight: '800', color: colors.text },
  appleText: { color: '#fff' },
  disabled: { opacity: 0.55 },
  error: { color: colors.error, fontSize: 13, textAlign: 'center' },
});
