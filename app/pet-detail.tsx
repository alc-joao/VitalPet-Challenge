import { View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';

import IconConsult from '@/assets/icons/icon-consult.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';
import IconWorm from '@/assets/icons/icon-worm.svg';

import IconWeight from '@/assets/icons/icon-weight.svg';
import IconFood from '@/assets/icons/icon-food.svg';
import IconActivity from '@/assets/icons/icon-activity.svg';
import IconWater from '@/assets/icons/icon-water.svg';
import IconBehavior from '@/assets/icons/icon-behavior.svg';

const PetRex = require('@/assets/images/pitbul.png');
const PetIron = require('@/assets/images/rotwailler.png');

const { width } = Dimensions.get('window');

const padding = 17;
const gap = 10;
const cardWidth = (width - padding * 2 - gap) / 2;

const pets = {
  rex: {
    name: 'Rex',
    breed: 'Golden Retriever',
    age: '5 anos',
    image: PetRex,
    status: 'Saudável',
    score: '85',
    weight: '24,5 kg',
  },
  iron: {
    name: 'Iron',
    breed: 'Rottweiler',
    age: '5 anos',
    image: PetIron,
    status: 'Saudável',
    score: '85',
    weight: '28,5 kg',
  },
};

export default function PetDetail() {
  const params = useLocalSearchParams();
  const petKey = params.pet === 'rex' ? 'rex' : 'iron';
  const pet = pets[petKey];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      contentContainerStyle={{
        paddingHorizontal: padding,
        paddingTop: 56,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 24,
            height: 28,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconBack width={13} height={22} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text size={28} weight="700" color="#000000">
            •••
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', marginTop: 8 }}>
        <View
          style={{
            width: 190,
            height: 190,
            borderRadius: 95,
            overflow: 'hidden',
          }}
        >
          <Image
            source={pet.image}
            style={{
              width: 190,
              height: 190,
            }}
            resizeMode="cover"
          />
        </View>

        <Text
          size={38}
          weight="700"
          color="#000000"
          align="center"
          style={{ marginTop: 18 }}
        >
          {pet.name}
        </Text>

        <Text
          size={22}
          weight="700"
          color="#7D7D7D"
          align="center"
          style={{ marginTop: 6 }}
        >
          {pet.breed} • {pet.age}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
          }}
        >
          <View
            style={{
              backgroundColor: '#BDF5D2',
              borderRadius: 10,
              paddingHorizontal: 14,
              paddingVertical: 6,
              marginRight: 8,
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 2,
              elevation: 3,
            }}
          >
            <Text size={16} weight="700" color="#008047">
              {pet.status}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              paddingHorizontal: 14,
              paddingVertical: 6,
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 2,
              elevation: 3,
            }}
          >
            <Text size={16} weight="700" color="#777777">
              Score <Text color="#000000">{pet.score}</Text>
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 42,
          marginBottom: 26,
        }}
      >
        {['Resumo', 'Resumo', 'Resumo', 'Resumo'].map((item, index) => (
          <View key={`${item}-${index}`} style={{ alignItems: 'center' }}>
            <Text
              size={15}
              weight="700"
              color={index === 0 ? '#000000' : '#858585'}
            >
              {item}
            </Text>

            {index === 0 && (
              <View
                style={{
                  width: 78,
                  height: 5,
                  borderRadius: 4,
                  backgroundColor: '#0A66C2',
                  marginTop: 14,
                }}
              />
            )}
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <InfoCard
          icon={
            <BlueIconBox>
              <IconWeight width={28} height={28} />
            </BlueIconBox>
          }
          title="Peso"
          value={pet.weight}
        />

        <InfoCard
          icon={
            <BlueIconBox>
              <IconConsult width={28} height={28} />
            </BlueIconBox>
          }
          title="Última Consulta"
          value="10/05/2025"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}
      >
        <InfoCard
          icon={
            <BlueIconBox>
              <IconVaccine width={28} height={28} />
            </BlueIconBox>
          }
          title="Próxima vacina"
          value="08/10/2026"
        />

        <InfoCard
          icon={
            <BlueIconBox>
              <IconWorm width={28} height={28} />
            </BlueIconBox>
          }
          title="Vermífugo"
          value="10/05/2026"
        />
      </View>

      <Text
        size={22}
        weight="700"
        color="#000000"
        style={{ marginTop: 28, marginBottom: 18 }}
      >
        Visão geral da saúde
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <InfoCard
          icon={
            <GreenIconBox>
              <IconFood width={28} height={28} />
            </GreenIconBox>
          }
          title="Alimentação"
          value="Ótima"
        />

        <InfoCard
          icon={
            <GreenIconBox>
              <IconActivity width={28} height={28} />
            </GreenIconBox>
          }
          title="Atividade"
          value="Normal"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}
      >
        <InfoCard
          icon={
            <GreenIconBox>
              <IconWater width={28} height={28} />
            </GreenIconBox>
          }
          title="Hidratação"
          value="Ótima"
        />

        <InfoCard
          icon={
            <GreenIconBox>
              <IconBehavior width={28} height={28} />
            </GreenIconBox>
          }
          title="Comportamento"
          value="Alta"
        />
      </View>

      <TouchableOpacity
        style={{
          height: 66,
          backgroundColor: '#0A66C2',
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 46,
        }}
      >
        <Text size={20} weight="700" color="#FFFFFF">
          Ver linha do tempo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <View
      style={{
        width: cardWidth,
        minHeight: 92,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 14,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      {icon}

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text
          size={14}
          weight="700"
          color="#858585"
          style={{ lineHeight: 18 }}
        >
          {title}
        </Text>

        <Text
          size={17}
          weight="700"
          color="#000000"
          style={{ marginTop: 6 }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

function BlueIconBox({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#D7E9FF',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </View>
  );
}

function GreenIconBox({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#CFEFCD',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </View>
  );
}