import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';

import IconHome from '@/assets/icons/icon-home.svg';
import IconScore from '@/assets/icons/icon-score.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconChat from '@/assets/icons/icon-chat.svg';
import IconMore from '@/assets/icons/icon-more.svg';

const vaccines = [
  {
    title: 'Vacina múltipla',
    subtitle: 'v10',
    date: '20/05/2026',
    days: 'Faltam 5 dias',
  },
  {
    title: 'Raiva',
    subtitle: 'Antirrábica',
    date: '20/04/2026',
    days: 'Faltam 35 dias',
  },
  {
    title: 'Gripe canina',
    subtitle: 'Nobivac kc',
    date: '28/05/2026',
    days: 'Faltam 9 dias',
  },
];

export default function VaccinesHome() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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

        <Text size={28} weight="700" color="#0F172A">
          Vacinas
        </Text>

        <Text size={17} color="#7D7D7D" style={{ marginTop: 4 }}>
          Controle de vacinas Rex
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <TabButton label="Próximas" active />
          <TabButton label="Histórico" />
        </View>

        {vaccines.map(item => (
          <VaccineCard key={item.title} item={item} />
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
          backgroundColor: '#0A66C2',
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text size={18} color="#FFFFFF">
          Adicionar vacinas
        </Text>
      </TouchableOpacity>

      <BottomNav />
    </View>
  );
}

function TabButton({ label, active }: { label: string; active?: boolean }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        width: '48%',
        height: 42,
        borderRadius: 14,
        backgroundColor: active ? '#0A66C2' : '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text size={16} color={active ? '#FFFFFF' : '#000000'}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function VaccineCard({
  item,
}: {
  item: {
    title: string;
    subtitle: string;
    date: string;
    days: string;
  };
}) {
  return (
    <View
      style={{
        minHeight: 126,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
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
          backgroundColor: '#D7E9FF',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 22,
          marginTop: 14,
        }}
      >
        <IconVaccine width={31} height={31} />
      </View>

      <View style={{ flex: 1 }}>
        <Text size={21} weight="700" color="#000000">
          {item.title}
        </Text>

        <Text size={16} weight="700" color="#7D7D7D" style={{ marginTop: 4 }}>
          {item.subtitle}
        </Text>

        <Text size={16} weight="700" color="#7D7D7D" style={{ marginTop: 8 }}>
          {item.date}
        </Text>

        <Text size={16} weight="700" color="#7D7D7D" style={{ marginTop: 8 }}>
          {item.days}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#F5F3B8',
          borderRadius: 6,
          paddingHorizontal: 9,
          paddingVertical: 5,
        }}
      >
        <Text size={14} weight="700" color="#FF2E2E">
          Pendente
        </Text>
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
        paddingHorizontal: 28,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <TabItem
        icon={<IconHome width={30} height={30} />}
        label="Home"
        onPress={() => router.push('/tutor-home')}
      />

      <TabItem
        icon={<IconScore width={30} height={30} />}
        label="Score"
        onPress={() => router.push('/score-home')}
      />

      <TabItem
        icon={<IconCalendar width={30} height={30} />}
        label="Histórico"
        onPress={() => router.push('/history-home')}
      />

      <TabItem
        icon={<IconChat width={30} height={30} />}
        label="Chat"
        onPress={() => router.push('/chat-home')}
      />

      <TabItem
        icon={<IconMore width={30} height={30} />}
        label="Mais"
        onPress={() => router.push('/more-home')}
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
        width: 60,
        height: 70,
        borderRadius: 12,
        backgroundColor: active ? '#E8F1FF' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}

      <Text
        size={11}
        weight="700"
        color={active ? '#0A66C2' : '#7D7D7D'}
        style={{ marginTop: 3 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}