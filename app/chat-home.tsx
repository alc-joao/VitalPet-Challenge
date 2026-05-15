import { View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconHome from '@/assets/icons/icon-home.svg';
import IconScore from '@/assets/icons/icon-score.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconChat from '@/assets/icons/icon-chat.svg';
import IconMore from '@/assets/icons/icon-more.svg';

import IconSend from '@/assets/icons/icon-send.svg';
import IconChatBubble from '@/assets/icons/icon-chat-bubble.svg';

export default function ChatHome() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 28,
          paddingTop: 70,
          paddingBottom: 250,
        }}
      >
        <Text size={24} weight="700" color="#0F172A">
          Assistente VitalPet
        </Text>

        <Text size={16} color="#7D7D7D" style={{ marginTop: 6 }}>
          Tire dúvidas sobre a saúde do seu pet
        </Text>

        <View style={{ marginTop: 38 }}>
          <BotMessage
            text={'Olá! Sou o assistente VitalPet.\nComo posso ajudar você hoje?'}
            time="09:30"
          />

          <UserMessage
            text={'Meu cachorro não quer comer,\no que pode ser?'}
            time="09:32"
          />

          <BotMessage
            large
            text={
              'Pode ser algo passageiro, como\nestresse, calor ou mudança na\nalimentação.\n\nSe o Iron ficar mais de 24h sem\ncomer, apresentar vômitos ou apatia,\nrecomendo uma\navaliação veterinária.\n\nPosso te ajudar com algo mais?'
            }
            time="09:33"
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 8,
              marginTop: 12,
            }}
          >
            <Suggestion label="Dicas de alimentação" />
            <Suggestion label="Sinais de alerta" />
            <Suggestion label="Cuidados no calor" />
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 30,
          right: 30,
          bottom: 106,
          height: 54,
          borderWidth: 1,
          borderColor: '#BDBDBD',
          borderRadius: 28,
          backgroundColor: '#FFFFFF',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 5,
          zIndex: 10,
        }}
      >
        <TextInput
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#8A8A8A"
          style={{
            flex: 1,
            fontSize: 15,
            color: '#111827',
          }}
        />

        <TouchableOpacity
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: '#0A66C2',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconSend width={26} height={26} />
        </TouchableOpacity>
      </View>

      <BottomNav />
    </View>
  );
}

function BotMessage({
  text,
  time,
  large,
}: {
  text: string;
  time: string;
  large?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 26,
      }}
    >
      <View
        style={{
          width: 42,
          height: 42,
          borderRadius: 21,
          backgroundColor: '#E8F1FF',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 8,
        }}
      >
        <IconChatBubble width={24} height={24} />
      </View>

      <View
        style={{
          width: large ? 264 : 264,
          minHeight: large ? 238 : 80,
          backgroundColor: '#E6F3FF',
          borderRadius: 16,
          paddingHorizontal: 14,
          paddingTop: 12,
          paddingBottom: 10,
          shadowColor: '#000',
          shadowOffset: { width: 2, height: 4 },
          shadowOpacity: 0.22,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <Text size={14} weight="600" color="#000000" style={{ lineHeight: 20 }}>
          {text}
        </Text>

        <Text size={13} color="#7D7D7D" style={{ marginTop: 8 }}>
          {time}
        </Text>
      </View>
    </View>
  );
}

function UserMessage({ text, time }: { text: string; time: string }) {
  return (
    <View
      style={{
        alignItems: 'flex-end',
        marginBottom: 26,
      }}
    >
      <View
        style={{
          width: 265,
          backgroundColor: '#0A66C2',
          borderRadius: 16,
          paddingHorizontal: 18,
          paddingTop: 14,
          paddingBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 2, height: 4 },
          shadowOpacity: 0.22,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <Text size={14} color="#FFFFFF" style={{ lineHeight: 20 }}>
          {text}
        </Text>

        <Text size={13} color="#FFFFFF" style={{ marginTop: 10 }}>
          {time}
        </Text>
      </View>
    </View>
  );
}

function Suggestion({ label }: { label: string }) {
  return (
    <TouchableOpacity
      style={{
        height: 26,
        borderWidth: 1,
        borderColor: '#CFCFCF',
        borderRadius: 7,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.18,
        shadowRadius: 2,
        elevation: 4,
      }}
    >
      <Text size={11} weight="700" color="#0A66C2">
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
        zIndex: 99,
        elevation: 99,
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

      <TabItem icon={<IconChat width={30} height={30} />} label="Chat" active />

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