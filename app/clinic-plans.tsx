import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';

const plans = [
  {
    price: 'R$ 199',
    name: 'Starter',
    color: '#F97316',
    button: 'Plano atual',
    current: true,
    features: [
      'Até 100 pacientes cadastrados',
      'Agenda veterinária',
      'Histórico de vacinas',
      'Consultas e retornos',
      '2 veterinários ativos',
      'Relatórios básicos',
    ],
  },
  {
    price: 'R$ 399',
    name: 'Premium',
    color: '#3B82F6',
    button: 'Fazer upgrade',
    features: [
      'Pacientes ilimitados',
      'Financeiro completo',
      'Controle de exames',
      'Lembretes automáticos',
      'Até 10 veterinários',
      'Dashboard avançado',
      'Relatórios completos',
      'Controle de emergência',
    ],
  },
  {
    price: 'R$ 899',
    name: 'Enterprise',
    color: '#22C55E',
    button: 'Entrar em contato',
    features: [
      'Multiunidades',
      'Veterinários ilimitados',
      'Controle de permissões',
      'API exclusiva',
      'Suporte prioritário 24h',
      'Backup em nuvem',
      'Análises inteligentes',
      'Gestão completa da clínica',
      'Treinamento da equipe',
    ],
  },
];

export default function ClinicPlans() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 56,
          paddingBottom: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            marginBottom: 8,
          }}
        >
          <IconBack width={24} height={24} />
        </TouchableOpacity>

        <Text size={30} weight="700" color="#111827">
          Planos e assinaturas
        </Text>

        <Text
          size={15}
          weight="600"
          color="#6B7280"
          style={{
            marginTop: 12,
            lineHeight: 22,
          }}
        >
          Escolha o plano ideal para gerenciar sua clínica com mais recursos.
        </Text>

        {plans.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}
      </ScrollView>
    </View>
  );
}

function PlanCard({ plan }: any) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 18,
        padding: 20,
        marginTop: 26,
        backgroundColor: '#FFFFFF',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text size={42} weight="700" color="#111827">
          {plan.price}
        </Text>

        <Text
          size={14}
          weight="600"
          color="#111827"
          style={{ marginBottom: 9, marginLeft: 6 }}
        >
          /mês
        </Text>
      </View>

      <Text
        size={24}
        weight="700"
        color={plan.color}
        style={{ marginTop: 26 }}
      >
        {plan.name}
      </Text>

      <Text
        size={14}
        weight="500"
        color="#111827"
        style={{
          marginTop: 10,
          lineHeight: 21,
        }}
      >
        Recursos pensados para melhorar a organização, gestão e atendimento da clínica.
      </Text>

      <View
        style={{
          height: 1,
          backgroundColor: '#F1F1F1',
          marginTop: 18,
          marginBottom: 14,
        }}
      />

      {plan.features.map((feature: string, index: number) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text size={18} weight="700" color={plan.color} style={{ width: 24 }}>
            ✓
          </Text>

          <Text size={14} weight="500" color="#111827">
            {feature}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        activeOpacity={0.8}
        disabled={plan.current}
        style={{
          height: 44,
          borderRadius: 6,
          backgroundColor: plan.color,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          paddingHorizontal: 22,
          marginTop: 22,
          opacity: plan.current ? 0.85 : 1,
        }}
      >
        <Text size={12} weight="700" color="#FFFFFF">
          {plan.button}
        </Text>
      </TouchableOpacity>
    </View>
  );
}