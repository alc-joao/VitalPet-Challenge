import { View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';

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

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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

        <Text size={28} weight="700" color="#0F172A">
          Consultas
        </Text>

        <Text size={17} color="#7D7D7D" style={{ marginTop: 4 }}>
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
            borderColor: '#D1D5DB',
            borderRadius: 16,
            backgroundColor: '#FFFFFF',
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
                backgroundColor: '#D7E9FF',
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
                <Text size={20} weight="700" color="#000000">
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

              <Text size={16} weight="700" color="#7D7D7D" style={{ marginTop: 6 }}>
                Dr. Pedro Martins
              </Text>

              <Text size={16} weight="700" color="#7D7D7D" style={{ marginTop: 6 }}>
                10/08/2026 às 10:30
              </Text>

              <Text size={16} weight="700" color="#7D7D7D" style={{ marginTop: 6 }}>
                Clínica VetVida
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={{
              height: 38,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 19,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 18,
            }}
          >
            <Text size={16} weight="700" color="#0A66C2">
              Detalhes
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: 78,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 14,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 32,
            paddingHorizontal: 18,
          }}
        >
          <IconBell width={30} height={30} />

          <View style={{ flex: 1, marginLeft: 18 }}>
            <Text size={16} weight="700" color="#000000">
              Lembrete ativado
            </Text>

            <Text size={14} weight="600" color="#7D7D7D">
              Você será lembrado 1 dia antes
            </Text>
          </View>

          <Switch
            value={reminder}
            onValueChange={setReminder}
            trackColor={{ false: '#D1D5DB', true: '#0A66C2' }}
            thumbColor="#FFFFFF"
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
          backgroundColor: '#0A66C2',
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text size={18} color="#FFFFFF">
          Agendar Consulta
        </Text>
      </TouchableOpacity>

      <BottomNav />
    </View>
  );
}

function TabButton({ label, active }: { label: string; active?: boolean }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        width: '48%',
        height: 42,
        borderRadius: 14,
        backgroundColor: active ? '#0A66C2' : '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text size={16} color={active ? '#FFFFFF' : '#000000'}>
        {label}
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
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={active}
      style={{
        width: 60,
        height: 70,
        borderRadius: 12,
        backgroundColor: active ? '#E8F1FF' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}

      <Text
        size={11}
        weight="700"
        color={active ? '#0A66C2' : '#7D7D7D'}
        style={{ marginTop: 3 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}