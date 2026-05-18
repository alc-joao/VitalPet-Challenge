import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';
import IconArrow from '@/assets/icons/icon-arrow-right.svg';

import IconHome from '@/assets/icons/icon-home.svg';
import IconPets from '@/assets/icons/icon-pets.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconMore from '@/assets/icons/icon-more.svg';
import IconChat from '@/assets/icons/icon-chat.svg';

import IconConsult from '@/assets/icons/icon-consult.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';
import IconMedicine from '@/assets/icons/icon-medicine.svg';

const historyItems = [
  {
    date: '10/05/2025',
    title: 'Consulta veterinária',
    subtitle: 'Dr. João Vitor\nCheck-up anual',
    color: '#6D28D9',
    icon: <IconConsult width={20} height={20} />,
  },
  {
    date: '20/04/2025',
    title: 'Vacina múltipla',
    subtitle: 'V8 • Protocolo anual',
    color: '#22C55E',
    icon: <IconVaccine width={20} height={20} />,
  },
  {
    date: '27/03/2025',
    title: 'Vermífugo',
    subtitle: 'Drontal Plus',
    color: '#FB923C',
    icon: <IconMedicine width={20} height={20} />,
  },
  {
    date: '15/03/2025',
    title: 'Exame de sangue',
    subtitle: 'Hemograma completo',
    color: '#8B5CF6',
    icon: <IconConsult width={20} height={20} />,
  },
  {
    date: '10/01/2025',
    title: 'Banho e tosa',
    subtitle: 'Higiene completa',
    color: '#FB7185',
    icon: <IconMedicine width={20} height={20} />,
  },
];

export default function ClinicPatientHistory() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 58,
          paddingBottom: 150,
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
          Histórico de Thor
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            marginTop: 22,
            marginBottom: 24,
          }}
        >
          <FilterButton label="Tudo" active />
          <FilterButton label="Consultas" />
          <FilterButton label="Vacinas" />
          <FilterButton label="Exames" />
        </View>

        <View style={{ paddingLeft: 14 }}>
          {historyItems.map((item, index) => (
            <TimelineItem
              key={`${item.date}-${item.title}`}
              item={item}
              last={index === historyItems.length - 1}
            />
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={{
            marginTop: 34,
            height: 58,
            borderRadius: 14,
            backgroundColor: '#6D28D9',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 4 },
            shadowOpacity: 0.18,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text size={18} weight="700" color="#FFFFFF">
            Exportar Histórico
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

function FilterButton({ label, active }: { label: string; active?: boolean }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        height: 34,
        paddingHorizontal: 17,
        borderRadius: 18,
        backgroundColor: active ? '#6D28D9' : '#FFFFFF',
        borderWidth: 1,
        borderColor: active ? '#6D28D9' : '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        size={13}
        weight="700"
        color={active ? '#FFFFFF' : '#6B7280'}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function TimelineItem({ item, last }: { item: any; last?: boolean }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        minHeight: 104,
      }}
    >
      <View
        style={{
          width: 42,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            borderWidth: 3,
            borderColor: item.color,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          {item.icon}
        </View>

        {!last && (
          <View
            style={{
              width: 3,
              flex: 1,
              backgroundColor: item.color,
              opacity: 0.35,
              marginTop: 4,
            }}
          />
        )}
      </View>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text
          size={13}
          weight="700"
          color="#6B7280"
          style={{ marginBottom: 8 }}
        >
          {item.date}
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          style={{
            minHeight: 72,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 14,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text size={17} weight="700" color="#111827">
              {item.title}
            </Text>

            <Text
              size={13}
              weight="600"
              color="#7D7D7D"
              style={{ marginTop: 3, lineHeight: 17 }}
            >
              {item.subtitle}
            </Text>
          </View>

          <IconArrow width={18} height={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function BottomNav() {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 86,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingHorizontal: 24,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <TabItem
        icon={<IconHome width={30} height={30} />}
        label="Home"
        onPress={() => router.push('/clinic-home')}
      />

      <TabItem
        icon={<IconPets width={30} height={30} />}
        label="Pacientes"
        active
        onPress={() => router.push('/clinic-patients')}
      />

      <TabItem
        icon={<IconCalendar width={30} height={30} />}
        label="Agenda"
        onPress={() => router.push('/clinic-schedule')}
      />

      <TabItem
        icon={<IconChat width={30} height={30} />}
        label="Financeiro"
        onPress={() => router.push('/clinic-finance')}
      />

      <TabItem
        icon={<IconMore width={30} height={30} />}
        label="Mais"
        onPress={() => router.push('/clinic-profile')}
      />
    </View>
  );
}

function TabItem({ icon, label, active, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={active}
      style={{
        width: 68,
        height: 70,
        borderRadius: 12,
        backgroundColor: active ? '#F1E8FF' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}

      <Text
        size={11}
        weight="700"
        color={active ? '#6D28D9' : '#7D7D7D'}
        style={{ marginTop: 3 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}