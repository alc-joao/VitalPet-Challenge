import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';
import IconHome from '@/assets/icons/icon-home.svg';
import IconPets from '@/assets/icons/icon-pets.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconFinance from '@/assets/icons/icon-finance.svg';
import IconMore from '@/assets/icons/icon-more.svg';
import IconArrow from '@/assets/icons/icon-arrow-right.svg';

const PetRex = require('@/assets/images/pitbul.png');
const PetIron = require('@/assets/images/rotwailler.png');

const speciesData = [
  {
    label: 'Cachorros',
    value: 186,
    percent: '73%',
    width: '73%',
  },
  {
    label: 'Gatos',
    value: 54,
    percent: '21%',
    width: '21%',
  },
  {
    label: 'Outros',
    value: 16,
    percent: '6%',
    width: '6%',
  },
];

const newPatients = [
  {
    name: 'Thor Martins',
    image: PetRex,
    date: '18/05/2025',
  },
  {
    name: 'Mel Silva',
    image: PetIron,
    date: '18/05/2025',
  },
  {
    name: 'Luna Rodrigues',
    image: PetIron,
    date: '18/05/2025',
  },
];

export default function ClinicPatients() {
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
            marginBottom: 14,
          }}
        >
          <IconBack width={24} height={24} />
        </TouchableOpacity>

        <Text size={28} weight="700" color="#111827">
          Pacientes Ativos
        </Text>

        <Text
          size={58}
          weight="700"
          color="#111827"
          style={{
            marginTop: 18,
            lineHeight: 62,
          }}
        >
          256
        </Text>

        <Text size={16} weight="700" color="#22C55E">
          + 10 este mês
        </Text>

        <Text
          size={20}
          weight="700"
          color="#111827"
          style={{ marginTop: 28, marginBottom: 14 }}
        >
          Tipo espécies
        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 18,
            padding: 18,
            backgroundColor: '#FFFFFF',
          }}
        >
          {speciesData.map(item => (
            <SpeciesBar key={item.label} item={item} />
          ))}
        </View>

        <View
          style={{
            marginTop: 26,
            marginBottom: 14,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text size={20} weight="700" color="#111827">
            Novos pacientes
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/clinic-patient-detail')}
          >
            <Text size={15} weight="700" color="#6D28D9">
              Ver todos
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 18,
            paddingVertical: 8,
            backgroundColor: '#FFFFFF',
          }}
        >
          {newPatients.map(item => (
            <PatientRow key={item.name} item={item} />
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/clinic-patient-detail')}
          style={{
            marginTop: 26,
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
            Ver todos pacientes
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

function SpeciesBar({ item }: { item: any }) {
  return (
    <View style={{ marginBottom: 18 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <Text size={15} weight="700" color="#111827">
          {item.label}
        </Text>

        <Text size={15} weight="700" color="#111827">
          {item.value}{' '}
          <Text size={14} weight="600" color="#9CA3AF">
            ({item.percent})
          </Text>
        </Text>
      </View>

      <View
        style={{
          height: 8,
          borderRadius: 10,
          backgroundColor: '#E5E7EB',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: item.width,
            height: 8,
            borderRadius: 10,
            backgroundColor: '#22C55E',
          }}
        />
      </View>
    </View>
  );
}

function PatientRow({ item }: { item: any }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push('/clinic-patient-detail')}
      style={{
        height: 74,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          width: 46,
          height: 46,
          borderRadius: 23,
          overflow: 'hidden',
          backgroundColor: '#E5E7EB',
          marginRight: 14,
        }}
      >
        <Image
          source={item.image}
          style={{
            width: 46,
            height: 46,
          }}
          resizeMode="cover"
        />
      </View>

      <Text
        size={17}
        weight="700"
        color="#111827"
        style={{ flex: 1 }}
      >
        {item.name}
      </Text>

      <Text size={14} weight="600" color="#9CA3AF">
        {item.date}
      </Text>

      <View style={{ marginLeft: 10 }}>
        <IconArrow width={18} height={18} />
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
      />

      <TabItem
        icon={<IconCalendar width={30} height={30} />}
        label="Agenda"
        onPress={() => router.push('/clinic-schedule')}
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