import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { UnitPlayerScreen } from './src/screens/UnitPlayerScreen';
import { colors } from './src/theme';

type Screen = 'login' | 'register' | 'home' | 'player';

function RootNavigator() {
  const { user, loading } = useAuth();
  const [screen, setScreen] = useState<Screen>(user ? 'home' : 'login');
  const [guestUnit1, setGuestUnit1] = useState(false);

  useEffect(() => {
    if (user && screen === 'login') setScreen('home');
    if (!user && screen === 'home') setScreen('login');
  }, [user, screen]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (screen === 'player') {
    return (
      <UnitPlayerScreen
        guestUnit1={guestUnit1}
        onExit={() => {
          setGuestUnit1(false);
          setScreen(user ? 'home' : 'login');
        }}
      />
    );
  }

  if (screen === 'register') {
    return (
      <RegisterScreen
        onGoLogin={() => setScreen('login')}
        onSuccess={() => setScreen('login')}
      />
    );
  }

  if (screen === 'login' && !user) {
    return (
      <LoginScreen
        onGoRegister={() => setScreen('register')}
        onSuccess={() => setScreen('home')}
        onGuest={() => {
          setGuestUnit1(true);
          setScreen('player');
        }}
      />
    );
  }

  return (
    <HomeScreen
      onLogin={() => setScreen('login')}
      onStart={() => {
        setGuestUnit1(false);
        setScreen('player');
      }}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
});
