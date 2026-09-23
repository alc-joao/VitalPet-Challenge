import { View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';
import { useAppTheme } from '@/src/hooks/useAppTheme';

import LogoBlue from '@/assets/logos/logo-blue.svg';
import IconCheck from '@/assets/icons/check-green.svg';

const items = [
  'Saúde em dia',
  'Vacinas e consultas',
  'Alertas inteligentes',
  'Histórico completo',
];

export default function PetSuccess() {
  const { theme } = useAppTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: 36,
        paddingTop: 30,
        paddingBottom: 30,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text size={40} color={theme.text}>
          ‹
        </Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <LogoBlue width={170} height={170} />
      </View>

      <Text
        size={30}
        weight="700"
        color={theme.text}
        align="center"
        style={{ marginTop: 30 }}
      >
        Tudo pronto! 🎉
      </Text>

      <Text
        size={20}
        color={theme.textSecondary}
        align="center"
        style={{
          marginTop: 22,
          marginBottom: 30,
          lineHeight: 28,
        }}
      >
        Agora você pode acompanhar{'\n'}
        tudo do seu pet em um só lugar.
      </Text>

      <View style={{ paddingLeft: 30 }}>
        {items.map(item => (
          <View
            key={item}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 28,
            }}
          >
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                backgroundColor: '#D8FFD9',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 25,
              }}
            >
              <IconCheck width={18} height={18} />
            </View>

            <Text size={20} weight="700" color={theme.text}>
              {item}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => router.replace('/tutor-home')}
        style={{
          height: 64,
          backgroundColor: theme.primary,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 'auto',
        }}
      >
        <Text size={22} weight="700" color={theme.primaryText}>
          Salvar e continuar
        </Text>
      </TouchableOpacity>
    </View>
  );
}