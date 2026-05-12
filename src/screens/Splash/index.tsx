import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

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
      <Text size={62}>🐾</Text>

      <Text
        size={34}
        weight="700"
        color="#FFFFFF"
        style={{ marginTop: 16 }}
      >
        VitalPet
      </Text>

      <Text
        size={16}
        color="#D9E8FF"
        align="center"
        style={{ marginTop: 8, marginBottom: 28 }}
      >
        Let’s care together
      </Text>

      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
}