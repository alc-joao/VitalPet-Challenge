import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

export default function ClinicHome() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F8FAFC' }}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: 70,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 28,
        }}
      >
        <View>
          <Text size={14} color="#6B7280">
            Bem-vindo de volta,
          </Text>

          <Text size={28} weight="700" color="#111827">
            Clínica VitalPet
          </Text>
        </View>

        <Image
          source={require('@/assets/logos/logo-blue.svg')}
          style={{
            width: 64,
            height: 64,
          }}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          backgroundColor: '#0A66C2',
          borderRadius: 28,
          padding: 22,
          marginBottom: 24,
        }}
      >
        <Text size={16} color="#D9E8FF">
          Pacientes hoje
        </Text>

        <Text
          size={42}
          weight="700"
          color="#FFFFFF"
          style={{ marginTop: 8 }}
        >
          24
        </Text>

        <Text
          size={15}
          color="#D9E8FF"
          style={{ marginTop: 4 }}
        >
          8 consultas em andamento
        </Text>
      </View>

      <Text
        size={22}
        weight="700"
        color="#111827"
        style={{ marginBottom: 18 }}
      >
        Gestão rápida
      </Text>

      <View style={{ gap: 18 }}>
        <DashboardCard
          icon="📅"
          title="Consultas"
          description="Gerencie agendamentos e horários"
        />

        <DashboardCard
          icon="🐾"
          title="Pacientes"
          description="Acompanhe pets e históricos"
        />

        <DashboardCard
          icon="🚨"
          title="Alertas"
          description="Vacinas, exames e notificações"
        />

        <DashboardCard
          icon="📊"
          title="Relatórios"
          description="Indicadores e desempenho"
        />
      </View>

      <TouchableOpacity
        onPress={() => router.replace('/choose-profile')}
        style={{
          marginTop: 30,
          alignItems: 'center',
        }}
      >
        <Text size={15} color="#6B7280">
          ← Trocar perfil
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

type DashboardCardProps = {
  icon: string;
  title: string;
  description: string;
};

function DashboardCard({
  icon,
  title,
  description,
}: DashboardCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <View
          style={{
            width: 58,
            height: 58,
            borderRadius: 18,
            backgroundColor: '#EAF2FF',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text size={26}>{icon}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text size={20} weight="700" color="#111827">
            {title}
          </Text>

          <Text
            size={15}
            color="#6B7280"
            style={{ marginTop: 4 }}
          >
            {description}
          </Text>
        </View>

        <Text size={28} color="#0A66C2">
          ›
        </Text>
      </View>
    </TouchableOpacity>
  );
}