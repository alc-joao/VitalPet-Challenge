import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';
import { useAppTheme } from '@/src/hooks/useAppTheme';

import IconBack from '@/assets/icons/icon-back.svg';
import IconHome from '@/assets/icons/icon-home.svg';
import IconPets from '@/assets/icons/icon-pets.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconFinance from '@/assets/icons/icon-finance.svg';
import IconMore from '@/assets/icons/icon-more.svg';

const historyItems = [
  {
    date: '10/05/2025',
    title: 'Consulta veterinária',
    subtitle: 'Dr. João Vitor • Check-up anual',
    color: '#7C3AED',
  },
  {
    date: '20/04/2025',
    title: 'Vacina múltipla',
    subtitle: 'V8 • Protocolo anual',
    color: '#16A34A',
  },
  {
    date: '27/03/2025',
    title: 'Vermífugo',
    subtitle: 'Drontal Plus',
    color: '#F97316',
  },
  {
    date: '18/03/2025',
    title: 'Exame de sangue',
    subtitle: 'Hemograma completo',
    color: '#8B5CF6',
  },
  {
    date: '15/01/2025',
    title: 'Banho e tosa',
    subtitle: 'Higiene completa',
    color: '#EF4444',
  },
];

export default function ClinicPatientHistory() {
  const { theme } = useAppTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 58,
          paddingBottom: 140,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push('/clinic-patient-detail')}
          style={{
            width: 36,
            height: 36,
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <IconBack width={24} height={24} />
        </TouchableOpacity>

        <Text size={34} weight="700" color={theme.text}>
          Histórico de Thor
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 22,
            marginBottom: 24,
          }}
        >
          <FilterButton label="Tudo" active />
          <FilterButton label="Consultas" />
          <FilterButton label="Vacinas" />
          <FilterButton label="Exames" />
        </View>

        {historyItems.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              marginBottom: 18,
            }}
          >
            <View
              style={{
                width: 30,
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  backgroundColor: item.color,
                }}
              />

              {index < historyItems.length - 1 && (
                <View
                  style={{
                    width: 3,
                    flex: 1,
                    backgroundColor: theme.surfaceSecondary,
                    marginTop: 4,
                  }}
                />
              )}
            </View>

            <View style={{ flex: 1 }}>
              <Text
                size={13}
                weight="700"
                color={theme.textSecondary}
                style={{ marginBottom: 6 }}
              >
                {item.date}
              </Text>

              <TouchableOpacity
                activeOpacity={0.85}
                style={{
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <Text size={18} weight="700" color={theme.text}>
                  {item.title}
                </Text>

                <Text
                  size={14}
                  weight="600"
                  color={theme.textSecondary}
                  style={{ marginTop: 6 }}
                >
                  {item.subtitle}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/clinic-reminders')}
          style={{
            marginTop: 28,
            height: 58,
            borderRadius: 16,
            backgroundColor: '#6D28D9',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text size={18} weight="700" color="#FFFFFF">
            Ver lembretes
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

function FilterButton({ label, active }: any) {
  const { theme } = useAppTheme();
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 16,
        height: 40,
        borderRadius: 20,
        backgroundColor: active ? '#6D28D9' : '#FFFFFF',
        borderWidth: 1,
        borderColor: active ? '#6D28D9' : '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text size={14} weight="700" color={active ? '#FFFFFF' : '#6B7280'}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function BottomNav() {
  const { theme } = useAppTheme();
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 86,
        backgroundColor: theme.surface,
        borderTopWidth: 1,
        borderTopColor: theme.border,
        paddingHorizontal: 24,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <TabItem
        icon={<IconHome width={28} height={28} />}
        label="Home"
        onPress={() => router.push('/clinic-home')}
      />

      <TabItem icon={<IconPets width={28} height={28} />} label="Pacientes" active />

      <TabItem
        icon={<IconCalendar width={28} height={28} />}
        label="Agenda"
        onPress={() => router.push('/clinic-schedule')}
      />

      <TabItem
        icon={<IconFinance width={28} height={28} />}
        label="Financeiro"
        onPress={() => router.push('/clinic-finance')}
      />

      <TabItem
        icon={<IconMore width={28} height={28} />}
        label="Mais"
        onPress={() => router.push('/clinic-profile')}
      />
    </View>
  );
}

function TabItem({ icon, label, active, onPress }: any) {
  const { theme } = useAppTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={active}
      style={{
        width: 68,
        height: 70,
        borderRadius: 12,
        backgroundColor: active ? theme.surfaceSecondary : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}

      <Text
        size={11}
        weight="700"
        color={active ? '#6D28D9' : theme.textSecondary}
        style={{ marginTop: 4 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}