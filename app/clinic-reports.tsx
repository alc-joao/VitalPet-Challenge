import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';

import IconConsult from '@/assets/icons/icon-consult.svg';
import IconFinance from '@/assets/icons/icon-finance.svg';
import IconPets from '@/assets/icons/icon-pets.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';
import IconMedicine from '@/assets/icons/icon-medicine.svg';

export default function ClinicReports() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingTop: 56,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        <IconBack width={24} height={24} />
      </TouchableOpacity>

      <Text size={32} weight="700" color="#1F1B2D">
        Relatórios
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 28,
          paddingBottom: 120,
        }}
      >
        <ReportCard
          icon={<IconConsult width={24} height={24} />}
          title="Atendimentos"
          description="Veja os atendimentos"
          onPress={() => router.push('/clinic-schedule')}
        />

        <ReportCard
          icon={<IconFinance width={24} height={24} />}
          title="Financeiro"
          description="Fluxo de caixa"
          onPress={() => router.push('/clinic-finance')}
        />

        <ReportCard
          icon={<IconPets width={24} height={24} />}
          title="Pacientes"
          description="Cadastros e retornos"
          onPress={() => router.push('/clinic-patients')}
        />

        <ReportCard
          icon={<IconVaccine width={24} height={24} />}
          title="Vacinas"
          description="Aplicadas e pendentes"
          onPress={() => router.push('/clinic-exams')}
        />

        <ReportCard
          icon={<IconMedicine width={24} height={24} />}
          title="Desempenho"
          description="Métricas detalhadas"
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            height: 60,
            backgroundColor: '#6D28D9',
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 34,
            shadowColor: '#6D28D9',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.22,
            shadowRadius: 10,
            elevation: 4,
          }}
        >
          <Text size={17} weight="700" color="#FFFFFF">
            Gerar relatório
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function ReportCard({
  icon,
  title,
  description,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={{
        height: 92,
        borderWidth: 1,
        borderColor: '#F0EDF7',
        borderRadius: 20,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
      }}
    >
      <View
        style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          backgroundColor: '#F3EEFF',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        }}
      >
        {icon}
      </View>

      <View style={{ flex: 1 }}>
        <Text size={18} weight="700" color="#1F1B2D">
          {title}
        </Text>

        <Text
          size={14}
          weight="600"
          color="#8A8499"
          style={{ marginTop: 4 }}
        >
          {description}
        </Text>
      </View>

      <Text size={22} weight="700" color="#B8B3C7">
        ›
      </Text>
    </TouchableOpacity>
  );
}