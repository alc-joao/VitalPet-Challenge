import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';
import { colors } from '@/src/constants/colors';

export function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 40,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}
      >
        <Text size={54}>🐾</Text>
      </View>

      <Text size={34} weight="700" color={colors.primaryDark}>
        VitalPet
      </Text>

      <Text
        size={15}
        color={colors.gray500}
        align="center"
        style={{ marginTop: 8, marginBottom: 28 }}
      >
        Cuidado contínuo para a saúde do seu pet
      </Text>

      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}