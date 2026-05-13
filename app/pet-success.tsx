import { View, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

export default function PetSuccess() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingTop: 70,
        paddingBottom: 34,
        alignItems: 'center',
      }}
    >
      <Image
        source={require('@/assets/logos/logo-blue.svg')}
        style={{ width: 170, height: 100 }}
        resizeMode="contain"
      />

      <Text size={28} weight="700" color="#111827" align="center" style={{ marginTop: 60 }}>
        Tudo pronto! 🎉
      </Text>

      <Text size={17} color="#6B7280" align="center" style={{ marginTop: 14, marginBottom: 34 }}>
        Agora você pode acompanhar tudo do seu pet em um só lugar.
      </Text>

      {['Saúde em dia', 'Vacinas e consultas', 'Alertas inteligentes', 'Histórico completo'].map((item) => (
        <View
          key={item}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginBottom: 18,
            paddingLeft: 34,
          }}
        >
          <Text size={18}>✅</Text>
          <Text size={16} weight="600" color="#111827" style={{ marginLeft: 12 }}>
            {item}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        onPress={() => router.replace('/tutor-home')}
        style={{
          width: '100%',
          height: 56,
          backgroundColor: '#0A66C2',
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 'auto',
        }}
      >
        <Text size={17} weight="700" color="#FFFFFF">
          Salvar e continuar
        </Text>
      </TouchableOpacity>
    </View>
  );
}