import { View, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBell from '@/assets/icons/icon-bell.svg';
import IconPlus from '@/assets/icons/icon-plus.svg';
import IconArrowRight from '@/assets/icons/icon-arrow-right.svg';

import IconHome from '@/assets/icons/icon-home.svg';
import IconPaw from '@/assets/icons/icon-paw.svg';
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

const padding = 25;
const petGap = 12;
const addPetWidth = 72;
const petCardWidth = (width - padding * 2 - petGap * 2 - addPetWidth) / 2;

const quickGap = 10;
const quickCardWidth = (width - padding * 2 - quickGap * 3) / 4;

export default function TutorHome() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: padding,
          paddingTop: 64,
          paddingBottom: 140,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <View>
            <Text size={24} weight="700" color="#111827">
              Olá, João!
            </Text>

            <Text size={20} color="#333333">
              Bem-vindo de volta!
            </Text>
          </View>

          <TouchableOpacity style={{ marginTop: 10 }}>
            <IconBell width={26} height={26} />
          </TouchableOpacity>
        </View>

        <SectionHeader title="Meus pets" />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <PetCard
            image={<RoundImage source={PetRex} size={42} />}
            name="Rex"
            breed="Golden Retriever"
            status="Saudável"
            score="85"
            healthy
            onPress={() =>
              router.push({
                pathname: '/pet-detail',
                params: {
                  pet: 'rex',
                },
              })
            }
          />

          <PetCard
            image={<RoundImage source={PetIron} size={42} />}
            name="Iron"
            breed="Rottweiler"
            status="Atenção"
            score="62"
            onPress={() =>
              router.push({
                pathname: '/pet-detail',
                params: {
                  pet: 'iron',
                },
              })
            }
          />

          <AddPetCard />
        </View>

        <SectionHeader title="Próximos lembretes" />

        <ReminderCard
          image={<RoundImage source={PetIron} size={46} />}
          title="Vacina múltipla"
          subtitle="Iron • 20/05.2025"
        />

        <ReminderCard
          image={<RoundImage source={PetRex} size={46} />}
          title="Vermífugo"
          subtitle="Rex • 20/05.2025"
        />

        <ReminderCard
          image={
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                backgroundColor: '#DCEBFF',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Image
                source={PetBanho}
                style={{
                  width: 32,
                  height: 32,
                }}
                resizeMode="contain"
              />
            </View>
          }
          title="Banho e tosa"
          subtitle="Rex • 20/05.2025"
        />

        <Text
          size={22}
          weight="700"
          color="#000000"
          style={{ marginTop: 26, marginBottom: 22 }}
        >
          Ações rápidas
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <QuickAction
            icon={<IconConsult width={28} height={28} />}
            label="Consultas"
          />

          <QuickAction
            icon={<IconVaccine width={28} height={28} />}
            label="Vacinas"
          />

          <QuickAction
            icon={<IconMedicine width={28} height={28} />}
            label="Medicações"
          />

          <QuickAction
            icon={<IconEmergency width={28} height={28} />}
            label="Emergência"
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
      <Image
        source={source}
        style={{
          width: size,
          height: size,
        }}
        resizeMode="cover"
      />
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View
      style={{
        marginTop: 32,
        marginBottom: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text size={21} weight="700" color="#000000">
        {title}
      </Text>

      <Text size={17} weight="700" color="#0A66C2">
        Ver todos
      </Text>
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
        height: 178,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 18,
        padding: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.22,
        shadowRadius: 4,
        elevation: 6,
      }}
    >
      {image}

      <Text size={18} weight="700" color="#000000" style={{ marginTop: 8 }}>
        {name}
      </Text>

      <Text size={14} color="#333333" style={{ lineHeight: 17 }}>
        {breed}
      </Text>

      <View
        style={{
          alignSelf: 'flex-start',
          backgroundColor: healthy ? '#BDF5D2' : '#F5F3B8',
          borderRadius: 20,
          paddingHorizontal: 9,
          paddingVertical: 3,
          marginTop: 14,
        }}
      >
        <Text
          size={12}
          weight="700"
          color={healthy ? '#008047' : '#6B6B00'}
        >
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
        <Text size={18} weight="700" color="#7D7D7D">
          Score
        </Text>

        <Text size={25} weight="700" color="#111827">
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
        height: 178,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.22,
        shadowRadius: 4,
        elevation: 6,
      }}
    >
      <View
        style={{
          width: 46,
          height: 46,
          borderRadius: 23,
          borderWidth: 2,
          borderColor: '#0A66C2',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
        }}
      >
        <IconPlus width={24} height={24} />
      </View>

      <Text size={12} weight="700" color="#0A66C2" align="center">
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
        height: 78,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      {image}

      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text size={17} weight="700" color="#111827">
          {title}
        </Text>

        <Text size={16} color="#8A8A8A">
          {subtitle}
        </Text>
      </View>

      <IconArrowRight width={24} height={24} />
    </View>
  );
}

function QuickAction({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <TouchableOpacity
      style={{
        width: quickCardWidth,
        height: 104,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.22,
        shadowRadius: 4,
        elevation: 6,
      }}
    >
      {icon}

      <Text size={12} color="#333333" style={{ marginTop: 14 }}>
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
      <TabItem icon={<IconHome width={31} height={31} />} label="Home" active />
      <TabItem icon={<IconPaw width={31} height={31} />} label="Pets" />
      <TabItem icon={<IconCalendar width={31} height={31} />} label="Histórico" />
      <TabItem icon={<IconChat width={31} height={31} />} label="Chat" />
      <TabItem icon={<IconMore width={31} height={31} />} label="Mais" />
    </View>
  );
}

function TabItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <TouchableOpacity
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