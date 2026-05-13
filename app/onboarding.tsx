import { View, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/src/components/atoms/Text';

export default function Onboarding() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, position: 'relative' }}>
        <Image
          source={require('@/assets/images/background.png')}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />

        <LinearGradient
          colors={[
            'rgba(255,255,255,0)',
            'rgba(255,255,255,0.55)',
            '#FFFFFF',
            '#FFFFFF',
          ]}
          locations={[0, 0.58, 0.72, 1]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '48%',
          }}
        />

        <View
          style={{
            position: 'absolute',
            top: 72,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('@/assets/logos/logo-white.svg')}
            style={{
              width: 190,
              height: 120,
            }}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 56,
            paddingHorizontal: 32,
            alignItems: 'center',
          }}
        >
          <Text size={36} weight="700" color="#075BAD" align="center">
            Bem Vindo(a) ao{'\n'}Clyvo VitalPet
          </Text>

          <Text
            size={21}
            color="#0A66C2"
            align="center"
            style={{ marginTop: 8, marginBottom: 34 }}
          >
            Um cuidado com seu pet
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push('/choose-profile')}
            style={{
              width: '100%',
              height: 60,
              backgroundColor: '#0A66C2',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text size={22} weight="700" color="#FFFFFF">
              Começar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}