import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';
import { useAppTheme } from '@/src/hooks/useAppTheme';

import IconBack from '@/assets/icons/icon-back.svg';
import IconMedicine from '@/assets/icons/icon-medicine.svg';

import IconHome from '@/assets/icons/icon-home.svg';
import IconScore from '@/assets/icons/icon-score.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconChat from '@/assets/icons/icon-chat.svg';
import IconMore from '@/assets/icons/icon-more.svg';

const medications = [
  {
    title: 'Antipulgas',
    subtitle: 'Bravecto 20–40kg',
    dosage: '1 comprimido • A cada 3 meses',
    nextDose: 'Próxima dose: 20/07/2026',
    status: 'Ativo',
    statusColor: '#008047',
    statusBg: '#BDF5D2',
  },
  {
    title: 'Probiótico',
    subtitle: 'Enterogemina',
    dosage: '5ml • 1x ao dia',
    nextDose: 'Próxima dose: 20/07/2026',
    status: 'Em uso',
    statusColor: '#FF2E2E',
    statusBg: '#FFD6D6',
  },
];

export default function MedicationsHome() {
  const { theme, isDark } = useAppTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.surface }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 28,
          paddingTop: 48,
          paddingBottom: 150,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push('/tutor-home')}
          style={{ marginBottom: 18 }}
        >
          <IconBack width={18} height={18} />
        </TouchableOpacity>

        <Text size={28} weight="700" color={theme.text}>
          Medicações
        </Text>

        <Text size={17} color={theme.textSecondary} style={{ marginTop: 4 }}>
          Acompanhe os medicamentos do Iron
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <TabButton label="Ativos" active />
          <TabButton label="Finalizados" />
        </View>

        {medications.map(item => (
          <MedicationCard key={item.title} item={item} />
        ))}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.85}
        style={{
          position: 'absolute',
          left: 28,
          right: 28,
          bottom: 116,
          height: 58,
          backgroundColor: theme.primary,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text size={18} color="#FFFFFF">
          Adicionar medicação
        </Text>
      </TouchableOpacity>

      <BottomNav />
    </View>
  );
}

function TabButton({ label, active }: { label: string; active?: boolean }) {
  const { theme, isDark } = useAppTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        width: '48%',
        height: 42,
        borderRadius: 14,
        backgroundColor: active ? theme.primary : theme.tabInactive,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text size={16} color={active ? theme.primaryText : theme.text}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function MedicationCard({ item }: any) {
  const { theme, isDark } = useAppTheme();
  return (
    <View
      style={{
        minHeight: 126,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 16,
        backgroundColor: theme.surface,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 18,
        marginBottom: 14,
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 6,
          backgroundColor: theme.surfaceSecondary,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 22,
          marginTop: 18,
        }}
      >
        <IconMedicine width={31} height={31} />
      </View>

      <View style={{ flex: 1 }}>
        <Text size={21} weight="700" color={theme.text}>
          {item.title}
        </Text>

        <Text size={16} weight="700" color={theme.textSecondary} style={{ marginTop: 4 }}>
          {item.subtitle}
        </Text>

        <Text size={16} weight="700" color={theme.textSecondary} style={{ marginTop: 8 }}>
          {item.dosage}
        </Text>

        <Text size={16} weight="700" color={theme.textSecondary} style={{ marginTop: 8 }}>
          {item.nextDose}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: item.statusBg,
          borderRadius: 6,
          paddingHorizontal: 9,
          paddingVertical: 5,
        }}
      >
        <Text size={14} weight="700" color={item.statusColor}>
          {item.status}
        </Text>
      </View>
    </View>
  );
}

function BottomNav() {
  const { theme, isDark } = useAppTheme();
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
        paddingHorizontal: 28,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <TabItem icon={<IconHome width={30} height={30} />} label="Home" onPress={() => router.push('/tutor-home')} />
      <TabItem icon={<IconScore width={30} height={30} />} label="Score" onPress={() => router.push('/score-home')} />
      <TabItem icon={<IconCalendar width={30} height={30} />} label="Histórico" onPress={() => router.push('/history-home')} />
      <TabItem icon={<IconChat width={30} height={30} />} label="Chat" onPress={() => router.push('/chat-home')} />
      <TabItem icon={<IconMore width={30} height={30} />} label="Mais" onPress={() => router.push('/more-home')} />
    </View>
  );
}

function TabItem({ icon, label, active, onPress }: any) {
  const { theme, isDark } = useAppTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={active}
      style={{
        width: 60,
        height: 70,
        borderRadius: 12,
        backgroundColor: active ? theme.surfaceSecondary : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}

      <Text size={11} weight="700" color={active ? theme.primary : theme.textSecondary} style={{ marginTop: 3 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}