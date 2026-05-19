import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';

export default function ClinicExams() {
  const exams = [
    {
      name: 'Hemograma',
      pet: 'Thor',
      date: '15/06/2025',
      status: 'Normal',
      type: 'normal',
    },
    {
      name: 'Bioquímico',
      pet: 'Mel',
      date: '04/05/2025',
      status: 'Normal',
      type: 'normal',
    },
    {
      name: 'Urinalise',
      pet: 'Luna',
      date: '02/05/2025',
      status: 'Atenção',
      type: 'warning',
    },
    {
      name: 'Parasitológico',
      pet: 'Buddy',
      date: '28/04/2025',
      status: 'Normal',
      type: 'normal',
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

      <Text
        style={{
          fontSize: 30,
          fontWeight: '700',
          color: '#1F1B2D',
          marginBottom: 24,
        }}
      >
        Exames
      </Text>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#F8F7FC',
          borderRadius: 22,
          padding: 4,
          marginBottom: 28,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#EEE9FF',
            paddingVertical: 12,
            borderRadius: 18,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#6D28D9',
              fontSize: 15,
              fontWeight: '700',
            }}
          >
            Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 18,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#8A8499',
              fontSize: 15,
              fontWeight: '700',
            }}
          >
            Pendentes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 18,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#8A8499',
              fontSize: 15,
              fontWeight: '700',
            }}
          >
            Concluídos
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {exams.map((exam, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
              padding: 18,
              marginBottom: 14,
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
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  backgroundColor: '#F1EDFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 14,
                }}
              >
                <IconVaccine width={20} height={20} />
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#29243A',
                    marginBottom: 4,
                  }}
                >
                  {exam.name}
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#8A8499',
                    marginBottom: 4,
                  }}
                >
                  {exam.pet}
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '500',
                    color: '#B3AFC0',
                  }}
                >
                  {exam.date}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor:
                  exam.type === 'normal' ? '#E9F9EF' : '#FFF3DD',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: exam.type === 'normal' ? '#35B86B' : '#D9872B',
                }}
              >
                {exam.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          bottom: 36,
          left: 24,
          right: 24,
          height: 62,
          backgroundColor: '#6D28D9',
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#6D28D9',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.28,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 17,
            fontWeight: '700',
          }}
        >
          Novo exame
        </Text>
      </TouchableOpacity>
    </View>
  );
}