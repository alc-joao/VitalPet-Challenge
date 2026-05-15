import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';
import IconEmergency from '@/assets/icons/icon-emergency.svg';
import IconConsult from '@/assets/icons/icon-consult.svg';
import IconChat from '@/assets/icons/icon-chat.svg';

import IconHome from '@/assets/icons/icon-home.svg';
import IconScore from '@/assets/icons/icon-score.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconMore from '@/assets/icons/icon-more.svg';

export default function EmergencyHome() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 28,
          paddingTop: 48,
          paddingBottom: 190,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push('/tutor-home')}
          style={{ marginBottom: 18 }}
        >
          <IconBack width={18} height={18} />
        </TouchableOpacity>

        <Text size={28} weight="700" color="#0F172A">
          Emergência
        </Text>

        <Text size={17} color="#7D7D7D" style={{ marginTop: 4 }}>
          Acesse ajuda rápida para o seu pet
        </Text>

        <View
          style={{
            backgroundColor: '#FFE1E1',
            borderRadius: 18,
            paddingHorizontal: 20,
            paddingVertical: 22,
            marginTop: 28,
            marginBottom: 22,
          }}
        >
          <View
            style={{
              width: 58,
              height: 58,
              borderRadius: 29,
              backgroundColor: '#ff3a3060',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 18,
            }}
          >
            <IconEmergency width={34} height={34} />
          </View>

          <Text size={22} weight="700" color="#000000">
            Situação de risco?
          </Text>

          <Text size={16} color="#7D7D7D" style={{ marginTop: 8, lineHeight: 24 }}>
            Se o seu pet está com falta de ar, sangramento, convulsões ou dor intensa,
            procure atendimento veterinário imediatamente.
          </Text>
        </View>

        <EmergencyAction
          icon={<IconConsult width={30} height={30} />}
          title="Encontrar clínica próxima"
          subtitle="Veja locais de atendimento veterinário"
        />

        <EmergencyAction
          icon={<IconChat width={30} height={30} />}
          title="Falar com assistente"
          subtitle="Receba orientação rápida no chat"
          onPress={() => router.push('/chat-home')}
        />

        <View
          style={{
            borderWidth: 1,
            borderColor: '#D1D5DB',
            borderRadius: 16,
            padding: 18,
            marginTop: 12,
          }}
        >
          <Text size={20} weight="700" color="#000000">
            Telefones úteis
          </Text>

          <InfoRow title="Clínica VetVida" value="(11) 99999-0000" />
          <InfoRow title="Emergência 24h" value="(11) 98888-0000" />
          <InfoRow title="Tutor responsável" value="(11) 97777-0000" />
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
          backgroundColor: '#FF3B30',
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text size={18} weight="700" color="#FFFFFF">
          Ligar emergência
        </Text>
      </TouchableOpacity>

      <BottomNav />
    </View>
  );
}

function EmergencyAction({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        minHeight: 84,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        marginBottom: 14,
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 8,
          backgroundColor: '#D7E9FF',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        }}
      >
        {icon}
      </View>

      <View style={{ flex: 1 }}>
        <Text size={18} weight="700" color="#000000">
          {title}
        </Text>

        <Text size={14} color="#7D7D7D" style={{ marginTop: 4 }}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function InfoRow({ title, value }: { title: string; value: string }) {
  return (
    <View
      style={{
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text size={15} weight="700" color="#7D7D7D">
        {title}
      </Text>

      <Text size={15} weight="700" color="#000000">
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
        paddingHorizontal: 28,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <TabItem icon={<IconHome width={30} height={30} />} label="Home" onPress={() => router.push('/tutor-home')} />
      <TabItem icon={<IconScore width={30} height={30} />} label="Score" onPress={() => router.push('/score-home')} />
      <TabItem icon={<IconCalendar width={30} height={30} />} label="Histórico" onPress={() => router.push('/history-home')} />
      <TabItem icon={<IconChat width={30} height={30} />} label="Chat" onPress={() => router.push('/chat-home')} />
      <TabItem icon={<IconMore width={30} height={30} />} label="Mais" onPress={() => router.push('/more-home')} />
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

      <Text size={11} weight="700" color={active ? '#0A66C2' : '#7D7D7D'} style={{ marginTop: 3 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}