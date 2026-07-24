import { StyleSheet, Text, View } from 'react-native';
import { parseBilingual } from '../utils/bilingual';
import { colors } from '../theme';

type FeedbackBarProps = {
  visible: boolean;
  success: boolean;
  message?: string;
};

export function FeedbackBar({ visible, success, message }: FeedbackBarProps) {
  if (!visible) return null;

  return (
    <View
      style={[
        styles.bar,
        success ? styles.success : styles.error,
      ]}
    >
      <Text style={styles.title}>{success ? '¡Correcto!' : 'Casi lo tienes'}</Text>
      {message ? <Text style={styles.message}>{parseBilingual(message)}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderTopWidth: 4,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  success: {
    borderTopColor: colors.success,
    backgroundColor: colors.successBg,
  },
  error: {
    borderTopColor: colors.error,
    backgroundColor: colors.errorBg,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },
});
