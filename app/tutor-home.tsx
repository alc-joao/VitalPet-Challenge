import { View, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBell from '@/assets/icons/icon-bell.svg';
import IconPlus from '@/assets/icons/icon-plus.svg';
import IconArrowRight from '@/assets/icons/icon-arrow-right.svg';

import IconHome from '@/assets/icons/icon-home.svg';
import IconScore from '@/assets/icons/icon-score.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconChat from '@/assets/icons/icon-chat.svg';
import IconMore from '@/assets/icons/icon-more.svg';

import IconConsult from '@/assets/icons/icon-consult.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';
import IconMedicine from '@/assets/icons/icon-medicine.svg';
import IconEmergency from '@/assets/icons/icon-emergency.svg';

const PetRex = require('@/assets/images/pitbul.png');
const PetIron = require('@/assets/images/rotwailler.png');
const PetBanho = require('@/assets/images/banho-e-tosa.png');

const { width } = Dimensions.get('window');

const padding = 20;
const petGap = 10;
const addPetWidth = 68;
const petCardWidth = (width - padding * 2 - petGap * 2 - addPetWidth) / 2;

const quickGap = 8;
const quickCardWidth = (width - padding * 2 - quickGap * 3) / 4;

export default function TutorHome() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: padding,
          paddingTop: 42,
          paddingBottom: 125,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text size={22} weight="700" color="#111827">
              Olá, João!
            </Text>

            <Text size={18} color="#333333">
              Bem-vindo de volta!
            </Text>
          </View>

          <TouchableOpacity style={{ marginTop: 8 }}>
            <IconBell width={24} height={24} />
          </TouchableOpacity>
        </View>

        <SectionHeader title="Meus pets" />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <PetCard
            image={<RoundImage source={PetRex} size={38} />}
            name="Rex"
            breed="Golden Retriever"
            status="Saudável"
            score="85"
            healthy
            onPress={() =>
              router.push({
                pathname: '/pet-detail',
                params: { pet: 'rex' },
              })
            }
          />

          <PetCard
            image={<RoundImage source={PetIron} size={38} />}
            name="Iron"
            breed="Rottweiler"
            status="Atenção"
            score="62"
            onPress={() =>
              router.push({
                pathname: '/pet-detail',
                params: { pet: 'iron' },
              })
            }
          />

          <AddPetCard />
        </View>

        <SectionHeader
          title="Próximos lembretes"
          onPress={() => router.push('/reminders-home')}
        />

        <ReminderCard
          image={<RoundImage source={PetIron} size={42} />}
          title="Vacina múltipla"
          subtitle="Iron • 20/05/2025"
        />

        <ReminderCard
          image={<RoundImage source={PetRex} size={42} />}
          title="Vermífugo"
          subtitle="Rex • 20/05/2025"
        />

        <ReminderCard
          image={
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: '#DCEBFF',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Image
                source={PetBanho}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </View>
          }
          title="Banho e tosa"
          subtitle="Rex • 20/05/2025"
        />

        <Text
          size={20}
          weight="700"
          color="#000000"
          style={{ marginTop: 20, marginBottom: 16 }}
        >
          Ações rápidas
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <QuickAction
            icon={<IconConsult width={26} height={26} />}
            label="Consultas"
            onPress={() => router.push('/consults-home')}
          />

          <QuickAction
            icon={<IconVaccine width={26} height={26} />}
            label="Vacinas"
            onPress={() => router.push('/vaccines-home')}
          />

          <QuickAction
            icon={<IconMedicine width={26} height={26} />}
            label="Medicações"
            onPress={() => router.push('/medications-home')}
          />

          <QuickAction
            icon={<IconEmergency width={26} height={26} />}
            label="Emergência"
            onPress={() => router.push('/emergency-home')}
          />
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

function RoundImage({ source, size }: { source: any; size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
        backgroundColor: '#E5E7EB',
      }}
    >
      <Image source={source} style={{ width: size, height: size }} resizeMode="cover" />
    </View>
  );
}

function SectionHeader({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) {
  return (
    <View
      style={{
        marginTop: 28,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text size={20} weight="700" color="#000000">
        {title}
      </Text>

      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Text size={16} weight="700" color="#0A66C2">
          Ver todos
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function PetCard({
  image,
  name,
  breed,
  status,
  score,
  healthy,
  onPress,
}: {
  image: React.ReactNode;
  name: string;
  breed: string;
  status: string;
  score: string;
  healthy?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        width: petCardWidth,
        height: 158,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 18,
        padding: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      {image}

      <Text size={17} weight="700" color="#000000" style={{ marginTop: 6 }}>
        {name}
      </Text>

      <Text size={13} color="#333333" style={{ lineHeight: 15 }}>
        {breed}
      </Text>

      <View
        style={{
          alignSelf: 'flex-start',
          backgroundColor: healthy ? '#BDF5D2' : '#F5F3B8',
          borderRadius: 20,
          paddingHorizontal: 8,
          paddingVertical: 3,
          marginTop: 9,
        }}
      >
        <Text size={11} weight="700" color={healthy ? '#008047' : '#6B6B00'}>
          {status}
        </Text>
      </View>

      <View
        style={{
          marginTop: 'auto',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Text size={16} weight="700" color="#7D7D7D">
          Score
        </Text>

        <Text size={23} weight="700" color="#111827">
          {score}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function AddPetCard() {
  return (
    <TouchableOpacity
      onPress={() => router.push('/pet-form')}
      style={{
        width: addPetWidth,
        height: 158,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <View
        style={{
          width: 42,
          height: 42,
          borderRadius: 21,
          borderWidth: 2,
          borderColor: '#0A66C2',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        <IconPlus width={22} height={22} />
      </View>

      <Text size={11} weight="700" color="#0A66C2" align="center">
        Adicionar{'\n'}pet
      </Text>
    </TouchableOpacity>
  );
}

function ReminderCard({
  image,
  title,
  subtitle,
}: {
  image: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <View
      style={{
        height: 70,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      {image}

      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text size={16} weight="700" color="#111827">
          {title}
        </Text>

        <Text size={14} color="#8A8A8A">
          {subtitle}
        </Text>
      </View>

      <IconArrowRight width={22} height={22} />
    </View>
  );
}

function QuickAction({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        width: quickCardWidth,
        height: 88,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      {icon}

      <Text size={10} color="#333333" align="center" style={{ marginTop: 10 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function BottomNav() {
  const tabWidth = (width - 32) / 5;

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 92,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingHorizontal: 16,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 99,
        elevation: 99,
      }}
    >
      <TabItem width={tabWidth} icon={<IconHome width={28} height={28} />} label="Home" active />

      <TabItem
        width={tabWidth}
        icon={<IconScore width={28} height={28} />}
        label="Score"
        onPress={() => router.push('/score-home')}
      />

      <TabItem
        width={tabWidth}
        icon={<IconCalendar width={28} height={28} />}
        label="Histórico"
        onPress={() => router.push('/history-home')}
      />

      <TabItem
        width={tabWidth}
        icon={<IconChat width={28} height={28} />}
        label="Chat"
        onPress={() => router.push('/chat-home')}
      />

      <TabItem
        width={tabWidth}
        icon={<IconMore width={28} height={28} />}
        label="Mais"
        onPress={() => router.push('/more-home')}
      />
    </View>
  );
}

function TabItem({
  width,
  icon,
  label,
  active,
  onPress,
}: {
  width: number;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={active}
      style={{
        width,
        height: 72,
        borderRadius: 14,
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
        style={{ marginTop: 4 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}