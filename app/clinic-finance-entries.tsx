import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';

const PetRex = require('@/assets/images/pitbul.png');
const PetIron = require('@/assets/images/rotwailler.png');

const receivables = [
  {
    name: 'João Martins',
    pet: 'Thor',
    image: PetRex,
    value: 'R$ 320,00',
    due: 'Venc. 22/05',
  },
  {
    name: 'Maria Silva',
    pet: 'Mel',
    image: PetIron,
    value: 'R$ 180,00',
    due: 'Venc. 23/05',
  },
  {
    name: 'Ana Paula',
    pet: 'Luna',
    image: PetRex,
    value: 'R$ 250,00',
    due: 'Venc. 25/05',
  },
];

const payables = [
  {
    name: 'Fornecedor Vet',
    description: 'Medicamentos',
    value: 'R$ 320,00',
    due: 'Venc. 27/05',
  },
];

export default function ClinicFinanceEntries() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingTop: 56,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        <IconBack width={24} height={24} />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#F8F7FC',
          borderRadius: 20,
          padding: 4,
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flex: 1,
            backgroundColor: '#EEE9FF',
            paddingVertical: 12,
            borderRadius: 16,
            alignItems: 'center',
          }}
        >
          <Text size={15} weight="700" color="#6D28D9">
            A Receber
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 16,
            alignItems: 'center',
          }}
        >
          <Text size={15} weight="700" color="#1F1B2D">
            A Pagar
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 110,
        }}
      >
        <Text size={22} weight="700" color="#1F1B2D">
          A receber
        </Text>

        <View
          style={{
            marginTop: 16,
            borderWidth: 1,
            borderColor: '#F0EDF7',
            borderRadius: 18,
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
          }}
        >
          {receivables.map((item, index) => (
            <View
              key={index}
              style={{
                height: 86,
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: index === receivables.length - 1 ? 0 : 1,
                borderBottomColor: '#F1EFF6',
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  overflow: 'hidden',
                  backgroundColor: '#E5E7EB',
                  marginRight: 14,
                }}
              >
                <Image
                  source={item.image}
                  style={{ width: 44, height: 44 }}
                  resizeMode="cover"
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text size={16} weight="700" color="#29243A">
                  {item.name}
                </Text>

                <Text
                  size={14}
                  weight="600"
                  color="#8A8499"
                  style={{ marginTop: 4 }}
                >
                  {item.pet}
                </Text>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <Text size={16} weight="700" color="#29243A">
                  {item.value}
                </Text>

                <Text
                  size={13}
                  weight="700"
                  color="#8A8499"
                  style={{ marginTop: 5 }}
                >
                  {item.due}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignSelf: 'flex-end',
            marginTop: 14,
          }}
        >
          <Text size={15} weight="700" color="#6D28D9">
            Ver todas (18)
          </Text>
        </TouchableOpacity>

        <Text
          size={22}
          weight="700"
          color="#1F1B2D"
          style={{ marginTop: 32 }}
        >
          A pagar
        </Text>

        <View
          style={{
            marginTop: 16,
            borderWidth: 1,
            borderColor: '#F0EDF7',
            borderRadius: 18,
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
          }}
        >
          {payables.map((item, index) => (
            <View
              key={index}
              style={{
                height: 86,
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  backgroundColor: '#F1EDFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 14,
                }}
              >
                <IconVaccine width={22} height={22} />
              </View>

              <View style={{ flex: 1 }}>
                <Text size={16} weight="700" color="#29243A">
                  {item.name}
                </Text>

                <Text
                  size={14}
                  weight="600"
                  color="#8A8499"
                  style={{ marginTop: 4 }}
                >
                  {item.description}
                </Text>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <Text size={16} weight="700" color="#29243A">
                  {item.value}
                </Text>

                <Text
                  size={13}
                  weight="700"
                  color="#8A8499"
                  style={{ marginTop: 5 }}
                >
                  {item.due}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignSelf: 'flex-end',
            marginTop: 14,
          }}
        >
          <Text size={15} weight="700" color="#6D28D9">
            Ver todas (7)
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          bottom: 34,
          left: 24,
          right: 24,
          height: 60,
          backgroundColor: '#6D28D9',
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#6D28D9',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.22,
          shadowRadius: 10,
          elevation: 4,
        }}
      >
        <Text size={17} weight="700" color="#FFFFFF">
          Novo lançamento
        </Text>
      </TouchableOpacity>
    </View>
  );
}