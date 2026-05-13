import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';
import LogoWhite from '@/assets/logos/logo-white.svg';

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
        backgroundColor: '#2F67C8',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
      }}
    >
      <LogoWhite width={230} height={170} />

      <Text
        size={24}
        color="#FFFFFF"
        align="center"
        style={{
          marginTop: 28,
          marginBottom: 42,
          letterSpacing: 0.2,
        }}
      >
        Um cuidado com seu pet
      </Text>

      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
}