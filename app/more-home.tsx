import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text } from '@/src/components/atoms/Text';
import { logout } from '@/src/services/authService';
import { Tutor } from '@/src/types/Tutor';

import IconHome from '@/assets/icons/icon-home.svg';
import IconScore from '@/assets/icons/icon-score.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconChat from '@/assets/icons/icon-chat.svg';
import IconMore from '@/assets/icons/icon-more.svg';

import ProfileTutorWhite from '@/assets/icons/icon-user.svg';

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
  const [tutor, setTutor] =
    useState<Tutor | null>(null);

  const [saindo, setSaindo] =
    useState(false);

  useEffect(() => {
    async function loadTutor() {
      try {
        const storedTutor =
          await AsyncStorage.getItem(
            '@vitalpet:tutor'
          );

        if (storedTutor) {
          setTutor(
            JSON.parse(storedTutor)
          );
        }
      } catch (error) {
        console.error(
          'Erro ao carregar tutor:',
          error
        );
      }
    }

    loadTutor();
  }, []);

  async function handleLogout() {
    if (saindo) {
      return;
    }

    try {
      setSaindo(true);

      await logout();

      await AsyncStorage.multiRemove([
        '@vitalpet:tutor',
        '@vitalpet:lastCpf',
      ]);

      router.replace('/tutor-login');
    } catch (error) {
      console.error(
        'Erro ao sair:',
        error
      );

      Alert.alert(
        'Erro ao sair',
        'Não foi possível encerrar sua sessão.'
      );
    } finally {
      setSaindo(false);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 28,
          paddingTop: 64,
          paddingBottom: 140,
        }}
      >
        <Text
          size={28}
          weight="700"
          color="#111827"
        >
          Mais
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#FFFFFF',
              borderWidth: 2,
              borderColor: '#000000',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <ProfileTutorWhite
              width={58}
              height={58}
            />
          </View>

          <View
            style={{
              marginLeft: 16,
              flex: 1,
            }}
          >
            <Text
              size={17}
              weight="700"
              color="#000000"
            >
              {tutor?.nome ?? 'Tutor'}
            </Text>

            <Text
              size={14}
              weight="600"
              color="#7D7D7D"
              style={{
                marginTop: 3,
              }}
            >
              {tutor?.email ?? ''}
            </Text>
          </View>
        </View>

        <Divider />

        <MenuItem
          icon={
            <IconUserData
              width={24}
              height={24}
            />
          }
          label="Meus Dados"
          onPress={() =>
            router.push('/tutor-profile')
          }
        />

        <MenuItem
          icon={
            <IconPets
              width={24}
              height={24}
            />
          }
          label="Meus pets"
          onPress={() =>
            router.push('/score-home')
          }
        />

        <MenuItem
          icon={
            <IconPlan
              width={24}
              height={24}
            />
          }
          label="Planos e Assinatura"
          rightText="Plano Premium"
          onPress={() =>
            router.push('/plans-home')
          }
        />

        <MenuItem
          icon={
            <IconAward
              width={24}
              height={24}
            />
          }
          label="Conquistas"
        />

        <MenuItem
          icon={
            <IconStore
              width={24}
              height={24}
            />
          }
          label="Loja de recompensas"
        />

        <MenuItem
          icon={
            <IconRanking
              width={24}
              height={24}
            />
          }
          label="Ranking de amigos"
        />

        <MenuItem
          icon={
            <IconShare
              width={24}
              height={24}
            />
          }
          label="Compartilhar app"
        />

        <Divider />

        <MenuItem
          icon={
            <IconSettings
              width={24}
              height={24}
            />
          }
          label="Configurações"
        />

        <MenuItem
          icon={
            <IconHelp
              width={24}
              height={24}
            />
          }
          label="Central de ajuda"
        />

        <MenuItem
          icon={
            <IconInfo
              width={24}
              height={24}
            />
          }
          label="Sobre o App"
          rightText="Versão 1.00"
        />

        <Divider />

        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.8}
          disabled={saindo}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 46,
            marginTop: 4,
            opacity: saindo ? 0.6 : 1,
          }}
        >
          <View
            style={{
              width: 30,
              alignItems: 'center',
            }}
          >
            <IconLogout
              width={24}
              height={24}
            />
          </View>

          <Text
            size={16}
            weight="700"
            color="#FF3B30"
            style={{
              marginLeft: 16,
            }}
          >
            {saindo
              ? 'Saindo...'
              : 'Sair da conta'}
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
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  rightText?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 30,
          alignItems: 'center',
        }}
      >
        {icon}
      </View>

      <Text
        size={16}
        weight="700"
        color="#7D7D7D"
        style={{
          marginLeft: 16,
          flex: 1,
        }}
      >
        {label}
      </Text>

      {rightText && (
        <Text
          size={12}
          weight="600"
          color="#7D7D7D"
          style={{
            marginRight: 12,
          }}
        >
          {rightText}
        </Text>
      )}

      <IconArrowRight
        width={16}
        height={16}
      />
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
        zIndex: 99,
        elevation: 99,
      }}
    >
      <TabItem
        icon={
          <IconHome
            width={30}
            height={30}
          />
        }
        label="Home"
        onPress={() =>
          router.push('/tutor-home')
        }
      />

      <TabItem
        icon={
          <IconScore
            width={30}
            height={30}
          />
        }
        label="Score"
        onPress={() =>
          router.push('/score-home')
        }
      />

      <TabItem
        icon={
          <IconCalendar
            width={30}
            height={30}
          />
        }
        label="Histórico"
        onPress={() =>
          router.push('/history-home')
        }
      />

      <TabItem
        icon={
          <IconChat
            width={30}
            height={30}
          />
        }
        label="Chat"
        onPress={() =>
          router.push('/chat-home')
        }
      />

      <TabItem
        icon={
          <IconMore
            width={30}
            height={30}
          />
        }
        label="Mais"
        active
      />
    </View>
  );
}

function TabItem({
  icon,
  label,
  active,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={active}
      style={{
        width: 60,
        height: 70,
        borderRadius: 12,
        backgroundColor: active
          ? '#E8F1FF'
          : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}

      <Text
        size={11}
        weight="700"
        color={
          active
            ? '#0A66C2'
            : '#7D7D7D'
        }
        style={{
          marginTop: 3,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}