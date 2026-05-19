import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBell from '@/assets/icons/icon-bell.svg';

import IconHome from '@/assets/icons/icon-home.svg';
import IconPets from '@/assets/icons/icon-pets.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconFinance from '@/assets/icons/icon-finance.svg';
import IconMore from '@/assets/icons/icon-more.svg';

import IconAlert from '@/assets/icons/icon-alert.svg';
import IconReturn from '@/assets/icons/icon-return.svg';
import IconConsultation from '@/assets/icons/icon-consutation.svg';

const PetRex = require('@/assets/images/pitbul.png');
const PetIron = require('@/assets/images/rotwailler.png');

const appointments = [
  {
    time: '08:00',
    name: 'Thor Martins',
    image: PetRex,
    type: 'Consulta',
  },
  {
    time: '09:00',
    name: 'Mel',
    image: PetIron,
    type: 'Retorno',
  },
  {
    time: '10:00',
    name: 'Buddy',
    image: PetRex,
    type: 'Vacina',
  },
  {
    time: '11:00',
    name: 'Luna',
    image: PetIron,
    type: 'Consulta',
  },
  {
    time: '14:00',
    name: 'Rex',
    image: PetRex,
    type: 'Exame',
  },
];

export default function ClinicHome() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 58,
          paddingBottom: 130,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <View>
            <Text size={24} weight="700" color="#111827">
              Olá, Vet Care! 👋
            </Text>

            <Text size={15} weight="600" color="#7D7D7D" style={{ marginTop: 4 }}>
              Quinta, 20 de Maio
            </Text>
          </View>

          <TouchableOpacity style={{ marginTop: 4 }}>
            <IconBell width={25} height={25} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: '#6D28D9',
            borderRadius: 16,
            padding: 18,
            marginTop: 26,
            shadowColor: '#000',
            shadowOffset: { width: 3, height: 4 },
            shadowOpacity: 0.18,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text size={16} weight="700" color="#FFFFFF">
            Atendimentos hoje
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginTop: 10,
            }}
          >
            <Text size={44} weight="700" color="#FFFFFF">
              12
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginLeft: 18,
                marginBottom: 6,
              }}
            >
              <SmallMetric icon={<IconAlert width={25} height={25} />} label="Novos" value="8" />
              <SmallMetric icon={<IconReturn width={25} height={25} />} label="Retornos" value="3" />
              <SmallMetric icon={<IconConsultation width={25} height={25} />} label="Consultas" value="1" />
            </View>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 16,
            padding: 18,
            marginTop: 18,
            backgroundColor: '#FFFFFF',
          }}
        >
          <Text size={17} weight="700" color="#111827">
            Faturamento hoje
          </Text>

          <Text size={30} weight="700" color="#111827" style={{ marginTop: 12 }}>
            R$ 4.320,00
          </Text>

          <Text size={14} weight="700" color="#16A34A" style={{ marginTop: 4 }}>
            + 15% vs ontem
          </Text>
        </View>

        <Text
          size={21}
          weight="700"
          color="#111827"
          style={{ marginTop: 24, marginBottom: 14 }}
        >
          Indicadores rápidos
        </Text>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <IndicatorCard title="Pacientes ativos" value="256" />
          <IndicatorCard title="Vacinas aplicadas" value="18" />
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
          <IndicatorCard title="Retornos hoje" value="7" />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/clinic-exams')}
            style={{
              flex: 1,
              height: 84,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 14,
              padding: 14,
              backgroundColor: '#FFFFFF',
            }}
          >
            <Text size={13} weight="700" color="#7D7D7D">
              Exames realizados
            </Text>

            <Text size={24} weight="700" color="#111827" style={{ marginTop: 8 }}>
              11
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          size={21}
          weight="700"
          color="#111827"
          style={{ marginTop: 26, marginBottom: 14 }}
        >
          Atendimentos de hoje
        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 16,
            backgroundColor: '#FFFFFF',
            paddingVertical: 10,
          }}
        >
          {appointments.map(item => (
            <AppointmentRow key={`${item.time}-${item.name}`} item={item} />
          ))}
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

function SmallMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: 'rgba(255,255,255,0.18)',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        {icon}
      </View>

      <Text size={13} weight="700" color="#FFFFFF">
        {label} {value}
      </Text>
    </View>
  );
}

function IndicatorCard({ title, value }: { title: string; value: string }) {
  return (
    <View
      style={{
        flex: 1,
        height: 84,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 14,
        padding: 14,
        backgroundColor: '#FFFFFF',
      }}
    >
      <Text size={13} weight="700" color="#7D7D7D">
        {title}
      </Text>

      <Text size={24} weight="700" color="#111827" style={{ marginTop: 8 }}>
        {value}
      </Text>
    </View>
  );
}

function AppointmentRow({ item }: { item: any }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
      }}
    >
      <Text size={14} weight="700" color="#111827" style={{ width: 54 }}>
        {item.time}
      </Text>

      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          overflow: 'hidden',
          backgroundColor: '#E5E7EB',
          marginRight: 12,
        }}
      >
        <Image
          source={item.image}
          style={{ width: 30, height: 30 }}
          resizeMode="cover"
        />
      </View>

      <Text
        size={15}
        weight="700"
        color="#111827"
        style={{ flex: 1 }}
      >
        {item.name}
      </Text>

      <Text size={13} weight="600" color="#7D7D7D">
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
      <TabItem icon={<IconHome width={30} height={30} />} label="Home" active />

      <TabItem
        icon={<IconPets width={30} height={30} />}
        label="Pacientes"
        onPress={() => router.push('/clinic-patients')}
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