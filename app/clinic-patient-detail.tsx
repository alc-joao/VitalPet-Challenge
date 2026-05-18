import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';
import IconHome from '@/assets/icons/icon-home.svg';
import IconPets from '@/assets/icons/icon-pets.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconChat from '@/assets/icons/icon-chat.svg';
import IconMore from '@/assets/icons/icon-more.svg';

import IconWeight from '@/assets/icons/icon-weight.svg';
import IconConsult from '@/assets/icons/icon-consult.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';
import IconMedicine from '@/assets/icons/icon-medicine.svg';

const PetThor = require('@/assets/images/pitbul.png');

export default function ClinicPatientDetail() {
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
          onPress={() => router.push('/clinic-patients')}
          style={{
            width: 36,
            height: 36,
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <IconBack width={24} height={24} />
        </TouchableOpacity>

        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              width: 118,
              height: 118,
              borderRadius: 59,
              overflow: 'hidden',
              backgroundColor: '#E5E7EB',
            }}
          >
            <Image
              source={PetThor}
              style={{
                width: 118,
                height: 118,
              }}
              resizeMode="cover"
            />
          </View>

          <Text size={34} weight="700" color="#111827" style={{ marginTop: 14 }}>
            Thor
          </Text>

          <Text size={17} weight="600" color="#6B7280" style={{ marginTop: 4 }}>
            Golden Retriever • 5 anos
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 24,
            gap: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 42,
              backgroundColor: '#DCFCE7',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text size={15} weight="700" color="#16A34A">
              Ativo
            </Text>
          </View>

          <View
            style={{
              flex: 2,
              height: 42,
              backgroundColor: '#F3F4F6',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text size={14} weight="700" color="#6B7280">
              Paciente desde 10/02/2024
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 28,
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
          }}
        >
          <TabLabel label="Resumo" active />
          <TabLabel label="Histórico" />
          <TabLabel label="Saúde" />
          <TabLabel label="Financeiro" />
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <InfoCard
              icon={<IconWeight width={22} height={22} />}
              title="Peso"
              value="28,5 kg"
            />

            <InfoCard
              icon={<IconConsult width={22} height={22} />}
              title="Última consulta"
              value="10/05/2025"
            />
          </View>

          <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
            <InfoCard
              icon={<IconVaccine width={22} height={22} />}
              title="Última vacina"
              value="20/04/2025"
            />

            <InfoCard
              icon={<IconMedicine width={22} height={22} />}
              title="Vermífugo"
              value="27/03/2025"
            />
          </View>
        </View>

        <Text
          size={18}
          weight="700"
          color="#111827"
          style={{ marginTop: 24, marginBottom: 12 }}
        >
          Responsável
        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 16,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
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
              source={PetThor}
              style={{
                width: 54,
                height: 54,
              }}
              resizeMode="cover"
            />
          </View>

          <View>
            <Text size={18} weight="700" color="#111827">
              João Martins
            </Text>

            <Text size={15} weight="600" color="#6B7280" style={{ marginTop: 4 }}>
              (11) 99999-1134
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/clinic-patient-history')}
          style={{
            marginTop: 28,
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
            Ver histórico completo
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

function TabLabel({ label, active }: { label: string; active?: boolean }) {
  return (
    <View
      style={{
        paddingBottom: 8,
        borderBottomWidth: active ? 3 : 0,
        borderBottomColor: '#6D28D9',
      }}
    >
      <Text size={15} weight="700" color={active ? '#6D28D9' : '#6B7280'}>
        {label}
      </Text>
    </View>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        minHeight: 112,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 16,
        padding: 14,
        backgroundColor: '#FFFFFF',
      }}
    >
      <View style={{ marginBottom: 12 }}>{icon}</View>

      <Text size={14} weight="700" color="#6B7280">
        {title}
      </Text>

      <Text size={22} weight="700" color="#111827" style={{ marginTop: 8 }}>
        {value}
      </Text>
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

      <TabItem icon={<IconPets width={30} height={30} />} label="Pacientes" active />

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