import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';
import IconMedicine from '@/assets/icons/icon-medicine.svg';
import IconConsult from '@/assets/icons/icon-consult.svg';

const reminders = [
  {
    title: 'Vacina Raiva',
    pet: 'Thor',
    date: '20/06/2025',
    icon: <IconVaccine width={22} height={22} />,
  },
  {
    title: 'Vermífugo',
    pet: 'Mel',
    date: '25/06/2025',
    icon: <IconMedicine width={22} height={22} />,
  },
  {
    title: 'Retorno consulta',
    pet: 'Luna',
    date: '22/06/2025',
    icon: <IconConsult width={22} height={22} />,
  },
  {
    title: 'Exame de sangue',
    pet: 'Buddy',
    date: '30/06/2025',
    icon: <IconConsult width={22} height={22} />,
  },
];

export default function ClinicReminders() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 28,
        paddingTop: 58,
        paddingBottom: 34,
      }}
    >
      <TouchableOpacity
        onPress={() => router.push('/clinic-patient-history')}
        style={{
          width: 36,
          height: 36,
          justifyContent: 'center',
          marginBottom: 12,
        }}
      >
        <IconBack width={24} height={24} />
      </TouchableOpacity>

      <Text size={30} weight="700" color="#111827">
        Lembretes
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
        <TabButton label="Pendentes" active />
        <TabButton label="Concluídos" />
      </View>

      {reminders.map(item => (
        <View
          key={`${item.title}-${item.pet}`}
          style={{
            minHeight: 82,
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
              width: 42,
              height: 42,
              borderRadius: 10,
              backgroundColor: '#F1E8FF',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 14,
            }}
          >
            {item.icon}
          </View>

          <View style={{ flex: 1 }}>
            <Text size={17} weight="700" color="#111827">
              {item.title}
            </Text>

            <Text
              size={14}
              weight="600"
              color="#6B7280"
              style={{ marginTop: 4 }}
            >
              {item.pet}
            </Text>
          </View>

          <Text size={14} weight="700" color="#6B7280">
            {item.date}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        activeOpacity={0.85}
        style={{
          height: 58,
          borderRadius: 12,
          backgroundColor: '#6D28D9',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 80,
        }}
      >
        <Text size={18} weight="700" color="#FFFFFF">
          Novo lembrete
        </Text>
      </TouchableOpacity>
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