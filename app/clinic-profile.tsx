import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconHome from '@/assets/icons/icon-home.svg';
import IconPets from '@/assets/icons/icon-pets.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconFinance from '@/assets/icons/icon-finance.svg';
import IconMore from '@/assets/icons/icon-more.svg';

import IconBell from '@/assets/icons/icon-bell.svg';
import IconConsult from '@/assets/icons/icon-consult.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';
import IconMedicine from '@/assets/icons/icon-medicine.svg';

export default function ClinicProfile() {
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
        <Text size={34} weight="700" color="#111827">
          Mais
        </Text>

        <Text size={16} weight="600" color="#7D7D7D" style={{ marginTop: 6 }}>
          Configurações da clínica
        </Text>

        <View
          style={{
            backgroundColor: '#6D28D9',
            borderRadius: 18,
            padding: 20,
            marginTop: 26,
          }}
        >
          <Text size={22} weight="700" color="#FFFFFF">
            Vet Care
          </Text>

          <Text size={15} weight="600" color="#E9DDFF" style={{ marginTop: 6 }}>
            Clínica veterinária
          </Text>

          <Text size={14} weight="600" color="#E9DDFF" style={{ marginTop: 14 }}>
            Atendimento 24h • São Paulo
          </Text>
        </View>

        <Text
          size={21}
          weight="700"
          color="#111827"
          style={{ marginTop: 28, marginBottom: 14 }}
        >
          Administrativo
        </Text>

        <MenuCard
          icon={<IconConsult width={24} height={24} />}
          title="Relatórios"
          description="Atendimentos, financeiro e desempenho"
          onPress={() => router.push('/clinic-reports')}
        />

        <MenuCard
          icon={<IconBell width={24} height={24} />}
          title="Lembretes"
          description="Alertas e notificações"
          onPress={() => router.push('/clinic-reminders')}
        />

        <MenuCard
          icon={<IconFinance width={24} height={24} />}
          title="Financeiro"
          description="Fluxo de caixa da clínica"
          onPress={() => router.push('/clinic-finance')}
        />

        <MenuCard
          icon={<IconVaccine width={24} height={24} />}
          title="Planos da clínica"
          description="Assinatura, benefícios e limite de recursos"
          onPress={() => router.push('/clinic-plans')}
        />

        <MenuCard
          icon={<IconMedicine width={24} height={24} />}
          title="Equipe veterinária"
          description="Veterinários, auxiliares e permissões"
        />

        <Text
          size={21}
          weight="700"
          color="#111827"
          style={{ marginTop: 26, marginBottom: 14 }}
        >
          Atendimento
        </Text>

        <MenuCard
          icon={<IconPets width={24} height={24} />}
          title="Pacientes"
          description="Pets cadastrados e retornos"
          onPress={() => router.push('/clinic-patients')}
        />

        <MenuCard
          icon={<IconCalendar width={24} height={24} />}
          title="Agenda"
          description="Consultas e horários"
          onPress={() => router.push('/clinic-schedule')}
        />

        <MenuCard
          icon={<IconVaccine width={24} height={24} />}
          title="Vacinas e exames"
          description="Histórico clínico dos pacientes"
          onPress={() => router.push('/clinic-exams')}
        />

        <MenuCard
          icon={<IconMedicine width={24} height={24} />}
          title="Emergência"
          description="Casos urgentes e suporte 24h"
          onPress={() => router.push('/clinic-emergency')}
        />

        <Text
          size={21}
          weight="700"
          color="#111827"
          style={{ marginTop: 26, marginBottom: 14 }}
        >
          Sistema
        </Text>

        <MenuCard
          icon={<IconConsult width={24} height={24} />}
          title="Dados da clínica"
          description="Nome, endereço, telefone e documentos"
        />

        <MenuCard
          icon={<IconBell width={24} height={24} />}
          title="Configurações"
          description="Notificações, acesso e preferências"
        />

        <MenuCard
          icon={<IconMedicine width={24} height={24} />}
          title="Central de ajuda"
          description="Suporte e dúvidas frequentes"
        />

        <MenuCard
          icon={<IconMore width={24} height={24} />}
          title="Sobre o app"
          description="VitalPet • Versão 1.0.0"
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/choose-profile')}
          style={{
            height: 58,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#FCA5A5',
            backgroundColor: '#FFF5F5',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 28,
          }}
        >
          <Text size={17} weight="700" color="#EF4444">
            Sair da clínica
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

function MenuCard({ icon, title, description, onPress }: any) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={{
        minHeight: 82,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 15,
          backgroundColor: '#F1E8FF',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 14,
        }}
      >
        {icon}
      </View>

      <View style={{ flex: 1 }}>
        <Text size={16} weight="700" color="#111827">
          {title}
        </Text>

        <Text size={13} weight="600" color="#7D7D7D" style={{ marginTop: 4 }}>
          {description}
        </Text>
      </View>

      <Text size={22} weight="700" color="#9CA3AF">
        ›
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
        onPress={() => router.push('/clinic-schedule')}
      />

      <TabItem
        icon={<IconFinance width={30} height={30} />}
        label="Financeiro"
        onPress={() => router.push('/clinic-finance')}
      />

      <TabItem icon={<IconMore width={30} height={30} />} label="Mais" active />
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