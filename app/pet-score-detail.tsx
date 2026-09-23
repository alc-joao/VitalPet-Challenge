import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';
import Svg, { Circle } from 'react-native-svg';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import type { AppTheme } from '@/src/constants/theme';

import IconBack from '@/assets/icons/icon-back.svg';
import IconBell from '@/assets/icons/icon-bell.svg';

const petsData: any = {
  iron: {
    name: 'Iron',
    score: 85,
    status: 'Saudável',
    factors: [
      { label: 'Alimentação', value: 80 },
      { label: 'Exercícios', value: 70 },
      { label: 'Vacinas', value: 90 },
      { label: 'Consultas', value: 65 },
      { label: 'Hidratação', value: 75 },
    ],
  },
  rex: {
    name: 'Rex',
    score: 92,
    status: 'Excelente',
    factors: [
      { label: 'Alimentação', value: 90 },
      { label: 'Exercícios', value: 95 },
      { label: 'Vacinas', value: 95 },
      { label: 'Consultas', value: 88 },
      { label: 'Hidratação', value: 92 },
    ],
  },
};

export default function PetScoreDetail() {
  const { theme } = useAppTheme();
  const params = useLocalSearchParams();
  const petKey = params.pet === 'rex' ? 'rex' : 'iron';
  const pet = petsData[petKey];

  const radius = 96;
  const strokeWidth = 16;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (circumference * pet.score) / 100;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 64,
          paddingBottom: 40,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                marginRight: 14,
                marginTop: 4,
                width: 24,
                height: 28,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconBack width={13} height={22} />
            </TouchableOpacity>

            <View>
              <Text size={28} weight="700" color={theme.text}>
                Score de Saúde
              </Text>

              <Text size={17} color={theme.textSecondary}>
                Entenda a saúde do {pet.name}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={{ marginTop: 4 }}>
            <IconBell width={26} height={26} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 34,
          }}
        >
          <View style={{ width: 240, height: 240 }}>
            <Svg width="240" height="240">
              <Circle
                cx="120"
                cy="120"
                r={radius}
                stroke={theme.border}
                strokeWidth={strokeWidth}
                fill="none"
              />

              <Circle
                cx="120"
                cy="120"
                r={radius}
                stroke="#16A34A"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={progress}
                strokeLinecap="round"
                rotation="-90"
                origin="120,120"
              />
            </Svg>

            <View
              style={{
                position: 'absolute',
                top: 70,
                left: 0,
                right: 0,
                alignItems: 'center',
              }}
            >
              <Text size={54} weight="700" color={theme.text}>
                {pet.score}
              </Text>

              <Text size={17} weight="700" color={theme.textSecondary}>
                De 100
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#BDF5D2',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 6,
              marginTop: 6,
            }}
          >
            <Text size={16} weight="700" color="#008047">
              {pet.status}
            </Text>
          </View>

          <Text
            size={18}
            weight="700"
            color={theme.textSecondary}
            align="center"
            style={{ marginTop: 24, lineHeight: 30 }}
          >
            {pet.name} está com a saúde ótima! 👏{'\n'}
            Mantenha os cuidados e continue{'\n'}
            acompanhando.
          </Text>
        </View>

        <Text
          size={22}
          weight="700"
          color={theme.text}
          style={{ marginTop: 34, marginBottom: 20 }}
        >
          Fatores que influenciam
        </Text>

        {pet.factors.map((factor: any) => (
          <FactorBar key={factor.label} {...factor} theme={theme} />
        ))}

        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: theme.primary,
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}
        >
          <Text size={20} weight="700" color={theme.primaryText}>
            Ver recomendações
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function FactorBar({ label, value, theme }: {
  label: string;
  value: number;
  theme: AppTheme;
}) {
  return (
    <View style={{ marginBottom: 22 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <Text size={17} color={theme.textSecondary}>
          {label}
        </Text>

        <Text size={17} weight="700" color={theme.text}>
          {value}
          <Text color={theme.textSecondary}>/100</Text>
        </Text>
      </View>

      <View
        style={{
          height: 6,
          backgroundColor: theme.surfaceSecondary,
          borderRadius: 999,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${value}%`,
            height: '100%',
            backgroundColor: '#16A34A',
            borderRadius: 999,
          }}
        />
      </View>
    </View>
  );
}