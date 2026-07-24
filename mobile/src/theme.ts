import { StyleSheet } from 'react-native';

export const colors = {
  bg: '#f8fafc',
  card: '#ffffff',
  text: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  primary: '#FF6B6B',
  primaryDark: '#e85555',
  success: '#10b981',
  successBg: '#ecfdf5',
  error: '#ef4444',
  errorBg: '#fef2f2',
  dark: '#0f172a',
};

export const shared = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 30,
  },
  instructions: {
    fontSize: 15,
    color: colors.muted,
    lineHeight: 22,
  },
  question: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 26,
  },
  option: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#fff5f5',
  },
  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.successBg,
  },
  optionWrong: {
    borderColor: colors.error,
    backgroundColor: colors.errorBg,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: colors.dark,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.45,
  },
});
