import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconHome from '@/assets/icons/icon-home.svg';
import IconPets from '@/assets/icons/icon-pets.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconFinance from '@/assets/icons/icon-finance.svg';
import IconMore from '@/assets/icons/icon-more.svg';

const PetThor = require('@/assets/images/pitbul.png');

const scheduleDays = [
  { day: 'Seg', date: '19' },
  { day: 'Ter', date: '20', active: true },
  { day: 'Qua', date: '21' },
  { day: 'Qui', date: '22' },
  { day: 'Sex', date: '23' },
];

const appointments = [
  { hour: '08:00', pet: 'Thor Martins', type: 'Consulta' },
  { hour: '09:00', pet: 'Mel', type: 'Retorno' },
  { hour: '10:00', pet: 'Buddy', type: 'Vacina' },
  { hour: '11:00', pet: 'Luna', type: 'Consulta' },
  { hour: '14:00', pet: 'Rex', type: 'Exame' },
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
        <Text size={34} weight="700" color="#111827">
          Agenda de hoje
        </Text>

        <Text
          size={16}
          weight="500"
          color="#6B7280"
          style={{ marginTop: 6 }}
        >
          Quinta, 20 de Maio
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 24,
            backgroundColor: '#F9FAFB',
            borderRadius: 18,
            padding: 8,
          }}
        >
          {scheduleDays.map((item, index) => (
            <View
              key={index}
              style={{
                width: 58,
                height: 72,
                borderRadius: 16,
                backgroundColor: item.active ? '#6D28D9' : 'transparent',
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
                size={22}
                weight="700"
                color={item.active ? '#FFFFFF' : '#111827'}
                style={{ marginTop: 4 }}
              >
                {item.date}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 24 }}>
          {appointments.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.85}
              onPress={() => router.push('/clinic-patient-detail')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 18,
                padding: 14,
                marginBottom: 14,
              }}
            >
              <Text
                size={16}
                weight="700"
                color="#111827"
                style={{ width: 58 }}
              >
                {item.hour}
              </Text>

              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  overflow: 'hidden',
                  marginRight: 14,
                  backgroundColor: '#E5E7EB',
                }}
              >
                <Image
                  source={PetThor}
                  style={{ width: 52, height: 52 }}
                  resizeMode="cover"
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text size={17} weight="700" color="#111827">
                  {item.pet}
                </Text>

                <Text
                  size={14}
                  weight="600"
                  color="#6B7280"
                  style={{ marginTop: 4 }}
                >
                  {item.type}
                </Text>
              </View>

              <Text size={14} weight="700" color="#9CA3AF">
                {item.type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/clinic-new-appointment')}
          style={{
            marginTop: 34,
            height: 58,
            borderRadius: 16,
            backgroundColor: '#6D28D9',
            alignItems: 'center',
            justifyContent: 'center',
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
        icon={<IconHome width={28} height={28} />}
        label="Home"
        onPress={() => router.push('/clinic-home')}
      />

      <TabItem
        icon={<IconPets width={28} height={28} />}
        label="Pacientes"
        onPress={() => router.push('/clinic-patients')}
      />

      <TabItem
        icon={<IconCalendar width={28} height={28} />}
        label="Agenda"
        active
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
        style={{ marginTop: 4 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}