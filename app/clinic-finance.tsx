import { View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';
import { useAppTheme } from '@/src/hooks/useAppTheme';

import IconHome from '@/assets/icons/icon-home.svg';
import IconPets from '@/assets/icons/icon-pets.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconFinance from '@/assets/icons/icon-finance.svg';
import IconMore from '@/assets/icons/icon-more.svg';

import IconMedicine from '@/assets/icons/icon-medicine.svg';
import IconConsult from '@/assets/icons/icon-consult.svg';

export default function ClinicFinance() {
  const { theme } = useAppTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 58,
          paddingBottom: 120,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 28,
          }}
        >
          <Text size={30} weight="700" color={theme.text}>
            Financeiro
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              height: 42,
              paddingHorizontal: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.border,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text size={14} weight="700" color={theme.textSecondary}>
              Maio 2025
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: '#6D28D9',
            borderRadius: 24,
            padding: 24,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.16,
            shadowRadius: 12,
            elevation: 5,
          }}
        >
          <Text size={16} weight="700" color="#FFFFFF">
            Faturamento
          </Text>

          <Text
            size={40}
            weight="700"
            color="#FFFFFF"
            style={{ marginTop: 12 }}
          >
            R$ 128.450,00
          </Text>

          <Text
            size={15}
            weight="700"
            color="#DCCBFF"
            style={{ marginTop: 10 }}
          >
            + 10% vs Abril
          </Text>
        </View>

        <View
          style={{
            marginTop: 26,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 22,
            overflow: 'hidden',
            backgroundColor: theme.surface,
          }}
        >
          <FinanceRow
            icon={<IconFinance width={22} height={22} />}
            title="Recebimentos"
            value="R$ 142.200,00"
          />

          <FinanceRow
            icon={<IconMedicine width={22} height={22} />}
            title="Descontos"
            value="R$ 4.250,00"
          />

          <FinanceRow
            icon={<IconCalendar width={22} height={22} />}
            title="Despesas"
            value="R$ 12.500,00"
          />

          <FinanceRow
            icon={<IconConsult width={22} height={22} />}
            title="Lucro líquido"
            value="R$ 120.250,00"
            green
            last
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/clinic-finance-entries')}
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
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 4,
          }}
        >
          <Text size={17} weight="700" color="#FFFFFF">
            Ver relatório completo
          </Text>
        </TouchableOpacity>
      </View>

      <BottomNav />
    </View>
  );
}

function FinanceRow({
  icon,
  title,
  value,
  green,
  last,
}: any) {
  const { theme } = useAppTheme();
  return (
    <View
      style={{
        height: 82,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: theme.border,
      }}
    >
      <View
        style={{
          width: 42,
          height: 42,
          borderRadius: 14,
          backgroundColor: theme.surfaceSecondary,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 14,
        }}
      >
        {icon}
      </View>

      <Text
        size={16}
        weight="700"
        color={theme.text}
        style={{ flex: 1 }}
      >
        {title}
      </Text>

      <Text
        size={17}
        weight="700"
        color={green ? '#22C55E' : '#2B243D'}
      >
        {value}
      </Text>
    </View>
  );
}

function BottomNav() {
  const { theme } = useAppTheme();
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 86,
        backgroundColor: theme.surface,
        borderTopWidth: 1,
        borderTopColor: theme.border,
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
        active
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
  const { theme } = useAppTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={active}
      style={{
        width: 68,
        height: 70,
        borderRadius: 12,
        backgroundColor: active ? theme.surfaceSecondary : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}

      <Text
        size={11}
        weight="700"
        color={active ? '#6D28D9' : theme.textSecondary}
        style={{ marginTop: 3 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}