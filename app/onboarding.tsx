import { View, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/src/components/atoms/Text';

export default function Onboarding() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 0.72, position: 'relative' }}>
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
            'rgba(14, 23, 39, 0)',
            'rgba(252, 252, 252, 0.48)',
            '#FCFCFC',
          ]}
          locations={[0, 0.36, 0.48]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 240,
          }}
        />

        <View
          style={{
            position: 'absolute',
            top: 60,
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
      </View>

      <View
        style={{
          flex: 0.28,
          backgroundColor: '#FFFFFF',
          marginTop: -35,
          borderTopLeftRadius: 34,
          borderTopRightRadius: 34,
          paddingHorizontal: 28,
          paddingTop: 20,
          paddingBottom: 30,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text
            size={30}
            weight="700"
            color="#075BAD"
            align="center"
          >
            Bem Vindo(a) ao{'\n'}Clyvo VitalPet
          </Text>

          <Text
            size={17}
            color="#0A66C2"
            align="center"
            style={{ marginTop: 8 }}
          >
            Um cuidado com seu pet
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/choose-profile')}
          style={{
            width: '100%',
            height: 58,
            backgroundColor: '#0A66C2',
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 18,
          }}
        >
          <Text size={18} weight="700" color="#FFFFFF">
            Começar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}