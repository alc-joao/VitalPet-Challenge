import { View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';
import IconArrowRight from '@/assets/icons/icon-arrow-right.svg';

import IconHome from '@/assets/icons/icon-home.svg';
import IconScore from '@/assets/icons/icon-score.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconChat from '@/assets/icons/icon-chat.svg';
import IconMore from '@/assets/icons/icon-more.svg';

export default function MyData() {
  const [lembretes, setLembretes] = useState(true);
  const [promocoes, setPromocoes] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 28,
          paddingTop: 54,
          paddingBottom: 140,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 22,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <IconBack width={18} height={18} />
          </TouchableOpacity>

          <Text
            size={26}
            weight="700"
            color="#0F172A"
            style={{ marginLeft: 18 }}
          >
            Meus dados
          </Text>
        </View>

        <Text
          size={20}
          weight="700"
          color="#000000"
          style={{ marginBottom: 14 }}
        >
          Conta
        </Text>

        <SectionBox>
          <RowItem
            label="E-mail"
            value="joaopessoal@gmail.com"
            border
          />

          <RowItem
            label="Senha"
            value=""
          />
        </SectionBox>

        <Text
          size={20}
          weight="700"
          color="#000000"
          style={{ marginTop: 22, marginBottom: 14 }}
        >
          Notificações
        </Text>

        <SectionBox>
          <SwitchRow
            label="Lembretes"
            value={lembretes}
            onValueChange={setLembretes}
            border
          />

          <SwitchRow
            label="Promoções e novidades"
            value={promocoes}
            onValueChange={setPromocoes}
          />
        </SectionBox>

        <Text
          size={20}
          weight="700"
          color="#000000"
          style={{ marginTop: 22, marginBottom: 14 }}
        >
          Preferências
        </Text>

        <SectionBox>
          <RowItem
            label="Unidade de medida"
            value="kg / cm"
            border
          />

          <RowItem
            label="Idioma"
            value="Português BR"
          />
        </SectionBox>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

function SectionBox({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      {children}
    </View>
  );
}

function RowItem({
  label,
  value,
  border,
}: {
  label: string;
  value: string;
  border?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        minHeight: 52,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        borderBottomWidth: border ? 1 : 0,
        borderBottomColor: '#D1D5DB',
      }}
    >
      <Text
        size={16}
        weight="700"
        color="#7D7D7D"
        style={{ flex: 1 }}
      >
        {label}
      </Text>

      {!!value && (
        <Text
          size={14}
          weight="500"
          color="#7D7D7D"
          style={{ marginRight: 12 }}
        >
          {value}
        </Text>
      )}

      <IconArrowRight width={14} height={14} />
    </TouchableOpacity>
  );
}

function SwitchRow({
  label,
  value,
  onValueChange,
  border,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  border?: boolean;
}) {
  return (
    <View
      style={{
        minHeight: 52,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        borderBottomWidth: border ? 1 : 0,
        borderBottomColor: '#D1D5DB',
      }}
    >
      <Text
        size={16}
        weight="700"
        color="#7D7D7D"
        style={{ flex: 1 }}
      >
        {label}
      </Text>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: '#D1D5DB',
          true: '#0A66C2',
        }}
        thumbColor="#FFFFFF"
      />
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

      <TabItem
        icon={<IconChat width={30} height={30} />}
        label="Chat"
        onPress={() => router.push('/chat-home')}
      />

      <TabItem
        icon={<IconMore width={30} height={30} />}
        label="Mais"
        active
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