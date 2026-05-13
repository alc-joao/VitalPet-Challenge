import { View, Image } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/src/components/atoms/Button';
import { Text } from '@/src/components/atoms/Text';

export function OnboardingScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ height: '72%', position: 'relative' }}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80&w=1200',
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />

        <View
          style={{
            position: 'absolute',
            top: 62,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Text size={54} color="#FFFFFF">
            🐾
          </Text>

          <Text size={26} weight="700" color="#FFFFFF">
            VITALPET
          </Text>

          <Text size={12} color="#FFFFFF">
            — by clyvo —
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 28,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -40,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 34,
          borderTopRightRadius: 34,
        }}
      >
        <Text size={30} weight="700" color="#075BAD" align="center">
          Bem Vindo(a) ao{'\n'}Clyvo VitalPet
        </Text>

        <Text
          size={17}
          color="#0A66C2"
          align="center"
          style={{ marginTop: 8, marginBottom: 24 }}
        >
          Um cuidado com seu pet
        </Text>

        <Button title="Começar" onPress={() => router.push('/choose-profile')} />
      </View>
    </View>
  );
}