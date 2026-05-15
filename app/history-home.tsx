import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconHome from '@/assets/icons/icon-home.svg';
import IconScore from '@/assets/icons/icon-score.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconChat from '@/assets/icons/icon-chat.svg';
import IconMore from '@/assets/icons/icon-more.svg';

import IconArrowRight from '@/assets/icons/icon-arrow-right.svg';

import IconHistoryConsult from '@/assets/icons/icon-history-consult.svg';
import IconHistoryVaccine from '@/assets/icons/icon-history-vaccine.svg';
import IconHistoryWorm from '@/assets/icons/icon-history-worm.svg';
import IconHistoryExam from '@/assets/icons/icon-history-exam.svg';
import IconHistoryBath from '@/assets/icons/icon-history-bath.svg';

const historyItems = [
  {
    date: '10/05/2025',
    title: 'Consulta veterinária',
    subtitle: 'Dr. Pedro Martins\nCheck-up anual',
    color: '#0A66C2',
    icon: <IconHistoryConsult width={34} height={34} />,
  },
  {
    date: '10/05/2025',
    title: 'Vacina multipla',
    subtitle: 'Preotocolo polivalente',
    color: '#FF0000',
    icon: <IconHistoryVaccine width={34} height={34} />,
  },
  {
    date: '10/05/2025',
    title: 'Vermífugo',
    subtitle: 'Drontal Plus',
    color: '#109B00',
    icon: <IconHistoryWorm width={34} height={34} />,
  },
  {
    date: '10/05/2025',
    title: 'Exame de Sangue',
    subtitle: 'Homografia completo',
    color: '#C7D900',
    icon: <IconHistoryExam width={34} height={34} />,
  },
  {
    date: '10/05/2025',
    title: 'Banho e tosa',
    subtitle: 'Higiene completa',
    color: '#D600A8',
    icon: <IconHistoryBath width={34} height={34} />,
  },
];

export default function HistoryHome() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 25,
          paddingTop: 50,
          paddingBottom: 140,
        }}
      >
        <Text size={28} weight="700" color="#0F172A">
          Histórico de Saúde
        </Text>

        <Text size={19} color="#7D7D7D" style={{ marginTop: 4 }}>
          Acompanhe todo o histórico do Iron
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 26,
            marginBottom: 34,
          }}
        >
          <FilterButton label="Tudo" active />
          <FilterButton label="Consultas" />
          <FilterButton label="Vacinas" />
          <FilterButton label="Exames" />
        </View>

        <View>
          {historyItems.map((item, index) => (
            <TimelineItem
              key={`${item.title}-${index}`}
              item={item}
              isLast={index === historyItems.length - 1}
            />
          ))}
        </View>

        <TouchableOpacity
          style={{
            height: 66,
            backgroundColor: '#0A66C2',
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 42,
          }}
        >
          <Text size={22} weight="700" color="#FFFFFF">
            Exportar Histórico
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

function FilterButton({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: active ? '#0A66C2' : '#FFFFFF',
        borderWidth: active ? 0 : 1,
        borderColor: '#000000',
        borderRadius: 18,
        paddingHorizontal: 14,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        size={16}
        weight="700"
        color={active ? '#FFFFFF' : '#000000'}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function TimelineItem({
  item,
  isLast,
}: {
  item: any;
  isLast: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 22,
      }}
    >
      <View style={{ width: 74, alignItems: 'center' }}>
        <View
          style={{
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: item.color,
            marginBottom: 8,
          }}
        />

        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            borderWidth: 4,
            borderColor: item.color,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
          }}
        >
          {item.icon}
        </View>

        {!isLast && (
          <View
            style={{
              width: 4,
              height: 52,
              backgroundColor: '#D9D9D9',
              marginTop: 12,
            }}
          />
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Text size={17} color="#7D7D7D" style={{ marginBottom: 22 }}>
          {item.date}
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          style={{
            minHeight: 82,
            borderWidth: 1,
            borderColor: '#D1D5DB',
            borderRadius: 14,
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 18,
            paddingVertical: 14,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 3, height: 4 },
            shadowOpacity: 0.14,
            shadowRadius: 3,
            elevation: 4,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text size={20} weight="700" color="#000000">
              {item.title}
            </Text>

            <Text size={17} color="#7D7D7D" style={{ marginTop: 4 }}>
              {item.subtitle}
            </Text>
          </View>

          <IconArrowRight width={24} height={24} />
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
        height: 100,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingHorizontal: 28,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 99,
        elevation: 99,
      }}
    >
      <TabItem
        icon={<IconHome width={31} height={31} />}
        label="Home"
        onPress={() => router.push('/tutor-home')}
      />

      <TabItem
        icon={<IconScore width={31} height={31} />}
        label="Score"
        onPress={() => router.push('/score-home')}
      />

      <TabItem
        icon={<IconCalendar width={31} height={31} />}
        label="Histórico"
        active
      />

      <TabItem
        icon={<IconChat width={31} height={31} />}
        label="Chat"
        onPress={() => router.push('/chat-home')}
      />

      <TabItem
        icon={<IconMore width={31} height={31} />}
        label="Mais"
        onPress={() => router.push('/more-home')}
      />
    </View>
  );
}

function TabItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={active}
      style={{
        width: 70,
        height: 76,
        borderRadius: 14,
        backgroundColor: active ? '#E8F1FF' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}

      <Text
        size={12}
        weight="700"
        color={active ? '#0A66C2' : '#7D7D7D'}
        style={{ marginTop: 4 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}