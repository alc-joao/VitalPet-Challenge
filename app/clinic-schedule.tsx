import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';
import IconHome from '@/assets/icons/icon-home.svg';
import IconPets from '@/assets/icons/icon-pets.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconFinance from '@/assets/icons/icon-finance.svg';
import IconMore from '@/assets/icons/icon-more.svg';

const PetThor = require('@/assets/images/pitbul.png');
const PetMel = require('@/assets/images/rotwailler.png');
const PetBuddy = require('@/assets/images/pitbul.png');
const PetLuna = require('@/assets/images/rotwailler.png');
const PetRex = require('@/assets/images/pitbul.png');

const weekDays = [
  { day: 'Seg', date: '19' },
  { day: 'Ter', date: '20', active: true },
  { day: 'Qua', date: '21' },
  { day: 'Qui', date: '22' },
  { day: 'Sex', date: '23' },
];

const appointments = [
  {
    time: '08:00',
    pet: 'Thor Martins',
    tutor: 'Consulta',
    type: 'Consulta',
    image: PetThor,
  },
  {
    time: '09:00',
    pet: 'Mel',
    tutor: 'Retorno',
    type: 'Retorno',
    image: PetMel,
  },
  {
    time: '10:00',
    pet: 'Buddy',
    tutor: 'Vacina',
    type: 'Vacina',
    image: PetBuddy,
  },
  {
    time: '11:00',
    pet: 'Luna',
    tutor: 'Consulta',
    type: 'Consulta',
    image: PetLuna,
  },
  {
    time: '14:00',
    pet: 'Rex',
    tutor: 'Exame',
    type: 'Exame',
    image: PetRex,
  },
];

export default function ClinicSchedule() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 58,
          paddingBottom: 140,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push('/clinic-home')}
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
          Agenda de hoje
        </Text>

        <Text
          size={16}
          weight="600"
          color="#6B7280"
          style={{ marginTop: 4 }}
        >
          Quinta, 20 de Maio
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            marginTop: 24,
            paddingBottom: 4,
          }}
        >
          {weekDays.map(item => (
            <TouchableOpacity
              key={item.date}
              activeOpacity={0.85}
              style={{
                width: 66,
                height: 74,
                borderRadius: 18,
                backgroundColor: item.active ? '#6D28D9' : '#F3F4F6',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                size={14}
                weight="700"
                color={item.active ? '#FFFFFF' : '#6B7280'}
              >
                {item.day}
              </Text>

              <Text
                size={24}
                weight="700"
                color={item.active ? '#FFFFFF' : '#111827'}
                style={{ marginTop: 4 }}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ marginTop: 26 }}>
          {appointments.map(item => (
            <AppointmentCard key={`${item.time}-${item.pet}`} item={item} />
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={{
            marginTop: 34,
            height: 58,
            borderRadius: 16,
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
            Ver agenda completa
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

function AppointmentCard({ item }: { item: any }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push('/clinic-patient-detail')}
      style={{
        minHeight: 92,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 14,
      }}
    >
      <Text
        size={18}
        weight="700"
        color="#111827"
        style={{ width: 64 }}
      >
        {item.time}
      </Text>

      <View
        style={{
          width: 54,
          height: 54,
          borderRadius: 27,
          overflow: 'hidden',
          backgroundColor: '#E5E7EB',
          marginRight: 14,
        }}
      >
        <Image
          source={item.image}
          style={{
            width: 54,
            height: 54,
          }}
          resizeMode="cover"
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text size={18} weight="700" color="#111827">
          {item.pet}
        </Text>

        <Text
          size={14}
          weight="600"
          color="#6B7280"
          style={{ marginTop: 4 }}
        >
          {item.tutor}
        </Text>
      </View>

      <Text size={14} weight="700" color="#9CA3AF">
        {item.type}
      </Text>
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
        onPress={() => router.push('/clinic-patients')}
      />

      <TabItem
        icon={<IconCalendar width={30} height={30} />}
        label="Agenda"
        active
      />

      <TabItem
        icon={<IconFinance width={30} height={30} />}
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