import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';

export default function ClinicVaccines() {
  const vaccines = [
    {
      title: 'Próxima vacina',
      subtitle: 'Polivalente',
      date: '20/06/2025',
    },
    {
      title: 'Raiva',
      subtitle: '',
      date: '20/05/2025',
    },
    {
      title: 'Gripe Canina',
      subtitle: '',
      date: '20/07/2025',
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: 58,
        paddingBottom: 34,
      }}
    >
      <TouchableOpacity
        onPress={() => router.push('/clinic-patient-detail')}
        style={{
          width: 36,
          height: 36,
          justifyContent: 'center',
          marginBottom: 12,
        }}
      >
        <IconBack width={24} height={24} />
      </TouchableOpacity>

      <Text size={28} weight="700" color="#111827">
        Vacinas e Protocolos
      </Text>

      <View
        style={{
          height: 42,
          borderRadius: 18,
          backgroundColor: '#F3F4F6',
          flexDirection: 'row',
          marginTop: 20,
          marginBottom: 28,
          padding: 4,
        }}
      >
        <TabButton label="Próximas" active />
        <TabButton label="Histórico" />
      </View>

      {vaccines.map((item) => (
        <View
          key={item.title}
          style={{
            minHeight: 78,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 16,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            marginBottom: 14,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: '#F1E8FF',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 14,
            }}
          >
            <IconVaccine width={22} height={22} />
          </View>

          <View style={{ flex: 1 }}>
            <Text size={16} weight="700" color="#6D28D9">
              {item.title}
            </Text>

            {item.subtitle ? (
              <Text
                size={14}
                weight="600"
                color="#6B7280"
                style={{ marginTop: 4 }}
              >
                {item.subtitle}
              </Text>
            ) : null}
          </View>

          <Text size={14} weight="700" color="#6B7280">
            {item.date}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        activeOpacity={0.85}
        style={{
          height: 56,
          borderRadius: 12,
          backgroundColor: '#6D28D9',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 22,
        }}
      >
        <Text size={18} weight="700" color="#FFFFFF">
          Adicionar vacina
        </Text>
      </TouchableOpacity>

      <View
        style={{
          borderWidth: 1,
          borderColor: '#E5E7EB',
          borderRadius: 16,
          padding: 16,
          marginTop: 30,
        }}
      >
        <Text size={16} weight="700" color="#111827">
          Protocolo vigente
        </Text>

        <Text
          size={15}
          weight="700"
          color="#111827"
          style={{ marginTop: 14 }}
        >
          Protocolo anual
        </Text>

        <Text
          size={14}
          weight="600"
          color="#6B7280"
          style={{ marginTop: 4, lineHeight: 20 }}
        >
          V8 • Raiva • Gripe{'\n'}Iniciado em 20/04/2025
        </Text>
      </View>
    </ScrollView>
  );
}

function TabButton({ label, active }: { label: string; active?: boolean }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        flex: 1,
        height: 34,
        borderRadius: 16,
        backgroundColor: active ? '#F1E8FF' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text size={14} weight="700" color={active ? '#6D28D9' : '#6B7280'}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}