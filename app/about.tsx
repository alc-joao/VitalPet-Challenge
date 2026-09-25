import {
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';

import { Text } from '@/src/components/atoms/Text';
import { useAppTheme } from '@/src/hooks/useAppTheme';

export default function About() {
  const { theme } = useAppTheme();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
      contentContainerStyle={{
        paddingHorizontal: 28,
        paddingTop: 58,
        paddingBottom: 50,
      }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.8}
        style={{
          width: 44,
          height: 44,
          justifyContent: 'center',
          marginBottom: 18,
        }}
      >
        <Text
          size={38}
          color={theme.text}
        >
          ‹
        </Text>
      </TouchableOpacity>

      <Text
        size={32}
        weight="700"
        color={theme.text}
      >
        Sobre o App
      </Text>

      <Text
        size={16}
        color={theme.textSecondary}
        style={{ marginTop: 8 }}
      >
        Informações sobre esta versão do VitalPet.
      </Text>

      <View
        style={{
          marginTop: 32,
          padding: 22,
          borderRadius: 18,
          backgroundColor: theme.surface,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <Text
          size={26}
          weight="700"
          color={theme.primary}
        >
          VitalPet
        </Text>

        <Text
          size={16}
          color={theme.textSecondary}
          style={{ marginTop: 8 }}
        >
          Cuidado e acompanhamento da saúde do seu pet.
        </Text>
      </View>

      <InfoCard
        title="Versão"
        value="4.0.0"
      />

      <InfoCard
        title="Entrega"
        value="Sprint 4 — Versão Final"
      />

      <InfoCard
        title="Commit da versão"
        value="8913d66"
        mono
      />

      <View
        style={{
          marginTop: 18,
          padding: 20,
          borderRadius: 18,
          backgroundColor: theme.surface,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <Text
          size={18}
          weight="700"
          color={theme.text}
        >
          Tecnologias
        </Text>

        <Text
          size={15}
          color={theme.textSecondary}
          style={{
            marginTop: 12,
            lineHeight: 24,
          }}
        >
          React Native • Expo • TypeScript{'\n'}
          Expo Router • React Query{'\n'}
          Firebase • Expo Notifications
        </Text>
      </View>

      <Text
        size={13}
        color={theme.textSecondary}
        style={{
          textAlign: 'center',
          marginTop: 34,
        }}
      >
        FIAP • Análise e Desenvolvimento de Sistemas
      </Text>
    </ScrollView>
  );
}

function InfoCard({
  title,
  value,
  mono = false,
}: {
  title: string;
  value: string;
  mono?: boolean;
}) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        marginTop: 14,
        padding: 18,
        borderRadius: 16,
        backgroundColor: theme.surface,
        borderWidth: 1,
        borderColor: theme.border,
      }}
    >
      <Text
        size={14}
        weight="700"
        color={theme.textSecondary}
      >
        {title}
      </Text>

      <Text
        size={17}
        weight="700"
        color={theme.text}
        style={{
          marginTop: 7,
          ...(mono
            ? { fontFamily: 'monospace' }
            : {}),
        }}
      >
        {value}
      </Text>
    </View>
  );
}
