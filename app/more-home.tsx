import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconHome from '@/assets/icons/icon-home.svg';
import IconScore from '@/assets/icons/icon-score.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconChat from '@/assets/icons/icon-chat.svg';
import IconMore from '@/assets/icons/icon-more.svg';

import IconUser from '@/assets/icons/icon-user.svg';
import IconUserData from '@/assets/icons/icon-user-data.svg';
import IconPets from '@/assets/icons/icon-pets.svg';
import IconPlan from '@/assets/icons/icon-plan.svg';
import IconAward from '@/assets/icons/icon-award.svg';
import IconStore from '@/assets/icons/icon-store.svg';
import IconRanking from '@/assets/icons/icon-ranking.svg';
import IconShare from '@/assets/icons/icon-share.svg';
import IconSettings from '@/assets/icons/icon-settings.svg';
import IconHelp from '@/assets/icons/icon-help.svg';
import IconInfo from '@/assets/icons/icon-info.svg';
import IconLogout from '@/assets/icons/icon-logout.svg';
import IconArrowRight from '@/assets/icons/icon-arrow-right.svg';

export default function MoreHome() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 26,
          paddingTop: 64,
          paddingBottom: 140,
        }}
      >
        <Text size={30} weight="700" color="#111827">
          Mais
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 28,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              width: 62,
              height: 62,
              borderRadius: 31,
              backgroundColor: '#000000',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconUser width={52} height={52} />
          </View>

          <View style={{ marginLeft: 16 }}>
            <Text size={22} weight="700" color="#000000">
              João Victor Alcântara
            </Text>

            <Text size={16} weight="600" color="#7D7D7D">
              joaopessoal@gmail.com
            </Text>
          </View>
        </View>

        <Divider />

        <MenuItem icon={<IconUserData width={26} height={26} />} label="Meus Dados" />
        <MenuItem icon={<IconPets width={26} height={26} />} label="Meus pets" />
        <MenuItem
          icon={<IconPlan width={26} height={26} />}
          label="Planos e Assinatura"
          rightText="Plano Premium"
        />
        <MenuItem icon={<IconAward width={26} height={26} />} label="Conquistas" />
        <MenuItem icon={<IconStore width={26} height={26} />} label="Loja de recompensas" />
        <MenuItem icon={<IconRanking width={26} height={26} />} label="Ranking de amigos" />
        <MenuItem icon={<IconShare width={26} height={26} />} label="Compartilhar app" />

        <Divider />

        <MenuItem icon={<IconSettings width={26} height={26} />} label="Configurações" />
        <MenuItem icon={<IconHelp width={26} height={26} />} label="Central de ajuda" />
        <MenuItem
          icon={<IconInfo width={26} height={26} />}
          label="Sobre o App"
          rightText="Versão 1.00"
        />

        <Divider />

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 54,
            marginTop: 8,
          }}
        >
          <IconLogout width={26} height={26} />

          <Text
            size={18}
            weight="700"
            color="#FF2E2E"
            style={{ marginLeft: 16 }}
          >
            Sair da conta
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

function Divider() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 16,
      }}
    />
  );
}

function MenuItem({
  icon,
  label,
  rightText,
}: {
  icon: React.ReactNode;
  label: string;
  rightText?: string;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View style={{ width: 30, alignItems: 'center' }}>{icon}</View>

      <Text
        size={18}
        weight="700"
        color="#7D7D7D"
        style={{ marginLeft: 16, flex: 1 }}
      >
        {label}
      </Text>

      {rightText && (
        <Text
          size={14}
          weight="600"
          color="#7D7D7D"
          style={{ marginRight: 12 }}
        >
          {rightText}
        </Text>
      )}

      <IconArrowRight width={18} height={18} />
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
        height: 100,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingHorizontal: 28,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <TabItem
        icon={<IconHome width={31} height={31} />}
        label="Home"
        onPress={() => router.push('/tutor-home')}
      />

      <TabItem
        icon={<IconScore width={31} height={31} />}
        label="Score"
        onPress={() => router.push('/score-home')}
      />

      <TabItem
        icon={<IconCalendar width={31} height={31} />}
        label="Histórico"
        onPress={() => router.push('/history-home')}
      />

      <TabItem
        icon={<IconChat width={31} height={31} />}
        label="Chat"
        onPress={() => router.push('/chat-home')}
      />

      <TabItem icon={<IconMore width={31} height={31} />} label="Mais" active />
    </View>
  );
}

function TabItem({ icon, label, active, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        width: 70,
        height: 76,
        borderRadius: 14,
        backgroundColor: active ? '#E8F1FF' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}

      <Text
        size={12}
        weight="700"
        color={active ? '#0A66C2' : '#7D7D7D'}
        style={{ marginTop: 4 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}