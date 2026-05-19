import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';
import IconAlert from '@/assets/icons/icon-alert.svg';
import IconPets from '@/assets/icons/icon-pets.svg';

export default function ClinicEmergency() {
  const emergencies = [
    {
      pet: 'Thor',
      reason: 'Intoxicação alimentar',
      date: '14/05/2025',
      time: '22:30',
      status: 'Finalizado',
      type: 'finished',
    },
    {
      pet: 'Mel',
      reason: 'Queda de altura',
      date: '14/05/2025',
      time: '19:10',
      status: 'Em andamento',
      type: 'progress',
    },
    {
      pet: 'Rex',
      reason: 'Dificuldade respiratória',
      date: '14/05/2025',
      time: '23:45',
      status: 'Finalizado',
      type: 'finished',
    },
  ];

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

      <Text size={30} weight="700" color="#1F1B2D">
        Emergência
      </Text>

      <Text
        size={16}
        weight="700"
        color="#8A8499"
        style={{ marginTop: 6 }}
      >
        Acesso rápido 24h
      </Text>

      <View
        style={{
          backgroundColor: '#FFF1F1',
          borderRadius: 22,
          padding: 22,
          marginTop: 28,
          alignItems: 'center',
        }}
      >
        <Text size={18} weight="700" color="#EF233C">
          Precisa de ajuda agora?
        </Text>

        <Text
          size={15}
          weight="700"
          color="#8A8499"
          style={{
            marginTop: 12,
            textAlign: 'center',
            lineHeight: 22,
          }}
        >
          Registre um caso de emergência e nossa equipe será notificada.
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            height: 58,
            backgroundColor: '#EF233C',
            borderRadius: 12,
            marginTop: 24,
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <IconAlert width={26} height={26} />

          <Text
            size={16}
            weight="700"
            color="#FFFFFF"
            style={{ marginLeft: 10 }}
          >
            Registrar emergência
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 28,
          marginBottom: 14,
        }}
      >
        <Text size={21} weight="700" color="#1F1B2D">
          Emergências recentes
        </Text>

        <TouchableOpacity activeOpacity={0.8}>
          <Text size={15} weight="700" color="#6D28D9">
            Ver todas
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {emergencies.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
              padding: 16,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: '#F0EDF7',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.04,
              shadowRadius: 10,
              elevation: 2,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: '#F4F2FF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 14,
                }}
              >
                <IconPets width={22} height={22} />
              </View>

              <View style={{ flex: 1 }}>
                <Text size={16} weight="700" color="#29243A">
                  {item.pet}
                </Text>

                <Text
                  size={14}
                  weight="600"
                  color="#8A8499"
                  style={{ marginTop: 4 }}
                >
                  {item.reason}
                </Text>

                <Text
                  size={13}
                  weight="600"
                  color="#B3AFC0"
                  style={{ marginTop: 4 }}
                >
                  {item.date} • {item.time}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor:
                  item.type === 'finished' ? '#E9F9EF' : '#FFECEC',
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 8,
              }}
            >
              <Text
                size={12}
                weight="700"
                color={item.type === 'finished' ? '#35B86B' : '#D84C4C'}
              >
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}