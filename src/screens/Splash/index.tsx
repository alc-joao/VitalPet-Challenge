import { useEffect } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

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
        backgroundColor: '#0A66C2',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <Image
        source={require('@/assets/logos/logo-white.svg')}
        style={{
          width: 220,
          height: 220,
          marginBottom: 20,
        }}
        resizeMode="contain"
      />

      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
}