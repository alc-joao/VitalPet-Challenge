import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';
import IconCheck from '@/assets/icons/check-green.svg';

const plans = [
  {
    price: 'R$ 99',
    period: '/mês',
    name: 'Plano Básico',
    color: '#FF7A2F',
    description: 'Para clínicas pequenas que querem organizar atendimentos e pets.',
    button: 'PLANO ATUAL',
    features: [
      'Dashboard clínico',
      'Cadastro de pets e tutores',
      'Agenda de consultas',
      'Lembretes automáticos',
    ],
  },
  {
    price: 'R$ 199',
    period: '/mês',
    name: 'Plano Intermediário',
    color: '#268BFF',
    description: 'Para clínicas médias com mais pacientes e rotina de atendimento.',
    button: 'ASSINAR INTERMEDIÁRIO',
    features: [
      'Tudo do plano básico',
      'Histórico clínico completo',
      'Controle de vacinas',
      'Chat com tutores',
    ],
  },
  {
    price: 'R$ 399',
    period: '/mês',
    name: 'Plano Premium',
    color: '#00A83B',
    description: 'Para hospitais e redes que precisam de gestão avançada.',
    button: 'ASSINAR PREMIUM',
    features: [
      'Tudo do plano intermediário',
      'PetCare AI assistente',
      'Relatórios avançados',
      'Integração com WhatsApp',
    ],
  },
];

export default function PlansHome() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: 48,
        paddingBottom: 42,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => router.push('/more-home')}
          style={{ marginRight: 14 }}
        >
          <IconBack width={16} height={16} />
        </TouchableOpacity>

        <Text size={18} weight="700" color="#111827">
          Planos e Assinaturas
        </Text>
      </View>

      <Text
        size={14}
        color="#111827"
        align="center"
        style={{
          marginTop: 20,
          marginBottom: 28,
          lineHeight: 20,
          paddingHorizontal: 16,
        }}
      >
        Escolha o plano ideal para sua clínica gerenciar pacientes, consultas e
        históricos.
      </Text>

      {plans.map(plan => (
        <PlanCard key={plan.name} plan={plan} />
      ))}
    </ScrollView>
  );
}

function PlanCard({ plan }: { plan: any }) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 16,
        marginBottom: 36,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text size={36} weight="700" color="#0F172A">
          {plan.price}
        </Text>

        <Text
          size={13}
          color="#111827"
          style={{ marginLeft: 4, marginBottom: 8 }}
        >
          {plan.period}
        </Text>
      </View>

      <Text
        size={24}
        weight="600"
        color={plan.color}
        style={{ marginTop: 22 }}
      >
        {plan.name}
      </Text>

      <Text
        size={13}
        color="#111827"
        style={{
          marginTop: 12,
          lineHeight: 19,
          maxWidth: 240,
        }}
      >
        {plan.description}
      </Text>

      <View
        style={{
          height: 1,
          backgroundColor: '#EFEFEF',
          marginTop: 20,
          marginBottom: 16,
        }}
      />

      {plan.features.map((feature: string) => (
        <View
          key={feature}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          <IconCheck width={14} height={14} />

          <Text
            size={13}
            color="#111827"
            style={{
              marginLeft: 10,
              flex: 1,
            }}
          >
            {feature}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        activeOpacity={0.85}
        style={{
          alignSelf: 'center',
          backgroundColor: plan.color,
          borderRadius: 3,
          paddingHorizontal: 22,
          height: 34,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 12,
        }}
      >
        <Text size={11} weight="700" color="#FFFFFF">
          {plan.button}
        </Text>
      </TouchableOpacity>
    </View>
  );
}