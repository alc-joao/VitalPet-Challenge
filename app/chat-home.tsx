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
          paddingHorizontal: 30,
          paddingTop: 66,
          paddingBottom: 230,
        }}
      >
        <Text size={28} weight="700" color="#0F172A">
          Assistente VitalPet
        </Text>

        <Text size={18} color="#7D7D7D" style={{ marginTop: 6 }}>
          Tire dúvidas sobre a saúde do seu pet
        </Text>

        <View style={{ marginTop: 48 }}>
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
              justifyContent: 'space-between',
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
          bottom: 116,
          height: 62,
          borderWidth: 1,
          borderColor: '#BDBDBD',
          borderRadius: 31,
          backgroundColor: '#FFFFFF',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 24,
          paddingRight: 6,
        }}
      >
        <TextInput
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#8A8A8A"
          style={{
            flex: 1,
            fontSize: 16,
            color: '#111827',
          }}
        />

        <TouchableOpacity
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: '#0A66C2',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconSend width={28} height={28} />
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
        marginBottom: 28,
      }}
    >
      <View
        style={{
          width: 58,
          height: 58,
          borderRadius: 29,
          backgroundColor: '#E8F1FF',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
        }}
      >
        <IconChatBubble width={30} height={30} />
      </View>

      <View
        style={{
          maxWidth: 378,
          minHeight: large ? 252 : 112,
          backgroundColor: '#E6F3FF',
          borderRadius: 18,
          paddingHorizontal: 18,
          paddingTop: 16,
          paddingBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 3, height: 5 },
          shadowOpacity: 0.22,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Text size={16} weight="600" color="#000000" style={{ lineHeight: 23 }}>
          {text}
        </Text>

        <Text size={14} color="#7D7D7D" style={{ marginTop: 10 }}>
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
        marginBottom: 28,
      }}
    >
      <View
        style={{
          width: 390,
          backgroundColor: '#0A66C2',
          borderRadius: 18,
          paddingHorizontal: 22,
          paddingTop: 18,
          paddingBottom: 14,
          shadowColor: '#000',
          shadowOffset: { width: 3, height: 5 },
          shadowOpacity: 0.22,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Text size={16} color="#FFFFFF" style={{ lineHeight: 23 }}>
          {text}
        </Text>

        <Text size={15} color="#FFFFFF" style={{ marginTop: 12 }}>
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
        height: 30,
        borderWidth: 1,
        borderColor: '#CFCFCF',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 4,
      }}
    >
      <Text size={12} weight="700" color="#0A66C2">
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

      <TabItem icon={<IconChat width={31} height={31} />} label="Chat" active />

      <TabItem
        icon={<IconMore width={31} height={31} />}
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