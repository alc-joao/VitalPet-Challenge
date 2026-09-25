import { View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';
import { useAppTheme } from '@/src/hooks/useAppTheme';

import IconConsult from '@/assets/icons/icon-consult.svg';
import IconBell from '@/assets/icons/icon-bell.svg';
import IconBack from '@/assets/icons/icon-back.svg';

import IconHome from '@/assets/icons/icon-home.svg';
import IconScore from '@/assets/icons/icon-score.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconChat from '@/assets/icons/icon-chat.svg';
import IconMore from '@/assets/icons/icon-more.svg';

export default function ConsultsHome() {
  const [reminder, setReminder] = useState(true);
  const { theme } = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 28,
          paddingTop: 48,
          paddingBottom: 150,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push('/tutor-home')}
          style={{ marginBottom: 18 }}
        >
          <IconBack width={18} height={18} />
        </TouchableOpacity>

        <Text size={28} weight="700" color={theme.text}>
          Consultas
        </Text>

        <Text
          size={17}
          color={theme.textSecondary}
          style={{ marginTop: 4 }}
        >
          Agenda e histórico de consultas
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <TabButton label="Próximas" active />
          <TabButton label="Histórico" />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 16,
            backgroundColor: theme.surface,
            padding: 18,
            shadowColor: '#000',
            shadowOffset: { width: 3, height: 4 },
            shadowOpacity: 0.16,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 6,
                backgroundColor: theme.surfaceSecondary,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 18,
              }}
            >
              <IconConsult width={30} height={30} />
            </View>

            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text size={20} weight="700" color={theme.text}>
                  Check-up anual
                </Text>

                <View
                  style={{
                    backgroundColor: '#BDF5D2',
                    borderRadius: 6,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}
                >
                  <Text size={14} weight="700" color="#008047">
                    Confirmado
                  </Text>
                </View>
              </View>

              <Text
                size={16}
                weight="700"
                color={theme.textSecondary}
                style={{ marginTop: 6 }}
              >
                Dr. Pedro Martins
              </Text>

              <Text
                size={16}
                weight="700"
                color={theme.textSecondary}
                style={{ marginTop: 6 }}
              >
                10/08/2026 às 10:30
              </Text>

              <Text
                size={16}
                weight="700"
                color={theme.textSecondary}
                style={{ marginTop: 6 }}
              >
                Clínica VetVida
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={{
              height: 38,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 19,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 18,
            }}
          >
            <Text size={16} weight="700" color={theme.primary}>
              Detalhes
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: 78,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 14,
            backgroundColor: theme.surface,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 32,
            paddingHorizontal: 18,
          }}
        >
          <IconBell width={30} height={30} />

          <View style={{ flex: 1, marginLeft: 18 }}>
            <Text size={16} weight="700" color={theme.text}>
              Lembrete ativado
            </Text>

            <Text size={14} weight="600" color={theme.textSecondary}>
              Você será lembrado 1 dia antes
            </Text>
          </View>

          <Switch
            value={reminder}
            onValueChange={setReminder}
            trackColor={{
              false: theme.tabInactive,
              true: theme.primary,
            }}
            thumbColor={theme.surface}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.85}
        style={{
          position: 'absolute',
          left: 28,
          right: 28,
          bottom: 116,
          height: 58,
          backgroundColor: theme.primary,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text size={18} color={theme.primaryText}>
          Agendar Consulta
        </Text>
      </TouchableOpacity>

      <BottomNav />
    </View>
  );
}

function TabButton({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        width: '48%',
        height: 42,
        borderRadius: 14,
        backgroundColor: active ? theme.primary : theme.tabInactive,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        size={16}
        color={active ? theme.primaryText : theme.text}
      >
        {label}
      </Text>
    </TouchableOpacity>
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
        paddingHorizontal: 28,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <TabItem
        icon={<IconHome width={30} height={30} />}
        label="Home"
        onPress={() => router.push('/tutor-home')}
      />

      <TabItem
        icon={<IconScore width={30} height={30} />}
        label="Score"
        onPress={() => router.push('/score-home')}
      />

      <TabItem
        icon={<IconCalendar width={30} height={30} />}
        label="Histórico"
        onPress={() => router.push('/history-home')}
      />

      <TabItem
        icon={<IconChat width={30} height={30} />}
        label="Chat"
        onPress={() => router.push('/chat-home')}
      />

      <TabItem
        icon={<IconMore width={30} height={30} />}
        label="Mais"
        onPress={() => router.push('/more-home')}
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
        width: 60,
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
        color={active ? theme.primary : theme.textSecondary}
        style={{ marginTop: 3 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
