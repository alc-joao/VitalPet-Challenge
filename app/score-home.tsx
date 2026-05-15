import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBell from '@/assets/icons/icon-bell.svg';
import IconHome from '@/assets/icons/icon-home.svg';
import IconScore from '@/assets/icons/icon-score.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconChat from '@/assets/icons/icon-chat.svg';
import IconMore from '@/assets/icons/icon-more.svg';

const PetRex = require('@/assets/images/pitbul.png');
const PetIron = require('@/assets/images/rotwailler.png');

const pets = [
  {
    key: 'rex',
    name: 'Rex',
    breed: 'Golden Retriever',
    score: 85,
    image: PetRex,
    status: 'Saudável',
  },
  {
    key: 'iron',
    name: 'Iron',
    breed: 'Rottweiler',
    score: 62,
    image: PetIron,
    status: 'Atenção',
  },
];

export default function ScoreHome() {
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text size={28} weight="700" color="#111827">
              Score de Saúde
            </Text>

            <Text size={18} color="#6B7280">
              Veja a saúde geral dos seus pets
            </Text>
          </View>

          <TouchableOpacity style={{ marginTop: 8 }}>
            <IconBell width={26} height={26} />
          </TouchableOpacity>
        </View>

        <Text
          size={22}
          weight="700"
          color="#111827"
          style={{ marginTop: 34, marginBottom: 20 }}
        >
          Meus pets
        </Text>

        {pets.map(pet => (
          <PetScoreCard key={pet.key} pet={pet} />
        ))}
      </ScrollView>

      <BottomNav />
    </View>
  );
}

function PetScoreCard({ pet }: any) {
  const progressColor = pet.score >= 80 ? '#16A34A' : '#EAB308';

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/pet-score-detail',
          params: { pet: pet.key },
        })
      }
      activeOpacity={0.9}
      style={{
        height: 122,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          overflow: 'hidden',
        }}
      >
        <Image
          source={pet.image}
          style={{ width: 64, height: 64 }}
          resizeMode="cover"
        />
      </View>

      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text size={22} weight="700" color="#111827">
          {pet.name}
        </Text>

        <Text size={15} color="#6B7280">
          {pet.breed}
        </Text>

        <Text
          size={14}
          weight="700"
          color={progressColor}
          style={{ marginTop: 8 }}
        >
          {pet.status}
        </Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Text size={30} weight="700" color="#111827">
          {pet.score}
        </Text>

        <Text size={13} color="#6B7280">
          Score
        </Text>
      </View>
    </TouchableOpacity>
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
        active
      />

      <TabItem
        icon={<IconCalendar width={31} height={31} />}
        label="Histórico"
        onPress={() => router.push('/history-home')}
      />

      <TabItem icon={<IconChat width={31} height={31} />} label="Chat" />
      <TabItem icon={<IconMore width={31} height={31} />} label="Mais" />
    </View>
  );
}

function TabItem({ icon, label, active, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
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